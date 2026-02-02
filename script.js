// Biến phân trang
let currentPage = 1;
const itemsPerPage = 10;

// Hàm hiển thị danh sách sản phẩm với phân trang
function displayProducts(filteredProducts = products) {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = '';

        // Tính toán sản phẩm hiển thị trên trang hiện tại
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToShow = filteredProducts.slice(startIndex, endIndex);

        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Giá: ${product.price.toLocaleString()} VND</p>
                <div class="quantity-selector">
                    <label>Số lượng:</label>
                    <button class="quantity-btn" data-action="decrease" data-id="${product.id}">-</button>
                    <input type="number" id="quantity-${product.id}" class="quantity-input" value="1" min="1" max="10">
                    <button class="quantity-btn" data-action="increase" data-id="${product.id}">+</button>
                </div>
                <button class="btn add-to-cart" data-id="${product.id}">Thêm Vào Giỏ</button>
                <a href="product-detail.html?id=${product.id}" class="btn">Xem Chi Tiết</a>
            `;
            productList.appendChild(productCard);
        });

        // Hiển thị phân trang
        displayPagination(filteredProducts.length);
    }
}

// Hàm tìm kiếm sản phẩm
function searchProducts(query, productsToSearch = products) {
    if (!query.trim()) {
        return productsToSearch;
    }
    const lowerQuery = query.toLowerCase();
    return productsToSearch.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.brand.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
}

// Hàm hiển thị phân trang
function displayPagination(totalItems) {
    const pagination = document.getElementById('pagination');
    if (pagination) {
        pagination.innerHTML = '';

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (totalPages <= 1) return;

        // Nút Previous
        if (currentPage > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'page-btn';
            prevBtn.textContent = 'Trước';
            prevBtn.addEventListener('click', () => {
                currentPage--;
                displayProducts(getFilteredProducts());
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pagination.appendChild(prevBtn);
        }

        // Các nút số trang
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-btn';
            if (i === currentPage) pageBtn.classList.add('active');
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                displayProducts(getFilteredProducts());
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pagination.appendChild(pageBtn);
        }

        // Nút Next
        if (currentPage < totalPages) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'page-btn';
            nextBtn.textContent = 'Sau';
            nextBtn.addEventListener('click', () => {
                currentPage++;
                displayProducts(getFilteredProducts());
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pagination.appendChild(nextBtn);
        }
    }
}

// Hàm lấy danh sách sản phẩm đã lọc
function getFilteredProducts() {
    let filteredProducts = products;

    // Lọc theo hãng
    const selectedBrand = document.querySelector('.brand-btn.active').getAttribute('data-brand');
    if (selectedBrand !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
    }

    // Lọc theo tìm kiếm
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput && searchInput.value.trim()) {
        filteredProducts = searchProducts(searchInput.value.trim(), filteredProducts);
    }

    return filteredProducts;
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

// Function to initialize brand dropdown
function initBrandDropdown() {
    const brandToggle = document.getElementById('brand-toggle');
    const brandList = document.getElementById('brand-list');

    if (brandToggle && brandList) {
        brandToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            brandList.classList.toggle('show');
        });

        // Xử lý chọn hãng máy
        const brandButtons = document.querySelectorAll('.brand-btn');
        brandButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedBrand = this.getAttribute('data-brand');

                // Cập nhật text của nút toggle
                if (selectedBrand === 'all') {
                    brandToggle.textContent = 'Hãng Máy ▼';
                } else {
                    brandToggle.textContent = this.textContent + ' ▼';
                }

                // Đóng dropdown
                brandList.classList.remove('show');

                // Cập nhật trạng thái active
                brandButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Lọc sản phẩm theo hãng (nếu cần)
                filterProducts(selectedBrand);
            });
        });

        // Đóng dropdown khi click bên ngoài
        document.addEventListener('click', function(event) {
            const brandDropdown = document.querySelector('.brand-dropdown');
            if (brandDropdown && !brandDropdown.contains(event.target)) {
                brandList.classList.remove('show');
            }
        });
    }
}

// Function to initialize search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchInput && searchButton) {
        // Sự kiện khi nhấn nút tìm kiếm
        searchButton.addEventListener('click', function() {
            performSearch();
        });

        // Sự kiện khi nhấn Enter trong ô tìm kiếm
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Sự kiện khi nhập liệu để tìm kiếm real-time (tùy chọn)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch();
            }, 300); // Đợi 300ms sau khi ngừng nhập
        });
    }
}

// Hàm thực hiện tìm kiếm
function performSearch() {
    currentPage = 1; // Reset về trang đầu khi tìm kiếm
    const filteredProducts = getFilteredProducts();
    displayProducts(filteredProducts);
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAuthForm();
    initBrandDropdown();
    initSearch();
    updateCartCount();
});

// Listen for storage changes to update UI across tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'currentUser') {
        updateUserAccountUI();
    }
});

// Hiển thị sản phẩm
displayProducts();

// Thêm sự kiện cho các nút "Thêm vào giỏ"
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
    }
});

// Sự kiện cho các nút chọn dòng máy
const brandBtns = document.querySelectorAll('.brand-btn');
brandBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const brand = this.getAttribute('data-brand');
        filterProducts(brand);
        // Cập nhật trạng thái active
        brandBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Sự kiện cho nút toggle sidebar trên mobile
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });
}

// Hàm lọc sản phẩm theo dòng máy
function filterProducts(brand) {
    currentPage = 1; // Reset về trang đầu khi lọc
    const filteredProducts = getFilteredProducts();
    displayProducts(filteredProducts);
}
