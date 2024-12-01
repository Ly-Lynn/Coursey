<?php
    require_once '../../cors/cors.php';
    require_once '/var/www/html/vendor/autoload.php';
    require_once '../../db/courseControlers.php';

    // header('Content-Type: application/json');
    $courseController = new CourseController();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $headers = getallheaders();
        $accessToken = $headers["Authorization"];   
        $data = json_decode(file_get_contents("php://input"), true);
        // echo json_encode($data);
        $courseController->insertCourse($accessToken, $data["username"], $data);
        
    }


    else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $courseID = isset($_GET["courseID"]) ? $_GET["courseID"] : null;
        $courseController->getAllCourse($courseID);
    }
    


    else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $headers = getallheaders();
        $accessToken = $headers["Authorization"];   
        $data = json_decode(file_get_contents("php://input"), true);
        $courseController->deleteCourse($accessToken, $data["username"], $data['course_id']);
    }


?>