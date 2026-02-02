// Dữ liệu sản phẩm mẫu
const products = [
    { id: 1, name: 'iPhone 14', brand: 'iPhone', price: 10990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/p/h/photo_2022-09-28_21-58-57_2.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/p/h/photo_2022-09-28_21-58-48_1.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/p/h/photo_2022-09-28_21-58-51_1.jpg'], 
            colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại thông minh cao cấp từ Apple.' },
    { id: 13, name: 'iPhone 13', brand: 'iPhone', price: 9990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/_/e/_en_2_5.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/r/tr_ng_5.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/d/_/d_ng_3.jpg'], 
            colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại thông minh mạnh mẽ từ Apple với camera xuất sắc.' },
    { id: 14, name: 'iPhone 12', brand: 'iPhone', price: 8990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/2/_/2._en_2.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/2/_/2._t_ng_1.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/2/_/2._d_ng_2.jpg'], 
            colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại 5G đầu tiên của Apple với thiết kế đẹp.' },
    { id: 15, name: 'iPhone SE', brand: 'iPhone', price: 6990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/_/n/_nenes.png', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/r/tr_nghyju.png', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/d/f/dfpelre.png'], 
            colors: ['Đen', 'Trắng', 'Đỏ'], description: 'Điện thoại giá rẻ với sức mạnh của iPhone.' },
    { id: 16, name: 'iPhone 15 Pro', brand: 'iPhone', price: 13990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-den_1.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-trang_1__1.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-xanh_1_.jpg'], 
            colors: ['Đen', 'Trắng', 'Titan xanh'], description: 'Điện thoại Pro với khung titanium và camera tiên tiến.' },
    { id: 17, name: 'iPhone 15 Pro Max', brand: 'iPhone', price: 15990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-max-titan-den.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-max-titan-trang.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-max-titan-xanh.jpg'], 
            colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại flagship lớn nhất của Apple với camera zoom 5x.' },
    { id: 7, name: 'iPhone 15', brand: 'iPhone', price: 11990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-128-gbden.png',
             'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-hong.png',
              'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-128gb-xanh-duong.png'],
               colors: ['Đen', 'Hồng', 'Xanh'], description: 'Điện thoại thông minh mới nhất từ Apple.' },

    { id: 2, name: 'Samsung Galaxy S23', brand: 'Samsung', price: 9490000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/p/h/photo_2024-12-26_16-48-25_3.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/p/h/photo_2024-12-26_16-48-22_3.jpg',
             'https://cdn2.cellphones.com.vn/358x/media/catalog/product/p/h/photo_2024-12-26_16-48-15_3.jpg'], 
             colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại Android mạnh mẽ từ Samsung.' },
    { id: 18, name: 'Samsung Galaxy S22', brand: 'Samsung', price: 8990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/s/m/sm-s901_galaxys22_front_phantomblack_211122_2.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/s/m/sm-s901_galaxys22_front_phantomwhite_211122_2.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/s/m/sm-s901_galaxys22_front_green_211123_2.jpg'],
             colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại Android với camera 50MP và màn hình 120Hz.' },
    { id: 19, name: 'Samsung Galaxy S21', brand: 'Samsung', price: 7990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s21-1_2_2.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_c_s_t.png'],
              colors: ['Xám ', 'Tím'], description: 'Điện thoại với camera 64MP và sạc nhanh 25W.' },
    { id: 20, name: 'Samsung Galaxy A54', brand: 'Samsung', price: 6990000, images:
         ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/s/m/sm-a546_galaxy_a54_5g_awesome_graphite_front_4_2_2_1.png',
             'https://cdn2.cellphones.com.vn/358x/media/catalog/product/s/a/sam-a54-a546-5g-8gb-256gb-tr-99.png',
              'https://cdn2.cellphones.com.vn/358x/media/catalog/product/s/a/samsung-galaxy-a54-5g-8gb-256gb.png'],
               colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại tầm trung với camera 50MP và pin 5000mAh.' },
    { id: 21, name: 'Samsung Galaxy Z Fold 5', brand: 'Samsung', price: 24990000, images:
         ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/s/a/samsung-galaxy-z-fold-5-5g-512gb-cu-xuoc-can.png',
             'https://cdn2.cellphones.com.vn/358x/media/catalog/product/s/a/sam-z-fold5-f946-5g-512gb-va-90.png',
              'https://cdn2.cellphones.com.vn/358x/media/catalog/product/s/a/samsung-galaxy-z-fold-5-5g-512gb-cu-xuoc-can_1.png'],
               colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại màn hình gập với trải nghiệm đa nhiệm tuyệt vời.' },
    { id: 22, name: 'Samsung Galaxy Note 20 Ultra', brand: 'Samsung', price: 19990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/b/l/black_final_3_1.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/w/h/white_final_2_2_1.jpg',
             'https://cdn2.cellphones.com.vn/358x/media/catalog/product/y/e/yellow_final_4_2_1.jpg'],
              colors: ['Đen', 'Trắng', 'Đồng'], description: 'Điện thoại với bút S Pen và màn hình lớn.' },
    { id: 8, name: 'Samsung Galaxy S24', brand: 'Samsung', price: 9990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/g/a/galaxy-s24-den_4.png', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/g/a/galaxy-s24-xam_4.png', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/g/a/galaxy-s24-tim_4.png'],
             colors: ['Đen', 'Xám', 'Tím'], description: 'Điện thoại Android tiên tiến từ Samsung.' },
   
    { id: 3, name: 'Xiaomi 13', brand: 'Xiaomi', price: 7990000, images: 
        ['https://dienthoaihay.vn/images/products/2024/01/16/large/xiaomi-13-den_1705461140.jpg.jpg',
             'https://dienthoaihay.vn/images/products/2024/01/16/large/xiaomi-13-trang_1705461139.jpg.jpg',
              'https://dienthoaihay.vn/images/products/2024/01/30/large/xiaomi-13_1706627103.jpg.jpg'],
               colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại giá rẻ với tính năng cao từ Xiaomi.' },
    { id: 24, name: 'Xiaomi 11', brand: 'Xiaomi', price: 6990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/i/xiaomi-mi-11-lite-5g-3_13_2_2.png', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/i/xiaomi-mi-11-lite-5g-1_12_4.png',
             'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/i/xiaomi-mi-11-lite-5g-2_10_2_1_5.png'], 
             colors: ['Đen', 'Vàng', 'Xanh'], description: 'Điện thoại với Snapdragon 888 và sạc nhanh 55W.' },
    { id: 25, name: 'Redmi Note 12', brand: 'Xiaomi', price: 4990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/r/g/rgt76878_1__2.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/_/7/_76666_6__2.jpg'],
             colors: ['Đen', 'Xanh'], description: 'Điện thoại giá rẻ với camera 50MP và pin 5000mAh.' },
    { id: 26, name: 'Xiaomi 14 Pro', brand: 'Xiaomi', price: 9990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14_2__2_1.png'],
               colors: ['Xanh'], description: 'Điện thoại flagship với camera Leica và Snapdragon 8 Gen 3.' },
    { id: 27, name: 'Xiaomi 14 Ultra', brand: 'Xiaomi', price: 11990000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/i/xiaomi-14-ultra-1.jpg', 
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/i/xiaomi-14-ultra-2.jpg'],
             colors: ['Đen', 'Trắng',], description: 'Điện thoại camera chuyên nghiệp với ống kính Leica.' },
    { id: 9, name: 'Xiaomi 14', brand: 'Xiaomi', price: 8490000, images: 
        ['https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/i/xiaomi-14-pre-den_1.png',
             'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/i/xiaomi-14-pre-trang_1.png', 
             'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/i/xiaomi-14-pre-xanh-la_1.png'],
              colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại giá tốt với công nghệ mới từ Xiaomi.' },

    
              { id: 4, name: 'Google Pixel 7', brand: 'Google', price: 8990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/_/v_by6.jpg'],
               colors: ['Trắng'], description: 'Điện thoại chụp ảnh tuyệt vời từ Google.' },
    { id: 28, name: 'Google Pixel 6', brand: 'Google', price: 7990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/g/gggg_1.jpg', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/o/google-pixel-6-pro-1-600x600_1.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/g/gggg_2__1.jpg'],
             colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại với Google Tensor và camera xuất sắc.' },
    { id: 29, name: 'Google Pixel 6a', brand: 'Google', price: 6990000, images:
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/6/g/6gg_1_.jpg', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/6/g/6gg_2_.jpg', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/6/g/6gg_3_.jpg'], 
            colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại giá rẻ với camera Google và Android thuần.' },
    { id: 30, name: 'Google Pixel 7a', brand: 'Google', price: 7990000, images: 
        ['https://sanhmobile.com/wp-content/uploads/2024/08/Google-Pixel-7-fullbox-1.webp',
             'https://sanhmobile.com/wp-content/uploads/2024/08/Pixel-7-trang.png', 
             'https://sanhmobile.com/wp-content/uploads/2024/08/Google-Pixel-7.jpg'], 
             colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại với Tensor G2 và camera cải tiến.' },
    { id: 31, name: 'Google Pixel 8 Pro', brand: 'Google', price: 10990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/o/google-pixel-8-pro_3_.png', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/o/google-pixel-8-pro_7_.png', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/o/google-pixel-8-pro_5_.png'],
             colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại flagship với AI và camera 7 năm cập nhật.' },
    { id: 32, name: 'Google Pixel 9', brand: 'Google', price: 9990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-google-pixel-9_1_.png', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-google-pixel-9.png', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-google-pixel-9_3_.png'], 
            colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại mới nhất với Gemini AI tích hợp.' },
    { id: 10, name: 'Google Pixel 8', brand: 'Google', price: 9490000, images:
         ['https://www.didongmy.com/vnt_upload/product/08_2025/thumbs/600_google_pixel_8_obsidian_thumb_600x600_2.jpg',
             'https://www.didongmy.com/vnt_upload/product/08_2025/thumbs/600_google_pixel_8_rose_thumb_600x600_2.jpg', 
             'https://www.didongmy.com/vnt_upload/product/08_2025/thumbs/600_google_pixel_8_hazel_thumb_600x600_2.jpg'], 
             colors: ['Đen', 'Hồng', 'Xanh'], description: 'Điện thoại chụp ảnh xuất sắc từ Google.' },

    { id: 5, name: 'OnePlus 11', brand: 'OnePlus', price: 9990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus_11_-_black_-_rgb_3.jpg', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus_11_-_green_-_rgb_3.jpg'], 
            colors: ['Đen', 'Xanh'], description: 'Điện thoại nhanh chóng với sạc siêu tốc.' },
    { id: 11, name: 'OnePlus 12', brand: 'OnePlus', price: 10490000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus-12_1_.jpg', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus-12.jpg'],
             colors: ['Đen', 'Xanh'], description: 'Điện thoại tốc độ cao với sạc nhanh.' },
    { id: 33, name: 'OnePlus 10', brand: 'OnePlus', price: 8990000, images:
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus-10-pro-5g-dual-sim.jpg'],
               colors: [ 'Xanh'], description: 'Điện thoại với Snapdragon 8 Gen 1 và sạc siêu tốc 80W.' },
    { id: 34, name: 'OnePlus 9', brand: 'OnePlus', price: 7990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus-9-600x600-600x600.jpg', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus-9.jpg'], 
            colors: ['Đen', 'Xám',], description: 'Điện thoại với camera Hasselblad và OxygenOS.' },
    { id: 35, name: 'OnePlus Nord', brand: 'OnePlus', price: 5990000, images:
         ['https://cdn.tgdd.vn/Products/Images/42/225535/oneplus-nord-5g-xam-200x200-750x500.png'],
              colors: ['Đen'], description: 'Điện thoại tầm trung với sạc nhanh 65W.' },
    { id: 36, name: 'OnePlus 12 Pro', brand: 'OnePlus', price: 11990000, images:
        ['https://sg.mobilekishop.net/products/oneplus-12-pro-default.jpg'],
               colors: ['Đen'], description: 'Điện thoại flagship với Snapdragon 8 Gen 3 và camera Hasselblad.' },
    { id: 37, name: 'OnePlus Ace 5 Pro', brand: 'OnePlus', price: 6990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus-ace-5-pro-12gb-256gb-cu-tray-xuoc.jpg'],
             colors: ['Đen'], description: 'Điện thoại gaming với sạc nhanh 150W.' },

    { id: 6, name: 'Sony Xperia 5 IV', brand: 'Sony', price: 9490000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_245.jpg',
              'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/2/_/2_235.jpg'],
               colors: ['Đen', 'Xanh'], description: 'Điện thoại chuyên nghiệp cho nhiếp ảnh.' },
    { id: 12, name: 'Sony Xperia 1 V', brand: 'Sony', price: 9990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/o/sony-xperia-1-v_1.png', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/o/sony-xperia-1-v_3__1.png'],
             colors: ['Đen', 'Xanh'], description: 'Điện thoại flagship cho nhiếp ảnh từ Sony.' },
    { id: 38, name: 'Sony Xperia 10', brand: 'Sony', price: 6990000, images: 
        ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-sony-xperia-10-vii-1.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-sony-xperia-10-vii-2.jpg', 
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-sony-xperia-10-vii.jpg'],
             colors: ['Đen', 'Trắng', 'Xanh'], description: 'Điện thoại màn hình 21:9 với âm thanh Dolby Atmos.' },
    
];
