console.log(typeof google.charts.load); // Check if google.charts.load is a function
console.log(typeof google.charts.setOnLoadCallback); // Check if google.charts.setOnLoadCallback is a function

// Define the initial ticker
let selectedTicker = "";

// Define the updateVisualizations function
function updateVisualizations() {
  selectedTicker = d3.select("#tickerDropdown").node().value;

  // Fetch the high-low data for the selected ticker
  d3.json(`http://127.0.0.1:5000/highlow?ticker=${selectedTicker}`)
    .then(highLowData => {
      // Fetch the open-close data for the selected ticker
      d3.json(`http://127.0.0.1:5000/openclose?ticker=${selectedTicker}`)
        .then(openCloseData => {
          // Combine the high-low and open-close data based on the date
          const combinedData = combineData(highLowData, openCloseData);

          // Update the candlestick chart
          drawCandlestickChart(combinedData);
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

// Load the Visualization API and the corechart package
google.charts.load("current", { packages: ["corechart"] });

// Set a callback function to execute when the Google Charts library is loaded
google.charts.setOnLoadCallback(updateVisualizations);

// Function to combine high-low and open-close data based on date
function combineData(highLowData, openCloseData) {
  return highLowData.map(highLowItem => {
    const correspondingOpenCloseItem = openCloseData.find(
      openCloseItem => openCloseItem.Date === highLowItem.Date
    );
    return { ...highLowItem, ...correspondingOpenCloseItem };
  });
}

// Function to draw the candlestick chart
function drawCandlestickChart(data) {
  // Create a DataTable and add the data
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn("date", "Date");
  dataTable.addColumn("number", "Low");
  dataTable.addColumn("number", "Open");
  dataTable.addColumn("number", "Close");
  dataTable.addColumn("number", "High");

  data.forEach(item => {
    const date = new Date(item.Date);
    dataTable.addRow([date, item.Low, item.Open, item.Close, item.High]);
  });

  // Set options for the candlestick chart
  const options = {
    legend: "none",
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "red" },
      risingColor: { strokeWidth: 0, fill: "green" },
    },
    chartArea: { width: "80%", height: "80%" },
  };

  // Create a new CandlestickChart and attach it to the container element
  const chart = new google.visualization.CandlestickChart(
    document.getElementById("candlestickChart")
  );

  // Draw the chart with the data and options
  chart.draw(dataTable, options);
}

// When a dropdown value is changed, update the visualizations
d3.select("#tickerDropdown").on("change", updateVisualizations);



