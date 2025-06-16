document.addEventListener('DOMContentLoaded', function() {
    // Hero section mouse move effect
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroContent && heroImage) {
        let isHoveringButtons = false;
        let animationFrameId = null;
        
        // Check if mouse is over buttons
        const buttons = document.querySelectorAll('.hero-buttons a');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                isHoveringButtons = true;
                resetTransforms();
            });
            button.addEventListener('mouseleave', () => {
                isHoveringButtons = false;
            });
        });
        
        // Smooth the movement with requestAnimationFrame
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        const smoothFactor = 0.1;
        
        function updateTransforms() {
            if (isHoveringButtons) return;
            
            // Apply easing
            currentX += (targetX - currentX) * smoothFactor;
            currentY += (targetY - currentY) * smoothFactor;
            
            // Apply transforms
            heroContent.style.transform = `translateX(${currentX * 10}px) translateY(${currentY * 5}px) translateZ(20px)`;
            heroImage.style.transform = `translateX(${-currentX * 15}px) translateY(${-currentY * 10}px) rotateY(${currentX * 5}deg) rotateX(${currentY * 5}deg)`;
            
            animationFrameId = requestAnimationFrame(updateTransforms);
        }
        
        function resetTransforms() {
            targetX = 0;
            targetY = 0;
            currentX = 0;
            currentY = 0;
            heroContent.style.transform = 'translateZ(0)';
            heroImage.style.transform = 'translateZ(0)';
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        }
        
        hero.addEventListener('mousemove', (e) => {
            if (isHoveringButtons) return;
            
            const { left, top, width, height } = hero.getBoundingClientRect();
            targetX = (e.clientX - left) / width - 0.5;
            targetY = (e.clientY - top) / height - 0.5;
            
            if (!animationFrameId) {
                updateTransforms();
            }
        });
        
        hero.addEventListener('mouseleave', () => {
            resetTransforms();
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const menuIcon = mobileMenuBtn.querySelector('i');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        nav.classList.toggle('active');
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        // Change icon and add animation
        if (isMenuOpen) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            mobileMenuBtn.style.transform = 'rotate(90deg)';
            mobileMenuBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            mobileMenuBtn.style.transform = 'rotate(0)';
            mobileMenuBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    }

    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    window.addEventListener('click', (e) => {
        if (isMenuOpen && !nav.contains(e.target) && e.target !== mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Sticky Header on Scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
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

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add animation classes to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Transactions Today Animated Counter ---
    const transactionsEl = document.getElementById('transactions-today');
    if (transactionsEl) {
        // Helper to get seconds since midnight
        function getSecondsSinceMidnight() {
            const now = new Date();
            return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        }
        // Helper to get seconds until next midnight
        function getSecondsUntilMidnight() {
            return 86400 - getSecondsSinceMidnight();
        }

        // Use localStorage to persist today's count
        const todayKey = 'frame_transactions_today_' + new Date().toISOString().slice(0,10);
        let currentCount = Number(localStorage.getItem(todayKey)) || 0;

        // Decide on a realistic daily max (e.g. 1,000,000+)
        const DAILY_MAX = 1095852;
        // Get how far through the day we are
        const secondsPassed = getSecondsSinceMidnight();
        const secondsTotal = 86400;
        // Calculate what the count should be if distributed evenly, then add some randomness
        function estimateCount() {
            const base = Math.floor(DAILY_MAX * (secondsPassed / secondsTotal));
            // Add a random offset up to 2% of current base
            return base + Math.floor(Math.random() * (base * 0.02 + 10));
        }

        // Animate up to a target value
        function animateTo(target) {
            let displayed = Number(transactionsEl.textContent.replace(/\D/g, ''));
            if (displayed < target) {
                let step = Math.max(1, Math.floor((target - displayed) / 12));
                let next = displayed + step;
                if (next > target) next = target;
                transactionsEl.textContent = next.toLocaleString();
                setTimeout(() => animateTo(target), 50);
            } else {
                transactionsEl.textContent = target.toLocaleString();
            }
        }

        function updateCount() {
            const newCount = estimateCount();
            localStorage.setItem(todayKey, newCount);
            animateTo(newCount);
        }

        // Initial count
        updateCount();
        // Update every 7 seconds with a new random value
        setInterval(updateCount, 7000);
    }
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});
