window.addEventListener('load', () => {
    const scroller = document.querySelector('.logo-scroller');
    if (!scroller) return;

    const scrollerInner = scroller.querySelector('.logo-scroller-inner');
    const scrollerContent = Array.from(scrollerInner.children);

    // Prevent re-running the script on hot-reloads or back/forward navigation
    if (scrollerInner.hasAttribute('data-cloned')) {
        return;
    }
    scrollerInner.setAttribute('data-cloned', 'true');

    // Duplicate logos to create the seamless loop
    scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true);
        scrollerInner.appendChild(duplicatedItem);
    });

    // Calculate the total width of the original items
    let originalWidth = 0;
    scrollerContent.forEach(item => {
        // Get the full width including margin/padding/gap
        const style = window.getComputedStyle(item);
        const marginRight = parseInt(style.marginRight, 10) || 0;
        const marginLeft = parseInt(style.marginLeft, 10) || 0;
        originalWidth += item.offsetWidth + marginLeft + marginRight;
    });

    // Get the gap from the parent container's CSS
    const innerStyle = window.getComputedStyle(scrollerInner);
    const gap = parseInt(innerStyle.gap, 10) || 40;
    const totalWidth = originalWidth + (scrollerContent.length * gap);

    // Create a dynamic keyframe rule
    const keyframeName = 'dynamic-scroll';
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes ${keyframeName} {
            to {
                transform: translateX(-${totalWidth}px);
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Set animation properties dynamically
    const totalLogos = scrollerContent.length;
    const speedFactor = 0.2; // Pixels per second, adjust for speed
    const duration = totalWidth / (100 * speedFactor); // Adjust 100 for overall speed

    scrollerInner.style.animationName = keyframeName;
    scrollerInner.style.animationDuration = `${duration}s`;
});
