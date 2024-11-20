<?php 
    // ini_set('memory_limit', '5096M');

    require_once 'connect.php';
    require_once 'usersControlers.php';
    require_once 'hostController.php';
    require_once 'lecturerControlers.php';
    require_once 'videoController.php';
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
                $sql = "DELETE FROM Videos WHERE course_id = :CourseID";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':CourseID', $CourseID);
                $stmt->execute();

                if ($stmt->rowCount() === 0) {
                    $this->response("Delete Courses failed", 401);
                    return;
                }

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

            $this->response("No permissions", 401);
        }


        

        # get courses with specific id
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

        # get header Course
        public function CourseInfo($data, $courseID, $accessToken) {
            if ($this->CourseUserCheck($data, $courseID, $accessToken, false)) {
                $sql = "SELECT * FROM Courses where course_id = :courseID";
                $stmt = $this->db->conn->prepare($sql);
                $stmt->bindParam(':courseID', $courseID);
                $stmt->execute();
                $course = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->response($course, 200);
                return;
            }
            $this->response("Access fail", 401);
        }

        public function getAllCourse($courseID) {
            if(!$courseID) {
                $sql = "SELECT * FROM Courses";
                $stmt = $this->db->conn->prepare($sql);
            }
            else {
                $sql = "SELECT * FROM Courses WHERE course_id = :courseID";
    
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
            $sql = "SELECT * FROM Courses ORDER BY rate DESC LIMIT :quantity";
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
            $sql = "SELECT *  FROM Courses ORDER BY views DESC LIMIT :quantity";
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



        private function response($message, $statusCode) {
            http_response_code($statusCode);
            echo json_encode(['message' => $message]);
        }
    }
?>