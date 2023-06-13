# Import the dependencies.
# import datetime as dt
import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, Date

import psycopg2 # pip install psycopg2

from flask import Flask, jsonify
import pandas as pd
import matplotlib.pyplot as plt

import requests
import json

from config import api_key




#################################################
# Database Setup
#################################################

# https://stackoverflow.com/questions/9353822/connecting-postgresql-with-sqlalchemy
engine = create_engine('postgresql+psycopg2://mdlwqzat:2YkILyUYMYWNTDQctMXO3qi_iYEJZHWc@rajje.db.elephantsql.com/mdlwqzat') # WORKS




# DEBUG     # https://stackoverflow.com/questions/6473925/sqlalchemy-getting-a-list-of-tables
#inspector = inspect(engine)
#schemas = inspector.get_schema_names()
#for schema in schemas:
    #print("schema: %s" % schema)
    #for table_name in inspector.get_table_names(schema=schema):
        #print(table_name)
        #for column in inspector.get_columns(table_name, schema=schema):
        #    print("Column: %s" % column)





# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

print(Base.classes.keys())

# https://www.geeksforgeeks.org/creating-a-sqlite-database-from-csv-with-python/
# https://dba.stackexchange.com/questions/305358/is-it-possible-to-open-an-sqlite-database-inside-pgadmin
# https://www.commandprompt.com/education/how-to-connect-to-postgresql-database-server-using-python/
# https://learnsql.com/blog/how-to-import-csv-to-postgresql/

# Save references to each table
Microsoft = Base.classes.Microsoft_Stock_Prices
Tesla = Base.classes.Tesla_Stock_Prices


# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


@app.route("/") #default route
def home():
    print("Welcome to StockAnalyzer Page")
    return("Welcome to the homepage")


@app.route("/Microsoft_DB")        # connect to database
def microsoft():
    #grab from database
    # https://www.epochconverter.com/
    results = session.query(Microsoft.Date, Microsoft.Open, Microsoft.High, Microsoft.Low, Microsoft.Close, Microsoft.Adj_Close, Microsoft.Volume)
    df = pd.DataFrame(results, columns=['Date', 'Open', 'High', 'Low', 'Close', 'Adj_Close', 'Volume'])
    # https://stackoverflow.com/questions/63562188/pandas-to-json-date-format-is-changing
    # https://stackoverflow.com/questions/28590663/pandas-dataframe-to-json-without-index
    # https://www.geeksforgeeks.org/how-to-convert-pandas-dataframe-into-json-in-python/
    df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%Y-%m-%d')
    microsoft_json = df.to_json(orient='records', date_format='iso', index='False')    # originally was returning horizontal lines with epoch date format
    
    

    #df.plot(x= ???, y= ???, rot=90)
    plt.xlabel("Date")
    plt.ylabel("???")
    return(microsoft_json)


@app.route("/Tesla_DB")            # connect to database
def tesla():
    #grab from database 
    results = session.query(Tesla.Date, Tesla.Open, Tesla.High, Tesla.Low, Tesla.Close, Tesla.Adj_Close, Tesla.Volume)
    df = pd.DataFrame(results, columns=['Date', 'Open', 'High', 'Low', 'Close', 'Adj_Close', 'Volume'])
    df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%Y-%m-%d')
    tesla_json = df.to_json(orient='records', date_format='iso', index='False')

    #df.plot(x= ???, y= ???, rot=90)
    plt.xlabel("Date")
    plt.ylabel("???")
    return(tesla_json)
    

@app.route('/<Ticker>')         # connect to API
def CS(Ticker):
    #do api calls to alphavantage from here.

    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + Ticker + '&interval=5min&apikey=' + api_key

    r = requests.get(url)  # use demo_url for testing... switch back to url for live
    data = r.json()

    return(data)


# run app
if __name__ == '__main__':
    app.run(debug=True)
