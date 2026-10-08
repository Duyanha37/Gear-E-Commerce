document.addEventListener("DOMContentLoaded", function () {
    const cacLienKet = document.querySelectorAll(".menu-chinh a, .nhom-nut a, .tieu-de-khu-vuc a, .the-san-pham, .chan-trang a");
    cacLienKet.forEach(function (lienKet) {
        lienKet.addEventListener("click", function (event) {
            const duongDan = lienKet.getAttribute("href");
            if (duongDan && duongDan !== "#") {
                event.preventDefault();
                window.location.href = duongDan;
            }
        });
    });
});