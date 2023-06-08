//var data = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol={ticker}&apikey={APIKEY}&outputsize=full').json()"
//var chart = anychart.fromJson(data);

anychart.onDocumentReady(function () {
  //anychart.data.loadCsvFile(
   // 'https://gist.githubusercontent.com/shacheeswadia/cd509e0b0c03964ca86ae7d894137043/raw/5f336c644ad61728dbac93026f3268b86b8d0680/teslaDailyData.csv',
    //'Tesla1.csv',
    //function (data) {
      // create data table on loaded data
    anychart.data.loadJsonFile("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo",  
    function (data) {
      var dataTable = anychart.data.table();
      dataTable.addData(data);
      console.log(data);
      console.log("................");
      console.log(dataTable);

      let myStockData = data['Time Series (5min)'];
      //console.log(myStockData);
      let dates = Object.keys(myStockData)
      let open = []
      let close = []
      let low = []
      let high = []

      for (let i = 0; i < dates.length; i++) {
          // console.log(Object.keys(myStockData[dates[i]]));
          open.push(myStockData[dates[i]]['1. open'])
          high.push(myStockData[dates[i]]['2. high'])
          low.push(myStockData[dates[i]]['3. low'])
          close.push(myStockData[dates[i]]['4. close'])
                   
      }

      console.log(dates);
      console.log(";;;;;;;dates;;;;;;;;;;;;")
      console.log(open);
      console.log(high);
      console.log(low);
      console.log(close);
     


      // console.log("................")
      // console.log(dataTable);

      // map loaded data for the candlestick series
      // var mapping = dataTable.mapAs({
      //   open: 1,
      //   high: 2,
      //   low: 3,
      //   close: 4
      // });

      var mapping = dataTable.mapAs({
        open: 1,
        high: 2,
        low: 3,
        close: 4
      });

      //console.log("................");
      console.log(mapping);

      // create stock chart
      var chart = anychart.stock();

      // create first plot on the chart
      var plot = chart.plot(0);

      // set grid settings
      plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

      var series = plot.candlestick(mapping)
        .name('Tesla');

      series.legendItem().iconType('rising-falling');

      // create scroller series with mapped data
      chart.scroller().candlestick(mapping);

      // set chart selected date/time range
      chart.selectRange('2020-11-27', '2021-11-26');

      // create range picker
      var rangePicker = anychart.ui.rangePicker();

      // init range picker
      rangePicker.render(chart);

      // create range selector
      var rangeSelector = anychart.ui.rangeSelector();

      // init range selector
      rangeSelector.render(chart);

      // sets the title of the chart
      chart.title('Tesla Inc. Stock Chart');

      // set container id for the chart
      chart.container('container');

      // initiate chart drawing
      chart.draw();

    }
  );
});

