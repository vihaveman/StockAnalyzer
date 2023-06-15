function fetchData() {
  const url = '/openclose';

  return fetch(url)
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
        const processedData = convertData(filteredData);
        drawLineGraph(processedData);
      }
    })
    .catch(error => console.log(error));
}

function convertData(data) {
  return data.map(item => ({
    ...item,
    Date: new Date(item.Date),
    Close: parseFloat(item.Close)
  }));
}

function drawLineGraph(data) {
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select('#lineChartContainer')
    .html('') // Clear any existing SVG elements
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleTime()
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .range([height, 0]);

  const line = d3.line()
    .x(d => xScale(d.Date))
    .y(d => yScale(d.Close));

  xScale.domain(d3.extent(data, d => d.Date));
  yScale.domain([0, d3.max(data, d => d.Close)]);

  svg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line)
    .style('stroke', 'red');

  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  svg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale));

  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -10)
    .attr('text-anchor', 'middle')
    .text('Closing Prices');
}

// Load D3.js and fetch data
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    import('https://d3js.org/d3.v7.min.js'), // Load D3.js from the CDN
    fetchData() // Fetch data and draw the line graph
  ]).catch(error => console.log(error));
});


fetchData();