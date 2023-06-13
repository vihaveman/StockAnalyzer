google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(fetchData);

function fetchData() {
  const url = 'http://127.0.0.1:5000/openclose';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const tickers = [...new Set(data.map(item => item.Ticker))];
      const tickerDropdown = document.getElementById("tickerDropdown");

      tickers.forEach(ticker => {
        const option = document.createElement("option");
        option.text = ticker;
        tickerDropdown.appendChild(option);
      });

      // When a dropdown value is changed, update the visualizations.
      tickerDropdown.addEventListener("change", updateVisualizations);
      updateVisualizations();

      function updateVisualizations() {
        const selectedTicker = tickerDropdown.value;
        const filteredData = data.filter(item => item.Ticker === selectedTicker);
        drawLineGraph(filteredData);
      }
    })
    .catch(error => console.error('Error:', error));
}

function drawLineGraph(data) {
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn('string', 'Date');
  dataTable.addColumn('number', 'Closing Price');

  data.forEach(item => {
    dataTable.addRow([item.Date, item.Close]);
  });

  const options = {
    title: 'Closing Prices',
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'Closing Price'
    },
    legend: {
      position: 'none'
    }
  };

  const chart = new google.visualization.LineChart(document.getElementById('chart-container'));
  chart.draw(dataTable, options);
}
