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
    '<h3><a href="' +
    detailLink +
    '">' +
    product.Name +
    "</a></h3>" +
    '<p class="thong-so-san-pham">' +
    getVietnameseProductDescription(product) +
    "</p>" +
    '<div class="dong-gia"><b>$' +
    product.Price +
    '</b><a href="' +
    detailLink +
    '">Xem sản phẩm</a></div>' +
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

// Kết xuất sản phẩm của Home.
function renderHomeProducts(products) {
  const featuredProducts = products.filter(function (product) {
    return featuredProductIDs.includes(product.productID);
  });
  showProducts(featuredProducts, "danhSachSanPhamNoiBat", 5);
  showProducts(products.slice(-5), "danhSachSanPhamMoi", 5);
  initializeHomeCarousels();
  initializeHomeSearch();
}

// Gắn điều khiển cho các danh sách kéo ngang trên Home.
function initializeHomeCarousels() {
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
}

// Gắn tìm kiếm trên Home.
function initializeHomeSearch() {
  bindSearchForm("formTimKiem", function (keyword) {
    if (keyword === "") return;
    const searchValues = new URLSearchParams();
    searchValues.set("search", keyword);
    searchValues.set("category", "All");
    searchValues.set("page", "1");
    window.location.href = "../aspx/List.aspx?" + searchValues.toString();
  });
}

function showHomeProductError(error) {
  console.error(error);
  ["danhSachSanPhamNoiBat", "danhSachSanPhamMoi"].forEach(function (id) {
    const container = document.getElementById(id);
    if (container) {
      container.innerHTML =
        '<p role="alert">Không tải được sản phẩm. Vui lòng thử lại.</p>';
    }
  });
}

// Khởi tạo các chức năng Home sau khi tải xong dữ liệu.
document.addEventListener("DOMContentLoaded", function () {
  window.gearHouseProductListPromise
    .then(renderHomeProducts)
    .catch(showHomeProductError);
});
