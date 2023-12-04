from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


def cosine_similarity_function(array1, array2):
    # Convert arrays to 2D arrays (reshape if needed)
    array1 = np.array(array1).reshape(1, -1)
    array2 = np.array(array2).reshape(1, -1)

    # Calculate cosine similarity
    similarity = cosine_similarity(array1, array2)

    return similarity[0, 0]


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
    sheet_name = "Features"
    df = pd.read_excel("./470 Project Data.xlsx", sheet_name=sheet_name)
    df = df.fillna(0)
    matrix = df.values
    for i in range(len(matrix)):
        if model == matrix[i][0]:
            car = matrix[i]
    c1 = car[3:7]
    c2 = car[8:10]
    c = np.concatenate((c1, c2))

    sims = []

    for i in range(len(matrix)):
        if matrix[i][0] == car[0]:
            sims.append(0.0)
        elif (
            matrix[i][10] == car[10] and matrix[i][7] == car[7]
        ):  # only looks for same body style cars SUBJECT TO CHANGE
            m1 = matrix[i][3:7]
            m2 = matrix[i][8:10]
            m = np.concatenate((m1, m2))

            # Weights added to each variable to even out differences between variables.
            m[0] = m[0] * 10000
            m[1] = m[1] * 10
            m[2] = m[2] * 100
            m[3] = m[3] * 10
            m[4] = m[4] * 10
            m[5] = m[5] * 100
            c[0] = c[0] * 10000
            c[1] = c[1] * 10
            c[2] = c[2] * 100
            c[3] = c[3] * 10
            c[4] = c[4] * 10
            c[5] = c[5] * 100
            sims.append(cosine_similarity_function(c, m))

    # Sort the similarities in descending order
    sorted_sims = sorted(enumerate(sims), key=lambda x: x[1], reverse=True)
    similar_cars = []
    for index, similarity in sorted_sims:
        similar_cars.append((matrix[index][1], matrix[index][0]))
    print(similar_cars)
    return similar_cars


@app.route("/api/price/<brand>/<model>", methods=["GET"])
def get_price(brand, model):
    sheet_name = "Features"
    df = pd.read_excel("./470 Project Data.xlsx", sheet_name=sheet_name)
    df = df.fillna(0)
    matrix = df.values

    for i in range(len(matrix)):
        if model == matrix[i][0]:
            price = matrix[i][3]
            seating = matrix[i][9]
            body = matrix[i][10]
    return [str(price), str(seating), str(body)]


if __name__ == "__main__":
    app.run(debug=True, port=5000)
