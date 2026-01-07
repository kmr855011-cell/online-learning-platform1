// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initAboutPage();
    initScrollAnimations();
    initCounterAnimation();
    initBackToTop();
    initTeamCards();
    initTimelineAnimation();
    
    // Set current year
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Initialize about page components
function initAboutPage() {
    console.log('About page initialized');
    
    // Add animation classes to hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroTitle) heroTitle.classList.add('animate-text');
    
    // Initialize mission stats counter
    initMissionStats();
    
    // Initialize value cards animation
    initValueCards();
    
    // Initialize timeline items
    initTimelineItems();
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('visible');
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter animation for stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const suffix = counter.textContent.includes('+') ? '+' : '';
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Mission stats animation
function initMissionStats() {
    const missionStats = document.querySelector('.mission-stats');
    if (!missionStats) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = missionStats.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const suffix = counter.textContent.includes('+') ? '+' : '';
                    animateCounter(counter, target, suffix);
                });
                observer.unobserve(missionStats);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(missionStats);
}

// Animate counter function
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 100;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / (target / increment)));
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// Value cards animation
function initValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Staggered animation
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    valueCards.forEach(card => {
        observer.observe(card);
    });
}

// Timeline animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200); // Staggered animation
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize timeline items
function initTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        if (content) {
            content.style.transitionDelay = Math.random() * 0.5 + 's';
        }
    });
}

// Team cards animation
function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Staggered animation
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    teamCards.forEach(card => {
        observer.observe(card);
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Handle team card hover effects
function initTeamHoverEffects() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.team-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.team-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Initialize team hover effects after cards are visible
setTimeout(() => {
    initTeamHoverEffects();
}, 1000);

// Parallax effect for hero section
function initParallaxEffect() {
    const heroSection = document.querySelector('.about-hero');
    const shapes = document.querySelectorAll('.shape');
    
    if (!heroSection || !shapes.length) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Initialize parallax effect
initParallaxEffect();

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add active class to current section in navigation
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize scroll-based navigation highlighting
updateActiveNavOnScroll();

// Add loading animation to page
function addLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner-circle"></div>
            <div class="spinner-text">جاري التحميل...</div>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 500);
    });
}

// Add loading animation if needed
// addLoadingAnimation();

// Handle image loading
function handleImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize image lazy loading
handleImageLoading();

// Add CSS for loading overlay (dynamic injection)
const loadingStyles = `
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

.loading-spinner {
    text-align: center;
    color: white;
}

.spinner-circle {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    margin: 0 auto 20px;
    animation: spin 1s linear infinite;
}

.spinner-text {
    font-size: 1rem;
    font-weight: 500;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

img[data-src] {
    opacity: 0;
    transition: opacity 0.3s ease;
}

img.loaded {
    opacity: 1;
}
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);