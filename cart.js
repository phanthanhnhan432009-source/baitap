// Hàm lấy giỏ hàng từ localStorage
// Function to retrieve the shopping cart from localStorage
function getCart() {
    // Parse the cart data from localStorage, or return an empty array if none exists
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Hàm lưu giỏ hàng vào localStorage
// Function to save the shopping cart to localStorage
function saveCart(cart) {
    // Convert the cart array to a JSON string and store it in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Hàm thêm sản phẩm vào giỏ hàng
// Function to add a product to the shopping cart
function addToCart(productId, quantity = 1) {
    // Retrieve the current cart from localStorage
    const cart = getCart();
    // Find the product in the products array by its ID
    const product = products.find(p => p.id === productId);
    // If the product exists
    if (product) {
        // Check if the product is already in the cart
        const existingItem = cart.find(item => item.id === productId);
        // If it exists, increase the quantity
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            // If not, add a new item to the cart with the product details and quantity
            cart.push({ ...product, quantity: quantity });
        }
        // Save the updated cart to localStorage
        saveCart(cart);

        // Update the cart count in the navigation bar
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }

        // Show an alert to confirm the addition
        alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    }
}

// Hàm hiển thị giỏ hàng
// Function to display the shopping cart on the page
function displayCart() {
    // Get references to the HTML elements for cart items, total, and checkout button
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    // Retrieve the current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // If the cart items and total elements exist
    if (cartItems && cartTotal) {
        // Get the current cart from localStorage
        const cart = getCart();
        // Clear the cart items display
        cartItems.innerHTML = '';
        // Initialize total price to 0
        let total = 0;

        // If the cart is empty
        if (cart.length === 0) {
            // Display a message indicating the cart is empty
            cartItems.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
            // Disable the checkout button and set its text
            if (checkoutBtn) {
                checkoutBtn.disabled = true;
                checkoutBtn.textContent = 'Thanh Toán';
            }
        } else {
            // For each item in the cart
            cart.forEach(item => {
                // Calculate the total price for this item
                const itemTotal = item.price * item.quantity;
                // Add to the overall total
                total += itemTotal;
                // Create a new div element for the cart item
                const cartItem = document.createElement('div');
                // Set the class name for styling
                cartItem.className = 'cart-item';
                // Set the inner HTML with item details
                cartItem.innerHTML = `
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <img src="${item.images[0]}" alt="${item.name}" class="cart-item-image">
                        <p>Giá: ${item.price.toLocaleString()} VND</p>
                        <p>Số lượng: ${item.quantity}</p>
                        <p>Tổng: ${itemTotal.toLocaleString()} VND</p>
                        <button class="btn" onclick="removeFromCart(${item.id})">Xóa</button>
                    </div>
                `;
                // Append the cart item to the cart items container
                cartItems.appendChild(cartItem);
            });

            // Disable checkout button if not logged in
            if (checkoutBtn) {
                // If no user is logged in
                if (!currentUser) {
                    // Disable the button and change text to prompt login
                    checkoutBtn.disabled = true;
                    checkoutBtn.textContent = 'Đăng nhập để thanh toán';
                } else {
                    // Enable the button and set text to checkout
                    checkoutBtn.disabled = false;
                    checkoutBtn.textContent = 'Thanh Toán';
                }
            }
        }

        // Update the cart total display
        cartTotal.innerHTML = `
            <div class="cart-total">
                <h3>Tổng cộng: ${total.toLocaleString()} VND</h3>
            </div>
        `;
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
    displayCart();

    // Cập nhật số lượng giỏ hàng trong navigation
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
}

// Function to show login dropdown
// Function to trigger the login dropdown when user is not logged in
function showLoginDropdown() {
    // Select the account button element
    const accountBtn = document.querySelector('.account-btn');
    // If the button exists
    if (accountBtn) {
        // Simulate a click on the account button to show the dropdown
        accountBtn.click();
        // Focus on the username input after a short delay to ensure dropdown is open
        setTimeout(() => {
            // Get the username input element
            const usernameInput = document.getElementById('username');
            // If the input exists, focus on it
            if (usernameInput) {
                usernameInput.focus();
            }
        }, 100); // Delay of 100 milliseconds
    }
}

// Hàm xử lý thanh toán
function checkout() {
    const cart = getCart();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
    } else if (!currentUser) {
        // Show login dropdown if user is not logged in
        if (typeof showLoginDropdown === 'function') {
            showLoginDropdown();
        }
        return;
    } else {
        // Show payment modal
        showPaymentModal();
    }
}

// Function to show payment modal
// Function to display the payment modal with total amount
function showPaymentModal() {
    // Get the payment modal element
    const modal = document.getElementById('payment-modal');
    // Calculate the total amount from the cart
    const totalAmount = getCart().reduce((total, item) => total + item.price * item.quantity, 0);
    // Get the element to display the total amount in the modal
    const modalTotalAmount = document.getElementById('modal-total-amount');

    // If the modal total amount element exists
    if (modalTotalAmount) {
        // Set the text content to the formatted total amount
        modalTotalAmount.textContent = totalAmount.toLocaleString();
    }

    // If the modal element exists
    if (modal) {
        // Make the modal visible by setting display to block
        modal.style.display = 'block';
    }
}

// Function to hide payment modal
function hidePaymentModal() {
    const modal = document.getElementById('payment-modal');
    const qrDisplay = document.getElementById('qr-display');

    if (modal) {
        modal.style.display = 'none';
    }
    if (qrDisplay) {
        qrDisplay.style.display = 'none';
    }
}

// Function to handle cash payment
function handleCashPayment() {
    alert('Bạn đã chọn thanh toán bằng tiền mặt. Nhân viên sẽ liên hệ để xác nhận đơn hàng.');
    localStorage.removeItem('cart');
    location.reload();
}

// Function to calculate CRC16-CCITT
function crc16ccitt(data) {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc <<= 1;
            }
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

// Function to handle QR payment
function handleQRPayment() {
    const qrDisplay = document.getElementById('qr-display');
    const qrCode = document.querySelector('.qr-code');
    const totalAmount = getCart().reduce((total, item) => total + item.price * item.quantity, 0);
    if (qrDisplay && qrCode) {
        // Use VietQR API to generate QR code for bank transfer
        const bankId = "970422"; // MB BANK
        const accountNo = "228076432009";
        const accountName = "PHAN THANH NHAN";
        const amount = totalAmount.toString();
        const description = "Thanh toan don hang";
        // Generate QR using VietQR API
        qrCode.src = `https://api.vietqr.io/image/${bankId}-${accountNo}-${encodeURIComponent(accountName)}-${amount}-${encodeURIComponent(description)}.jpg?accountName=${encodeURIComponent(accountName)}`;
        qrDisplay.style.display = 'block';
    }
}

// Function to confirm QR payment
function confirmQRPayment() {
    alert('Thanh toán QR thành công! Cảm ơn bạn đã mua hàng.');
    localStorage.removeItem('cart');
    location.reload();
}

// Sự kiện khi trang được tải cho giỏ hàng
document.addEventListener('DOMContentLoaded', function() {
    displayCart();

    // Sự kiện cho nút thanh toán
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }

    // Payment modal events
    const modal = document.getElementById('payment-modal');
    const closeBtn = document.querySelector('.close');
    const cashPaymentBtn = document.getElementById('cash-payment');
    const qrPaymentBtn = document.getElementById('qr-payment');
    const confirmQRPaymentBtn = document.getElementById('confirm-qr-payment');

    if (closeBtn) {
        closeBtn.addEventListener('click', hidePaymentModal);
    }

    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                hidePaymentModal();
            }
        });
    }

    if (cashPaymentBtn) {
        cashPaymentBtn.addEventListener('click', handleCashPayment);
    }

    if (qrPaymentBtn) {
        qrPaymentBtn.addEventListener('click', handleQRPayment);
    }

    if (confirmQRPaymentBtn) {
        confirmQRPaymentBtn.addEventListener('click', confirmQRPayment);
    }


});

// Listen for storage changes to update cart display when user logs in/out
window.addEventListener('storage', function(e) {
    if (e.key === 'currentUser') {
        displayCart();
    }
});
