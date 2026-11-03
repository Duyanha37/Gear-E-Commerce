<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Cart.aspx.cs" Inherits="Gear_E_Commerce.Cart" ResponseEncoding="utf-8" Culture="vi-VN" UICulture="vi-VN" %>
<!doctype html>
<html lang="vi">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Shopping Cart - GearHouse</title>
    <link rel="stylesheet" href="../css/global.css" />
    <link rel="stylesheet" href="../css/Cart.css" />
    <link rel="stylesheet" href="../css/site-shell.css" />
</head>
<body>
    <div class="dau-trang">
        <header>
        <div class="logo-thuong-hieu">
            <a href="../html/home.html">G GearHouse</a>
        </div>
        <nav class="menu-chinh">
            <a href="../html/home.html">Home</a>
            <a class="dang-chon" href="../html/List.html">Products</a>
            <a href="../html/List.html">PC Builder</a>
            <a href="#chan-trang">Support</a>
        </nav>
        <div class="tai-khoan">
            <form class="hop-tim-kiem" id="formTimKiem" action="../html/List.html">
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
            <a class="nut-dang-nhap" href="../html/SignIn.html">Log in</a>
        </div>
        </header>
    </div>

    <main class="trang-gio-hang">
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="../html/home.html">Home</a>
            <span>/</span>
            <span>Shopping Cart</span>
        </nav>
        <div class="cart-heading">
            <div>
                <p class="section-kicker">LỰA CHỌN CỦA BẠN</p>
                <h1>Giỏ hàng</h1>
            </div>
            <p id="itemCount" class="item-count">0 items</p>
        </div>
        <section id="gioHangTrong" class="gio-hang-trong" hidden>
            <div class="empty-mark" aria-hidden="true">
                <img src="../assets/images-backup/shopping-cart.png" alt="" />
            </div>
            <h2>Your cart is empty</h2>
            <p>Tìm các linh kiện phù hợp cho bộ máy (build) tiếp theo của bạn.</p>
            <a class="nut-chinh" href="../html/List.html">Continue shopping</a>
        </section>
        <div id="noiDungGioHang" class="bo-gio-hang" hidden>
            <section class="khu-vuc-danh-sach" aria-label="Các sản phẩm trong giỏ hàng của bạn">
                <div id="danhSachGioHang" class="danh-sach-gio-hang"></div>
                <a class="continue-shopping" href="../html/List.html">← Continue shopping</a>
            </section>
            <aside class="tong-ket"><h2>Order summary</h2>
                <div class="dong-tong">
                    <span>Subtotal</span>
                    <span id="tamTinh">0 ₫</span>
                </div>
                <div class="dong-tong">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div class="dong-tong">
                    <span>Estimated tax</span>
                    <span>Calculated at checkout</span>
                </div>
                <div class="dong-tong cuoi">
                    <span>Total</span>
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
                    <h2>Featured products</h2>
                    <p>Khám phá thêm các linh kiện cho bộ máy (build) tiếp theo của bạn.</p>
                </div>
                <a href="../html/List.html">
                    View all 
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
            <p>Linh kiện cho bộ máy (build) tuyệt vời tiếp theo của bạn.</p>
        </div>
        <div class="the-san-pham">
            <h4>Shop</h4>
            <a href="../html/List.html">All products</a>
            <a href="../html/List.html?category=GPU">Graphics cards</a>
            <a href="../html/List.html?category=CPU">Processors</a>
        </div>
        <div class="the-san-pham">
            <h4>Support</h4>
            <a href="#">Order status</a>
            <a href="#">Shipping and returns</a>
            <a href="#">Contact us</a>
        </div>
        <div class="the-san-pham">
            <h4>GearHouse</h4>
            <a href="#">About</a>
            <a href="#">Admin portal</a>
            <a href="#">Careers</a>
        </div>
     </div>
        <div class="dong-cuoi">
            <p>© 2026 GearHouse, Inc. All rights reserved.</p>
        </div>
    </footer>

    <script src="../js/ProductCatalog.js"></script>
    <script src="../js/Cart.js"></script>
</body>
</html>
