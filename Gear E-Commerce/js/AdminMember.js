
const loadMembers = async () => {
    try {
        var response = await fetch("MemberControllers.aspx", {
            method: "GET",
            headers: {
                "Service-Name": "GetMembers"
            }
        });
        if (response.status !== 200) {
            throw new Error("Không có danh sách member")
        }
        return await response.json();
    } catch (error) {
        console.error("Có lỗi khi lấy member:", error);
    }
}

const hienThiThanhVien = async () => {
    var members = await loadMembers();
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
            html += "<button class='btn-action' onclick='moModalXem(" + members[i].memberID + ")'>View</button>";
            html += "<button class='btn-action' onclick='moModalSua(" + members[i].memberID + ")'>Edit</button>";
            html += "<button class='btn-action btn-delete' onclick='xoaThanhVien(" + members[i].memberID + ")'>Delete</button>";
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

function hienLoi(id, message) {
    var label = document.getElementById(id);
    label.innerText = message;
    label.hidden = false;
}

function xoaLoi(id) {
    var label = document.getElementById(id);
    label.innerText = "";
    label.hidden = true;
}

function xoaLoiForm(type) {
    var form = document.getElementById(type + "Form");
    var labels = form.querySelectorAll(".error-label");

    for (var i = 0; i < labels.length; i++) {
        labels[i].innerText = "";
        labels[i].hidden = true;
    }
}

function hienThongBao(message) {
    document.getElementById("successMessage").innerText = message;
    document.getElementById("successOverlay").hidden = false;
    document.getElementById("successModal").hidden = false;
    document.body.style.overflow = "hidden";
}
function dongThongBao() {
    document.getElementById("successOverlay").hidden = true;
    document.getElementById("successModal").hidden = true;
    document.body.style.overflow = "";
}

const getMemberById = async (id) => {
    try {
        const response = await fetch("MemberControllers.aspx?memberID=" + id, {
            method: "GET",
            headers: {
                "Service-Name": "GetMemberByID"
            }
        });

        if (response.status !== 200) {
            throw new Error("Không tìm thấy member với id: " + id);
        }

        return await response.json();
    } catch (error) {
        console.error("Lỗi lấy member bằng id:", error);
    }
};

const moModalXem = async (id) => {
    var member = await getMemberById(id);
    var words = member.FullName.split(" ");
    var avatar = words[0].charAt(0);

    if (words.length > 1) {
        avatar += words[words.length - 1].charAt(0);
    }

    document.getElementById("viewAvatar").innerHTML = avatar.toUpperCase();
    document.getElementById("viewId").innerHTML = member.memberID;
    document.getElementById("viewName").innerText = member.FullName;
    document.getElementById("viewUsername").innerText = member.Username || "";
    document.getElementById("viewEmail").innerText = member.Email;
    document.getElementById("viewPhone").innerText = member.Phone;
    document.getElementById("viewStatus").innerText = member.Status;

    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("viewModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

const moModalSua = async (id) => {
    var member = await getMemberById(id);

    document.getElementById("editId").value = member.memberID;
    document.getElementById("editName").value = member.FullName;
    document.getElementById("editUsername").value = member.Username || "";
    document.getElementById("editEmail").value = member.Email;
    document.getElementById("editPhone").value = member.Phone;
    document.getElementById("editStatus").value = member.Status;

    xoaLoiForm("edit");

    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("editModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

const updateMember = async (member) => {
    try {
        const response = await fetch("MemberControllers.aspx", {
            method: "POST",
            headers: {
                "Service-Name": "UpdateMember"
            },
            body: JSON.stringify(member)
        });

        if (response.status !== 200) {
            throw new Error("Lỗi cập nhật member");
        } else {

        }
    } catch (error) {
        console.error("Lỗi cập nhật member:", error);
    }
};

const luuSuaThanhVien = async () => {
    var memberID = document.getElementById("editId").value;
    var fullname = document.getElementById("editName").value.trim();
    var username = document.getElementById("editUsername").value.trim();
    var email = document.getElementById("editEmail").value.trim();
    var phone = document.getElementById("editPhone").value.trim();
    var status = document.getElementById("editStatus").value;

    var member = await getMemberById(memberID);
    var members = await loadMembers();

    xoaLoiForm("edit");
    if (fullname == "" || email == "" || phone == "") {
        if (fullname == "") {
            hienLoi("errorEditName", "Vui lòng nhập họ tên!");
        }

        if (email == "") {
            hienLoi("errorEditEmail", "Vui lòng nhập email!");
        }

        if (phone == "") {
            hienLoi("errorEditPhone", "Vui lòng nhập số điện thoại!");
        }

        return;
    }

    var exits = members.some(m =>
        (m.Email.toLowerCase() === email.toLowerCase() ||
            m.Phone === phone) && m.ID !== memberID
    );

    if (exits) {
        hienLoi("errorEditEmail", "Email hoặc số điện thoại đã tồn tại!");
        return;
    } else {
        member.FullName = fullname;
        member.Username = username;
        member.Email = email;
        member.Phone = phone;
        member.Status = status;

        updateMember(member);
        hienThiThanhVien();
        dongModal();
        hienThongBao("Cập nhật thành viên thành công!");
    }
}

function moModalThem() {
    document.getElementById("addName").value = "";
    document.getElementById("addUsername").value = "";
    document.getElementById("addEmail").value = "";
    document.getElementById("addPhone").value = "";
    document.getElementById("addPassword").value = "";
    document.getElementById("addConfirmPassword").value = "";
    document.getElementById("addStatus").value = "Active";

    xoaLoiForm("add");

    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("addModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

const addMember = async (member) => {
    try {
        const response = await fetch("MemberControllers.aspx", {
            method: "POST",
            headers: {
                "Service-Name": "AddMember"
            },
            body: JSON.stringify(member)
        });

        if (response.status !== 200) {
            throw new Error("Lỗi thêm member");
        }
    } catch (error) {
        console.error("Lỗi thêm member:", error);
    }
}

const themThanhVien = async () => {
    var fullname = document.getElementById("addName").value.trim();
    var username = document.getElementById("addUsername").value.trim();
    var email = document.getElementById("addEmail").value.trim();
    var phone = document.getElementById("addPhone").value.trim();
    var status = document.getElementById("addStatus").value;
    xoaLoiForm("add");
    xoaLoiForm("add");
    var valid = true;
    if (fullname == "") {
        hienLoi("errorAddName", "Vui lòng nhập họ tên!");
        valid = false;
    }
    if (email == "") {
        hienLoi("errorAddEmail", "Vui lòng nhập email!");
        valid = false;
    }
    if (phone == "") {
        hienLoi("errorAddPhone", "Vui lòng nhập số điện thoại!");
        valid = false;
    }
    if (kiemTraUsername("add") == false) {
        valid = false;
    }
    if (kiemTraMatKhau("add") == false) {
        valid = false;
    }
    if (valid == false) {
        return;
    }

    var members = await loadMembers();
    var maxID = Math.max(...members.map(m => parseInt(m.memberID)));

    if (members.some(m => m.Email.toLowerCase() === email.toLowerCase())) {
        hienLoi("errorAddEmail", "Email đã tồn tại!");
        return;
    }

    var newMember = {
        memberID: (maxID + 1),
        Role: "User",
        FullName: fullname,
        Username: username,
        Email: email,
        Phone: phone,
        Status: status
    };

    addMember(newMember);
    hienThiThanhVien();
    dongModal();
    hienThongBao("Thêm thành viên thành công!");
}

const deleteMember = async (memberID) => {
    try {
        const response = await fetch("MemberControllers.aspx?memberID=" + memberID, {
            method: "POST",
            headers: {
                "Service-Name": "DeleteMember"
            }
        });
        console.log(memberID);
        if (response.status !== 200) {
            throw new Error("Không tìm thấy member");
        }
    } catch (error) {
        console.error("Lỗi xóa member:", error);
    }
}

var memberIDCanXoa = null;

function xoaThanhVien(memberID) {
    memberIDCanXoa = memberID;
    document.getElementById("deleteOverlay").hidden = false;
    document.getElementById("deleteModal").hidden = false;
    document.body.style.overflow = "hidden";
}
function dongModalXoa() {
    document.getElementById("deleteOverlay").hidden = true;
    document.getElementById("deleteModal").hidden = true;
    memberIDCanXoa = null;
    document.body.style.overflow = "";
}
async function xacNhanXoa() {
    if (memberIDCanXoa == null) {
        return;
    }
    var id = memberIDCanXoa;
    dongModalXoa();
    await deleteMember(id);
    await hienThiThanhVien();
    hienThongBao("Xóa thành viên thành công!");
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
function kiemTraUsername(type) {
    var username = document.getElementById(type + "Username").value.trim();
    var id = type == "add" ? "errorAddUsername" : "errorEditUsername";
    if (username == "") {
        hienLoi(id, "Vui lòng nhập tên tài khoản!");
        return false;
    }
    if (!/^[a-zA-Z0-9_]{4,20}$/.test(username)) {
        hienLoi(id, "Username phải có 4-20 ký tự, chỉ gồm chữ, số và _!");
        return false;
    }
    xoaLoi(id);
    return true;
}

function kiemTraMatKhau(type) {
    var password = document.getElementById(type + "Password").value;
    var confirmPassword = document.getElementById(type + "ConfirmPassword").value;

    var prefix = type == "add" ? "Add" : "Edit";
    var valid = true;

    xoaLoi("error" + prefix + "Password");
    xoaLoi("error" + prefix + "ConfirmPassword");

    if (type == "edit" && password == "" && confirmPassword == "") {
        return true;
    }

    if (password == "") {
        hienLoi("error" + prefix + "Password",
            "Vui lòng nhập mật khẩu!");
        valid = false;
    } else if (password.length < 8) {
        hienLoi("error" + prefix + "Password",
            "Mật khẩu phải có ít nhất 8 ký tự!");
        valid = false;
    }

    if (confirmPassword == "") {
        hienLoi("error" + prefix + "ConfirmPassword",
            "Vui lòng xác nhận mật khẩu!");
        valid = false;
    } else if (password != confirmPassword) {
        hienLoi("error" + prefix + "ConfirmPassword",
            "Mật khẩu xác nhận không khớp!");
        valid = false;
    }

    return valid;
}

function kiemTraTen(type) {
    var name = document.getElementById(type + "Name").value.trim();
    var id = type == "add" ? "errorAddName" : "errorEditName";

    if (name == "") {
        hienLoi(id, "Vui lòng nhập họ tên!");
        return false;
    }

    if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(name)) {
        hienLoi(id, "Họ tên không được chứa số hoặc ký tự đặc biệt!");
        return false;
    }

    xoaLoi(id);
    return true;
}

function kiemTraEmail(type) {
    var email = document.getElementById(type + "Email").value.trim();
    var id = type == "add" ? "errorAddEmail" : "errorEditEmail";

    if (email == "") {
        hienLoi(id, "Vui lòng nhập email!");
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        hienLoi(id, "Email không đúng định dạng!");
        return false;
    }

    xoaLoi(id);
    return true;
}

function kiemTraSoDienThoai(type) {
    var phone = document.getElementById(type + "Phone").value.trim();
    var id = type == "add" ? "errorAddPhone" : "errorEditPhone";

    if (phone == "") {
        hienLoi(id, "Vui lòng nhập số điện thoại!");
        return false;
    }

    if (!/^0[0-9]{9,11}$/.test(phone)) {
        hienLoi(id, "Số điện thoại phải có 10–12 số và bắt đầu bằng 0!");
        return false;
    }

    xoaLoi(id);
    return true;
}
