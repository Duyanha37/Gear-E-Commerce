var productId = Number(new URLSearchParams(window.location.search).get("id"));
var products = [];
var currentProduct = null;
var productLoadFailed = false;

function taoPhanTu(tagName, className, text) {
    var element = document.createElement(tagName);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}

function layMemberID() {
    var memberID = document.body.getAttribute("data-member-id") ||
        document.documentElement.getAttribute("data-member-id");

    return memberID ? String(memberID).trim() : "";
}

async function layGioHang() {
    var memberID = layMemberID();

    if (!memberID) {
        var sessionResponse = await fetch("Cart.aspx?api=cart", {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store"
        });

        if (!sessionResponse.ok) {
            throw new Error("Không thể tải giỏ hàng.");
        }

        var sessionItems = await sessionResponse.json();

        if (!Array.isArray(sessionItems)) {
            return [];
        }

        return sessionItems.map(function (item) {
            return {
                cartItemID: "",
                productID: Number(item.id),
                quantity: Number(item.soLuong) || 0
            };
        });
    }

    var response = await fetch(
        "CartControllers.aspx?memberID=" +
        encodeURIComponent(memberID),
        {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Service-Name": "GetCartItemsByMemberID"
            },
            cache: "no-store"
        }
    );

    if (!response.ok) {
        throw new Error("Không thể tải giỏ hàng.");
    }

    var cartItems = await response.json();

    if (!Array.isArray(cartItems)) {
        return [];
    }

    return cartItems.map(function (item) {
        return {
            cartItemID: String(
                item.CartID ||
                item.cartID ||
                item.CartItemID ||
                memberID
            ),
            productID: Number(
                item.ProductID ||
                item.productID
            ),
            quantity: Number(
                item.Quantity ||
                item.quantity
            ) || 0
        };
    });
}
async function themVaoGioHang(productID, quantity) {
    var memberID = layMemberID();

    if (!memberID) {
        var sessionResponse = await fetch("Cart.aspx?api=cart", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "add",
                id: Number(productID),
                quantity: quantity
            })
        });

        if (!sessionResponse.ok) {
            throw new Error("Không thể cập nhật giỏ hàng.");
        }

        return await sessionResponse.json();
    }

    var response = await fetch(
        "CartControllers.aspx?memberID=" +
        encodeURIComponent(memberID),
        {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Service-Name": "AddCartItem"
            },
            body: JSON.stringify({
                CartID: memberID,
                ProductID: String(productID),
                Quantity: Number(quantity)
            })
        }
    );

    var responseText = await response.text();

    if (!response.ok) {
        throw new Error(
            responseText || "Không thể cập nhật giỏ hàng."
        );
    }

    return responseText ? JSON.parse(responseText) : null;
}

async function capNhatGioHangThanhVien(cartItem, productID, quantity) {
    var memberID = layMemberID();

    if (!memberID || !cartItem || !cartItem.cartItemID) {
        throw new Error(
            "Không xác định được mã sản phẩm trong giỏ hàng."
        );
    }

    var baseUrl =
        "CartControllers.aspx?memberID=" +
        encodeURIComponent(memberID);

    var deleteUrl = baseUrl +
        "&cartItemID=" +
        encodeURIComponent(cartItem.cartItemID) +
        "&productID=" +
        encodeURIComponent(productID);

    var deleteResponse = await fetch(deleteUrl, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Service-Name": "DeleteCartItem"
        },
        cache: "no-store"
    });

    if (!deleteResponse.ok) {
        throw new Error(
            "Không thể xóa sản phẩm cũ trong giỏ hàng."
        );
    }

    var addResponse = await fetch(baseUrl, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Service-Name": "AddCartItem"
        },
        body: JSON.stringify({
            CartID: cartItem.cartItemID,
            ProductID: String(productID),
            Quantity: Number(quantity)
        }),
        cache: "no-store"
    });

    if (!addResponse.ok) {
        throw new Error(
            "Không thể thêm số lượng mới vào giỏ hàng."
        );
    }

    return await addResponse.text();
}

async function capNhatGioHangSession(productID, quantity) {
    var response = await fetch("Cart.aspx?api=cart", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action: "set",
            id: Number(productID),
            quantity: Number(quantity)
        })
    });

    if (!response.ok) {
        throw new Error("Không thể cập nhật giỏ hàng.");
    }

    return await response.json();
}

function chuyenDoiSanPham(apiProduct) {
    return {
        id: Number(apiProduct.productID),
        name: apiProduct.Name,
        category: apiProduct.Category,
        brand: apiProduct.Brand,
        price: Number(apiProduct.Price),
        image: apiProduct.Image,
        stock: Number(apiProduct.Stock),
        description: apiProduct.Description,
        specs: [
            { label: "Danh mục", value: apiProduct.Category },
            { label: "Tồn kho", value: String(apiProduct.Stock) }
        ]
    };
}

async function layDanhSachSanPham() {
    var response = await fetch(
        "ProductControllers.aspx",
        {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Service-Name": "GetProducts"
            },
            cache: "no-store"
        }
    );

    if (!response.ok) {
        throw new Error("Không thể tải danh sách sản phẩm.");
    }

    var apiProducts = await response.json();
    var result = [];

    if (!Array.isArray(apiProducts)) {
        return result;
    }

    for (var i = 0; i < apiProducts.length; i++) {
        result.push(chuyenDoiSanPham(apiProducts[i]));
    }

    return result;
}

async function laySanPhamHienTai() {
    products = await layDanhSachSanPham();
    currentProduct = null;

    for (var i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            currentProduct = products[i];
            break;
        }
    }
}

function dinhDangGia(price) {
    return Number(price).toLocaleString("vi-VN") + " ₫";
}

async function themSanPham(product, quantity, kiemTraTrung) {
    if (!product || product.stock < 1) {
        return {
            added: false,
            alreadyExists: false,
            exceedsStock: true
        };
    }

    var cartItems = await layGioHang();
    var existing = null;

    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].productID === product.id) {
            existing = cartItems[i];
            break;
        }
    }

    if (existing && kiemTraTrung) {
        return {
            added: false,
            alreadyExists: true,
            exceedsStock: false
        };
    }

    var currentQuantity = existing ? existing.quantity : 0;
    var requestedQuantity = Math.floor(Number(quantity) || 0);
    var availableQuantity = product.stock - currentQuantity;
    var maximumQuantity = 99 - currentQuantity;

    if (requestedQuantity < 1 ||
        requestedQuantity > availableQuantity ||
        requestedQuantity > maximumQuantity) {
        return {
            added: false,
            alreadyExists: false,
            exceedsStock: true
        };
    }

    if (existing) {
        var memberID = layMemberID();

        if (memberID) {
            await capNhatGioHangThanhVien(
                existing,
                product.id,
                currentQuantity + requestedQuantity
            );
        } else {
            await capNhatGioHangSession(
                product.id,
                currentQuantity + requestedQuantity
            );
        }
    } else {
        await themVaoGioHang(product.id, requestedQuantity);
    }

    await capNhatSoLuongGioHang();

    return {
        added: true,
        alreadyExists: false,
        exceedsStock: false
    };
}

async function capNhatSoLuongGioHang() {
    var cartItems = await layGioHang();
    var totalQuantity = 0;

    for (var i = 0; i < cartItems.length; i++) {
        totalQuantity += cartItems[i].quantity;
    }

    var countElements = document.querySelectorAll("[data-cart-count]");

    for (var i = 0; i < countElements.length; i++) {
        countElements[i].textContent = String(totalQuantity);
    }
}

function taoTheSanPham(product, label) {
    var card = taoPhanTu("article", "product-card");
    var imageLink = taoPhanTu("a", "product-card-image");
    imageLink.href = "ChiTietSanPham.aspx?id=" + product.id;

    var image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    imageLink.appendChild(image);

    if (label) {
        imageLink.appendChild(taoPhanTu("span", "product-tag", label));
    }

    var body = taoPhanTu("div", "product-card-body");
    body.appendChild(
        taoPhanTu("p", "product-card-category", product.category + " · " + product.brand)
    );

    var title = taoPhanTu("h3");
    var titleLink = taoPhanTu("a", "", product.name);
    titleLink.href = imageLink.href;
    title.appendChild(titleLink);
    body.appendChild(title);
    body.appendChild(taoPhanTu("p", "product-card-spec", product.description));

    var footer = taoPhanTu("div", "product-card-footer");
    footer.appendChild(taoPhanTu("strong", "", dinhDangGia(product.price)));

    var addButton = taoPhanTu("button", "mini-add", "Thêm vào giỏ");
    addButton.type = "button";
    addButton.disabled = product.stock < 1;

    addButton.addEventListener("click", async function () {
        try {
            var result = await themSanPham(product, 1, true);

            if (result.alreadyExists) {
                window.alert("Sản phẩm đã được thêm vào giỏ hàng rồi!");
                return;
            }

            if (result.exceedsStock) {
                addButton.textContent = "Hết hàng";
                return;
            }

            if (result.added) {
                addButton.textContent = "Đã thêm";
            }

            window.setTimeout(function () {
                addButton.textContent = "Thêm vào giỏ";
            }, 1300);
        } catch (error) {
            console.error("Lỗi thêm sản phẩm gợi ý:", error);
            addButton.textContent = "Thử lại";

            window.setTimeout(function () {
                addButton.textContent = "Thêm vào giỏ";
            }, 1500);
        }
    });

    footer.appendChild(addButton);
    body.appendChild(footer);
    card.appendChild(imageLink);
    card.appendChild(body);
    return card;
}

function hienThiSanPhamGoiY() {
    var container = document.getElementById("danhSachTuongTu");
    var addedCount = 0;

    for (var i = 0; i < products.length && addedCount < 4; i++) {
        if (currentProduct && products[i].id !== currentProduct.id
            && products[i].category === currentProduct.category) {
            var label = addedCount === 0 ? "Nổi bật" : "";
            container.appendChild(taoTheSanPham(products[i], label));
            addedCount++;
        }
    }

    for (var i = 0; i < products.length && addedCount < 4; i++) {
        if (currentProduct && products[i].id === currentProduct.id) {
            continue;
        }

        if (currentProduct && products[i].category === currentProduct.category) {
            continue;
        }

        var label = addedCount === 0 ? "Nổi bật" : "";
        container.appendChild(taoTheSanPham(products[i], label));
        addedCount++;
    }
}

function hienThiChiTietSanPham() {
    var root = document.getElementById("chiTietSanPham");
    var overview = document.getElementById("productOverview");
    var breadcrumb = document.getElementById("crumbProduct");

    if (!currentProduct) {
        var message = "Không tìm thấy sản phẩm.";

        if (productLoadFailed) {
            message = "Không tải được thông tin sản phẩm. Vui lòng thử lại.";
        }

        root.appendChild(taoPhanTu("section", "not-found", message));
        overview.textContent = "Vui lòng chọn sản phẩm khác trong danh sách.";
        hienThiSanPhamGoiY();
        return;
    }

    breadcrumb.textContent = currentProduct.name;
    overview.textContent = currentProduct.description;

    var layout = taoPhanTu("section", "product-layout");
    var gallery = taoPhanTu("div", "product-gallery");
    var thumbnails = taoPhanTu("div", "product-thumbnails");
    var mainImageFrame = taoPhanTu("div", "main-image-frame");
    var mainImage = document.createElement("img");
    mainImage.src = currentProduct.image;
    mainImage.alt = currentProduct.name;
    mainImageFrame.appendChild(mainImage);

    for (var i = 0; i < 3; i++) {
        var thumbnailClass = "product-thumbnail";

        if (i === 0) {
            thumbnailClass += " selected";
        }

        var thumbnail = taoPhanTu("button", thumbnailClass);
        thumbnail.type = "button";
        thumbnail.setAttribute("aria-label", "Ảnh sản phẩm " + (i + 1));

        var thumbnailImage = document.createElement("img");
        thumbnailImage.src = currentProduct.image;
        thumbnailImage.alt = "";
        thumbnail.appendChild(thumbnailImage);

        thumbnail.addEventListener("click", function (event) {
            mainImage.src = currentProduct.image;

            var allThumbnails = thumbnails.querySelectorAll(".product-thumbnail");

            for (var j = 0; j < allThumbnails.length; j++) {
                allThumbnails[j].classList.remove("selected");
            }

            event.currentTarget.classList.add("selected");
        });

        thumbnails.appendChild(thumbnail);
    }

    gallery.appendChild(thumbnails);
    gallery.appendChild(mainImageFrame);

    var info = taoPhanTu("section", "product-info");
    info.appendChild(
        taoPhanTu("p", "product-category", currentProduct.category + " · " + currentProduct.brand)
    );
    info.appendChild(taoPhanTu("h1", "product-title", currentProduct.name));

    var rating = taoPhanTu("div", "product-rating");
    var stars = taoPhanTu("span", "rating-stars", "☆☆☆☆☆");
    stars.setAttribute("aria-label", "Chưa có đánh giá");
    rating.appendChild(stars);
    rating.appendChild(taoPhanTu("strong", "", "—"));
    rating.appendChild(taoPhanTu("span", "rating-count", "(0 đánh giá)"));
    info.appendChild(rating);

    info.appendChild(taoPhanTu("p", "product-price", dinhDangGia(currentProduct.price)));

    var stockText = "Hết hàng";

    if (currentProduct.stock > 0) {
        stockText = "Còn hàng · " + currentProduct.stock + " sản phẩm";
    }

    var stock = taoPhanTu("p", "stock-status", stockText);

    if (currentProduct.stock < 1) {
        stock.classList.add("out-of-stock");
    }

    info.appendChild(stock);
    info.appendChild(taoPhanTu("p", "product-description", currentProduct.description));

    var specs = taoPhanTu("div", "spec-grid");

    for (var i = 0; i < currentProduct.specs.length; i++) {
        var specBox = taoPhanTu("div", "spec-box");
        specBox.appendChild(taoPhanTu("span", "", currentProduct.specs[i].label));
        specBox.appendChild(taoPhanTu("strong", "", currentProduct.specs[i].value));
        specs.appendChild(specBox);
    }

    info.appendChild(specs);

    var actions = taoPhanTu("div", "product-actions");
    var quantityControl = taoPhanTu("div", "quantity-control");
    var minusButton = taoPhanTu("button", "", "−");
    minusButton.type = "button";
    minusButton.setAttribute("aria-label", "Giảm số lượng");

    var quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = "1";
    quantityInput.max = String(Math.max(1, Math.min(99, currentProduct.stock)));
    quantityInput.value = "1";
    quantityInput.setAttribute("aria-label", "Số lượng");

    var plusButton = taoPhanTu("button", "", "+");
    plusButton.type = "button";
    plusButton.setAttribute("aria-label", "Tăng số lượng");

    function kiemTraSoLuong() {
        var quantity = Math.floor(Number(quantityInput.value) || 1);
        var maximum = Number(quantityInput.max);

        if (quantity < 1) {
            quantity = 1;
        }

        if (quantity > maximum) {
            quantity = maximum;
        }

        quantityInput.value = String(quantity);
    }

    minusButton.addEventListener("click", function () {
        quantityInput.value = String(Math.max(1, Number(quantityInput.value) - 1));
    });

    plusButton.addEventListener("click", function () {
        quantityInput.value = String(
            Math.min(Number(quantityInput.max), Number(quantityInput.value) + 1)
        );
    });

    quantityInput.addEventListener("change", kiemTraSoLuong);
    quantityControl.appendChild(minusButton);
    quantityControl.appendChild(quantityInput);
    quantityControl.appendChild(plusButton);

    var addButton = taoPhanTu("button", "add-to-cart", "Thêm vào giỏ hàng");
    addButton.type = "button";
    addButton.disabled = currentProduct.stock < 1;
    actions.appendChild(quantityControl);
    actions.appendChild(addButton);

    var buyNowButton = taoPhanTu("button", "buy-now", "Mua ngay");
    buyNowButton.type = "button";
    buyNowButton.disabled = currentProduct.stock < 1;

    var message = taoPhanTu("p", "action-message", "");
    message.setAttribute("role", "status");

    addButton.addEventListener("click", async function () {
        var requestedQuantity = Math.floor(
            Number(quantityInput.value) || 0
        );

        if (requestedQuantity > 99) {
            window.alert(
                "Số lượng sản phẩm vượt quá giới hạn cho phép!"
            );

            message.textContent =
                "Số lượng sản phẩm không được vượt quá 99.";
            return;
        }

        kiemTraSoLuong();

        try {
            var result = await themSanPham(
                currentProduct,
                requestedQuantity,
                false
            );

            if (result.exceedsStock) {
                window.alert(
                    "Số lượng sản phẩm vượt quá số lượng hàng còn lại!"
                );

                message.textContent =
                    "Số lượng sản phẩm vượt quá số lượng hàng còn lại.";
            } else if (result.added) {
                message.textContent =
                    "Đã thêm sản phẩm vào giỏ hàng.";
            } else {
                message.textContent =
                    "Không thể thêm sản phẩm vào giỏ hàng.";
            }

        } catch (error) {
            console.error("Lỗi thêm sản phẩm vào giỏ:", error);
            message.textContent =
                "Không thể cập nhật giỏ hàng. Vui lòng thử lại.";
        }
    });

    buyNowButton.addEventListener("click", function () {
        message.textContent = "Chức năng thanh toán chưa được hoàn thiện.";
    });

    info.appendChild(actions);
    info.appendChild(buyNowButton);
    info.appendChild(message);

    var servicePoints = taoPhanTu("div", "service-points");
    servicePoints.appendChild(
        taoGhiChuDichVu(
            "Giao hàng miễn phí cho đơn trên 2.475.000 ₫",
            "M2 5h10v9H2z M12 8h3l3 3v3h-6z M5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        )
    );
    servicePoints.appendChild(
        taoGhiChuDichVu(
            "Bảo hành giới hạn 2 năm",
            "M10 2.5 16 5v4.4c0 3.8-2.4 6.6-6 8.1-3.6-1.5-6-4.3-6-8.1V5l6-2.5Z M7.4 9.9l1.7 1.7 3.6-3.8"
        )
    );
    info.appendChild(servicePoints);

    layout.appendChild(gallery);
    layout.appendChild(info);
    root.appendChild(layout);

    hienThiSanPhamGoiY();
}

function taoGhiChuDichVu(text, pathData) {
    var note = taoPhanTu("p", "");
    var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 20 20");
    icon.setAttribute("aria-hidden", "true");

    var shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    shape.setAttribute("d", pathData);
    icon.appendChild(shape);

    note.appendChild(icon);
    note.appendChild(document.createTextNode(text));
    return note;
}

function caiDatTimKiem() {
    var searchForm = document.getElementById("formTimKiem");
    var searchToggle = document.getElementById("nutMoTimKiem");

    if (!searchForm || !searchToggle) {
        return;
    }

    var searchInput = searchForm.querySelector('input[type="search"]');

    if (!searchInput) {
        return;
    }

    searchToggle.addEventListener("click", function () {
        var isOpen = searchForm.classList.toggle("dang-mo");
        searchToggle.setAttribute("aria-expanded", String(isOpen));

        if (isOpen) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            searchForm.classList.remove("dang-mo");
            searchToggle.setAttribute("aria-expanded", "false");
            searchToggle.focus();
        }
    });
}

async function khoiTaoTrang() {
    try {
        await laySanPhamHienTai();
    } catch (error) {
        productLoadFailed = true;
        currentProduct = null;
        products = [];
    }

    hienThiChiTietSanPham();

    try {
        await capNhatSoLuongGioHang();
    } catch (error) {

    }

    caiDatTimKiem();
}

document.addEventListener("DOMContentLoaded", khoiTaoTrang);
