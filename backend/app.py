from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)


@app.route("/api/brands", methods=["GET"])
def get_brands():
    sheet_name = "Manufacturers"
    df = pd.read_excel("./470 Project Data.xlsx", sheet_name=sheet_name)
    manufacturers = df.values
    brands = []
    for i in range(len(manufacturers)):
        brands.append(manufacturers[i][0])
    return brands


@app.route("/api/models/<brand>", methods=["GET"])
def get_models(brand):
    sheet_name = "Features"
    df = pd.read_excel("./470 Project Data.xlsx", sheet_name=sheet_name)
    df = df.fillna(0)
    matrix = df.values
    cars = []
    for i in range(len(matrix)):
        if brand == matrix[i][1]:
            cars.append(matrix[i][0])
    return cars


@app.route("/api/similar/<brand>/<model>")
def get_similar(brand, model):
    return


if __name__ == "__main__":
    app.run(debug=True, port=5000)
