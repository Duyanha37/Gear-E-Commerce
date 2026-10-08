// danh sách sản phẩm
const danhSachSanPham = [
    { id: 1, ten: "Bàn phím cơ Logitech G Pro X", loai: "Bàn phím cơ", gia: 2990000, anh: "images/logitechGPro.jpg" },
    { id: 2, ten: "Chuột Razer DeathAdder V3 Pro", loai: "Chuột Gaming", gia: 3690000, anh: "images/deathAdderV3pro.jpg" },
    { id: 3, ten: "Tai nghe HyperX Cloud III", loai: "Tai nghe", gia: 2290000, anh: "images/HpHyperX3.jpg" },
    { id: 4, ten: "Màn hình LG UltraGear 27 2K", loai: "Màn hình", gia: 7490000, anh: "images/LgutraGear.jpg" },
    { id: 5, ten: "Bàn phím cơ Akko 3098B", loai: "Bàn phím cơ", gia: 1990000, anh: "images/Akko3098B.jpg" },
    { id: 6, ten: "Chuột Logitech G502 Hero", loai: "Chuột Gaming", gia: 1190000, anh: "images/LogitechG502.jpg" },
    { id: 7, ten: "Tai nghe Razer BlackShark V2", loai: "Tai nghe", gia: 2590000, anh: "images/RazerBlackSharkV2.jpg" },
    { id: 8, ten: "Màn hình Asus TUF Gaming 24", loai: "Màn hình", gia: 4290000, anh: "images/" },
    { id: 9, ten: "Bàn phím cơ Keychron K8 Pro", loai: "Bàn phím cơ", gia: 2890000, anh: "images/" },
    { id: 10, ten: "Chuột Logitech G Pro Wireless", loai: "Chuột Gaming", gia: 2490000, anh: "images/" },
    { id: 11, ten: "Bàn phím cơ Corsair K70 RGB", loai: "Bàn phím cơ", gia: 3990000, anh: "images/" },
    { id: 12, ten: "Chuột SteelSeries Rival 5", loai: "Chuột Gaming", gia: 1590000, anh: "images/" },
    { id: 13, ten: "Tai nghe Logitech G733", loai: "Tai nghe", gia: 3190000, anh: "images/" },
    { id: 14, ten: "Màn hình Samsung Odyssey G5 27", loai: "Màn hình", gia: 5990000, anh: "images/" },
    { id: 15, ten: "Bàn phím cơ Razer BlackWidow V3", loai: "Bàn phím cơ", gia: 3290000, anh: "images/" },
    { id: 16, ten: "Chuột Razer Viper V2 Pro", loai: "Chuột Gaming", gia: 2990000, anh: "images/" },
    { id: 17, ten: "Tai nghe SteelSeries Arctis Nova 7", loai: "Tai nghe", gia: 3890000, anh: "images/" },
    { id: 18, ten: "Màn hình Gigabyte G27Q 27", loai: "Màn hình", gia: 6790000, anh: "images/" },
    { id: 19, ten: "Bàn phím cơ Ducky One 3", loai: "Bàn phím cơ", gia: 2590000, anh: "images/" },
    { id: 20, ten: "Chuột Corsair Katar Pro", loai: "Chuột Gaming", gia: 890000, anh: "images/" }
];
// trạng thái danh mục sắp xếp và phân trang
const thamSoLienKet = new URLSearchParams(window.location.search);
const trangThai = {
    danhMuc: thamSoLienKet.get("category") || "Tất cả sản phẩm",
    idSanPham: Number(thamSoLienKet.get("id")) || 0,
    cachSapXep: "moi-nhat",
    trangHienTai: 1,
    soSanPhamMoiTrang: 10
};
// khởi động 
document.addEventListener("DOMContentLoaded", function () {
    ganSuKienDanhMuc();
    ganSuKienTimKiem();
    ganSuKienSapXep();
    hienThiSanPham();
});
// lọc sắp xếp và hiển thị danh sách sản phẩm
function hienThiSanPham() {
    const tuKhoa = document.getElementById("timKiem").value.toLowerCase().trim();
    const danhSachLoc = [];
    danhSachSanPham.forEach(function (sanPham) {
        const dungDanhMuc = trangThai.danhMuc === "Tất cả sản phẩm" || sanPham.loai === trangThai.danhMuc;
        const dungTimKiem = sanPham.ten.toLowerCase().includes(tuKhoa);
        const dungSanPham = trangThai.idSanPham === 0 || sanPham.id === trangThai.idSanPham;
        if (dungDanhMuc && dungTimKiem && dungSanPham) {
            danhSachLoc.push(sanPham);
        }
    });
    if (trangThai.cachSapXep === "gia-thap") {
        danhSachLoc.sort(function (sanPhamA, sanPhamB) {
            return sanPhamA.gia - sanPhamB.gia;
        });
    }
    if (trangThai.cachSapXep === "gia-cao") {
        danhSachLoc.sort(function (sanPhamA, sanPhamB) {
            return sanPhamB.gia - sanPhamA.gia;
        });
    }
    const tongSoTrang = Math.ceil(danhSachLoc.length / trangThai.soSanPhamMoiTrang);
    if (trangThai.trangHienTai > tongSoTrang) {
        trangThai.trangHienTai = 1;
    }
    const viTriBatDau = (trangThai.trangHienTai - 1) * trangThai.soSanPhamMoiTrang;
    const danhSachTrang = danhSachLoc.slice(viTriBatDau, viTriBatDau + trangThai.soSanPhamMoiTrang);
    const khungDanhSach = document.getElementById("danhSachSanPham");
    khungDanhSach.innerHTML = "";
    danhSachTrang.forEach(function (sanPham) {
        const the = document.createElement("article");
        the.className = "the-san-pham";
        the.innerHTML =
            '<div class="khung-anh"><img src="' + sanPham.anh + '" alt="' + sanPham.ten + '"></div>' +
            '<p class="loai-san-pham">' + sanPham.loai + '</p>' +
            '<h3>' + sanPham.ten + '</h3>' +
            '<p class="gia-san-pham">' + sanPham.gia.toLocaleString("vi-VN") + '₫</p>';
        khungDanhSach.appendChild(the);
    });
    document.getElementById("soLuongSanPham").textContent = danhSachTrang.length + " sản phẩm";
    hienThiNutPhanTrang(tongSoTrang);
}
// nút chuyển trang
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
// xử lý khi khách chọn danh mục
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
            trangThai.idSanPham = 0;
            trangThai.trangHienTai = 1;
            hienThiSanPham();
        });
    });
}
// xử lý tìm kiếm
function ganSuKienTimKiem() {
    document.getElementById("timKiem").addEventListener("input", function () {
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
