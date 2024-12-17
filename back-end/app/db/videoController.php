<?php
    require_once 'connect.php';
    require_once "courseControlers.php";
    // require_once '../cors/cors.php';

    class VideoController {
        private $db;
        private $userController;
        public function __construct() {
            $this->db = Database::getInstance();
                $this->userController = new UserController();
        }

        

        public function getUrlCode($userID, $username, $accessToken, $courseID) {

            if ($this->userController->isValidToken($accessToken, $username)) {
        
                $sql = "SELECT COUNT(*) as count FROM UserCourses WHERE user_id = :userID AND course_id = :courseID";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
                $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
                if ($result['count'] == 0) {
                    $this->response("User or Course not found", 404);
                    return;
                }
        
                $sql = "SELECT url FROM Videos WHERE course_id = :courseID ORDER BY video_id ASC";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
                $stmt->execute();
                $urls = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
                $sql = "SELECT video_status FROM UserCourses WHERE user_id = :userID AND course_id = :courseID";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
                $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
                $stmt->execute();
                $status = $stmt->fetch(PDO::FETCH_ASSOC);
        
                $videoStatusList = isset($status['video_status']) ? explode(",", $status['video_status']) : [];
        
                $finalResult = [];
                foreach ($urls as $index => $url) {
                    $finalResult[$url] = isset($videoStatusList[$index]) ? (int)$videoStatusList[$index] : 0;
                }
        
                $this->response($finalResult, 200);
                return;
            }
        
            $this->response("Access Fail", 400);
        }


        public function insertVideo($accessToken, $username, $data) {
            if (!$this->userController->isValidToken($accessToken, $username) || !$this->userController->isAdmin($username)) {
                return false;
            }
        
            $videoListLink = $data['url_list'];
            $videoLinks = $this->getVideoLink($videoListLink)["message"]['urls'];
            $courseID = $data['course_id'];
            
            $videoID = 0;
            $sql = "INSERT INTO Videos (video_id, course_id, video_path, script, url, fps) 
                    VALUES (:videoID, :courseID, :videoPath, :script, :url, :fps)";
            $stmt = $this->db->conn->prepare($sql);
        
            foreach ($videoLinks as $videoLink) {
                $videoID++;
                $params = [
                    ':videoID' => $videoID,
                    ':courseID' => $courseID,
                    ':videoPath' => 'A',
                    ':script' => 'A',
                    ':url' => $videoLink,
                    ':fps' => 25,
                ];
                $stmt->execute($params);
            }
        
            return $stmt->rowCount() > 0;
        }


        public function getVideoLink($youtubeurl) {
            $url = "http://python:8002/getUrllist";
            
            $data = [
                "url" => $youtubeurl
            ];
            
            $json_data = json_encode($data);
            
            $options = [
                'http' => [
                    'method'  => 'POST',
                    'header'  => "Content-Type: application/json\r\n",
                    'content' => $json_data
                ]
            ];
            
            $context = stream_context_create($options);
            
            $result = file_get_contents($url, false, $context);
            

            
            return json_decode($result, true);
        }

        private function response($message, $statusCode) {
            http_response_code($statusCode);
            echo json_encode(['message' => $message, 'status' => $statusCode]);
        }



    }

?>