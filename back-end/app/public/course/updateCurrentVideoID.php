<?php
    // include 'cors.php'; 
    require_once '/var/www/html/vendor/autoload.php';
    require_once '../../db/courseControlers.php';
    // require_once '../../cors/cors.php';

    // header('Content-Type: application/json');
    $courseController = new CourseController();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $data = json_decode(file_get_contents("php://input"), true);
        $courseController->updateCurrentVideoCourse($data['userID'], $data['courseID'], $data['currentVideoID']);
        
    }


?>