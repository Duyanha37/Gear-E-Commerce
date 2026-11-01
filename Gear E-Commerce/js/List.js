const productList = [
  {
    productID: "1",
    Name: "GeForce RTX 4080 Super",
    Description: "16GB GDDR6X graphics card",
    Price: 24975000,
    Stock: 12,
    Category: "GPU",
    Image: "../assets/images-backup/geforce-rtx-4080-super.jpg",
  },
  {
    productID: "2",
    Name: "Ryzen 9 7950X3D",
    Description: "16-Core processor for high performance",
    Price: 14975000,
    Stock: 18,
    Category: "CPU",
    Image: "../assets/images-backup/ryzen-9-7950x3d.jpg",
  },
  {
    productID: "3",
    Name: "ROG Strix X670E-E",
    Description: "AM5 motherboard with Wi-Fi 6E",
    Price: 11725000,
    Stock: 9,
    Category: "Motherboard",
    Image: "../assets/images-backup/rog-strix-x670e-e.jpg",
  },
  {
    productID: "4",
    Name: "Vengeance RGB 32GB",
    Description: "DDR5 6000MHz memory kit",
    Price: 3225000,
    Stock: 30,
    Category: "RAM",
    Image: "../assets/images-backup/vengeance-rgb-32gb.jpg",
  },
  {
    productID: "5",
    Name: "990 PRO NVMe 2TB",
    Description: "7450MB/s PCIe 4.0 storage",
    Price: 4475000,
    Stock: 16,
    Category: "SSD",
    Image: "../assets/images-backup/samsung-990-pro-2tb.jpg",
  },
  {
    productID: "6",
    Name: "RM1000x Shift",
    Description: "1000W 80 Plus Gold power supply",
    Price: 5225000,
    Stock: 14,
    Category: "Power Supply",
    Image: "../assets/images-backup/corsair-rm1000x-shift.jpg",
  },
  {
    productID: "7",
    Name: "RGB Gaming Fan 120mm",
    Description: "Quiet cooling fan with RGB light",
    Price: 725000,
    Stock: 40,
    Category: "Accessories",
    Image: "../assets/images-backup/RGB-fan-white.png",
  },
  {
    productID: "8",
    Name: "Intel Core i9-14900K",
    Description: "24-Core processor for gaming and work",
    Price: 13725000,
    Stock: 11,
    Category: "CPU",
    Image: "../assets/images-backup/intel-core-i9-14900k.jpg",
  },
  {
    productID: "9",
    Name: "GeForce RTX 4070 Ti",
    Description: "12GB GDDR6X graphics card",
    Price: 19975000,
    Stock: 8,
    Category: "GPU",
    Image: "../assets/images-backup/geforce-rtx-4070-ti.jpg",
  },
  {
    productID: "10",
    Name: "Fury Beast DDR5 32GB",
    Description: "DDR5 memory kit 5600MHz",
    Price: 2725000,
    Stock: 24,
    Category: "RAM",
    Image: "../assets/images-backup/kingston-fury-beast-ddr5-32gb.jpg",
  },
  {
    productID: "11",
    Name: "B650 AORUS Elite AX",
    Description: "AM5 motherboard with Wi-Fi",
    Price: 5725000,
    Stock: 13,
    Category: "Motherboard",
    Image: "../assets/images-backup/b650-aorus-elite-ax.jpg",
  },
  {
    productID: "12",
    Name: "Crucial P3 Plus 1TB",
    Description: "PCIe 4.0 NVMe storage",
    Price: 1975000,
    Stock: 35,
    Category: "SSD",
    Image: "../assets/images-backup/crucial-p3-plus-1tb.jpg",
  },
  {
    productID: "13",
    Name: "ROG Thor 850W Platinum",
    Description: "850W modular power supply",
    Price: 4725000,
    Stock: 7,
    Category: "Power Supply",
    Image: "../assets/images-backup/rog-thor-850w-platinum.jpg",
  },
  {
    productID: "14",
    Name: "Thermal Paste Kit",
    Description: "Thermal paste for CPU cooling",
    Price: 300000,
    Stock: 50,
    Category: "Accessories",
    Image: "../assets/images-backup/thermal-paste-kit.jpg",
  },
  {
    productID: "15",
    Name: "Ryzen 7 7800X3D",
    Description: "8-Core processor for gaming",
    Price: 9725000,
    Stock: 15,
    Category: "CPU",
    Image: "../assets/images-backup/ryzen-7-7800x3d.jpg",
  },
  {
    productID: "16",
    Name: "Radeon RX 7900 XTX",
    Description: "24GB graphics card for 4K gaming",
    Price: 22475000,
    Stock: 6,
    Category: "GPU",
    Image: "../assets/images-backup/radeon-rx-7900-xtx.jpg",
  },
  {
    productID: "17",
    Name: "Dominator Titanium 64GB",
    Description: "DDR5 memory kit 6400MHz",
    Price: 5475000,
    Stock: 10,
    Category: "RAM",
    Image: "../assets/images-backup/dominator-titanium-64gb.jpg",
  },
  {
    productID: "18",
    Name: "MAG B760 Tomahawk",
    Description: "Intel motherboard with Wi-Fi",
    Price: 4975000,
    Stock: 12,
    Category: "Motherboard",
    Image: "../assets/images-backup/msi-mag-b760-tomahawk.jpg",
  },
  {
    productID: "19",
    Name: "WD Black SN850X 2TB",
    Description: "High speed PCIe 4.0 NVMe storage",
    Price: 3975000,
    Stock: 21,
    Category: "SSD",
    Image: "../assets/images-backup/wd-black-sn850x-2tb.jpg",
  },
  {
    productID: "20",
    Name: "Focus GX 750W",
    Description: "750W 80 Plus Gold power supply",
    Price: 2975000,
    Stock: 19,
    Category: "Power Supply",
    Image: "../assets/images-backup/seasonic-focus-gx-750.jpg",
  },
  {
    productID: "21",
    Name: "ARGB Extension Cable",
    Description: "Sleeved cable for clean PC builds",
    Price: 600000,
    Stock: 28,
    Category: "Accessories",
    Image: "../assets/images-backup/ARGB-extension-cable-white.jpg",
  },
  {
    productID: "22",
    Name: "Intel Core i5-14600K",
    Description: "14-Core processor for gaming",
    Price: 7975000,
    Stock: 20,
    Category: "CPU",
    Image: "../assets/images-backup/intel-core-i5-14600k-v2.jpg",
  },
  {
    productID: "23",
    Name: "GeForce RTX 4060",
    Description: "8GB graphics card for 1080p gaming",
    Price: 7475000,
    Stock: 17,
    Category: "GPU",
    Image: "../assets/images-backup/geforce-rtx-4060.jpg",
  },
  {
    productID: "24",
    Name: "T-Force Delta RGB 16GB",
    Description: "DDR5 memory kit 6000MHz",
    Price: 1725000,
    Stock: 32,
    Category: "RAM",
    Image: "../assets/images-backup/t-force-delta-rgb-16gb.jpg",
  },
  {
    productID: "25",
    Name: "Prime B760M-A",
    Description: "Micro ATX Intel motherboard",
    Price: 3475000,
    Stock: 16,
    Category: "Motherboard",
    Image: "../assets/images-backup/asus-prime-b760m-a-v2.jpg",
  },
  {
    productID: "26",
    Name: "Kingston NV2 1TB",
    Description: "PCIe 4.0 NVMe storage",
    Price: 1475000,
    Stock: 26,
    Category: "SSD",
    Image: "../assets/images-backup/kingston-nv2-1tb.jpg",
  },
  {
    productID: "27",
    Name: "CX650 650W",
    Description: "650W power supply for gaming PCs",
    Price: 1975000,
    Stock: 23,
    Category: "Power Supply",
    Image: "../assets/images-backup/CorsairCX650.jpg",
  },
  {
    productID: "28",
    Name: "Case Dust Filter Set",
    Description: "Dust filters for desktop case",
    Price: 375000,
    Stock: 45,
    Category: "Accessories",
    Image: "../assets/images-backup/CaseDustFilters.jpg",
  },
  {
    productID: "29",
    Name: "ASUS TUF Gaming VG249Q1A",
    Description: "23.8-inch Full HD gaming monitor, 165Hz",
    Price: 4725000,
    Stock: 10,
    Category: "Accessories",
    Image: "../assets/images-backup/AsusTUF-VG249Q1A-clean.png",
  },
  {
    productID: "30",
    Name: "Akko 3098B Mechanical Keyboard",
    Description: "Compact mechanical keyboard for gaming and work",
    Price: 2225000,
    Stock: 14,
    Category: "Accessories",
    Image: "../assets/images-backup/Akko3098B.jpg",
  },
  {
    productID: "31",
    Name: "Logitech G502 HERO",
    Description: "Wired gaming mouse with adjustable weights",
    Price: 1225000,
    Stock: 20,
    Category: "Accessories",
    Image: "../assets/images-backup/LogitechG502.jpg",
  },
  {
    productID: "32",
    Name: "Logitech G PRO Wireless",
    Description: "Lightweight wireless gaming mouse",
    Price: 2475000,
    Stock: 12,
    Category: "Accessories",
    Image: "../assets/images-backup/LogitechGPro-white.jpg",
  },
  {
    productID: "33",
    Name: "Logitech G304 LIGHTSPEED",
    Description: "Wireless gaming mouse with optical sensor",
    Price: 975000,
    Stock: 22,
    Category: "Accessories",
    Image: "../assets/images-backup/LogitechG304.jpg",
  },
  {
    productID: "34",
    Name: "Logitech Wireless Mouse",
    Description: "Comfortable everyday wireless mouse",
    Price: 625000,
    Stock: 25,
    Category: "Accessories",
    Image: "../assets/images-backup/LogitechM185.jpg",
  },
  {
    productID: "35",
    Name: "Razer DeathAdder V3 Pro",
    Description: "Ergonomic wireless esports gaming mouse",
    Price: 2975000,
    Stock: 9,
    Category: "Accessories",
    Image: "../assets/images-backup/deathAdderV3pro.jpg",
  },
  {
    productID: "36",
    Name: "Razer BlackShark V2",
    Description: "Over-ear gaming headset with clear audio",
    Price: 2475000,
    Stock: 11,
    Category: "Accessories",
    Image: "../assets/images-backup/RazerBlackSharkV2-white.jpg",
  },
  {
    productID: "37",
    Name: "HyperX Cloud III Gaming Headset",
    Description: "Over-ear headset for gaming and voice chat",
    Price: 1975000,
    Stock: 15,
    Category: "Accessories",
    Image:
      "../assets/images-backup/HpHyperX3.jpg",
  },
  {
    productID: "38",
    Name: "Keychron K8 Pro Keyboard",
    Description: "Wireless mechanical keyboard with RGB lighting",
    Price: 2725000,
    Stock: 8,
    Category: "Accessories",
    Image: "../assets/images-backup/K8Pro.jpg",
  },
];

const PRODUCTS_PER_PAGE = 16;

function formatGiaVND(gia) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(gia);
}

// lưu bộ lọc và trang hiện tại
const queryValues = new URLSearchParams(window.location.search);
const savedCategory = sessionStorage.getItem("listCategory");
const savedPage = sessionStorage.getItem("listPage");
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
const requestedCategory = queryValues.get("category") || savedCategory || "All";
const selectedCategory = categoryList.includes(requestedCategory)
  ? requestedCategory
  : "All";
const pageState = {
  category: selectedCategory,
  keyword: queryValues.get("search") || "",
  currentPage: Number(queryValues.get("page") || savedPage) || 1,
  sortType: "featured",
};

//  Tìm kiếm dùng chung
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

// lọc sản phẩm theo các điều kiện
function filterProducts() {
  const filteredProducts = [];
  const mucGia = document.querySelector('input[name="mucGia"]:checked').value;
  productList.forEach(function (product) {
    const categoryMatches =
      pageState.category === "All" || product.Category === pageState.category;
    const searchText = (
      product.Name +
      " " +
      product.Description +
      " " +
      product.Category
    ).toLowerCase();
    const keywordMatches = searchText.includes(pageState.keyword);
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
  const categoryNames = {
    Motherboard: "Bo mạch chủ",
    "Power Supply": "Nguồn",
    Accessories: "Phụ kiện",
  };
  const categoryLabel = categoryNames[product.Category] || product.Category;
  const imageContent =
    product.Image === ""
      ? ""
      : '<img src="' + product.Image + '" alt="' + product.Name + '">';
  const detailLink = "../html/ChiTietSanPham.html?id=" + product.productID;
  return (
    '<a class="the-san-pham" href="' +
    detailLink +
    '"><span class="khung-anh">' +
    imageContent +
    "</span>" +
    '<p class="loai-san-pham">' +
    categoryLabel +
    " · GearHouse</p>" +
    "<h3>" +
    product.Name +
    "</h3>" +
    '<p class="mo-ta-san-pham">' +
    product.Description +
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

// cập nhật địa chỉ và lưu vị trí danh sách
function updateSavedPage() {
  sessionStorage.setItem("listCategory", pageState.category);
  sessionStorage.setItem("listPage", pageState.currentPage);
  const newQuery = new URLSearchParams();
  newQuery.set("category", pageState.category);
  newQuery.set("page", pageState.currentPage);
  window.history.replaceState(
    null,
    "",
    window.location.pathname + "?" + newQuery.toString(),
  );
}

//  Điều khiển danh mục, tìm kiếm và bộ lọc
// đánh dấu danh mục đang chọn
function chooseCategory() {
  document.querySelectorAll(".muc-danh-muc").forEach(function (item) {
    if (item.dataset.category === pageState.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// chọn một danh mục
function changeCategory() {
  document.querySelectorAll(".muc-danh-muc").forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      pageState.category = item.dataset.category;
      pageState.keyword = "";
      pageState.currentPage = 1;
      document.getElementById("timKiem").value = "";
      document.getElementById("timTrongDanhMuc").value = "";
      chooseCategory();
      showProducts();
    });
  });
}

// tìm kiếm từ thanh công cụ
function searchFromHeader() {
  bindSearchForm("formTimKiem", runSearch);
}
// tìm kiếm ở khung bộ lọc
function searchFromFilter() {
  bindSearchForm("formTimTrongDanhMuc", runSearch);
}

// tìm kiếm và chọn danh mục tương ứng
function runSearch(keyword) {
  pageState.keyword = keyword;
  const foundCategories = [];
  productList.forEach(function (product) {
    const productText = (
      product.Name +
      " " +
      product.Description +
      " " +
      product.Category
    ).toLowerCase();
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

// thay đổi cách sắp xếp
function changeSort() {
  document.getElementById("sapXep").addEventListener("change", function () {
    pageState.sortType = document.getElementById("sapXep").value;
    pageState.currentPage = 1;
    showProducts();
  });
}

// lọc theo khoảng giá
function changePrice() {
  document.querySelectorAll('input[name="mucGia"]').forEach(function (input) {
    input.addEventListener("change", function () {
      pageState.currentPage = 1;
      document.querySelector(".bo-loc-gia").open = false;
      showProducts();
    });
  });
}

// xóa bộ lọc
function clearFilters() {
  document.getElementById("xoaBoLoc").addEventListener("click", function () {
    pageState.category = "All";
    pageState.keyword = "";
    pageState.currentPage = 1;
    pageState.sortType = "featured";
    document.getElementById("timKiem").value = "";
    document.getElementById("timTrongDanhMuc").value = "";
    document.querySelector('input[name="mucGia"][value="tatCa"]').checked =
      true;
    document.getElementById("sapXep").value = "featured";
    chooseCategory();
    showProducts();
  });
}

//  Khởi tạo giao diện
// Dùng chung bởi trang Home và trang List.
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("formTimKiem");
  if (!searchForm) return;
  const searchToggle = document.getElementById("nutMoTimKiem");
  const searchInput = searchForm.querySelector('input[type="search"]');
  if (!searchToggle || !searchInput) return;

  function closeSearch() {
    searchForm.classList.remove("dang-mo");
    searchToggle.setAttribute("aria-expanded", "false");
    searchToggle.setAttribute("aria-label", "Mở tìm kiếm");
  }

  searchToggle.addEventListener("click", function () {
    const isOpen = searchForm.classList.toggle("dang-mo");
    searchToggle.setAttribute("aria-expanded", String(isOpen));
    searchToggle.setAttribute(
      "aria-label",
      isOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm",
    );
    if (isOpen) searchInput.focus();
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
});
// hiển thị trang khi tải
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("danhSachSanPham") === null) {
    return;
  }
  const searchInput = document.getElementById("timKiem");
  searchInput.value = "";
  document.getElementById("timTrongDanhMuc").value = "";
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
});
