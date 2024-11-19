<?php
    require_once 'connect.php';
    require_once "courseControlers.php";

    class VideoController {
        private $db;
        private $courseController;
        public function __construct() {
            $this->db = new Database();
            $this->courseController = new CourseController();
        }
    }

?>