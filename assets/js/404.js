// Bouncing fumo animation for 404 page
// Uses page visibility API to pause when tab is hidden
// This prevents speed-up when returning to the tab

(function() {
    const fumoImg = document.getElementById('bouncing-fumo');
    if (!fumoImg) return;

    // Set image source from data attribute
    const fumoSrc = fumoImg.getAttribute('data-src');
    if (fumoSrc) {
        fumoImg.src = fumoSrc;
    }

    // Animation state
    let x = Math.random() * (window.innerWidth - 200);
    let y = Math.random() * (window.innerHeight - 200);
    const baseSpeed = 2 + Math.random() * 2; // 2-4 px per frame at 60fps
    let dx = (Math.random() < 0.5 ? -1 : 1) * baseSpeed;
    let dy = (Math.random() < 0.5 ? -1 : 1) * baseSpeed;
    let lastTimestamp = null;
    let isPaused = false;

    // Pause animation when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isPaused = true;
        } else {
            isPaused = false;
            lastTimestamp = null; // reset so we don't jump
        }
    });

    function animate(timestamp) {
        requestAnimationFrame(animate);

        if (isPaused) return;

        if (!lastTimestamp) lastTimestamp = timestamp;
        const delta = (timestamp - lastTimestamp) / (1000 / 60); // normalize to 60fps
        lastTimestamp = timestamp;

        x += dx * delta;
        y += dy * delta;

        const maxX = window.innerWidth - fumoImg.offsetWidth;
        const maxY = window.innerHeight - fumoImg.offsetHeight;

        if (x <= 0 || x >= maxX) {
            dx = -dx;
            x = Math.max(0, Math.min(x, maxX));
        }
        if (y <= 0 || y >= maxY) {
            dy = -dy;
            y = Math.max(0, Math.min(y, maxY));
        }

        fumoImg.style.transform = `translate(${x}px, ${y}px)`;
    }

    requestAnimationFrame(animate);
})();
