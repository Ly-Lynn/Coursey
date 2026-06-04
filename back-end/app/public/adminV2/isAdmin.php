<?php

    require_once '/var/www/html/vendor/autoload.php';
    require_once '../../db/usersControlers.php';
    // require_once '../../cors/cors.php';
    header('Content-Type: application/json');
    $userController = new UserController();
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $headers = getallheaders();
        $accessToken = $headers["Authorization"];
        $data = json_decode(file_get_contents("php://input"), true);
        if (isValidToken($accessToken, $data['username']) && $userController->isAdmin($data['username'])) {
            echo json_encode(array("isAdmin" => true));
        }
    }
?>