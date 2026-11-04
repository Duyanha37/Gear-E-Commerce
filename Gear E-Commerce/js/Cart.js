const FEATURED_PRODUCT_IDS = ["1", "2", "3", "4"];

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

const getProducts = async () => {
    // TODO: ProductControllers.aspx.cs đang đọc Application["Products"],
    // trong khi Global.asax.cs khởi tạo Application["ProductList"].
    // Cần thống nhất khóa phía controller để API trả danh sách sản phẩm.
    try {
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
    } catch (error) {
        console.error("Lỗi lấy danh sách sản phẩm:", error);
        throw error;
    }
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

    var cartItems = await response.json();
    if (!Array.isArray(cartItems)) {
        throw new Error("API không trả về danh sách giỏ hàng.");
    }

    return cartItems.map(item => ({
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

    var cartItems = await response.json();
    if (!Array.isArray(cartItems)) {
        throw new Error("API không trả về danh sách giỏ hàng.");
    }

    return cartItems.map(item => ({
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

    // TODO: Cart.aspx hiện chưa render memberID từ Session vào HTML.
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
    var serviceName = "";
    var method = "POST";
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

const capNhatGioHang = async (action, product, item, quantity) => {
    var cart = await getCart();

    if (cart.isMemberCart) {
        await guiLenhGioHangThanhVien(action, cart.memberID, item, quantity);
        return;
    }

    if (action === "remove") {
        await guiLenhGioHangSession("remove", product.productID, 0);
    } else if (action === "update") {
        if (quantity < 1) {
            await guiLenhGioHangSession("remove", product.productID, 0);
        } else {
            await guiLenhGioHangSession("set", product.productID, quantity);
        }
    } else if (action === "add") {
        await guiLenhGioHangSession("add", product.productID, quantity);
    }
};

function formatPrice(price) {
    return Number(price).toLocaleString("vi-VN") + " ₫";
}

function taoTheSanPham(product, label) {
    var card = document.createElement("article");
    card.className = "product-card";

    var imageLink = document.createElement("a");
    imageLink.className = "product-card-image";
    imageLink.href = "ChiTietSanPham.aspx?id=" + encodeURIComponent(product.productID);

    if (product.Image) {
        var image = document.createElement("img");
        image.src = product.Image;
        image.alt = product.Name;
        image.loading = "lazy";
        imageLink.appendChild(image);
    }

    if (label) {
        var tag = document.createElement("span");
        tag.className = "product-tag";
        tag.textContent = label;
        imageLink.appendChild(tag);
    }

    var body = document.createElement("div");
    body.className = "product-card-body";
    var category = document.createElement("p");
    category.className = "product-card-category";
    category.textContent = product.Brand
        ? product.Category + " · " + product.Brand
        : product.Category;

    var title = document.createElement("h3");
    var titleLink = document.createElement("a");
    titleLink.href = imageLink.href;
    titleLink.textContent = product.Name;
    title.appendChild(titleLink);

    var description = document.createElement("p");
    description.className = "product-card-spec";
    description.textContent = product.Description;

    var footer = document.createElement("div");
    footer.className = "product-card-footer";
    var price = document.createElement("strong");
    price.textContent = formatPrice(product.Price);

    var addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "mini-add";
    addButton.textContent = product.Stock > 0 ? "Thêm vào giỏ" : "Hết hàng";
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

    footer.append(price, addButton);
    body.append(category, title, description, footer);
    card.append(imageLink, body);
    return card;
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
    } else {
        await capNhatGioHang("add", product, item || { ProductID: product.productID }, quantity);
    }

    await capNhatSoLuongGio();
}

async function capNhatSoLuongGio() {
    try {
        var cart = await getCart();
        var totalItems = cart.items.reduce(function (total, item) {
            return total + item.Quantity;
        }, 0);

        document.querySelectorAll("[data-cart-count]").forEach(function (element) {
            element.textContent = String(totalItems);
        });
    } catch (error) {
        console.error("Lỗi cập nhật số lượng giỏ hàng:", error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    var cartList = document.getElementById("danhSachGioHang");
    var cartContent = document.getElementById("noiDungGioHang");
    var emptyState = document.getElementById("gioHangTrong");
    var recommendations = document.getElementById("danhSachNoiBat");
    var products = [];

    if (!cartList || !cartContent || !emptyState) {
        return;
    }

    const showUnavailable = (message) => {
        cartContent.hidden = true;
        emptyState.hidden = false;
        emptyState.querySelector("h2").textContent = "Không tải được giỏ hàng";
        emptyState.querySelector("p").textContent = message;
    };

    const hienThiGioHang = async () => {
        var cart;
        try {
            cart = await getCart();
        } catch (error) {
            showUnavailable("Không thể kết nối tới giỏ hàng. Vui lòng thử lại.");
            return;
        }

        cartList.replaceChildren();
        var items = cart.items.filter(function (item) {
            return products.some(function (product) {
                return product.productID === item.ProductID;
            });
        });
        var hasItems = items.length > 0;
        cartContent.hidden = !hasItems;
        emptyState.hidden = hasItems;

        if (!hasItems) {
            emptyState.querySelector("h2").textContent = "Giỏ hàng đang trống";
            emptyState.querySelector("p").textContent = "Tìm linh kiện phù hợp cho bộ máy tiếp theo của bạn.";
        }

        items.forEach(function (item) {
            var product = products.find(function (candidate) {
                return candidate.productID === item.ProductID;
            });
            if (!product) return;

            var row = document.createElement("article");
            row.className = "cart-item";
            row.dataset.productId = product.productID;
            row.dataset.cartId = item.CartID || "";

            var imageLink = document.createElement("a");
            imageLink.className = "cart-item-image";
            imageLink.href = "ChiTietSanPham.aspx?id=" + encodeURIComponent(product.productID);
            if (product.Image) {
                var image = document.createElement("img");
                image.src = product.Image;
                image.alt = product.Name;
                imageLink.appendChild(image);
            }

            var details = document.createElement("div");
            details.className = "cart-item-details";
            var category = document.createElement("p");
            category.className = "cart-item-category";
            category.textContent = product.Brand
                ? product.Category + " · " + product.Brand
                : product.Category;
            var name = document.createElement("h2");
            var nameLink = document.createElement("a");
            nameLink.href = imageLink.href;
            nameLink.textContent = product.Name;
            name.appendChild(nameLink);
            var description = document.createElement("p");
            description.className = "cart-item-spec";
            description.textContent = product.Description;
            var removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "remove-item";
            removeButton.textContent = "Xóa";
            details.append(category, name, description, removeButton);

            var purchase = document.createElement("div");
            purchase.className = "cart-item-purchase";
            var price = document.createElement("strong");
            price.className = "cart-item-price";
            price.textContent = formatPrice(product.Price);

            var quantity = document.createElement("div");
            quantity.className = "cart-quantity";
            var minus = document.createElement("button");
            minus.type = "button";
            minus.dataset.action = "decrease";
            minus.textContent = "−";
            minus.setAttribute("aria-label", "Giảm số lượng " + product.Name);
            var count = document.createElement("span");
            count.className = "quantity-value";
            count.textContent = String(item.Quantity);
            var plus = document.createElement("button");
            plus.type = "button";
            plus.dataset.action = "increase";
            plus.textContent = "+";
            plus.setAttribute("aria-label", "Tăng số lượng " + product.Name);
            plus.disabled = item.Quantity >= product.Stock || item.Quantity >= 99;
            quantity.append(minus, count, plus);

            var lineTotal = document.createElement("span");
            lineTotal.className = "cart-line-total";
            lineTotal.textContent = formatPrice(product.Price * item.Quantity);
            purchase.append(price, quantity, lineTotal);
            row.append(imageLink, details, purchase);
            cartList.appendChild(row);
        });

        capNhatTongTien(items, products);
    };

    try {
        products = await getProducts();
    } catch (error) {
        showUnavailable("Không thể tải dữ liệu sản phẩm từ máy chủ.");
        return;
    }

    if (recommendations) {
        FEATURED_PRODUCT_IDS.forEach(function (productID, index) {
            var product = products.find(function (candidate) {
                return candidate.productID === productID;
            });
            if (product) {
                recommendations.appendChild(taoTheSanPham(product, index === 0 ? "Nổi bật" : ""));
            }
        });
    }

    cartList.addEventListener("click", async function (event) {
        var button = event.target.closest("button");
        if (!button) return;

        var row = button.closest(".cart-item");
        var product = products.find(function (candidate) {
            return candidate.productID === row.dataset.productId;
        });
        if (!product) return;

        var cart = await getCart();
        var item = cart.items.find(function (cartItem) {
            return cartItem.ProductID === product.productID &&
                (!cart.isMemberCart || cartItem.CartID === row.dataset.cartId);
        });
        if (!item) return;

        try {
            if (button.classList.contains("remove-item")) {
                await capNhatGioHang("remove", product, item, 0);
            } else if (button.dataset.action === "increase") {
                if (item.Quantity < product.Stock && item.Quantity < 99) {
                    if (cart.isMemberCart) {
                        await guiLenhGioHangThanhVien("update", cart.memberID, item, item.Quantity + 1);
                    } else {
                        await guiLenhGioHangSession("add", product.productID, 1);
                    }
                }
            } else if (button.dataset.action === "decrease") {
                if (item.Quantity <= 1) {
                    await capNhatGioHang("remove", product, item, 0);
                } else {
                    await capNhatGioHang("update", product, item, item.Quantity - 1);
                }
            }

            await hienThiGioHang();
        } catch (error) {
            var message = document.getElementById("checkoutMessage");
            if (message) {
                message.textContent = "Không thể cập nhật giỏ hàng. Vui lòng thử lại.";
                message.hidden = false;
            }
        }
    });

    var checkoutButton = document.getElementById("thanhToan");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            var message = document.getElementById("checkoutMessage");
            if (message) {
                message.textContent = "Chức năng thanh toán chưa có trong bản demo.";
                message.hidden = false;
            }
        });
    }

    await hienThiGioHang();
});

function capNhatTongTien(items, products) {
    var totalItems = items.reduce(function (total, item) {
        return total + item.Quantity;
    }, 0);
    var subtotal = items.reduce(function (total, item) {
        var product = products.find(function (candidate) {
            return candidate.productID === item.ProductID;
        });
        return total + (product ? product.Price * item.Quantity : 0);
    }, 0);

    var itemCount = document.getElementById("itemCount");
    if (itemCount) {
        itemCount.textContent = totalItems + (totalItems === 1 ? " sản phẩm" : " sản phẩm");
    }

    document.querySelectorAll("[data-cart-count]").forEach(function (element) {
        element.textContent = String(totalItems);
    });

    var subtotalElement = document.getElementById("tamTinh");
    var totalElement = document.getElementById("tongCong");
    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (totalElement) totalElement.textContent = formatPrice(subtotal);
}
