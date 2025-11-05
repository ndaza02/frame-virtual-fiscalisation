// GSAP Animations for Homepage Sections
// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Set initial states for elements that will animate
    gsap.set('.section-header', { opacity: 0, y: 50 });
    gsap.set('.product-card', { opacity: 0, y: 80, scale: 0.9 });
    gsap.set('.service-card', { opacity: 0, y: 60, scale: 0.95 });
    gsap.set('.key-feature', { opacity: 0, y: 60, scale: 0.95 });
    gsap.set('.feature-item', { opacity: 0, x: -50 });
    gsap.set('.mission', { opacity: 0, y: 60, scale: 0.9 });
    gsap.set('.vision', { opacity: 0, y: 60, scale: 0.9 });
    gsap.set('.contact-method', { opacity: 0, x: -40 });
    gsap.set('.contact-form', { opacity: 0, x: 40 });
    gsap.set('.blog-card', { opacity: 0, y: 60, scale: 0.95 });
    gsap.set('footer', { opacity: 0, y: 30 });

    // Hero Section - Product Cards Animation
    gsap.to('.product-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.product-cards-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // About Section Animation
    gsap.to('.about-section .section-header', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.mission', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.2)',
        scrollTrigger: {
            trigger: '.mission-vision',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.vision', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: 0.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
            trigger: '.mission-vision',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Services Section Animation
    gsap.to('.services .section-header', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.services',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.service-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Features Section Animation
    gsap.to('.features .section-header', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.features',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.feature-item', {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.features-list',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Key Features Section Animation
    gsap.to('.key-features .section-header', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.key-features',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.key-feature', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.key-features-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Contact Section Animation
    gsap.to('.contact .section-header', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.contact-method', {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.contact-form', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Blog Section Animation
    gsap.to('#blog .section-header', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#blog',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.blog-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Parallax effect for About section background
    if (window.innerWidth > 768) {
        gsap.to('.about-section', {
            backgroundPosition: '50% 100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Add subtle floating animation to icons on scroll
    gsap.utils.toArray('.service-card i, .key-feature i').forEach((icon, index) => {
        gsap.to(icon, {
            y: -10,
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: icon,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Counter animation for stats (if you add any)
    gsap.utils.toArray('[data-counter]').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        gsap.to(counter, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power1.out',
            scrollTrigger: {
                trigger: counter,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Smooth reveal for footer
    gsap.to('footer', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        }
    });

    // Add a subtle scale effect to cards on hover (enhanced with GSAP)
    gsap.utils.toArray('.service-card, .key-feature, .product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    console.log('GSAP animations initialized successfully!');
});
