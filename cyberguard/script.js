document.getElementById('scanBtn').addEventListener('click', function () {
    const url = document.getElementById('urlInput').value;
    if (!url) return alert('Please enter a URL');

    const results = document.getElementById('results');
    results.classList.remove('hidden');

    // Reset UI
    document.getElementById('statusTitle').innerText = 'Analyzing...';
    document.getElementById('statusDesc').innerText = 'Running heuristics and checking database...';

    setTimeout(() => {
        // Simple heuristic analysis for demo
        const isPhishing = url.includes('login') || url.includes('verify') || !url.startsWith('https');
        const score = isPhishing ? Math.floor(Math.random() * 40) : 80 + Math.floor(Math.random() * 20);

        const title = document.getElementById('statusTitle');
        const desc = document.getElementById('statusDesc');
        const ssl = document.getElementById('sslStatus');
        const safety = document.getElementById('safetyScore');
        const threat = document.getElementById('threatType');

        if (score < 50) {
            title.innerText = 'Potential Threat Detected!';
            title.className = 'unsafe';
            desc.innerText = 'This URL contains suspicious patterns commonly found in phishing attacks.';
            ssl.innerText = 'INVALID / UNTRUSTED';
            ssl.className = 'value unsafe';
            threat.innerText = 'PHISHING ATTEMPT';
            threat.className = 'value unsafe';
        } else {
            title.innerText = 'URL Appears Safe';
            title.className = 'safe';
            desc.innerText = 'No immediate threats were detected. SSL certificate is valid.';
            ssl.innerText = 'SECURE (HTTPS)';
            ssl.className = 'value safe';
            threat.innerText = 'NONE DETECTED';
            threat.className = 'value safe';
        }

        safety.innerText = `${score}/100`;
        safety.className = 'value ' + (score < 50 ? 'unsafe' : 'safe');
    }, 1500);
});
