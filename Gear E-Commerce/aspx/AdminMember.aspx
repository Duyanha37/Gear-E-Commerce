
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AdminMember.aspx.cs" Inherits="Gear_E_Commerce.aspx.AdminMember" %>

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
         onclick="dongSidebar()"></div>
    <div class="sidebar" id="sidebar">
        <div class="logo">
            <div class="logo-box">G</div>
            <span>GearHouse</span>
        </div>
        <p class="sidebar-title">ADMIN CONSOLE</p>
        <div class="menu">
            <a href="#" class="menu-item">
                <img src="../assets/images/dashboard.png" alt="" />
                <span>Dashboard</span>
            </a>
            <a href="AdminMember.aspx" class="menu-item active">
                <img src="../assets/images/member.png" alt="" />
                <span>Member Management</span>
            </a>
            <a href="#" class="menu-item">
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
                    <strong>Nhat Linh</strong>
                    <small>Administrator</small>
                </div>
                <div class="admin-avatar">NL</div>
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
                    <img src="../assets/images/add.png" alt="" /> Add member
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
         onclick="dongModal()"></div>
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
                    onclick="dongModal()">Close</button>
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
        <form id="editForm"
              onsubmit="luuSuaThanhVien(); return false;">
            <div class="modal-body">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="editName">Full name</label>
                        <input type="text" id="editName" required />
                    </div>
                    <div class="form-group">
                        <label for="editEmail">Email address</label>
                        <input type="email" id="editEmail" required />
                    </div>
                    <div class="form-group">
                        <label for="editPhone">Phone number</label>
                        <input type="tel" id="editPhone" required />
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
                        onclick="dongModal()">Cancel</button>
                <button type="submit" class="btn-save">Lưu thay đổi
                </button>
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
        <form id="addForm"
              onsubmit="themThanhVien(); return false;">
            <div class="modal-body">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="addName">Full name</label>
                        <input type="text" id="addName" placeholder="Điền đầy đủ họ và tên" required />
                    </div>
                    <div class="form-group">
                        <label for="addEmail">Email address</label>
                        <input type="email" id="addEmail" placeholder="name@example.com" required />
                    </div>
                    <div class="form-group">
                        <label for="addPhone">Phone number</label>
                        <input type="tel" id="addPhone" placeholder="Điền số điện thoại" required />
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
                        onclick="dongModal()">Cancel</button>
                <button type="submit" class="btn-save">
                    Add member
                </button>
            </div>
        </form>
    </div>
    <script src="../js/AdminMember.js"></script>

</body>
</html>
