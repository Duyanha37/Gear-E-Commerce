var dsThanhVien = [
    { id: 1, ten: "Nguyễn Trần Duy Anh", email: "duyanh@gmail.com", vaitro: "Khách hàng", trangthai: "active" },
    { id: 2, ten: "Phạm Đỗ Nhật Linh", email: "nhatlinh@gmail.com", vaitro: "Khách hàng", trangthai: "locked" },
    { id: 3, ten: "Quách Quang Lê", email: "quangle@gmail.com", vaitro: "Khách hàng", trangthai: "active" },
    { id: 4, ten: "Lê Tuấn Khoa", email: "lekhoa@gmail.com", vaitro: "Khách hàng", trangthai: "active" }
];

function hienThi(ds) {
    var tbody = document.getElementById("memberBody");
    var html = "";

    if (ds.length == 0) {
        tbody.innerHTML = "<tr><td colspan='6' style='text-align:center; padding: 20px;'>Không tìm thấy dữ liệu.</td></tr>";
        return;
    }

    for (var i = 0; i < ds.length; i++) {
        var tv = ds[i];
        var statusText = "Hoạt động";
        var statusClass = "status active";

        if (tv.trangthai == "locked") {
            statusText = "Bị khóa";
            statusClass = "status locked";
        }

        html += "<tr>";
        html += "<td>" + tv.id + "</td>";
        html += "<td>" + tv.ten + "</td>";
        html += "<td>" + tv.email + "</td>";
        html += "<td>" + tv.vaitro + "</td>";
        html += "<td><span class='" + statusClass + "'>" + statusText + "</span></td>";
        html += "<td>";
        html += "<a class='btn edit' href='../html/EditMember.html?id=" + tv.id + "'><img src='../assets/images/edit.png' alt='Sửa'></a> ";
        html += "<a class='btn delete' href='#' onclick='xoa(" + tv.id + "); return false;'><img src='../assets/images/delete.png' alt='Xóa'></a>";
        html += "</td>";
        html += "</tr>";
    }

    tbody.innerHTML = html;
}

function xoa(id) {
    if (confirm("Bạn có chắc muốn xóa thành viên này?")) {
        var viTri = -1;

        for (var i = 0; i < dsThanhVien.length; i++) {
            if (dsThanhVien[i].id == id) {
                viTri = i;
                break;
            }
        }

        if (viTri != -1) {
            dsThanhVien.splice(viTri, 1);
            timkiem();
        }
    }
}

function timkiem() {
    var tukhoa = document.getElementById("searchInput").value.toLowerCase();
    var ketqua = [];

    for (var i = 0; i < dsThanhVien.length; i++) {
        var ten = dsThanhVien[i].ten.toLowerCase();
        var email = dsThanhVien[i].email.toLowerCase();

        if (ten.indexOf(tukhoa) != -1 || email.indexOf(tukhoa) != -1) {
            ketqua.push(dsThanhVien[i]);
        }
    }

    hienThi(ketqua);
}

window.onload = function () {
    hienThi(dsThanhVien);
};

