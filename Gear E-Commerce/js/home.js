document.addEventListener("DOMContentLoaded", function () {
    const cacLienKet = document.querySelectorAll(".menu-chinh a, .nhom-nut a, .tieu-de-khu-vuc a, .khu-vuc-danh-muc .the-san-pham, .khu-vuc-san-pham .the-san-pham a, .chan-trang a");
    cacLienKet.forEach(function (lienKet) {
        lienKet.addEventListener("click", function (event) {
            const duongDan = lienKet.getAttribute("href");
            if (duongDan && duongDan !== "#") {
                event.preventDefault();
                window.location.href = duongDan;
            }
        });
    });
    const cacNutMuaNgay = document.querySelectorAll(".khu-vuc-san-pham .the-san-pham a");
    cacNutMuaNgay.forEach(function (nutMuaNgay, viTri) {
        nutMuaNgay.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "ChiTietSanPham.html?id=" + (viTri + 1);
        });
    });
});
