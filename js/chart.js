// js/chart.js

// 1) Fetch & parse CSV
Papa.parse('data/dataset.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: ({ data }) => {
    // Expecting columns exactly: Month, Profit
    const labels = data.map(r => r.Month);
    const values = data.map(r => parseFloat(r.Profit));
    renderProfitChart(labels, values);
  },
  error: (err) => {
    console.error('CSV load error:', err);
  }
});

// 2) Render Chart.js line chart
function renderProfitChart(labels, values) {
  const ctx = document.getElementById('dataChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Profitto (€)',
        data: values,
        borderWidth: 2,
        fill: false,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'category',
          title: { display: true, text: 'Mese (MM/YYYY)' }
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Profitto (€)' }
        }
      },
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}
