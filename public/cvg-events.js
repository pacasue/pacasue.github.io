(function () {

    var SCROLL_25_KEY        = 'hpv_scroll_25';
    var SCROLL_50_KEY        = 'hpv_scroll_50';
    var SCROLL_75_KEY        = 'hpv_scroll_75';

    var OUTBOUND_EVENTS = [
        { domain: 'instagram.com',     eventName: 'Social Instagram Click' }, // maps to InstagramVisit
        { domain: 'facebook.com',      eventName: 'Social Facebook Click' },  // maps to FacebookVisit
        { domain: 'getreyou.com',      eventName: 'HPV Reyou Click' },        // maps to ReyouVisit
        { domain: 'pacagen.com',       eventName: 'HPV Pacagen Click' },       // maps to PacagenVisit
        { domain: 'drinkwildtype.com', eventName: 'HPV Wildtype Click' },      // maps to WildtypeVisit
    ];

    var PARTNER_DOMAINS = ['getreyou.com', 'pacagen.com', 'drinkwildtype.com'];

    // Safe wrapper — polls every 200ms until cvg pixel has loaded and set cvg.process,
    // then drains the queue. Direct cvg() calls fail silently before the pixel loads.
    var eventQueue = [];
    var retryInterval = null;

    function checkCvgReady() {
        if (typeof cvg !== 'undefined' && typeof cvg.process === 'function') {
            if (retryInterval) { clearInterval(retryInterval); retryInterval = null; }
            while (eventQueue.length > 0) { cvg(eventQueue.shift()); }
            return true;
        }
        return false;
    }

    function safeTrack(data) {
        if (checkCvgReady()) {
            cvg(data);
        } else {
            eventQueue.push(data);
            if (!retryInterval) { retryInterval = setInterval(checkCvgReady, 200); }
        }
    }

    function getCookie(name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length === 2) return parts.pop().split(';').shift();
        return '';
    }

    // Forward Converge identity onto partner domains. Inserts before any hash
    // so links like /pages/science#clinical-trial stay intact.
    function appendCvgParams(url) {
        var uid = getCookie('__cvg_uid');
        var sid = getCookie('__cvg_sid');
        var params = [];
        if (uid && url.indexOf('__cvg_uid=') === -1) params.push('__cvg_uid=' + encodeURIComponent(uid));
        if (sid && url.indexOf('__cvg_sid=') === -1) params.push('__cvg_sid=' + encodeURIComponent(sid));
        if (!params.length) return url;

        var hash = '';
        var hashIdx = url.indexOf('#');
        if (hashIdx !== -1) {
            hash = url.slice(hashIdx);
            url = url.slice(0, hashIdx);
        }
        return url + (url.indexOf('?') !== -1 ? '&' : '?') + params.join('&') + hash;
    }

    function isPartnerHost(host) {
        for (var i = 0; i < PARTNER_DOMAINS.length; i++) {
            var d = PARTNER_DOMAINS[i];
            if (host === d || host.endsWith('.' + d)) return true;
        }
        return false;
    }

    // 1. Outbound + mailto click tracking
    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href]');
        if (!link) return;
        var href = link.getAttribute('href') || '';

        // mailto: editorial@hairprovoices.com contact link in footer
        if (href.indexOf('mailto:') === 0) {
            safeTrack({ method: 'track', eventName: 'Email Contact Click', properties: {
                mailto: href.replace('mailto:', '')
            }});
            return;
        }

        // outbound social links (Instagram, Facebook) in footer, plus partner domains
        var host = '';
        try { host = new URL(link.href).hostname; } catch (x) { return; }
        for (var i = 0; i < OUTBOUND_EVENTS.length; i++) {
            var d = OUTBOUND_EVENTS[i].domain;
            if (host === d || host.endsWith('.' + d)) {
                safeTrack({ method: 'track', eventName: OUTBOUND_EVENTS[i].eventName, properties: {
                    outbound_url: link.href
                }});

                // Partner clicks wait 200ms and carry __cvg_uid / __cvg_sid.
                // Social and mailto clicks are tracked only.
                if (isPartnerHost(host)) {
                    var finalUrl = appendCvgParams(link.href);
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
                        link.href = finalUrl;
                    } else {
                        e.preventDefault();
                        var pendingWin = link.target === '_blank' ? window.open('', '_blank') : null;
                        if (pendingWin) pendingWin.opener = null;
                        setTimeout(function () {
                            if (pendingWin) pendingWin.location.href = finalUrl;
                            else window.location.href = finalUrl;
                        }, 200);
                    }
                }
                break;
            }
        }
    });

    // 2. Newsletter signup — fires on any form submit that contains an email input
    document.addEventListener('submit', function (e) {
        var form = e.target;
        if (form && form.querySelector('input[type="email"]')) {
            safeTrack({ method: 'track', eventName: 'Newsletter Signup', properties: {
                page: window.location.pathname
            }});
        }
    });

    // 3. Scroll depth 25 / 50 / 75 — once per session per threshold
    var maxScroll = 0;
    function readScrollDepth() {
        var total = document.documentElement.scrollHeight;
        if (total <= 0) return 0;
        return Math.min(1, (window.scrollY + window.innerHeight) / total);
    }
    function checkScrollThresholds() {
        var depth = readScrollDepth();
        if (depth > maxScroll) maxScroll = depth;
        var d = maxScroll;
        if (d >= 0.25 && !sessionStorage.getItem(SCROLL_25_KEY)) {
            sessionStorage.setItem(SCROLL_25_KEY, '1');
            safeTrack({ method: 'track', eventName: 'Scroll Depth 25%' });
        }
        if (d >= 0.50 && !sessionStorage.getItem(SCROLL_50_KEY)) {
            sessionStorage.setItem(SCROLL_50_KEY, '1');
            safeTrack({ method: 'track', eventName: 'Scroll Depth 50%' });
        }
        if (d >= 0.75 && !sessionStorage.getItem(SCROLL_75_KEY)) {
            sessionStorage.setItem(SCROLL_75_KEY, '1');
            safeTrack({ method: 'track', eventName: 'Scroll Depth 75%' });
        }
    }
    window.addEventListener('scroll', checkScrollThresholds, { passive: true });
    checkScrollThresholds();

    window.resetScrollDepth = function () {
        maxScroll = 0;
        sessionStorage.removeItem(SCROLL_25_KEY);
        sessionStorage.removeItem(SCROLL_50_KEY);
        sessionStorage.removeItem(SCROLL_75_KEY);
    };

})();