<?php

    require_once '/var/www/html/vendor/autoload.php';

    require_once '../../db/courseControlers.php';

    header('Content-Type: application/json');
    $courseController = new CourseController();

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $headers = getallheaders();
        $courseID = $_GET['courseID'];
        $accessToken = $headers["Authorization"] ?? null;
        $data = json_decode(file_get_contents("php://input"), true);
        $courseController->CourseUserCheck($data, $courseID, $accessToken);
    }

?>