<?php 
    require_once 'connect.php';
    require_once 'usersControlers.php';
    class CourseController {
        private $db;
        private $userController;

        public function __construct() {
            $this->db = new Database();
            $this->userController = new UserController();
        }

        public function insertCourse($userInfo, $data) {
            $accessToken = $userInfo['access_token'];
            $username = $userInfo['username'];
            if ($this->userController->isValidToken($accessToken, $username) && $this->userController->isAdmin($username)) {
                $courseName = $data['courseName'];
                $courseIntro = $data['courseIntro'];
                $lecturerID = $data['lecturerID'];
                $hostID = $data['hostID'];
                $image = $data["image"];
                $hours = $data["hours"];
                $cost = $data["cost"];
                $field = $data["field"];
                $learners = 0;
                $gained = $data["gained"];
                $require = $data["require"];
                $ratingCount = $data["ratingcount"]

                # check if hostID and letureID is exist in the system


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