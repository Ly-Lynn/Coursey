<?php
    
    include '../../cors/cors.php'; 

    require_once '/var/www/html/vendor/autoload.php';

    require_once '../../db/usersControlers.php';

    // require_once '../../cors/cors.php';

    $userController = new UserController();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $data = json_decode(file_get_contents("php://input"), true);

        $userController->login($data);

    }


?>