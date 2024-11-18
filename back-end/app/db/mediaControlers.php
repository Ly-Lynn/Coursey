<?php 

    class MediaControllers {

        public function __construct() {
            return ;
        }

        public function path2Base64($imagePath) {
            $imageData = file_get_contents($imagePath);
            $base64Image = 'data:image/jpeg;base64,' . base64_encode($imageData);
            return $base64Image;
        }


        public function Base642Image($imageData, $imagePath) {
            $base64Image = base64_decode($imageData);
            $base64Image = preg_replace('#^data:image/\w+;base64,#i', '', $base64Image);
            file_put_contents($imagePath, $base64Image);
        }


        public function URL2Base64($url) {
            $imageData = file_get_contents($url);
            return $imageData;
        }

    }
?>