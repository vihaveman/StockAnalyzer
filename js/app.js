

// anychart.onDocumentReady(function (ticker) {
//   //anychart.data.loadCsvFile(
//    // 'https://gist.githubusercontent.com/shacheeswadia/cd509e0b0c03964ca86ae7d894137043/raw/5f336c644ad61728dbac93026f3268b86b8d0680/teslaDailyData.csv',
//     //'Tesla1.csv',
//     //function (data) {
//       // create data table on loaded data
//       anychart.data.loadJsonFile("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo",  
     
//     function (data) {

//       let myStockData = data['Time Series (5min)'];
//       console.log(myStockData);
//       let datesRaw = Object.keys(myStockData)
//       let dates = []
//       let open = []
//       let close = []
//       let low = []
//       let high = []
//       let volume = []

      
      
//       let dataString = ''

//       for (let i = 0; i < datesRaw.length; i++) { 
//         dates.push(datesRaw[i])//.split(' ')[1])
//         open.push(myStockData[datesRaw[i]]['1. open'])
//         high.push(myStockData[datesRaw[i]]['2. high'])
//         low.push(myStockData[datesRaw[i]]['3. low'])
//         close.push(myStockData[datesRaw[i]]['4. close'])
//         volume.push(myStockData[datesRaw[i]]['5. volume'])

//         let stockString = `${dates[i]},${open[i]},${high[i]},${low[i]},${close[i]},${volume[i]}\n`
//         dataString += stockString
//         // volume.push(myStockData[dates[i]]['5. volume'])
                 
//       };

//       // console.log(dataString);

//       var dataTable = anychart.data.table();
//       dataTable.addData(dataString);

//       var mapping = dataTable.mapAs({
//         open: 1,
//         high: 2,
//         low: 3,
//         close: 4,
//         volume: 5
//       });

//       // create stock chart
//       var chart = anychart.stock();

//       // create first plot on the chart
//       var plot = chart.plot(0);

//       // set grid settings
//       plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

//       var series = plot.candlestick(mapping)
//         .name('IBM');

//       series.legendItem().iconType('rising-falling');

      
//       // create scroller series with mapped data
//       chart.scroller().candlestick(mapping);

//       // set chart selected date/time range
//       //chart.selectRange('19:30:00', '19:15:00');

//       // create range picker
//       var rangePicker = anychart.ui.rangePicker();
//       rangePicker.format('dd-MM-yyyy HH:mm:ss')

//       // init range picker
//       rangePicker.render(chart);

//       // create range selector
//       //var rangeSelector = anychart.ui.rangeSelector();

//       // init range selector
//       //rangeSelector.render(chart);

//       // sets the title of the chart
//       chart.title('IBM Stock Chart - 5min intervals');
      
      


//       // set container id for the chart
//       chart.container('container');

      

//       // initiate chart drawing
//       chart.draw();
//     })

//   })



//d3.select("#selDataset").on('change', function() {
  
//console.log("ticker is it ")
d3.select("#selDataset").on('change', function() {
  
  d3.select('#container').html()
  //console.log("ticker is it ")
  let ticker =  d3.select('#selDataset').value
  console.log("ticker is the " +ticker)

anychart.onDocumentReady(function (ticker) {
anychart.data.loadJsonFile(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`,  
anychart.data.loadJsonFile(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`,  
function (data) {

  let myStockData = data['Time Series (5min)'];
  console.log(myStockData);
  let datesRaw = Object.keys(myStockData)
  let dates = []
  let open = []
  let close = []
  let low = []
  let high = []
  let volume = []

  
  
  let dataString = ''

  for (let i = 0; i < datesRaw.length; i++) { 
    dates.push(datesRaw[i])//.split(' ')[1])
    open.push(myStockData[datesRaw[i]]['1. open'])
    high.push(myStockData[datesRaw[i]]['2. high'])
    low.push(myStockData[datesRaw[i]]['3. low'])
    close.push(myStockData[datesRaw[i]]['4. close'])
    volume.push(myStockData[datesRaw[i]]['5. volume'])

    let stockString = `${dates[i]},${open[i]},${high[i]},${low[i]},${close[i]},${volume[i]}\n`
    dataString += stockString
                
  };

  // console.log(dataString);

  var dataTable = anychart.data.table();
  dataTable.addData(dataString);

  var mapping = dataTable.mapAs({
    open: 1,
    high: 2,
    low: 3,
    close: 4,
    volume: 5
  });

  // create stock chart
  var chart = anychart.stock();

  // create first plot on the chart
  var plot = chart.plot(0);

  // set grid settings
  plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

  var series = plot.candlestick(mapping)
    .name('IBM');

  series.legendItem().iconType('rising-falling');

  
  // create scroller series with mapped data
  chart.scroller().candlestick(mapping);

  // set chart selected date/time range
  //chart.selectRange('19:30:00', '19:15:00');

  // create range picker
  var rangePicker = anychart.ui.rangePicker();
  rangePicker.format('dd-MM-yyyy HH:mm:ss')

  // init range picker
  rangePicker.render(chart);

  // create range selector
  //var rangeSelector = anychart.ui.rangeSelector();

  // init range selector
  //rangeSelector.render(chart);

  // sets the title of the chart
  chart.title('IBM Stock Chart - 5min intervals');
  
  


  // set container id for the chart
  chart.container('container');

  

  // initiate chart drawing
  chart.draw();
})
)
})

})