<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Cart.aspx.cs" Inherits="Gear_E_Commerce.Cart" ResponseEncoding="utf-8" Culture="vi-VN" UICulture="vi-VN" %>
<!doctype html>
<html lang="vi">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Shopping Cart - GearHouse</title>
    <link rel="stylesheet" href="../css/site-shell.css?v=1" />
    <link rel="stylesheet" href="../css/global.css?v=1" />
    <link rel="stylesheet" href="../css/Cart.css?v=6" />
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

    <main class="trang-gio-hang">
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="../aspx/home.aspx">Home</a>
            <span>/</span>
            <span>Giỏ hàng</span>
        </nav>
        <div class="cart-heading">
            <div>
                <p class="section-kicker">LỰA CHỌN CỦA BẠN</p>
                <h1>Giỏ hàng</h1>
            </div>
            <p id="itemCount" class="item-count">0 món</p>
        </div>
        <section id="gioHangTrong" class="gio-hang-trong" hidden>
            <div class="empty-mark" aria-hidden="true">
                <img src="../assets/images-backup/shopping-cart.png" alt="" />
            </div>
            <h2>Giỏ hàng của bạn đang trống</h2>
            <p>Tìm các linh kiện phù hợp cho bộ máy tiếp theo của bạn.</p>
            <a class="nut-chinh" href="../aspx/List.aspx">Tiếp tục mua sắm</a>
        </section>
        <div id="noiDungGioHang" class="bo-gio-hang" hidden>
            <section class="khu-vuc-danh-sach" aria-label="Các sản phẩm trong giỏ hàng của bạn">
                <div id="danhSachGioHang" class="danh-sach-gio-hang"></div>
                <a class="continue-shopping" href="../aspx/List.aspx">← Tiếp tục mua sắm</a>
            </section>
            <aside class="tong-ket"><h2>Tổng giá đơn hàng</h2>
                <div class="dong-tong">
                    <span>Tổng phụ</span>
                    <span id="tamTinh">0 ₫</span>
                </div>
                <div class="dong-tong">
                    <span>Phí ship</span>
                    <span>Free</span>
                </div>
                <div class="dong-tong">
                    <span>Thuế ước tính</span>
                    <span>Giá sản phẩm chưa gồm phí và thuế</span>
                </div>
                <div class="dong-tong cuoi">
                    <span>Tổng</span>
                    <strong id="tongCong">0 ₫</strong>
                </div>
                <button class="nut-thanh-toan" id="thanhToan" type="button">
                    Tiến hành thanh toán
                    <span aria-hidden="true">→</span>
                </button>
                <p class="checkout-message" id="checkoutMessage" role="status" hidden></p>
                <p class="ghi-chu-demo">
                    <svg aria-hidden="true" viewBox="0 0 20 20">
                        <path d="M10 2.5 16 5v4.4c0 3.8-2.4 6.6-6 8.1-3.6-1.5-6-4.3-6-8.1V5l6-2.5Z"/>
                        <path d="m7.4 9.9 1.7 1.7 3.6-3.8"/>
                    </svg> 
                    Thanh toán bảo mật và được mã hóa
                </p>
            </aside>
        </div>
        <section class="khu-vuc-goi-y">
            <div class="tieu-de-khu-vuc">
                <div>
                    <h2>Gợi ý sản phẩm</h2>
                    <p>Khám phá thêm các linh kiện cho bộ máy tiếp theo của bạn.</p>
                </div>
                <a href="../aspx/List.aspx">
                    Xem tất cả
                    <span aria-hidden="true">↗</span>
                </a>
            </div>
            <div id="danhSachNoiBat" class="danh-sach-san-pham"></div>
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
    <script src="../js/Cart.js"></script>
</body>
</html>
