<?php
    require_once '/var/www/html/vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable("/app/.env");
    $dotenv->load();
    
    class Database {
        private $host;
        private $user;
        private $password;
        private $dbName;

        public $conn;

        public function __construct()
        {   
            $this->host = $_ENV["MYSQL_HOST"];
            $this->user = $_ENV["MYSQL_USER"];
            $this->password = $_ENV["MYSQL_PASSWORD"];
            $this->dbName = $_ENV["MYSQL_DATABASE"];
            $this->connect();
        }

        private function connect() {
            try {
                $this->conn = new PDO("mysql:host={$this->host};dbname={$this->dbName}", $this->user, $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            catch (PDOException $e) {
                die("Connected fail to database: " . $e->getMessage());
            }
        }


    }

?>