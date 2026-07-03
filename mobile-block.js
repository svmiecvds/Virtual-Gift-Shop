(function() {
    function isMobile() {
        return (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            window.innerWidth <= 768
        );
    }

    function showMobileBlock() {
        // Prevent multiple overlays and crashes if body isn't ready
        if (!document.body || document.getElementById('mobileBlockOverlay')) return;

        // Hide everything
        document.body.style.overflow = 'hidden';

        // Update viewport so the overlay scales properly on mobile devices
        var metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
            metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        } else {
            metaViewport = document.createElement('meta');
            metaViewport.name = 'viewport';
            metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(metaViewport);
        }

        // Create overlay
        var overlay = document.createElement('div');
        overlay.id = 'mobileBlockOverlay';
        overlay.innerHTML = `
            <div class="mobile-block-content">
                <div class="mobile-block-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff69b4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                        <line x1="12" y1="18" x2="12.01" y2="18"/>
                        <line x1="1" y1="1" x2="23" y2="23" stroke="#e74c3c" stroke-width="2.5"/>
                    </svg>
                </div>
                <h1 class="mobile-block-title">Oops!</h1>
                <p class="mobile-block-msg">Sorry, We are not yet on Mobile Browsers</p>
                <p class="mobile-block-sub">Please visit us on a desktop or laptop for the best experience.</p>
            </div>
        `;

        // Inject styles
        var style = document.createElement('style');
        style.textContent = `
            #mobileBlockOverlay {
                position: fixed;
                inset: 0;
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                background-image: url("assets/bg_pattern.png");
                background-repeat: repeat;
                background-size: 200px;
                background-color: #fff0f6;
            }
            .mobile-block-content {
                text-align: center;
                padding: clamp(28px, 8vw, 48px) clamp(20px, 6vw, 36px);
                width: min(88vw, 400px);
                background: rgba(255, 255, 255, 0.88);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-radius: 28px;
                border: 2px solid rgba(255, 182, 217, 0.6);
                box-shadow: 0 20px 60px rgba(255, 105, 180, 0.2);
                animation: mobileBlockFadeIn 0.6s ease;
            }
            .mobile-block-icon {
                margin-bottom: clamp(14px, 4vw, 24px);
            }
            .mobile-block-icon svg {
                width: clamp(48px, 14vw, 72px);
                height: clamp(48px, 14vw, 72px);
            }
            .mobile-block-title {
                font-family: 'Pacifico', 'Quicksand', cursive, sans-serif;
                font-size: clamp(28px, 9vw, 42px);
                color: #d6336c;
                margin: 0 0 10px 0;
            }
            .mobile-block-msg {
                font-family: 'Quicksand', 'Fredoka', sans-serif;
                font-size: clamp(15px, 4.5vw, 20px);
                font-weight: 600;
                color: #5a0035;
                margin: 0 0 10px 0;
                line-height: 1.5;
            }
            .mobile-block-sub {
                font-family: 'Quicksand', 'Fredoka', sans-serif;
                font-size: clamp(12px, 3.5vw, 15px);
                color: #8b5e7a;
                margin: 0;
                opacity: 0.85;
            }
            @keyframes mobileBlockFadeIn {
                from { opacity: 0; transform: scale(0.92) translateY(20px); }
                to   { opacity: 1; transform: scale(1) translateY(0); }
            }
            /* Hide everything else when overlay is active */
            #mobileBlockOverlay ~ * {
                display: none !important;
            }
        `;

        document.head.appendChild(style);
        // Insert as the very first child of body so the sibling selector hides everything after it
        document.body.insertBefore(overlay, document.body.firstChild);
    }

    if (isMobile()) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showMobileBlock);
        } else {
            showMobileBlock();
        }
    }

    // Also handle resize (e.g. DevTools mobile toggle)
    window.addEventListener('resize', function() {
        var existing = document.getElementById('mobileBlockOverlay');
        if (isMobile() && !existing) {
            showMobileBlock();
        } else if (!isMobile() && existing) {
            existing.remove();
            document.body.style.overflow = '';
        }
    });
})();
