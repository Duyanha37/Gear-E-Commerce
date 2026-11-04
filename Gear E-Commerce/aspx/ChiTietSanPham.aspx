<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ChiTietSanPham.aspx.cs" Inherits="Gear_E_Commerce.ChiTietSanPham" ResponseEncoding="utf-8" Culture="vi-VN" UICulture="vi-VN" %>
<!doctype html>
<html lang="vi">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Product Details - GearHouse</title>
    <link rel="stylesheet" href="../css/global.css" />
    <link rel="stylesheet" href="../css/site-shell.css" />
    <link rel="stylesheet" href="../css/ChiTietSanPham.css?v=2" />
</head>
<body>
    <div class="dau-trang">
        <header>
        <div class="logo-thuong-hieu">
            <a href="../aspx/home.aspx">G</a>
        </div>
        <nav class="menu-chinh">
            <a href="../aspx/home.aspx">Trang chủ</a>
            <a class="dang-chon" href="../aspx/List.aspx">Sản phẩm</a>
            <a href="../aspx/List.aspx">Lắp ráp PC</a>
            <a href="#chan-trang">Hỗ trợ</a>
        </nav>
        <div class="tai-khoan">
            <form class="hop-tim-kiem" id="formTimKiem" action="../aspx/List.aspx">
                <button class="nut-mo-tim-kiem" id="nutMoTimKiem" type="button" aria-label="Mở tìm kiếm" aria-expanded="false">
                    <img src="../assets/images/search.png" alt="" />
                </button>
                <input type="search" name="search" placeholder="Tìm sản phẩm" aria-label="Tìm sản phẩm" />
                <button class="nut-thuc-hien-tim-kiem" type="submit">Tìm</button>
            </form>
            <a class="bieu-tuong-gio-hang" href="Cart.aspx" aria-label="Giỏ hàng">
                <img src="../assets/images-backup/shopping-cart.png" alt="" />
                <span data-cart-count="">0</span>
            </a>
            <a class="nut-dang-nhap" href="../aspx/SignIn.aspx">Đăng nhập</a>
        </div>
        </header>
    </div>

    <main class="trang-chi-tiet">
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="../aspx/home.aspx">Trang chủ</a>
            <span>/</span>
            <a href="../aspx/List.aspx">Sản phẩm</a>
            <span>/</span>
            <span id="crumbProduct">Chi tiết sản phẩm</span>
        </nav>
        <div id="chiTietSanPham" aria-live="polite"></div>
        <section class="overview-panel">
            <div><p class="overview-kicker">PRODUCT OVERVIEW</p>
                <h2>Built without compromise.</h2>
            </div>
            <p id="productOverview">Được thiết kế cho hiệu suất tin cậy, khả năng tản nhiệt thông minh và độ bền lâu dài.</p>
        </section>
        <section class="khu-vuc-goi-y">
            <div class="tieu-de-khu-vuc">
                <div>
                    <h2>Bạn có thể sẽ thích.</h2>
                    <p>Khám phá thêm các linh kiện cho pc của bạn.</p>
                </div>
                <a href="../aspx/List.aspx">
                    View all 
                    <span aria-hidden="true">↗</span>
                </a>
            </div>
            <div id="danhSachTuongTu" class="danh-sach-san-pham"></div>
        </section>
    </main>

    <footer class="chan-trang" id="chan-trang">
        <div class="danh-sach">
            <div class="the-san-pham">
                <h4>G GearHouse</h4>
                <p>Precision components for your next great build.</p>
            </div>
            <div class="the-san-pham">
                <h4>Shop</h4>
                <a href="../aspx/List.aspx">All products</a>
                <a href="../aspx/List.aspx?category=GPU">Graphics cards</a>
                <a href="../aspx/List.aspx?category=CPU">Processors</a>
            </div>
            <div class="the-san-pham">
                <h4>Support</h4>
                <a href="#">Order status</a>
                <a href="#">Shipping and returns</a>
                <a href="#">Contact us</a>
            </div>
            <div class="the-san-pham">
                <h4>GearHouse</h4>
                <a href="#">Admin portal</a>
                <a href="#">About</a>
                <a href="#">Careers</a>
            </div>
        </div>
        <div class="dong-cuoi">
            <p>© 2026 GearHouse, Inc. All rights reserved.</p>
        </div>
    </footer>

    <script src="../js/ProductCatalog.js"></script>
    <script src="../js/ChiTietSanPham.js"></script>
</body>
</html>
