document.addEventListener('DOMContentLoaded', function() {
    // Toggle course exercises visibility
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseId = this.getAttribute('data-course-id');
            const exercisesList = document.getElementById(`exercises-course-${courseId}`);
            
            // Toggle the active class
            exercisesList.classList.toggle('active');
            this.classList.toggle('active');
            
            // Update button text
            const btnText = this.querySelector('.btn-text');
            
            if (exercisesList.classList.contains('active')) {
                btnText.textContent = 'Übungen ausblenden';
            } else {
                btnText.textContent = 'Übungen anzeigen';
            }
        });
    });

    // Add smooth hover effects
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
    }
});
