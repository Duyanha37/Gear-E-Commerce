// bàn phím
const danhSachBanPhim = [
    { productID: "1", Name: "Bàn phím cơ Logitech G Pro X", Description: "Bàn phím cơ gaming thiết kế gọn gàng", Price: 2990000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/logitechGPro.jpg" },
    { productID: "5", Name: "Bàn phím cơ Akko 3098B", Description: "Bàn phím cơ phù hợp cho học tập và gaming", Price: 1990000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/Akko3098B.jpg" },
    { productID: "9", Name: "Bàn phím cơ Keychron K8 Pro", Description: "Bàn phím cơ phù hợp cho công việc và giải trí", Price: 2890000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/K8Pro.jpg" },
    { productID: "11", Name: "Bàn phím cơ Corsair K70 RGB", Description: "Bàn phím cơ gaming có đèn nền RGB", Price: 3990000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/Akko3098B.jpg" },
    { productID: "15", Name: "Bàn phím cơ Razer BlackWidow V3", Description: "Bàn phím cơ gaming thiết kế chắc chắn", Price: 3290000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/K8Pro.jpg" },
    { productID: "19", Name: "Bàn phím cơ Ducky One 3", Description: "Bàn phím cơ gọn gàng và ổn định", Price: 2590000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/K8Pro.jpg" }
];

// chuột
const danhSachChuot = [
    { productID: "2", Name: "Chuột Razer DeathAdder V3 Pro", Description: "Chuột gaming không dây thiết kế công thái học", Price: 3690000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/deathAdderV3pro.jpg" },
    { productID: "6", Name: "Chuột Logitech G502 Hero", Description: "Chuột gaming có thiết kế chắc chắn", Price: 1190000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/LogitechG502.jpg" },
    { productID: "10", Name: "Chuột Logitech G Pro Wireless", Description: "Chuột gaming không dây thao tác chính xác", Price: 2490000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/chuot-game-khong-day-logitech-g304-trang-usb-7.jpg" },
    { productID: "12", Name: "Chuột SteelSeries Rival 5", Description: "Chuột gaming đa năng", Price: 1590000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/LogitechG502.jpg" },
    { productID: "16", Name: "Chuột Razer Viper V2 Pro", Description: "Chuột gaming nhẹ cho thao tác nhanh", Price: 2990000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/LogitechG502.jpg" },
    { productID: "20", Name: "Chuột Corsair Katar Pro", Description: "Chuột gaming nhỏ gọn", Price: 890000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/LogitechG502.jpg" }
];

// tai nghe
const danhSachTaiNghe = [
    { productID: "3", Name: "Tai nghe HyperX Cloud III", Description: "Tai nghe gaming cho chơi game và giải trí", Price: 2290000, Stock: 25, Category: "Tai nghe", Image: "../assets/images/HpHyperX3.jpg" },
    { productID: "7", Name: "Tai nghe Razer BlackShark V2", Description: "Tai nghe gaming cho âm thanh và giao tiếp", Price: 2590000, Stock: 25, Category: "Tai nghe", Image: "../assets/images/RazerBlackSharkV2.jpg" },
    { productID: "13", Name: "Tai nghe Logitech G733", Description: "Tai nghe gaming không dây", Price: 3190000, Stock: 25, Category: "Tai nghe", Image: "../assets/images/RazerBlackSharkV2.jpg" },
    { productID: "17", Name: "Tai nghe SteelSeries Arctis Nova 7", Description: "Tai nghe gaming thoải mái khi sử dụng", Price: 3890000, Stock: 25, Category: "Tai nghe", Image: "../assets/images/HpHyperX3.jpg" }
];

// màn hình
const danhSachManHinh = [
    { productID: "4", Name: "Màn hình LG UltraGear 27 2K", Description: "Màn hình gaming 27 inch độ phân giải 2K", Price: 7490000, Stock: 25, Category: "Màn hình", Image: "../assets/images/LgutraGear.jpg" },
    { productID: "8", Name: "Màn hình Asus TUF Gaming 24", Description: "Màn hình gaming 24 inch", Price: 4290000, Stock: 25, Category: "Màn hình", Image: "../assets/images/AsuaTuf24.jpg" },
    { productID: "14", Name: "Màn hình Samsung Odyssey G5 27", Description: "Màn hình gaming 27 inch", Price: 5990000, Stock: 25, Category: "Màn hình", Image: "../assets/images/AsuaTuf24.jpg" },
    { productID: "18", Name: "Màn hình Gigabyte G27Q 27", Description: "Màn hình 27 inch cho gaming và giải trí", Price: 6790000, Stock: 25, Category: "Màn hình", Image: "../assets/images/AsuaTuf24.jpg" }
];

// sản phẩm nổi bật
const danhSachSanPhamNoiBat = [
    danhSachBanPhim[0],
    danhSachChuot[0],
    danhSachTaiNghe[0],
    danhSachManHinh[0]
];

document.addEventListener("DOMContentLoaded", function () {
    sapXepDanhSachBanPhim();
    sapXepDanhSachChuot();
    sapXepDanhSachTaiNghe();
    sapXepDanhSachManHinh();
    hienThiDanhSachSanPham(danhSachSanPhamNoiBat, "danhSachSanPhamNoiBat", 4);
    batSuKienTimKiem();
});

// giá từ thấp đến cao
function sapXepTheoGia(danhSach) {
    danhSach.sort(function (sanPhamTruoc, sanPhamSau) {
        return sanPhamTruoc.Price - sanPhamSau.Price;
    });
}

// danh sách bàn phím
function sapXepDanhSachBanPhim() {
    sapXepTheoGia(danhSachBanPhim);
    hienThiDanhSachSanPham(danhSachBanPhim, "danhSachBanPhim", 5);
}

// danh sách chuột
function sapXepDanhSachChuot() {
    sapXepTheoGia(danhSachChuot);
    hienThiDanhSachSanPham(danhSachChuot, "danhSachChuot", 5);
}

// danh sách tai nghe
function sapXepDanhSachTaiNghe() {
    sapXepTheoGia(danhSachTaiNghe);
    hienThiDanhSachSanPham(danhSachTaiNghe, "danhSachTaiNghe", 5);
}

// danh sách màn hình
function sapXepDanhSachManHinh() {
    sapXepTheoGia(danhSachManHinh);
    hienThiDanhSachSanPham(danhSachManHinh, "danhSachManHinh", 5);
}

// duyệt và hiển thị thông tin sản phẩm
function hienThiDanhSachSanPham(danhSach, idKhung, soSanPhamToiDa) {
    const khungDanhSach = document.getElementById(idKhung);
    khungDanhSach.innerHTML = "";
    danhSach.forEach(function (sanPham, viTri) {
        if (viTri < soSanPhamToiDa) {
            const duongDanChiTiet = "../html/ChiTietSanPham.html?id=" + sanPham.productID;
            khungDanhSach.innerHTML = khungDanhSach.innerHTML +
                '<div class="the-san-pham">' +
                '<a class="khung-anh" href="' + duongDanChiTiet + '"><img src="' + sanPham.Image + '" alt="' + sanPham.Name + '"></a>' +
                '<p class="loai-san-pham">' + sanPham.Category + '</p>' +
                '<h3><a href="' + duongDanChiTiet + '">' + sanPham.Name + '</a></h3>' +
                '<p class="mo-ta-san-pham">' + sanPham.Description + '</p>' +
                '<p class="gia-san-pham">' + sanPham.Price.toLocaleString("vi-VN") + '₫</p>' +
                '<p class="so-luong-ton">Số lượng còn: ' + sanPham.Stock + '</p>' +
                '</div>';
        }
    });
}

// tìm kiếm
function batSuKienTimKiem() {
    const formTimKiem = document.getElementById("formTimKiem");
    formTimKiem.addEventListener("submit", function (event) {
        event.preventDefault();
        const tuKhoa = document.getElementById("oTimKiem").value.toLowerCase().trim();
        if (tuKhoa === "") {
            return;
        }
        const cacDanhSach = [danhSachBanPhim, danhSachChuot, danhSachTaiNghe, danhSachManHinh];
        const cacDanhMucTimThay = [];
        cacDanhSach.forEach(function (danhSach) {
            danhSach.forEach(function (sanPham) {
                const thongTinSanPham = (sanPham.Name + " " + sanPham.Description + " " + sanPham.Category).toLowerCase();
                if (thongTinSanPham.includes(tuKhoa) && !cacDanhMucTimThay.includes(sanPham.Category)) {
                    cacDanhMucTimThay.push(sanPham.Category);
                }
            });
        });
        const thamSoTimKiem = new URLSearchParams();
        thamSoTimKiem.set("search", tuKhoa);
        if (cacDanhMucTimThay.length === 1) {
            thamSoTimKiem.set("category", cacDanhMucTimThay[0]);
        } else {
            thamSoTimKiem.set("category", "Tất cả sản phẩm");
        }
        thamSoTimKiem.set("page", "1");
        sessionStorage.removeItem("danhMucList");
        sessionStorage.removeItem("trangList");
        window.location.href = "../html/List.html?" + thamSoTimKiem.toString();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const cacLienKetList = document.querySelectorAll('a[href*="List.html"]');
    cacLienKetList.forEach(function (lienKet) {
        lienKet.addEventListener("click", function () {
            sessionStorage.removeItem("danhMucList");
            sessionStorage.removeItem("trangList");
        });
    });
});
