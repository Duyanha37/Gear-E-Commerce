<<<<<<< HEAD:Gear E-Commerce/AdminMember.js
// ===== 1. Dữ liệu (chỉ lưu ở 1 chỗ duy nhất là mảng này) =====
var danhsach = [
    { id: 1, ten: "Nguyễn Trần Duy Anh", email: "duyanh@gmail.com", vaitro: "Khách hàng", trangthai: "active" },
    { id: 2, ten: "Phạm Đỗ Nhật Linh", email: "nhatlinh@gmail.com", vaitro: "Khách hàng", trangthai: "locked" },
    { id: 3, ten: "Quách Quang Lê", email: "quangle@gmail.com", vaitro: "Khách hàng", trangthai: "active" },
    { id: 4, ten: "Lê Tuấn Khoa", email: "tuankhoa@gmail.com", vaitro: "Khách hàng", trangthai: "active" }
];
function taoId() {
    var lonnhat = 0;
    for (var i = 0; i < danhsach.length; i++) {
        if (danhsach[i].id > lonnhat) {
            lonnhat = danhsach[i].id;
        }
    }
    return lonnhat + 1;
}

function kiemtra(ten, email, idboqua) {
    if (ten == "" || email == "") {
        return "Họ tên và email không được để trống!";
    }
    if (ten.indexOf("<") != -1 || ten.indexOf(">") != -1 || email.indexOf("<") != -1 || email.indexOf(">") != -1) {
        return "Không được nhập ký tự < hoặc >";
    }
    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        return "Email không hợp lệ!";
    }
    for (var i = 0; i < danhsach.length; i++) {
        if (danhsach[i].id != idboqua && danhsach[i].email.toLowerCase() == email.toLowerCase()) {
            return "Email này đã tồn tại!";
        }
    }
    return "";
}
function hienthi(ds) {
    var noidung = "";
    if (ds.length == 0) {
        noidung = '<tr><td colspan="6" class="empty">Không tìm thấy thành viên</td></tr>';
    }
    for (var i = 0; i < ds.length; i++) {
        var tt = "Bị khóa";
        if (ds[i].trangthai == "active") {
            tt = "Hoạt động";
        }
        noidung = noidung + "<tr>";
        noidung = noidung + "<td>" + ds[i].id + "</td>";
        noidung = noidung + "<td>" + ds[i].ten + "</td>";
        noidung = noidung + "<td>" + ds[i].email + "</td>";
        noidung = noidung + "<td>" + ds[i].vaitro + "</td>";
        noidung = noidung + '<td><span class="status ' + ds[i].trangthai + '">' + tt + "</span></td>";
        noidung = noidung + "<td>";
        noidung = noidung + '<button class="btn edit" onclick="sua(' + ds[i].id + ')"><img src="images/edit.png" alt="Sửa"></button>';
        noidung = noidung + '<button class="btn delete" onclick="xoa(' + ds[i].id + ')"><img src="images/delete.png" alt="Xóa"></button>';
        noidung = noidung + "</td>";
        noidung = noidung + "</tr>";
    }
    document.getElementById("memberBody").innerHTML = noidung;
}

=======
>>>>>>> 5eff2f35d35e6358ff19d0c84669e001d51469c5:AdminMember.js
function timkiem() {
  var tukhoa = document.getElementById("searchInput").value.toLowerCase();
  var cachang = document.getElementById("memberBody").getElementsByTagName("tr");

  for (var i = 0; i < cachang.length; i++) {
    var ten = cachang[i].cells[1].textContent.toLowerCase();
    var email = cachang[i].cells[2].textContent.toLowerCase();

    if (ten.indexOf(tukhoa) != -1 || email.indexOf(tukhoa) != -1) {
      cachang[i].style.display = "";
    } else {
      cachang[i].style.display = "none";
    }
  }
}

<<<<<<< HEAD:Gear E-Commerce/AdminMember.js
function them() {
    var ten = prompt("Nhập họ tên:", "");
    if (ten == null) {
        return;
    }
    var email = prompt("Nhập email:", "");
    if (email == null) {
        return;
    }
    ten = ten.trim();
    email = email.trim();
    var loi = kiemtra(ten, email, 0);
    if (loi != "") {
        alert(loi);
        return;
    }
    danhsach.push({ id: taoId(), ten: ten, email: email, vaitro: "Khách hàng", trangthai: "active" });
    document.getElementById("searchInput").value = "";
    hienthi(danhsach);
}

function sua(id) {
    for (var i = 0; i < danhsach.length; i++) {
        if (danhsach[i].id == id) {
            var ten = prompt("Sửa họ tên:", danhsach[i].ten);
            if (ten == null) {
                return;
            }
            var email = prompt("Sửa email:", danhsach[i].email);
            if (email == null) {
                return;
            }
            ten = ten.trim();
            email = email.trim();
            var loi = kiemtra(ten, email, id);
            if (loi != "") {
                alert(loi);
                return;
            }
            var trangthai = "locked";
            if (confirm("Tài khoản hoạt động?\nOK = Hoạt động, Hủy = Bị khóa")) {
                trangthai = "active";
            }
            danhsach[i].ten = ten;
            danhsach[i].email = email;
            danhsach[i].trangthai = trangthai;
            break;
        }
    }
    document.getElementById("searchInput").value = "";
    hienthi(danhsach);
}
function xoa(id) {
    if (confirm("Bạn có chắc muốn xóa thành viên này?")) {
        var moi = [];
        for (var i = 0; i < danhsach.length; i++) {
            if (danhsach[i].id != id) {
                moi.push(danhsach[i]);
            }
        }
        danhsach = moi;
        document.getElementById("searchInput").value = "";
        hienthi(danhsach);
    }
}
function chonmenu(muc) {
    document.getElementById("menu1").setAttribute("class", "item");
    document.getElementById("menu2").setAttribute("class", "item");
    muc.setAttribute("class", "item active");
=======
function xoa(nut) {
  if (confirm("Bạn có chắc muốn xóa thành viên này?")) {
    var hang = nut.parentNode.parentNode;   
    hang.parentNode.removeChild(hang);      
  }
  return false;   
  // Khi làm ASP: bỏ phần trên, chỉ cần viết: return confirm("...");
  // bấm OK thì trình duyệt tự đi tới DeleteMember?id=... để server xóa trong database
>>>>>>> 5eff2f35d35e6358ff19d0c84669e001d51469c5:AdminMember.js
}