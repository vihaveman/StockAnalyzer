google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(fetchData);

function fetchData() {
  const url = '/volume';

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
      tickerDropdown.addEventListener("change", updateVisualizations.bind(null, data));
      d3.select("#volumeChart").html("")
      // Call updateVisualizations with the fetched data
      updateVisualizations(data);
    })
    .catch(error => console.log(error));
}

function updateVisualizations(data) {
  const selectedTicker = tickerDropdown.value;
  const filteredData = data.filter(item => item.Ticker === selectedTicker);
  const processedData = filteredData.map(item => ({
    date: new Date(item['Date']).toLocaleDateString(),
    volume: parseFloat(item['Volume'])
  }));
  drawBarGraph(processedData);
}

function drawBarGraph(data) {
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn('string', 'Date');
  dataTable.addColumn('number', 'Volume');

  data.forEach(item => {
    dataTable.addRow([item.date, item.volume]);
  });

  const options = {
    title: 'Volume by Date',
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'Volume ($M)'
    }
  };

  const chart = new google.visualization.ColumnChart(document.getElementById('chart-container'));
  chart.draw(dataTable, options);
}


