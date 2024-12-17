<?php
    include '../../cors/cors.php'; 
    require_once '/var/www/html/vendor/autoload.php';

    require_once '../../db/courseControlers.php';
    require_once '../../db/usersControlers.php';
    // require_once '../../db/mediaControlers.php';

    // header('Content-Type: application/json');
    $courseController = new CourseController();
    $userController = new UserController();
    // $mediaController = new MediaControllers();

// process: current course, teenvideo, thời gian video
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $headers = getallheaders();
        $data = json_decode(file_get_contents("php://input"), true); # username
        $courseController->buyCourse($data["userID"], $data["courseID"]);

        $message = "
        Kính chào {$data['username']},
        Chúng tôi vui mừng thông báo rằng bạn đã mua khóa học '{$data['courseName']}' thành công.
        Chúc bạn học tập hiệu quả và đạt được những mục tiêu của mình.
        Trân trọng,
        Đội ngũ Coursey chân thành cảm ơn.
        ";
        $userController->sendNotification($message, $data["email"]);
    }







?>