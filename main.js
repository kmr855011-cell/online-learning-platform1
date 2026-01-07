// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initTestimonials();
    initCourses();
    initFormValidation();
    
    // Initialize scroll effects
    window.addEventListener('scroll', handleScroll);
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Navigation Functions
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Update aria-expanded attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Testimonials Slider
function initTestimonials() {
    const testimonials = [
        {
            content: "المنصة غيرت طريقة مذاكرتي تماماً، أصبحت أكثر تنظيمًا وفهمًا للمواد",
            author: "أحمد محمد",
            role: "طالب ثانوية عامة"
        },
        {
            content: "الكورسات ساعدتني في فهم المواد الصعبة وحققت نتائج ممتازة",
            author: "سارة علي",
            role: "طالبة ثانوية علمي علوم"
        },
        {
            content: "أدوات المتابعة والتقارير ساعدتني في تحسين مستواي الدراسي",
            author: "محمد خالد",
            role: "طالب ثانوية علمي رياضة"
        }
    ];
    
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <p>${testimonial.content}</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <span>${testimonial.role}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Courses Loader
function initCourses() {
    const courses = [
        {
            id: 1,
            title: "الرياضيات المتقدمة",
            category: "رياضيات",
            description: "شرح متكامل لمنهج الرياضيات للثانوية العامة مع تمارين وتطبيقات عملية",
            price: 299,
            originalPrice: 499,
            duration: "30 ساعة"
        },
        {
            id: 2,
            title: "الفيزياء الحديثة",
            category: "فيزياء",
            description: "فهم أساسيات الفيزياء وتطبيقاتها في الحياة العملية",
            price: 249,
            originalPrice: 399,
            duration: "25 ساعة"
        },
        {
            id: 3,
            title: "الكيمياء العضوية",
            category: "كيمياء",
            description: "شرح مبسط للكيمياء العضوية مع تجارب افتراضية",
            price: 279,
            originalPrice: 449,
            duration: "28 ساعة"
        },
        {
            id: 4,
            title: "الأحياء الجزيئية",
            category: "أحياء",
            description: "دراسة متعمقة في الأحياء الجزيئية والوراثة",
            price: 229,
            originalPrice: 349,
            duration: "22 ساعة"
        },
        {
            id: 5,
            title: "اللغة العربية",
            category: "عربي",
            description: "تحسين مهارات اللغة العربية والقواعد النحوية",
            price: 199,
            originalPrice: 299,
            duration: "20 ساعة"
        },
        {
            id: 6,
            title: "اللغة الإنجليزية",
            category: "إنجليزي",
            description: "تطوير مهارات اللغة الإنجليزية للمستوى المتقدم",
            price: 269,
            originalPrice: 429,
            duration: "26 ساعة"
        }
    ];
    
    const coursesGrid = document.querySelector('.courses-grid');
    if (coursesGrid) {
        coursesGrid.innerHTML = courses.map(course => `
            <div class="course-card">
                <div class="course-image"></div>
                <div class="course-content">
                    <span class="course-category">${course.category}</span>
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-meta">
                        <div class="course-duration">⏱️ ${course.duration}</div>
                        <div class="course-price">
                            <span>${course.originalPrice} ج.م</span>
                            ${course.price} ج.م
                        </div>
                    </div>
                    <button class="btn btn-primary course-btn" data-course-id="${course.id}">
                        ابدأ الآن
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to course buttons
        const courseButtons = document.querySelectorAll('.course-btn');
        courseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const courseId = this.getAttribute('data-course-id');
                showCourseModal(courseId);
            });
        });
    }
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formData = new FormData(this);
            
            // Clear previous error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.classList.remove('show');
                msg.textContent = '';
            });
            
            // Validate name
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                showError(nameInput, 'الرجاء إدخال الاسم');
                isValid = false;
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'الرجاء إدخال بريد إلكتروني صحيح');
                isValid = false;
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'الرسالة يجب أن تكون 10 أحرف على الأقل');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('.btn-primary');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'جاري الإرسال...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Show success message
                    alert('تم إرسال رسالتك بنجاح! سنرد عليك في أقرب وقت.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                clearError(this);
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
}

// Helper Functions
function showError(input, message) {
    input.classList.add('error');
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearError(input) {
    input.classList.remove('error');
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.classList.remove('show');
    }
}

function validateField(field) {
    let isValid = true;
    let message = '';
    
    switch (field.id) {
        case 'name':
            if (!field.value.trim()) {
                isValid = false;
                message = 'الرجاء إدخال الاسم';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'الرجاء إدخال بريد إلكتروني صحيح';
            }
            break;
            
        case 'message':
            if (field.value.trim().length < 10) {
                isValid = false;
                message = 'الرسالة يجب أن تكون 10 أحرف على الأقل';
            }
            break;
    }
    
    if (!isValid) {
        showError(field, message);
    } else {
        clearError(field);
    }
    
    return isValid;
}

function handleScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function showCourseModal(courseId) {
    // In a real project, you would fetch course details and show a modal
    // For now, we'll show a simple alert
    alert(`تم اختيار الكورس رقم ${courseId}\nسيتم توجيهك إلى صفحة التسجيل قريباً.`);
    
    // Simulate navigation to course page
    // window.location.href = `course.html?id=${courseId}`;
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Close modal on Escape key
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
    
    // Navigate through form fields with Tab
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});