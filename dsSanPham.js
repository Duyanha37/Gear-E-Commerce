// ds sản phẩm
const danhSachSanPham = [
    {
        ten: "Bàn phím cơ Logitech G Pro X",
        loai: "Bàn phím cơ",
        gia: 2990000,
        anh: "https://tse1.mm.bing.net/th/id/OIP.j37lGvV1A77_wLDU4Zq8dwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: "Chuột Razer DeathAdder V3 Pro",
        loai: "Chuột Gaming",
        gia: 3690000,
        anh: "https://tse4.mm.bing.net/th/id/OIP.rblQcogMbdpltLRmbNkzowHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: "Tai nghe HyperX Cloud III",
        loai: "Tai nghe",
        gia: 2290000,
        anh: "https://tse3.mm.bing.net/th/id/OIP.fBpgG3Jiyxaa4s2pBDbwrQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: 'Màn hình LG UltraGear 27" 2K',
        loai: "Màn hình",
        gia: 7490000,
        anh: "https://bizweb.dktcdn.net/100/329/122/products/man-hinh-2k-lg-ultragear-27-inch-oled-240hz-27gr95qe-b-atv.jpg?v=1683537896743"
    },
    {
        ten: "Bàn phím cơ Akko 3098B",
        loai: "Bàn phím cơ",
        gia: 1990000,
        anh: "https://tse1.mm.bing.net/th/id/OIP.j37lGvV1A77_wLDU4Zq8dwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: "Chuột Logitech G502 Hero",
        loai: "Chuột Gaming",
        gia: 1190000,
        anh: "https://tse4.mm.bing.net/th/id/OIP.rblQcogMbdpltLRmbNkzowHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: "Tai nghe Razer BlackShark V2",
        loai: "Tai nghe",
        gia: 2590000,
        anh: "https://tse3.mm.bing.net/th/id/OIP.fBpgG3Jiyxaa4s2pBDbwrQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: 'Màn hình Asus TUF Gaming 24"',
        loai: "Màn hình",
        gia: 4290000,
        anh: "https://bizweb.dktcdn.net/100/329/122/products/man-hinh-2k-lg-ultragear-27-inch-oled-240hz-27gr95qe-b-atv.jpg?v=1683537896743"
    },
    {
        ten: "Bàn phím cơ Keychron K8 Pro",
        loai: "Bàn phím cơ",
        gia: 2890000,
        anh: "https://tse1.mm.bing.net/th/id/OIP.j37lGvV1A77_wLDU4Zq8dwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: "Chuột Logitech G Pro Wireless",
        loai: "Chuột Gaming",
        gia: 2490000,
        anh: "https://tse4.mm.bing.net/th/id/OIP.rblQcogMbdpltLRmbNkzowHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: "Bàn phím cơ Corsair K70 RGB",
        loai: "Bàn phím cơ",
        gia: 3990000,
        anh: "https://tse1.mm.bing.net/th/id/OIP.j37lGvV1A77_wLDU4Zq8dwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: "Chuột SteelSeries Rival 5",
        loai: "Chuột Gaming",
        gia: 1590000,
        anh: "https://tse4.mm.bing.net/th/id/OIP.rblQcogMbdpltLRmbNkzowHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: "Tai nghe Logitech G733",
        loai: "Tai nghe",
        gia: 3190000,
        anh: "https://tse3.mm.bing.net/th/id/OIP.fBpgG3Jiyxaa4s2pBDbwrQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: 'Màn hình Samsung Odyssey G5 27"',
        loai: "Màn hình",
        gia: 5990000,
        anh: "https://bizweb.dktcdn.net/100/329/122/products/man-hinh-2k-lg-ultragear-27-inch-oled-240hz-27gr95qe-b-atv.jpg?v=1683537896743"
    },
    {
        ten: "Bàn phím cơ Razer BlackWidow V3",
        loai: "Bàn phím cơ",
        gia: 3290000,
        anh: "https://tse1.mm.bing.net/th/id/OIP.j37lGvV1A77_wLDU4Zq8dwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: "Chuột Razer Viper V2 Pro",
        loai: "Chuột Gaming",
        gia: 2990000,
        anh: "https://tse4.mm.bing.net/th/id/OIP.rblQcogMbdpltLRmbNkzowHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: "Tai nghe SteelSeries Arctis Nova 7",
        loai: "Tai nghe",
        gia: 3890000,
        anh: "https://tse3.mm.bing.net/th/id/OIP.fBpgG3Jiyxaa4s2pBDbwrQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: 'Màn hình Gigabyte G27Q 27"',
        loai: "Màn hình",
        gia: 6790000,
        anh: "https://bizweb.dktcdn.net/100/329/122/products/man-hinh-2k-lg-ultragear-27-inch-oled-240hz-27gr95qe-b-atv.jpg?v=1683537896743"
    },
    {
        ten: "Bàn phím cơ Ducky One 3",
        loai: "Bàn phím cơ",
        gia: 2590000,
        anh: "https://tse1.mm.bing.net/th/id/OIP.j37lGvV1A77_wLDU4Zq8dwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        ten: "Chuột Corsair Katar Pro",
        loai: "Chuột Gaming",
        gia: 890000,
        anh: "https://tse4.mm.bing.net/th/id/OIP.rblQcogMbdpltLRmbNkzowHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    }
];

//  tham số URL
const thamSoURL = new URLSearchParams(window.location.search);
let loaiDangChon = thamSoURL.get("category") || "Tất cả sản phẩm";
let cachSapXep = thamSoURL.get("sort") || "moi-nhat";
let trangHienTai = parseInt(thamSoURL.get("page"), 10) || 1;
const soSanPhamMoiTrang = 10;

//định dạng giá
function dinhDangGia(gia) {
    return gia.toLocaleString("vi-VN") + "₫";
}

//lấy ds sản phẩm
function layDanhSachSanPham() {
    let sanPham = [...danhSachSanPham];
    if (loaiDangChon !== "Tất cả sản phẩm") {
        sanPham = sanPham.filter(function (item) {
            return item.loai === loaiDangChon;
        });
    }
    if (cachSapXep === "gia-thap") {
        sanPham.sort(function (a, b) {
            return a.gia - b.gia;
        });
    }
    if (cachSapXep === "gia-cao") {
        sanPham.sort(function (a, b) {
            return b.gia - a.gia;
        });
    }
    return sanPham;
}

// hiển thị sản phẩm
function hienThiSanPham() {
    const danhSach = document.querySelector(".right .list");
    const soLuong = document.querySelector(".top > p");
    const selectSapXep = document.querySelector(".sort select");
    if (!danhSach) {
        return;
    }
    const sanPham = layDanhSachSanPham();
    const tongSoTrang = Math.ceil(sanPham.length / soSanPhamMoiTrang);
    if (tongSoTrang > 0 && trangHienTai > tongSoTrang) {
        trangHienTai = tongSoTrang;
    }
    if (trangHienTai < 1) {
        trangHienTai = 1;
    }
    const batDau = (trangHienTai - 1) * soSanPhamMoiTrang;
    const sanPhamHienThi = sanPham.slice(batDau, batDau + soSanPhamMoiTrang);
    danhSach.innerHTML = "";
    sanPhamHienThi.forEach(function (item) {
        const sanPhamHTML = document.createElement("div");
        sanPhamHTML.className = "item";
        sanPhamHTML.innerHTML = `
            <div class="picture">
                <img src="${item.anh}" alt="${item.ten}">
            </div>
            <p class="type">${item.loai}</p>
            <h3>${item.ten}</h3>
            <p class="price">${dinhDangGia(item.gia)}</p>
            <a href="#">Mua ngay</a>
        `;
        danhSach.appendChild(sanPhamHTML);
    });
    if (sanPham.length === 0) {
        danhSach.innerHTML = "<p>Không có sản phẩm trong danh mục này.</p>";
    }
    if (soLuong) {
        soLuong.textContent = sanPham.length + " sản phẩm";
    }
    if (selectSapXep) {
        selectSapXep.value = cachSapXep;
    }
    capNhatDanhMuc();
    capNhatPhanTrang(tongSoTrang);
}

//cập nhật danh mục
function capNhatDanhMuc() {
    const danhMuc = document.querySelectorAll(".category-item");
    danhMuc.forEach(function (item) {
        item.classList.remove("active");
        if (item.dataset.category === loaiDangChon) {
            item.classList.add("active");
        }
    });
}

//  tạo URL
function taoURL(trang) {
    const url = new URL(window.location.href);
    if (loaiDangChon === "Tất cả sản phẩm") {
        url.searchParams.delete("category");
    } else {
        url.searchParams.set("category", loaiDangChon);
    }
    if (cachSapXep === "moi-nhat") {
        url.searchParams.delete("sort");
    } else {
        url.searchParams.set("sort", cachSapXep);
    }
    if (trang === 1) {
        url.searchParams.delete("page");
    } else {
        url.searchParams.set("page", trang);
    }
    url.hash = "";
    return url.toString();
}

// phân trang
function capNhatPhanTrang(tongSoTrang) {
    const khuVucPhanTrang = document.querySelector(".page");
    if (!khuVucPhanTrang) {
        return;
    }
    khuVucPhanTrang.innerHTML = "";
    if (tongSoTrang <= 1) {
        return;
    }
    if (trangHienTai > 1) {
        const nutTruoc = document.createElement("a");
        nutTruoc.href = taoURL(trangHienTai - 1);
        nutTruoc.textContent = "‹";
        khuVucPhanTrang.appendChild(nutTruoc);
    }
    for (let i = 1; i <= tongSoTrang; i++) {
        const link = document.createElement("a");
        link.href = taoURL(i);
        link.textContent = i;
        if (i === trangHienTai) {
            link.classList.add("active");
        }
        khuVucPhanTrang.appendChild(link);
    }
    if (trangHienTai < tongSoTrang) {
        const nutSau = document.createElement("a");
        nutSau.href = taoURL(trangHienTai + 1);
        nutSau.textContent = "›";
        khuVucPhanTrang.appendChild(nutSau);
    }
}

// chọn danh mục 
function xuLyChonDanhMuc() {
    const danhMuc = document.querySelectorAll(".category-item");
    danhMuc.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            loaiDangChon = item.dataset.category;
            trangHienTai = 1;
            window.location.href = taoURL(1);
        });
    });
}

//sắp xếp
function xuLySapXep() {
    const selectSapXep = document.querySelector(".sort select");
    if (!selectSapXep) {
        return;
    }
    selectSapXep.addEventListener("change", function () {
        cachSapXep = this.value;
        trangHienTai = 1;
        window.location.href = taoURL(1);
    });
}

//khởi chạy
document.addEventListener("DOMContentLoaded", function () {
    xuLyChonDanhMuc();
    xuLySapXep();
    hienThiSanPham();
});