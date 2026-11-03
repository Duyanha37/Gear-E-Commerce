//  Danh sách sản phẩm nổi bật
const featuredProductIDs = ["1", "2", "3", "4", "5"];
const featuredProducts = [];
productList.forEach(function (product) {
  featuredProductIDs.forEach(function (productID) {
    if (product.productID === productID) {
      featuredProducts.push(product);
    }
  });
});

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
  container.innerHTML = "";
  products.forEach(function (product, index) {
    if (index < numberToShow) {
      container.innerHTML = container.innerHTML + createProductCard(product);
    }
  });
}

//  Khởi tạo sản phẩm và tìm kiếm trên Home
document.addEventListener("DOMContentLoaded", function () {
  showProducts(featuredProducts, "danhSachSanPhamNoiBat", 5);
  const newProducts = [];
  productList.forEach(function (product, index) {
    if (index >= productList.length - 5) {
      newProducts.push(product);
    }
  });
  showProducts(newProducts, "danhSachSanPhamMoi", 5);

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
});
