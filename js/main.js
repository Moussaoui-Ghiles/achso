document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'de';
        languageSelect.value = savedLanguage;
        
        // Set initial language and direction
        updateLanguage(savedLanguage);
        
        // Handle language change
        languageSelect.addEventListener('change', function() {
            const selectedLang = this.value;
            localStorage.setItem('preferredLanguage', selectedLang);
            updateLanguage(selectedLang);
        });
    }
    
    function updateLanguage(lang) {
        // Update document language and direction
        document.documentElement.lang = lang;
        document.documentElement.dir = (lang === 'ar' || lang === 'fa') ? 'rtl' : 'ltr';
        
        // Update all text elements with data-lang attributes
        document.querySelectorAll('[data-lang-de]').forEach(element => {
            const translation = element.getAttribute(`data-lang-${lang}`);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update all links with data-lang-href attributes
        document.querySelectorAll('a[data-lang-href-de]').forEach(link => {
            const href = link.getAttribute(`data-lang-href-${lang}`);
            if (href) {
                link.href = href;
            }
        });
        
        // Update page title
        const titles = {
            de: 'AchSo! Lernplattform',
            ar: 'منصة AchSo! التعليمية',
            fa: 'پلتفرم آموزشی AchSo!'
        };
        document.title = titles[lang] || titles.de;
        
        // Update aria-label for language selector
        const langLabels = {
            de: 'Sprache auswählen',
            ar: 'اختر اللغة',
            fa: 'انتخاب زبان'
        };
        languageSelect.setAttribute('aria-label', langLabels[lang] || langLabels.de);
        
        // Update scroll-to-top button title
        const scrollToTop = document.getElementById('scrollToTop');
        if (scrollToTop) {
            const scrollLabels = {
                de: 'Nach oben scrollen',
                ar: 'انتقل إلى الأعلى',
                fa: 'اسکرول به بالا'
            };
            scrollToTop.setAttribute('aria-label', scrollLabels[lang] || scrollLabels.de);
            scrollToTop.setAttribute('title', scrollLabels[lang] || scrollLabels.de);
        }
    }

    // Toggle course exercises visibility
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseId = this.getAttribute('data-course-id');
            const exercisesList = document.getElementById(`exercises-course-${courseId}`);
            
            // Toggle the active class
            const isActive = exercisesList.classList.contains('active');
            exercisesList.classList.toggle('active');
            this.classList.toggle('active');
            
            // Update ARIA attributes
            this.setAttribute('aria-expanded', !isActive);
            
            // Update button text based on current language
            const btnText = this.querySelector('.btn-text');
            const currentLang = document.documentElement.lang || 'de';
            
            if (exercisesList.classList.contains('active')) {
                // Change to "hide exercises" text
                const hideTexts = {
                    de: 'Übungen ausblenden',
                    ar: 'إخفاء التمارين',
                    fa: 'مخفی کردن تمرینات'
                };
                btnText.textContent = hideTexts[currentLang] || hideTexts.de;
            } else {
                // Restore original "show exercises" text
                const showText = btnText.getAttribute(`data-lang-${currentLang}`);
                if (showText) {
                    btnText.textContent = showText;
                }
            }
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add smooth hover effects to course containers
    const courseContainers = document.querySelectorAll('.course-container');
    
    courseContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.05)';
        });
    });

    // Add click effect to user profile
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Add keyboard support for user profile
        userProfile.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top action
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Loading animation for course buttons
    const startButtons = document.querySelectorAll('.start-btn');
    startButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const courseContainer = this.closest('.course-container');
            if (courseContainer) {
                courseContainer.classList.add('loading');
                
                // Remove loading class after a short delay (simulating loading)
                setTimeout(() => {
                    courseContainer.classList.remove('loading');
                }, 500);
            }
        });
    });
    
    // Intersection Observer for course animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe course containers for animation
    courseContainers.forEach(container => {
        container.style.animationPlayState = 'paused';
        observer.observe(container);
    });
    
    // Enhanced accessibility: Focus management
    document.addEventListener('keydown', function(e) {
        // Escape key to close expanded course sections
        if (e.key === 'Escape') {
            const openSections = document.querySelectorAll('.exercises-list.active');
            openSections.forEach(section => {
                const toggleBtn = document.querySelector(`[aria-controls="${section.id}"]`);
                if (toggleBtn) {
                    toggleBtn.click();
                    toggleBtn.focus();
                }
            });
        }
    });
    
    // Preload critical images
    const criticalImages = [
        'images/achso/logo.png',
        'images/drudel11-logo.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Performance: Lazy load non-critical images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Console welcome message
    console.log('🎉 AchSo! Lernplattform geladen - Willkommen!');
    console.log('🌍 Mehrsprachige Lernumgebung für Integration und Bildung');
});