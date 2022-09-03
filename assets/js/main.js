(function () {
    // --- Customize cursor of page ---
    const cursor = {
        delay: 8,
        _x: 0,
        _y: 0,
        endX: 0,
        endY: 0,
    }
    const $loadingScreen = document.querySelector('#loading')
    const $loadingOverlay = document.querySelector('#loading .loading-overlay')
    const $cursorDot = document.querySelector('#cursor-dot')
    const $cursorOutline = document.querySelector('#cursor-dot-outline')
    const $downloadCV = document.querySelector('.download-cv')
    const $doodle = document.querySelector('css-doodle');
    const $browserDontSupport = document.querySelector('#browser-dont-support');

    // --- Constructor ---
    prefixBrowser();
    setTimeout(() => {
        $loadingOverlay.classList.add('splitting--slide-over')
        setTimeout(() => {
            $loadingScreen.style.display = 'none'
            createCursor();
        }, 1100)
    }, 2000)

    $downloadCV.addEventListener('mousedown', function () {
        alert('Mới bản dummy anh bạn à chưa tải được! Quậy khum ._.')
    })
    // --- Constructor - end ---

    function prefixBrowser() {
        // Internet Explorer 6-11
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        // Edge 20+
        const isEdge = !isIE && !!window.StyleMedia;

        if (isEdge) {
            $doodle.style.display = 'none'
            $browserDontSupport.style.display = 'block'
            return
        }
        // Listener Chrome, Safari, FireFox
        window.addEventListener('click', () => $doodle.update());
    }

    function createCursor() {
        // Run only PC screen
        if (window.innerWidth > 768 && $loadingScreen.style.display === 'none') {
            setupEventListeners();
            animateDotOutline();
        }
    }

    /**
     * Setup the cursor according to each mouse event
     */
    function setupEventListeners() {
        // Anchor hovering
        document.querySelectorAll('[data-cursor-hover], [data-splitting], a').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                toggleCursorSize(true);
            });
            el.addEventListener('mouseout', function () {
                toggleCursorSize(false);
            });
        });

        // Click events
        document.addEventListener('mousedown', function () {
            toggleCursorSize(true);
        });
        document.addEventListener('mouseup', function () {
            toggleCursorSize(false);
        });


        document.addEventListener('mousemove', function (evt) {
            // Show the cursor
            toggleCursorVisibility(true);

            // Position the dot
            cursor.endX = evt.pageX;
            cursor.endY = evt.pageY;
            $cursorDot.style.top = cursor.endY + 'px';
            $cursorDot.style.left = cursor.endX + 'px';
        });

        // Hide/show cursor
        document.addEventListener('mouseenter', function () {
            toggleCursorVisibility(true);
            $cursorDot.style.opacity = '1';
            $cursorOutline.style.opacity = '1';
        });

        document.addEventListener('mouseleave', function () {
            toggleCursorVisibility(false);
            $cursorDot.style.opacity = '0';
            $cursorOutline.style.opacity = '0';
        });
    }

    function animateDotOutline() {
        cursor._x += (cursor.endX - cursor._x) / cursor.delay;
        cursor._y += (cursor.endY - cursor._y) / cursor.delay;

        $cursorOutline.style.top = cursor._y + 'px';
        $cursorOutline.style.left =  cursor._x + 'px';
        requestAnimationFrame(animateDotOutline.bind(cursor))
    }

    /**
     * Listen event-(mouseover, mousedown) scale up cursor size
     *
     * @param clickMouse
     */
    function toggleCursorSize(clickMouse = false) {
        if (clickMouse) {
            $cursorDot.style.transform = 'translate(-50%, -50%) scale(0.75)';
            $cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            $cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            $cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }

    /**
     * Listen event mouse leave page for visible cursor or not
     *
     * @param visibleMouse
     */
    function toggleCursorVisibility(visibleMouse = true) {
        if (visibleMouse) {
            $cursorDot.style.opacity = '1';
            $cursorOutline.style.opacity = '1';
        } else {
            $cursorDot.style.opacity = '0';
            $cursorOutline.style.opacity = '0';
        }
    }
    // --- Customize cursor of page - end ---
})();


