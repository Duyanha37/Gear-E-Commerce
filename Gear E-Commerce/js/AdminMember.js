const loadMembers = async () => {
    try {
        var response = await fetch("AdminMember.aspx", {
            method: "GET",
            headers: {
                "Request-With": "Fetch"
            }
        });
        return members = await response.json();
    } catch (error) {
        console.error("Co loi khi lay members:", error);
    }
}
var editingIndex = -1;

const hienThiThanhVien = async () => {
    members = await loadMembers();
    var html = "";
    var total = 0;
    var showing = 0;
    var search = document.getElementById("searchInput").value.toLowerCase();
    var status = document.getElementById("statusFilter").value;
    for (var i = 0; i < members.length; i++) {
        if (members[i].isDeleted == false) {
            total++;
            if (members[i].FullName.toLowerCase().indexOf(search) == -1 &&
                members[i].Email.toLowerCase().indexOf(search) == -1) {
                continue;
            }
            if (status != "All" && members[i].Status != status) {
                continue;
            }
            showing++;
            var words = members[i].FullName.split(" ");
            var avatar = words[0].charAt(0);
            if (words.length > 1) {
                avatar += words[words.length - 1].charAt(0);
            }
            html += "<tr>";
            html += "<td class='member-id'>" + members[i].memberID + "</td>";
            html += "<td>";
            html += "<div class='member-info'>";
            html += "<div class='member-avatar'>" + avatar.toUpperCase() + "</div>";
            html += "<span>" + members[i].FullName + "</span>";
            html += "</div>";
            html += "</td>";
            html += "<td>" + members[i].Email + "</td>";
            html += "<td>" + members[i].Phone + "</td>";
            if (members[i].Status == "Active") {
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
    var words = member.FullName.split(" ");
    var avatar = words[0].charAt(0);
    if (words.length > 1) {
        avatar += words[words.length - 1].charAt(0);
    }
    document.getElementById("viewAvatar").innerHTML = avatar.toUpperCase();
    document.getElementById("viewId").innerHTML = member.memberID;
    document.getElementById("viewName").innerText = member.FullName;
    document.getElementById("viewEmail").innerText = member.Email;
    document.getElementById("viewPhone").innerText = member.Phone;
    document.getElementById("viewStatus").innerText = member.Status;
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("viewModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function moModalSua(i) {
    editingIndex = i;
    document.getElementById("editName").value = members[i].FullName;
    document.getElementById("editEmail").value = members[i].Email;
    document.getElementById("editPhone").value = members[i].Phone;
    document.getElementById("editStatus").value = members[i].Status;
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
    members[editingIndex].FullName = name;
    members[editingIndex].Email = email;
    members[editingIndex].Phone = phone;
    members[editingIndex].Status = status;
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

/*
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
            members[i].Email.toLowerCase() == email.toLowerCase()) {

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
*/
function moSidebar() {
    document.getElementById("sidebar").classList.add("show");
    document.getElementById("sidebarOverlay").classList.add("show");
}
function dongSidebar() {
    document.getElementById("sidebar").classList.remove("show");
    document.getElementById("sidebarOverlay").classList.remove("show");
}
hienThiThanhVien();