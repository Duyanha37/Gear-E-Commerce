var members = [
    {
        id: "GH-1024",
        name: "Duy Anh",
        email: "duyanh@gmail.com",
        phone: "0123456789",
        status: "Active",
        isDeleted: false
    },
    {
        id: "GH-1025",
        name: "Nhật Linh",
        email: "nhatlinh@gmail.com",
        phone: "0234567890",
        status: "Active",
        isDeleted: false
    },
    {
        id: "GH-1026",
        name: "Quang Lê",
        email: "quangle@gmail.com",
        phone: "0987654321",
        status: "Inactive",
        isDeleted: false
    },
    {
        id: "GH-1027",
        name: "Tuấn Khoa",
        email: "tuankhoa@gmail.com",
        phone: "0987654322",
        status: "Active",
        isDeleted: false
    },
];

var savedData = localStorage.getItem("gearMembers");
if (savedData != null) {
    members = JSON.parse(savedData);
}
var editingIndex = -1;
function luuDuLieu() {
    localStorage.setItem("gearMembers", JSON.stringify(members));
}

function hienThiThanhVien() {
    var html = "";
    var total = 0;
    var showing = 0;
    var search = document.getElementById("searchInput").value.toLowerCase();
    var status = document.getElementById("statusFilter").value;
    for (var i = 0; i < members.length; i++) {
        if (members[i].isDeleted == false) {
            total++;
            if (members[i].name.toLowerCase().indexOf(search) == -1 &&
                members[i].email.toLowerCase().indexOf(search) == -1) {
                continue;
            }
            if (status != "All" && members[i].status != status) {
                continue;
            }
            showing++;
            var words = members[i].name.split(" ");
            var avatar = words[0].charAt(0);
            if (words.length > 1) {
                avatar += words[words.length - 1].charAt(0);
            }
            html += "<tr>";
            html += "<td class='member-id'>" + members[i].id + "</td>";
            html += "<td>";
            html += "<div class='member-info'>";
            html += "<div class='member-avatar'>" + avatar.toUpperCase() + "</div>";
            html += "<span>" + members[i].name + "</span>";
            html += "</div>";
            html += "</td>";
            html += "<td>" + members[i].email + "</td>";
            html += "<td>" + members[i].phone + "</td>";
            if (members[i].status == "Active") {
                html += "<td><span class='status status-active'>Active</span></td>";
            } else {
                html += "<td><span class='status status-inactive'>Inactive</span></td>";
            }
            html += "<td><div class='action-buttons'>";
            html += "<button class='btn-action' onclick='moModalXem(" + i + ")'>View</button>";
            html += "<button class='btn-action' onclick='moModalSua(" + i + ")'>Edit</button>";
            html += "<button class='btn-action btn-delete' onclick='xoaThanhVien(" + i + ")'>Delete</button>";
            html += "</div></td>";
            html += "</tr>";
        }
    }
    if (showing == 0) {
        html = "<tr><td colspan='6' class='empty-row'>Không tìm thấy thành viên nào</td></tr>";
    }
    document.getElementById("memberTable").innerHTML = html;
}

function locThanhVien() {
    hienThiThanhVien();
}

function dongModal() {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("viewModal").style.display = "none";
    document.getElementById("editModal").style.display = "none";
    document.getElementById("addModal").style.display = "none";

    document.body.style.overflow = "";
}

function moModalXem(i) {
    var member = members[i];
    var words = member.name.split(" ");
    var avatar = words[0].charAt(0);
    if (words.length > 1) {
        avatar += words[words.length - 1].charAt(0);
    }
    document.getElementById("viewAvatar").innerHTML = avatar.toUpperCase();
    document.getElementById("viewId").innerHTML = member.id;
    document.getElementById("viewName").innerText = member.name;
    document.getElementById("viewEmail").innerText = member.email;
    document.getElementById("viewPhone").innerText = member.phone;
    document.getElementById("viewStatus").innerText = member.status;
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("viewModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function moModalSua(i) {
    editingIndex = i;
    document.getElementById("editName").value = members[i].name;
    document.getElementById("editEmail").value = members[i].email;
    document.getElementById("editPhone").value = members[i].phone;
    document.getElementById("editStatus").value = members[i].status;
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("editModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function luuSuaThanhVien() {

    var name = document.getElementById("editName").value.trim();
    var email = document.getElementById("editEmail").value.trim();
    var phone = document.getElementById("editPhone").value.trim();
    var status = document.getElementById("editStatus").value;

    if (name == "" || email == "" || phone == "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    for (var i = 0; i < members.length; i++) {
        if (i != editingIndex &&
            members[i].isDeleted == false &&
            members[i].email.toLowerCase() == email.toLowerCase()) {
            alert("Email already exists!");
            return;
        }
    }
    members[editingIndex].name = name;
    members[editingIndex].email = email;
    members[editingIndex].phone = phone;
    members[editingIndex].status = status;
    luuDuLieu();
    hienThiThanhVien();
    dongModal();
    alert("Cập nhật thành viên thành công!");
}
function moModalThem() {
    document.getElementById("addName").value = "";
    document.getElementById("addEmail").value = "";
    document.getElementById("addPhone").value = "";
    document.getElementById("addStatus").value = "Active";
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("addModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function themThanhVien() {
    var name = document.getElementById("addName").value.trim();
    var email = document.getElementById("addEmail").value.trim();
    var phone = document.getElementById("addPhone").value.trim();
    var status = document.getElementById("addStatus").value;
    if (name == "" || email == "" || phone == "") {
        alert("Vui lòng thêm đầy đủ thông tin!");
        return;
    }
    for (var i = 0; i < members.length; i++) {

        if (members[i].isDeleted == false &&
            members[i].email.toLowerCase() == email.toLowerCase()) {

            alert("Tài khoản gmail đã tồn tại!");
            return;
        }
    }
    var maxId = 1023;
    for (var i = 0; i < members.length; i++) {
        var number = parseInt(members[i].id.replace("GH-", ""));
        if (number > maxId) {
            maxId = number;
        }
    }

    var newMember = {
        id: "GH-" + (maxId + 1),
        name: name,
        email: email,
        phone: phone,
        status: status,
        isDeleted: false
    };

    members.push(newMember);

    luuDuLieu();
    hienThiThanhVien();
    dongModal();

    alert("Thêm thành viên thành công!");
}

function xoaThanhVien(i) {

    var result = confirm("Bạn có chắc chắn muốn xóa thành viên này không?");

    if (result == true) {

        members[i].isDeleted = true;

        luuDuLieu();
        hienThiThanhVien();

        alert("Xóa thành viên thành công!");
    }
}

function moSidebar() {
    document.getElementById("sidebar").classList.add("show");
    document.getElementById("sidebarOverlay").classList.add("show");
}
function dongSidebar() {
    document.getElementById("sidebar").classList.remove("show");
    document.getElementById("sidebarOverlay").classList.remove("show");
}
hienThiThanhVien();
