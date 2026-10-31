document.addEventListener('DOMContentLoaded', function () {
    var switcher = document.getElementById('theme-switcher');
    if (!switcher) return;

    switcher.querySelectorAll('.theme-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { setTheme(btn.dataset.label.toLowerCase()); });
    });

    function setTheme(season) {
        document.documentElement.className = 'season-' + season;
        try { localStorage.setItem('theme-season', season); } catch (e) {}

        // Update favicon
        var favlink = document.querySelector("link[rel='shortcut icon']");
        if (favlink) favlink.href = 'theme/' + season + '.ico';

        // Update marquee images
        var leftImg = document.getElementById('marquee-left');
        var rightImg = document.querySelector('.marquee-content img.right');
        if (leftImg) leftImg.src = 'theme/' + season + '-0.png';
        if (rightImg) rightImg.src = 'theme/' + season + '-1.png';

        // Update active button state
        switcher.querySelectorAll('.theme-btn').forEach(function (b) { b.classList.remove('active'); });
        switcher.querySelector('.theme-' + season).classList.add('active');
    }

    // Initialize active button to match current HTML class
    var current = document.documentElement.className.match(/season-(\w+)/);
    if (current) {
        var btn = switcher.querySelector('.theme-' + current[1]);
        if (btn) btn.classList.add('active');
    }
});
