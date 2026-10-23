<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AdminProduct.aspx.cs" Inherits="Gear_E_Commerce.AdminProduct" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
        <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Product Management - GearHouse</title>
    <link rel="stylesheet" href="../css/AdminProduct.css" />
</head>
<body>
           <div id="sidebarOverlay" class="sidebar-overlay" onclick="dongSidebar()"></div>
    <div class="sidebar" id="sidebar">
        <div class="logo">
            <div class="logo-box">G</div>
            <span>GearHouse</span>
        </div>

        <p class="sidebar-title">ADMIN CONSOLE</p>
        <div class="menu">
            <a href="AdminMember.aspx" class="menu-item">
                <img src="../assets/images/member.png" alt="" />
                <span>Member Management</span>
            </a>
            <a href="AdminProduct.aspx" class="menu-item active">
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
                <button type="button" class="menu-toggle"onclick="moSidebar()">
                    <img src="../assets/images/menu.png" alt="Menu" />
                </button>
                <div>
                    <p>ADMIN / PRODUCT MANAGEMENT</p>
                    <h2>Product Management</h2>
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

                    <input type="text" id="searchInput"
                           placeholder="Search products"
                           oninput="locSanPham()" />
                </div>

                <select id="categoryFilter"
                        onchange="locSanPham()">
                    <option value="All">All categories</option>
                    <option value="GPU">GPU</option>
                    <option value="CPU">CPU</option>
                    <option value="Motherboard">Motherboard</option>
                    <option value="RAM">RAM</option>
                    <option value="SSD">SSD</option>
                    <option value="Power Supply">Power Supply</option>
                </select>

                <select id="stockFilter"
                        onchange="locSanPham()">
                    <option value="All">All stock</option>
                    <option value="In stock">In stock</option>
                    <option value="Low stock">Low stock</option>
                    <option value="Out of stock">Out of stock</option>
                </select>

                <button type="button" class="btn-add"
                        onclick="moModalThem()">
                    <img src="../assets/images/add.png" alt="" />
                    Add product
                </button>

            </div>
            <div class="table-card">
                <div class="table-scroll">
                    <table>
                        <thead>
                            <tr>
                              <th>PRODUCT</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                <th>STOCK</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody id="productTable"></tbody>
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
                <p>PRODUCT MANAGEMENT</p>
                <h2 id="viewTitle">View product</h2>
            </div>
            <button type="button" class="btn-close"
                    onclick="dongModal()">
                <img src="../assets/images/close.png" alt="Close" />
            </button>
        </div>
        <div class="view-image">
            <img id="viewImage" src="../assets/images/gpu.png"
                 alt="Product image" />
        </div>
        <div class="modal-body">
            <div class="view-grid">
                <div class="view-field">
                    <small>Product name</small>
                    <strong id="viewName"></strong>
                </div>
                <div class="view-field">
                    <small>Category</small>
                    <strong id="viewCategory"></strong>
                </div>
                <div class="view-field">
                    <small>Brand</small>
                    <strong id="viewBrand"></strong>
                </div>
                <div class="view-field">
                    <small>Price</small>
                    <strong id="viewPrice"></strong>
                </div>
                <div class="view-field">
                    <small>Units in stock</small>
                    <strong id="viewStock"></strong>
                </div>
                <div class="view-field">
                    <small>Description</small>
                    <strong id="viewDescription"></strong>
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
                <p>PRODUCT MANAGEMENT</p>
                <h2 id="editTitle">Edit product</h2>
            </div>
            <button type="button" class="btn-close"
                    onclick="dongModal()">
                <img src="../assets/images/close.png" alt="Close" />
            </button>
        </div>
        <form id="editForm"
              onsubmit="luuSuaSanPham(); return false;">
            <div class="modal-body">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="editName">Product name</label>
                        <input type="text" id="editName" required />
                    </div>
                    <div class="form-group">
                        <label for="editCategory">Category</label>
                        <select id="editCategory">
                            <option value="CPU">CPU</option>
                            <option value="GPU">GPU</option>
                            <option value="Motherboard">Motherboard</option>
                            <option value="RAM">RAM</option>
                            <option value="SSD">SSD</option>
                            <option value="Power Supply">Power Supply</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="editBrand">Brand</label>
                        <input type="text" id="editBrand" required />
                    </div>
                    <div class="form-group">
                        <label for="editPrice">Price</label>
                        <input type="number" id="editPrice"
                               min="0" step="0.01" required />
                    </div>
                    <div class="form-group">
                        <label for="editStock">Stock quantity</label>
                        <input type="number" id="editStock"
                               min="0" step="1" required />
                    </div>
                    <div class="form-group full-width">
                        <label for="editImage">Product image</label>
                        <label class="upload-box" for="editImage">
                            <img src="../assets/images/add.png" alt="" />
                            <span>Click to upload image</span>
                            <small>PNG, JPG up to 1MB (demo)</small>
                        </label>
                        <input type="file" id="editImage"
                               accept="image/png,image/jpeg"
                               onchange="chonAnh('edit')" hidden />

                        <p class="image-filename" id="editFileName"></p>
                    </div>
                    <div class="form-group full-width">
                        <label for="editDescription">Description</label>
                        <textarea id="editDescription"
                                  rows="4"
                                  placeholder="Add a product description"
                                  required></textarea>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn-cancel"
                        onclick="dongModal()">Cancel</button>
     <button type="submit" class="btn-save">
    Save changes
</button>
            </div>
        </form>
    </div>
    <div class="modal" id="addModal"
         role="dialog" aria-modal="true"
         aria-labelledby="addTitle">
        <div class="modal-header">
            <div>
                <p>PRODUCT MANAGEMENT</p>
                <h2 id="addTitle">Add product</h2>
            </div>
            <button type="button" class="btn-close"
                    onclick="dongModal()">
                <img src="../assets/images/close.png" alt="Close" />
            </button>
        </div>
        <form id="addForm"
              onsubmit="themSanPham(); return false;">
            <div class="modal-body">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="addName">Product name</label>
                        <input type="text" id="addName"
                               placeholder="Enter product name" required />
                    </div>
                    <div class="form-group">
                        <label for="addCategory">Category</label>
                        <select id="addCategory">
                            <option value="CPU">CPU</option>
                            <option value="GPU">GPU</option>
                            <option value="Motherboard">Motherboard</option>
                            <option value="RAM">RAM</option>
                            <option value="SSD">SSD</option>
                            <option value="Power Supply">Power Supply</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="addBrand">Brand</label>
                        <input type="text" id="addBrand"
                               placeholder="e.g. ASUS" required />
                    </div>
                    <div class="form-group">
                        <label for="addPrice">Price</label>
                        <input type="number" id="addPrice"
                               min="0" step="0.01"
                               placeholder="0.00" required />
                    </div>
                    <div class="form-group">
                        <label for="addStock">Stock quantity</label>
                        <input type="number" id="addStock"
                               min="0" step="1"
                               placeholder="0" required />
                    </div>
                    <div class="form-group full-width">
                        <label for="addImage">Product image</label>
                        <label class="upload-box" for="addImage">
                            <img src="../assets/images/add.png" alt="" />
                            <span>Click to upload image</span>
                            <small>PNG, JPG up to 1MB (demo)</small>
                        </label>
                        <input type="file" id="addImage"
                               accept="image/png,image/jpeg"
                               onchange="chonAnh('add')" hidden />
                        <p class="image-filename" id="addFileName"></p>
                    </div>
                    <div class="form-group full-width">
                        <label for="addDescription">Description</label>
                        <textarea id="addDescription" rows="4" placeholder="Add a product description"required></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-cancel"
                        onclick="dongModal()">Cancel</button>
               <button type="button" class="btn-save"
        onclick="themSanPham();">
    Add product
</button>
                </button>
            </div>
        </form>
    </div>
    <script src="../js/AdminProduct.js"></script>
</body>
</html>
