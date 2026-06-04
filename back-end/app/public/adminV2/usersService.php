<?php
    require_once '../../cors/cors.php';
    require_once '/var/www/html/vendor/autoload.php';
    require_once '../../db/usersControlers.php';

    // header('Content-Type: application/json');
    $userController = new UserController();
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        $headers = getallheaders();
        $accessToken = $headers["Authorization"] ?? null;
        $data = json_decode(file_get_contents("php://input"), true);
        $userController->getAllUsers($accessToken, $data['username']);
    }

    else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        
        $headers = getallheaders();
        $accessToken = $headers["Authorization"] ?? null; 
        $data = json_decode(file_get_contents("php://input"), true);

        $userController->deleteUser($accessToken, $data['username'], $data['deletedID']);
    }   

    else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        
        $headers = getallheaders();
        $accessToken = $headers["Authorization"] ?? null;    
        $data = json_decode(file_get_contents("php://input"), true);    
        $userController->updateRole($accessToken, $data['username'], $data["updateUser"], $data["role"]);
    }

?>