// Dữ liệu dùng chung cho Home và List.
let productList = [];
window.gearHouseProductListPromise = fetch("../aspx/ProductControllers.aspx", {
  headers: { "Service-Name": "GetProducts" },
})
  .then(function (response) {
    if (!response.ok) throw new Error("Không tải được danh sách sản phẩm.");
    return response.json();
  })
  .then(function (products) {
    if (!Array.isArray(products)) {
      throw new Error("Controller không trả về danh sách sản phẩm hợp lệ.");
    }
    productList = products;
    return products;
  })
  .catch(function (error) {
    const applicationProducts = window.gearHouseApplicationProducts;
    if (Array.isArray(applicationProducts)) {
      console.warn("Dùng dữ liệu Application do controller chưa trả về danh sách.", error);
      productList = applicationProducts;
      return productList;
    }
    throw error;
  });

const PRODUCTS_PER_PAGE = 16;

// Hàm tiện ích dùng chung.
function formatGiaVND(gia) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(gia);
}

function getProductSearchText(product) {
  return (product.Name + " " + product.Description + " " + product.Category).toLowerCase();
}

const productDescriptionTranslations = {
  "16GB GDDR6X graphics card": "Card đồ họa 16GB GDDR6X",
  "16-Core processor for high performance": "Bộ xử lý 16 nhân hiệu năng cao",
  "AM5 motherboard with Wi-Fi 6E": "Bo mạch chủ AM5 tích hợp Wi-Fi 6E",
  "DDR5 6000MHz memory kit": "Bộ nhớ DDR5 6000MHz",
  "7450MB/s PCIe 4.0 storage": "Ổ lưu trữ PCIe 4.0 tốc độ 7450MB/s",
  "1000W 80 Plus Gold power supply": "Bộ nguồn 1000W chuẩn 80 Plus Gold",
  "Quiet cooling fan with RGB light": "Quạt tản nhiệt êm, có đèn RGB",
  "24-Core processor for gaming and work": "Bộ xử lý 24 nhân cho chơi game và công việc",
  "12GB GDDR6X graphics card": "Card đồ họa 12GB GDDR6X",
  "DDR5 memory kit 5600MHz": "Bộ nhớ DDR5 5600MHz",
  "AM5 motherboard with Wi-Fi": "Bo mạch chủ AM5 tích hợp Wi-Fi",
  "PCIe 4.0 NVMe storage": "Ổ lưu trữ NVMe PCIe 4.0",
  "850W modular power supply": "Bộ nguồn modular 850W",
  "Thermal paste for CPU cooling": "Keo tản nhiệt cho CPU",
  "8-Core processor for gaming": "Bộ xử lý 8 nhân dành cho chơi game",
  "24GB graphics card for 4K gaming": "Card đồ họa 24GB cho chơi game 4K",
  "DDR5 memory kit 6400MHz": "Bộ nhớ DDR5 6400MHz",
  "Intel motherboard with Wi-Fi": "Bo mạch chủ Intel tích hợp Wi-Fi",
  "High speed PCIe 4.0 NVMe storage": "Ổ lưu trữ NVMe PCIe 4.0 tốc độ cao",
  "750W 80 Plus Gold power supply": "Bộ nguồn 750W chuẩn 80 Plus Gold",
  "Sleeved cable for clean PC builds": "Cáp bọc lưới giúp bố trí PC gọn gàng",
  "14-Core processor for gaming": "Bộ xử lý 14 nhân dành cho chơi game",
  "8GB graphics card for 1080p gaming": "Card đồ họa 8GB cho chơi game 1080p",
  "DDR5 memory kit 6000MHz": "Bộ nhớ DDR5 6000MHz",
  "Micro ATX Intel motherboard": "Bo mạch chủ Intel chuẩn Micro ATX",
  "650W power supply for gaming PCs": "Bộ nguồn 650W cho PC chơi game",
  "Dust filters for desktop case": "Bộ lọc bụi cho thùng máy tính",
  "23.8-inch Full HD gaming monitor, 165Hz": "Màn hình chơi game Full HD 23,8 inch, 165Hz",
  "Compact mechanical keyboard for gaming and work": "Bàn phím cơ nhỏ gọn cho chơi game và làm việc",
  "Wired gaming mouse with adjustable weights": "Chuột chơi game có dây, điều chỉnh được trọng lượng",
  "Lightweight wireless gaming mouse": "Chuột chơi game không dây nhẹ",
  "Wireless gaming mouse with optical sensor": "Chuột chơi game không dây với cảm biến quang học",
  "Comfortable everyday wireless mouse": "Chuột không dây thoải mái cho nhu cầu hằng ngày",
  "Ergonomic wireless esports gaming mouse": "Chuột esports không dây thiết kế công thái học",
  "Over-ear gaming headset with clear audio": "Tai nghe chụp tai chơi game với âm thanh rõ nét",
  "Over-ear gaming headset for gaming and voice chat": "Tai nghe chụp tai cho chơi game và trò chuyện thoại",
  "Wireless mechanical keyboard with RGB lighting": "Bàn phím cơ không dây có đèn RGB",
};

function getVietnameseProductDescription(product) {
  return productDescriptionTranslations[product.Description] || product.Description;
}

const navigationEntries =
  window.performance &&
  typeof window.performance.getEntriesByType === "function"
    ? window.performance.getEntriesByType("navigation")
    : [];
const isPageRefresh =
  navigationEntries.length > 0 && navigationEntries[0].type === "reload";
const queryValues = new URLSearchParams(
  isPageRefresh ? "" : window.location.search,
);
const categoryList = [
  "All",
  "CPU",
  "GPU",
  "RAM",
  "Motherboard",
  "SSD",
  "Power Supply",
  "Accessories",
];
const requestedCategory = queryValues.get("category") || "All";
const selectedCategory = categoryList.includes(requestedCategory)
  ? requestedCategory
  : "All";
const pageState = {
  category: selectedCategory,
  keyword: queryValues.get("search") || "",
  currentPage: Number(queryValues.get("page") || 1) || 1,
  sortType: "featured",
};

// Tìm kiếm và carousel dùng chung.
function bindSearchForm(formId, onSearch) {
  const form = document.getElementById(formId);
  if (!form) return;
  const input = form.querySelector('input[type="search"]');
  if (!input) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const keyword = input.value.trim().toLowerCase();
    input.value = "";
    onSearch(keyword);
  });
}

function bindHorizontalCarousel(track, controls, itemSelector) {
  if (!track || !controls || track.dataset.carouselBound === "true") return;

  const previousButton = controls.querySelector(".nut-truot-trai");
  const nextButton = controls.querySelector(".nut-truot-phai");
  if (!previousButton || !nextButton) return;

  track.dataset.carouselBound = "true";
  let dragStartX = 0;
  let dragScrollStart = 0;
  let isDragging = false;
  let suppressClick = false;

  function updateControls() {
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const currentScroll = Math.max(0, Math.min(track.scrollLeft, maxScroll));
    controls.classList.toggle("is-scrollable", maxScroll > 2);
    previousButton.disabled = currentScroll <= 8;
    nextButton.disabled = currentScroll >= maxScroll - 8;
  }

  function scrollByCard(direction) {
    const firstCard = track.querySelector(itemSelector || ".the-san-pham");
    if (!firstCard) return;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    track.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  }

  previousButton.addEventListener("click", function () {
    scrollByCard(-1);
  });
  nextButton.addEventListener("click", function () {
    scrollByCard(1);
  });
  track.addEventListener("scroll", updateControls, { passive: true });
  track.addEventListener("scrollend", updateControls);
  window.addEventListener("resize", updateControls);
  track.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });
  track.addEventListener("pointerdown", function (event) {
    if (
      !controls.classList.contains("is-scrollable") ||
      event.pointerType !== "mouse" ||
      event.button !== 0
    ) {
      return;
    }
    dragStartX = event.clientX;
    dragScrollStart = track.scrollLeft;
    isDragging = true;
    suppressClick = false;
    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  });
  track.addEventListener("pointermove", function (event) {
    if (!isDragging) return;
    const distance = event.clientX - dragStartX;
    if (Math.abs(distance) > 5) suppressClick = true;
    if (suppressClick) track.scrollLeft = dragScrollStart - distance;
  });

  function stopDragging() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove("is-dragging");
    window.requestAnimationFrame(updateControls);
    window.setTimeout(updateControls, 120);
  }

  track.addEventListener("pointerup", stopDragging);
  track.addEventListener("pointercancel", stopDragging);
  track.addEventListener(
    "click",
    function (event) {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    },
    true,
  );
  updateControls();
}

// Lọc và hiển thị sản phẩm trên List.
function filterProducts() {
  const filteredProducts = [];
  const mucGia = document.querySelector('input[name="mucGia"]:checked').value;
  productList.forEach(function (product) {
    const categoryMatches =
      pageState.category === "All" || product.Category === pageState.category;
    const keywordMatches = getProductSearchText(product).includes(pageState.keyword);
    let giaPhuHop = true;
    if (mucGia === "duoi7500000") giaPhuHop = product.Price < 7500000;
    if (mucGia === "7500000den12500000")
      giaPhuHop = product.Price >= 7500000 && product.Price < 12500000;
    if (mucGia === "12500000den22500000")
      giaPhuHop = product.Price >= 12500000 && product.Price <= 22500000;
    if (mucGia === "tren22500000") giaPhuHop = product.Price > 22500000;
    if (categoryMatches && keywordMatches && giaPhuHop) {
      filteredProducts.push(product);
    }
  });
  return filteredProducts;
}

// tạo thẻ sản phẩm
function createProductCard(product) {
  const imageContent =
    product.Image === ""
      ? ""
      : '<img src="' + product.Image + '" alt="' + product.Name + '">';
  const detailLink = "../aspx/ChiTietSanPham.aspx?id=" + product.productID;
  return (
    '<a class="the-san-pham" href="' +
    detailLink +
    '"><span class="khung-anh">' +
    imageContent +
    "</span>" +
    "<h3>" +
    product.Name +
    "</h3>" +
    '<p class="mo-ta-san-pham">' +
    getVietnameseProductDescription(product) +
    "</p>" +
    '<div class="dong-gia"><b>' +
    formatGiaVND(product.Price) +
    "</b></div></a>"
  );
}

// sắp xếp và hiển thị danh sách
function showProducts() {
  const filteredProducts = filterProducts();
  if (pageState.sortType === "low") {
    filteredProducts.sort(function (productA, productB) {
      return productA.Price - productB.Price;
    });
  }
  if (pageState.sortType === "high") {
    filteredProducts.sort(function (productA, productB) {
      return productB.Price - productA.Price;
    });
  }
  if (pageState.sortType === "newest") {
    filteredProducts.sort(function (productA, productB) {
      return Number(productB.productID) - Number(productA.productID);
    });
  }

  const pageCount = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const pageNumbers = Array.from({ length: pageCount }, function (_, index) {
    return index + 1;
  });
  if (pageState.currentPage > pageNumbers.length) {
    pageState.currentPage = 1;
  }

  const startIndex = (pageState.currentPage - 1) * PRODUCTS_PER_PAGE;
  const pageProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );
  const productContainer = document.getElementById("danhSachSanPham");
  productContainer.innerHTML = pageProducts
    .map(function (product) {
      return createProductCard(product);
    })
    .join("");
  if (filteredProducts.length === 0 && pageState.keyword.trim() !== "") {
    productContainer.innerHTML =
      '<p class="thong-bao-khong-co-san-pham" role="status">Sản phẩm không tồn tại</p>';
  }
  document.getElementById("soLuongSanPham").textContent =
    pageProducts.length + " sản phẩm";
  showPageButtons(pageNumbers);
  updateSavedPage();
}

// tạo nút chuyển trang
function showPageButtons(pageNumbers) {
  const pageContainer = document.getElementById("phanTrang");
  pageContainer.innerHTML = "";
  pageNumbers.forEach(function (pageNumber) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = pageNumber;
    if (pageNumber === pageState.currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", function () {
      pageState.currentPage = pageNumber;
      showProducts();
    });
    pageContainer.appendChild(button);
  });
}

// cập nhật trạng thái danh sách trên URL
function updateSavedPage() {
  const newQuery = new URLSearchParams();
  newQuery.set("category", pageState.category);
  newQuery.set("page", pageState.currentPage);
  if (pageState.keyword.trim() !== "") {
    newQuery.set("search", pageState.keyword);
  }
  window.history.replaceState(
    null,
    "",
    window.location.pathname + "?" + newQuery.toString(),
  );
}

// Sự kiện tìm kiếm, danh mục, sắp xếp và khoảng giá trên List.
function chooseCategory() {
  document.querySelectorAll(".muc-danh-muc").forEach(function (item) {
    if (item.dataset.category === pageState.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function changeCategory() {
  document.querySelectorAll(".muc-danh-muc").forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      pageState.category = item.dataset.category;
      pageState.keyword = "";
      pageState.currentPage = 1;
      const headerSearchInput = document.getElementById("timKiem");
      if (headerSearchInput) headerSearchInput.value = "";
      document.getElementById("timTrongDanhMuc").value = "";
      chooseCategory();
      showProducts();
    });
  });
}

function searchFromHeader() {
  bindSearchForm("formTimKiem", runSearch);
}
function searchFromFilter() {
  bindSearchForm("formTimTrongDanhMuc", runSearch);
}

function runSearch(keyword) {
  pageState.keyword = keyword;
  const foundCategories = [];
  productList.forEach(function (product) {
    const productText = getProductSearchText(product);
    if (
      productText.includes(keyword) &&
      !foundCategories.includes(product.Category)
    ) {
      foundCategories.push(product.Category);
    }
  });
  if (foundCategories.length === 1) {
    pageState.category = foundCategories[0];
  } else {
    pageState.category = "All";
  }
  pageState.currentPage = 1;

  chooseCategory();
  showProducts();
}

function changeSort() {
  document.getElementById("sapXep").addEventListener("change", function () {
    pageState.sortType = document.getElementById("sapXep").value;
    pageState.currentPage = 1;
    showProducts();
  });
}

function changePrice() {
  document.querySelectorAll('input[name="mucGia"]').forEach(function (input) {
    input.addEventListener("change", function () {
      pageState.currentPage = 1;
      document.querySelector(".bo-loc-gia").open = false;
      showProducts();
    });
  });
}

function clearFilters() {
  document.getElementById("xoaBoLoc").addEventListener("click", function () {
    pageState.category = "All";
    pageState.keyword = "";
    pageState.currentPage = 1;
    pageState.sortType = "featured";
    const headerSearchInput = document.getElementById("timKiem");
    if (headerSearchInput) headerSearchInput.value = "";
    document.getElementById("timTrongDanhMuc").value = "";
    document.querySelector('input[name="mucGia"][value="tatCa"]').checked =
      true;
    document.getElementById("sapXep").value = "featured";
    chooseCategory();
    showProducts();
  });
}

// Gắn sự kiện header dùng chung trên Home và List.
function initializeHeader() {
  const header = document.querySelector(".dau-trang header");
  if (!header) return;

  const mainNavigation = header.querySelector(".menu-chinh");
  const accountActions = header.querySelector(".tai-khoan");
  const brand = header.querySelector(".logo-thuong-hieu");
  const searchForm = document.getElementById("formTimKiem");
  const searchToggle = searchForm && document.getElementById("nutMoTimKiem");
  const searchInput = searchForm && searchForm.querySelector('input[type="search"]');
  let navigationMeasureFrame = null;

  function updateNavigationRow() {
    if (!mainNavigation || !accountActions || !brand) return;

    const navigationLinks = Array.from(mainNavigation.querySelectorAll("a"));
    const linkWidth = navigationLinks.reduce(
      (total, link) => total + link.getBoundingClientRect().width,
      0,
    );
    const navigationStyle = window.getComputedStyle(mainNavigation);
    const linkGap = parseFloat(navigationStyle.columnGap) || 0;
    const headerStyle = window.getComputedStyle(header);
    const headerGap = parseFloat(headerStyle.columnGap || headerStyle.gap) || 0;
    let requiredActionsWidth = accountActions.scrollWidth;
    if (searchForm) {
      const compactSearchLayout = window.matchMedia(
        "(max-width: 600px), (hover: none) and (pointer: coarse)",
      ).matches;
      const expectedSearchWidth = compactSearchLayout
        ? Math.min(300, Math.max(72, window.innerWidth - 240))
        : 300;
      requiredActionsWidth += Math.max(
        0,
        expectedSearchWidth - searchForm.getBoundingClientRect().width,
      );
    }
    const requiredWidth =
      brand.getBoundingClientRect().width +
      linkWidth +
      linkGap * Math.max(0, navigationLinks.length - 1) +
      requiredActionsWidth +
      headerGap * 2;

    header.classList.toggle(
      "nav-xuong-dong",
      requiredWidth > header.clientWidth + 1,
    );
  }

  function scheduleNavigationMeasure() {
    if (navigationMeasureFrame !== null) {
      window.cancelAnimationFrame(navigationMeasureFrame);
    }
    navigationMeasureFrame = window.requestAnimationFrame(function () {
      navigationMeasureFrame = null;
      updateNavigationRow();
    });
  }

  function closeSearch() {
    if (!searchForm) return;
    searchForm.classList.remove("dang-mo");
    header.classList.remove("tim-kiem-dang-mo");
    if (searchToggle) {
      searchToggle.setAttribute("aria-expanded", "false");
      searchToggle.setAttribute("aria-label", "Mở tìm kiếm");
    }
    scheduleNavigationMeasure();
  }

  window.addEventListener("resize", scheduleNavigationMeasure);
  if ("ResizeObserver" in window) {
    const navigationObserver = new ResizeObserver(scheduleNavigationMeasure);
    navigationObserver.observe(header);
    if (accountActions) navigationObserver.observe(accountActions);
    if (mainNavigation) navigationObserver.observe(mainNavigation);
    if (searchForm) navigationObserver.observe(searchForm);
  }

  scheduleNavigationMeasure();

  if (!searchForm || !searchToggle || !searchInput) return;

  searchToggle.addEventListener("click", function () {
    if (searchForm.classList.contains("dang-mo")) {
      closeSearch();
      return;
    }
    searchForm.classList.add("dang-mo");
    header.classList.add("tim-kiem-dang-mo");
    updateNavigationRow();
    searchToggle.setAttribute("aria-expanded", "true");
    searchToggle.setAttribute("aria-label", "Đóng tìm kiếm");
    searchInput.focus();
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSearch();
      searchToggle.focus();
    }
  });

  searchForm.addEventListener("focusout", function (event) {
    if (!searchForm.contains(event.relatedTarget)) closeSearch();
  });

  document.addEventListener("pointerdown", function (event) {
    if (!searchForm.contains(event.target)) closeSearch();
  });

  searchForm.addEventListener("submit", closeSearch);
}

// Gắn sự kiện List sau khi dữ liệu sản phẩm đã tải xong.
function initializeListPage(products) {
  productList = products;
  const searchInput = document.getElementById("timKiem");
  const filterSearchInput = document.getElementById("timTrongDanhMuc");
  if (searchInput) searchInput.value = pageState.keyword;
  if (filterSearchInput) {
    filterSearchInput.value = searchInput ? "" : pageState.keyword;
  }
  chooseCategory();
  searchFromHeader();
  searchFromFilter();
  changeCategory();
  changeSort();
  changePrice();
  clearFilters();
  bindHorizontalCarousel(
    document.getElementById("danhSachDanhMucBoLoc"),
    document.querySelector(".bo-dieu-khien-danh-muc-bo-loc"),
    ".muc-danh-muc",
  );
  showProducts();
}

// Khởi tạo giao diện dùng chung và giao diện List.
document.addEventListener("DOMContentLoaded", function () {
  initializeHeader();
  const productContainer = document.getElementById("danhSachSanPham");
  if (!productContainer) return;

  window.gearHouseProductListPromise
    .then(initializeListPage)
    .catch(function (error) {
      console.error(error);
      productContainer.innerHTML =
        '<p class="thong-bao-khong-co-san-pham" role="alert">Không tải được sản phẩm. Vui lòng thử lại.</p>';
    });
});
