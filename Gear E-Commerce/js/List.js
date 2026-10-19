// danh sách sản phẩm của trang list
const productList = [
  {
    productID: "1",
    Name: "GeForce RTX 4080 Super",
    Description: "16GB GDDR6X graphics card",
    Price: 999,
    Stock: 12,
    Category: "GPU",
    Image: "",
  },
  {
    productID: "2",
    Name: "Ryzen 9 7950X3D",
    Description: "16-Core processor for high performance",
    Price: 599,
    Stock: 18,
    Category: "CPU",
    Image: "",
  },
  {
    productID: "3",
    Name: "ROG Strix X670E-E",
    Description: "AM5 motherboard with Wi-Fi 6E",
    Price: 469,
    Stock: 9,
    Category: "Motherboard",
    Image: "",
  },
  {
    productID: "4",
    Name: "Vengeance RGB 32GB",
    Description: "DDR5 6000MHz memory kit",
    Price: 129,
    Stock: 30,
    Category: "RAM",
    Image: "",
  },
  {
    productID: "5",
    Name: "990 PRO NVMe 2TB",
    Description: "7450MB/s PCIe 4.0 storage",
    Price: 179,
    Stock: 16,
    Category: "SSD",
    Image: "",
  },
  {
    productID: "6",
    Name: "RM1000x Shift",
    Description: "1000W 80 Plus Gold power supply",
    Price: 209,
    Stock: 14,
    Category: "Power Supply",
    Image: "",
  },
  {
    productID: "7",
    Name: "RGB Gaming Fan 120mm",
    Description: "Quiet cooling fan with RGB light",
    Price: 29,
    Stock: 40,
    Category: "Accessories",
    Image: "",
  },
  {
    productID: "8",
    Name: "Intel Core i9-14900K",
    Description: "24-Core processor for gaming and work",
    Price: 549,
    Stock: 11,
    Category: "CPU",
    Image: "",
  },
  {
    productID: "9",
    Name: "GeForce RTX 4070 Ti",
    Description: "12GB GDDR6X graphics card",
    Price: 799,
    Stock: 8,
    Category: "GPU",
    Image: "",
  },
  {
    productID: "10",
    Name: "Fury Beast DDR5 32GB",
    Description: "DDR5 memory kit 5600MHz",
    Price: 109,
    Stock: 24,
    Category: "RAM",
    Image: "",
  },
  {
    productID: "11",
    Name: "B650 AORUS Elite AX",
    Description: "AM5 motherboard with Wi-Fi",
    Price: 229,
    Stock: 13,
    Category: "Motherboard",
    Image: "",
  },
  {
    productID: "12",
    Name: "Crucial P3 Plus 1TB",
    Description: "PCIe 4.0 NVMe storage",
    Price: 79,
    Stock: 35,
    Category: "SSD",
    Image: "",
  },
  {
    productID: "13",
    Name: "ROG Thor 850W Platinum",
    Description: "850W modular power supply",
    Price: 189,
    Stock: 7,
    Category: "Power Supply",
    Image: "",
  },
  {
    productID: "14",
    Name: "Thermal Paste Kit",
    Description: "Thermal paste for CPU cooling",
    Price: 12,
    Stock: 50,
    Category: "Accessories",
    Image: "",
  },
  {
    productID: "15",
    Name: "Ryzen 7 7800X3D",
    Description: "8-Core processor for gaming",
    Price: 389,
    Stock: 15,
    Category: "CPU",
    Image: "",
  },
  {
    productID: "16",
    Name: "Radeon RX 7900 XTX",
    Description: "24GB graphics card for 4K gaming",
    Price: 899,
    Stock: 6,
    Category: "GPU",
    Image: "",
  },
  {
    productID: "17",
    Name: "Dominator Titanium 64GB",
    Description: "DDR5 memory kit 6400MHz",
    Price: 219,
    Stock: 10,
    Category: "RAM",
    Image: "",
  },
  {
    productID: "18",
    Name: "MAG B760 Tomahawk",
    Description: "Intel motherboard with Wi-Fi",
    Price: 199,
    Stock: 12,
    Category: "Motherboard",
    Image: "",
  },
  {
    productID: "19",
    Name: "WD Black SN850X 2TB",
    Description: "High speed PCIe 4.0 NVMe storage",
    Price: 159,
    Stock: 21,
    Category: "SSD",
    Image: "",
  },
  {
    productID: "20",
    Name: "Focus GX 750W",
    Description: "750W 80 Plus Gold power supply",
    Price: 119,
    Stock: 19,
    Category: "Power Supply",
    Image: "",
  },
  {
    productID: "21",
    Name: "ARGB Extension Cable",
    Description: "Sleeved cable for clean PC builds",
    Price: 24,
    Stock: 28,
    Category: "Accessories",
    Image: "",
  },
  {
    productID: "22",
    Name: "Intel Core i5-14600K",
    Description: "14-Core processor for gaming",
    Price: 319,
    Stock: 20,
    Category: "CPU",
    Image: "",
  },
  {
    productID: "23",
    Name: "GeForce RTX 4060",
    Description: "8GB graphics card for 1080p gaming",
    Price: 299,
    Stock: 17,
    Category: "GPU",
    Image: "",
  },
  {
    productID: "24",
    Name: "T-Force Delta RGB 16GB",
    Description: "DDR5 memory kit 6000MHz",
    Price: 69,
    Stock: 32,
    Category: "RAM",
    Image: "",
  },
  {
    productID: "25",
    Name: "Prime B760M-A",
    Description: "Micro ATX Intel motherboard",
    Price: 139,
    Stock: 16,
    Category: "Motherboard",
    Image: "",
  },
  {
    productID: "26",
    Name: "Kingston NV2 1TB",
    Description: "PCIe 4.0 NVMe storage",
    Price: 59,
    Stock: 26,
    Category: "SSD",
    Image: "",
  },
  {
    productID: "27",
    Name: "CX650 650W",
    Description: "650W power supply for gaming PCs",
    Price: 79,
    Stock: 23,
    Category: "Power Supply",
    Image: "",
  },
  {
    productID: "28",
    Name: "Case Dust Filter Set",
    Description: "Dust filters for desktop case",
    Price: 15,
    Stock: 45,
    Category: "Accessories",
    Image: "",
  },
];

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

// hiển thị trang khi tải
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("danhSachSanPham") === null) {
    return;
  }
  document.getElementById("timKiem").value = pageState.keyword;
  document.getElementById("timTrongDanhMuc").value = pageState.keyword;
  chooseCategory();
  searchFromHeader();
  searchFromFilter();
  changeCategory();
  changeSort();
  changePrice();
  clearFilters();
  showProducts();
});

// lọc sản phẩm theo các điều kiện
function filterProducts() {
  const filteredProducts = [];
  const minPrice = Number(document.getElementById("giaThapNhat").value) || 0;
  const maxPrice = Number(document.getElementById("giaCaoNhat").value) || 0;
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
    const minMatches = product.Price >= minPrice;
    const maxMatches = maxPrice === 0 || product.Price <= maxPrice;
    if (categoryMatches && keywordMatches && minMatches && maxMatches) {
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
  const detailLink = "../html/ChiTietSanPham.html?id=" + product.productID;
  return (
    '<article class="the-san-pham">' +
    '<a class="khung-anh" href="' +
    detailLink +
    '">' +
    imageContent +
    "</a>" +
    '<p class="loai-san-pham">' +
    product.Category +
    " · GearHouse</p>" +
    "<h3>" +
    product.Name +
    "</h3>" +
    '<p class="mo-ta-san-pham">' +
    product.Description +
    "</p>" +
    '<div class="dong-gia"><b>$' +
    product.Price +
    '</b><a href="' +
    detailLink +
    '">View product</a></div>' +
    "</article>"
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

  const pageNumbers = [];
  filteredProducts.forEach(function (product, index) {
    if (index % 9 === 0) {
      pageNumbers.push(pageNumbers.length + 1);
    }
  });
  if (pageState.currentPage > pageNumbers.length) {
    pageState.currentPage = 1;
  }

  const startIndex = (pageState.currentPage - 1) * 9;
  const pageProducts = filteredProducts.slice(startIndex, startIndex + 9);
  const productContainer = document.getElementById("danhSachSanPham");
  productContainer.innerHTML = "";
  pageProducts.forEach(function (product) {
    productContainer.innerHTML =
      productContainer.innerHTML + createProductCard(product);
  });
  document.getElementById("soLuongSanPham").textContent =
    pageProducts.length + " products";
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
  document
    .getElementById("formTimKiem")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      runSearch(document.getElementById("timKiem").value.toLowerCase());
    });
}

// tìm kiếm ở khung bộ lọc
function searchFromFilter() {
  document
    .getElementById("formTimTrongDanhMuc")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      runSearch(document.getElementById("timTrongDanhMuc").value.toLowerCase());
    });
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
  document.getElementById("timKiem").value = keyword;
  document.getElementById("timTrongDanhMuc").value = keyword;
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
  document
    .getElementById("giaThapNhat")
    .addEventListener("change", function () {
      pageState.currentPage = 1;
      showProducts();
    });
  document.getElementById("giaCaoNhat").addEventListener("change", function () {
    pageState.currentPage = 1;
    showProducts();
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
    document.getElementById("giaThapNhat").value = "";
    document.getElementById("giaCaoNhat").value = "";
    document.getElementById("sapXep").value = "featured";
    chooseCategory();
    showProducts();
  });
}
