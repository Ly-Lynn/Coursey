<?php

require_once 'connect.php';
require_once 'usersControlers.php';
// require_once '.././cors/cors.php';

class HostController {
    private $db;
    private $userController;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->userController = new UserController();
    }


    public function isHostExist($hostID) {
        $sql = "SELECT * FROM Hosts WHERE host_id = :hostID";
        $stmt = $this->db->conn->prepare($sql);
        $stmt->bindParam(':hostID', $hostID, PDO::PARAM_INT);
        $stmt->execute();
        $host = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($host) {
            return true;
        } 
        else {
            return false;
        }
    }
    
    public function insertHost($accessToken, $username, $data) {
        if ($this->userController->isValidToken($accessToken, $username) && $this->userController->isAdmin($username)) {
            $hostID = $data["hostID"];
            $hostName = $data["hostName"];
            $logoImage = $data["logoImage"];
            
            $sql = "INSERT INTO Hosts (host_id, host_name, logo_image) VALUES (:hostID, :hostName, :logoImage)";
            
            $stmt = $this->db->conn->prepare($sql);
            
            $stmt->bindParam(':hostID', $hostID, PDO::PARAM_INT);
            $stmt->bindParam(':hostName', $hostName, PDO::PARAM_STR);
            $stmt->bindParam(':logoImage', $logoImage, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $this->response('Host inserted successfully', 200);
            } else {
                $this->response("Insert failed", 401);
            }
        } else {
            $this->response("No permission", 401);
        }
    }
    
    public function deleteHost($accessToken, $username, $hostID) {
        if ($this->userController->isValidToken($accessToken, $username) && $this->userController->isAdmin($username)) {
            $sql = "DELETE FROM Hosts WHERE host_id = :hostID";
            
            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':hostID', $hostID, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $this->response('Host deleted successfully', 200);
            } else {
                $this->response("Delete failed", 401);
            }
        } else {
            $this->response("No permission", 401);
        }
    }

    public function updateHost($accessToken, $username, $data) {
        if ($this->userController->isValidToken($accessToken, $username) && $this->userController->isAdmin($username)) {
            $fieldsToUpdate = [];
            $params = [];

            foreach ($data as $key => $value) {
                if ($key == 'username' || $key == 'hostID') continue;

                if (!is_null($value)) {
                    $fieldsToUpdate[] = "$key = :$key";
                    $params[":$key"] = $value;
                }
            }

            if (empty($fieldsToUpdate)) {
                $this->response("No valid fields to update", 400);
                return;
            }

            $sql = "UPDATE Hosts SET " . implode(', ', $fieldsToUpdate) . " WHERE host_id = :hostID";

            $stmt = $this->db->conn->prepare($sql);
            
            foreach ($params as $param => $value) {
                $stmt->bindParam($param, $value, PDO::PARAM_STR);
            }
            $stmt->bindParam(':hostID', $data['hostID'], PDO::PARAM_INT);

            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $this->response('Host updated successfully', 200);
            } else {
                $this->response("Update failed", 401);
            }
        } else {
            $this->response("No permission", 401);
        }
    }

    public function getHost($hostID) {

        if(!$hostID) {
            $sql = "SELECT * FROM Hosts";
            $stmt = $this->db->conn->prepare($sql);
        }
        else {
            $sql = "SELECT host_id, host_name, logo_image FROM Hosts WHERE host_id = :hostID";

            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':hostID', $hostID, PDO::PARAM_INT);
        }

        $stmt->execute();

        $host = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($host) {
            $this->response($host, 200);
        } else {
            $this->response("Host not found", 404);
        }
    }

    private function response($message, $statusCode) {
        http_response_code($statusCode);
        echo json_encode(['message' => $message, 'status' => $statusCode]);
    }
}
