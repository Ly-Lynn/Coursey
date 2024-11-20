<?php
    require_once 'connect.php';
    require_once "courseControlers.php";

    class VideoController {
        private $db;
        private $userController;
        public function __construct() {
            $this->db = Database::getInstance();
            $this->userController = new UserController();
        }

        public function insertVideo($accessToken, $username, $data) {
            if (!$this->userController->isValidToken($accessToken, $username) || !$this->userController->isAdmin($username)) {
                return false;
            }
        
            $videoListLink = $data['url'];
            $videoLinks = $this->getVideoLink($videoListLink);
            $courseID = $data['courseID'];
        
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
            $url = "http://localhost:8080/python/getUrllist";

            $data = [
                "url" => $youtubeurl
            ];
            
            $options = [
                "http" => [
                    "header" => "Content-Type: application/json\r\n",
                    "method" => "POST",
                    "content" => json_encode($data),
                ]
            ];
            
            $context = stream_context_create($options);
            
            $response = file_get_contents($url, false, $context);
            
            if ($response['message'] === "Error") {
                return false;
            } 
            else {
                return $response["message"];
            }
        }
    }

?>