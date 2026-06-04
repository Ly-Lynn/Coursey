
<?php 
    // ini_set('memory_limit', '5096M');

    require_once 'connect.php';
    require_once 'usersControlers.php';
    require_once 'hostController.php';
    require_once 'lecturerControlers.php';
    require_once 'videoController.php';
    // require_once '../cors/cors.php';

    class CourseController {
        private $db;
        private $userController;
        private $hostController;
        private $lecturerController;
        private $videoController;


        public function __construct() {
            $this->db = Database::getInstance();
            $this->userController = new UserController();
            $this->hostController = new HostController();
            $this->lecturerController = new LectuterController();
            $this->videoController = new VideoController();
        }


        public function insertCourse($accessToken, $username, $data) { 
            $response = ['error' => null, 'insertCourse' => false, 'insertVideo' => false];
            $statusCode = 401;

            if ($this->userController->isValidToken($accessToken, $username) && $this->userController->isAdmin($username)) {
                if (!$this->lecturerController->isLecturerExist($data['lecturer_id']) || !$this->hostController->isHostExist($data['host_id'])) {
                    $response['error'] = "Lecturer or Host already exist";
                    $this->response($response, $statusCode);
                    return;
                }
        
                $fields = [];
                $placeholders = [];
                $params = [];
        
                foreach ($data as $key => $value) {
                    if ($key === 'username') continue;
        
                    $fields[] = $key;
                    $placeholders[] = ":$key";
                    $params[":$key"] = $value;
                }
                
                $videoResponse = $this->videoController->getVideoLink($data['url_list']);
                
                // Check if the response is valid and contains the expected data
                if (!isset($videoResponse['message']) || !is_array($videoResponse['message'])) {
                    $errorMsg = "Failed to fetch video information: ";
                    if (is_string($videoResponse['message'])) {
                        $errorMsg .= $videoResponse['message'];
                        // Add detailed error info if available
                        if (isset($videoResponse['details'])) {
                            $errorMsg .= " - Details: " . $videoResponse['details'];
                        }
                    } else {
                        $errorMsg .= 'Invalid response';
                    }
                    $response['error'] = $errorMsg;
                    $this->response($response, 400);
                    return;
                }
                
                $videoLinks = $videoResponse['message'];
                
                // Validate required fields exist
                if (!isset($videoLinks['view_count']) || !isset($videoLinks['total_times'])) {
                    $response['error'] = "Invalid video data structure";
                    $this->response($response, 400);
                    return;
                }
                
                $views = $videoLinks['view_count'];
                $hours = $videoLinks['total_times'];
                $fields[] = 'views'; 
                $placeholders[] = ':views'; 
                $params[':views'] = $views;

                $fields[] = 'hours'; 
                $placeholders[] = ':hours'; 
                $params[':hours'] = $hours; 


                
                $sql = "INSERT INTO Courses (" . implode(', ', $fields) . ") VALUES (" . implode(', ', $placeholders) . ")";
                
                $stmt = $this->db->conn->prepare($sql);
                $stmt->execute($params);
        
                if ($stmt->rowCount() > 0) {
                    $response['insertCourse'] = true;
                    
                    if ($this->videoController->insertVideo($accessToken, $username, $data)) {
                        $response['insertVideo'] = true;
                        $statusCode = 200;
                    }
                } 
                else {
                    $response['error'] = "Failed to insert course";
                }
            } 
            else {
                $response['error'] = "No permission";
            }

            $this->response($response, $statusCode);
        }

        public function deleteCourse($accessToken, $username, $CourseID) { 

            if ($this->userController->isValidToken($accessToken, $username) && $this->userController->isAdmin($username)) {
                # delete video

                $sqlDeleteUserCourses = "DELETE FROM UserCourses WHERE course_id = :CourseID";
                $stmtUserCourses = $this->db->conn->prepare($sqlDeleteUserCourses);
                $stmtUserCourses->bindParam(':CourseID', $CourseID);
                $stmtUserCourses->execute();

                $sql = "DELETE FROM Videos WHERE course_id = :CourseID";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':CourseID', $CourseID);
                $stmt->execute();

                // if ($stmt->rowCount() === 0) {
                //     $this->response("Delete Courses failed", 401);
                //     return;
                // }

                # delete Course
                $sql = "DELETE FROM Courses WHERE course_id = :CourseID";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':CourseID', $CourseID);
                $stmt->execute();
                if ($stmt->rowCount() === 0) {
                    $this->response("Delete Course failed", 401);
                    return;
                }
                else {
                    $this->response("Delete Course success", 200);
                    return;
                }
            }
            else {
                $this->response("No permissions", 401);

            }
        }


        

        public function CourseUserCheck($data, $courseID, $accessToken, $api_return=true) {
            $userID = $data['userID'];
            $username = $data['username'];
            $return = ['isValidCourseUsers'=> false, 'isValidUsers' => false];
            $status_code = 401;
            if ($this->userController->isValidToken($accessToken, $username)) {
                $return['isValidUsers'] = true;



                $sql = "SELECT * FROM UserCourses where user_id = :userID and course_id = :courseID";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':userID', $userID);
                $stmt->bindParam(':courseID', $courseID);
                $stmt->execute();
                $courseUser = $stmt->fetch(PDO::FETCH_ASSOC);
                if($courseUser) {
                    $return['isValidCourseUsers'] = true;
                    $status_code = 200;
                    if (!$api_return) {
                        return true;
                    }
                }

            }

            if ($api_return) {
                $this->response($return, $status_code);
            }
            else {
                return false;
            }
        
        }   




        public function CourseInfo($data, $accessToken) {

            if ($this->userController->isValidToken($accessToken, $data['username'])) {
                $sql = "SELECT c.*, Hosts.logo_image
                    FROM Courses c
                    INNER JOIN UserCourses uc ON c.course_id = uc.course_id
                    WHERE uc.user_id = :userID";
            
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':userID', $data['userID']);
                $stmt->execute();
                $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $this->response($courses, 200);
                return;
            }
            $this->response("Access fail", 401);
        }
            

        public function getCurrentCourse($data, $accessToken) {
            if ($this->userController->isValidToken($accessToken, $data['username'])) {
                try {
                    $sql = "SELECT course_id, video_status FROM UserCourses WHERE user_id = :userID";
                    $stmt = $this->db->conn->prepare($sql);
                    $stmt->bindParam(':userID', $data['userID']);
                    $stmt->execute();
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
                    $finalResult = [];
                    foreach ($result as $row) {
                        $courseID = $row['course_id'];
                        $videoStatus = isset($row['video_status']) ? explode(",", $row['video_status']) : [];
        
                        // Kiểm tra nếu tất cả video đã hoàn thành
                        if (count($videoStatus) > 0 && array_sum($videoStatus) == count($videoStatus)) {
                            continue; // Bỏ qua khóa học này
                        }
        
                        $completedVideos = count(array_filter($videoStatus, fn($status) => $status == '1'));
                        $totalVideos = count($videoStatus);
                        $progress = $totalVideos > 0 ? ($completedVideos / $totalVideos) * 100 : 0;
        
                        $finalResult[] = [
                            'course_id' => $courseID,
                            'progress' => $progress 
                        ];
                    }
        
                    $this->response($finalResult, 200);
                    return;
                } catch (PDOException $e) {
                    $this->response("Database error: " . $e->getMessage(), 500);
                    return;
                }
            }
        
            $this->response("Access fail", 401);
        }

        public function getFinishCourse($data, $accessToken) {

            if($this->userController->isValidToken($accessToken, $data['username'])) {
                $sql = "SELECT course_id FROM UserCourses WHERE user_id = :userID AND is_completed = 1";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':userID', $data['userID']);
                $stmt->execute();
                $course = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $this->response($course, 200);
                return; 
            }
            $this->response("Access fail", 401);
        }

        public function getAllCourse($courseID) {
            if(!$courseID) {
                $sql = "SELECT c.*, 
                                l.name, h.host_name, h.logo_image
                        FROM Courses c
                        LEFT JOIN Lecturers l ON c.lecturer_id = l.lecturer_id
                        LEFT JOIN Hosts h ON c.host_id = h.host_id
                        ";  
                $stmt = $this->db->conn->prepare($sql);
            }
            else {
                $sql = "SELECT c.*, 
                                l.name, h.host_name, h.logo_image
                        FROM Courses c
                        LEFT JOIN Lecturers l ON c.lecturer_id = l.lecturer_id
                        LEFT JOIN Hosts h ON c.host_id = h.host_id
                        WHERE c.course_id = :courseID";               

                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
            }
    
            $stmt->execute();
    
            $course = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            if ($course) {
                $this->response($course, 200);
            } else {
                $this->response("Course not found", 404);
            }
        }


        public function getAllCourse_($courseID) {
            if(!$courseID) {
                $sql = "SELECT c.*, 
                                l.name, h.host_name, h.logo_image
                        FROM Courses c
                        LEFT JOIN Lecturers l ON c.lecturer_id = l.lecturer_id
                        LEFT JOIN Hosts h ON c.host_id = h.host_id
                        ";  
                $stmt = $this->db->conn->prepare($sql);
            }
            else {
                $sql = "SELECT c.*, 
                                l.name, h.host_name, h.logo_image
                        FROM Courses c
                        LEFT JOIN Lecturers l ON c.lecturer_id = l.lecturer_id
                        LEFT JOIN Hosts h ON c.host_id = h.host_id
                        WHERE c.course_id = :courseID";               

                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
            }
    
            $stmt->execute();
    
            $course = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            if ($course) {
                $this->response($course, 200);
            } else {
                $this->response("Course not found", 404);
            }
        }


        public function getBestRatingCourse($quantity=5) {        
            // $sql = "SELECT * FROM Courses ORDER BY rate DESC LIMIT :quantity";
            $sql = "SELECT c.*, l.name, h.host_name, h.logo_image 
                    FROM Courses c
                    LEFT JOIN Lecturers l ON c.lecturer_id = l.lecturer_id
                    LEFT JOIN Hosts h ON c.host_id = h.host_id
                    ORDER BY c.rate DESC 
                    LIMIT :quantity";


            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
            $stmt->execute();
            $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            if ($courses) {
                $this->response($courses, 200);
            } else {
                $this->response("No courses found", 404);
            }
        }


        
        public function getBestViewCourse($quantity=5) {        
            $sql = "SELECT c.*, l.name, h.host_name, h.logo_image 
                    FROM Courses c
                    LEFT JOIN Lecturers l ON c.lecturer_id = l.lecturer_id
                    LEFT JOIN Hosts h ON c.host_id = h.host_id
                    ORDER BY c.views DESC 
                    LIMIT :quantity";

            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
            $stmt->execute();
            $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            if ($courses) {
                $this->response($courses, 200);
            } else {
                $this->response("No courses found", 404);
            }
        }   

        public function updateCurrentVideoCourse($userID, $courseID, $currentVideoID) {
            $sql = "UPDATE UserCourses SET current_video_id = :currentVideoID WHERE course_id = :courseID AND user_id = :userID";
            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
            $stmt->bindParam(':currentVideoID', $currentVideoID, PDO::PARAM_INT);
            $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
            $stmt->execute();
            $this->response("Success", 200);
        }


        public function updateDoneVideo($userID, $courseID, $videoCode) {
            $sql = "SELECT video_status FROM UserCourses WHERE user_id = :userID AND course_id = :courseID";
            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
            $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
            $stmt->execute();
            $status = $stmt->fetch(PDO::FETCH_ASSOC);
        
            if (!$status) {
                $this->response("User or Course not found", 404);
                return;
            }
        
            $videoStatusList = isset($status['video_status']) ? explode(",", $status['video_status']) : [];

            $sql = "SELECT video_id FROM Videos WHERE course_id = :courseID AND url = :videoCode";
            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
            $stmt->bindParam(':videoCode', $videoCode, PDO::PARAM_STR);
            $stmt->execute();
            $videoResult = $stmt->fetch(PDO::FETCH_ASSOC);
        
            if (!$videoResult) {
                $this->response("Video not found", 404);
                return;
            }
        
            $videoID = (int)$videoResult['video_id'];
        
            if ($videoID > count($videoStatusList) || $videoID < 1) {
                $this->response("Invalid video ID", 400);
                return;
            }
        
            $videoStatusList[$videoID - 1] = 1;
        
            $updatedStatus = implode(",", $videoStatusList);
        
            $sql = "UPDATE UserCourses SET video_status = :videoStatus WHERE user_id = :userID AND course_id = :courseID";
            $stmt = $this->db->conn->prepare($sql);
            $stmt->bindParam(':videoStatus', $updatedStatus, PDO::PARAM_STR);
            $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
            $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
            $stmt->execute();
        
            if (array_sum($videoStatusList) === count($videoStatusList)) {
                $sql = "UPDATE UserCourses SET is_completed = 1 WHERE user_id = :userID AND course_id = :courseID";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
                $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
                $stmt->execute();
            }
        
            $this->response('Video status updated successfully', 200);
        }

        public function buyCourse($userID, $courseIDs) {
            $this->db->conn->beginTransaction();
        
            try {
                foreach ($courseIDs as $courseID) {
                    $sql = "INSERT INTO UserCourses (user_id, course_id, current_video_id, is_completed) 
                            VALUES (:userID, :courseID, 1, 0)";
                    $stmt = $this->db->conn->prepare($sql);
                    $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
                    $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
                    $stmt->execute();
        
                    $sql = "SELECT COUNT(*) as video_count FROM Videos WHERE course_id = :courseID";
                    $stmt = $this->db->conn->prepare($sql);
                    $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
                    $stmt->execute();
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    $videoCount = (int)$result['video_count'];
        
                    $videoStatus = implode(",", array_fill(0, $videoCount, '0'));
        
                    $sql = "UPDATE UserCourses SET video_status = :videoStatus 
                            WHERE user_id = :userID AND course_id = :courseID";
                    $stmt = $this->db->conn->prepare($sql);
                    $stmt->bindParam(':videoStatus', $videoStatus, PDO::PARAM_STR);
                    $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
                    $stmt->bindParam(':courseID', $courseID, PDO::PARAM_INT);
                    $stmt->execute();

                }
        
                $this->db->conn->commit();
                
                $message = "Bạn đã mua khóa học, Chúc bạn thành công trên con đường chinh phục học vấn.";
                $sql = "SELECT gmail FROM Users WHERE id = :userID";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
                $stmt->execute();
                $gmail = $stmt->fetch(PDO::FETCH_ASSOC)["gmail"];
                $this->userController->sendNotification($message, $gmail);

                $this->response("Success", 200);
        
            } catch (Exception $e) {
                $this->db->conn->rollBack();
                $this->response("Error: " . $e->getMessage(), 500);
            }
        }
        





        private function response($message, $statusCode) {
            http_response_code($statusCode);
            echo json_encode(['message' => $message, 'status' => $statusCode]);
        }
    }
?>