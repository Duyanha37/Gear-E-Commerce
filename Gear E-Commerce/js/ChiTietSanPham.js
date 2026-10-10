const danhSachSanPham = [
    {
        id: 1,
        ten: "Bàn phím cơ Logitech G Pro X",
        loai: "Bàn phím cơ",
        gia: 2990000,
        anh: "../assets/images/logitechGPro.jpg",
        moTa: "Bàn phím cơ gaming thiết kế gọn gàng, phù hợp cho chơi game và làm việc hằng ngày.",
        tonkho: 25,
        thongSo: "Loại: Bàn phím cơ | Kết nối: USB | Đèn nền: RGB | Thiết kế: Gaming"
    },
    {
        id: 2,
        ten: "Chuột Razer DeathAdder V3 Pro",
        loai: "Chuột Gaming",
        gia: 3690000,
        anh: "../assets/images/deathAdderV3pro.jpg",
        moTa: "Chuột gaming không dây với thiết kế công thái học, phù hợp cho nhu cầu chơi game và sử dụng lâu dài.",
        tonkho: 25,
        thongSo: "Loại: Chuột không dây | Thiết kế: Công thái học | DPI: Tối đa 30.000 | Sử dụng: Gaming"
    },
    {
        id: 3,
        ten: "Tai nghe HyperX Cloud III",
        loai: "Tai nghe",
        gia: 2290000,
        anh: "../assets/images/HpHyperX3.jpg",
        moTa: "Tai nghe gaming mang đến trải nghiệm âm thanh rõ ràng, phù hợp chơi game, nghe nhạc và giải trí.",
        tonkho: 25,
        thongSo: "Loại: Tai nghe gaming | Kết nối: USB / 3.5 mm | Micro: Có | Thiết kế: Over-ear"
    },
    {
        id: 4,
        ten: "Màn hình LG UltraGear 27 2K",
        loai: "Màn hình",
        gia: 7490000,
        anh: "../assets/images/LgutraGear.jpg",
        moTa: "Màn hình gaming kích thước 27 inch, độ phân giải 2K, hướng đến trải nghiệm hình ảnh sắc nét.",
        tonkho: 25,
        thongSo: "Kích thước: 27 inch | Độ phân giải: 2560 × 1440 | Mục đích: Gaming và giải trí"
    },
    {
        id: 5,
        ten: "Bàn phím cơ Akko 3098B",
        loai: "Bàn phím cơ",
        gia: 1990000,
        anh: "../assets/images/Akko3098B.jpg",
        moTa: "Bàn phím cơ thiết kế hiện đại, phù hợp cho học tập, làm việc và gaming.",
        tonkho: 25,
        thongSo: "Loại: Bàn phím cơ | Layout: 98 phím | Kết nối: Tùy phiên bản | Đèn nền: Tùy phiên bản"
    },
    {
        id: 6,
        ten: "Chuột Logitech G502 Hero",
        loai: "Chuột Gaming",
        gia: 1190000,
        anh: "../assets/images/LogitechG502.jpg",
        moTa: "Chuột gaming có thiết kế chắc chắn, phù hợp cho nhiều thể loại game.",
        tonkho: 25,
        thongSo: "Loại: Chuột gaming có dây | Kết nối: USB | Cảm biến: HERO | DPI: Tối đa 25.600"
    },
    {
        id: 7,
        ten: "Tai nghe Razer BlackShark V2",
        loai: "Tai nghe",
        gia: 2590000,
        anh: "../assets/images/RazerBlackSharkV2.jpg",
        moTa: "Tai nghe gaming tập trung vào khả năng tái tạo âm thanh và giao tiếp trong game.",
        tonkho: 25,
        thongSo: "Loại: Tai nghe gaming | Kết nối: 3.5 mm | Micro: Có | Thiết kế: Over-ear"
    },
    {
        id: 8,
        ten: "Màn hình Asus TUF Gaming 24",
        loai: "Màn hình",
        gia: 4290000,
        anh: "../assets/images/AsuaTuf24.jpg",
        moTa: "Màn hình gaming 24 inch dành cho nhu cầu giải trí và chơi game.",
        tonkho: 25,
        thongSo: "Kích thước: 24 inch | Loại: Màn hình gaming | Kết nối: Tùy phiên bản | Độ phân giải: Tùy phiên bản"
    },
    {
        id: 9,
        ten: "Bàn phím cơ Keychron K8 Pro",
        loai: "Bàn phím cơ",
        gia: 2890000,
        anh: "../assets/images/K8Pro.jpg",
        moTa: "Bàn phím cơ layout tiện dụng, phù hợp cả công việc và giải trí.",
        tonkho: 25,
        thongSo: "Loại: Bàn phím cơ | Layout: TKL | Kết nối: USB-C | Tương thích: Windows và macOS"
    },
    {
        id: 10,
        ten: "Chuột Logitech G Pro Wireless",
        loai: "Chuột Gaming",
        gia: 2490000,
        anh: "../assets/images/chuot-game-khong-day-logitech-g304-trang-usb-7.jpg",
        moTa: "Chuột gaming không dây hướng đến hiệu năng ổn định và thao tác chính xác.",
        tonkho: 25,
        thongSo: "Loại: Chuột gaming không dây | Kết nối: Không dây | Cảm biến: Tùy phiên bản | Thiết kế: Nhẹ"
    },
    {
        id: 11,
        ten: "Bàn phím cơ Corsair K70 RGB",
        loai: "Bàn phím cơ",
        gia: 3990000,
        anh: "../assets/images/Akko3098B.jpg",
        moTa: "Bàn phím cơ gaming với thiết kế nổi bật và trải nghiệm gõ tốt.",
        tonkho: 25,
        thongSo: "Loại: Bàn phím cơ gaming | Đèn nền: RGB | Kết nối: USB | Switch: Tùy phiên bản"
    },
    {
        id: 12,
        ten: "Chuột SteelSeries Rival 5",
        loai: "Chuột Gaming",
        gia: 1590000,
        anh: "../assets/images/LogitechG502.jpg",
        moTa: "Chuột gaming đa năng dành cho nhiều thể loại game.",
        tonkho: 25,
        thongSo: "Loại: Chuột gaming | Kết nối: USB | Nút bấm: Nhiều nút chức năng | Thiết kế: Công thái học"
    },
    {
        id: 13,
        ten: "Tai nghe Logitech G733",
        loai: "Tai nghe",
        gia: 3190000,
        anh: "../assets/images/RazerBlackSharkV2.jpg",
        moTa: "Tai nghe gaming không dây, phù hợp chơi game và giải trí.",
        tonkho: 25,
        thongSo: "Loại: Tai nghe gaming không dây | Kết nối: Không dây | Micro: Có | Đèn nền: RGB"
    },
    {
        id: 14,
        ten: "Màn hình Samsung Odyssey G5 27",
        loai: "Màn hình",
        gia: 5990000,
        anh: "../assets/images/AsuaTuf24.jpg",
        moTa: "Màn hình 27 inch hướng đến trải nghiệm gaming và giải trí.",
        tonkho: 25,
        thongSo: "Kích thước: 27 inch | Dòng sản phẩm: Odyssey G5 | Mục đích: Gaming và giải trí | Tấm nền: Tùy phiên bản"
    },
    {
        id: 15,
        ten: "Bàn phím cơ Razer BlackWidow V3",
        loai: "Bàn phím cơ",
        gia: 3290000,
        anh: "../assets/images/K8Pro.jpg",
        moTa: "Bàn phím cơ gaming với thiết kế chắc chắn và phong cách hiện đại.",
        tonkho: 25,
        thongSo: "Loại: Bàn phím cơ gaming | Đèn nền: RGB | Kết nối: USB | Switch: Tùy phiên bản"
    },
    {
        id: 16,
        ten: "Chuột Razer Viper V2 Pro",
        loai: "Chuột Gaming",
        gia: 2990000,
        anh: "../assets/images/LogitechG502.jpg",
        moTa: "Chuột gaming nhẹ, phù hợp cho các thao tác nhanh và chính xác.",
        tonkho: 25,
        thongSo: "Loại: Chuột gaming không dây | Thiết kế: Nhẹ | Kết nối: Không dây | Cảm biến: Tùy phiên bản"
    },
    {
        id: 17,
        ten: "Tai nghe SteelSeries Arctis Nova 7",
        loai: "Tai nghe",
        gia: 3890000,
        anh: "../assets/images/HpHyperX3.jpg",
        moTa: "Tai nghe gaming hướng đến trải nghiệm âm thanh và sự thoải mái.",
        tonkho: 25,
        thongSo: "Loại: Tai nghe gaming không dây | Kết nối: Không dây | Micro: Có | Thiết kế: Over-ear"
    },
    {
        id: 18,
        ten: "Màn hình Gigabyte G27Q 27",
        loai: "Màn hình",
        gia: 6790000,
        anh: "../assets/images/AsuaTuf24.jpg",
        moTa: "Màn hình 27 inch phù hợp cho gaming, học tập và giải trí.",
        tonkho: 25,
        thongSo: "Kích thước: 27 inch | Độ phân giải: 2560 × 1440 | Mục đích: Gaming và giải trí"
    },
    {
        id: 19,
        ten: "Bàn phím cơ Ducky One 3",
        loai: "Bàn phím cơ",
        gia: 2590000,
        anh: "../assets/images/K8Pro.jpg",
        moTa: "Bàn phím cơ có thiết kế gọn gàng và trải nghiệm gõ ổn định.",
        tonkho: 25,
        thongSo: "Loại: Bàn phím cơ | Layout: Tùy phiên bản | Kết nối: USB | Switch: Tùy phiên bản"
    },
    {
        id: 20,
        ten: "Chuột Corsair Katar Pro",
        loai: "Chuột Gaming",
        gia: 890000,
        anh: "../assets/images/LogitechG502.jpg",
        moTa: "Chuột gaming nhỏ gọn, phù hợp sử dụng hằng ngày.",
        tonkho: 25,
        thongSo: "Loại: Chuột gaming | Kết nối: USB | Thiết kế: Nhỏ gọn | Mục đích: Gaming và sử dụng hằng ngày"
    }
];


const thamSo = new URLSearchParams(window.location.search);
const idSanPham = Number(thamSo.get("id"));

const sanPham = danhSachSanPham.find(function (item) {
    return item.id === idSanPham;
});

function taoPhanTu(tag, className, noiDung) {
    const phanTu = document.createElement(tag);

    if (className) {
        phanTu.className = className;
    }

    if (noiDung !== undefined) {
        phanTu.textContent = noiDung;
    }

    return phanTu;
}

function hienThiChiTiet() {
    const khung = document.getElementById("chiTietSanPham");

    if (!khung) {
        console.error('Không tìm thấy phần tử có id="chiTietSanPham".');
        return;
    }

    khung.replaceChildren();

    if (!sanPham) {
        const thongBao = taoPhanTu(
            "div",
            "san-pham-khong-ton-tai"
        );

        thongBao.append(
            taoPhanTu("h2", "", "Không tìm thấy sản phẩm"),
            taoPhanTu(
                "p",
                "",
                "Sản phẩm bạn đang tìm kiếm không tồn tại."
            )
        );

        const lienKet = taoPhanTu(
            "a",
            "",
            "Xem danh sách sản phẩm"
        );

        lienKet.href = "List.html";
        thongBao.appendChild(lienKet);
        khung.appendChild(thongBao);

        return;
    }

    const khungChiTiet = taoPhanTu("div", "khung-chi-tiet");
    const khungAnh = taoPhanTu("div", "anh-san-pham");
    const anh = document.createElement("img");

    anh.src = sanPham.anh;
    anh.alt = sanPham.ten;

    khungAnh.appendChild(anh);

    const thongTin = taoPhanTu("div", "thong-tin-san-pham");

    thongTin.append(
        taoPhanTu("p", "mo-ta-san-pham", sanPham.moTa),
        taoPhanTu(
            "p",
            "ton-kho",
            "Số lượng còn: " + (sanPham.tonKho ?? 10) + " sản phẩm"
        ),
        taoPhanTu(
            "p",
            "thong-so-san-pham",
            "Thông số kỹ thuật: " + (sanPham.thongSo || "Đang cập nhật")
        )
    );

    const duongKe = document.createElement("hr");
    thongTin.appendChild(duongKe);

    const khuVucSoLuong = taoPhanTu("div", "so-luong");
    const nhanSoLuong = taoPhanTu("label", "", "Số lượng");
    nhanSoLuong.htmlFor = "soLuong";

    const boSoLuong = taoPhanTu("div", "bo-so-luong");

    const nutGiam = taoPhanTu("button", "", "−");
    nutGiam.type = "button";
    nutGiam.id = "giam";
    nutGiam.setAttribute("aria-label", "Giảm số lượng");

    const inputSoLuong = document.createElement("input");
    inputSoLuong.type = "number";
    inputSoLuong.id = "soLuong";
    inputSoLuong.value = "1";
    inputSoLuong.min = "1";
    inputSoLuong.max = "99";

    const nutTang = taoPhanTu("button", "", "+");
    nutTang.type = "button";
    nutTang.id = "tang";
    nutTang.setAttribute("aria-label", "Tăng số lượng");

    boSoLuong.append(nutGiam, inputSoLuong, nutTang);
    khuVucSoLuong.append(nhanSoLuong, boSoLuong);
    thongTin.appendChild(khuVucSoLuong);

    const nutThemGioHang = taoPhanTu(
        "button",
        "nut-gio-hang",
        "Thêm vào giỏ hàng"
    );

    nutThemGioHang.type = "button";
    nutThemGioHang.id = "themGioHang";

    const thongBao = taoPhanTu("p", "thong-bao", "");
    thongBao.id = "thongBao";
    thongBao.setAttribute("role", "status");

    thongTin.append(nutThemGioHang, thongBao);
    khungChiTiet.append(khungAnh, thongTin);
    khung.appendChild(khungChiTiet);

    nutGiam.addEventListener("click", function () {
        const soLuongHienTai = Number(inputSoLuong.value) || 1;
        inputSoLuong.value = Math.max(1, soLuongHienTai - 1);
    });

    nutTang.addEventListener("click", function () {
        const soLuongHienTai = Number(inputSoLuong.value) || 1;
        inputSoLuong.value = Math.min(99, soLuongHienTai + 1);
    });

    inputSoLuong.addEventListener("change", function () {
        const soLuong = Number(inputSoLuong.value) || 1;

        inputSoLuong.value = Math.min(
            99,
            Math.max(1, Math.floor(soLuong))
        );
    });

    let tongSoLuongGioHang = 0;

    nutThemGioHang.addEventListener("click", function () {
        const soLuong = Math.min(
            99,
            Math.max(1, Math.floor(Number(inputSoLuong.value) || 1))
        );

        tongSoLuongGioHang += soLuong;

        const soLuongGioHang = document.getElementById("soLuongGioHang");

        if (soLuongGioHang) {
            soLuongGioHang.textContent = tongSoLuongGioHang;
        }

        thongBao.textContent = "Đã thêm sản phẩm vào giỏ hàng.";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    hienThiChiTiet();

    const soLuongGioHang = document.getElementById("soLuongGioHang");

    if (soLuongGioHang) {
        soLuongGioHang.textContent = "0";
    }
});
