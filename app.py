from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/StockData"
mongo = PyMongo(app)

@app.route('/stockinfo/<ticker>', methods=['GET'])
def get_stockinfo(ticker):
    data = mongo.db.StockInfo.find()
    return dumps(data)  # Converts BSON to JSON

from flask import jsonify

@app.route('/openclose/<ticker>', methods=['GET'])
def get_openclose(ticker):
    data = mongo.db.OpenClose.find()
    json_data = dumps(data)  # Converts BSON to JSON
    return jsonify(json_data)  # Return a JSON response


@app.route('/highlow/<ticker>', methods=['GET'])
def get_highlow(ticker):
    data = mongo.db.HighLow.find()
    return dumps(data)  # Converts BSON to JSON

@app.route('/volume/<ticker>', methods=['GET'])
def get_volume(ticker):
    data = mongo.db.Volume.find()
    return dumps(data)  # Converts BSON to JSON

@app.route("/")
def main(): 
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)


