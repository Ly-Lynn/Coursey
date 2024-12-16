<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Danh sách sản phẩm</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
</head>
<body>
    <div class ="container border">
    Nhập ID hoặc tên: <input type="text" size="40" id="searchKeyword" placeholder="Tìm mã sản phẩm hoặc tên sản phẩm">
    <div class="row g-3">    
        <div class="col-md-7 ml-2">
        <h2>Danh sách sản phẩm</h2>
        <table border="1"  class="productTable table table-hover table-bordered">
            <thead>
                <tr>
                    <th>Mã SP</th>
                    <th>Tên SP</th>
                    <th>ĐVT</th>
                    <th>Nước SX</th>
                    <th>Giá</th>
                </tr>
            </thead>
            <tbody>
                <!-- Danh sách sản phẩm sẽ được tải bằng Ajax -->
            </tbody>
        </table>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-4 ml-0">
        <h2>Thông tin sản phẩm</h2>
        <form id="updateForm">
            <label>Mã SP:</label><br>
            <input type="text" id="masp" name="masp" readonly><br>
            <label>Tên SP:</label><br>
            <input type="text" id="tensp" name="tensp"><br>
            <label>ĐVT:</label><br>
            <input type="text" id="dvt" name="dvt"><br>
            <label>Nước SX:</label><br>
            <input type="text" id="nuocsx" name="nuocsx"><br>
            <label>Giá:</label><br>
            <input type="text" id="gia" name="gia"><br><br>
            <button type="button" id="updateButton">Cập nhật</button>
        </form>
        </div>
    </div>
    <script src="ajax1.js"></script>
        
</body>
</html>
