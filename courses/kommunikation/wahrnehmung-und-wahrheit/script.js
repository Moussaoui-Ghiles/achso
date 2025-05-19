document.addEventListener('DOMContentLoaded', function() {
    // Initialize slide navigation
    initSlideNavigation();
    
    // Initialize Hotspot Quiz
    initHotspotQuiz();
    
    // Initialize Perception Multiple Choice Quiz
    initPerceptionMultipleChoiceQuiz();
    
    // Initialize Circle Size Multiple Choice Quiz
    initCircleSizeMultipleChoiceQuiz();
    
    // Initialize Optical Illusion Slider
    initOpticalIllusionSlider();
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
    }

    // Video handling
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('ended', function() {
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

// Custom Multiple Choice for ball counting exercise
function initializeMultipleChoice() {
    const checkButton = document.getElementById('check-answer');
    if (!checkButton) return;

    checkButton.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="ball-count"]:checked');
        const feedbackDiv = document.getElementById('feedback');
        
        if (!selectedOption) {
            feedbackDiv.textContent = 'Bitte wähle eine Antwort aus.';
            feedbackDiv.className = 'feedback warning';
            return;
        }
        
        const correctAnswer = '22';
        const isCorrect = selectedOption.value === correctAnswer;
        
        if (isCorrect) {
            feedbackDiv.textContent = 'Richtig! Die korrekte Antwort ist 22.';
            feedbackDiv.className = 'feedback correct';
        } else {
            feedbackDiv.textContent = 'Nicht ganz. Die richtige Antwort ist 22.';
            feedbackDiv.className = 'feedback incorrect';
        }
        
        // Highlight the correct answer
        document.querySelectorAll('input[name="ball-count"]').forEach(radio => {
            const label = document.querySelector(`label[for="${radio.id}"]`);
            if (radio.value === correctAnswer) {
                label.classList.add('correct-answer');
            } else if (radio.checked) {
                label.classList.add('wrong-answer');
            }
        });
        
        // Disable all options after checking
        document.querySelectorAll('input[name="ball-count"]').forEach(radio => {
            radio.disabled = true;
        });
        
        // Disable the check button
        checkButton.disabled = true;
        
        // Highlight the next button to prompt the user to continue
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.classList.add('highlight');
            setTimeout(() => nextBtn.classList.remove('highlight'), 2000);
        }
    });
}

function initHotspotQuiz() {
    const checkButton = document.getElementById('check-hotspot');
    if (!checkButton) return;

    checkButton.addEventListener('click', function() {
        const selectedItems = document.querySelectorAll('input[name="remembered-items"]:checked');
        const feedbackDiv = document.getElementById('hotspot-feedback');
        
        if (selectedItems.length === 0) {
            feedbackDiv.textContent = 'Bitte wähle mindestens einen Gegenstand aus.';
            feedbackDiv.className = 'feedback warning';
            return;
        }
        
        // All answers are correct in this exercise - it's about personal perception
        feedbackDiv.textContent = 'Danke für deine Auswahl! Jeder Mensch merkt sich unterschiedliche Dinge, je nach Interesse und Erfahrung.';
        feedbackDiv.className = 'feedback correct';
        
        // Disable all options after checking
        document.querySelectorAll('input[name="remembered-items"]').forEach(checkbox => {
            checkbox.disabled = true;
        });
        
        // Disable the check button
        checkButton.disabled = true;
        
        // Highlight the next button to prompt the user to continue
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.classList.add('highlight');
            setTimeout(() => nextBtn.classList.remove('highlight'), 2000);
        }
    });
}

function initPerceptionMultipleChoiceQuiz() {
    const checkButton = document.getElementById('check-perception');
    if (!checkButton) return;

    checkButton.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="perception"]:checked');
        const feedbackDiv = document.getElementById('perception-feedback');
        
        if (!selectedOption) {
            feedbackDiv.textContent = 'Bitte wähle eine Antwort aus.';
            feedbackDiv.className = 'feedback warning';
            return;
        }
        
        // Both answers are correct in this context-based perception exercise
        feedbackDiv.textContent = 'Beide Antworten sind richtig! Es kann sowohl als "13" als auch als "B" wahrgenommen werden - je nachdem, welchen Kontext du im Kopf hast.';
        feedbackDiv.className = 'feedback correct';
        
        // Highlight all answers as correct
        document.querySelectorAll('input[name="perception"]').forEach(radio => {
            const label = document.querySelector(`label[for="${radio.id}"]`);
            label.classList.add('correct-answer');
        });
        
        // Disable all options after checking
        document.querySelectorAll('input[name="perception"]').forEach(radio => {
            radio.disabled = true;
        });
        
        // Disable the check button
        checkButton.disabled = true;
        
        // Highlight the next button to prompt the user to continue
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.classList.add('highlight');
            setTimeout(() => nextBtn.classList.remove('highlight'), 2000);
        }
    });
}

function initCircleSizeMultipleChoiceQuiz() {
    const checkButton = document.getElementById('check-circles');
    if (!checkButton) return;

    checkButton.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="circle-size"]:checked');
        const feedbackDiv = document.getElementById('circles-feedback');
        
        if (!selectedOption) {
            feedbackDiv.textContent = 'Bitte wähle eine Antwort aus.';
            feedbackDiv.className = 'feedback warning';
            return;
        }
        
        // Both answers are correct since the circles are actually the same size
        feedbackDiv.textContent = 'Tatsächlich sind beide Kreise genau gleich groß! Dies ist eine optische Täuschung, die durch die unterschiedlich großen roten Kreise verursacht wird.';
        feedbackDiv.className = 'feedback correct';
        
        // Highlight all answers as "correct" since they're the same size
        document.querySelectorAll('input[name="circle-size"]').forEach(radio => {
            const label = document.querySelector(`label[for="${radio.id}"]`);
            label.classList.add('correct-answer');
        });
        
        // Disable all options after checking
        document.querySelectorAll('input[name="circle-size"]').forEach(radio => {
            radio.disabled = true;
        });
        
        // Disable the check button
        checkButton.disabled = true;
        
        // Highlight the next button to prompt the user to continue
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.classList.add('highlight');
            setTimeout(() => nextBtn.classList.remove('highlight'), 2000);
        }
    });
}
// Optical Illusion Slider
function initOpticalIllusionSlider() {
    const slider = document.getElementById('illusion-slider');
    const mask = document.getElementById('illusion-mask');
    
    if (!slider || !mask) return;
    
    slider.addEventListener('input', function() {
        const value = this.value;
        mask.style.width = value + '%';
    });
}
