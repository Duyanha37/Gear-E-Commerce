//  Danh sách sản phẩm nổi bật
const featuredProductIDs = ["1", "2", "3", "4", "5"];

//  Tạo và hiển thị thẻ sản phẩm
function createProductCard(product) {
  const imageContent =
    product.Image === ""
      ? ""
      : '<img src="' + product.Image + '" alt="' + product.Name + '">';
  const detailLink = "../aspx/ChiTietSanPham.aspx?id=" + product.productID;
  return (
    '<div class="the-san-pham">' +
    '<a class="khung-anh" href="' +
    detailLink +
    '">' +
    imageContent +
    "</a>" +
    '<p class="loai-san-pham">' +
    product.Category +
    " · GearHouse</p>" +
    '<h3><a href="' +
    detailLink +
    '">' +
    product.Name +
    "</a></h3>" +
    '<p class="thong-so-san-pham">' +
    product.Description +
    "</p>" +
    '<div class="dong-gia"><b>$' +
    product.Price +
    '</b><a href="' +
    detailLink +
    '">View product</a></div>' +
    "</div>"
  );
}

// duyệt danh sách và hiện sản phẩm
function showProducts(products, containerID, numberToShow) {
  const container = document.getElementById(containerID);
  container.innerHTML = products
    .slice(0, numberToShow)
    .map(createProductCard)
    .join("");
}

//  Khởi tạo sản phẩm và tìm kiếm trên Home
document.addEventListener("DOMContentLoaded", function () {
  window.gearHouseProductListPromise
    .then(function (products) {
      const featuredProducts = products.filter(function (product) {
        return featuredProductIDs.includes(product.productID);
      });
      showProducts(featuredProducts, "danhSachSanPhamNoiBat", 5);
      showProducts(products.slice(-5), "danhSachSanPhamMoi", 5);

      [
        ["danhSachDanhMuc", ".bo-dieu-khien-danh-muc"],
        ["danhSachSanPhamNoiBat", ".bo-dieu-khien-san-pham"],
        ["danhSachSanPhamMoi", ".bo-dieu-khien-san-pham"],
      ].forEach(function (carousel) {
        const track = document.getElementById(carousel[0]);
        if (track) {
          bindHorizontalCarousel(
            track,
            track.closest(carousel[1]),
            ".the-san-pham",
          );
        }
      });

      bindSearchForm("formTimKiem", function (keyword) {
        if (keyword !== "") {
          const searchValues = new URLSearchParams();
          searchValues.set("search", keyword);
          searchValues.set("category", "All");
          searchValues.set("page", "1");
          window.location.href = "../aspx/List.aspx?" + searchValues.toString();
        }
      });
    })
    .catch(function (error) {
      console.error(error);
      ["danhSachSanPhamNoiBat", "danhSachSanPhamMoi"].forEach(function (id) {
        const container = document.getElementById(id);
        if (container) {
          container.innerHTML =
            '<p role="alert">Không tải được sản phẩm. Vui lòng thử lại.</p>';
        }
      });
    });
});
