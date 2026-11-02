const CART_KEY = "gearHouseCart";
const catalog = window.gearProductCatalog || [];
const productId = Number(new URLSearchParams(window.location.search).get("id"));
const currentProduct = catalog.find(function (product) {
    return product.id === productId;
});

function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}

function readCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        return Array.isArray(cart) ? cart : [];
    } catch (error) { return []; }
}

function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function formatPrice(price) { return "$" + Number(price).toLocaleString("en-US"); }

function addToCart(product, quantity) {
    if (!product || product.tonkho < 1) return false;
    const cart = readCart();
    const existing = cart.find(function (item) {
        return Number(item.id) === product.id;
    });
    if (existing) existing.soLuong = Math.min(product.tonkho, 99, Number(existing.soLuong || 0) + quantity);
    else cart.push({
        id: product.id, soLuong: Math.min(product.tonkho, 99, quantity)
    });
    saveCart(cart);
    updateCartBadge();
    return true;
}

function updateCartBadge() {
    const count = readCart().reduce(function (sum, item) {
        return sum + (Number(item.soLuong) || 0);
    }, 0);
    document.querySelectorAll("[data-cart-count]").forEach(function (element) {
        element.textContent = String(count);
    });
}

function makeProductCard(product, label) {
    const card = makeElement("article", "product-card");
    const imageLink = makeElement("a", "product-card-image");
    imageLink.href = "ChiTietSanPham.aspx?id=" + product.id;
    const image = document.createElement("img");
    image.src = product.anh;
    image.alt = product.ten;
    image.loading = "lazy";
    imageLink.appendChild(image);
    if (label) imageLink.appendChild(makeElement("span", "product-tag", label));
    const body = makeElement("div", "product-card-body");
    body.appendChild(makeElement("p", "product-card-category", product.loai + " · " + product.brand));
    const title = makeElement("h3");
    const titleLink = makeElement("a", "", product.ten);
    titleLink.href = imageLink.href;
    title.appendChild(titleLink);
    body.appendChild(title);
    body.appendChild(makeElement("p", "product-card-spec", product.thongSo));
    const footer = makeElement("div", "product-card-footer");
    footer.appendChild(makeElement("strong", "", formatPrice(product.gia)));
    const addButton = makeElement("button", "mini-add", "Add to cart");
    addButton.type = "button";
    addButton.disabled = product.tonkho < 1;
    addButton.addEventListener("click", function () {
        if (addToCart(product, 1)) {
            addButton.textContent = "Added";
            window.setTimeout(function () {
                addButton.textContent = "Add to cart";
            }, 1300);
        }
    });
    footer.appendChild(addButton);
    body.appendChild(footer);
    card.append(imageLink, body);
    return card;
}

function showRecommendations() {
    const container = document.getElementById("danhSachTuongTu");
    const related = catalog.filter(function (product) {
        return currentProduct && product.id !== currentProduct.id && product.loai === currentProduct.loai;
    });
    const remaining = catalog.filter(function (product) {
        return product.id !== (currentProduct && currentProduct.id) && !related.some(function (item) {
            return item.id === product.id;
        });
    });
    related.concat(remaining).slice(0, 4).forEach(function (product, index) {
        container.appendChild(makeProductCard(product, index === 0 ? "Popular" : ""));
    });
}

function makeVariantPicker(product) {
    const suggestions = catalog
        .filter(function (candidate) { return candidate.id !== product.id && candidate.loai === product.loai; })
        .sort(function (a, b) {
            const aBrandMatch = a.brand === product.brand ? 0 : 1;
            const bBrandMatch = b.brand === product.brand ? 0 : 1;
            return aBrandMatch - bBrandMatch || Math.abs(a.gia - product.gia) - Math.abs(b.gia - product.gia);
        })
        .slice(0, 2);

    if (!suggestions.length) return null;

    const picker = makeElement("div", "variant-picker");
    const button = makeElement("button", "variant-trigger", "Other options (" + suggestions.length + ")");
    const menu = makeElement("div", "variant-menu");
    const menuId = "variant-options-" + product.id;
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", menuId);
    menu.id = menuId;
    menu.hidden = true;
    menu.setAttribute("role", "menu");

    suggestions.forEach(function (suggestion) {
        const option = makeElement("a", "variant-option");
        option.href = "ChiTietSanPham.aspx?id=" + suggestion.id;
        option.setAttribute("role", "menuitem");
        const details = makeElement("span", "variant-option-details");
        details.append(
            makeElement("strong", "", suggestion.ten),
            makeElement("small", "", suggestion.brand + " · " + suggestion.loai)
        );
        option.append(details, makeElement("strong", "variant-option-price", formatPrice(suggestion.gia)));
        menu.appendChild(option);
    });

    button.addEventListener("click", function () {
        const isOpen = button.getAttribute("aria-expanded") !== "true";
        button.setAttribute("aria-expanded", String(isOpen));
        menu.hidden = !isOpen;
    });
    picker.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            button.setAttribute("aria-expanded", "false");
            menu.hidden = true;
            button.focus();
        }
    });
    document.addEventListener("pointerdown", function (event) {
        if (!picker.contains(event.target)) {
            button.setAttribute("aria-expanded", "false");
            menu.hidden = true;
        }
    });

    picker.append(button, menu);
    return picker;
}

function showProduct() {
    const root = document.getElementById("chiTietSanPham");
    const overview = document.getElementById("productOverview");
    const crumb = document.getElementById("crumbProduct");
    if (!currentProduct) {
        root.appendChild(makeElement("section", "not-found", "Product not found"));
        overview.textContent = "Choose another component from the products catalog.";
        showRecommendations();
        return;
    }

    crumb.textContent = currentProduct.ten;
    overview.textContent = currentProduct.overview;
    const layout = makeElement("section", "product-layout");
    const gallery = makeElement("div", "product-gallery");
    const thumbnails = makeElement("div", "product-thumbnails");
    const mainImageFrame = makeElement("div", "main-image-frame");
    const mainImage = document.createElement("img");
    mainImage.src = currentProduct.anh; mainImage.alt = currentProduct.ten;
    mainImageFrame.appendChild(mainImage);

    for (let index = 0; index < 3; index += 1) {
        const thumbnail = makeElement("button", "product-thumbnail" + (index === 0 ? " selected" : ""));
        thumbnail.type = "button";
        thumbnail.setAttribute("aria-label", "Product image " + (index + 1));
        const thumbImage = document.createElement("img");
        thumbImage.src = currentProduct.anh; thumbImage.alt = "";
        thumbnail.appendChild(thumbImage);
        thumbnail.addEventListener("click", function () {
            mainImage.src = thumbImage.src;
            thumbnails.querySelectorAll(".product-thumbnail").forEach(function (item) { item.classList.remove("selected"); });
            thumbnail.classList.add("selected");
        });
        thumbnails.appendChild(thumbnail);
    }
    gallery.append(thumbnails, mainImageFrame);

    const info = makeElement("section", "product-info");
    info.appendChild(makeElement("p", "product-category", currentProduct.loai + " · " + currentProduct.brand));
    info.appendChild(makeElement("h1", "product-title", currentProduct.ten));
    const rating = makeElement("div", "product-rating");
    const stars = makeElement("span", "rating-stars", "★★★★★");
    stars.setAttribute("aria-label", "Rated " + currentProduct.rating + " out of 5 stars");
    rating.append(stars, makeElement("strong", "", currentProduct.rating), makeElement("span", "rating-count", "(" + currentProduct.reviews + " reviews)"));
    info.appendChild(rating);
    info.appendChild(makeElement("p", "product-price", formatPrice(currentProduct.gia)));
    const stock = makeElement("p", "stock-status", currentProduct.tonkho > 0 ? "In stock — ships within 24 hours · " + currentProduct.tonkho + " available" : "Out of stock");
    if (currentProduct.tonkho < 1) stock.classList.add("out-of-stock");
    info.append(stock, makeElement("p", "product-description", currentProduct.moTa));

    const specs = makeElement("div", "spec-grid");
    currentProduct.specs.forEach(function (spec) {
        const box = makeElement("div", "spec-box");
        box.append(makeElement("span", "", spec.label), makeElement("strong", "", spec.value));
        specs.appendChild(box);
    });
    info.appendChild(specs);
    const variantPicker = makeVariantPicker(currentProduct);
    if (variantPicker) info.appendChild(variantPicker);

    const actions = makeElement("div", "product-actions");
    const quantity = makeElement("div", "quantity-control");
    const minus = makeElement("button", "", "−");
    minus.type = "button";
    minus.setAttribute("aria-label", "Decrease quantity");
    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.max = String(Math.max(1, Math.min(99, currentProduct.tonkho)));
    input.value = "1";
    input.setAttribute("aria-label", "Quantity");
    const plus = makeElement("button", "", "+");
    plus.type = "button";
    plus.setAttribute("aria-label", "Increase quantity");

    function normalizeQuantity() {
        input.value = String(Math.min(Number(input.max), Math.max(1, Math.floor(Number(input.value) || 1))));
    }

    minus.addEventListener("click", function () {
        input.value = String(Math.max(1, Number(input.value) - 1));
    });

    plus.addEventListener("click", function () {
        input.value = String(Math.min(Number(input.max), Number(input.value) + 1));
    });

    input.addEventListener("change", normalizeQuantity);
    quantity.append(minus, input, plus);
    const addButton = makeElement("button", "add-to-cart", "Add to cart"); addButton.type = "button";
    addButton.disabled = currentProduct.tonkho < 1;
    actions.append(quantity, addButton);
    const buyNow = makeElement("button", "buy-now", "Buy now"); buyNow.type = "button"; buyNow.disabled = currentProduct.tonkho < 1;
    const message = makeElement("p", "action-message", ""); message.setAttribute("role", "status");
    addButton.addEventListener("click", function () {
        normalizeQuantity();
        if (addToCart(currentProduct, Number(input.value))) message.textContent = currentProduct.ten + " added to your cart.";
    });
    buyNow.addEventListener("click", function () {
        message.textContent = "Checkout is not available in this demo yet. Your cart is ready when checkout is added.";
    });

    info.append(actions, buyNow, message);
    const service = makeElement("div", "service-points");
    function serviceNote(label, path) {
        const note = makeElement("p", "");
        const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("viewBox", "0 0 20 20"); icon.setAttribute("aria-hidden", "true");
        const shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
        shape.setAttribute("d", path);
        icon.appendChild(shape);
        note.append(icon, document.createTextNode(label));
        return note;
    }
    service.append(serviceNote("Free delivery over $99", "M2 5h10v9H2z M12 8h3l3 3v3h-6z M5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"), serviceNote("2-year limited warranty", "M10 2.5 16 5v4.4c0 3.8-2.4 6.6-6 8.1-3.6-1.5-6-4.3-6-8.1V5l6-2.5Z M7.4 9.9l1.7 1.7 3.6-3.8"));
    info.appendChild(service);
    layout.append(gallery, info);
    root.appendChild(layout);
    showRecommendations();
}

document.addEventListener("DOMContentLoaded", function () {
    showProduct();
    updateCartBadge();

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
});
