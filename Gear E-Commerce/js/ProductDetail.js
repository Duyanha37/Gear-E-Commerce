const danhSachSanPham = [
    { id: 1, ten: "Bàn phím cơ Logitech G Pro X", loai: "Bàn phím cơ", gia: 2990000, anh: "logitechGPro.jpg", moTa: "Bàn phím cơ gaming thiết kế gọn gàng, phù hợp cho chơi game và làm việc hằng ngày." },
    { id: 2, ten: "Chuột Razer DeathAdder V3 Pro", loai: "Chuột Gaming", gia: 3690000, anh: "deathAdderV3pro.jpg", moTa: "Chuột gaming không dây với thiết kế công thái học, phù hợp cho nhu cầu chơi game và sử dụng lâu dài." },
    { id: 3, ten: "Tai nghe HyperX Cloud III", loai: "Tai nghe", gia: 2290000, anh: "tai-nghe-gaming-overear-hyperx-cloud-iii-s2.png", moTa: "Tai nghe gaming mang đến trải nghiệm âm thanh rõ ràng, phù hợp chơi game, nghe nhạc và giải trí." },
    { id: 4, ten: "Màn hình LG UltraGear 27 2K", loai: "Màn hình", gia: 7490000, anh: "AsuaTuf24.jpg", moTa: "Màn hình gaming kích thước 27 inch, độ phân giải 2K, hướng đến trải nghiệm hình ảnh sắc nét." },
    { id: 5, ten: "Bàn phím cơ Akko 3098B", loai: "Bàn phím cơ", gia: 1990000, anh: "Akko3098B.jpg", moTa: "Bàn phím cơ thiết kế hiện đại, phù hợp cho học tập, làm việc và gaming." },
    { id: 6, ten: "Chuột Logitech G502 Hero", loai: "Chuột Gaming", gia: 1190000, anh: "LogitechG502.jpg", moTa: "Chuột gaming có thiết kế chắc chắn, phù hợp cho nhiều thể loại game." },
    { id: 7, ten: "Tai nghe Razer BlackShark V2", loai: "Tai nghe", gia: 2590000, anh: "RazerBlackSharkV2.jpg", moTa: "Tai nghe gaming tập trung vào khả năng tái tạo âm thanh và giao tiếp trong game." },
    { id: 8, ten: "Màn hình Asus TUF Gaming 24", loai: "Màn hình", gia: 4290000, anh: "AsuaTuf24.jpg", moTa: "Màn hình gaming 24 inch dành cho nhu cầu giải trí và chơi game." },
    { id: 9, ten: "Bàn phím cơ Keychron K8 Pro", loai: "Bàn phím cơ", gia: 2890000, anh: "K8Pro.jpg", moTa: "Bàn phím cơ layout tiện dụng, phù hợp cả công việc và giải trí." },
    { id: 10, ten: "Chuột Logitech G Pro Wireless", loai: "Chuột Gaming", gia: 2490000, anh: "chuot-game-khong-day-logitech-g304-trang-usb-7.jpg", moTa: "Chuột gaming không dây hướng đến hiệu năng ổn định và thao tác chính xác." },
    { id: 11, ten: "Bàn phím cơ Corsair K70 RGB", loai: "Bàn phím cơ", gia: 3990000, anh: "Akko3098B.jpg", moTa: "Bàn phím cơ gaming với thiết kế nổi bật và trải nghiệm gõ tốt." },
    { id: 12, ten: "Chuột SteelSeries Rival 5", loai: "Chuột Gaming", gia: 1590000, anh: "LogitechG502.jpg", moTa: "Chuột gaming đa năng dành cho nhiều thể loại game." },
    { id: 13, ten: "Tai nghe Logitech G733", loai: "Tai nghe", gia: 3190000, anh: "RazerBlackSharkV2.jpg", moTa: "Tai nghe gaming không dây, phù hợp chơi game và giải trí." },
    { id: 14, ten: "Màn hình Samsung Odyssey G5 27", loai: "Màn hình", gia: 5990000, anh: "AsuaTuf24.jpg", moTa: "Màn hình 27 inch hướng đến trải nghiệm gaming và giải trí." },
    { id: 15, ten: "Bàn phím cơ Razer BlackWidow V3", loai: "Bàn phím cơ", gia: 3290000, anh: "K8Pro.jpg", moTa: "Bàn phím cơ gaming với thiết kế chắc chắn và phong cách hiện đại." },
    { id: 16, ten: "Chuột Razer Viper V2 Pro", loai: "Chuột Gaming", gia: 2990000, anh: "LogitechG502.jpg", moTa: "Chuột gaming nhẹ, phù hợp cho các thao tác nhanh và chính xác." },
    { id: 17, ten: "Tai nghe SteelSeries Arctis Nova 7", loai: "Tai nghe", gia: 3890000, anh: "tai-nghe-gaming-overear-hyperx-cloud-iii-s2.png", moTa: "Tai nghe gaming hướng đến trải nghiệm âm thanh và sự thoải mái." },
    { id: 18, ten: "Màn hình Gigabyte G27Q 27", loai: "Màn hình", gia: 6790000, anh: "AsuaTuf24.jpg", moTa: "Màn hình 27 inch phù hợp cho gaming, học tập và giải trí." },
    { id: 19, ten: "Bàn phím cơ Ducky One 3", loai: "Bàn phím cơ", gia: 2590000, anh: "K8Pro.jpg", moTa: "Bàn phím cơ có thiết kế gọn gàng và trải nghiệm gõ ổn định." },
    { id: 20, ten: "Chuột Corsair Katar Pro", loai: "Chuột Gaming", gia: 890000, anh: "LogitechG502.jpg", moTa: "Chuột gaming nhỏ gọn, phù hợp sử dụng hằng ngày." }
];

const thamSo = new URLSearchParams(window.location.search);
const id = Number(thamSo.get("id"));
const sanPham = danhSachSanPham.find(function (item) { return item.id === id; });

function layGioHang() {
    try { return JSON.parse(localStorage.getItem("gearHouseCart")) || []; }
    catch (e) { return []; }
}

function luuGioHang(gioHang) {
    localStorage.setItem("gearHouseCart", JSON.stringify(gioHang));
}

function capNhatSoLuongGioHang() {
    const tong = layGioHang().reduce(function (sum, item) { return sum + item.soLuong; }, 0);
    document.getElementById("soLuongGioHang").textContent = tong;
}

function hienThiChiTiet() {
    const khung = document.getElementById("chiTietSanPham");
    if (!sanPham) {
        khung.innerHTML = '<div class="san-pham-khong-ton-tai"><h2>Không tìm thấy sản phẩm</h2><p>Sản phẩm bạn đang tìm kiếm không tồn tại.</p><a href="List.html">Xem danh sách sản phẩm</a></div>';
        return;
    }

    khung.innerHTML =
        '<div class="khung-chi-tiet">' +
            '<div class="anh-san-pham"><img src="' + sanPham.anh + '" alt="' + sanPham.ten + '"></div>' +
            '<div class="thong-tin-san-pham">' +
                '<p class="loai-san-pham">' + sanPham.loai + '</p>' +
                '<h1>' + sanPham.ten + '</h1>' +
                '<p class="gia-san-pham">' + sanPham.gia.toLocaleString("vi-VN") + '₫</p>' +
                '<p class="mo-ta-san-pham">' + sanPham.moTa + '</p>' +
                '<hr>' +
                '<div class="so-luong"><label>Số lượng</label><div class="bo-so-luong"><button type="button" id="giam">−</button><input id="soLuong" type="number" value="1" min="1" max="99"><button type="button" id="tang">+</button></div></div>' +
                '<button class="nut-gio-hang" id="themGioHang">Thêm vào giỏ hàng</button>' +
                '<p class="thong-bao" id="thongBao"></p>' +
            '</div>' +
        '</div>';

    document.getElementById("giam").addEventListener("click", function () {
        const input = document.getElementById("soLuong");
        input.value = Math.max(1, Number(input.value) - 1);
    });

    document.getElementById("tang").addEventListener("click", function () {
        const input = document.getElementById("soLuong");
        input.value = Math.min(99, Number(input.value) + 1);
    });

    document.getElementById("themGioHang").addEventListener("click", function () {
        const soLuong = Math.max(1, Number(document.getElementById("soLuong").value) || 1);
        const gioHang = layGioHang();
        const item = gioHang.find(function (x) { return x.id === sanPham.id; });
        if (item) item.soLuong += soLuong;
        else gioHang.push({ id: sanPham.id, ten: sanPham.ten, gia: sanPham.gia, anh: sanPham.anh, soLuong: soLuong });
        luuGioHang(gioHang);
        capNhatSoLuongGioHang();
        document.getElementById("thongBao").textContent = "Đã thêm sản phẩm vào giỏ hàng.";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    hienThiChiTiet();
    capNhatSoLuongGioHang();
});
