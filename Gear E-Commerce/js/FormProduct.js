window.onload = function () {
    var url = window.location.href;
    if (url.indexOf("id=") != -1) {
        var id = url.split("id=")[1];
        document.getElementById("inId").value = id;

        if (id == "1") {
            document.getElementById("inTen").value = "Bàn phím cơ Logitech G Pro X";
            document.getElementById("inDanhmuc").value = "Bàn phím";
            document.getElementById("inGia").value = "2990000";
            document.getElementById("inKho").value = "50";
        } else if (id == "2") {
            document.getElementById("inTen").value = "Chuột Razer DeathAdder V3";
            document.getElementById("inDanhmuc").value = "Chuột";
            document.getElementById("inGia").value = "1690000";
            document.getElementById("inKho").value = "0";
        } else if (id == "3") {
            document.getElementById("inTen").value = "Tai nghe HyperX Cloud III";
            document.getElementById("inDanhmuc").value = "Tai nghe";
            document.getElementById("inGia").value = "2290000";
            document.getElementById("inKho").value = "120";
        }
    }
};

function kiemtra() {
    var ten = document.getElementById("inTen").value.trim();
    var danhmuc = document.getElementById("inDanhmuc").value.trim();
    var gia = parseInt(document.getElementById("inGia").value);
    var kho = parseInt(document.getElementById("inKho").value);
    var loi = document.getElementById("loi");

    if (ten == "" || danhmuc == "") {
        loi.innerHTML = "Vui lòng nhập tên sản phẩm và danh mục!";
        return false;
    }

    if (isNaN(gia) || isNaN(kho)) {
        loi.innerHTML = "Giá bán và số lượng trong kho phải là số!";
        return false;
    }

    if (gia < 0 || kho < 0) {
        loi.innerHTML = "Giá bán và số lượng trong kho không được là số âm!";
        return false;
    }

    alert("Lưu sản phẩm thành công!");
    window.location.href = "AdminProduct.html";
    return false;
}
