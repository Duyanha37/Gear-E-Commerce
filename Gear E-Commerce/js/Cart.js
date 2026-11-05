var catalog = [];
var FEATURED_IDS = ["1", "2", "3", "4"];

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
        id: Number(product.productID),
        ten: product.Name || "",
        loai: product.Category || "",
        brand: product.Brand || "",
        gia: Number(product.Price) || 0,
        anh: product.Image || "",
        tonkho: Number(product.Stock) || 0,
        thongSo: product.SpecificationsSummary || product.Description || "",
        moTa: product.Description || ""
    };
}

async function loadProducts() {
    var response = await fetch("ProductControllers.aspx", {
        method: "GET",
        headers: {
            "Service-Name": "GetProducts"
        },
        credentials: "same-origin",
        cache: "no-store"
    });

    if (!response.ok) {
        throw new Error("Không thể lấy danh sách sản phẩm.");
    }

    var products = await response.json();

    if (!Array.isArray(products)) {
        throw new Error("API không trả về danh sách sản phẩm.");
    }

    return products
        .filter(function (product) {
            return product.isDelete !== true &&
                product.isDeleted !== true;
        })
        .map(chuanHoaSanPham);
}

async function loadCartBySession() {
    var response = await fetch("Cart.aspx?api=cart", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store"
    });

    if (!response.ok) {
        throw new Error("Không thể lấy giỏ hàng.");
    }

    var cartItems = await response.json();

    if (!Array.isArray(cartItems)) {
        throw new Error("API không trả về danh sách giỏ hàng.");
    }

    return cartItems.map(function (item) {
        return {
            id: Number(item.id),
            productID: String(item.id),
            cartID: "",
            soLuong: Math.max(1, Number(item.soLuong) || 1)
        };
    });
}

async function loadCart() {
    var memberID = layMemberID();

    if (memberID === "") {
        return await loadCartBySession();
    }

    var response = await fetch(
        "CartControllers.aspx?memberID=" +
        encodeURIComponent(memberID),
        {
            method: "GET",
            headers: {
                "Service-Name": "GetCartItemsByMemberID"
            },
            credentials: "same-origin",
            cache: "no-store"
        }
    );

    if (!response.ok) {
        throw new Error("Không thể lấy giỏ hàng của thành viên.");
    }

    var cartItems = await response.json();

    if (!Array.isArray(cartItems)) {
        throw new Error("API không trả về danh sách giỏ hàng.");
    }

    return cartItems.map(function (item) {
        var productID = item.ProductID ||
            item.productID ||
            item.id;

        var cartID = item.CartID ||
            item.cartID ||
            "";

        var quantity = item.Quantity ||
            item.quantity ||
            item.soLuong ||
            1;

        return {
            id: Number(productID),
            productID: String(productID),
            cartID: cartID ? String(cartID) : "",
            soLuong: Math.max(
                1,
                Math.min(99, Math.floor(Number(quantity) || 1))
            )
        };
    });
}

async function sendCartAction(action, item, quantity) {
    var memberID = layMemberID();

    if (memberID === "") {
        var sessionAction = action;

        if (action === "update") {
            sessionAction = quantity < 1 ? "remove" : "set";
        }

        var sessionResponse = await fetch("Cart.aspx?api=cart", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: sessionAction,
                id: Number(item.productID),
                quantity: quantity
            })
        });

        if (!sessionResponse.ok) {
            throw new Error("Không thể cập nhật giỏ hàng.");
        }

        return sessionResponse;
    }

    var method = "POST";
    var serviceName = "";
    var url = "CartControllers.aspx?memberID=" +
        encodeURIComponent(memberID);
    var body = null;

    if (action === "add") {
        serviceName = "AddCartItem";
        body = JSON.stringify({
            CartID: item.cartID || memberID,
            ProductID: String(item.productID),
            Quantity: Number(quantity)
        });
    }

    else if (action === "update") {
        var deleteUrl = url +
            "&cartItemID=" +
            encodeURIComponent(item.cartID) +
            "&productID=" +
            encodeURIComponent(item.productID);

        var deleteResponse = await fetch(deleteUrl, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Service-Name": "DeleteCartItem"
            },
            cache: "no-store"
        });

        if (!deleteResponse.ok) {
            throw new Error("Không thể xóa sản phẩm cũ trong giỏ hàng.");
        }

        var addResponse = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Service-Name": "AddCartItem"
            },
            body: JSON.stringify({
                CartID: item.cartID || memberID,
                ProductID: String(item.productID),
                Quantity: Number(quantity)
            }),
            cache: "no-store"
        });

        if (!addResponse.ok) {
            throw new Error("Không thể thêm số lượng mới vào giỏ hàng.");
        }

        return addResponse;
    }
    else if (action === "remove") {
        serviceName = "DeleteCartItem";
        url += "&cartItemID=" +
            encodeURIComponent(item.cartID) +
            "&productID=" +
            encodeURIComponent(item.productID);
    }
    else {
        throw new Error("Thao tác giỏ hàng không hợp lệ.");
    }

    var options = {
        method: method,
        headers: {
            "Service-Name": serviceName
        },
        credentials: "same-origin",
        cache: "no-store"
    };

    if (body !== null) {
        options.headers["Content-Type"] = "application/json";
        options.body = body;
    }

    var response = await fetch(url, options);

    var responseText = await response.text();

    if (!response.ok) {
        throw new Error(
            "Không thể cập nhật giỏ hàng. HTTP " +
            response.status +
            (responseText ? ": " + responseText : "")
        );
    }

    return responseText;
}

function formatPrice(price) {
    return Number(price).toLocaleString("vi-VN") + " ₫";
}

async function addToCart(product, quantity) {
    if (!product || product.tonkho < 1) {
        return {
            added: false,
            alreadyExists: false
        };
    }

    var cart = await loadCart();
    var existing = cart.find(function (item) {
        return item.id === product.id;
    });

    if (existing) {
        return {
            added: false,
            alreadyExists: true
        };
    }

    var requestedQuantity = Math.floor(Number(quantity) || 0);

    if (requestedQuantity < 1 ||
        requestedQuantity > product.tonkho ||
        requestedQuantity > 99) {
        return {
            added: false,
            alreadyExists: false
        };
    }

    await sendCartAction(
        "add",
        {
            cartID: "",
            productID: String(product.id)
        },
        requestedQuantity
    );

    return {
        added: true,
        alreadyExists: false
    };
}

function makeProductCard(product, label, refreshCart) {
    var card = document.createElement("article");
    card.className = "product-card";

    var imageLink = document.createElement("a");
    imageLink.className = "product-card-image";
    imageLink.href = "ChiTietSanPham.aspx?id=" + product.id;

    var image = document.createElement("img");
    image.src = product.anh;
    image.alt = product.ten;
    image.loading = "lazy";
    imageLink.appendChild(image);

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
    category.textContent = product.brand
        ? product.loai + " · " + product.brand
        : product.loai;

    var title = document.createElement("h3");
    var titleLink = document.createElement("a");
    titleLink.href = imageLink.href;
    titleLink.textContent = product.ten;
    title.appendChild(titleLink);

    var spec = document.createElement("p");
    spec.className = "product-card-spec";
    spec.textContent = product.thongSo;

    var footer = document.createElement("div");
    footer.className = "product-card-footer";

    var price = document.createElement("strong");
    price.textContent = formatPrice(product.gia);

    var add = document.createElement("button");
    add.type = "button";
    add.className = "mini-add";
    add.textContent = product.tonkho > 0
        ? "Thêm vào giỏ"
        : "Hết hàng";
    add.disabled = product.tonkho < 1;

    add.addEventListener("click", async function (event) {
        event.preventDefault();

        if (add.disabled) {
            return;
        }

        add.disabled = true;

        try {
            var result = await addToCart(product, 1);

            if (result.alreadyExists) {
                window.alert("Sản phẩm đã được thêm vào giỏ hàng rồi!");
                add.disabled = false;
                return;
            }

            if (!result.added) {
                add.textContent = "Hết hàng";
                add.disabled = false;
                return;
            }

            add.textContent = "Đã thêm";

            if (refreshCart) {
                await refreshCart();
            }

            window.setTimeout(function () {
                add.textContent = "Thêm vào giỏ hàng";
                add.disabled = false;
            }, 1200);
        } catch (error) {
            console.error(
                "Lỗi thêm sản phẩm từ danh sách gợi ý:",
                error
            );

            add.textContent = "Try again";
            add.disabled = false;

            window.setTimeout(function () {
                add.textContent = "Add to cart";
            }, 1500);
        }
    });

    footer.append(price, add);
    body.append(category, title, spec, footer);
    card.append(imageLink, body);

    return card;
}

document.addEventListener("DOMContentLoaded", function () {
    var searchForm = document.getElementById("formTimKiem");
    var searchToggle = document.getElementById("nutMoTimKiem");
    var searchInput = searchForm &&
        searchForm.querySelector('input[type="search"]');

    if (searchForm && searchToggle && searchInput) {
        searchToggle.addEventListener("click", function () {
            var isOpen = searchForm.classList.toggle("dang-mo");

            searchToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            searchToggle.setAttribute(
                "aria-label",
                isOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm"
            );

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

    var cartList = document.getElementById("danhSachGioHang");
    var cartContent = document.getElementById("noiDungGioHang");
    var emptyState = document.getElementById("gioHangTrong");
    var recommendations = document.getElementById("danhSachNoiBat");
    var checkoutMessage = document.getElementById("checkoutMessage");

    if (!cartList || !cartContent || !emptyState) {
        return;
    }

    function updateCart(items) {
        var totalItems = items.reduce(function (sum, item) {
            return sum + item.soLuong;
        }, 0);

        var subtotal = items.reduce(function (sum, item) {
            var product = catalog.find(function (candidate) {
                return candidate.id === item.id;
            });

            return sum + (
                product
                    ? product.gia * item.soLuong
                    : 0
            );
        }, 0);

        var itemCount = document.getElementById("itemCount");
        var subtotalElement = document.getElementById("tamTinh");
        var totalElement = document.getElementById("tongCong");

        if (itemCount) {
            itemCount.textContent = totalItems +
                (totalItems === 1 ? " item" : " items");
        }

        document.querySelectorAll("[data-cart-count]")
            .forEach(function (element) {
                element.textContent = String(totalItems);
            });

        if (subtotalElement) {
            subtotalElement.textContent = formatPrice(subtotal);
        }

        if (totalElement) {
            totalElement.textContent = formatPrice(subtotal);
        }
    }

    async function renderCart() {
        var items;

        try {
            items = await loadCart();
        } catch (error) {
            cartContent.hidden = true;
            emptyState.hidden = false;
            emptyState.querySelector("h2").textContent =
                "Cart unavailable";
            emptyState.querySelector("p").textContent =
                "Could not connect to the application cart. Please try again.";
            console.error("Có lỗi khi hiển thị giỏ hàng:", error);
            return;
        }

        cartList.replaceChildren();

        var itemsInCatalog = items.filter(function (item) {
            return catalog.some(function (product) {
                return product.id === item.id;
            });
        });

        itemsInCatalog.sort(function (firstItem, secondItem) {
            var firstIndex = catalog.findIndex(function (product) {
                return product.id === firstItem.id;
            });

            var secondIndex = catalog.findIndex(function (product) {
                return product.id === secondItem.id;
            });

            return firstIndex - secondIndex;
        });

        var hasItems = itemsInCatalog.length > 0;

        cartContent.hidden = !hasItems;
        emptyState.hidden = hasItems;

        emptyState.querySelector("h2").textContent =
            "Giỏ hàng của bạn đang trống";
        emptyState.querySelector("p").textContent =
            "Tìm các linh kiện phù hợp cho bộ máy tiếp theo của bạn.";

        if (hasItems) {
            itemsInCatalog.forEach(function (item) {
                var product = catalog.find(function (candidate) {
                    return candidate.id === item.id;
                });

                if (!product) {
                    return;
                }

                var row = document.createElement("article");
                row.className = "cart-item";
                row.dataset.productId = String(product.id);
                row.dataset.cartId = String(item.cartID);

                var imageLink = document.createElement("a");
                imageLink.className = "cart-item-image";
                imageLink.href =
                    "ChiTietSanPham.aspx?id=" + product.id;

                var image = document.createElement("img");
                image.src = product.anh;
                image.alt = product.ten;
                imageLink.appendChild(image);

                var details = document.createElement("div");
                details.className = "cart-item-details";

                var category = document.createElement("p");
                category.className = "cart-item-category";
                category.textContent = product.brand
                    ? product.loai + " · " + product.brand
                    : product.loai;

                var name = document.createElement("h2");
                var nameLink = document.createElement("a");
                nameLink.href = imageLink.href;
                nameLink.textContent = product.ten;
                name.appendChild(nameLink);

                var spec = document.createElement("p");
                spec.className = "cart-item-spec";
                spec.textContent = product.thongSo;

                var remove = document.createElement("button");
                remove.type = "button";
                remove.className = "remove-item";
                remove.textContent = "Remove";

                details.append(category, name, spec, remove);

                var purchase = document.createElement("div");
                purchase.className = "cart-item-purchase";

                var price = document.createElement("strong");
                price.className = "cart-item-price";
                price.textContent = formatPrice(product.gia);

                var quantity = document.createElement("div");
                quantity.className = "cart-quantity";

                var minus = document.createElement("button");
                minus.type = "button";
                minus.dataset.action = "decrease";
                minus.textContent = "−";
                minus.disabled = item.soLuong <= 1;
                minus.setAttribute(
                    "aria-label",
                    "Decrease " + product.ten
                );

                var count = document.createElement("span");
                count.className = "quantity-value";
                count.textContent = String(item.soLuong);

                var plus = document.createElement("button");
                plus.type = "button";
                plus.dataset.action = "increase";
                plus.textContent = "+";
                plus.disabled = item.soLuong >= product.tonkho ||
                    item.soLuong >= 99;
                plus.setAttribute(
                    "aria-label",
                    "Increase " + product.ten
                );

                quantity.append(minus, count, plus);

                var lineTotal = document.createElement("span");
                lineTotal.className = "cart-line-total";
                lineTotal.textContent = formatPrice(
                    product.gia * item.soLuong
                );

                purchase.append(price, quantity, lineTotal);
                row.append(imageLink, details, purchase);
                cartList.appendChild(row);
            });
        }

        updateCart(itemsInCatalog);
    }

    cartList.addEventListener("click", async function (event) {
        var button = event.target.closest("button");

        if (!button) {
            return;
        }

        var row = button.closest(".cart-item");

        if (!row) {
            return;
        }

        if (button.disabled) {
            return;
        }

        var productID = String(row.dataset.productId);
        var memberID = layMemberID();

        button.disabled = true;

        try {
            var items = await loadCart();
            var item = items.find(function (entry) {
                return String(entry.productID) === productID;
            });

            var product = catalog.find(function (candidate) {
                return String(candidate.id) === productID;
            });

            if (!item || !product) {
                throw new Error("Không tìm thấy sản phẩm trong giỏ hàng.");
            }

            if (button.classList.contains("remove-item")) {
                await sendCartAction("remove", item, 0);
            } else if (button.dataset.action === "increase") {
                if (item.soLuong >= product.tonkho ||
                    item.soLuong >= 99) {
                    return;
                }

                await sendCartAction(
                    "update",
                    item,
                    item.soLuong + 1
                );
            } else if (button.dataset.action === "decrease") {
                if (item.soLuong <= 1) {
                    return;
                }

                await sendCartAction(
                    "update",
                    item,
                    item.soLuong - 1
                );
            }

            await renderCart();
        } catch (error) {
            console.error("Lỗi cập nhật số lượng giỏ hàng:", error);

            if (checkoutMessage) {
                checkoutMessage.textContent =
                    "Không thể cập nhật số lượng sản phẩm. Vui lòng thử lại.";
                checkoutMessage.hidden = false;
            }
        } finally {
            button.disabled = false;
        }
    });

    var checkoutButton = document.getElementById("thanhToan");

    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            if (!checkoutMessage) {
                return;
            }

            checkoutMessage.textContent =
                "Thanh toán chưa khả dụng!";
            checkoutMessage.hidden = false;
        });
    }

    loadProducts()
        .then(function (products) {
            catalog = products;

            FEATURED_IDS.forEach(function (id, index) {
                var product = catalog.find(function (item) {
                    return item.id === Number(id);
                });

                if (product && recommendations) {
                    recommendations.appendChild(
                        makeProductCard(
                            product,
                            index === 0 ? "Popular" : "",
                            renderCart
                        )
                    );
                }
            });

            renderCart();
        })
        .catch(function (error) {
            cartContent.hidden = true;
            emptyState.hidden = false;
            emptyState.querySelector("h2").textContent =
                "Cart unavailable";
            emptyState.querySelector("p").textContent =
                "Could not connect to the application cart. Please try again.";
            console.error(
                "Có lỗi khi khởi tạo giỏ hàng:",
                error
            );
        });
});