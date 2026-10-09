
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const danhSach = document.querySelector(".danh-sach-gio-hang");
    const tongSoLuong = document.getElementById("tongSoLuong");
    const tamTinh = document.getElementById("tamTinh");
    const tongCong = document.getElementById("tongCong");

    function dinhDangTien(soTien) {
        return soTien.toLocaleString("vi-VN") + "₫";
    }

    function capNhatTongTien() {
        let tong = 0;
        let soLuong = 0;

        danhSach.querySelectorAll(".item-gio-hang").forEach(function (item) {
            const giaText = item.querySelector(".gia-item").textContent;
            const gia = Number(giaText.replace(/[^\d]/g, ""));
            const input = item.querySelector(".input-so-luong");
            const soLuongItem = Number(input.value) || 1;
            const thanhTien = gia * soLuongItem;

            item.querySelector(".tong-item").textContent =
                dinhDangTien(thanhTien);

            tong += thanhTien;
            soLuong += soLuongItem;
        });

        tongSoLuong.textContent = String(soLuong);
        tamTinh.textContent = dinhDangTien(tong);
        tongCong.textContent = dinhDangTien(tong);
    }

    danhSach.addEventListener("click", function (event) {
        const nut = event.target;
        const item = nut.closest(".item-gio-hang");

        if (!item) {
            return;
        }

        const input = item.querySelector(".input-so-luong");

        if (nut.classList.contains("giam")) {
            input.value = Math.max(1, Number(input.value) - 1);
            capNhatTongTien();
        }

        if (nut.classList.contains("tang")) {
            input.value = Math.min(99, Number(input.value) + 1);
            capNhatTongTien();
        }

        if (nut.classList.contains("xoa-item")) {
            item.remove();
            capNhatTongTien();
            hienThiTrangTrong();
        }
    });

    danhSach.addEventListener("change", function (event) {
        if (!event.target.classList.contains("input-so-luong")) {
            return;
        }

        const input = event.target;
        input.value = Math.max(1, Math.min(99, Number(input.value) || 1));
        capNhatTongTien();
    });

    function hienThiTrangTrong() {
        if (danhSach.querySelector(".item-gio-hang")) {
            return;
        }

        const thongBao = document.createElement("div");
        thongBao.className = "gio-hang-trong";

        const tieuDe = document.createElement("h2");
        tieuDe.textContent = "Giỏ hàng đang trống";

        const moTa = document.createElement("p");
        moTa.textContent = "Hãy chọn sản phẩm bạn muốn mua.";

        const lienKet = document.createElement("a");
        lienKet.href = "../html/List.html";
        lienKet.textContent = "Tiếp tục mua sắm";

        thongBao.append(tieuDe, moTa, lienKet);
        document.getElementById("noiDungGioHang").replaceChildren(thongBao);
    }

    document.getElementById("apDungMa").addEventListener("click", function () {
        alert("Chức năng mã giảm giá chưa được triển khai.");
    });

    document.getElementById("thanhToan").addEventListener("click", function () {
        alert("Chức năng thanh toán chưa được triển khai.");
    });

    capNhatTongTien();
});
