// Chart Configuration
let trafficChart;
const ctx = document.getElementById('trafficChart').getContext('2d');

function initChart() {
    trafficChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Views',
                data: [5000, 8000, 12000, 10000, 15000, 18000, 22000],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { display: false },
                x: { grid: { display: false } }
            }
        }
    });
}

// Navigation Logic
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const viewTitle = document.getElementById('view-title');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Toggle Active Class in Nav
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        // Toggle Views
        const targetView = item.getAttribute('data-view');
        views.forEach(v => v.classList.add('hidden'));
        document.getElementById(`view-${targetView}`).classList.remove('hidden');

        // Update Title
        const names = {
            'dashboard': 'Marketing Insights Hub',
            'seo': 'SEO Traffic Analysis',
            'audience': 'Audience Segmentation',
            'settings': 'Dashboard Settings'
        };
        viewTitle.innerText = names[targetView] || 'Analytica';
    });
});

// Interactive Stats
function updateChart(type) {
    const data = {
        'pageviews': [5000, 8000, 12000, 15000, 18000, 25000, 30000],
        'bounce': [40, 38, 35, 33, 31, 29, 28],
        'conversion': [2.1, 2.5, 3.2, 3.8, 4.1, 4.5, 4.8]
    };
    trafficChart.data.datasets[0].data = data[type];
    trafficChart.update();
}

function setRange(range) {
    // UI Visual indication
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    // In a real app, this would fetch new data
    const multiplier = range === '30d' ? 4 : 1;
    const newData = trafficChart.data.datasets[0].data.map(v => v * multiplier);
    trafficChart.data.datasets[0].data = newData;
    trafficChart.update();
}

// Initialize
initChart();
