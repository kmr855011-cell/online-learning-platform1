// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact page
    initContactForm();
    initFAQ();
    initURLParameters();
    
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Initialize contact form validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('.form-control[required]');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    // Phone number validation (optional field)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            validatePhoneNumber(this);
        });
    }
}

// Form validation
function validateForm() {
    let isValid = true;
    const form = document.getElementById('contactForm');
    
    // Clear all errors first
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.textContent = '';
    });
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('.form-control[required]');
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validate email format
    const emailField = document.getElementById('email');
    if (emailField.value.trim() && !validateEmail(emailField.value)) {
        showError(emailField, 'الرجاء إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    // Validate phone if provided
    const phoneField = document.getElementById('phone');
    if (phoneField.value.trim() && !validatePhoneNumber(phoneField)) {
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Skip if field is disabled
    if (field.disabled) return true;
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'هذا الحقل مطلوب';
        isValid = false;
    } else {
        // Field-specific validation
        switch (field.id) {
            case 'name':
                if (value && value.length < 2) {
                    errorMessage = 'الاسم يجب أن يكون على الأقل حرفين';
                    isValid = false;
                }
                break;
                
            case 'email':
                if (value && !validateEmail(value)) {
                    errorMessage = 'الرجاء إدخال بريد إلكتروني صحيح';
                    isValid = false;
                }
                break;
                
            case 'subject':
                if (value === '') {
                    errorMessage = 'الرجاء اختيار موضوع الرسالة';
                    isValid = false;
                }
                break;
                
            case 'message':
                if (value && value.length < 10) {
                    errorMessage = 'الرسالة يجب أن تكون على الأقل 10 أحرف';
                    isValid = false;
                }
                break;
        }
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    } else {
        clearError(field);
    }
    
    return isValid;
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number
function validatePhoneNumber(phoneInput) {
    const phone = phoneInput.value.trim();
    
    if (!phone) return true; // Optional field
    
    // Egyptian phone number pattern
    const phoneRegex = /^01[0-2,5]\d{8}$/;
    
    if (!phoneRegex.test(phone)) {
        showError(phoneInput, 'الرجاء إدخال رقم هاتف مصري صحيح (11 رقم)');
        return false;
    }
    
    clearError(phoneInput);
    return true;
}

// Show error message
function showError(field, message) {
    field.classList.add('error');
    
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
    }
    
    // Add ARIA attributes for accessibility
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', field.id + 'Error');
}

// Clear error message
function clearError(field) {
    field.classList.remove('error');
    
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
    }
    
    // Update ARIA attributes
    field.setAttribute('aria-invalid', 'false');
}

// Submit form
function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.btn-primary');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'block';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        newsletter: formData.get('newsletter') === 'on',
        timestamp: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        
        // Log submission (in real app, send to server)
        console.log('Form submitted:', data);
        
        // Scroll to success message
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }, 1500);
}

// Show success message
function showSuccessMessage() {
    let successMessage = document.querySelector('.success-message');
    
    if (!successMessage) {
        successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<p>✓ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</p>';
        
        const form = document.getElementById('contactForm');
        form.appendChild(successMessage);
    }
    
    successMessage.classList.add('active');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('active');
    }, 5000);
}

// Initialize FAQ functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
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
    
    // FAQ quick links
    const faqLinks = document.querySelectorAll('.faq-link');
    faqLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetItem = document.querySelector(targetId);
            
            if (targetItem) {
                // Open the FAQ item
                const question = targetItem.querySelector('.faq-question');
                if (question) {
                    question.click();
                }
                
                // Scroll to the FAQ item
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetItem.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize URL parameters for prefilling form
function initURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Prefill form if parameters exist
    if (urlParams.has('subject')) {
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            subjectSelect.value = urlParams.get('subject');
        }
    }
    
    if (urlParams.has('message')) {
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            messageTextarea.value = urlParams.get('message');
        }
    }
    
    // Handle courses page redirect with filter
    if (urlParams.has('filter')) {
        const filterLinks = document.querySelectorAll('[href*="courses.html"]');
        filterLinks.forEach(link => {
            const url = new URL(link.href);
            url.searchParams.set('filter', urlParams.get('filter'));
            link.href = url.toString();
        });
    }
}

// Social media link handlers
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.className.includes('facebook') ? 'Facebook' :
                           this.className.includes('twitter') ? 'Twitter' :
                           this.className.includes('instagram') ? 'Instagram' :
                           this.className.includes('youtube') ? 'YouTube' : 'LinkedIn';
            
            alert(`جاري توجيهك إلى صفحة ${platform} الرسمية للمنصة.`);
            
            // In real application, this would open the actual social media page
            // window.open(this.href, '_blank');
        });
    });
});

// Phone number formatting
function formatPhoneNumber(phone) {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if the number has an area code
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 11) {
        return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
    }
    
    return phone;
}

// Initialize phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        if (this.value.trim()) {
            this.value = formatPhoneNumber(this.value);
        }
    });
}

// Keyboard shortcuts for accessibility
document.addEventListener('keydown', function(e) {
    // Focus on search input with Ctrl+F
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Submit form with Ctrl+Enter when focused on textarea
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName === 'TEXTAREA') {
            const form = activeElement.closest('form');
            if (form && form.id === 'contactForm') {
                form.dispatchEvent(new Event('submit'));
            }
        }
    }
});

// Auto-save form data (local storage)
function autoSaveForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Save form data on input
    const formInputs = form.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            saveFormData();
        });
    });
    
    // Load saved data on page load
    loadFormData();
}

function saveFormData() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    localStorage.setItem('contactFormDraft', JSON.stringify(data));
}

function loadFormData() {
    const savedData = localStorage.getItem('contactFormDraft');
    if (savedData) {
        const data = JSON.parse(savedData);
        const form = document.getElementById('contactForm');
        
        Object.keys(data).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input && !input.value) {
                input.value = data[key];
            }
        });
    }
}

// Initialize auto-save
if (document.getElementById('contactForm')) {
    autoSaveForm();
}

// Clear saved form data on successful submission
function clearSavedFormData() {
    localStorage.removeItem('contactFormDraft');
}

// Update form submission to clear saved data
const originalSubmitForm = submitForm;
submitForm = function() {
    originalSubmitForm();
    clearSavedFormData();
};