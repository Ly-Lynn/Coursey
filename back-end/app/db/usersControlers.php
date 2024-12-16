<?php
    $dotenv = Dotenv\Dotenv::createImmutable("/app/.env");
    $dotenv->load();

    require_once 'connect.php';
    // require_once '../cors/cors.php';
    require_once '/var/www/html/vendor/autoload.php';
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;   
    use PHPMailer\PHPMailer\STMP;    
    
 
    // require_once '/var/www/html/vendor/PHPMailer/SMTP.php';
    // require_once '/var/www/html/vendor/PHPMailer/Exception.php';


    class UserController {
        private $db;
        private $mailer;
        
        
        public function __construct() {
            $this->db = Database::getInstance();
            $this->mailer = new PHPMailer(true);
            $this->mailer->SMTPAuth = true;
            $this->mailer->Host = 'smtp.gmail.com';
            $this->mailer->isSMTP();
            $this->mailer->Username = $_ENV['MAIL_USERNAME']; 
            $this->mailer->Password = $_ENV['PASS_APP'];    
            $this->mailer->Port = 587;
            $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption

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
                
                // setcookie('refresh_token', $refreshToken, [
                //     'expires' => time() + 86400,
                //     'path' => '/',
                //     'httpOnly' => true,
                //     'secure' => true,
                //     'samesite' => 'Strict'
                // ]);


                $sql = "SELECT username, id, gmail, avatar FROM Users WHERE username = :username";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':username', $inputUsername);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);


                # update the refresh token
                $sql = "UPDATE Users SET access_token = :access_token, refresh_token = :refresh_token WHERE username = :username";
                


                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':username', $inputUsername);
                $stmt->bindParam(':access_token', $accessToken);
                $stmt->bindParam(':refresh_token', $refreshToken);        
                $stmt->execute();

                
                $this->response([
                    'message' => 'Login successful',
                    'accessToken' => $accessToken,
                    'username' => $result['username'],
                    'userID' => $result['id'],
                    'gmail' => $result['gmail'],
                    'avatar' => $result['avatar']
                ], 200);
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
                $sql = "SELECT id, username, gmail, is_admin FROM Users";
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

        public function updateRole($accessToken, $username, $updateUser, $role) {
            if ($this->isValidToken($accessToken, $username)) {
                if($this->isAdmin($username)) {
                    $sql = "PUT INTO Users VALUES role = :role WHERE username = :updateUser";
                    $stmt = $this->db->conn->prepare($sql);
                    $stmt->bindParam(':updateUser', $updateUser);
                    $stmt->execute();

                    if ($stmt->rowCount() > 0) {
                        $this->response('User update successfully', 200);
                    }
                    else {
                        $this->response("Updated fail", 401);
                    }
                }

                else {
                    return $this->response("No permission", 401);
                }

            }
        }
        # delete user for admin
        public function deleteUser($accessToken, $username, $deletedID){
            if ($this->isValidToken($accessToken, $username)) {
                if($this->isAdmin($username)) {


                    $sqlDeleteUserCourses = "DELETE FROM UserCourses WHERE user_id = :deletedID";
                    $stmtUserCourses = $this->db->conn->prepare($sqlDeleteUserCourses);
                    $stmtUserCourses->bindParam(':deletedID', $deletedID);
                    $stmtUserCourses->execute();

                    $sql = "DELETE FROM Users WHERE id = :deletedID";
                    $stmt = $this->db->conn->prepare($sql);
                    $stmt->bindParam(':deletedID', $deletedID);
                    $stmt->execute();

                    if ($stmt->rowCount() > 0) {
                        return $this->response('User deleted successfully', 200);
                    }
                    else {
                        return $this->response("Delete fail", 401);
                    }
                }

                else {
                    return $this->response("No permission", 401);
                }

            }
            return $this->response("Not valid Token", 401);

        }    

        public function isValidToken($accessToken, $username) {
            // echo $accessToken;
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


        public function sendMail($email) {
            try {
                // Kiểm tra email tồn tại trong hệ thống
                $sql = "SELECT username FROM Users WHERE gmail = :email";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':email', $email);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
                if (!$user) {
                    $this->response('Email không tồn tại', 404);
                    return;
                }
        
                $newPassword = '12345';
                $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
        
                $updateSql = "UPDATE Users SET password = :password WHERE gmail = :email";
                $updateStmt = $this->db->conn->prepare($updateSql);
                $updateStmt->bindParam(':password', $hashedPassword);
                $updateStmt->bindParam(':email', $email);
                $updateStmt->execute();
        
                $this->mailer->clearAddresses();
                $this->mailer->addAddress($email);
                $this->mailer->isHTML(true);
                $this->mailer->Subject = 'Thông Tin Mật Khẩu Mới';
                $this->mailer->Body = "Mật khẩu mới của bạn là: <b>123</b><br>Vui lòng đổi mật khẩu sau khi đăng nhập.";
                if ($this->mailer->send()) {
                    $this->response('Đã reset mật khẩu và gửi email thành công', 200);
                } else {
                    $this->response('Gửi email thất bại', 500);
                }
            } 
            catch (Exception $e) {
                $this->response("Lỗi: {$this->mailer->ErrorInfo}", 500);
            }
        }



        private function response($message, $statusCode) {
            http_response_code($statusCode);
            echo json_encode(['message' => $message, 'status' => $statusCode]);
            exit();
        }
    }

?>