// Parteien in Deutschland - Exercise Script

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const languageBtns = document.querySelectorAll('.language-btn');
    
    // State
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    let currentLanguage = 'de'; // Default language
    
    // Initialize progress bar
    updateProgressBar();
    
    // Event Listeners
    prevBtn.addEventListener('click', goToPreviousSlide);
    nextBtn.addEventListener('click', goToNextSlide);
    
    // Language selection
    languageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            
            // Update active state
            languageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Initialize with the correct language content
    changeLanguage(currentLanguage);
    
    // Check if there's a saved progress for this exercise
    const savedProgress = localStorage.getItem('parteien_in_deutschland_progress');
    if (savedProgress) {
        const savedIndex = parseInt(savedProgress);
        if (savedIndex > 0 && savedIndex < totalSlides) {
            goToSlide(savedIndex);
        }
    }
    
    // Functions
    function goToPreviousSlide() {
        if (currentSlideIndex > 0) {
            goToSlide(currentSlideIndex - 1);
        }
    }
    
    function goToNextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            goToSlide(currentSlideIndex + 1);
        }
    }
    
    function goToSlide(index) {
        // Hide current slide
        slides[currentSlideIndex].classList.remove('active');
        
        // Show new slide
        currentSlideIndex = index;
        slides[currentSlideIndex].classList.add('active');
        
        // Update buttons state
        updateButtonsState();
        
        // Update progress bar
        updateProgressBar();
        
        // Save progress
        localStorage.setItem('parteien_in_deutschland_progress', currentSlideIndex);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function updateButtonsState() {
        // Disable prev button on first slide
        prevBtn.disabled = currentSlideIndex === 0;
        
        // Change next button on last slide
        if (currentSlideIndex === totalSlides - 1) {
            nextBtn.innerHTML = `<span data-lang-${currentLanguage}="Zurück zur Übersicht">Zurück zur Übersicht</span> <i class="fas fa-home"></i>`;
            nextBtn.onclick = function() {
                window.location.href = '../../../index.html';
            };
        } else {
            nextBtn.innerHTML = `<span data-lang-${currentLanguage}="Weiter">Weiter</span> <i class="fas fa-arrow-right"></i>`;
            nextBtn.onclick = goToNextSlide;
        }
        
        // Update the button text for current language
        updateLanguageInElement(nextBtn);
    }
    
    function updateProgressBar() {
        const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }
    
    function changeLanguage(lang) {
        currentLanguage = lang;
        
        document.querySelectorAll('[data-lang-de], [data-lang-en], [data-lang-ar], [data-lang-fa]').forEach(el => {
            updateLanguageInElement(el);
        });
        
        // Update direction for Arabic and Persian
        if (lang === 'ar' || lang === 'fa') {
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl');
        } else {
            document.documentElement.dir = 'ltr';
            document.body.classList.remove('rtl');
        }
        
        // Update button states for the new language
        updateButtonsState();
    }
    
    function updateLanguageInElement(el) {
        const langAttr = `data-lang-${currentLanguage}`;
        if (el.hasAttribute(langAttr)) {
            el.textContent = el.getAttribute(langAttr);
        }
        
        // For elements with children (like buttons with spans and icons)
        const langSpans = el.querySelectorAll(`[${langAttr}]`);
        langSpans.forEach(span => {
            span.textContent = span.getAttribute(langAttr);
        });
    }
    
    // Handle any videos that need to play automatically
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.hasAttribute('autoplay')) {
            video.play().catch(e => {
                console.log('Autoplay prevented:', e);
            });
        }
    });
    
    // Initialize quiz interactions if any
    function initializeQuizzes() {
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                const questionId = this.parentNode.getAttribute('data-question-id');
                const isCorrect = this.getAttribute('data-correct') === 'true';
                const options = document.querySelectorAll(`.quiz-options[data-question-id="${questionId}"] .quiz-option`);
                const feedback = document.querySelector(`.quiz-feedback[data-question-id="${questionId}"]`);
                
                // Reset all options
                options.forEach(opt => {
                    opt.classList.remove('selected', 'correct', 'incorrect');
                });
                
                // Mark this option as selected
                this.classList.add('selected');
                
                // Mark correct or incorrect
                if (isCorrect) {
                    this.classList.add('correct');
                    feedback.textContent = 'Richtig! Gut gemacht!';
                    feedback.className = 'quiz-feedback correct';
                } else {
                    this.classList.add('incorrect');
                    feedback.textContent = 'Leider falsch. Versuche es noch einmal!';
                    feedback.className = 'quiz-feedback incorrect';
                    
                    // Also show the correct answer
                    options.forEach(opt => {
                        if (opt.getAttribute('data-correct') === 'true') {
                            opt.classList.add('correct');
                        }
                    });
                }
            });
        });
    }
    
    // Call initialize quizzes if there are any quiz questions
    if (document.querySelectorAll('.quiz-option').length > 0) {
        initializeQuizzes();
    }
    
    // Handle party card interactions
    const partyCards = document.querySelectorAll('.party-card');
    if (partyCards.length > 0) {
        partyCards.forEach(card => {
            card.addEventListener('click', function() {
                const partyId = this.getAttribute('data-party-id');
                const partyDetailElement = document.getElementById(`party-detail-${partyId}`);
                
                if (partyDetailElement) {
                    // Hide all details first
                    document.querySelectorAll('.party-detail').forEach(detail => {
                        detail.style.display = 'none';
                    });
                    
                    // Show this party's details
                    partyDetailElement.style.display = 'block';
                    
                    // Scroll to the detail section
                    partyDetailElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
});
