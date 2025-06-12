// Parteien in Deutschland - Exercise Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize with German content
    const currentLanguage = 'de';
    
    // Navigation functionality
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        // Update navigation buttons
        if (index === slides.length - 1) {
            nextBtn.innerHTML = `Zurück zur Übersicht <i class="fas fa-home"></i>`;
        } else {
            nextBtn.innerHTML = `Weiter <i class="fas fa-arrow-right"></i>`;
        }
        
        prevBtn.style.display = index === 0 ? 'none' : 'block';
    }

    // Initialize first slide
    showSlide(0);

    // Event listeners for navigation
    nextBtn.addEventListener('click', () => {
        if (currentSlide === slides.length - 1) {
            window.location.href = '../../index.html';
        } else {
            currentSlide++;
            showSlide(currentSlide);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });

    // Check if there's a saved progress for this exercise
    const savedProgress = localStorage.getItem('parteien_in_deutschland_progress');
    if (savedProgress) {
        const savedIndex = parseInt(savedProgress);
        if (savedIndex > 0 && savedIndex < slides.length) {
            showSlide(savedIndex);
        }
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
