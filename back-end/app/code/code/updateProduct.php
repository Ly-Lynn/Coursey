<?php
    include "connect.php"; 
    // Lấy dữ liệu từ yêu cầu Ajax
    $masp = $_POST['masp'];
    $tensp = $_POST['tensp'];
    $dvt = $_POST['dvt'];
    $nuocsx = $_POST['nuocsx'];
    $gia = $_POST['gia'];
    // Cập nhật dữ liệu sản phẩm
    $sql = "UPDATE SANPHAM SET TENSP='$tensp', DVT='$dvt', NUOCSX='$nuocsx', GIA='$gia' WHERE MASP='$masp'";

    if ($conn->query($sql) === TRUE) 
    {
        echo "Cập nhật thành công";
    } 
    else 
    {
        echo "Lỗi: " . $conn->error;
    }

    $conn->close();
?>
