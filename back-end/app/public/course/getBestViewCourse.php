<?php
    include '../../cors/cors.php'; 
    require_once '/var/www/html/vendor/autoload.php';

    require_once '../../db/courseControlers.php';

    // header('Content-Type: application/json');
    $courseController = new CourseController();

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $courseController->getBestViewCourse();
    }
?>