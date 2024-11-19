<?php

    require_once 'connect.php';

    class UserController {
        private $db;
        
        public function __construct() {
            $this->db = new Database();
        }
        
        # signup
        public function signup($data) {
            $inputUsername = $data['username'];
            $inputPassword = $data['password'];
            $inputGmail = $data['gmail'];

            if (!isset($data['username']) || !isset($data['password']) || !isset($data['gmail'])) {
                $this->response('All fields are required', 400);
                return;
            }


            $sql = "SELECT * FROM Users WHERE username = :inputUsername";
            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':inputUsername', $inputUsername);
            $stmt->execute();
            $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existingUser) {
                $this->response('Username alredy exirst', 400);
                return;
            }
            $hashedPassword = password_hash($inputPassword, PASSWORD_BCRYPT);
            $sql = "INSERT INTO Users (username, password, gmail) VALUES (:username, :password, :gmail)";
            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':username', $inputUsername);
            $stmt->bindParam(':password', $hashedPassword);
            $stmt->bindParam(':gmail', $inputGmail);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                $this->response('User registered successfully', 201);
            } 
            else {
                $this->response('Failed to register user', 500);
            }
        }

        public function changePassword($accessToken, $username, $newPassword) {
            if ($this->isValidToken($accessToken, $username)) {
                $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
                $sql = "UPDATE Users SET password = :password WHERE username = :username";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':password', $hashedPassword);
                $stmt->bindParam(':username', $username);
                $stmt->execute();
                if ($stmt->rowCount() > 0) {
                    $this->response('Password changed successfully', 200);
                } 
                else {
                    $this->response('Failed to change password', 500);
                }
            }
        }

        # login
        public function login($data) {
            $inputUsername = $data['username'];
            $inputPassword = $data['password'];

            $sql = "SELECT * FROM Users WHERE username = :username";
            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':username', $inputUsername);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($user && password_verify($inputPassword, $user['password'])) {
                $accessToken = $this->generateToken($inputUsername, 3600);
                $refreshToken = $this->generateToken($inputUsername, 86400);
                
                setcookie('refresh_token', $refreshToken, [
                    'expires' => time() + 86400,
                    'path' => '/',
                    'httpOnly' => true,
                    'secure' => true,
                    'samesite' => 'Strict'
                ]);

                $this->response([
                    'message' => 'Login successful',
                    'accessToken' => $accessToken
                ], 200);

                # update the refresh token
                $sql = "UPDATE Users SET access_token = :access_token, refresh_token = :refresh_token WHERE username = :username";

                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':username', $inputUsername);
                $stmt->bindParam(':access_token', $accessToken);
                $stmt->bindParam(':refresh_token', $refreshToken);        
                $stmt->execute();
            }

            else {
                $this->response("Invalid username or password", 401);
            }
        }

        public function logout() {
            if (isset($_COOKIE['access_token'])) {
                setcookie('access_token', '', time() - 3600, '/', '', true, true);
            }

            if (isset($_COOKIE['refresh_token'])) {
                setcookie('refresh_token', '', time() - 3600, '/', '', true, true); 
            }

            $this->response('Logout successful', 200);
        }


        private function generateToken($username, $expires) {
            return base64_encode(json_encode([
                'username' => $username,
                'expiry' => time() + $expires
            ]));
        }


        # get user add specific username
        public function getUsers($accessToken, $username) {
            if ($this->isValidToken($accessToken, $username)) {
                $sql = "SELECT * FROM Users WHERE username = :username";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':username', $username);
                $stmt->execute();
                $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                $this->response($user, 200);
                return;
            }

            $this->response("Access fail", 401);
        }

        # get all users for admin
        public function getAllUsers($accessToken, $username) {
            if ($this->isValidToken($accessToken, $username) && $this->isAdmin($username)) {
                $sql = "SELECT * FROM Users";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->execute();
                $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                $this->response($user, 200);
                return;
            }
            
            return $this->response("No permission", 401);
            
        }

        # update user
        public function updateUser($accessToken, $username, $data) {
            if ($this->isValidToken($accessToken, $username)) {
                $updateField = [];
                $params = [];

                foreach ($data as $key => $val) {
                    $updateField[] = "$key = :$key";
                    $params[$key] = $val;
                }

                $sql = "UPDATE Users SET " . implode(", ", $updateField) . " WHERE username = :username";

                $stmt = $this->db->conn->prepare($sql);
                
                foreach ($params as $key => $val) {
                   $stmt->bindParam(":$key", $params[$key]);
                }

                $stmt->execute();
                if ($stmt->rowCount() > 0) {
                    $this->response('User updated successfully', 200);
                }
                else {
                    $this->response('No changes made', 400);
                }
                return;
            }
            $this->response("Update fail", 401);
        }

        # delete user for admin
        public function deleteUser($accessToken, $username, $deletedUser){
            if ($this->isValidToken($accessToken, $username)) {
                if($this->isAdmin($username)) {
                    $sql = "DELETE FROM Users WHERE username = :deletedUser";
                    $stmt = $this->db->conn->prepare($sql);
                    $stmt->bindParam(':deletedUser', $deletedUser);
                    $stmt->execute();

                    if ($stmt->rowCount() > 0) {
                        $this->response('User deleted successfully', 200);
                    }
                    else {
                        $this->response("Delete fail", 401);
                    }
                }

                else {
                    return $this->response("No permission", 401);
                }

            }

        }    

        public function isValidToken($accessToken, $username) {
            $sql = "SELECT access_token FROM Users WHERE access_token = :access_token AND username = :username"; 
            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':access_token', $accessToken);
            $stmt->bindParam(':username', $username);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if($result) {
                return true;
            }
            return false;
        }


        public function isAdmin($username) {
            $sql = "SELECT is_admin FROM Users WHERE username = :username";
            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if($result['is_admin'] == 1) {

                return true;
            }
            return false;
        }



        private function response($message, $statusCode) {
            http_response_code($statusCode);
            echo json_encode(['message' => $message]);
        }
    }

?>