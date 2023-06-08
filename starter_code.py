import csv
import requests
import json
from config import api_key

#######################################################

#### ####            Reference Links          #### ####

# https://earthly.dev/blog/csv-python/
# https://theprogrammingexpert.com/python-print-first-10-items-in-list
# https://www.geeksforgeeks.org/saving-text-json-and-csv-to-a-file-in-python/
# https://stackoverflow.com/questions/522563/accessing-the-index-in-for-loops


#######################################################

tickers = []
stock_information = []
keys = []


with open("zacks_screen.csv", 'r') as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        tickers.append(row[1])
    
    # debug
    #print(tickers)    

# make an API call for information on the tickers
for idx, TK in enumerate(tickers[:3]): 
    
    demo_url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo'
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + TK + '&interval=5min&apikey=' + api_key
    
    r = requests.get(demo_url)  # use demo_url for testing... switch back to url for live
    data = r.json()
    stock_information.append(data)
    
    time_series = data["Time Series (5min)"]

    for timestamp, values in time_series.items():
        print(f"Timestamp: {timestamp}")
        for key, value in values.items():
            
            # do something with the values...
            
            if(key == "1. open"):
                print(f"o: {value}") #temp action

            if(key == "2. high"):
                print(f"h: {value}" ) #temp action

            if(key == "3. low"):
                print(f"l: {value}" ) #temp action

            if(key == "4. close"):
                print(f"c: {value}" ) #temp action        
        
            #print(f"{key}: {value}")
        print()
    
    
# debug our database
#for x in stock_information[:10]:
#    print(x)

#for key in stock_information.keys():
#    print(key)



# save json output to csv file (in case we lose access)
out_file = open("output.json", "w")    
json.dump(stock_information, out_file, indent = 6)
out_file.close()     

  