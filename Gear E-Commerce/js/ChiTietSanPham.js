function layMemberID() {
    var memberID = document.body.getAttribute("data-member-id") ||
        document.documentElement.getAttribute("data-member-id");

    if (!memberID && window.gearMemberID !== undefined) {
        memberID = window.gearMemberID;
    }

    if (!memberID) {
        var memberInput = document.getElementById("memberID");
        if (memberInput) {
            memberID = memberInput.value;
        }
    }

    return memberID ? String(memberID).trim() : "";
}

function chuanHoaSanPham(product) {
    return {
        productID: String(product.productID),
        Name: product.Name || "",
        Brand: product.Brand || "",
        Description: product.Description || "",
        Price: Number(product.Price) || 0,
        Stock: Number(product.Stock) || 0,
        Category: product.Category || "",
        Image: product.Image || "",
        isDelete: product.isDelete === true || product.isDeleted === true
    };
}

const getProductByID = async (productID) => {
    // TODO: ProductControllers.aspx.cs đang đọc Application["Products"],
    // trong khi Global.asax.cs khởi tạo Application["ProductList"].
    // Cần thống nhất khóa phía controller để API chi tiết trả sản phẩm.
    try {
        var response = await fetch("ProductControllers.aspx?productID=" + encodeURIComponent(productID), {
            method: "GET",
            headers: {
                "Service-Name": "GetProductByID"
            },
            credentials: "same-origin"
        });

        if (!response.ok) {
            throw new Error("Không tìm thấy sản phẩm.");
        }

        var product = await response.json();
        if (!product || product.isDelete === true || product.isDeleted === true) {
            throw new Error("Sản phẩm không tồn tại.");
        }

        return chuanHoaSanPham(product);
    } catch (error) {
        console.error("Lỗi lấy sản phẩm theo mã:", error);
        throw error;
    }
};

const getProducts = async () => {
    var response = await fetch("ProductControllers.aspx", {
        method: "GET",
        headers: {
            "Service-Name": "GetProducts"
        },
        credentials: "same-origin"
    });

    if (!response.ok) {
        throw new Error("Không thể lấy danh sách sản phẩm.");
    }

    var products = await response.json();
    if (!Array.isArray(products)) {
        throw new Error("API không trả về danh sách sản phẩm.");
    }

    return products.map(chuanHoaSanPham).filter(product => !product.isDelete);
};

const getCartByMember = async (memberID) => {
    // TODO: CartControllers.aspx.cs đang đọc Application["CartMembers"],
    // trong khi Global.asax.cs khởi tạo Application["CartMemberList"].
    // Cần thống nhất khóa phía controller để API thành viên hoạt động.
    var response = await fetch("CartControllers.aspx?memberID=" + encodeURIComponent(memberID), {
        method: "GET",
        headers: {
            "Service-Name": "GetCartItemsByMemberID"
        },
        credentials: "same-origin"
    });

    if (!response.ok) {
        throw new Error("Không thể lấy giỏ hàng của thành viên.");
    }

    var items = await response.json();
    if (!Array.isArray(items)) {
        throw new Error("API không trả về danh sách giỏ hàng.");
    }

    return items.map(item => ({
        CartID: String(item.CartID),
        ProductID: String(item.ProductID),
        Quantity: Math.max(0, Number(item.Quantity) || 0)
    }));
};

const getCartBySession = async () => {
    var response = await fetch("Cart.aspx?api=cart", {
        method: "GET",
        credentials: "same-origin"
    });

    if (!response.ok) {
        throw new Error("Không thể lấy giỏ hàng.");
    }

    var items = await response.json();
    if (!Array.isArray(items)) {
        throw new Error("API không trả về danh sách giỏ hàng.");
    }

    return items.map(item => ({
        ProductID: String(item.id),
        Quantity: Math.max(0, Number(item.soLuong) || 0)
    }));
};

const getCart = async () => {
    var memberID = layMemberID();

    if (memberID) {
        return {
            items: await getCartByMember(memberID),
            memberID: memberID,
            isMemberCart: true
        };
    }

    // TODO: ChiTietSanPham.aspx hiện chưa render memberID từ Session vào HTML.
    // Khi trang cung cấp memberID, nhánh trên sẽ dùng CartControllers.aspx.
    // Tạm thời dùng API session hiện có để giỏ hàng vẫn hoạt động.
    return {
        items: await getCartBySession(),
        memberID: "",
        isMemberCart: false
    };
};

const guiLenhGioHangSession = async (action, productID, quantity) => {
    var response = await fetch("Cart.aspx?api=cart", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action: action,
            id: Number(productID),
            quantity: quantity
        })
    });

    var result = await response.json();
    if (!response.ok) {
        throw new Error(result.error || "Không thể cập nhật giỏ hàng.");
    }

    return result;
};

const guiLenhGioHangThanhVien = async (action, memberID, item, quantity) => {
    var method = "POST";
    var serviceName = "";
    var url = "CartControllers.aspx?memberID=" + encodeURIComponent(memberID);
    var body = null;

    if (action === "add") {
        serviceName = "AddCartItem";
        body = JSON.stringify({
            CartID: item.CartID || memberID,
            ProductID: item.ProductID,
            Quantity: quantity
        });
    } else if (action === "update") {
        serviceName = "UpdateCartItems";
        method = "PUT";
        body = JSON.stringify({
            CartID: item.CartID,
            ProductID: item.ProductID,
            Quantity: quantity
        });
    } else if (action === "remove") {
        serviceName = "DeleteCartItem";
        url += "&cartItemID=" + encodeURIComponent(item.CartID) +
            "&productID=" + encodeURIComponent(item.ProductID);
    }

    var options = {
        method: method,
        headers: {
            "Service-Name": serviceName
        },
        credentials: "same-origin"
    };

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = body;
    }

    var response = await fetch(url, options);
    if (!response.ok) {
        throw new Error("Không thể cập nhật giỏ hàng thành viên.");
    }

    return response;
};

const formatPrice = (price) => Number(price).toLocaleString("vi-VN") + " ₫";

const taoThe = (tag, className, text) => {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
};

async function capNhatSoLuongGio() {
    var cart = await getCart();
    var totalItems = cart.items.reduce(function (total, item) {
        return total + item.Quantity;
    }, 0);

    document.querySelectorAll("[data-cart-count]").forEach(function (element) {
        element.textContent = String(totalItems);
    });
}

async function themVaoGio(product, requestedQuantity) {
    var cart = await getCart();
    var item = cart.items.find(function (cartItem) {
        return cartItem.ProductID === product.productID;
    });
    var currentQuantity = item ? item.Quantity : 0;
    var availableQuantity = Math.min(product.Stock - currentQuantity, 99 - currentQuantity);
    var quantity = Math.min(Math.floor(Number(requestedQuantity) || 0), availableQuantity);

    if (quantity < 1) {
        throw new Error("Số lượng yêu cầu vượt quá tồn kho.");
    }

    if (cart.isMemberCart && item) {
        await guiLenhGioHangThanhVien("update", cart.memberID, item, currentQuantity + quantity);
    } else if (cart.isMemberCart) {
        await guiLenhGioHangThanhVien("add", cart.memberID, {
            CartID: cart.memberID,
            ProductID: product.productID
        }, quantity);
    } else {
        await guiLenhGioHangSession("add", product.productID, quantity);
    }

    await capNhatSoLuongGio();
    return true;
}

function taoTheGoiY(product, label) {
    var card = taoThe("article", "product-card");
    var imageLink = taoThe("a", "product-card-image");
    imageLink.href = "ChiTietSanPham.aspx?id=" + encodeURIComponent(product.productID);

    if (product.Image) {
        var image = document.createElement("img");
        image.src = product.Image;
        image.alt = product.Name;
        image.loading = "lazy";
        imageLink.appendChild(image);
    }
    if (label) imageLink.appendChild(taoThe("span", "product-tag", label));

    var body = taoThe("div", "product-card-body");
    body.appendChild(taoThe("p", "product-card-category", product.Brand
        ? product.Category + " · " + product.Brand
        : product.Category));

    var title = taoThe("h3");
    var titleLink = taoThe("a", "", product.Name);
    titleLink.href = imageLink.href;
    title.appendChild(titleLink);
    body.append(title, taoThe("p", "product-card-spec", product.Description));

    var footer = taoThe("div", "product-card-footer");
    footer.appendChild(taoThe("strong", "", formatPrice(product.Price)));
    var addButton = taoThe("button", "mini-add", product.Stock > 0 ? "Thêm vào giỏ" : "Hết hàng");
    addButton.type = "button";
    addButton.disabled = product.Stock < 1;
    addButton.addEventListener("click", async function () {
        try {
            await themVaoGio(product, 1);
            addButton.textContent = "Đã thêm";
            window.setTimeout(function () {
                addButton.textContent = "Thêm vào giỏ";
            }, 1200);
        } catch (error) {
            addButton.textContent = "Thử lại";
            window.setTimeout(function () {
                addButton.textContent = "Thêm vào giỏ";
            }, 1500);
        }
    });
    footer.appendChild(addButton);
    body.appendChild(footer);
    card.append(imageLink, body);
    return card;
}

function hienThiGoiY(products, currentProduct) {
    var container = document.getElementById("danhSachTuongTu");
    if (!container) return;

    container.replaceChildren();
    var relatedProducts = products.filter(function (product) {
        return product.productID !== currentProduct.productID &&
            product.Category === currentProduct.Category;
    });
    var otherProducts = products.filter(function (product) {
        return product.productID !== currentProduct.productID &&
            product.Category !== currentProduct.Category;
    });

    relatedProducts.concat(otherProducts).slice(0, 4).forEach(function (product, index) {
        container.appendChild(taoTheGoiY(product, index === 0 ? "Gợi ý" : ""));
    });
}

function hienThiChiTiet(product, products) {
    var root = document.getElementById("chiTietSanPham");
    var overview = document.getElementById("productOverview");
    var crumb = document.getElementById("crumbProduct");
    if (!root) return;

    root.replaceChildren();
    if (crumb) crumb.textContent = product.Name;
    if (overview) overview.textContent = product.Description;

    var layout = taoThe("section", "product-layout");
    var gallery = taoThe("div", "product-gallery");
    var imageFrame = taoThe("div", "main-image-frame");

    if (product.Image) {
        var image = document.createElement("img");
        image.src = product.Image;
        image.alt = product.Name;
        imageFrame.appendChild(image);
    }
    gallery.appendChild(imageFrame);

    var info = taoThe("section", "product-info");
    var categoryText = product.Brand
        ? product.Category + " · " + product.Brand
        : product.Category;
    info.appendChild(taoThe("p", "product-category", categoryText));
    info.appendChild(taoThe("h1", "product-title", product.Name));
    info.appendChild(taoThe("p", "product-price", formatPrice(product.Price)));

    var stockText = product.Stock > 0
        ? "Còn hàng · " + product.Stock + " sản phẩm"
        : "Hết hàng";
    var stock = taoThe("p", "stock-status", stockText);
    if (product.Stock < 1) stock.classList.add("out-of-stock");
    info.append(stock, taoThe("p", "product-description", product.Description));

    var actions = taoThe("div", "product-actions");
    var quantity = taoThe("div", "quantity-control");
    var minus = taoThe("button", "", "−");
    minus.type = "button";
    minus.setAttribute("aria-label", "Giảm số lượng");

    var input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.max = String(Math.max(1, Math.min(99, product.Stock)));
    input.value = "1";
    input.setAttribute("aria-label", "Số lượng");

    var plus = taoThe("button", "", "+");
    plus.type = "button";
    plus.setAttribute("aria-label", "Tăng số lượng");

    const chuanHoaSoLuong = () => {
        input.value = String(Math.min(Number(input.max), Math.max(1, Math.floor(Number(input.value) || 1))));
    };

    minus.addEventListener("click", function () {
        input.value = String(Math.max(1, Number(input.value) - 1));
    });
    plus.addEventListener("click", function () {
        input.value = String(Math.min(Number(input.max), Number(input.value) + 1));
    });
    input.addEventListener("change", chuanHoaSoLuong);
    quantity.append(minus, input, plus);

    var addButton = taoThe("button", "add-to-cart", "Thêm vào giỏ");
    addButton.type = "button";
    addButton.disabled = product.Stock < 1;
    actions.append(quantity, addButton);

    var buyNow = taoThe("button", "buy-now", "Mua ngay");
    buyNow.type = "button";
    buyNow.disabled = product.Stock < 1;
    var message = taoThe("p", "action-message", "");
    message.setAttribute("role", "status");

    addButton.addEventListener("click", async function () {
        chuanHoaSoLuong();
        try {
            await themVaoGio(product, Number(input.value));
            message.textContent = "Đã thêm sản phẩm vào giỏ hàng.";
        } catch (error) {
            message.textContent = "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.";
        }
    });

    buyNow.addEventListener("click", function () {
        message.textContent = "Chức năng thanh toán chưa có trong bản demo.";
    });

    info.append(actions, buyNow, message);
    layout.append(gallery, info);
    root.appendChild(layout);
    hienThiGoiY(products, product);
}

document.addEventListener("DOMContentLoaded", async function () {
    var productID = new URLSearchParams(window.location.search).get("id");
    var root = document.getElementById("chiTietSanPham");
    var overview = document.getElementById("productOverview");
    var product;
    var products;

    if (!root) return;

    try {
        if (!productID) {
            throw new Error("Thiếu mã sản phẩm.");
        }

        product = await getProductByID(productID);
        products = await getProducts();
        hienThiChiTiet(product, products);
        await capNhatSoLuongGio();
    } catch (error) {
        root.replaceChildren(taoThe("section", "not-found", "Không tải được sản phẩm."));
        if (overview) {
            overview.textContent = "Vui lòng thử lại sau hoặc quay về danh sách sản phẩm.";
        }
        console.error("Lỗi tải trang chi tiết sản phẩm:", error);
    }
});
