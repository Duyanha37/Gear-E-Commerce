const FEATURED_IDS = [1, 2, 3, 4];
const catalog = window.gearProductCatalog || [];

async function readCart() {
    const response = await fetch("Cart.aspx?api=cart", { credentials: "same-origin" });
    if (!response.ok) throw new Error("Could not load the cart.");
    const stored = await response.json();
    if (!Array.isArray(stored)) return [];
    return stored.filter(function (item) {
        return catalog.some(function (product) { return product.id === Number(item.id); });
    }).map(function (item) {
        return { id: Number(item.id), soLuong: Math.max(1, Math.min(99, Math.floor(Number(item.soLuong) || 1))) };
    });
}

async function sendCartAction(action, id, quantity) {
    const response = await fetch("Cart.aspx?api=cart", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: action, id: id, quantity: quantity })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not update the cart.");
    return result;
}
function formatPrice(price) {
    return Number(price).toLocaleString("vi-VN") + " ₫";
}

function makeProductCard(product, label) {
    const card = document.createElement("article");
    card.className = "product-card";
    const imageLink = document.createElement("a");
    imageLink.className = "product-card-image";
    imageLink.href = "ChiTietSanPham.aspx?id=" + product.id;
    const image = document.createElement("img");
    image.src = product.anh; image.alt = product.ten;
    image.loading = "lazy";
    imageLink.appendChild(image);

    if (label) {
        const tag = document.createElement("span");
        tag.className = "product-tag";
        tag.textContent = label;
        imageLink.appendChild(tag);
    }

    const body = document.createElement("div");
    body.className = "product-card-body";
    const category = document.createElement("p");
    category.className = "product-card-category";
    category.textContent = product.loai + " · " + product.brand;
    const title = document.createElement("h3");
    const titleLink = document.createElement("a");
    titleLink.href = imageLink.href;
    titleLink.textContent = product.ten;
    title.appendChild(titleLink);
    const spec = document.createElement("p");
    spec.className = "product-card-spec";
    spec.textContent = product.thongSo;
    const footer = document.createElement("div");
    footer.className = "product-card-footer";
    const price = document.createElement("strong");
    price.textContent = formatPrice(product.gia);
    const add = document.createElement("button");
    add.type = "button";
    add.className = "mini-add";
    add.textContent = product.tonkho > 0 ? "Add to cart" : "Out of stock";
    add.disabled = product.tonkho < 1;
    add.addEventListener("click", async function () {
        try {
            const cart = await readCart();
            const existing = cart.find(function (item) {
                return item.id === product.id;
            });
            const currentQuantity = existing ? existing.soLuong : 0;
            if (currentQuantity >= product.tonkho || currentQuantity >= 99) return;
            const items = await sendCartAction("add", product.id, 1);
            updateCart(items);
            add.textContent = "Added";
            window.setTimeout(function () { add.textContent = "Add to cart"; }, 1200);
        } catch (error) {
            add.textContent = "Try again";
            window.setTimeout(function () { add.textContent = "Add to cart"; }, 1500);
        }
    });
    footer.append(price, add);
    body.append(category, title, spec, footer);
    card.append(imageLink, body);
    return card;
}

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("formTimKiem");
    const searchToggle = document.getElementById("nutMoTimKiem");
    const searchInput = searchForm && searchForm.querySelector('input[type="search"]');
    if (searchForm && searchToggle && searchInput) {
        searchToggle.addEventListener("click", function () {
            const isOpen = searchForm.classList.toggle("dang-mo");
            searchToggle.setAttribute("aria-expanded", String(isOpen));
            searchToggle.setAttribute("aria-label", isOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm");
            if (isOpen) searchInput.focus();
        });
        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                searchForm.classList.remove("dang-mo");
                searchToggle.setAttribute("aria-expanded", "false");
                searchToggle.focus();
            }
        });
    }

    const cartList = document.getElementById("danhSachGioHang");
    const cartContent = document.getElementById("noiDungGioHang");
    const emptyState = document.getElementById("gioHangTrong");
    const recommendations = document.getElementById("danhSachNoiBat");
    const products = window.gearProductCatalog || [];

    FEATURED_IDS.map(function (id) {
        return products.find(function (product) {
            return product.id === id;
        });
    })
        .filter(Boolean).forEach(function (product, index) {
            recommendations.appendChild(makeProductCard(product, index === 0 ? "Popular" : ""));
        });

    function updateCart(items) {
        const totalItems = items.reduce(function (sum, item) {
            return sum + item.soLuong;
        }, 0);
        const subtotal = items.reduce(function (sum, item) {
            const product = products.find(function (candidate) {
                return candidate.id === item.id;
            });
            return sum + (product ? product.gia * item.soLuong : 0);
        }, 0);
        document.getElementById("itemCount").textContent = totalItems + (totalItems === 1 ? " item" : " items");
        document.querySelectorAll("[data-cart-count]").forEach(function (element) {
            element.textContent = String(totalItems);
        });
        document.getElementById("tamTinh").textContent = formatPrice(subtotal);
        document.getElementById("tongCong").textContent = formatPrice(subtotal);
    }

    async function renderCart() {
        let items;
        try {
            items = await readCart();
        } catch (error) {
            cartContent.hidden = true;
            emptyState.hidden = false;
            emptyState.querySelector("h2").textContent = "Cart unavailable";
            emptyState.querySelector("p").textContent = "Could not connect to the application cart. Please try again.";
            return;
        }
        cartList.replaceChildren();
        const hasItems = items.length > 0;
        cartContent.hidden = !hasItems;
        emptyState.hidden = hasItems;
        emptyState.querySelector("h2").textContent = "Your cart is empty";
        emptyState.querySelector("p").textContent = "Tìm các linh kiện phù hợp cho bộ máy (build) tiếp theo của bạn.";
        if (hasItems) {
            items.forEach(function (item) {
                const product = products.find(function (candidate) { return candidate.id === item.id; });
                if (!product) return;
                const row = document.createElement("article");
                row.className = "cart-item";
                row.dataset.productId = String(product.id);
                const imageLink = document.createElement("a");
                imageLink.className = "cart-item-image";
                imageLink.href = "ChiTietSanPham.aspx?id=" + product.id;
                const image = document.createElement("img");
                image.src = product.anh;
                image.alt = product.ten;
                imageLink.appendChild(image);
                const details = document.createElement("div");
                details.className = "cart-item-details";
                const category = document.createElement("p");
                category.className = "cart-item-category";
                category.textContent = product.loai + " · " + product.brand;
                const name = document.createElement("h2");
                const nameLink = document.createElement("a");
                nameLink.href = imageLink.href;
                nameLink.textContent = product.ten; name.appendChild(nameLink);
                const spec = document.createElement("p");
                spec.className = "cart-item-spec";
                spec.textContent = product.thongSo;
                const remove = document.createElement("button");
                remove.type = "button";
                remove.className = "remove-item";
                remove.textContent = "Remove";
                details.append(category, name, spec, remove);
                const purchase = document.createElement("div");
                purchase.className = "cart-item-purchase";
                const price = document.createElement("strong");
                price.className = "cart-item-price";
                price.textContent = formatPrice(product.gia);
                const quantity = document.createElement("div");
                quantity.className = "cart-quantity";
                const minus = document.createElement("button");
                minus.type = "button";
                minus.dataset.action = "decrease";
                minus.textContent = "−";
                minus.setAttribute("aria-label", "Decrease " + product.ten);
                const count = document.createElement("span");
                count.className = "quantity-value";
                count.textContent = String(item.soLuong);
                const plus = document.createElement("button");
                plus.type = "button";
                plus.dataset.action = "increase";
                plus.textContent = "+";
                plus.setAttribute("aria-label", "Increase " + product.ten);
                plus.disabled = item.soLuong >= product.tonkho || item.soLuong >= 99;
                quantity.append(minus, count, plus);
                const lineTotal = document.createElement("span");
                lineTotal.className = "cart-line-total";
                lineTotal.textContent = formatPrice(product.gia * item.soLuong);
                purchase.append(price, quantity, lineTotal);
                row.append(imageLink, details, purchase); cartList.appendChild(row);
            });
        }
        updateCart(items);
    }

    cartList.addEventListener("click", async function (event) {
        const button = event.target.closest("button");
        if (!button) return;
        const row = button.closest(".cart-item");
        const id = Number(row.dataset.productId);
        try {
            const items = await readCart();
            const item = items.find(function (entry) { return entry.id === id; });
            if (button.classList.contains("remove-item")) await sendCartAction("remove", id, 0);
            else if (item && button.dataset.action === "increase") {
                const product = products.find(function (candidate) { return candidate.id === id; });
                if (product && item.soLuong < product.tonkho && item.soLuong < 99) {
                    await sendCartAction("add", id, 1);
                }
            }
            else if (item && button.dataset.action === "decrease" && item.soLuong > 1) {
                await sendCartAction("set", id, item.soLuong - 1);
            }
            await renderCart();
        }
        catch (error) {
            const message = document.getElementById("checkoutMessage");
            message.textContent = "Could not update your cart. Please try again.";
            message.hidden = false;
        }
    });

    document.getElementById("thanhToan").addEventListener("click", function () {
        const message = document.getElementById("checkoutMessage");
        message.textContent = "Checkout is not available in this demo yet.";
        message.hidden = false;
    });

    renderCart();
});
