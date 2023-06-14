google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(fetchData);

function fetchData() {
  const url = '/openclose/';

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

      updateVisualizations();
    })
    .catch(error => console.log(error));
}

function drawLineGraph(data) {
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn('date', 'Date');
  dataTable.addColumn('number', 'Close');

  data.forEach(item => {
    const date = new Date(item.Date);
    const close = parseFloat(item.Close);
    dataTable.addRow([date, close]);
  });

  const options = {
    title: 'Closing Prices',
    width: 600,
    height: 400,
    legend: { position: 'none' },
    hAxis: { format: 'MMM yyyy' },
    vAxis: { title: 'Close' }
  };

  const chart = new google.visualization.LineChart(document.getElementById('chart-container'));
  chart.draw(dataTable, options);
}






