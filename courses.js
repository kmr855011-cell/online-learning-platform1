// Courses Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize courses page
    initCoursesPage();
    initFAQ();
    initModal();
    initFilterLinks();
});

// Main initialization function
function initCoursesPage() {
    // Load courses from data
    const courses = getCoursesData();
    
    // Display courses
    displayCourses(courses);
    
    // Set up search functionality
    const searchInput = document.getElementById('courseSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterCourses();
        });
    }
    
    // Set up filter functionality
    const courseFilter = document.getElementById('courseFilter');
    if (courseFilter) {
        courseFilter.addEventListener('change', function() {
            filterCourses();
        });
    }
    
    // Initialize pagination
    initPagination(courses);
}

// Courses data
function getCoursesData() {
    return [
        {
            id: 1,
            title: "الرياضيات المتقدمة للثانوية العامة",
            category: "math",
            categoryName: "الرياضيات",
            description: "شرح متكامل لجميع فروع الرياضيات في منهج الثانوية العامة، مع حلول وتطبيقات عملية وتمارين تفاعلية.",
            price: 299,
            originalPrice: 499,
            duration: "30 ساعة",
            lectures: 45,
            level: "متقدم",
            rating: 4.9,
            students: 1250,
            instructor: "د. محمد أحمد",
            features: [
                "شرح مفصل لجميع الفصول",
                "تمارين وتدريبات عملية",
                "حلول نموذجية للامتحانات",
                "اختبارات تقييمية أسبوعية",
                "دعم فوري من المدرسين"
            ]
        },
        {
            id: 2,
            title: "الفيزياء الحديثة - الميكانيكا",
            category: "physics",
            categoryName: "الفيزياء",
            description: "فهم أساسيات الميكانيكا والحركة والقوى مع تطبيقات عملية وتمارين تفاعلية.",
            price: 249,
            originalPrice: 399,
            duration: "25 ساعة",
            lectures: 35,
            level: "متوسط",
            rating: 4.8,
            students: 980,
            instructor: "أ. سامي عبدالرحمن",
            features: [
                "شرح التجارب العملية",
                "محاكاة تفاعلية",
                "مسائل وحلول",
                "مراجعة شاملة",
                "نصائح للامتحان"
            ]
        },
        {
            id: 3,
            title: "الكيمياء العضوية المتكاملة",
            category: "chemistry",
            categoryName: "الكيمياء",
            description: "شرح مبسط للكيمياء العضوية مع تجارب افتراضية وتطبيقات عملية في الحياة اليومية.",
            price: 279,
            originalPrice: 449,
            duration: "28 ساعة",
            lectures: 40,
            level: "متقدم",
            rating: 4.7,
            students: 850,
            instructor: "د. هدى السيد",
            features: [
                "جداول تفاعلية",
                "تجارب محاكاة",
                "مركبات كيميائية",
                "تمارين تطبيقية",
                "اختبارات تجريبية"
            ]
        },
        {
            id: 4,
            title: "الأحياء الجزيئية والوراثة",
            category: "biology",
            categoryName: "الأحياء",
            description: "دراسة متعمقة في الأحياء الجزيئية والوراثة مع رسوم بيانية توضيحية وتطبيقات عملية.",
            price: 229,
            originalPrice: 349,
            duration: "22 ساعة",
            lectures: 32,
            level: "متوسط",
            rating: 4.6,
            students: 720,
            instructor: "د. أحمد سليمان",
            features: [
                "رسوم بيانية تفاعلية",
                "شرح الجينات والوراثة",
                "تطبيقات عملية",
                "اختبارات فهم",
                "مراجعات فصلية"
            ]
        },
        {
            id: 5,
            title: "قواعد اللغة العربية المتقدمة",
            category: "arabic",
            categoryName: "العربية",
            description: "تحسين مهارات اللغة العربية والقواعد النحوية مع تطبيقات عملية ونصوص أدبية.",
            price: 199,
            originalPrice: 299,
            duration: "20 ساعة",
            lectures: 28,
            level: "جميع المستويات",
            rating: 4.8,
            students: 1500,
            instructor: "أ. فاطمة حسن",
            features: [
                "قواعد النحو والصرف",
                "نصوص أدبية",
                "تحليل بلاغي",
                "كتابة وإملاء",
                "اختبارات تقييمية"
            ]
        },
        {
            id: 6,
            title: "الإنجليزية المتقدمة - التوفل التحضيري",
            category: "english",
            categoryName: "الإنجليزية",
            description: "تطوير مهارات اللغة الإنجليزية للمستوى المتقدم مع تحضير لامتحان التوفل.",
            price: 269,
            originalPrice: 429,
            duration: "26 ساعة",
            lectures: 38,
            level: "متقدم",
            rating: 4.9,
            students: 1800,
            instructor: "د. جون سميث",
            features: [
                "محادثة ومحادثة",
                "قواعد متقدمة",
                "تحضير التوفل",
                "كتابة أكاديمية",
                "اختبارات محاكاة"
            ]
        },
        {
            id: 7,
            title: "الرياضيات - التفاضل والتكامل",
            category: "math",
            categoryName: "الرياضيات",
            description: "شرح متعمق للتفاضل والتكامل مع تطبيقات هندسية وفيزيائية.",
            price: 329,
            originalPrice: 549,
            duration: "35 ساعة",
            lectures: 50,
            level: "متقدم",
            rating: 4.8,
            students: 950,
            instructor: "د. خالد محمد",
            features: [
                "مفاهيم أساسية",
                "تطبيقات عملية",
                "مسائل متنوعة",
                "حلول تفصيلية",
                "اختبارات فصلية"
            ]
        },
        {
            id: 8,
            title: "الكيمياء غير العضوية",
            category: "chemistry",
            categoryName: "الكيمياء",
            description: "دراسة شاملة للكيمياء غير العضوية والعناصر والمركبات.",
            price: 259,
            originalPrice: 419,
            duration: "24 ساعة",
            lectures: 36,
            level: "متوسط",
            rating: 4.7,
            students: 680,
            instructor: "د. إبراهيم محمود",
            features: [
                "جدول العناصر",
                "تفاعلات كيميائية",
                "تجارب محاكاة",
                "تمارين تطبيقية",
                "مراجعات شاملة"
            ]
        }
    ];
}

// Display courses in grid
function displayCourses(courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const noResults = document.getElementById('noResults');
    
    if (!coursesGrid) return;
    
    // Show loading
    if (loadingIndicator) {
        loadingIndicator.classList.add('active');
    }
    
    // Simulate loading delay
    setTimeout(() => {
        if (courses.length === 0) {
            coursesGrid.innerHTML = '';
            if (noResults) {
                noResults.style.display = 'block';
            }
        } else {
            coursesGrid.innerHTML = courses.map(course => `
                <div class="course-card" data-category="${course.category}" data-id="${course.id}">
                    <div class="course-image" style="background: linear-gradient(135deg, ${getCategoryColor(course.category)})"></div>
                    <div class="course-content">
                        <span class="course-category">${course.categoryName}</span>
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-description">${course.description.substring(0, 120)}...</p>
                        <div class="course-meta">
                            <div class="course-duration">⏱️ ${course.duration}</div>
                            <div class="course-price">
                                <span>${course.originalPrice} ج.م</span>
                                ${course.price} ج.م
                            </div>
                        </div>
                        <button class="btn btn-primary course-btn" onclick="showCourseDetails(${course.id})">
                            عرض التفاصيل
                        </button>
                    </div>
                </div>
            `).join('');
            
            if (noResults) {
                noResults.style.display = 'none';
            }
        }
        
        // Hide loading
        if (loadingIndicator) {
            loadingIndicator.classList.remove('active');
        }
    }, 500);
}

// Get color based on category
function getCategoryColor(category) {
    const colors = {
        math: ['#2563EB', '#3B82F6'],
        physics: ['#7C3AED', '#8B5CF6'],
        chemistry: ['#10B981', '#34D399'],
        biology: ['#F59E0B', '#FBBF24'],
        arabic: ['#EF4444', '#F87171'],
        english: ['#6366F1', '#818CF8']
    };
    
    return colors[category] || ['#2563EB', '#3B82F6'];
}

// Filter courses based on search and filter
function filterCourses() {
    const searchInput = document.getElementById('courseSearch');
    const filterSelect = document.getElementById('courseFilter');
    const allCourses = getCoursesData();
    
    let filteredCourses = [...allCourses];
    
    // Apply search filter
    if (searchInput && searchInput.value.trim() !== '') {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filteredCourses = filteredCourses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.categoryName.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply category filter
    if (filterSelect && filterSelect.value !== 'all') {
        filteredCourses = filteredCourses.filter(course => 
            course.category === filterSelect.value
        );
    }
    
    // Update statistics
    updateStatistics(filteredCourses);
    
    // Display filtered courses
    displayCourses(filteredCourses);
    
    // Update pagination
    initPagination(filteredCourses);
}

// Update statistics
function updateStatistics(courses) {
    const totalCourses = document.getElementById('totalCourses');
    const totalHours = document.getElementById('totalHours');
    const totalStudents = document.getElementById('totalStudents');
    
    if (totalCourses) {
        totalCourses.textContent = courses.length;
    }
    
    if (totalHours && courses.length > 0) {
        const totalHoursValue = courses.reduce((sum, course) => {
            const hours = parseInt(course.duration);
            return sum + (isNaN(hours) ? 0 : hours);
        }, 0);
        totalHours.textContent = totalHoursValue + '+';
    }
    
    if (totalStudents && courses.length > 0) {
        const totalStudentsValue = courses.reduce((sum, course) => sum + course.students, 0);
        totalStudents.textContent = totalStudentsValue.toLocaleString() + '+';
    }
}

// Initialize pagination
function initPagination(courses) {
    const itemsPerPage = 6;
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    
    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) {
            paginationContainer.innerHTML = '';
        }
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="pagination-btn" onclick="changePage(-1)" data-page="prev">
            السابق
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1) {
            paginationHTML += `
                <button class="pagination-btn active" onclick="changePage(${i})" data-page="${i}">
                    ${i}
                </button>
            `;
        } else {
            paginationHTML += `
                <button class="pagination-btn" onclick="changePage(${i})" data-page="${i}">
                    ${i}
                </button>
            `;
        }
    }
    
    // Next button
    paginationHTML += `
        <button class="pagination-btn" onclick="changePage(-2)" data-page="next">
            التالي
        </button>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
    
    // Store current page state
    window.currentPage = 1;
    window.currentCourses = courses;
    window.itemsPerPage = itemsPerPage;
    
    // Display first page
    displayPage(1, courses);
}

// Change page
function changePage(page) {
    const courses = window.currentCourses || [];
    const itemsPerPage = window.itemsPerPage || 6;
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    
    let newPage = window.currentPage || 1;
    
    if (page === -1) { // Previous
        newPage = Math.max(1, newPage - 1);
    } else if (page === -2) { // Next
        newPage = Math.min(totalPages, newPage + 1);
    } else {
        newPage = page;
    }
    
    if (newPage !== window.currentPage) {
        window.currentPage = newPage;
        displayPage(newPage, courses);
        updatePaginationButtons();
    }
}

// Display specific page
function displayPage(page, courses) {
    const itemsPerPage = window.itemsPerPage || 6;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCourses = courses.slice(startIndex, endIndex);
    
    displayCourses(pageCourses);
    
    // Scroll to top of courses section
    const coursesSection = document.querySelector('.courses-main');
    if (coursesSection) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const sectionPosition = coursesSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

// Update pagination buttons state
function updatePaginationButtons() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const currentPage = window.currentPage || 1;
    const courses = window.currentCourses || [];
    const itemsPerPage = window.itemsPerPage || 6;
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    
    paginationButtons.forEach(button => {
        const page = button.getAttribute('data-page');
        
        button.classList.remove('active');
        
        if (page === 'prev') {
            button.disabled = currentPage === 1;
        } else if (page === 'next') {
            button.disabled = currentPage === totalPages;
        } else if (parseInt(page) === currentPage) {
            button.classList.add('active');
        }
    });
}

// Initialize FAQ functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.classList.remove('open');
                }
            });
            
            // Toggle current FAQ item
            this.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('open');
        });
        
        // Keyboard navigation
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize modal
function initModal() {
    const modal = document.getElementById('courseModal');
    const modalClose = document.getElementById('modalClose');
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Show course details in modal
function showCourseDetails(courseId) {
    const courses = getCoursesData();
    const course = courses.find(c => c.id === courseId);
    
    if (!course) return;
    
    const modalBody = document.getElementById('modalBody');
    const modal = document.getElementById('courseModal');
    
    if (modalBody && modal) {
        const discountPercentage = Math.round((1 - course.price / course.originalPrice) * 100);
        
        modalBody.innerHTML = `
            <div class="course-details-header">
                <span class="course-category">${course.categoryName}</span>
                <h2 class="course-details-title">${course.title}</h2>
                <div class="course-details-meta">
                    <div class="meta-item">⏱️ ${course.duration}</div>
                    <div class="meta-item">🎓 ${course.level}</div>
                    <div class="meta-item">⭐ ${course.rating}</div>
                    <div class="meta-item">👨‍🎓 ${course.students.toLocaleString()} طالب</div>
                </div>
            </div>
            
            <div class="course-details-description">
                <h3>وصف الكورس</h3>
                <p>${course.description}</p>
            </div>
            
            <div class="course-features">
                <h3>مميزات الكورس</h3>
                <ul class="feature-list">
                    ${course.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="course-details-pricing">
                <div class="price-display">
                    <div class="current-price">${course.price} ج.م</div>
                    <div class="original-price">${course.originalPrice} ج.م</div>
                    <div class="discount-badge">وفر ${discountPercentage}%</div>
                </div>
                <p>يشمل هذا السعر جميع المحاضرات والمواد التعليمية والدعم الفني لمدة سنة كاملة.</p>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeModal()">تصفح المزيد</button>
                <button class="btn btn-primary" onclick="enrollInCourse(${course.id})">اشترك الآن</button>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Enroll in course
function enrollInCourse(courseId) {
    // In a real application, this would redirect to enrollment page
    alert(`جاري تسجيلك في الكورس رقم ${courseId}\nسيتم توجيهك إلى صفحة الدفع...`);
    closeModal();
    
    // Simulate redirect
    setTimeout(() => {
        window.location.href = `#enroll-${courseId}`;
    }, 1000);
}

// Initialize filter links in footer
function initFilterLinks() {
    const filterLinks = document.querySelectorAll('[data-filter]');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            const filterSelect = document.getElementById('courseFilter');
            
            if (filterSelect) {
                filterSelect.value = filterValue;
                filterCourses();
                
                // Scroll to courses section
                const coursesSection = document.querySelector('.courses-main');
                if (coursesSection) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const sectionPosition = coursesSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: sectionPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}