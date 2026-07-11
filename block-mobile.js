(function() {
    // Extremely aggressive mobile detection that works even if "Request Desktop Site" is active
    // 1. User Agent string matches
    // 2. Mac Touch (iPad pretending to be Mac)
    // 3. Touch API present (covers Android Chrome "Request Desktop Site")
    // 4. Pointer media query (covers touch-first devices)
    // 5. Very small physical screen width/height
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                           ('ontouchstart' in window) ||
                           (window.matchMedia && window.matchMedia("(any-pointer: coarse)").matches) ||
                           (window.screen.width <= 768 && window.screen.height <= 1024);

    if (isMobileDevice) {
        // Stop window loading immediately
        if (window.stop) window.stop();

        // Synchronously overwrite the entire document to completely halt further parsing/execution
        document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <title>Coming Soon</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Fredoka:wght@400;500;600&display=swap" rel="stylesheet">
                <style>
                    body {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        width: 100vw;
                        background: url('assets/bg.webp') center/cover no-repeat fixed;
                        background-color: #fce7f3;
                        text-align: center;
                        padding: 20px;
                        margin: 0;
                        font-family: 'Fredoka', sans-serif;
                        overflow: hidden;
                        box-sizing: border-box;
                    }
                    .overlay {
                        background: rgba(255, 255, 255, 0.85);
                        padding: 40px 30px;
                        border-radius: 20px;
                        box-shadow: 0 10px 30px rgba(183, 26, 61, 0.15);
                        border: 2px solid rgba(255, 255, 255, 0.8);
                        backdrop-filter: blur(5px);
                    }
                    h1 {
                        color: #B71A3D;
                        font-size: 56px;
                        font-family: 'Pinyon Script', cursive;
                        margin-bottom: 10px;
                        margin-top: 0;
                    }
                    p {
                        color: #555;
                        font-size: 20px;
                        max-width: 400px;
                        line-height: 1.5;
                        margin: 0;
                        font-weight: 500;
                    }
                </style>
            </head>
            <body>
                <div class="overlay">
                    <h1>Coming Soon</h1>
                    <p>on your Mobile browsers!</p>
                </div>
            </body>
            </html>
        `);
        // Force the script to halt
        throw new Error("Mobile execution halted");
    }
})();
