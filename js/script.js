document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements we'll need frequently
    const animatedContainers = document.querySelectorAll('.section, .connect-section');
    const heroTitleSpan = document.querySelector('.hero-title .typed-text');
    const connectTitle = document.querySelector('.connect-title');
    
    // Content for the typing animations
    const heroText = "Kaavin Balasubramanian";
    const connectText = "Let's Connect";
    
    // Flags to avoid duplicate animations
    let connectTitleTyped = false;

    // Handle intersection observations for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                container.classList.add('visible');

                // Set up staggered animations with increasing delays
                let delay = 150;
                const staggerIncrement = 150;

                // Select the right children based on section type
                let childrenToStagger = [];
                if (container.id === 'skills') {
                    childrenToStagger = container.querySelectorAll('.stack-category');
                } else if (container.id === 'projects') {
                    childrenToStagger = container.querySelectorAll('.project-item');
                } else if (container.id === 'experience' || container.id === 'education' || container.id === 'publications') {
                    childrenToStagger = container.querySelectorAll('.experience-item');
                } else if (container.classList.contains('connect-section')) {
                    childrenToStagger = container.querySelectorAll('.connect-link');
                    
                    // Start the connect section title typing animation when visible
                    if (!connectTitleTyped) {
                        connectTitleTyped = true;
                        typeWriter(connectTitle, connectText);
                    }
                }

                // Apply the staggered delay to each child
                childrenToStagger.forEach(child => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, delay);
                    delay += staggerIncrement;
                });

                // No need to keep observing once animation is triggered
                observer.unobserve(container);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully in view
    });

    // Start observing all containers that need animations
    animatedContainers.forEach(container => {
        observer.observe(container);
    });

    // Type writer effect - adds one character at a time
    function typeWriter(element, text, i = 0, callback) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeWriter(element, text, i + 1, callback), 80);
        } else {
            if (callback) setTimeout(callback, 100);
        }
    }

    // Start the hero title typing animation immediately
    if (heroTitleSpan) {
        typeWriter(heroTitleSpan, heroText);
    }

    // Clear the connect title initially so it can be typed when visible
    if (connectTitle) {
        connectTitle.textContent = '';
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 