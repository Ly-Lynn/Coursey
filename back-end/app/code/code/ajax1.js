$(document).ready(function() {
    // Hàm để tải danh sách sản phẩm từ cơ sở dữ liệu
    function loadProducts() {
        $.post('getProducts.php', {}, function(data) {
            var productTable = $('.productTable tbody');
            productTable.empty();  // Xóa dữ liệu cũ

            // Chèn trực tiếp HTML từ server vào bảng
            productTable.append(data);

            // Bắt sự kiện click khi nhấn vào mỗi dòng
            $('.productTable tbody tr').click(function() {
                // Xóa highlight các dòng khác
                $('.productTable tbody tr').removeClass('table-active');

                // Highlight dòng được chọn
                $(this).addClass('table-active');

                //lấy dữ liệu dòng được click
                var masp = $(this).find('td:eq(0)').text();
                var tensp = $(this).find('td:eq(1)').text();
                var dvt = $(this).find('td:eq(2)').text();
                var nuocsx = $(this).find('td:eq(3)').text();
                var gia = $(this).find('td:eq(4)').text();

                // Đặt dữ liệu vào form
                $('#masp').val(masp);
                $('#tensp').val(tensp);
                $('#dvt').val(dvt);
                $('#nuocsx').val(nuocsx);
                $('#gia').val(gia);
            });
            
            $('.deleteButton').click(function() {
                var masp = $(this).data('id');  // Lấy MASP từ thuộc tính data-id

                // Hiển thị thông báo xác nhận trước khi xóa
                if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
                    $(this).parent().parent().remove();
                    $.post('deleteProduct.php', { masp: masp }, function(response) {
                        alert(response);  // Hiển thị thông báo phản hồi từ server
                        //loadProducts();   // Tải lại danh sách sản phẩm sau khi xóa
                    });
                }
            });
            
        });
    }

    // Gọi hàm loadProducts khi trang được tải
    loadProducts();

    // Hàm để cập nhật sản phẩm sử dụng $.post
    $('#updateButton').click(function() {
        var formData = {
            masp: $('#masp').val(),
            tensp: $('#tensp').val(),
            dvt: $('#dvt').val(),
            nuocsx: $('#nuocsx').val(),
            gia: $('#gia').val()
        };

        // Sử dụng $.post để gửi dữ liệu qua Ajax
        $.post('updateProduct.php', formData, function(response) {
            alert(response);  // Hiển thị thông báo phản hồi từ server
            loadProducts();   // Tải lại danh sách sản phẩm sau khi cập nhật
        });
    });

    // Tìm kiếm và highlight dòng tìm thấy
    $('#searchKeyword').keypress(function(event) {
        if (event.which === 13) {  // Kiểm tra phím Enter (keycode 13)
            event.preventDefault();  // Ngăn chặn hành vi mặc định của Enter (nếu có)
            var keyword = $('#searchKeyword').val().toLowerCase();  // Lấy từ khóa tìm kiếm
            keyword = keyword.trim();
            
            $('.productTable tbody tr').removeClass('table-active');

            // Duyệt qua tất cả các dòng trong bảng và tìm kiếm
            $('.productTable tbody tr').each(function() {
                var masp = $(this).find('td:eq(0)').text().toLowerCase();
                var tensp = $(this).find('td:eq(1)').text().toLowerCase();
                // Kiểm tra nếu mã sản phẩm hoặc tên sản phẩm khớp với từ khóa
                if (masp.includes(keyword) || tensp.includes(keyword)) {
                    $(this).addClass('table-active');  // Highlight dòng khớp
                }
                
            });
        }
    });
});
