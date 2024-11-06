<?php

    require_once '/var/www/html/vendor/autoload.php';

    require_once '../../db/usersControlers.php';

    header('Content-Type: application/json');
    $userController = new UserController();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $data = json_decode(file_get_contents("php://input"), true);

        # take json data 
        $userController->signup($data);
    }


?>