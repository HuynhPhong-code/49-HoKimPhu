function checkLogin(callback) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
        alert("Bạn cần đăng nhập để tiếp tục.");
        window.location.href = "dang-nhap.html"; // hoặc login.html nếu bạn đặt tên vậy
        return;
    }
    callback();
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        title: params.get('title'),
        price: params.get('price'),
        image: params.get('image'),
        description: params.get('description'),
        quantity: parseInt(params.get('quantity')) || 1
    };
}

function parsePrice(price) {
    if (price === "Liên hệ") return 0;
    return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
}

function removeProduct(title) {
    const product = getQueryParams();
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];

    if (title === 'single' && product.title) {
        window.location.href = 'san-pham.html';
        return;
    }

    const updatedItems = checkoutItems.filter(item => item.title !== title);
    localStorage.setItem('checkoutItems', JSON.stringify(updatedItems));

    const singleProductContainer = document.getElementById('single-product');
    const productList = document.getElementById('product-list');
    const totalPriceElement = document.getElementById('total-price');

    if (updatedItems.length > 0) {
        singleProductContainer.style.display = 'none';
        productList.style.display = 'block';

        let total = 0;
        productList.innerHTML = '';
        updatedItems.forEach(item => {
            const itemTotal = parsePrice(item.price) * item.quantity;
            total += itemTotal;

            const productItem = document.createElement('div');
            productItem.classList.add('product-info');
            productItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="details">
                    <h4>${item.title}</h4>
                    <p>Giá: ${item.price}</p>
                    <p>Mô tả: ${item.description}</p>
                    <p>Số lượng: ${item.quantity}</p>
                    <button class="btn btn-danger btn-sm remove-product" data-title="${item.title}">Bỏ sản phẩm</button>
                </div>
            `;
            productList.appendChild(productItem);
        });

        totalPriceElement.textContent = total.toLocaleString('vi-VN') + ' VNĐ';

  
        document.querySelectorAll('.remove-product').forEach(button => {
            button.addEventListener('click', () => {
                const title = button.getAttribute('data-title');
                removeProduct(title);
            });
        });
    } else {
        singleProductContainer.style.display = 'none';
        productList.style.display = 'block';
        productList.innerHTML = '<p>Không có sản phẩm nào để thanh toán.</p>';
        totalPriceElement.textContent = '0 VNĐ';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const singleProductContainer = document.getElementById('single-product');
    const productList = document.getElementById('product-list');
    const totalPriceElement = document.getElementById('total-price');
    const product = getQueryParams();
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];

    if (product.title) {
        singleProductContainer.style.display = 'block';
        productList.style.display = 'none';
        
        document.getElementById('product-title').textContent = product.title || 'Không có tiêu đề';
        document.getElementById('product-price').textContent = product.price || '0 VNĐ';
        document.getElementById('product-image').src = product.image || '';
        document.getElementById('product-description').textContent = product.description || 'Không có mô tả';
        document.getElementById('product-quantity').textContent = product.quantity;

        const total = parsePrice(product.price) * product.quantity;
        totalPriceElement.textContent = total.toLocaleString('vi-VN') + ' VNĐ';
    }
    
    else if (checkoutItems.length > 0) {
        singleProductContainer.style.display = 'none';
        productList.style.display = 'block';

        let total = 0;
        productList.innerHTML = '';
        checkoutItems.forEach(item => {
            const itemTotal = parsePrice(item.price) * item.quantity;
            total += itemTotal;

            const productItem = document.createElement('div');
            productItem.classList.add('product-info');
            productItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="details">
                    <h4>${item.title}</h4>
                    <p>Giá: ${item.price}</p>
                    <p>Mô tả: ${item.description}</p>
                    <p>Số lượng: ${item.quantity}</p>
                    <button class="btn btn-danger btn-sm remove-product" data-title="${item.title}">Bỏ sản phẩm</button>
                </div>
            `;
            productList.appendChild(productItem);
        });

        totalPriceElement.textContent = total.toLocaleString('vi-VN') + ' VNĐ';
    }

    else {
        singleProductContainer.style.display = 'none';
        productList.style.display = 'block';
        productList.innerHTML = '<p>Không có sản phẩm nào để thanh toán.</p>';
        totalPriceElement.textContent = '0 VNĐ';
    }

    document.querySelectorAll('.remove-product').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            removeProduct(title);
        });
    });
});

function handleCheckout() {
    document.getElementById('confirmation-modal').style.display = 'block';
}

function confirmCheckout() {
    document.getElementById('confirmation-modal').style.display = 'none';

    const product = getQueryParams();
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];
    const customerName = document.getElementById('customer-name').value.trim();
    const customerPhone = document.getElementById('customer-phone').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();
    const paymentMethod = document.getElementById('payment-method').value;

    if (!customerName || !customerPhone || !customerAddress) {
        alert('Vui lòng điền đầy đủ thông tin khách hàng.');
        return;
    }

    let orderProducts = [];
    if (product.title) {
        orderProducts = [{
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: product.quantity
        }];
    }
    else if (checkoutItems.length > 0) {
        orderProducts = checkoutItems;
    }
    else {
        alert('Không có sản phẩm nào để thanh toán.');
        return;
    }

    const order = {
        customer: {
            name: customerName,
            phone: customerPhone,
            address: customerAddress
        },
        products: orderProducts,
        paymentMethod: paymentMethod,
        date: new Date().toISOString()
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    if (!product.title) {
        localStorage.removeItem('checkoutItems');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => !item.selected);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    alert('Thanh toán thành công! Bạn sẽ được chuyển đến hóa đơn.');
    window.location.href = 'hoa-don.html';
}

function cancelCheckout() {
    document.getElementById('confirmation-modal').style.display = 'none';
}

