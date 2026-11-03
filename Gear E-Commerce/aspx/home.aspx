<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="Gear_E_Commerce.aspx.Home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GearHouse - Linh kiện máy tính</title>
    <link rel="stylesheet" href="../css/global.css?v=19" />
    <link rel="stylesheet" href="../css/home.css?v=4" />
</head>
<body class="trang-home">
    <div class="dau-trang">
        <header>
            <div class="logo-thuong-hieu">
                <a href="home.aspx" aria-label="GearHouse - Trang chủ">
                    <img src="../assets/images/Logo-White.png" alt="GearHouse" />
                </a>
            </div>
            <nav class="menu-chinh" id="menuChinh">
                <a class="dang-chon" href="home.aspx">Trang chủ</a>
                <a href="List.aspx">Sản phẩm</a>
                <a href="#danh-muc">Lắp ráp PC</a>
                <a href="#chan-trang">Hỗ trợ</a>
            </nav>
            <button
                class="nut-menu-di-dong"
                type="button"
                aria-label="Mở danh mục"
                aria-expanded="false"
                aria-controls="menuChinh">
                <span></span><span></span><span></span>
            </button>
            <div class="tai-khoan">
                <form class="hop-tim-kiem" id="formTimKiem">
                    <button
                        class="nut-mo-tim-kiem"
                        id="nutMoTimKiem"
                        type="button"
                        aria-label="Mở tìm kiếm"
                        aria-expanded="false">
                        <img src="../assets/images/search.png" alt="" />
                    </button>
                    <input
                        type="search"
                        id="oTimKiem"
                        placeholder="Tìm kiếm"
                        aria-label="Tìm kiếm" />
                </form>
                <a
                    class="bieu-tuong-gio-hang"
                    href="../html/Cart.html"
                    aria-label="Giỏ hàng">
                    <img
                        src="../assets/images-backup/shopping-cart.png"
                        alt="Giỏ hàng" /></a>
                <a class="nut-dang-nhap" href="../html/SignIn.html">Đăng nhập</a>
            </div>
        </header>
    </div>
    <main>
        <section class="khu-vuc-noi-dung">
            <div class="cot-danh-muc">
                <p class="loi-chao">ENGINEERED FOR MORE</p>
                <h1>Build Your<br />
                    Perfect PC</h1>
                <p class="doan-van">
                    High-performance components, expertly curated. Everything you need
            to build without compromise.
                </p>
                <div class="nhom-nut">
                    <a href="List.aspx">Mua linh kiện</a>
                    <a href="#san-pham-noi-bat">Khám phá sản phẩm mới</a>
                </div>
            </div>
            <div class="khung-anh">
                <img
                    src="../assets/images-backup/Banner.jpg"
                    alt="Banner màn hình gaming" />
            </div>
        </section>
        <section class="khu-vuc-danh-muc" id="danh-muc">
            <div class="tieu-de-khu-vuc">
                <div>
                    <p class="loi-chao">BẮT ĐẦU XÂY DỰNG</p>
                    <h2>Danh mục sản phẩm</h2>
                </div>
                <a href="List.aspx">Xem tất cả ›</a>
            </div>
            <div class="bo-dieu-khien-danh-muc">
                <button
                    class="nut-truot-danh-muc nut-truot-trai"
                    type="button"
                    aria-label="Xem danh mục trước"
                    aria-controls="danhSachDanhMuc">
                    <span aria-hidden="true">‹</span>
                </button>
                <div class="danh-sach danh-sach-danh-muc" id="danhSachDanhMuc">
                    <a href="List.aspx?category=CPU" class="the-san-pham">
                        <div class="khung-anh">
                            <img
                                src="../assets/images-backup/ryzen-9-7950x3d.jpg"
                                alt="Bộ xử lý AMD Ryzen 9 7950X3D" />
                        </div>
                        <p>CPU</p>
                        <p class="mo-ta-danh-muc">Xem sản phẩm ›</p>
                    </a>
                    <a href="List.aspx?category=GPU" class="the-san-pham">
                        <div class="khung-anh">
                            <img
                                src="../assets/images-backup/geforce-rtx-4080-super.jpg"
                                alt="Card đồ họa ASUS TUF Gaming GeForce RTX 4080 SUPER" />
                        </div>
                        <p>GPU</p>
                        <p class="mo-ta-danh-muc">Xem sản phẩm ›</p>
                    </a>
                    <a href="List.aspx?category=RAM" class="the-san-pham">
                        <div class="khung-anh">
                            <img
                                src="../assets/images-backup/vengeance-rgb-32gb.jpg"
                                alt="Bộ nhớ Corsair Vengeance RGB DDR5" />
                        </div>
                        <p>RAM</p>
                        <p class="mo-ta-danh-muc">Xem sản phẩm ›</p>
                    </a>
                    <a href="List.aspx?category=Motherboard" class="the-san-pham">
                        <div class="khung-anh">
                            <img
                                src="../assets/images-backup/rog-strix-x670e-e.jpg"
                                alt="Bo mạch chủ ASUS ROG Strix X670E-E" />
                        </div>
                        <p>Bo mạch chủ</p>
                        <p class="mo-ta-danh-muc">Xem sản phẩm ›</p>
                    </a>
                    <a href="List.aspx?category=SSD" class="the-san-pham">
                        <div class="khung-anh">
                            <img
                                src="../assets/images-backup/samsung-990-pro-2tb.jpg"
                                alt="Ổ cứng Samsung 990 PRO NVMe 2TB" />
                        </div>
                        <p>SSD</p>
                        <p class="mo-ta-danh-muc">Xem sản phẩm ›</p>
                    </a>
                    <a href="List.aspx?category=Power Supply" class="the-san-pham">
                        <div class="khung-anh">
                            <img
                                src="../assets/images-backup/CorsairCX650.jpg"
                                alt="Nguồn Corsair CX650 650W" />
                        </div>
                        <p>Nguồn</p>
                        <p class="mo-ta-danh-muc">Xem sản phẩm ›</p>
                    </a>
                    <a href="List.aspx?category=Accessories" class="the-san-pham">
                        <div class="khung-anh">
                            <img
                                src="../assets/images-backup/Akko3098B.jpg"
                                alt="Bàn phím cơ Akko 3098B" />
                        </div>
                        <p>Phụ kiện</p>
                        <p class="mo-ta-danh-muc">Xem sản phẩm ›</p>
                    </a>
                </div>
                <button
                    class="nut-truot-danh-muc nut-truot-phai"
                    type="button"
                    aria-label="Xem danh mục tiếp theo"
                    aria-controls="danhSachDanhMuc">
                    <span aria-hidden="true">›</span>
                </button>
            </div>
        </section>
        <section class="khu-vuc-san-pham" id="san-pham-noi-bat">
            <div class="tieu-de-khu-vuc">
                <div>
                    <p class="loi-chao">SẢN PHẨM NỔI BẬT</p>
                    <h2>Sản phẩm nổi bật</h2>
                </div>
                <a href="List.aspx">Xem tất cả sản phẩm ›</a>
            </div>
            <div class="bo-dieu-khien-san-pham">
                <button
                    class="nut-truot-san-pham nut-truot-trai"
                    type="button"
                    aria-label="Xem sản phẩm trước"
                    aria-controls="danhSachSanPhamNoiBat">
                    <span aria-hidden="true">‹</span>
                </button>
                <div
                    class="danh-sach danh-sach-noi-bat"
                    id="danhSachSanPhamNoiBat">
                </div>
                <button
                    class="nut-truot-san-pham nut-truot-phai"
                    type="button"
                    aria-label="Xem sản phẩm tiếp theo"
                    aria-controls="danhSachSanPhamNoiBat">
                    <span aria-hidden="true">›</span>
                </button>
            </div>
        </section>
        <section class="khu-vuc-noi-dung banner-hieu-nang">
            <div class="cot-danh-muc">
                <p class="loi-chao">NEW GENERATION</p>
                <h2>Power that keeps up.</h2>
                <p class="doan-van">
                    Discover cutting-edge processors and graphics cards engineered for
            the next era of performance.
                </p>
                <div class="nhom-nut">
                    <a href="List.aspx">Khám phá sản phẩm mới</a>
                </div>
            </div>
            <div class="khung-anh">
                <img
                    src="../assets/images-backup/baner2.jpg"
                    alt="GPU RTX 4070 Super" />
            </div>
        </section>
        <section class="khu-vuc-san-pham" id="san-pham-moi">
            <div class="tieu-de-khu-vuc">
                <div>
                    <p class="loi-chao">VỪA CẬP BẾN</p>
                    <h2>Sản phẩm mới</h2>
                </div>
                <a href="List.aspx">Xem tất cả sản phẩm ›</a>
            </div>
            <div class="bo-dieu-khien-san-pham">
                <button
                    class="nut-truot-san-pham nut-truot-trai"
                    type="button"
                    aria-label="Xem sản phẩm trước"
                    aria-controls="danhSachSanPhamMoi">
                    <span aria-hidden="true">‹</span>
                </button>
                <div class="danh-sach danh-sach-moi" id="danhSachSanPhamMoi"></div>
                <button
                    class="nut-truot-san-pham nut-truot-phai"
                    type="button"
                    aria-label="Xem sản phẩm tiếp theo"
                    aria-controls="danhSachSanPhamMoi">
                    <span aria-hidden="true">›</span>
                </button>
            </div>
        </section>
        <section class="cam-ket">
            <div>
                <b>Miễn phí giao hàng</b>
                <p>Cho đơn hàng trên 2.475.000 ₫</p>
            </div>
            <div>
                <b>Bảo hành 3 năm</b>
                <p>Áp dụng cho một số linh kiện</p>
            </div>
            <div>
                <b>Đổi trả trong 30 ngày</b>
                <p>Mua sắm an tâm</p>
            </div>
        </section>
    </main>
    <div class="chan-trang" id="chan-trang">
        <div class="danh-sach">
            <div class="the-san-pham">
                <h4>G GearHouse</h4>
                <p>Linh kiện chất lượng cho bộ máy tiếp theo của bạn.</p>
            </div>
            <div class="the-san-pham">
                <h4>Mua sắm</h4>
                <a href="List.aspx">Tất cả sản phẩm</a><a href="List.aspx?category=GPU">Card đồ họa</a><a href="List.aspx?category=CPU">Bộ vi xử lý</a>
            </div>
            <div class="the-san-pham">
                <h4>Hỗ trợ</h4>
                <a href="#">Tra cứu đơn hàng</a><a href="#">Giao hàng và đổi trả</a><a href="#">Liên hệ</a>
            </div>
            <div class="the-san-pham">
                <h4>GearHouse</h4>
                <a href="#">Cổng quản trị</a><a href="#">Giới thiệu</a><a href="#">Tuyển dụng</a>
            </div>
        </div>
        <div class="dong-cuoi">
            <p>© 2026 GearHouse. Đã đăng ký bản quyền.</p>
        </div>
    </div>
    <script src="../js/List.js?v=11"></script>
    <script src="../js/home.js"></script>
</body>
</html>
