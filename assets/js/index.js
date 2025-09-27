// ========================================
// FCF Club Responsive JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            
            // Change hamburger icon
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // ========================================
    // Responsive Image Slider
    // ========================================
    const slider = document.querySelector('.about-slider');
    if (slider) {
        const slides = slider.querySelector('.slides');
        const images = slides.querySelectorAll('img');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        
        let currentIndex = 0;
        const totalImages = images.length;
        
        // Auto-resize slider based on screen size
        function updateSliderSize() {
            const screenWidth = window.innerWidth;
            let imageWidth;
            
            if (screenWidth <= 767) {
                imageWidth = Math.min(350, screenWidth - 40);
            } else if (screenWidth <= 1023) {
                imageWidth = Math.min(500, screenWidth - 100);
            } else {
                imageWidth = 400;
            }
            
            slider.style.width = imageWidth + 'px';
            images.forEach(img => {
                img.style.width = imageWidth + 'px';
            });
            
            updateSliderPosition();
        }
        
        function updateSliderPosition() {
            const slideWidth = images[0].offsetWidth;
            slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSliderPosition();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSliderPosition();
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Auto-slide functionality
        let autoSlideInterval = setInterval(nextSlide, 4000);
        
        // Pause auto-slide on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 4000);
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
        
        // Update slider on window resize
        window.addEventListener('resize', updateSliderSize);
        updateSliderSize(); // Initialize
    }

    // ========================================
    // Clock and Date Display
    // ========================================
    function updateDateTime() {
        const clockElement = document.getElementById('clock');
        const dateElement = document.getElementById('date');
        
        if (clockElement && dateElement) {
            const now = new Date();
            
            // Format time
            const timeOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            };
            const timeString = now.toLocaleTimeString('en-US', timeOptions);
            clockElement.textContent = timeString;
            
            // Format date
            const dateOptions = {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            };
            const dateString = now.toLocaleDateString('en-US', dateOptions);
            dateElement.textContent = dateString;
        }
    }
    
    // Update clock every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // ========================================
    // Responsive Back to Top Button
    // ========================================
    function createBackToTopButton() {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
    }

    // Check if back-to-top button doesn't exist in HTML, then create it
    if (!document.querySelector('.back-to-top')) {
        createBackToTopButton();
    }

    // ========================================
    // Responsive Image Loading
    // ========================================
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" to images not in viewport
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Handle image errors
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Failed to load image:', this.src);
            });
        });
    }

    optimizeImages();

    // ========================================
    // Responsive Font Size Adjustment
    // ========================================
    function adjustFontSizes() {
        const screenWidth = window.innerWidth;
        const root = document.documentElement;
        
        // Adjust base font size based on screen width
        if (screenWidth <= 320) {
            root.style.fontSize = '14px';
        } else if (screenWidth <= 480) {
            root.style.fontSize = '15px';
        } else if (screenWidth <= 768) {
            root.style.fontSize = '16px';
        } else {
            root.style.fontSize = '16px';
        }
    }

    // Adjust on load and resize
    adjustFontSizes();
    window.addEventListener('resize', adjustFontSizes);

    // ========================================
    // Smooth Scrolling for Internal Links
    // ========================================
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // Responsive Card Heights (Equal Heights)
    // ========================================
    function equalizeCardHeights() {
        const cardContainers = [
            '.news-grid',
            '.fan-zone-grid', 
            '.achievements-grid',
            '.players-grid'
        ];

        cardContainers.forEach(containerSelector => {
            const container = document.querySelector(containerSelector);
            if (container && window.innerWidth > 767) { // Only on tablet and desktop
                const cards = container.querySelectorAll('.news-card, .fan-card, .achievement-card, .player-card');
                let maxHeight = 0;
                
                // Reset heights
                cards.forEach(card => {
                    card.style.height = 'auto';
                });
                
                // Find max height
                cards.forEach(card => {
                    const height = card.offsetHeight;
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                });
                
                // Set equal height
                cards.forEach(card => {
                    card.style.height = maxHeight + 'px';
                });
            }
        });
    }

    // Run on load and resize with debounce
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            equalizeCardHeights();
        }, 250);
    }

    window.addEventListener('load', equalizeCardHeights);
    window.addEventListener('resize', handleResize);

    // ========================================
    // Performance: Debounced Scroll Handler
    // ========================================
    let ticking = false;

    function updateOnScroll() {
        // Add any scroll-based functionality here
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // ========================================
    // Accessibility Improvements
    // ========================================
    
    // Skip to main content link
    function addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main-content id if not exists
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    }

    addSkipLink();

    // Keyboard navigation for sliders
    if (slider) {
        slider.setAttribute('tabindex', '0');
        slider.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        });
    }

    console.log('🏏 FCF Club responsive features loaded successfully!');
});