<?php
    include '../../cors/cors.php'; 
    require_once '/var/www/html/vendor/autoload.php';

    require_once '../../db/courseControlers.php';
    // require_once '../../db/mediaControlers.php';

    header('Content-Type: application/json');
    $courseController = new CourseController();
    // $mediaController = new MediaControllers();

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $headers = getallheaders();
        $courseID = $_GET['courseID'];
        $accessToken = $headers["Authorization"] ?? null;
        $data = json_decode(file_get_contents("php://input"), true); # username
        $courseController->CourseInfo($data, $courseID, $accessToken);
    }



?>