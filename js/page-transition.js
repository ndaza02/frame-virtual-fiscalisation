document.addEventListener('DOMContentLoaded', () => {
    const transitionOverlay = document.querySelector('.page-transition-overlay');
    const links = document.querySelectorAll('a');

    // On initial page load, show the overlay, then hide it with animation
    if (transitionOverlay) {
        transitionOverlay.classList.add('active');
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
        }, 1050); // Match this to your transition duration
    }

    links.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');

            // Check for valid, internal, non-anchor, non-special links
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !link.href.includes('javascript:void(0)')) {
                // Check if the link points to the same domain
                const currentHost = window.location.hostname;
                const linkHost = new URL(link.href, window.location.origin).hostname;

                if (currentHost === linkHost) {
                    e.preventDefault(); // Stop immediate navigation

                    if (transitionOverlay) {
                        transitionOverlay.classList.add('active');

                        // Wait for animation, then navigate
                        setTimeout(() => {
                            window.location.href = href;
                        }, 1050); // Duration should be slightly longer than the CSS transition
                    }
                }
            }
        });
    });

    // Handle browser back/forward navigation to hide overlay
    window.addEventListener('pageshow', (event) => {
        if (event.persisted && transitionOverlay) {
            transitionOverlay.classList.remove('active');
        }
    });
});
