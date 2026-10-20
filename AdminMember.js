
// Lấy một phần tử theo ID
function lay(id) {
    return document.getElementById(id);
}

// Đóng tất cả modal
function dongModal() {
    lay("nenMo").style.display = "none";
    lay("modalXem").style.display = "none";
    lay("modalSua").style.display = "none";
    lay("modalThem").style.display = "none";
    document.body.style.overflow = "";
}

// Mở modal theo ID
function hienModal(id) {
    dongModal();

    lay("nenMo").style.display = "block";
    lay(id).style.display = "block";

    document.body.style.overflow = "hidden";
}

// Tìm một hàng thành viên theo mã
function timDong(ma) {
    var bang = lay("bangTV");
    var ds = bang.getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");

    for (var i = 0; i < ds.length; i++) {
        var cot = ds[i].getElementsByTagName("td");

        if (cot[0].innerText == ma) {
            return ds[i];
        }
    }

    return null;
}

// Lấy thông tin thành viên từ hàng trong bảng
function layThongTin(ma) {
    var dong = timDong(ma);

    if (dong == null) {
        return null;
    }

    var cot = dong.getElementsByTagName("td");

    var ten = cot[1].getElementsByTagName("b")[0].innerText;
    var avatar = cot[1].getElementsByTagName("span")[0].innerText;
    var trangThai = cot[4].getElementsByTagName("span")[0].innerText;

    return {
        ma: cot[0].innerText,
        ten: ten,
        avatar: avatar,
        email: cot[2].innerText,
        sdt: cot[3].innerText,
        trangThai: trangThai
    };
}

// ============================
// XEM THÀNH VIÊN
// ============================
function xemTV(ma) {
    var tv = layThongTin(ma);

    if (tv == null) {
        return;
    }

    lay("xAvatar").innerText = tv.avatar;
    lay("xMa").innerText = tv.ma;
    lay("xTen").innerText = tv.ten;
    lay("xEmail").innerText = tv.email;
    lay("xSDT").innerText = tv.sdt;
    lay("xTrangThai").innerText = tv.trangThai;

    hienModal("modalXem");
}

// ============================
// SỬA THÀNH VIÊN
// ============================
function suaTV(ma) {
    var tv = layThongTin(ma);

    if (tv == null) {
        return;
    }

    lay("maTV").value = tv.ma;

    lay("sTen").value = tv.ten;
    lay("sEmail").value = tv.email;
    lay("sSDT").value = tv.sdt;
    lay("sTrangThai").value = tv.trangThai;

    lay("loiSua").innerText = "";

    hienModal("modalSua");
}

// Kiểm tra dữ liệu
function kiemTra(ten, email, sdt, idLoi) {
    var loi = lay(idLoi);

    ten = ten.trim();
    email = email.trim();
    sdt = sdt.trim();

    if (ten == "") {
        loi.innerText = "Please enter full name.";
        return false;
    }

    if (email == "") {
        loi.innerText = "Please enter email address.";
        return false;
    }

    // Kiểm tra email cơ bản
    if (email.indexOf("@") == -1 ||
        email.indexOf(".") == -1) {
        loi.innerText = "Invalid email address.";
        return false;
    }

    if (sdt == "") {
        loi.innerText = "Please enter phone number.";
        return false;
    }

    loi.innerText = "";
    return true;
}

// Lưu thông tin sửa
function luuSua() {
    var ten = lay("sTen").value;
    var email = lay("sEmail").value;
    var sdt = lay("sSDT").value;

    if (kiemTra(ten, email, sdt, "loiSua") == false) {
        return;
    }

    lay("lenh").value = "sua";
    lay("form1").submit();
}

// ============================
// THÊM THÀNH VIÊN
// ============================
function moThem() {
    lay("tTen").value = "";
    lay("tEmail").value = "";
    lay("tSDT").value = "";
    lay("tTrangThai").value = "Active";
    lay("loiThem").innerText = "";

    hienModal("modalThem");
}

// Lưu thành viên mới
function luuThem() {
    var ten = lay("tTen").value;
    var email = lay("tEmail").value;
    var sdt = lay("tSDT").value;

    if (kiemTra(ten, email, sdt, "loiThem") == false) {
        return;
    }

    lay("lenh").value = "them";
    lay("form1").submit();
}

// ============================
// SOFT DELETE
// ============================
function xoaTV(ma) {
    var tv = layThongTin(ma);

    if (tv == null) {
        return;
    }

    var hoi = confirm(
        "Are you sure you want to delete " + tv.ten + "?"
    );

    if (hoi == true) {
        lay("maTV").value = ma;
        lay("lenh").value = "xoa";
        lay("form1").submit();
    }
}

// ============================
// TÌM KIẾM VÀ LỌC
// ============================
function timKiem() {
    var tuKhoa = lay("timkiem").value.toLowerCase().trim();
    var trangThai = lay("locTrangThai").value;

    var bang = lay("bangTV");
    var ds = bang.getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");

    var dem = 0;

    for (var i = 0; i < ds.length; i++) {
        var cot = ds[i].getElementsByTagName("td");

        var ten = cot[1].innerText.toLowerCase();
        var email = cot[2].innerText.toLowerCase();
        var tt = cot[4].innerText.trim();

        var dungTimKiem = false;
        var dungTrangThai = false;

        // Tìm theo tên hoặc email
        if (ten.indexOf(tuKhoa) != -1 ||
            email.indexOf(tuKhoa) != -1) {
            dungTimKiem = true;
        }

        // Lọc trạng thái
        if (trangThai == "all" || trangThai == tt) {
            dungTrangThai = true;
        }

        if (dungTimKiem == true && dungTrangThai == true) {
            ds[i].style.display = "";
            dem++;
        }
        else {
            ds[i].style.display = "none";
        }
    }

    lay("soHienThi").innerText =
        "Showing " + dem + " of " + ds.length;

    if (dem == 0) {
        lay("khongCo").style.display = "block";
    }
    else {
        lay("khongCo").style.display = "none";
    }
}

// ============================
// RESPONSIVE SIDEBAR
// ============================
function batMenu() {
    var menu = lay("sidebar");

    if (menu.style.display == "block") {
        menu.style.display = "none";
    }
    else {
        menu.style.display = "block";
    }
}
