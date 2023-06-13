d3.json("http://127.0.0.1:5000/stockinfo").then(data => {
    console.log(data);

    // Populate the ticker dropdown with the unique tickers from the data.
    const tickers = [...new Set(data.map(item => item.Ticker))];
    const tickerDropdown = d3.select("#tickerDropdown");
    tickers.forEach(ticker => {
        tickerDropdown.append("option").text(ticker);
    });

    // Populate the date dropdown with the unique dates from the data.
    const dates = [...new Set(data.map(item => new Date(item.Date).getFullYear()))];
    const dateDropdown = d3.select("#dateDropdown");
    ["1 month", "3 months", "6 months", "1 year", "3 years", "5 years"].forEach(date => {
        dateDropdown.append("option").text(date);
    });

    // When a dropdown value is changed, update the visualizations.
    d3.selectAll("#tickerDropdown, #dateDropdown").on("change", updateVisualizations);

    function updateVisualizations() {
        const selectedTicker = tickerDropdown.node().value;
        const selectedDate = dateDropdown.node().value;

        // Filter the data based on the selected ticker and date.
        const filteredData = data.filter(item => item.Ticker === selectedTicker && new Date(item.Date).getFullYear() === Number(selectedDate));

        // Check if filteredData is not empty
        if (filteredData.length > 0) {
            // Update the stock information table.
            const stockInfo = d3.select("#stockInfo");
            stockInfo.html(""); // Clear the previous contents.
            const table = stockInfo.append("table");
            const thead = table.append("thead");
            const tbody = table.append("tbody");

            // Append the headers.
            thead.append("tr").selectAll("th")
                .data(Object.keys(filteredData[0])).enter()
                .append("th").text(d => d);

            // Append the rows.
            tbody.selectAll("tr")
                .data(filteredData).enter()
                .append("tr").selectAll("td")
                .data(d => Object.values(d)).enter()
                .append("td").text(d => d);
        } else {
            // Handle the case where filteredData is empty, e.g., display a message
            console.log("No data matches the selected ticker and date.");
        }
    }

    // Call the function to update the visualizations initially.
    updateVisualizations();

}).catch(error => console.log(error));
