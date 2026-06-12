(function () {

    var SESSION_PV_COUNT_KEY = 'hpv_session_pv_count';
    var FIRED_PV2_KEY        = 'hpv_fired_pv2';
    var FIRED_PV3_KEY        = 'hpv_fired_pv3';
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

        // outbound social links (Instagram, Facebook) in footer
        var host = '';
        try { host = new URL(link.href).hostname; } catch (x) { return; }
        for (var i = 0; i < OUTBOUND_EVENTS.length; i++) {
            var d = OUTBOUND_EVENTS[i].domain;
            if (host === d || host.endsWith('.' + d)) {
                safeTrack({ method: 'track', eventName: OUTBOUND_EVENTS[i].eventName, properties: {
                    outbound_url: link.href
                }});
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

    // 4. Session pageview milestones — increments on each hard page load
    // Note: SPA route changes (React Router) do not re-run this script.
    var raw  = sessionStorage.getItem(SESSION_PV_COUNT_KEY);
    var prev = raw ? parseInt(raw, 10) : 0;
    var next = isFinite(prev) ? prev + 1 : 1;
    sessionStorage.setItem(SESSION_PV_COUNT_KEY, String(next));

    if (next === 2 && !sessionStorage.getItem(FIRED_PV2_KEY)) {
        sessionStorage.setItem(FIRED_PV2_KEY, '1');
        safeTrack({ method: 'track', eventName: 'Session Pageviews 2', properties: { session_page_views: 2 } });
    }
    if (next === 3 && !sessionStorage.getItem(FIRED_PV3_KEY)) {
        sessionStorage.setItem(FIRED_PV3_KEY, '1');
        safeTrack({ method: 'track', eventName: 'Session Pageviews 3', properties: { session_page_views: 3 } });
    }

})();
