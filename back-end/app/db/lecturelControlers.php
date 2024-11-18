<?php

    require_once 'connect.php';

    class LectuterController {
        private $db;
        
        public function __construct() {
            $this->db = new Database();
        }
        
        public function insertLecturer($userInfo, $data) {
            $accessToken = $userInfo['access_token'];
            $username = $userInfo['username'];
            
            if ($this->userController->isValidToken($accessToken, $username) && $this->userController->isAdmin($username)) {
                
                $lecturerID = $data["lecturerID"];
                $name = $data["name"];
                $bio = $data["bio"];
                $avatar = $data["avatar"];
                
                $sql = "INSERT INTO Lecturers (lecturer_id, name, bio, avatar) VALUES (:lecturerID, :name, :bio, :avatar)";
                
                $stmt = $this->db->conn->prepare($sql);
                
                $stmt->bindParam(':lecturerID', $lecturerID, PDO::PARAM_INT);
                $stmt->bindParam(':name', $name, PDO::PARAM_STR);
                $stmt->bindParam(':bio', $bio, PDO::PARAM_STR);
                $stmt->bindParam(':avatar', $avatar, PDO::PARAM_STR);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    $this->response('Leturer insert successfully', 200);
                }
                else {
                    $this->response("insert fail", 401);
                }
            }

            else {
                $this->response("No permission", 401);
            }
        }
        public function deleteLecturer($userInfo, $lecturerID) {
            $accessToken = $userInfo['access_token'];
            $username = $userInfo['username'];
        
            if ($this->userController->isValidToken($accessToken, $username) && $this->userController->isAdmin($username)) {
                
                $sql = "DELETE FROM Lecturers WHERE lecturer_id = :lecturerID";
                
                $stmt = $this->db->conn->prepare($sql);
                
                $stmt->bindParam(':lecturerID', $lecturerID, PDO::PARAM_INT);
                $stmt->execute();
        
                if ($stmt->rowCount() > 0) {
                    $this->response('Lecturer deleted successfully', 200);
                }
                else {
                    $this->response("Delete failed", 401);
                }
            }
            else {
                $this->response("No permission", 401);
            }
        }


        private function response($message, $statusCode) {
            http_response_code($statusCode);
            echo json_encode(['message' => $message]);
        }
    }

?>