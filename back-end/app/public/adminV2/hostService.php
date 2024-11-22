<?php

    require_once '/var/www/html/vendor/autoload.php';

    require_once '../../db/hostController.php';

    header('Content-Type: application/json');
    $hostController = new hostController();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $headers = getallheaders();
        $accessToken = $headers["Authorization"];   
        $data = json_decode(file_get_contents("php://input"), true);
        $hostController->insertHost($accessToken, $data["username"], $data);

    }


    else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $hostID = isset($_GET["hostID"]) ? $_GET["hostID"] : null;
        $hostController->getHost($hostID);
    }
    


    else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $headers = getallheaders();
        $accessToken = $headers["Authorization"];   
        $hostID= $_GET["hostID"];
        $data = json_decode(file_get_contents("php://input"), true);
        $hostController->deleteHost($accessToken, $data["username"], $hostID);
    }

    else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $headers = getallheaders();
        $data = json_decode(file_get_contents("php://input"), true);
        $accessToken = $headers["Authorization"];   
        $hostController->updateHost($accessToken, $data["username"], $data);
    }

?>