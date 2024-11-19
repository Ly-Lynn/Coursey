<?php

    require_once '/var/www/html/vendor/autoload.php';

    require_once '../../db/lecturerControlers.php';

    header('Content-Type: application/json');
    $lecturerController = new LectuterController();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $headers = getallheaders();
        $accessToken = $headers["Authorization"];   
        $data = json_decode(file_get_contents("php://input"), true);
        $lecturerController->insertLecturer($accessToken, $data["username"], $data);

    }


    else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $lecturerID = $_GET["lecturerID"];
        $lecturerController->getLecturer($lecturerID);
    }
    


    else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $headers = getallheaders();
        $accessToken = $headers["Authorization"];   
        $lecturerID = $_GET["lecturerID"];
        $data = json_decode(file_get_contents("php://input"), true);
        $lecturerController->deleteLecturer($accessToken, $data["username"], $lecturerID);
    }

    else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $headers = getallheaders();
        $data = json_decode(file_get_contents("php://input"), true);
        $accessToken = $headers["Authorization"];   
        $lecturerController->updateLecturer($accessToken, $data["username"], $data);
    }

?>