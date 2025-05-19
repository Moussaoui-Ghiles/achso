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
