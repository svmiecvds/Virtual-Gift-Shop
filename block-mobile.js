(function() {
    // Aggressive mobile detection — works even when "Request Desktop Site" is toggled
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    var isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua) ||
                   (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                   ('ontouchstart' in window && window.screen.width <= 1024) ||
                   (window.matchMedia && window.matchMedia('(any-pointer: coarse)').matches && window.screen.width <= 1024);

    if (isMobile) {
        // Redirect to dedicated mobile page — most reliable, nothing from the original page leaks through
        window.location.replace('mobile.html');
    }
})();
