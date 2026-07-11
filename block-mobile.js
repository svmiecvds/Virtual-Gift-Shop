(function() {
    // Aggressive mobile detection — works even when "Request Desktop Site" is toggled
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    var isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua) ||
                   (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                   ('ontouchstart' in window && window.screen.width <= 1024) ||
                   (window.matchMedia && window.matchMedia('(any-pointer: coarse)').matches && window.screen.width <= 1024);

    if (isMobile) {
        // document.open() + document.write() + document.close() is the most reliable
        // way to completely replace the document from within an external script tag.
        // Do NOT call window.stop() before this — it interrupts the write itself.
        document.open();
        document.write(
            '<!DOCTYPE html><html><head>' +
            '<meta charset="UTF-8">' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">' +
            '<title>Coming Soon</title>' +
            '<link rel="preconnect" href="https://fonts.googleapis.com">' +
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
            '<link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Fredoka:wght@400;500;600&display=swap" rel="stylesheet">' +
            '<style>' +
            '*{margin:0;padding:0;box-sizing:border-box}' +
            'html,body{width:100%;height:100%;overflow:hidden}' +
            'body{' +
                'display:flex;flex-direction:column;align-items:center;justify-content:center;' +
                'background:url(assets/bg.webp) center/cover no-repeat fixed;' +
                'background-color:#fce7f3;' +
                'text-align:center;padding:20px;' +
                'font-family:"Fredoka",sans-serif;' +
            '}' +
            '.card{' +
                'background:rgba(255,255,255,0.88);' +
                'padding:44px 36px;' +
                'border-radius:24px;' +
                'box-shadow:0 12px 40px rgba(183,26,61,0.18);' +
                'border:1.5px solid rgba(255,255,255,0.9);' +
                'backdrop-filter:blur(8px);' +
                '-webkit-backdrop-filter:blur(8px);' +
                'max-width:340px;width:90%;' +
            '}' +
            'h1{' +
                'color:#B71A3D;' +
                'font-size:58px;' +
                'font-family:"Pinyon Script",cursive;' +
                'line-height:1.1;' +
                'margin-bottom:12px;' +
            '}' +
            'p{' +
                'color:#666;' +
                'font-size:18px;' +
                'line-height:1.6;' +
                'font-weight:500;' +
            '}' +
            '</style>' +
            '</head><body>' +
            '<div class="card">' +
                '<h1>Coming Soon</h1>' +
                '<p>on your Mobile browsers!</p>' +
            '</div>' +
            '</body></html>'
        );
        document.close();
    }
})();
