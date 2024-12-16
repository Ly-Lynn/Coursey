<?php
    if (isset($_POST['masp'])) {
        $masp = $_POST['masp'];

        include "connect.php";
        // Thực hiện câu lệnh xóa
        $sql= "Delete from CTHD where MASP='$masp'";
        $sql1 = "DELETE FROM SANPHAM WHERE MASP = '$masp'";
        
        if ($conn->query($sql)) {
            $conn->query($sql1);
            echo "Sản phẩm đã được xóa thành công.";
        } else {
            echo "Lỗi khi xóa sản phẩm: " . $conn->error;
        }
        $conn->close();
    }
?>
