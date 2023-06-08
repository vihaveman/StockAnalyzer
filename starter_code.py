# N7041URNZLE0ESE1

import csv
import requests

api_key = 'N7041URNZLE0ESE1'
tickers = []
stock_information = []

with open("zacks_screen.csv", 'r') as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        tickers.append(row[1])
    
    # debug
    print.log(tickers)    

# make an API call for information on the tickers
for TK in tickers[:10]: 
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + TK + '&apikey=' + api_key
    r = requests.get(url)
    data = r.json()
    stock_information.append(data)
    
# debug our database
for x in stock_information[:10]:
    print(x)

  