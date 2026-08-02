(function() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;

    // Detect mobile/tablet by user agent
    var isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet|touch/i.test(ua);

    // Detect iPad on iOS 13+ (which reports as MacIntel)
    var isIPad = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Detect touch-only devices with small/medium screens (covers Android tablets etc.)
    var isTouchSmall = (('ontouchstart' in window) || navigator.maxTouchPoints > 1) && window.screen.width <= 1366;

    // Detect coarse pointer (touch screens) on non-large screens
    var isCoarsePointer = (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) && window.screen.width <= 1366;

    var isMobile = isMobileUA || isIPad || isTouchSmall || isCoarsePointer;

    if (isMobile) {
        var mobileHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Coming Soon — The Gifting Co.</title>
    <link rel="icon" type="image/png" href="assets/favicon.webp">
    <script>
        window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Fredoka:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: url('assets/bg.webp') center / cover no-repeat fixed;
            background-color: #fce7f3;
            font-family: 'Fredoka', sans-serif;
            padding: 20px;
        }

        .card {
            background: rgba(255, 255, 255, 0.88);
            padding: 48px 36px 40px;
            border-radius: 28px;
            box-shadow: 0 16px 48px rgba(183, 26, 61, 0.18);
            border: 1.5px solid rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            max-width: 340px;
            width: 92%;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        h1 {
            color: #B71A3D;
            font-size: 62px;
            font-family: 'Pinyon Script', cursive;
            line-height: 1.1;
            margin-bottom: 10px;
        }

        p {
            color: #666;
            font-size: 18px;
            line-height: 1.6;
            font-weight: 500;
        }

        footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            color: rgba(255, 255, 255, 0.9);
            background: #900C3F;
            font-family: 'Fredoka', sans-serif;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.5px;
            padding: 6px 20px;
            border-top: 1px solid rgba(255,255,255,0.15);
            box-sizing: border-box;
        }

        footer a {
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            border-bottom: 1px dotted rgba(255, 255, 255, 0.6);
            transition: opacity 0.2s ease;
            margin: 0 2px;
        }

        footer a:hover { opacity: 0.7; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Oops!</h1>
        <p>We are not on Mobile Browsers. Visit us on your Desktop and Laptop Browsers for Best Experience.</p>
    </div>
    <footer>
        &copy; 2026 | &#9825; Made with <a href="https://thegifting.vercel.app" target="_blank" rel="noopener noreferrer">The Gifting Co.</a>
    </footer>
</body>
</html>`;
        document.write('<style>html { display: none !important; }</style>');
        window.addEventListener('DOMContentLoaded', function() {
            document.open();
            document.write(mobileHTML);
            document.close();
        });
    }
})();
