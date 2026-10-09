function layGioHang() {
    try {
        return JSON.parse(localStorage.getItem("gearHouseCart")) || [];
    }
    catch (e) { return []; }
}

function luuGioHang(gioHang) { localStorage.setItem("gearHouseCart", JSON.stringify(gioHang)); }
function hienThiGioHang() {
    const khung = document.getElementById("noiDungGioHang");
    const gioHang = layGioHang();
    if (gioHang.length === 0) {
        khung.innerHTML = '<div class="gio-hang-trong"><h2>Giỏ hàng đang trống</h2><p>Hãy chọn sản phẩm bạn muốn mua.</p><a href="../html/List.html">Tiếp tục mua sắm</a></div>';
        return;
    }
    let tongTien = 0;
    let tongSoLuong = 0;
    let danhSach = "";
    gioHang.forEach(function (item, index) {
        const thanhTien = item.gia * item.soLuong;
        tongTien += thanhTien;
        tongSoLuong += item.soLuong;
        danhSach += '<div class="item-gio-hang">' +
            '<img src="' + item.anh + '" alt="' + item.ten + '">' +
            '<div><h3>' + item.ten + '</h3><p class="loai">Sản phẩm GearHouse</p><p class="gia-item">' + item.gia.toLocaleString("vi-VN") + '₫</p><button class="xoa-item" data-index="' + index + '">Xóa khỏi giỏ hàng</button></div>' +
            '<div><div class="khu-vuc-so-luong"><div class="bo-so-luong"><button class="giam" data-index="' + index + '">−</button><input type="number" value="' + item.soLuong + '" min="1" data-index="' + index + '" class="input-so-luong"><button class="tang" data-index="' + index + '">+</button></div></div><p class="tong-item">' + thanhTien.toLocaleString("vi-VN") + '₫</p></div>' +
            '</div>';
    });
    khung.innerHTML = '<div class="bo-gio-hang"><div><div class="danh-sach-gio-hang">' + danhSach + '</div><div class="khuyen-mai"><strong>Mã giảm giá:</strong><input id="maGiamGia" placeholder="Nhập mã giảm giá"><button type="button" id="apDungMa">Áp dụng</button></div></div>' +
        '<aside class="tong-ket"><h2>Tóm tắt đơn hàng</h2><div class="dong-tong"><span>Số lượng</span><span>' + tongSoLuong + '</span></div><div class="dong-tong"><span>Tạm tính</span><span>' + tongTien.toLocaleString("vi-VN") + '₫</span></div><div class="dong-tong"><span>Phí vận chuyển</span><span>Miễn phí</span></div><div class="dong-tong cuoi"><span>Tổng cộng</span><span>' + tongTien.toLocaleString("vi-VN") + '₫</span></div><button class="nut-thanh-toan" type="button" id="thanhToan">Tiến hành thanh toán</button><a class="nut-tiep-tuc" href="List.html">Tiếp tục mua sắm</a></aside></div>';

    document.querySelectorAll(".xoa-item").forEach(function (button) {
        button.addEventListener("click", function () {
            const index = Number(this.dataset.index);
            gioHang.splice(index, 1);
            luuGioHang(gioHang);
            hienThiGioHang();
        });
    });

    document.querySelectorAll(".giam").forEach(function (button) {
        button.addEventListener("click", function () {
            const index = Number(this.dataset.index);
            gioHang[index].soLuong = Math.max(1, gioHang[index].soLuong - 1);
            luuGioHang(gioHang);
            hienThiGioHang();
        });
    });

    document.querySelectorAll(".tang").forEach(function (button) {
        button.addEventListener("click", function () {
            const index = Number(this.dataset.index);
            gioHang[index].soLuong = Math.min(99, gioHang[index].soLuong + 1);
            luuGioHang(gioHang);
            hienThiGioHang();
        });
    });

    document.querySelectorAll(".input-so-luong").forEach(function (input) {
        input.addEventListener("change", function () {
            const index = Number(this.dataset.index);
            gioHang[index].soLuong = Math.max(1, Math.min(99, Number(this.value) || 1));
            luuGioHang(gioHang);
            hienThiGioHang();
        });
    });

    document.getElementById("thanhToan").addEventListener("click", function () { alert("Chức năng thanh toán sẽ được bổ sung ở bước tiếp theo."); });
    document.getElementById("apDungMa").addEventListener("click", function () { alert("Chức năng mã giảm giá sẽ được bổ sung ở bước tiếp theo."); });
}

document.addEventListener("DOMContentLoaded", hienThiGioHang);
