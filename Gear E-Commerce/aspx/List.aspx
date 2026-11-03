<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="List.aspx.cs" Inherits="Gear_E_Commerce.aspx.List" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tất cả sản phẩm - GearHouse</title>
    <link rel="stylesheet" href="../css/global.css?v=19" />
    <link rel="stylesheet" href="../css/List.css?v=36" />
</head>
<body class="trang-list">
    <div class="dau-trang">
        <header>
            <div class="logo-thuong-hieu">
                <a href="home.aspx" aria-label="GearHouse - Trang chủ">
                    <span class="logo-mark" aria-hidden="true">G</span>
                </a>
            </div>
            <nav class="menu-chinh" id="menuChinh">
                <a href="home.aspx">Trang chủ</a>
                <a class="dang-chon" href="List.aspx">Sản phẩm</a>
                <a href="home.aspx#danh-muc">Lắp ráp PC</a>
                <a href="home.aspx#chan-trang">Hỗ trợ</a>
            </nav>
            <div class="tai-khoan">
                <a
                    class="bieu-tuong-gio-hang"
                    href="Cart.aspx"
                    aria-label="Giỏ hàng">
                    <img
                        src="../assets/images-backup/shopping-cart.png"
                        alt="Giỏ hàng" /></a>
                <% if (Session["memberID"] != null) { %>
                <span class="nut-dang-nhap bieu-tuong-tai-khoan" role="img" aria-label="Đã đăng nhập" title="Đã đăng nhập">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <circle cx="12" cy="8" r="3.5"></circle>
                        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"></path>
                    </svg>
                </span>
                <% } else { %>
                <a class="nut-dang-nhap" href="SignIn.aspx">Đăng nhập</a>
                <% } %>
            </div>
        </header>
    </div>
    <main class="trang-san-pham">
        <p class="duong-dan">
            <a href="home.aspx">Trang chủ</a><span aria-hidden="true"> / </span><a href="List.aspx">Sản phẩm</a>
        </p>
        <p class="loi-chao">GEARHOUSE CATALOG</p>
        <h1>Tất cả sản phẩm</h1>
        <p class="mo-ta-trang">
            Khám phá linh kiện máy tính được chọn lọc về hiệu năng, độ bền và khả
      năng tương thích.
        </p>
        <div class="khu-vuc-noi-dung">
            <div class="cot-danh-muc">
                <div class="tieu-de-bo-loc">
                    <h3>Bộ lọc</h3>
                    <button id="xoaBoLoc" type="button">Xóa tất cả</button>
                </div>
                <form class="bo-loc-tim-kiem" id="formTimTrongDanhMuc" autocomplete="off">
                    <input
                        type="search"
                        id="timTrongDanhMuc"
                        name="timTrongDanhMuc"
                        autocomplete="off"
                        autocorrect="off"
                        spellcheck="false"
                        placeholder="Tìm sản phẩm"
                        aria-label="Tìm trong sản phẩm" />
                </form>
                <h4>Danh mục</h4>
                <div class="bo-dieu-khien-danh-muc-bo-loc">
                    <button
                        class="nut-truot-danh-muc-bo-loc nut-truot-trai"
                        type="button"
                        aria-label="Xem danh mục trước"
                        aria-controls="danhSachDanhMucBoLoc">
                        <span aria-hidden="true">‹</span>
                    </button>
                    <div class="danh-sach-danh-muc" id="danhSachDanhMucBoLoc">
                        <a href="#" class="muc-danh-muc active" data-category="All">Tất cả</a>
                        <a href="#" class="muc-danh-muc" data-category="CPU">CPU</a>
                        <a href="#" class="muc-danh-muc" data-category="GPU">GPU</a>
                        <a href="#" class="muc-danh-muc" data-category="RAM">RAM</a>
                        <a href="#" class="muc-danh-muc" data-category="Motherboard">Bo mạch chủ</a>
                        <a href="#" class="muc-danh-muc" data-category="SSD">SSD</a>
                        <a href="#" class="muc-danh-muc" data-category="Power Supply">Nguồn</a>
                        <a href="#" class="muc-danh-muc" data-category="Accessories">Phụ kiện</a>
                    </div>
                    <button
                        class="nut-truot-danh-muc-bo-loc nut-truot-phai"
                        type="button"
                        aria-label="Xem danh mục tiếp theo"
                        aria-controls="danhSachDanhMucBoLoc">
                        <span aria-hidden="true">›</span>
                    </button>
                </div>
                <details class="bo-loc-gia">
                    <summary>Khoảng giá</summary>
                    <div class="danh-sach-muc-gia">
                        <label>
                            <input
                                id="mucGiaTatCa"
                                type="radio"
                                name="mucGia"
                                value="tatCa"
                                checked />
                            Mọi mức giá</label>
                        <label>
                            <input
                                id="mucGiaDuoi7500000"
                                type="radio"
                                name="mucGia"
                                value="duoi7500000" />
                            Dưới 7.500.000 ₫</label>
                        <label>
                            <input
                                id="mucGia7500000Den12500000"
                                type="radio"
                                name="mucGia"
                                value="7500000den12500000" />
                            7.500.000–dưới 12.500.000 ₫</label>
                        <label>
                            <input
                                id="mucGia12500000Den22500000"
                                type="radio"
                                name="mucGia"
                                value="12500000den22500000" />
                            12.500.000–22.500.000 ₫</label>
                        <label>
                            <input
                                id="mucGiaTren22500000"
                                type="radio"
                                name="mucGia"
                                value="tren22500000" />
                            Trên 22.500.000 ₫</label>
                    </div>
                </details>
            </div>
            <section class="cot-san-pham">
                <div class="thanh-cong-cu">
                    <p id="soLuongSanPham">0 sản phẩm</p>
                    <div class="sap-xep">
                        <p>Sắp xếp:</p>
                        <select id="sapXep">
                            <option value="featured">Nổi bật</option>
                            <option value="newest">Mới nhất</option>
                            <option value="low">Giá thấp đến cao</option>
                            <option value="high">Giá cao đến thấp</option>
                        </select>
                    </div>
                </div>
                <div class="danh-sach" id="danhSachSanPham"></div>
            </section>
        </div>
        <div class="phan-trang" id="phanTrang"></div>
    </main>
    <footer class="chan-trang" id="chan-trang">
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
    </footer>
    <script src="../js/List.js?v=18"></script>
</body>
</html>
