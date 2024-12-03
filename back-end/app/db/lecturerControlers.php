<?php

    require_once 'connect.php';
    require_once 'usersControlers.php';
    // require_once '../cors/cors.php';

    class LectuterController {
        private $db;
        private $userController;
        
        public function __construct() {
            $this->db = Database::getInstance();
            $this->userController = new UserController();
        }


        public function isLecturerExist($lecturerID) {
            $sql = "SELECT * FROM Lecturers WHERE lecturer_id = :lecturerID";
            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':lecturerID', $lecturerID, PDO::PARAM_INT);
            $stmt->execute();
            $host = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if ($host) {
                return true;
            } 
            else {
                return false;
            }
        }

        
        public function insertLecturer($accessToken, $username, $data) {
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
        public function deleteLecturer($accessToken, $username, $lecturerID) {
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


        public function updateLecturer($accessToken, $username, $data) {        
            if ($this->userController->isValidToken($accessToken, $username) && $this->userController->isAdmin($username)) {
        
                $fieldsToUpdate = [];
                $params = [];
        
                foreach ($data as $key => $value) {
                    if ($key == 'username' || $key == 'lecturerID') continue;
        
                    if (!is_null($value)) {
                        $fieldsToUpdate[] = "$key = :$key";
                        $params[":$key"] = $value;
                    }
                }
        
                if (empty($fieldsToUpdate)) {
                    $this->response("No valid fields to update", 400);
                    return;
                }
        
                $sql = "UPDATE Lecturers SET " . implode(', ', $fieldsToUpdate) . " WHERE lecturer_id = :lecturerID";
        
                $stmt = $this->db->conn->prepare($sql);
                
                foreach ($params as $param => $value) {
                    $stmt->bindParam($param, $value, PDO::PARAM_STR);
                }
                $stmt->bindParam(':lecturerID', $data['lecturerID']);
        
                $stmt->execute();
        
                if ($stmt->rowCount() > 0) {
                    $this->response('Lecturer updated successfully', 200);
                } else {
                    $this->response("Update failed", 401);
                }
            } else {
                $this->response("No permission", 401);
            }
        }


        public function getLecturer($lecturerID) {
            
            if (!$lecturerID) {
                $sql = "SELECT * FROM Lecturers";
                $stmt = $this->db->conn->prepare($sql);
            }
            else {
                $sql = "SELECT lecturer_id, name, bio, avatar FROM Lecturers WHERE lecturer_id = :lecturerID";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':lecturerID', $lecturerID, PDO::PARAM_INT);
            }  

            $stmt->execute();
            
            $lecturer = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            if ($lecturer) {
                $this->response($lecturer, 200);
            } else {
                $this->response("Lecturer not found", 404);
            }
           
        }


        private function response($message, $statusCode) {
            http_response_code($statusCode);
            echo json_encode(['message' => $message, 'status' => $statusCode]);
        }
    }

?>