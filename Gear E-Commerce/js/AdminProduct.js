var products = [
    {
        id: 1,
        name: "GeForce RTX 4080 Super",
        brand: "NVIDIA",
        category: "GPU",
        price: 999,
        stock: 18,
        description: "16GB GDDR6X - 2.55GHz",
        image: "../assets/images/gpu.png",
        isDeleted: false
    },
    {
        id: 2,
        name: "Ryzen 9 7950X3D",
        brand: "AMD",
        category: "CPU",
        price: 599,
        stock: 32,
        description: "16 cores - 32 threads",
        image: "../assets/images/cpu.png",
        isDeleted: false
    },
    {
        id: 3,
        name: "ROG Strix X670E-E",
        brand: "ASUS",
        category: "Motherboard",
        price: 469,
        stock: 12,
        description: "AMD AM5 - ATX Motherboard",
        image: "../assets/images/motherboard.png",
        isDeleted: false
    },
    {
        id: 4,
        name: "Vengeance RGB 32GB",
        brand: "Corsair",
        category: "RAM",
        price: 129,
        stock: 44,
        description: "DDR5 RGB Memory 32GB",
        image: "../assets/images/ram.png",
        isDeleted: false
    },
    {
        id: 5,
        name: "990 PRO NVMe 2TB",
        brand: "Samsung",
        category: "SSD",
        price: 179,
        stock: 27,
        description: "PCIe 4.0 NVMe SSD",
        image: "../assets/images/NVME.png",
        isDeleted: false
    },
    {
        id: 6,
        name: "RM1000x Shift",
        brand: "Corsair",
        category: "Power Supply",
        price: 209,
        stock: 21,
        description: "1000W 80 Plus Gold",
        image: "../assets/images/psu.jpg",
        isDeleted: false
    },
    {
        id: 7,
        name: "Core i9-14900K",
        brand: "Intel",
        category: "CPU",
        price: 549,
        stock: 8,
        description: "24 cores - 32 threads",
        image: "../assets/images/cpu.png",
        isDeleted: false
    },
    {
        id: 8,
        name: "GeForce RTX 4070 Ti",
        brand: "ASUS",
        category: "GPU",
        price: 799,
        stock: 15,
        description: "12GB GDDR6X",
        image: "../assets/images/gpu.png",
        isDeleted: false
    }
];

var savedData = localStorage.getItem("gearProducts");
if (savedData != null) {
    products = JSON.parse(savedData);
}
var editingIndex = -1;
var addImageData = "";
var editImageData = "";

function luuDuLieu() {
    try {
        localStorage.setItem("gearProducts", JSON.stringify(products));
        return true;
    } catch (error) {
        alert("Khong the luu du lieu, bo nho co the da day!");
        return false;
    }
}

function maHoa(text) {
    var value = String(text);

    value = value.replace(/&/g, "&amp;");
    value = value.replace(/</g, "&lt;");
    value = value.replace(/>/g, "&gt;");
    value = value.replace(/"/g, "&quot;");
    value = value.replace(/'/g, "&#39;");

    return value;
}

function hienThiSanPham() {
    var html = "";

    var search = document.getElementById("searchInput").value.toLowerCase();
    var category = document.getElementById("categoryFilter").value;
    var stockFilter = document.getElementById("stockFilter").value;

    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        if (product.isDeleted == true) {
            continue;
        }
        if (product.name.toLowerCase().indexOf(search) == -1 &&
            product.brand.toLowerCase().indexOf(search) == -1) {
            continue;
        }
        if (category != "All" && product.category != category) {
            continue;
        }
        var status = "";
        if (product.stock == 0) {
            status = "Out of stock";
        } else if (product.stock < 15) {
            status = "Low stock";
        } else {
            status = "In stock";
        }
        if (stockFilter != "All" && stockFilter != status) {
            continue;
        }

        html += "<tr>";
        html += "<td>";
        html += "<div class='product-info'>";
        html += "<img class='product-image' src='" + maHoa(product.image) + "' />";
        html += "<div class='product-text'>";
        html += "<strong>" + maHoa(product.name) + "</strong>";
        html += "<small>" + maHoa(product.brand) + "</small>";
        html += "</div>";
        html += "</div>";
        html += "</td>";
        html += "<td>" + maHoa(product.category) + "</td>";
        html += "<td class='price-cell'>$" + product.price + "</td>";
        html += "<td>" + product.stock + " units</td>";
        if (status == "In stock") {
            html += "<td><span class='status status-in'>In stock</span></td>";
        } else if (status == "Low stock") {
            html += "<td><span class='status status-low'>Low stock</span></td>";
        } else {
            html += "<td><span class='status status-out'>Out of stock</span></td>";
        }
        html += "<td><div class='action-buttons'>";
        html += "<button type='button' class='btn-action' onclick='moModalXem(" + i + ")'>View</button>";
        html += "<button type='button' class='btn-action' onclick='moModalSua(" + i + ")'>Edit</button>";
        html += "<button type='button' class='btn-action btn-delete' onclick='xoaSanPham(" + i + ")'>Delete</button>";
        html += "</div></td>";
        html += "</tr>";
    }
    if (html == "") {
        html = "<tr><td colspan='6' class='empty-row'>No products found</td></tr>";
    }
    document.getElementById("productTable").innerHTML = html;
}
    function locSanPham() {
        hienThiSanPham();
    }
    function dongModal() {
        document.getElementById("modalOverlay").style.display = "none";
        document.getElementById("viewModal").style.display = "none";
        document.getElementById("editModal").style.display = "none";
        document.getElementById("addModal").style.display = "none";
        document.body.style.overflow = "";
    }
    function moModalXem(i) {
        var product = products[i];
        document.getElementById("viewImage").src = product.image;
        document.getElementById("viewName").innerText = product.name;
        document.getElementById("viewCategory").innerText = product.category;
        document.getElementById("viewBrand").innerText = product.brand;
        document.getElementById("viewPrice").innerText = "$" + product.price;
        document.getElementById("viewStock").innerText = product.stock;
        document.getElementById("viewDescription").innerText = product.description;
        document.getElementById("modalOverlay").style.display = "block";
        document.getElementById("viewModal").style.display = "block";
        document.body.style.overflow = "hidden";
    }
    function moModalSua(i) {
        editingIndex = i;
        document.getElementById("editName").value = products[i].name;
        document.getElementById("editCategory").value = products[i].category;
        document.getElementById("editBrand").value = products[i].brand;
        document.getElementById("editPrice").value = products[i].price;
        document.getElementById("editStock").value = products[i].stock;
        document.getElementById("editDescription").value = products[i].description;
        editImageData = "";
        document.getElementById("editImage").value = "";
        document.getElementById("editFileName").innerText = "Current image";
        document.getElementById("modalOverlay").style.display = "block";
        document.getElementById("editModal").style.display = "block";
        document.body.style.overflow = "hidden";
    }
    function luuSuaSanPham() {
        var name = document.getElementById("editName").value.trim();
        var category = document.getElementById("editCategory").value;
        var brand = document.getElementById("editBrand").value.trim();
        var price = Number(document.getElementById("editPrice").value);
        var stock = Number(document.getElementById("editStock").value);
        var description = document.getElementById("editDescription").value.trim();
        if (name == "" || brand == "" || description == "" ||
            document.getElementById("editPrice").value == "" ||
            document.getElementById("editStock").value == "" ||
            price < 0 || stock < 0 || stock % 1 != 0) {
            alert("Vui lòng điền thông tin hợp lệ!");
            return;
        }
        var oldProduct = products[editingIndex];
        var newProduct = {
            id: oldProduct.id,
            name: name,
            brand: brand,
            category: category,
            price: price,
            stock: stock,
            description: description,
            image: oldProduct.image,
            isDeleted: false
        };
        if (editImageData != "") {
            newProduct.image = editImageData;
        }
        products[editingIndex] = newProduct;
        if (luuDuLieu() == false) {
            products[editingIndex] = oldProduct;
            return;
        }
        hienThiSanPham();
        dongModal();
        alert("Sản phẩm đã được cập nhật thành công!");
    }

    function moModalThem() {
        document.getElementById("addForm").reset();
        document.getElementById("addFileName").innerText = "";
        addImageData = "";
        document.getElementById("modalOverlay").style.display = "block";
        document.getElementById("addModal").style.display = "block";
        document.body.style.overflow = "hidden";
    }

    function themSanPham() {
        var name = document.getElementById("addName").value.trim();
        var category = document.getElementById("addCategory").value;
        var brand = document.getElementById("addBrand").value.trim();
        var price = Number(document.getElementById("addPrice").value);
        var stock = Number(document.getElementById("addStock").value);
        var description = document.getElementById("addDescription").value.trim();
        if (name == "" || brand == "" || description == "" ||
            document.getElementById("addPrice").value == "" ||
            document.getElementById("addStock").value == "" ||
            price < 0 || stock < 0 || stock % 1 != 0) {
            alert("Vui lòng điền thông tin hợp lệ!");
            return;
        }
        if (addImageData == "") {
            alert("Vui lòng chọn một hình ảnh sản phẩm!");
            return;
        }
        var maxId = 0;
        for (var i = 0; i < products.length; i++) {
            if (products[i].id > maxId) {
                maxId = products[i].id;
            }
        }
        var newProduct = {
            id: maxId + 1,
            name: name,
            brand: brand,
            category: category,
            price: price,
            stock: stock,
            description: description,
            image: addImageData,
            isDeleted: false
        };
        products.push(newProduct);
        if (luuDuLieu() == false) {
            products.pop();
            return;
        }
        hienThiSanPham();
        dongModal();
        alert("Sản phẩm đã được thêm thành công!");
    }
    function xoaSanPham(i) {
        var result = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
        if (result == true) {
            products[i].isDeleted = true;
            if (luuDuLieu() == false) {
                products[i].isDeleted = false;
                return;
            }
            hienThiSanPham();
            alert("Sản phẩm đã được xóa thành công!");
        }
    }
    function chonAnh(type) {
        var input = document.getElementById(type + "Image");
        if (input.files.length == 0) {
            return;
        }
        var file = input.files[0];

        if (file.type != "image/png" && file.type != "image/jpeg") {
            alert("Chỉ cho phép chọn hình ảnh PNG và JPG!");
            input.value = "";
            return;
        }
        if (file.size > 1024 * 1024) {
            alert("Hình ảnh phải nhỏ hơn 1MB!");
            input.value = "";
            return;
        }
        var reader = new FileReader();
        reader.onload = function () {
            if (type == "add") {
                addImageData = reader.result;
            } else {
                editImageData = reader.result;
            }
            document.getElementById(type + "FileName").innerText = file.name;
        };
        reader.readAsDataURL(file);
    }
    function moSidebar() {
        document.getElementById("sidebar").classList.add("show");
        document.getElementById("sidebarOverlay").classList.add("show");
    }
    function dongSidebar() {
        document.getElementById("sidebar").classList.remove("show");
        document.getElementById("sidebarOverlay").classList.remove("show");
    }

    window.onload = function () {
        hienThiSanPham();
    };
