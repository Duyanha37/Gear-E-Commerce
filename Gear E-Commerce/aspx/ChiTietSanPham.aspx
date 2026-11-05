<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ChiTietSanPham.aspx.cs" Inherits="Gear_E_Commerce.ChiTietSanPham" ResponseEncoding="utf-8" Culture="vi-VN" UICulture="vi-VN" %>
<!doctype html>
<html lang="vi">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Product Details - GearHouse</title>
    <link rel="stylesheet" href="../css/global.css" />
    <link rel="stylesheet" href="../css/site-shell.css" />
    <link rel="stylesheet" href="../css/ChiTietSanPham.css?v=4" />
</head>
<body data-member-id="<%= Server.HtmlEncode(Convert.ToString(Session["memberID"])) %>">
    <div class="dau-trang">
        <header>
            <div class="logo-thuong-hieu">
            <a href="home.aspx" aria-label="GearHouse - Trang chủ">
                <img class="logo-mark"
                        src="../assets/images/Logo-White.png"
                        alt=""
                        aria-hidden="true" />
                <span class="ten-thuong-hieu">GearHouse</span>
            </a>
            </div>

            <nav class="menu-chinh" id="menuChinh">
                <a href="home.aspx">Trang chủ</a>
                <a class="dang-chon" href="List.aspx">Sản phẩm</a>
                <a href="List.aspx">Lắp ráp PC</a>
                <a href="#chan-trang">Hỗ trợ</a>
            </nav>

            <div class="tai-khoan">
            <form class="hop-tim-kiem"
                    id="formTimKiem"
                    action="List.aspx"
                    autocomplete="off">
                <button class="nut-mo-tim-kiem"
                        id="nutMoTimKiem"
                        type="button"
                        aria-label="Mở tìm kiếm"
                        aria-expanded="false">
                    <img src="../assets/images/search.png" alt="" />
                </button>

                <input type="search"
                        name="search"
                        placeholder="Tìm kiếm"
                        aria-label="Tìm kiếm"
                        autocomplete="off" />

                <button class="nut-thuc-hien-tim-kiem"
                        type="submit">
                    Tìm
                </button>
            </form>

            <a class="bieu-tuong-gio-hang"
                href="Cart.aspx"
                aria-label="Giỏ hàng">
                <img src="../assets/images-backup/shopping-cart.png"
                        alt="Giỏ hàng" />
                <span data-cart-count="">0</span>
            </a>

            <% if (Session["memberID"] != null) { %>
                <span class="nut-dang-nhap bieu-tuong-tai-khoan"
                        role="img"
                        aria-label="Đã đăng nhập"
                        title="Đã đăng nhập">
                    <svg viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false">
                        <circle cx="12" cy="8" r="3.5"></circle>
                        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"></path>
                    </svg>
                </span>
            <% } else { %>
                <a class="nut-dang-nhap"
                    href="SignIn.aspx">
                    Đăng nhập
                </a>
            <% } %>
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
            <div><p class="overview-kicker">TỔNG QUAN VỀ SẢN PHẨM</p>
                <h2>Sự hoàn hảo không cần thỏa hiệp!</h2>
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
                    Xem tất cả
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
                <p>Linh kiện chất lượng cho bộ máy tiếp theo của bạn.</p>
            </div>
            <div class="the-san-pham">
                <h4>Mua sắm</h4>
                <a href="../aspx/List.aspx">Tất cả sản phẩm</a>
                <a href="../aspx/List.aspx?category=GPU">Card đồ họa</a>
                <a href="../aspx/List.aspx?category=CPU">Bộ vi sử lý</a>
            </div>
            <div class="the-san-pham">
                <h4>Hỗ trợ</h4>
                <a href="#">Tra cứu đơn hàng</a>
                <a href="#">Giao hàng và đổi trả</a>
                <a href="#">Liên hệ</a>
            </div>
            <div class="the-san-pham">
                <h4>GearHouse</h4>
                <a href="#">Cổng quản trị</a>
                <a href="#">Giới thiệu</a>
                <a href="#">Tuyển dụng</a>
            </div>
        </div>
        <div class="dong-cuoi">
            <p>© 2026 GearHouse, Inc. All rights reserved.</p>
        </div>
    </footer>
    <script src="../js/ChiTietSanPham.js"></script>
</body>
</html>
