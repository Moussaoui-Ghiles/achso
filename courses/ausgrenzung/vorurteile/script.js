document.addEventListener('DOMContentLoaded', function() {
    // Initialize slide navigation
    initSlideNavigation();
    
    // Initialize language selector if available
    if (typeof initLanguageSelector === 'function') {
        initLanguageSelector();
    }
});

function initSlideNavigation() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    let currentSlide = 0;

    // Initialize first slide
    slides[0].classList.add('active');
    updateNavigation();
    updateProgress();

    // Navigation button event listeners
    prevBtn.addEventListener('click', showPreviousSlide);
    nextBtn.addEventListener('click', showNextSlide);

    function showPreviousSlide() {
        if (currentSlide > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide--;
            slides[currentSlide].classList.add('active');
            updateNavigation();
            updateProgress();
            pauseAllMedia();
        }
    }

    function showNextSlide() {
        if (currentSlide < slides.length - 1) {
            slides[currentSlide].classList.remove('active');
            currentSlide++;
            slides[currentSlide].classList.add('active');
            updateNavigation();
            updateProgress();
            pauseAllMedia();
        }
    }

    function updateNavigation() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
    }

    function updateProgress() {
        const progress = ((currentSlide + 1) / slides.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }

    function pauseAllMedia() {
        // Pause all videos
        document.querySelectorAll('video').forEach(video => {
            video.pause();
        });

        // Pause all audio
        document.querySelectorAll('audio').forEach(audio => {
            audio.pause();
        });
    }

    // Media handling
    document.querySelectorAll('video, audio').forEach(media => {
        media.addEventListener('ended', function() {
            const nextBtn = document.querySelector('.next-btn');
            if (nextBtn && !nextBtn.disabled) {
                nextBtn.classList.add('highlight');
                setTimeout(() => nextBtn.classList.remove('highlight'), 2000);
            }
        });
    });

    // H5P handling
    const h5pContainers = document.querySelectorAll('.h5p-container');
    h5pContainers.forEach(container => {
        if (container.dataset.h5pUrl) {
            const iframe = document.createElement('iframe');
            iframe.src = container.dataset.h5pUrl;
            iframe.className = 'h5p-iframe';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', 'allowfullscreen');
            container.appendChild(iframe);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            showPreviousSlide();
        } else if (e.key === 'ArrowRight') {
            showNextSlide();
        }
    });

    // Touch navigation
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                showPreviousSlide();
            } else {
                showNextSlide();
            }
        }
    }
}

// Initialize quiz functionality
function initQuiz(quizId, correctAnswers) {
    const quizContainer = document.getElementById(quizId);
    if (!quizContainer) return;
    
    const submitBtn = quizContainer.querySelector('.submit-btn');
    const feedbackBox = quizContainer.querySelector('.feedback-box');
    
    submitBtn.addEventListener('click', function() {
        const selectedOptions = quizContainer.querySelectorAll('input[type="radio"]:checked');
        const userAnswers = Array.from(selectedOptions).map(option => option.value);
        
        // Compare answers
        let allCorrect = true;
        if (userAnswers.length !== correctAnswers.length) {
            allCorrect = false;
        } else {
            for (let i = 0; i < userAnswers.length; i++) {
                if (userAnswers[i] !== correctAnswers[i]) {
                    allCorrect = false;
                    break;
                }
            }
        }
        
        // Show feedback
        if (feedbackBox) {
            feedbackBox.style.display = 'block';
            if (allCorrect) {
                feedbackBox.classList.remove('incorrect');
                feedbackBox.classList.add('correct');
                feedbackBox.textContent = 'Richtig! Gut gemacht.';
            } else {
                feedbackBox.classList.remove('correct');
                feedbackBox.classList.add('incorrect');
                feedbackBox.textContent = 'Nicht ganz richtig. Versuche es nochmal.';
            }
        }
    });
}

// Language selector functionality
function initLanguageSelector() {
    const languages = ['de', 'en', 'ar', 'fa'];
    const languageSelector = document.querySelector('.language-selector');
    
    if (!languageSelector) return;
    
    // Set initial language based on browser or default to German
    let currentLang = localStorage.getItem('language') || 'de';
    updateLanguage(currentLang);
    
    // Add event listeners to language buttons
    languages.forEach(lang => {
        const btn = languageSelector.querySelector(`.lang-btn[data-lang="${lang}"]`);
        if (btn) {
            btn.addEventListener('click', function() {
                updateLanguage(lang);
                localStorage.setItem('language', lang);
            });
        }
    });
    
    function updateLanguage(lang) {
        // Update all elements with data-lang attributes
        document.querySelectorAll(`[data-lang-${lang}]`).forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) {
                if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'button')) {
                    el.value = text;
                } else {
                    el.textContent = text;
                }
            }
        });
        
        // Update active state on language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update RTL/LTR direction
        if (lang === 'ar' || lang === 'fa') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
    }
}
