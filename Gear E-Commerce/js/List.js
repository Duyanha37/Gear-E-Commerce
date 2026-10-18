// danh sách sản phẩm
const danhSachSanPham = [
    { productID: "1", Name: "Bàn phím cơ Logitech G Pro X", Description: "Bàn phím cơ gaming thiết kế gọn gàng", Price: 2990000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/logitechGPro.jpg" },
    { productID: "2", Name: "Chuột Razer DeathAdder V3 Pro", Description: "Chuột gaming không dây thiết kế công thái học", Price: 3690000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/deathAdderV3pro.jpg" },
    { productID: "3", Name: "Tai nghe HyperX Cloud III", Description: "Tai nghe gaming cho chơi game và giải trí", Price: 2290000, Stock: 25, Category: "Tai nghe", Image: "../assets/images/HpHyperX3.jpg" },
    { productID: "4", Name: "Màn hình LG UltraGear 27 2K", Description: "Màn hình gaming 27 inch độ phân giải 2K", Price: 7490000, Stock: 25, Category: "Màn hình", Image: "../assets/images/LgutraGear.jpg" },
    { productID: "5", Name: "Bàn phím cơ Akko 3098B", Description: "Bàn phím cơ phù hợp cho học tập và gaming", Price: 1990000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/Akko3098B.jpg" },
    { productID: "6", Name: "Chuột Logitech G502 Hero", Description: "Chuột gaming có thiết kế chắc chắn", Price: 1190000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/LogitechG502.jpg" },
    { productID: "7", Name: "Tai nghe Razer BlackShark V2", Description: "Tai nghe gaming cho âm thanh và giao tiếp", Price: 2590000, Stock: 25, Category: "Tai nghe", Image: "../assets/images/RazerBlackSharkV2.jpg" },
    { productID: "8", Name: "Màn hình Asus TUF Gaming 24", Description: "Màn hình gaming 24 inch", Price: 4290000, Stock: 25, Category: "Màn hình", Image: "../assets/images/AsuaTuf24.jpg" },
    { productID: "9", Name: "Bàn phím cơ Keychron K8 Pro", Description: "Bàn phím cơ phù hợp cho công việc và giải trí", Price: 2890000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/K8Pro.jpg" },
    { productID: "10", Name: "Chuột Logitech G Pro Wireless", Description: "Chuột gaming không dây thao tác chính xác", Price: 2490000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/" },
    { productID: "11", Name: "Bàn phím cơ Corsair K70 RGB", Description: "Bàn phím cơ gaming có đèn nền RGB", Price: 3990000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/" },
    { productID: "12", Name: "Chuột SteelSeries Rival 5", Description: "Chuột gaming đa năng", Price: 1590000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/" },
    { productID: "13", Name: "Tai nghe Logitech G733", Description: "Tai nghe gaming không dây", Price: 3190000, Stock: 25, Category: "Tai nghe", Image: "../assets/images/" },
    { productID: "14", Name: "Màn hình Samsung Odyssey G5 27", Description: "Màn hình gaming 27 inch", Price: 5990000, Stock: 25, Category: "Màn hình", Image: "../assets/images/" },
    { productID: "15", Name: "Bàn phím cơ Razer BlackWidow V3", Description: "Bàn phím cơ gaming thiết kế chắc chắn", Price: 3290000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/" },
    { productID: "16", Name: "Chuột Razer Viper V2 Pro", Description: "Chuột gaming nhẹ cho thao tác nhanh", Price: 2990000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/" },
    { productID: "17", Name: "Tai nghe SteelSeries Arctis Nova 7", Description: "Tai nghe gaming thoải mái khi sử dụng", Price: 3890000, Stock: 25, Category: "Tai nghe", Image: "../assets/images/" },
    { productID: "18", Name: "Màn hình Gigabyte G27Q 27", Description: "Màn hình 27 inch cho gaming và giải trí", Price: 6790000, Stock: 25, Category: "Màn hình", Image: "../assets/images/" },
    { productID: "19", Name: "Bàn phím cơ Ducky One 3", Description: "Bàn phím cơ gọn gàng và ổn định", Price: 2590000, Stock: 25, Category: "Bàn phím cơ", Image: "../assets/images/" },
    { productID: "20", Name: "Chuột Corsair Katar Pro", Description: "Chuột gaming nhỏ gọn", Price: 890000, Stock: 25, Category: "Chuột Gaming", Image: "../assets/images/" }
];
// sắp xếp và phân trang
const thamSoLienKet = new URLSearchParams(window.location.search);
const danhMucDaLuu = sessionStorage.getItem("danhMucList");
const trangDaLuu = sessionStorage.getItem("trangList");
const trangThai = {
    danhMuc: thamSoLienKet.get("category") || danhMucDaLuu || "Tất cả sản phẩm",
    idSanPham: thamSoLienKet.get("id") || "0",
    tuKhoa: thamSoLienKet.get("search") || "",
    cachSapXep: "moi-nhat",
    trangHienTai: Number(thamSoLienKet.get("page") || trangDaLuu) || 1,
    soSanPhamMoiTrang: 10
};
// lưu danh mục và số trang 
function capNhatLienKet() {
    thamSoLienKet.set("category", trangThai.danhMuc);
    thamSoLienKet.set("page", trangThai.trangHienTai);
    sessionStorage.setItem("danhMucList", trangThai.danhMuc);
    sessionStorage.setItem("trangList", trangThai.trangHienTai);
    thamSoLienKet.delete("search");
    if (trangThai.idSanPham === "0") {
        thamSoLienKet.delete("id");
    } else {
        thamSoLienKet.set("id", trangThai.idSanPham);
    }
    window.history.replaceState(null, "", window.location.pathname + "?" + thamSoLienKet.toString());
}

document.addEventListener("DOMContentLoaded", function () {
    ganSuKienDanhMuc();
    ganSuKienTimKiem();
    ganSuKienSapXep();
    hienThiSanPham();
});

// lọc sắp xếp và hiển thị 
function hienThiSanPham() {
    const tuKhoa = trangThai.tuKhoa;
    const danhSachLoc = [];
    danhSachSanPham.forEach(function (sanPham) {
        const dungDanhMuc = trangThai.danhMuc === "Tất cả sản phẩm" || sanPham.Category === trangThai.danhMuc;
        const tenSanPham = sanPham.Name.toLowerCase();
        const tenDanhMuc = sanPham.Category.toLowerCase();
        const moTaSanPham = sanPham.Description.toLowerCase();
        const dungTimKiem = tenSanPham.includes(tuKhoa) || moTaSanPham.includes(tuKhoa) || tenDanhMuc.includes(tuKhoa);
        const dungSanPham = trangThai.idSanPham === "0" || sanPham.productID === trangThai.idSanPham;
        if (dungDanhMuc && dungTimKiem && dungSanPham) {
            danhSachLoc.push(sanPham);
        }
    });
    if (trangThai.cachSapXep === "gia-thap") {
        danhSachLoc.sort(function (sanPhamA, sanPhamB) {
            return sanPhamA.Price - sanPhamB.Price;
        });
    }
    if (trangThai.cachSapXep === "gia-cao") {
        danhSachLoc.sort(function (sanPhamA, sanPhamB) {
            return sanPhamB.Price - sanPhamA.Price;
        });
    }
    const soTrangTam = {
        tongSoTrang: 0
    };
    danhSachLoc.forEach(function (sanPham, viTri) {
        if (viTri % trangThai.soSanPhamMoiTrang === 0) {
            soTrangTam.tongSoTrang = soTrangTam.tongSoTrang + 1;
        }
    });
    const tongSoTrang = soTrangTam.tongSoTrang;
    if (trangThai.trangHienTai > tongSoTrang) {
        trangThai.trangHienTai = 1;
    }
    capNhatLienKet();
    const viTriBatDau = (trangThai.trangHienTai - 1) * trangThai.soSanPhamMoiTrang;
    const danhSachTrang = danhSachLoc.slice(viTriBatDau, viTriBatDau + trangThai.soSanPhamMoiTrang);
    const khungDanhSach = document.getElementById("danhSachSanPham");
    khungDanhSach.innerHTML = "";
    danhSachTrang.forEach(function (sanPham) {
        const the = document.createElement("article");
        the.className = "the-san-pham";
        the.innerHTML =
            '<div class="khung-anh"><img src="' + sanPham.Image + '" alt="' + sanPham.Name + '"></div>' +
            '<p class="loai-san-pham">' + sanPham.Category + '</p>' +
            '<h3>' + sanPham.Name + '</h3>' +
            '<p class="gia-san-pham">' + sanPham.Price.toLocaleString("vi-VN") + '₫</p>';
        const anhSanPham = the.querySelector("img");
        anhSanPham.style.cursor = "pointer";
        anhSanPham.addEventListener("click", function () {
            window.location.href = "ChiTietSanPham.html?id=" + sanPham.productID;
        });
        khungDanhSach.appendChild(the);
    });
    document.getElementById("soLuongSanPham").textContent = danhSachTrang.length + " sản phẩm";
    hienThiNutPhanTrang(tongSoTrang);
}
// chuyển trang
function hienThiNutPhanTrang(tongSoTrang) {
    const khung = document.getElementById("phanTrang");
    khung.innerHTML = "";
    Array.from({ length: tongSoTrang }, function (giaTri, viTri) {
        return viTri + 1;
    }).forEach(function (soTrang) {
        const nut = document.createElement("button");
        nut.type = "button";
        nut.textContent = soTrang;
        if (soTrang === trangThai.trangHienTai) {
            nut.classList.add("active");
        }
        nut.addEventListener("click", function () {
            trangThai.trangHienTai = soTrang;
            hienThiSanPham();
        });
        khung.appendChild(nut);
    });
}
// chọn danh mục
function ganSuKienDanhMuc() {
    const cacMuc = document.querySelectorAll(".muc-danh-muc");
    cacMuc.forEach(function (muc) {
        if (muc.dataset.category === trangThai.danhMuc) {
            muc.classList.add("active");
        } else {
            muc.classList.remove("active");
        }
        muc.addEventListener("click", function (event) {
            event.preventDefault();
            cacMuc.forEach(function (mucDanhMuc) {
                mucDanhMuc.classList.remove("active");
            });
            muc.classList.add("active");
            trangThai.danhMuc = muc.dataset.category;
            trangThai.idSanPham = "0";
            trangThai.trangHienTai = 1;
            hienThiSanPham();
        });
    });
}
// tìm kiếm
function ganSuKienTimKiem() {
    const formTimKiem = document.getElementById("formTimKiem");
    const oTimKiem = document.getElementById("timKiem");
    oTimKiem.value = trangThai.tuKhoa;
    formTimKiem.addEventListener("submit", function (event) {
        event.preventDefault();
        trangThai.tuKhoa = oTimKiem.value.toLowerCase().trim();
        const cacDanhMucTimThay = [];
        danhSachSanPham.forEach(function (sanPham) {
            const thongTinSanPham = (sanPham.Name + " " + sanPham.Description + " " + sanPham.Category).toLowerCase();
            if (thongTinSanPham.includes(trangThai.tuKhoa) && !cacDanhMucTimThay.includes(sanPham.Category)) {
                cacDanhMucTimThay.push(sanPham.Category);
            }
        });
        if (cacDanhMucTimThay.length === 1) {
            trangThai.danhMuc = cacDanhMucTimThay[0];
        } else {
            trangThai.danhMuc = "Tất cả sản phẩm";
        }
        trangThai.idSanPham = "0";
        const cacMucDanhMuc = document.querySelectorAll(".muc-danh-muc");
        cacMucDanhMuc.forEach(function (mucDanhMuc) {
            if (mucDanhMuc.dataset.category === trangThai.danhMuc) {
                mucDanhMuc.classList.add("active");
            } else {
                mucDanhMuc.classList.remove("active");
            }
        });
        trangThai.trangHienTai = 1;
        hienThiSanPham();
    });
}
// sắp xếp sản phẩm
function ganSuKienSapXep() {
    document.getElementById("sapXep").addEventListener("change", function (event) {
        trangThai.cachSapXep = event.target.value;
        trangThai.trangHienTai = 1;
        hienThiSanPham();
    });
}

