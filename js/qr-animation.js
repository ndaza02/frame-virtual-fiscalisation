document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };

    // Generate QR Code data once
    const qrContainer = document.createElement('div');
    let qrImageData = null;
    new QRCode(qrContainer, {
        text: 'https://www.frame.co.zw',
        width: 200,
        height: 200,
        colorDark: '#0056b3',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Use a timeout to ensure QR code has been rendered to its canvas
    setTimeout(() => {
        const qrCanvas = qrContainer.querySelector('canvas');
        if (!qrCanvas) return;
        const qrCtx = qrCanvas.getContext('2d');
        qrImageData = qrCtx.getImageData(0, 0, 200, 200);
        createTiledParticles();
        animate();
    }, 100);

    function createTiledParticles() {
        if (!qrImageData) return;
        particles = [];
        const qrWidth = qrImageData.width;
        const qrHeight = qrImageData.height;
        const step = 5; // Increase step to reduce particle count for performance

        const cols = Math.ceil(width / qrWidth);
        const rows = Math.ceil(height / qrHeight);

        const offsetX = (width - (cols * qrWidth)) / 2;
        const offsetY = (height - (rows * qrHeight)) / 2;

        for (let gridY = 0; gridY < rows; gridY++) {
            for (let gridX = 0; gridX < cols; gridX++) {
                for (let y = 0; y < qrHeight; y += step) {
                    for (let x = 0; x < qrWidth; x += step) {
                        const alpha = qrImageData.data[(y * qrWidth + x) * 4 + 3];
                        if (alpha > 128) {
                            const r = qrImageData.data[(y * qrWidth + x) * 4];
                            const g = qrImageData.data[(y * qrWidth + x) * 4 + 1];
                            const b = qrImageData.data[(y * qrWidth + x) * 4 + 2];
                            const color = `rgba(${r},${g},${b}, 0.8)`;
                            
                            const particleBaseX = offsetX + (gridX * qrWidth) + x;
                            const particleBaseY = offsetY + (gridY * qrHeight) + y;
                            
                            particles.push(new Particle(particleBaseX, particleBaseY, color));
                        }
                    }
                }
            }
        }
    }

    class Particle {
        constructor(baseX, baseY, color) {
            this.baseX = baseX;
            this.baseY = baseY;
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = 1.5;
            this.color = color;
            this.density = (Math.random() * 40) + 5;
            this.vx = 0;
            this.vy = 0;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            // Spring physics for fluid return to base
            const spring = 0.08; // spring constant
            const friction = 0.78; // velocity damping

            // Repel from mouse
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density * 1.5;
                let directionY = forceDirectionY * force * this.density * 1.5;

                this.vx -= directionX;
                this.vy -= directionY;
            }

            // Spring back to home
            let homeDx = this.baseX - this.x;
            let homeDy = this.baseY - this.y;
            this.vx += homeDx * spring;
            this.vy += homeDy * spring;

            // Add a little random jitter for organic feel
            this.vx += (Math.random() - 0.5) * 0.03;
            this.vy += (Math.random() - 0.5) * 0.03;

            // Apply friction
            this.vx *= friction;
            this.vy *= friction;

            // Update position
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    // Handle mouse movement
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Handle touch movement - simplified for natural scrolling
    let lastTouchTime = 0;
    let lastTouchY = 0;
    let isScrolling = false;
    const scrollThreshold = 10; // pixels to move before considering it a scroll

    window.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        lastTouchY = touch.clientY;
        isScrolling = false;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const touchY = touch.clientY;
            
            // Check if this is a scroll gesture (vertical movement)
            if (Math.abs(touchY - lastTouchY) > scrollThreshold) {
                isScrolling = true;
            }
            
            // Only update animation if not scrolling
            if (!isScrolling) {
                mouse.x = touch.clientX;
                mouse.y = touch.clientY;
            }
            
            lastTouchY = touchY;
        }
    }, { passive: true });

    // Handle touch end
    window.addEventListener('touchend', () => {
        // Smoothly reset mouse position off-screen when touch ends
        if (!isScrolling) {
            mouse.x = -1000;
            mouse.y = -1000;
        }
        isScrolling = false;
    }, { passive: true });

    // Handle window resize
    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createTiledParticles();
    };
    
    // Debounce resize for better performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    });
    
    // Initial setup for touch devices
    if ('ontouchstart' in window) {
        mouse.radius = 200; // Slightly larger radius for touch devices
        document.body.classList.add('touch-device');
    }
});
