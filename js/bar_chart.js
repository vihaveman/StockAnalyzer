// const button = document.querySelector("button");

// button.addEventListener("click", (event) => {
//   button.textContent = `Click count: ${event.detail}`;
// });

anychart.onDocumentReady(function () {
    
    anychart.data.loadJsonFile("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo", 
    function (data) {

        let myStockData = data['Time Series (5min)'];
        //console.log(myStockData);
        let datesRaw = Object.keys(myStockData)
        let dates = []
        let volume = []
  
        // for (let i = 0; i < dates.length; i++) {
        //     // console.log(Object.keys(myStockData[dates[i]]));
        //     open.push(myStockData[dates[i]]['1. open'])
        //     high.push(myStockData[dates[i]]['2. high'])
        //     low.push(myStockData[dates[i]]['3. low'])
        //     close.push(myStockData[dates[i]]['4. close'])
                     
        // }          
        
        let dataString = ''
  
        for (let i = 0; i < datesRaw.length; i++) { 
          dates.push(datesRaw[i])//.split(' ')[1])
          volume.push(myStockData[datesRaw[i]]['5. volume'])
  
          let stockString = `${dates[i]},${volume[i]}\n`
          dataString += stockString
          // volume.push(myStockData[dates[i]]['5. volume'])
                   
        };
  
        


    // create a data table
    var table = anychart.data.table();
    table.addData(dataString);

    // map value and fill
    var mapping = table.mapAs({value: 1, fill: 2});

    // creates a stock chart and enable individual coloring
    var chart = anychart.stock(true);
    //var chart = anychart.bar(dataString);

    // add a column series
    chart.plot(0).column(mapping).name('Volume');

    
    // draw a chart
    chart.container('container-bar_chart');

    var title = chart.title();
    chart.title("IBM Stock Trading Volume - 5min intervals");
    title.fontSize(18);
    // underline text
    //title.fontDecoration("underline");
    // set font family
    title.fontFamily("Tahoma");


    chart.draw();
    })

})

