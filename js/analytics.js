function initCharts() {
  // Chart.js Global Default Settings for High-Density HUD
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.borderColor = '#1f2b42';
  Chart.defaults.font.family = 'JetBrains Mono, monospace';
  Chart.defaults.font.size = 10;

  // 1. Loss & IoU Validation
  const ctxLoss = document.getElementById('trainingLossChart');
  if (ctxLoss) {
    new Chart(ctxLoss, {
      type: 'line',
      data: {
        labels: ['Ep 1', 'Ep 5', 'Ep 10', 'Ep 15', 'Ep 20', 'Ep 25', 'Ep 30'],
        datasets: [
          {
            label: 'Loss (Dice+BCE)',
            data: [0.68, 0.44, 0.31, 0.23, 0.18, 0.15, 0.138],
            borderColor: '#00d2ff',
            backgroundColor: 'rgba(0, 210, 255, 0.05)',
            borderWidth: 1.5,
            fill: true,
            tension: 0.1
          },
          {
            label: 'IoU Score',
            data: [0.45, 0.62, 0.72, 0.78, 0.81, 0.835, 0.842],
            borderColor: '#10b981',
            borderWidth: 1.5,
            borderDash: [3, 3],
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { boxWidth: 10 } } }
      }
    });
  }

  // 2. Upstream-to-Valley Glacial Descent Profile
  const ctxElevation = document.getElementById('elevationProfileChart');
  if (ctxElevation) {
    new Chart(ctxElevation, {
      type: 'line',
      data: {
        labels: ['0 km (Glacier)', '12 km (Tatopani)', '24 km (Larcha)', '45 km (Bahrabise)', '68 km (Mailung)', '92 km (Trishuli Dam)', '110 km (Basin)'],
        datasets: [
          {
            label: 'Elevation (Meters ASL)',
            data: [4500, 2600, 1850, 1020, 840, 680, 590],
            borderColor: '#00d2ff',
            backgroundColor: 'rgba(0, 210, 255, 0.1)',
            borderWidth: 1.5,
            fill: true,
            pointBackgroundColor: ['#ff2a51', '#ffaa00', '#ffaa00', '#ffaa00', '#ffaa00', '#10b981', '#00d2ff'],
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }

  // 3. Model Benchmark Bar Chart
  const ctxBenchmark = document.getElementById('modelBenchmarkChart');
  if (ctxBenchmark) {
    new Chart(ctxBenchmark, {
      type: 'bar',
      data: {
        labels: ['Baseline Otsu SAR', 'Sentinel-2 Optical NDWI', 'EMSR927 Copernicus Ref', 'Orbit Scope AI (Ours)'],
        datasets: [
          { label: 'IoU Metric', data: [0.54, 0.61, 0.81, 0.842], backgroundColor: '#1f2b42', borderColor: '#00d2ff', borderWidth: 1 },
          { label: 'F1 Metric', data: [0.66, 0.73, 0.89, 0.914], backgroundColor: '#10b981', borderWidth: 0 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { boxWidth: 10 } } }
      }
    });
  }
}