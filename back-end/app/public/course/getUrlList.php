<?php
    // include 'cors.php'; 
    require_once '../../cors/cors.php';

    require_once '/var/www/html/vendor/autoload.php';
    require_once '../../db/videoController.php';

    // header('Content-Type: application/json');
    $videoController = new VideoController();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $headers = getallheaders();

        $data = json_decode(file_get_contents("php://input"), true);
        $accessToken = $headers["Authorization"] ?? null;
        $videoController->getUrlCode($data['userID'], $data['username'], $accessToken, $data['courseID']);
        
    }


?>