// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For reveal animations
                if (entry.target.classList.contains('reveal')) {
                    entry.target.classList.add('visible');
                }
                
                // For staggered animations
                if (entry.target.classList.contains('staggered-parent')) {
                    const items = entry.target.querySelectorAll('.staggered-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150); // 150ms delay between each item
                    });
                }
                
                // Remove observer after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with reveal or staggered-parent class
    document.querySelectorAll('.reveal, .staggered-parent').forEach(el => {
        observer.observe(el);
    });
}

// Parallax effect for elements
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
            const x = (clientX - centerX) * speed;
            const y = (clientY - centerY) * speed;
            
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Text animation - typewriter effect
function initTypewriter() {
    const elements = document.querySelectorAll('[data-typewriter]');
    
    elements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50); // Typing speed
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                type();
                observer.disconnect();
            }
        });
        
        observer.observe(el);
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initParallax();
    initTypewriter();
    
    // Add hover effect to all cards
    document.querySelectorAll('.service-card, .feature-card').forEach(card => {
        card.classList.add('animated-card');
    });
    
    // Add animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.classList.contains('btn-animated')) {
            btn.classList.add('btn-animated');
        }
    });
    
    // Add animation to section headers
    document.querySelectorAll('h2').forEach(header => {
        header.classList.add('animated-underline');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on hover for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        link.style.transform = 'translateY(-2px)';
        link.style.transition = 'transform 0.3s ease';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
});
