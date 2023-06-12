anychart.onDocumentReady(function () {
    
    anychart.data.loadJsonFile("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo", 
    function (data) {

        let myStockData = data['Time Series (Daily)'];
        console.log(myStockData);
        console.log("...................");
        let datesRaw = Object.keys(myStockData)
        console.log(datesRaw)
        let dates = []
        let open = []
        let high = []
        let low = []
        let close = []
        let Aclose = []
        let volume = []
        let divAmt = []
        let splitCoef = []

        let dataString = ''

  
        for (let i = 0; i < datesRaw.length; i++) { 
            dates.push(datesRaw[i])//.split(' ')[1])
            open.push(myStockData[datesRaw[i]]['1. open'])
            high.push(myStockData[datesRaw[i]]['2. high'])
            low.push(myStockData[datesRaw[i]]['3. low'])
            close.push(myStockData[datesRaw[i]]['4. close'])
            volume.push(myStockData[datesRaw[i]]['6. volume'])
        
            let stockString = `${dates[i]},${open[i]},${high[i]},${low[i]},${close[i]},${volume[i]}\n`
            dataString += stockString
        // volume.push(myStockData[dates[i]]['5. volume'])
                 
      };
        // }          
        
      console.log(dataString);
       
  
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
      rangePicker.format('dd-MM-yyyy')

      // init range picker
      rangePicker.render(chart);

      // create range selector
      //var rangeSelector = anychart.ui.rangeSelector();

      // init range selector
      //rangeSelector.render(chart);

      // sets the title of the chart
      chart.title('IBM Stock Chart - Daily');
      
      


      // set container id for the chart
      chart.container('container_daily');

      // initiate chart drawing
      chart.draw();
    }
  );
});