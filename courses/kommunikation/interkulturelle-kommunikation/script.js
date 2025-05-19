document.addEventListener('DOMContentLoaded', function() {
    // Initialize slide navigation
    initSlideNavigation();
    
    // Initialize the gesture quiz
    initGestureQuiz();
    
    // Initialize the video quiz
    initVideoQuiz();
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

function initGestureQuiz() {
    // Sample data for gesture quiz
    const gestureData = [
        {
            id: 'gesture-1',
            imageSrc: 'images/thumbs-up.jpg',
            question: 'Was bedeutet diese Geste in den meisten Ländern?',
            options: [
                { id: 'g1-option1', text: 'Alles gut', correct: true },
                { id: 'g1-option2', text: 'Ich möchte sprechen', correct: false },
                { id: 'g1-option3', text: 'Beleidigung (in manchen Ländern)', correct: true }
            ],
            feedback: 'Die "Daumen hoch" Geste bedeutet in den meisten westlichen Ländern "Alles gut" oder "Prima". In einigen Ländern wie Iran, Irak oder Teilen von Griechenland, kann sie jedoch als beleidigende Geste angesehen werden.'
        },
        {
            id: 'gesture-2',
            imageSrc: 'images/kopfnicken.jpg',
            question: 'Bedeutet Kopfnicken überall "Ja"?',
            options: [
                { id: 'g2-option1', text: 'Ja, überall', correct: false },
                { id: 'g2-option2', text: 'Nein, in Bulgarien bedeutet es "Nein"', correct: true },
                { id: 'g2-option3', text: 'Es kommt auf die Geschwindigkeit an', correct: false }
            ],
            feedback: 'Kopfnicken bedeutet in den meisten Ländern "Ja", aber in Bulgarien und einigen Teilen Griechenlands bedeutet Kopfnicken "Nein" und Kopfschütteln bedeutet "Ja".'
        }
    ];

    const gestureQuizContainer = document.getElementById('gesture-quiz');
    if (!gestureQuizContainer) return;

    // Generate quiz content
    gestureData.forEach(gesture => {
        const gestureItem = document.createElement('div');
        gestureItem.className = 'gesture-item';
        gestureItem.id = gesture.id;

        let optionsHTML = '';
        gesture.options.forEach(option => {
            optionsHTML += `
                <div class="quiz-option">
                    <input type="checkbox" id="${option.id}" name="${gesture.id}-options" value="${option.id}">
                    <label for="${option.id}">${option.text}</label>
                </div>
            `;
        });

        gestureItem.innerHTML = `
            <img src="${gesture.imageSrc}" alt="Kulturelle Geste" class="gesture-image">
            <p>${gesture.question}</p>
            <div class="quiz-options">
                ${optionsHTML}
            </div>
            <button class="submit-btn" data-gesture-id="${gesture.id}">Überprüfen</button>
            <div class="feedback-box" id="${gesture.id}-feedback"></div>
        `;

        gestureQuizContainer.appendChild(gestureItem);

        // Add event listener to the submit button
        const submitBtn = gestureItem.querySelector('.submit-btn');
        submitBtn.addEventListener('click', function() {
            checkGestureAnswer(gesture);
        });
    });

    function checkGestureAnswer(gesture) {
        const selectedOptions = document.querySelectorAll(`input[name="${gesture.id}-options"]:checked`);
        const feedbackBox = document.getElementById(`${gesture.id}-feedback`);

        if (selectedOptions.length === 0) {
            feedbackBox.textContent = 'Bitte wähle mindestens eine Option aus.';
            feedbackBox.className = 'feedback-box warning';
            feedbackBox.style.display = 'block';
            return;
        }

        let isCorrect = true;
        gesture.options.forEach(option => {
            const checkbox = document.getElementById(option.id);
            if ((checkbox.checked && !option.correct) || (!checkbox.checked && option.correct)) {
                isCorrect = false;
            }
        });

        if (isCorrect) {
            feedbackBox.textContent = gesture.feedback;
            feedbackBox.className = 'feedback-box correct';
        } else {
            feedbackBox.textContent = 'Nicht ganz. ' + gesture.feedback;
            feedbackBox.className = 'feedback-box incorrect';
        }

        feedbackBox.style.display = 'block';

        // Disable options after checking
        document.querySelectorAll(`input[name="${gesture.id}-options"]`).forEach(checkbox => {
            checkbox.disabled = true;
        });

        // Disable the submit button
        document.querySelector(`button[data-gesture-id="${gesture.id}"]`).disabled = true;
    }
}

function initVideoQuiz() {
    const submitBtn = document.getElementById('video-quiz-submit');
    if (!submitBtn) return;

    submitBtn.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="video-question"]:checked');
        const feedbackDiv = document.getElementById('video-quiz-feedback');
        
        if (!selectedOption) {
            feedbackDiv.textContent = 'Bitte wähle eine Antwort aus.';
            feedbackDiv.className = 'feedback-box warning';
            feedbackDiv.style.display = 'block';
            return;
        }
        
        // The third option is the correct one
        const isCorrect = selectedOption.value === 'option3';
        
        if (isCorrect) {
            feedbackDiv.textContent = 'Richtig! Beide Personen haben aus ihrer kulturellen Perspektive angemessen gehandelt. Person A hat direkt kommuniziert, wie in ihrer Kultur üblich. Person B hat indirekt abgelehnt, wie in ihrer Kultur höflich. Das führte zum Missverständnis.';
            feedbackDiv.className = 'feedback-box correct';
        } else {
            feedbackDiv.textContent = 'Nicht ganz. Beide Personen haben aus ihrer kulturellen Perspektive angemessen gehandelt. Person A hat direkt kommuniziert, wie in ihrer Kultur üblich. Person B hat indirekt abgelehnt, wie in ihrer Kultur höflich. Das führte zum Missverständnis.';
            feedbackDiv.className = 'feedback-box incorrect';
        }
        
        feedbackDiv.style.display = 'block';
        
        // Highlight the correct answer
        document.querySelectorAll('input[name="video-question"]').forEach(radio => {
            const label = radio.nextElementSibling;
            if (radio.value === 'option3') {
                label.style.fontWeight = 'bold';
                label.style.color = '#28a745';
            }
        });
        
        // Disable all options after checking
        document.querySelectorAll('input[name="video-question"]').forEach(radio => {
            radio.disabled = true;
        });
        
        // Disable the check button
        submitBtn.disabled = true;
        
        // Highlight the next button to prompt the user to continue
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.classList.add('highlight');
            setTimeout(() => nextBtn.classList.remove('highlight'), 2000);
        }
    });
}
