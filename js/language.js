// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('languageSelect');
    console.log('Language script loaded, languageSelect:', languageSelect);
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'de';
    languageSelect.value = savedLanguage;
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === 'ar' || savedLanguage === 'fa' ? 'rtl' : 'ltr';
    
    // Handle language change
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        console.log('Language changed to:', selectedLanguage);
        
        // Save preference
        localStorage.setItem('preferredLanguage', selectedLanguage);
        
        // Update document language and direction
        document.documentElement.lang = selectedLanguage;
        document.documentElement.dir = selectedLanguage === 'ar' || selectedLanguage === 'fa' ? 'rtl' : 'ltr';
        
        // Update text content based on language
        updateContentLanguage(selectedLanguage);
    });
    
    // Function to update content based on selected language
    function updateContentLanguage(language) {
        console.log('Updating content to language:', language);
        // Get all elements with data-lang attributes
        const elements = document.querySelectorAll('[data-lang-de], [data-lang-ar], [data-lang-fa]');
        console.log('Found elements with data-lang attributes:', elements.length);
        
        elements.forEach(element => {
            const translation = element.getAttribute(`data-lang-${language}`);
            if (translation) {
                console.log('Updating element:', element, 'to:', translation);
                element.textContent = translation;
            }
        });
        
        // Update page title
        const titles = {
            de: 'AchSo! Lernplattform',
            ar: 'منصة AchSo! التعليمية',
            fa: 'پلتفرم آموزشی AchSo!'
        };
        document.title = titles[language] || titles.de;

        // Update course/exercise links for all languages
        const exerciseLinks = document.querySelectorAll('a[data-lang-href-de], a.start-btn');
        exerciseLinks.forEach(link => {
            // Check if the link has language-specific href attributes
            const langHref = link.getAttribute(`data-lang-href-${language}`);
            if (langHref) {
                // Use the language-specific href if available
                link.setAttribute('href', langHref);
            } else {
                // Fallback: try to construct the URL for ar/fa languages
                const originalHref = link.getAttribute('data-original-href') || link.getAttribute('href');
                // Save the original href if not already saved
                if (!link.getAttribute('data-original-href')) {
                    link.setAttribute('data-original-href', originalHref);
                }
                
                if (language === 'ar' && originalHref.endsWith('index.html')) {
                    const arHref = originalHref.replace('index.html', 'index.ar.html');
                    link.setAttribute('href', arHref);
                } else if (language === 'fa' && originalHref.endsWith('index.html')) {
                    const faHref = originalHref.replace('index.html', 'index.fa.html');
                    link.setAttribute('href', faHref);
                } else {
                    // Restore original href for German or other languages
                    link.setAttribute('href', originalHref);
                }
            }
        });
    }
    
    // Initial content update
    updateContentLanguage(savedLanguage);
}); 