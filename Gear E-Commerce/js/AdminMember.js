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
    }catch (error) {
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
    document.getElementById("editEmail").value = member.Email;
    document.getElementById("editPhone").value = member.Phone;
    document.getElementById("editStatus").value = member.Status;
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
        }
        return await response.json();
    } catch (error) {
        console.error("Lỗi cập nhật member:", error);
    }
};

const luuSuaThanhVien = async () => {
    var memberID = document.getElementById("editId").value;
    var fullname = document.getElementById("editName").value.trim();
    var email = document.getElementById("editEmail").value.trim();
    var phone = document.getElementById("editPhone").value.trim();
    var status = document.getElementById("editStatus").value;
    var member = await getMemberById(memberID);
    var members = await loadMembers();

    if (fullname == "" || email == "" || phone == "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    var exits = members.some(m => (m.Email.toLowerCase() === email.toLowerCase() || m.Phone === phone) && m.id !== memberID);
    if (exits) {
        alert("Thông tin đã tồn tại!");
        return;
    }else{
        member.FullName = fullname;
        member.Email = email;
        member.Phone = phone;
        member.Status = status;
        updateMember(member);
        hienThiThanhVien();
        dongModal();
        alert("Cập nhật thành viên thành công!");
    }
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

const addMember = async (member) => {
    try{
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
    var email = document.getElementById("addEmail").value.trim();
    var phone = document.getElementById("addPhone").value.trim();
    var status = document.getElementById("addStatus").value;
    if (fullname == "" || email == "" || phone == "") {
        alert("Vui lòng thêm đầy đủ thông tin!");
        return;
    }

    var members = await loadMembers();
    var maxID = Math.max(...members.map(m => parseInt(m.memberID)));
    if (members.some(m => m.Email.toLowerCase() === email.toLowerCase())) {
        alert("Email đã tồn tại!");
        return;
    }

    var newMember = {
        memberID: (maxID + 1),
        Role: "User",
        FullName: fullname,
        Email: email,
        Phone: phone,
        Status: status
    };
    addMember(newMember);
    hienThiThanhVien();
    dongModal();
    alert("Thêm thành viên thành công!");
}

const deleteMember = async (memberID) => {
    try{
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
function xoaThanhVien(memberID) {

    var result = confirm("Bạn có chắc chắn muốn xóa thành viên này không?");

    if (result == true) {
        deleteMember(memberID);
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