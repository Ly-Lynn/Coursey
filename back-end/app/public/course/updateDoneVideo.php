<?php
    // include 'cors.php'; 
    require_once '../../cors/cors.php';

    require_once '/var/www/html/vendor/autoload.php';
    require_once '../../db/courseControlers.php';

    // header('Content-Type: application/json');
    $courseController = new CourseController();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $data = json_decode(file_get_contents("php://input"), true);
        $courseController->updateDoneVideo($data['userID'], $data['courseID'], $data['videoCode']);
        
    }
?>