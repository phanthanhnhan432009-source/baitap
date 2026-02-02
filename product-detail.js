// Biến toàn cục cho sản phẩm hiện tại
let currentProduct = null;

// Hàm lấy ID sản phẩm từ URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Hàm cập nhật thành tiền
function updateTotal() {
    if (currentProduct) {
        const quantity = parseInt(document.getElementById(`quantity-${currentProduct.id}`).value);
        const total = currentProduct.price * quantity;
        document.getElementById(`total-${currentProduct.id}`).textContent = total.toLocaleString();
    }
}

// Function to update cart count in navigation
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Function to show login dropdown
function showLoginDropdown() {
    const accountDropdown = document.querySelector('.account-dropdown');
    if (accountDropdown) {
        accountDropdown.classList.add('show');
        // Focus on the username input to make it obvious
        const usernameInput = document.getElementById('username');
        if (usernameInput) {
            usernameInput.focus();
        }
    }
}

// Function to initialize auth form
function initAuthForm() {
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!username || !password) {
                alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
                return;
            }

            // Lấy dữ liệu người dùng từ localStorage hoặc khởi tạo mảng rỗng
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Tìm người dùng
            const user = users.find(u => u.username === username);

            if (user) {
                if (user.password === password) {
                    // Lưu trạng thái đăng nhập
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    // Tự động load lại trang
                    location.reload();
                } else {
                    alert('Mật khẩu không đúng.');
                }
            } else {
                alert('Tên đăng nhập không tồn tại.');
            }
        });

        // Xử lý nút đăng ký
        const registerBtn = document.getElementById('register-btn');
        if (registerBtn) {
            registerBtn.addEventListener('click', function() {
                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value.trim();

                if (!username || !password) {
                    alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
                    return;
                }

                // Lấy dữ liệu người dùng từ localStorage hoặc khởi tạo mảng rỗng
                let users = JSON.parse(localStorage.getItem('users')) || [];

                // Kiểm tra xem tên đăng nhập đã tồn tại chưa
                const existingUser = users.find(u => u.username === username);
                if (existingUser) {
                    alert('Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.');
                    return;
                }

                // Thêm người dùng mới
                const newUser = { username, password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Đăng ký thành công! Bây giờ bạn có thể đăng nhập.');
            });
        }
    }
}

// Function to update user account UI
function updateUserAccountUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const accountBtn = document.querySelector('.account-btn');
    const accountDropdown = document.querySelector('.account-dropdown');
    const authForm = document.getElementById('auth-form');

    if (currentUser && accountBtn) {
        accountBtn.innerHTML = `<span>${currentUser.username}</span>`;
        accountBtn.style.background = 'rgba(255, 255, 255, 0.2)';

        // Hide the auth form
        if (authForm) {
            authForm.style.display = 'none';
        }

        // Add logout button to dropdown
        if (accountDropdown) {
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'btn';
            logoutBtn.textContent = 'Đăng xuất';
            logoutBtn.style.marginTop = '10px';
            logoutBtn.addEventListener('click', function() {
                localStorage.removeItem('currentUser');
                location.reload();
            });

            // Remove existing logout button if any
            const existingLogout = accountDropdown.querySelector('.logout-btn');
            if (existingLogout) {
                existingLogout.remove();
            }

            logoutBtn.classList.add('logout-btn');
            accountDropdown.appendChild(logoutBtn);
        }
    } else if (accountBtn) {
        accountBtn.innerHTML = ' Đăng nhập';
        accountBtn.style.background = 'rgba(255, 255, 255, 0.1)';

        // Show the auth form
        if (authForm) {
            authForm.style.display = 'block';
        }

        // Remove logout button if exists
        if (accountDropdown) {
            const existingLogout = accountDropdown.querySelector('.logout-btn');
            if (existingLogout) {
                existingLogout.remove();
            }
        }
    }
}

// Navigation functionality
function initNavigation() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('show');
                hamburger.classList.remove('active');
            }
        });
    }

    // Account dropdown toggle
    const accountBtn = document.querySelector('.account-btn');
    const accountDropdown = document.querySelector('.account-dropdown');

    if (accountBtn && accountDropdown) {
        accountBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            accountDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!accountBtn.contains(event.target) && !accountDropdown.contains(event.target)) {
                accountDropdown.classList.remove('show');
            }
        });
    }

    // Update user account UI
    updateUserAccountUI();
}

// Hàm hiển thị chi tiết sản phẩm
function displayProductDetail() {
    const productId = getProductIdFromURL();
    currentProduct = products.find(p => p.id === productId);
    const productDetailContent = document.getElementById('product-detail-content');

    if (currentProduct) {
        const colorOptions = currentProduct.colors.map((color, index) => `<option value="${index}">${color}</option>`).join('');
        productDetailContent.innerHTML = `
            <div class="product-detail-container">
                <div class="product-image">
                    <img src="${currentProduct.images[0]}" alt="${currentProduct.name}" id="main-image">
                    <div class="color-selector">
                        <label for="color-select">Chọn màu:</label>
                        <select id="color-select">
                            ${colorOptions}
                        </select>
                    </div>
                </div>
                <div class="product-info">
                    <h2>${currentProduct.name}</h2>
                    <p class="product-description">${currentProduct.description}</p>
                    <p class="product-price">Giá: ${currentProduct.price.toLocaleString()} VND</p>
                    <div class="quantity-selector">
                        <label>Số lượng:</label>
                        <button class="quantity-btn" data-action="decrease" data-id="${currentProduct.id}">-</button>
                        <input type="number" id="quantity-${currentProduct.id}" class="quantity-input" value="1" min="1" max="10">
                        <button class="quantity-btn" data-action="increase" data-id="${currentProduct.id}">+</button>
                    </div>
                    <p class="product-total">Thành tiền: <span id="total-${currentProduct.id}">${currentProduct.price.toLocaleString()}</span> VND</p>
                    <div class="button-container">
                        <button class="btn add-to-cart detail-btn" data-id="${currentProduct.id}">Thêm Vào Giỏ</button>
                        <a href="products.html" class="btn detail-btn">Quay Lại Sản Phẩm</a>
                    </div>
                </div>
            </div>
        `;

        // Thêm sự kiện cho color selector
        const colorSelect = document.getElementById('color-select');
        colorSelect.addEventListener('change', function() {
            const index = parseInt(this.value);
            document.getElementById('main-image').src = currentProduct.images[index];
        });

        // Cập nhật thành tiền ban đầu
        updateTotal();
    } else {
        productDetailContent.innerHTML = '<p>Sản phẩm không tồn tại.</p>';
    }
}

// Sự kiện khi trang được tải cho chi tiết sản phẩm
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAuthForm();
    updateCartCount();
    displayProductDetail();

    // Thêm sự kiện cho nút "Thêm vào giỏ"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const quantityInput = document.getElementById(`quantity-${productId}`);
            const quantity = parseInt(quantityInput.value);
            addToCart(productId, quantity);
        } else if (e.target.classList.contains('quantity-btn')) {
            const action = e.target.getAttribute('data-action');
            const productId = parseInt(e.target.getAttribute('data-id'));
            const quantityInput = document.getElementById(`quantity-${productId}`);
            let quantity = parseInt(quantityInput.value);
            if (action === 'increase' && quantity < 10) {
                quantity++;
            } else if (action === 'decrease' && quantity > 1) {
                quantity--;
            }
            quantityInput.value = quantity;
            updateTotal();
        }
    });

    // Thêm sự kiện cho input số lượng
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            updateTotal();
        }
    });
});

// Listen for storage changes to update UI across tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'currentUser') {
        updateUserAccountUI();
    }
});
