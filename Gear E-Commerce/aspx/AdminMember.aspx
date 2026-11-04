<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AdminMember.aspx.cs" Inherits="Gear_E_Commerce.AdminMember" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Member Management - GearHouse</title>
    <link rel="stylesheet" href="../css/AdminMember.css" />
</head>
<body>
    <div id="sidebarOverlay" class="sidebar-overlay"
        onclick="dongSidebar()">
    </div>
    <div class="sidebar" id="sidebar">
        <div class="logo">
            <div class="logo-box">G</div>
            <span>GearHouse</span>
        </div>
        <p class="sidebar-title">ADMIN CONSOLE</p>
        <div class="menu">
            <a href="AdminMember.aspx" class="menu-item active">
                <img src="../assets/images/member.png" alt="" />
                <span>Member Management</span>
            </a>
            <a href="AdminProduct.aspx" class="menu-item">
                <img src="../assets/images/product.png" alt="" />
                <span>Product Management</span>
            </a>
        </div>
        <div class="sidebar-bottom">
            <a href="#" class="menu-item">
                <img src="../assets/images/logout.png" alt="" />
                <span>Logout</span>
            </a>
            <p>GearHouse Admin</p>
        </div>
    </div>
    <div class="main">
        <div class="header">
            <div class="header-left">
                <button type="button" class="menu-toggle"
                    onclick="moSidebar()">
                    <img src="../assets/images/menu.png" alt="Menu" />
                </button>
                <div>
                    <p>ADMIN / MEMBER MANAGEMENT</p>
                    <h2>Member Management</h2>
                </div>
            </div>
            <div class="admin-profile">
                <div class="admin-info">
                    <strong runat="server" id="adminName"></strong>
                    <small>Administrator</small>
                </div>
                <div class="admin-avatar" runat="server" id="adminAvatar"></div>
            </div>
        </div>
        <div class="content">
            <div class="toolbar">
                <div class="search-box">
                    <img src="../assets/images/search.png" alt="" />
                    <input type="text" id="searchInput" placeholder="Tìm kiếm theo tên hoặc email" oninput="locThanhVien()" />
                </div>
                <select id="statusFilter"
                    onchange="locThanhVien()">
                    <option value="All">All statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <button type="button" class="btn-add" onclick="moModalThem()">
                    <img src="../assets/images/add.png" alt="" />
                    Add member
                </button>
            </div>
            <div class="table-card">
                <div class="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>MEMBER</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody id="memberTable"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-overlay" id="modalOverlay"
        onclick="dongModal()">
    </div>
    <div class="modal" id="viewModal"
        role="dialog" aria-modal="true"
        aria-labelledby="viewTitle">
        <div class="modal-header">
            <div>
                <p>MEMBER MANAGEMENT</p>
                <h2 id="viewTitle">View member</h2>
            </div>
            <button type="button" class="btn-close" onclick="dongModal()">
                <img src="../assets/images/close.png" alt="Close" />
            </button>
        </div>
        <div class="modal-body">
            <div class="view-avatar" id="viewAvatar"></div>
            <div class="view-grid">
                <div class="view-field">
                    <small>Member ID</small>
                    <strong id="viewId"></strong>
                </div>
                <div class="view-field">
                    <small>Full name</small>
                    <strong id="viewName"></strong>
                </div>
                <div class="view-field">
                    <small>Username</small>
                    <strong id="viewUsername"></strong>
                </div>
                <div class="view-field">
                    <small>Email address</small>
                    <strong id="viewEmail"></strong>
                </div>
                <div class="view-field">
                    <small>Phone number</small>
                    <strong id="viewPhone"></strong>
                </div>
                <div class="view-field">
                    <small>Account status</small>
                    <strong id="viewStatus"></strong>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn-cancel"
                onclick="dongModal()">
                Close</button>
        </div>
    </div>
    <div class="modal" id="editModal"
        role="dialog" aria-modal="true"
        aria-labelledby="editTitle">
        <div class="modal-header">
            <div>
                <p>MEMBER MANAGEMENT</p>
                <h2 id="editTitle">Edit member</h2>
            </div>
            <button type="button" class="btn-close" onclick="dongModal()">
                <img src="../assets/images/close.png" alt="Close" />
            </button>
        </div>
        <form id="editForm" novalidate onsubmit="luuSuaThanhVien(); return false;">
            <input type="hidden" id="editId" />
            <div class="modal-body">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="editName">Full name</label>
                        <input type="text" id="editName" oninput="kiemTraTen('edit')" />
                        <label id="errorEditName" class="error-label" hidden></label>
                    </div>
                    <div class="form-group">
                        <label for="editUsername">Username</label>
                        <input type="text" id="editUsername" oninput="kiemTraUsername('edit')" />
                        <label id="errorEditUsername"
                            class="error-label" hidden>
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="editEmail">Email address</label>
                        <input type="email" id="editEmail" oninput="kiemTraEmail('edit')" />
                        <label id="errorEditEmail" class="error-label" hidden></label>
                    </div>

                    <div class="form-group">
                        <label for="editPhone">Phone number</label>
                        <input type="tel" id="editPhone" oninput="kiemTraSoDienThoai('edit')" />
                        <label id="errorEditPhone" class="error-label" hidden></label>
                    </div>
                    <div class="form-group">
                        <label for="editStatus">Account status</label>
                        <select id="editStatus">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-cancel"
                    onclick="dongModal()">
                    Cancel
                </button>
                <button type="submit" class="btn-save">Save changes </button>
            </div>
        </form>
    </div>
    <div class="modal" id="addModal" role="dialog" aria-modal="true" aria-labelledby="addTitle">
        <div class="modal-header">
            <div>
                <p>MEMBER MANAGEMENT</p>
                <h2 id="addTitle">Add member</h2>
            </div>
            <button type="button" class="btn-close"
                onclick="dongModal()">
                <img src="../assets/images/close.png" alt="Close" />
            </button>
        </div>
        <form id="addForm" novalidate onsubmit="themThanhVien(); return false;">
            <div class="modal-body">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="addName">Full name</label>
                        <input type="text" id="addName"
                            placeholder="Nhập họ tên đầy đủ" oninput="kiemTraTen()" />
                        <label id="errorAddName" class="error-label" hidden></label>
                    </div>
                    <div class="form-group">
                        <label for="addUsername">Username</label>
                        <input type="text" id="addUsername"
                            placeholder="Nhập tên đăng nhập" oninput="kiemTraUsername('add')" />
                        <label id="errorAddUsername"
                            class="error-label" hidden>
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="addEmail">Email address</label>
                        <input type="email" id="addEmail"
                            placeholder="Nhập địa chỉ email" oninput="kiemTraEmail('add')" />
                        <label id="errorAddEmail" class="error-label" hidden></label>
                    </div>

                    <div class="form-group">
                        <label for="addPhone">Phone number</label>
                        <input type="tel" id="addPhone"
                            placeholder="Nhập số điện thoại" oninput="kiemTraSoDienThoai('add')" />
                        <label id="errorAddPhone" class="error-label" hidden></label>
                    </div>
                    <div class="form-group">
                        <label for="addPassword">Password</label>
                        <input type="password" id="addPassword"
                            placeholder="Nhập mật khẩu" oninput="kiemTraMatKhau('add')" />
                        <label id="errorAddPassword"
                            class="error-label" hidden>
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="addConfirmPassword">Confirm password</label>
                        <input type="password" id="addConfirmPassword"
                            placeholder="Xác nhận mật khẩu" oninput="kiemTraMatKhau('add')" />
                        <label id="errorAddConfirmPassword"
                            class="error-label" hidden>
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="addStatus">Account status</label>
                        <select id="addStatus">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-cancel"
                    onclick="dongModal()">
                    Cancel
                </button>
                <button type="submit" class="btn-save">
                    Add member
                </button>
            </div>
        </form>
    </div>
    <div class="success-overlay" id="successOverlay" hidden></div>

    <div class="success-modal" id="successModal"
        role="dialog" aria-modal="true"
        aria-labelledby="successTitle" hidden>
        <div class="success-icon">
            <img src="../assets/images/mark.png" alt="Success" />
        </div>
        <h2 id="successTitle">Success!</h2>
        <p id="successMessage"></p>
        <button type="button" class="success-button"
            onclick="dongThongBao()">
            OK
   
        </button>
    </div>
    <div class="delete-overlay" id="deleteOverlay" hidden></div>
    <div class="delete-modal" id="deleteModal" hidden>
        <div class="delete-icon">
            <img src="../assets/images/warning-sign.png" alt="Delete" />
        </div>
        <h2>Xóa thành viên?</h2>
        <p>
            Bạn có chắc chắn muốn xóa thành viên này không?
        </p>
        <div class="delete-buttons">
            <button type="button" class="delete-cancel"
                onclick="dongModalXoa()">
                Cancel
            </button>
            <button type="button" class="delete-confirm"
                onclick="xacNhanXoa()">
                Delete
            </button>
        </div>
    </div>
    <script src="../js/AdminMember.js"></script>

</body>
</html>
