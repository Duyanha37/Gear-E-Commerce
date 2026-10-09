var dsSanPham = [
    { id: 1, ma: "#SP001", ten: "Bàn phím cơ Logitech G Pro X", danhmuc: "Bàn phím", gia: "2.990.000đ", kho: 50, anh: "assets/images/chuot-game-khong-day-logitech-g304-trang-usb-7.jpg" },
    { id: 2, ma: "#SP002", ten: "Chuột Razer DeathAdder V3", danhmuc: "Chuột", gia: "1.690.000đ", kho: 0, anh: "assets/images/chuot-may-tinh-logitech-su-dang-cap-da-duoc-chung-08-800x450.webp" },
    { id: 3, ma: "#SP003", ten: "Tai nghe HyperX Cloud III", danhmuc: "Tai nghe", gia: "2.290.000đ", kho: 120, anh: "assets/images/tai-nghe-gaming-overear-hyperx-cloud-iii-s2.png" }
];

function hienThi(ds) {
    var tbody = document.getElementById("productBody");
    var html = "";

    if (ds.length == 0) {
        tbody.innerHTML = "<tr><td colspan='7' style='text-align:center; padding: 20px;'>Không tìm thấy sản phẩm nào.</td></tr>";
        return;
    }

    for (var i = 0; i < ds.length; i++) {
        var sp = ds[i];
        var khoHtml = sp.kho;

        if (sp.kho == 0) {
            khoHtml = "<span class='hethang'>Hết hàng</span>";
        }

        html += "<tr>";
        html += "<td>" + sp.ma + "</td>";
        html += "<td><img class='anh' src='" + sp.anh + "' alt='" + sp.ten + "'></td>";
        html += "<td>" + sp.ten + "</td>";
        html += "<td>" + sp.danhmuc + "</td>";
        html += "<td class='gia'>" + sp.gia + "</td>";
        html += "<td>" + khoHtml + "</td>";
        html += "<td>";
        html += "<a class='btn edit' href='EditProduct.html?id=" + sp.id + "'><img src='assets/images/edit.png' alt='Sửa'></a> ";
        html += "<a class='btn delete' href='#' onclick='xoa(" + sp.id + "); return false;'><img src='assets/images/delete.png' alt='Xóa'></a>";
        html += "</td>";
        html += "</tr>";
    }

    tbody.innerHTML = html;
}

function xoa(id) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        var viTri = -1;

        for (var i = 0; i < dsSanPham.length; i++) {
            if (dsSanPham[i].id == id) {
                viTri = i;
                break;
            }
        }

        if (viTri != -1) {
            dsSanPham.splice(viTri, 1);
            timkiem();
        }
    }
}

function timkiem() {
    var tukhoa = document.getElementById("searchInput").value.toLowerCase();
    var ketqua = [];

    for (var i = 0; i < dsSanPham.length; i++) {
        var ma = dsSanPham[i].ma.toLowerCase();
        var ten = dsSanPham[i].ten.toLowerCase();

        if (ma.indexOf(tukhoa) != -1 || ten.indexOf(tukhoa) != -1) {
            ketqua.push(dsSanPham[i]);
        }
    }

    hienThi(ketqua);
}

window.onload = function () {
    hienThi(dsSanPham);
};
