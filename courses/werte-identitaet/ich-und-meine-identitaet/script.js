document.addEventListener('DOMContentLoaded', function() {
    // Initialize slide navigation
    initSlideNavigation();
    
    // Add other exercise-specific initializations here as needed
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

// Additional functions for specific interactive elements can be added as needed
function initIdentityQuiz() {
    // To be implemented based on exercise content
}

function initDragAndDrop() {
    // To be implemented based on exercise content
}

function initReflectionInput() {
    // To be implemented based on exercise content
}
