window.onload = function () {
    var url = window.location.href;

    if (url.indexOf("id=") != -1) {
        var id = url.split("id=")[1];
        document.getElementById("inId").value = id;

        if (id == "1") {
            document.getElementById("inTen").value = "Nguyễn Trần Duy Anh";
            document.getElementById("inEmail").value = "duyanh@gmail.com";
            document.getElementById("inTrangthai").value = "active";
        } else if (id == "2") {
            document.getElementById("inTen").value = "Phạm Đỗ Nhật Linh";
            document.getElementById("inEmail").value = "nhatlinh@gmail.com";
            document.getElementById("inTrangthai").value = "locked";
        } else if (id == "3") {
            document.getElementById("inTen").value = "Quách Quang Lê";
            document.getElementById("inEmail").value = "quangle@gmail.com";
            document.getElementById("inTrangthai").value = "active";
        } else if (id == "4") {
            document.getElementById("inTen").value = "Lê Tuấn Khoa";
            document.getElementById("inEmail").value = "lekhoa@gmail.com";
            document.getElementById("inTrangthai").value = "active";
        }
    }
};

function kiemtra() {
    var ten = document.getElementById("inTen").value.trim();
    var email = document.getElementById("inEmail").value.trim();
    var loi = document.getElementById("loi");

    if (ten == "" || email == "") {
        loi.innerHTML = "Vui lòng nhập đầy đủ họ tên và email!";
        return false;
    }

    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        loi.innerHTML = "Email không hợp lệ (Ví dụ: abc@gmail.com)!";
        return false;
    }

    alert("Lưu thông tin thành công!");
    window.location.href = "AdminMember.html";
    return false;
}
