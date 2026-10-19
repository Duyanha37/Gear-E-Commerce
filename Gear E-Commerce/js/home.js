// dùng danh sách sản phẩm chung trong List.js
// danh sách sản phẩm nổi bật lấy từ danh sách sản phẩm
const featuredProductIDs = ["1", "2", "3", "4"];
const featuredProducts = [];
productList.forEach(function (product) {
  featuredProductIDs.forEach(function (productID) {
    if (product.productID === productID) {
      featuredProducts.push(product);
    }
  });
});

// tạo thẻ sản phẩm
function createProductCard(product) {
  const imageContent =
    product.Image === ""
      ? ""
      : '<img src="' + product.Image + '" alt="' + product.Name + '">';
  const detailLink = "../html/ChiTietSanPham.html?id=" + product.productID;
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
  container.innerHTML = "";
  products.forEach(function (product, index) {
    if (index < numberToShow) {
      container.innerHTML = container.innerHTML + createProductCard(product);
    }
  });
}

// hiện sản phẩm trên home
document.addEventListener("DOMContentLoaded", function () {
  showProducts(featuredProducts, "danhSachSanPhamNoiBat", 4);
  const newProducts = [];
  productList.forEach(function (product, index) {
    if (index >= productList.length - 4) {
      newProducts.push(product);
    }
  });
  showProducts(newProducts, "danhSachSanPhamMoi", 4);

  document
    .getElementById("formTimKiem")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const keyword = document.getElementById("oTimKiem").value.toLowerCase();
      if (keyword !== "") {
        const searchValues = new URLSearchParams();
        searchValues.set("search", keyword);
        searchValues.set("category", "All");
        searchValues.set("page", "1");
        window.location.href = "../html/List.html?" + searchValues.toString();
      }
    });
});
