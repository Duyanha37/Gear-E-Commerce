let loaiDangChon = "Tất cả sản phẩm";
let cachSapXep = "moi-nhat";
let trangHienTai = 1;
let soSanPhamMoiTrang = 10;
let danhSachSanPham = [];
let thuTuBanDau = [];
document.addEventListener("DOMContentLoaded", function () {
    danhSachSanPham = Array.from(document.querySelectorAll(".right .list .item"));
    danhSachSanPham.forEach(function (item, index) {
        item.dataset.thuTu = index;
    });
    thuTuBanDau = [...danhSachSanPham];
    xuLyDanhMuc();
    xuLySapXep();
    xuLyTimKiem();
    capNhatDanhSach();
});
function capNhatDanhSach() {
    let tuKhoa = document.getElementById("timKiem").value.toLowerCase().trim();
    let sanPhamPhuHop = [];
    danhSachSanPham.forEach(function (item) {
        let loai = item.dataset.category;
        let ten = item.querySelector("h3").textContent.toLowerCase();
        let dungDanhMuc = loaiDangChon === "Tất cả sản phẩm" || loai === loaiDangChon;
        let dungTimKiem = ten.includes(tuKhoa);
        if (dungDanhMuc && dungTimKiem) {
            sanPhamPhuHop.push(item);
        }
        item.style.display = "none";
    });
    sapXepSanPham(sanPhamPhuHop);
    hienThiPhanTrang(sanPhamPhuHop);
    capNhatSoLuong(sanPhamPhuHop.length);
}
function sapXepSanPham(danhSach) {
    let mang = [...danhSach];
    if (cachSapXep === "moi-nhat") {
        for (let i = 0; i < mang.length - 1; i++) {
            for (let j = 0; j < mang.length - 1 - i; j++) {
                let thuTu1 = parseInt(mang[j].dataset.thuTu);
                let thuTu2 = parseInt(mang[j + 1].dataset.thuTu);
                if (thuTu1 > thuTu2) {
                    let tam = mang[j];
                    mang[j] = mang[j + 1];
                    mang[j + 1] = tam;
                }
            }
        }
    }
    if (cachSapXep === "gia-thap") {
        for (let i = 0; i < mang.length - 1; i++) {
            for (let j = 0; j < mang.length - 1 - i; j++) {
                let gia1 = parseInt(mang[j].dataset.price);
                let gia2 = parseInt(mang[j + 1].dataset.price);
                if (gia1 > gia2) {
                    let tam = mang[j];
                    mang[j] = mang[j + 1];
                    mang[j + 1] = tam;
                }
            }
        }
    }
    if (cachSapXep === "gia-cao") {
        for (let i = 0; i < mang.length - 1; i++) {
            for (let j = 0; j < mang.length - 1 - i; j++) {
                let gia1 = parseInt(mang[j].dataset.price);
                let gia2 = parseInt(mang[j + 1].dataset.price);
                if (gia1 < gia2) {
                    let tam = mang[j];
                    mang[j] = mang[j + 1];
                    mang[j + 1] = tam;
                }
            }
        }
    }
    let danhSachHTML = document.querySelector(".list");
    mang.forEach(function (item) {
        danhSachHTML.appendChild(item);
    });
}
function hienThiPhanTrang(danhSach) {
    let khungPhanTrang = document.getElementById("phanTrang");
    khungPhanTrang.innerHTML = "";
    let tongSoTrang = Math.ceil(danhSach.length / soSanPhamMoiTrang);
    if (tongSoTrang === 0) {
        return;
    }
    if (trangHienTai > tongSoTrang) {
        trangHienTai = 1;
    }
    let viTriBatDau = (trangHienTai - 1) * soSanPhamMoiTrang;
    let viTriKetThuc = viTriBatDau + soSanPhamMoiTrang;
    for (let i = 0; i < danhSach.length; i++) {
        danhSach[i].style.display = "none";
    }
    for (let i = viTriBatDau; i < viTriKetThuc && i < danhSach.length; i++) {
        danhSach[i].style.display = "";
    }
    for (let i = 1; i <= tongSoTrang; i++) {
        let nut = document.createElement("a");
        nut.href = "#";
        nut.textContent = i;
        if (i === trangHienTai) {
            nut.classList.add("active");
        }
        nut.addEventListener("click", function (event) {
            event.preventDefault();
            trangHienTai = i;
            hienThiPhanTrang(danhSach);
        });
        khungPhanTrang.appendChild(nut);
    }
}
function capNhatSoLuong(soLuong) {
    let phanSoLuong = document.getElementById("soLuongSanPham");
    phanSoLuong.textContent = soLuong + " sản phẩm";
}
function xuLyDanhMuc() {
    let danhMuc = document.querySelectorAll(".category-item");
    danhMuc.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            danhMuc.forEach(function (muc) {
                muc.classList.remove("active");
            });
            item.classList.add("active");
            loaiDangChon = item.dataset.category;
            trangHienTai = 1;
            capNhatDanhSach();
        });
    });
}
function xuLySapXep() {
    let selectSapXep = document.getElementById("sapXep");
    selectSapXep.addEventListener("change", function () {
        cachSapXep = selectSapXep.value;
        trangHienTai = 1;
        capNhatDanhSach();
    });
}
function xuLyTimKiem() {
    let oTimKiem = document.getElementById("timKiem");
    oTimKiem.addEventListener("input", function () {
        trangHienTai = 1;
        capNhatDanhSach();
    });
}
