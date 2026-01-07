/**
 * ملف التنقل الرئيسي
 * يحتوي على جميع وظائف التنقل والتفاعل للموقع
 */

// تهيئة التنقل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initSmoothScroll();
    initActiveLinks();
    initDropdowns();
    initKeyboardNavigation();
    
    // تحديث سنة حقوق النشر
    updateCopyrightYear();
});

// وظيفة تهيئة التنقل الرئيسية
function initNavigation() {
    console.log('✅ تم تهيئة نظام التنقل');
    
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    // إضافة حدث للتمرير
    window.addEventListener('scroll', function() {
        handleNavbarScroll(navbar);
    });
    
    // تحديث حالة التنقل عند التحميل
    handleNavbarScroll(navbar);
}

// إدارة قائمة الجوال
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    // حدث النقر على زر القائمة
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu(menuToggle, navMenu);
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMobileMenu(menuToggle, navMenu);
        }
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu(menuToggle, navMenu);
        });
    });
    
    // إغلاق القائمة عند تغيير حجم النافذة (إذا تم فتح القائمة)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu(menuToggle, navMenu);
        }
    });
}

// تبديل قائمة الجوال
function toggleMobileMenu(toggle, menu) {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
        closeMobileMenu(toggle, menu);
    } else {
        openMobileMenu(toggle, menu);
    }
}

// فتح قائمة الجوال
function openMobileMenu(toggle, menu) {
    toggle.classList.add('active');
    menu.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // إضافة طبقة شفافة لمنع التمرير
    addOverlay();
}

// إغلاق قائمة الجوال
function closeMobileMenu(toggle, menu) {
    toggle.classList.remove('active');
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
    // إزالة الطبقة الشفافة
    removeOverlay();
}

// إضافة طبقة شفافة عند فتح القائمة
function addOverlay() {
    let overlay = document.querySelector('.nav-overlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            display: none;
        `;
        
        overlay.addEventListener('click', function() {
            const menuToggle = document.getElementById('menuToggle');
            const navMenu = document.getElementById('navMenu');
            closeMobileMenu(menuToggle, navMenu);
        });
        
        document.body.appendChild(overlay);
    }
    
    setTimeout(() => {
        overlay.style.display = 'block';
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
    }, 10);
}

// إزالة الطبقة الشفافة
function removeOverlay() {
    const overlay = document.querySelector('.nav-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
}

// تأثيرات التمرير على شريط التنقل
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // تأثير الظهور/الاختفاء
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
            
            // إخفاء الشريط عند التمرير لأسفل
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        
        // تحديث الروابط النشطة
        updateActiveLinks();
    });
}

// التعامل مع تمرير شريط التنقل
function handleNavbarScroll(navbar) {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// التمرير السلس للروابط
function initSmoothScroll() {
    // روابط الهاش
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                smoothScrollTo(targetElement);
            }
        });
    });
    
    // روابط CTA
    document.querySelectorAll('.nav-cta, .hero-cta, .btn[href^="#"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    smoothScrollTo(targetElement);
                }
            }
        });
    });
}

// وظيفة التمرير السلس
function smoothScrollTo(targetElement) {
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - navbarHeight - 20;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// تحديث الروابط النشطة
function initActiveLinks() {
    updateActiveLinks();
    
    // تحديث عند التمرير
    window.addEventListener('scroll', updateActiveLinks);
}

function updateActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    // البحث عن القسم الحالي
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // تحديث حالة الروابط
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    // تحديث روابط الصفحات
    updatePageLinks();
}

// تحديث روابط الصفحات النشطة
function updatePageLinks() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link[href]');
    
    navLinks.forEach(link => {
        const linkPage = getPageFromHref(link.getAttribute('href'));
        
        // إزالة النشطة من جميع الروابط
        link.classList.remove('active');
        
        // إضافة النشطة للرابط الحالي
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// الحصول على الصفحة الحالية
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page;
}

// الحصول على الصفحة من رابط
function getPageFromHref(href) {
    if (!href || href.startsWith('#')) return '';
    
    // إذا كان الرابط خارجي
    if (href.startsWith('http')) return '';
    
    // إذا كان الرابط داخلي
    if (href.includes('/')) {
        return href.split('/').pop();
    }
    
    return href;
}

// تهيئة القوائم المنسدلة
function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        const dropdown = toggle.closest('.dropdown');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!menu) return;
        
        // حدث النقر
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // إغلاق جميع القوائم الأخرى
            closeAllDropdownsExcept(dropdown);
            
            // تبديل القائمة الحالية
            const isOpen = menu.classList.contains('show');
            if (isOpen) {
                closeDropdown(menu);
            } else {
                openDropdown(menu);
            }
        });
        
        // إغلاق عند النقر خارج القائمة
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                closeDropdown(menu);
            }
        });
    });
}

// فتح قائمة منسدلة
function openDropdown(menu) {
    menu.classList.add('show');
    menu.style.display = 'block';
    
    // إضافة تأثير
    setTimeout(() => {
        menu.style.opacity = '1';
        menu.style.transform = 'translateY(0)';
    }, 10);
}

// إغلاق قائمة منسدلة
function closeDropdown(menu) {
    menu.style.opacity = '0';
    menu.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        menu.classList.remove('show');
        menu.style.display = 'none';
    }, 300);
}

// إغلاق جميع القوائم المنسدلة ما عدا واحدة
function closeAllDropdownsExcept(exceptDropdown) {
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        const dropdown = menu.closest('.dropdown');
        if (dropdown !== exceptDropdown) {
            closeDropdown(menu);
        }
    });
}

// التنقل بواسطة لوحة المفاتيح
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // زر Escape لإغلاق القوائم
        if (e.key === 'Escape') {
            closeAllMenus();
        }
        
        // التنقل باستخدام Tab في القائمة المنسدلة
        if (e.key === 'Tab') {
            handleTabNavigation(e);
        }
    });
}

// إغلاق جميع القوائم
function closeAllMenus() {
    // إغلاق قائمة الجوال
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    closeMobileMenu(menuToggle, navMenu);
    
    // إغلاق القوائم المنسدلة
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        closeDropdown(menu);
    });
    
    // إزالة الطبقة الشفافة
    removeOverlay();
}

// التعامل مع التنقل بواسطة Tab
function handleTabNavigation(e) {
    const activeElement = document.activeElement;
    
    // إذا كان العنصر النشط داخل قائمة منسدلة مفتوحة
    const openDropdown = activeElement.closest('.dropdown-menu.show');
    if (openDropdown) {
        const dropdownItems = openDropdown.querySelectorAll('a, button, [tabindex]');
        const firstItem = dropdownItems[0];
        const lastItem = dropdownItems[dropdownItems.length - 1];
        
        // إذا كان Shift+Tab من العنصر الأول
        if (e.shiftKey && activeElement === firstItem) {
            e.preventDefault();
            openDropdown.closest('.dropdown').querySelector('.dropdown-toggle').focus();
            closeDropdown(openDropdown);
        }
        // إذا كان Tab من العنصر الأخير
        else if (!e.shiftKey && activeElement === lastItem) {
            e.preventDefault();
            openDropdown.closest('.dropdown').querySelector('.dropdown-toggle').focus();
            closeDropdown(openDropdown);
        }
    }
    
    // إذا كان العنصر النشط هو زر القائمة في الجوال
    if (activeElement.id === 'menuToggle' && !e.shiftKey) {
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
            const firstNavLink = navMenu.querySelector('.nav-link');
            if (firstNavLink) firstNavLink.focus();
        }
    }
}

// تحديث سنة حقوق النشر
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// وظائف مساعدة عامة
const Navigation = {
    // فتح/إغلاق قائمة الجوال
    toggleMobileMenu: function() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        if (menuToggle && navMenu) {
            toggleMobileMenu(menuToggle, navMenu);
        }
    },
    
    // إغلاق جميع القوائم
    closeAll: function() {
        closeAllMenus();
    },
    
    // التمرير إلى قسم معين
    scrollTo: function(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            smoothScrollTo(targetElement);
            closeAllMenus();
        }
    },
    
    // تحديث الروابط النشطة
    updateActive: function() {
        updateActiveLinks();
    },
    
    // الحصول على حالة القائمة
    isMenuOpen: function() {
        const navMenu = document.getElementById('navMenu');
        return navMenu ? navMenu.classList.contains('active') : false;
    }
};

// جعل الوظائف متاحة عالمياً
window.Navigation = Navigation;

// CSS ديناميكي للطبقة الشفافة
const navOverlayStyles = `
.nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.dropdown-menu {
    display: none;
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-menu.show {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 768px) {
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        z-index: 1000;
        padding: 1rem;
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
}
`;

// إضافة الأنماط الديناميكية
function addNavigationStyles() {
    if (!document.querySelector('#nav-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'nav-styles';
        styleSheet.textContent = navOverlayStyles;
        document.head.appendChild(styleSheet);
    }
}

// إضافة الأنماط عند التحميل
addNavigationStyles();

// تهيئة التنقل عند تحميل الصفحة بالكامل
window.addEventListener('load', function() {
    // تحديث الروابط النشطة بعد تحميل الصفحة
    setTimeout(updateActiveLinks, 100);
    
    // التأكد من إغلاق القوائم عند تحميل الصفحة
    if (window.innerWidth > 768) {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        closeMobileMenu(menuToggle, navMenu);
    }
});

// تصدير الوظائف للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}