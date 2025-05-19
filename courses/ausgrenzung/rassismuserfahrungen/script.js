document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    const progressPercent = document.querySelector('.progress-percent');
    
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    
    // Calculate initial progress percentage
    const initialProgress = ((currentSlideIndex + 1) / totalSlides) * 100;
    
    // Set initial progress bar width
    progressBar.style.width = `${initialProgress}%`;
    
    // Set initial progress text
    if (progressPercent) {
        progressPercent.textContent = Math.round(initialProgress);
    }
    
    // Show the first slide on load
    slides[currentSlideIndex].classList.add('active');
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
        if (currentSlideIndex < totalSlides - 1) {
            moveToSlide(currentSlideIndex + 1);
        }
    });
    
    // Previous button click handler
    prevBtn.addEventListener('click', function() {
        if (currentSlideIndex > 0) {
            moveToSlide(currentSlideIndex - 1);
        }
    });
    
    // Function to move to a specific slide
    function moveToSlide(index) {
        // Hide current slide
        slides[currentSlideIndex].classList.remove('active');
        
        // Pause any media on the current slide before moving
        pauseAllMedia();
        
        // Show new slide
        currentSlideIndex = index;
        slides[currentSlideIndex].classList.add('active');
        
        // Update buttons state
        updateButtonsState();
        
        // Update progress bar
        updateProgressBar();
        
        // Scroll to top of the slide
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Update the state of navigation buttons
    function updateButtonsState() {
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    }
    
    // Update the progress bar
    function updateProgressBar() {
        const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Update the percentage display
        const progressPercent = document.querySelector('.progress-percent');
        if (progressPercent) {
            progressPercent.textContent = Math.round(progress);
        }
    }
    
    // Pause all media elements (audio, video) to prevent them from playing in the background
    function pauseAllMedia() {
        const mediaElements = document.querySelectorAll('audio, video');
        mediaElements.forEach(media => {
            if (media && typeof media.pause === 'function') {
                media.pause();
                if (media.currentTime) {
                    media.currentTime = 0;
                }
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' && currentSlideIndex < totalSlides - 1) {
            moveToSlide(currentSlideIndex + 1);
        }
        if (event.key === 'ArrowLeft' && currentSlideIndex > 0) {
            moveToSlide(currentSlideIndex - 1);
        }
    });
    
    // Language switcher functionality (if needed)
    const languageSwitchers = document.querySelectorAll('.language-switcher');
    
    languageSwitchers.forEach(switcher => {
        switcher.addEventListener('click', function() {
            const lang = this.dataset.lang;
            switchLanguage(lang);
        });
    });
    
    function switchLanguage(lang) {
        const elementsWithLang = document.querySelectorAll('[data-lang-' + lang + ']');
        
        elementsWithLang.forEach(element => {
            const targetText = element.getAttribute('data-lang-' + lang);
            if (targetText) {
                element.textContent = targetText;
            }
        });
        
        // Update active language in the UI
        languageSwitchers.forEach(switcher => {
            switcher.classList.toggle('active', switcher.dataset.lang === lang);
        });
        
        // Store the selected language in localStorage
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Check for saved language preference on load
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        switchLanguage(savedLanguage);
    }
    
    // Initialize buttons state
    updateButtonsState();
});
