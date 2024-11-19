<?php 
    require_once 'connect.php';
    require_once 'usersControlers.php';
    require_once 'hostController.php';
    require_once 'lecturerControlers.php';
    class CourseController {
        private $db;
        private $userController;
        private $hostController;
        private $lecturerController;


        public function __construct() {
            $this->db = new Database();
            $this->userController = new UserController();
            $this->hostController = new HostController();
            $this->lecturerController = new LectuterController();
        }


        public function insertCourse($accessToken, $username, $data) {  
            if ($this->userController->isValidToken($accessToken, $username) && $this->userController->isAdmin($username)) {
                $fields = [];
                $placeholders = [];
                $params = [];
            
                foreach ($data as $key => $value) {
                    if ($key === 'username') continue;
            
                    $fields[] = $key;
                    $placeholders[] = ":$key";
                    $params[":$key"] = $value;
                }
                
                if (!$this->lecturerController->isLecturerExist($data['lecturer_id']) || !$this->hostController->isHostExist($data['host_id'])) {
                    $this->response("Lecturer or Host is not exist", 401);
                }

                else {
                    $sql = "INSERT INTO COURSE (" . implode(', ', $fields) . ") VALUES (" . implode(', ', $placeholders) . ")";
                    $stmt = $this->db->conn->prepare($sql);
                    $stmt->execute($params);
    
                    if ($stmt->rowCount() > 0) {
                        $this->response("Course inserted successfully", 200);
                    } 
                    else {
                        $this->response("Insert failed", 401);
                    }
                }

            }

            else {
                $this->response("No permission", 401);
            }
                
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