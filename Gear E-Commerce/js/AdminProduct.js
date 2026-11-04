function maHoa(text) {
    var value = String(text);

    value = value.replace(/&/g, "&amp;");
    value = value.replace(/</g, "&lt;");
    value = value.replace(/>/g, "&gt;");
    value = value.replace(/"/g, "&quot;");
    value = value.replace(/'/g, "&#39;");

    return value;
}

const getProduct = async () => {
    try {
        const response = await fetch("ProductControllers.aspx", {
            method: "GET",
            headers: {
                "Service-Name": "GetProducts"
            }
        });
        if (response.status !== 200) {
            throw new Error("Không có danh sách sản phẩm");
        }
        return await response.json();
    }catch(error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
    }
};

const hienThiSanPham = async () => {
    var products = await getProduct();
    var html = "";
    var search = document.getElementById("searchInput").value.toLowerCase();
    var category = document.getElementById("categoryFilter").value;
    var stockFilter = document.getElementById("stockFilter").value;

    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        if (product.isDeleted == true) {
            continue;
        }
        if (product.Name.toLowerCase().indexOf(search) == -1 &&
            product.Brand.toLowerCase().indexOf(search) == -1) {
            continue;
        }
        if (category != "All" && product.Category != category) {
            continue;
        }
        var status = "";
        if (product.Stock == 0) {
            status = "Out of stock";
        } else if (product.Stock < 15) {
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
        html += "<img class='product-image' src='" + maHoa(product.Image) + "' />";
        html += "<div class='product-text'>";
        html += "<strong>" + maHoa(product.Name) + "</strong>";
        html += "<small>" + maHoa(product.Brand) + "</small>";
        html += "</div>";
        html += "</div>";
        html += "</td>";
        html += "<td>" + maHoa(product.Category) + "</td>";
        html += "<td class='price-cell'>$" + product.Price + "</td>";
        html += "<td>" + product.Stock + " units</td>";
        if (status == "In stock") {
            html += "<td><span class='status status-in'>In stock</span></td>";
        } else if (status == "Low stock") {
            html += "<td><span class='status status-low'>Low stock</span></td>";
        } else {
            html += "<td><span class='status status-out'>Out of stock</span></td>";
        }
        html += "<td><div class='action-buttons'>";
        html += "<button type='button' class='btn-action' onclick='moModalXem(" + products[i].productID + ")'>View</button>";
        html += "<button type='button' class='btn-action' onclick='moModalSua(" + products[i].productID + ")'>Edit</button>";
        html += "<button type='button' class='btn-action btn-delete' onclick='xoaSanPham(" + products[i].productID + ")'>Delete</button>";
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

const getProductById = async (id) => {
    try {
        const response = await fetch("ProductControllers.aspx?productID=" + id, {
            method: "GET",
            headers: {
                "Service-Name": "GetProductByID"
            }
        });
        if (response.status !== 200) {
            throw new Error("Không có sản phẩm");
        }
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
    } 
}

const moModalXem = async (productID) => {
    var product = await getProductById(productID);
        document.getElementById("viewImage").src = product.Image;
        document.getElementById("viewName").innerText = product.Name;
        document.getElementById("viewCategory").innerText = product.Category;
        document.getElementById("viewBrand").innerText = product.Brand;
        document.getElementById("viewPrice").innerText = "$" + product.Price;
        document.getElementById("viewStock").innerText = product.Stock;
        document.getElementById("viewDescription").innerText = product.Description;
        document.getElementById("modalOverlay").style.display = "block";
        document.getElementById("viewModal").style.display = "block";
        document.body.style.overflow = "hidden";
}

const moModalSua = async (productID) => {
    var product = await getProductById(productID);
        document.getElementById("editName").value = product.Name;
        document.getElementById("editCategory").value = product.Category;
        document.getElementById("editBrand").value = product.Brand;
        document.getElementById("editPrice").value = product.Price;
        document.getElementById("editStock").value = product.Stock;
        document.getElementById("editDescription").value = product.Description;
        editImageData = "";
        document.getElementById("editImage").value = "";
        document.getElementById("editFileName").innerText = "Current image";
        document.getElementById("modalOverlay").style.display = "block";
        document.getElementById("editModal").style.display = "block";
        document.body.style.overflow = "hidden";
}
const luuSuaSanPham = () => {
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
        if(luudulieu(products[editingIndex]) == false) {
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
