<?php

    require_once 'connect.php';

    class UserController {
        private $db;
        
        public function __construct() {
            $this->db = new Database();
        }
        

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

        private function generateToken($username, $expires) {
            return base64_encode(json_encode([
                'username' => $username,
                'expiry' => time() + $expires
            ]));
        }




        private function response($message, $statusCode) {
            http_response_code($statusCode);
            echo json_encode(['message' => $message]);
        }
    }

?>