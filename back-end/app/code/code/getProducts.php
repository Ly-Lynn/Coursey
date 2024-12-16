<?php
    include "connect.php";

    $query = "SELECT MASP, TENSP, DVT, NUOCSX, GIA FROM SANPHAM";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row['MASP'] . "</td>";
            echo "<td>" . $row['TENSP'] . "</td>";
            echo "<td>" . $row['DVT'] . "</td>";
            echo "<td>" . $row['NUOCSX'] . "</td>";
            echo "<td>" . $row['GIA'] . "</td>";
            echo "<td><button class='btn btn-danger deleteButton' data-id='" . $row['MASP'] . "'>Delete</button></td>";  // Thêm nút Delete
      
            echo "</tr>";
        }
    }
    $conn->close();
?>
