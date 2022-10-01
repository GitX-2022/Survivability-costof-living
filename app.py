from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd

data = pd.read_csv("dataset2.csv")
data = data.replace('?', '')
data = data.replace({',*': ''}, regex=True)

n = data.shape[0]

for i in range(n):
    for j in data.columns:
        if j != 'City':
            if data[j][i] != '':
                data[j][i] = float(data[j][i])
            else:
                data[j][i] = 0

for j in data.columns:
    if j != 'City':
        data[j].fillna(data[j].mean(), inplace=True)

k = []
for i in range(n):
    l = 0
    for j in ['Eggs (regular) (12)', 'Chicken Fillets (1kg)',
              'Buffalo Round (1kg) (or Equivalent Back Leg Red Meat)', 'Eggs (regular) (12)', 'Eggs (regular) (12)',
              'Eggs (regular) (12)']:
        l += float(data[j][i]) / 6
    k.append(l)
data['nonveg'] = k
data.drop(columns={'Eggs (regular) (12)', 'Chicken Fillets (1kg)',
                   'Buffalo Round (1kg) (or Equivalent Back Leg Red Meat)'}, axis=1, inplace=True)
k = []
for i in range(n):
    l = data['Apples (1kg)'][i] * 0.2 + data['Banana (1kg)'][i] * 0.6 + data['Oranges (1kg)'][i] * 0.2
    k.append(l * 3)
data['fruits'] = k
data.drop(columns={'Apples (1kg)', 'Banana (1kg)', 'Oranges (1kg)'}, axis=1, inplace=True)

k = []
for i in range(n):
    l = (data['Tomato (1kg)'][i] * 0.3 + data['Potato (1kg)'][i] * 0.250 + data['Onion (1kg)'][i] * 0.3 +
         data['Lettuce (1 head)'][i] * 0.075) * 4.5
    k.append(l)
data['vegetable'] = k
data.drop(columns={'Tomato (1kg)', 'Potato (1kg)', 'Onion (1kg)', 'Lettuce (1 head)'}, axis=1, inplace=True)

k = []
for i in range(n):
    l = data['Basic (Electricity, Heating, Cooling, Water, Garbage) for 85m2 Apartment'][i] * 0.2 + \
        data['1 min. of Prepaid Mobile Tariff Local (No Discounts or Plans)'][i] * 0.6 + \
        data['Internet (60 Mbps or More, Unlimited Data, Cable/ADSL)'][i] * 0.2
    k.append(l)
data['utilities'] = k
data.drop(columns={'Basic (Electricity, Heating, Cooling, Water, Garbage) for 85m2 Apartment',
                   '1 min. of Prepaid Mobile Tariff Local (No Discounts or Plans)',
                   'Internet (60 Mbps or More, Unlimited Data, Cable/ADSL)'}, axis=1, inplace=True)

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000/"}})


@app.route('/', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def predict():  # put application's code here
    content = request.json

    income = int(content['income'])
    toSave = int(content['toSave'])
    timeHotel = int(content['timeHotel'])
    isNonVeg = int(content['isNonVeg'])
    modeOfTransport = int(content['modeOfTransport'])
    distTravel = int(content['distTravel'])
    noOfChild = int(content['noOfChild'])
    familySize = int(content['familySize'])
    typeOfHouse = int(content['typeOfHouse'])

    data1 = data.copy()

    data1['Water (1.5 liter bottle)'] *= 70 * familySize
    data1['Meal, Inexpensive Restaurant'] *= familySize * timeHotel
    data1['Milk (regular), (1 liter)'] *= 12 * familySize
    data1['Rice (white), (1kg)'] *= 5 * familySize
    data1['nonveg'] *= familySize * isNonVeg
    data1['fruits'] *= familySize
    data1['vegetable'] *= familySize
    data1['Coke/Pepsi (0.33 liter bottle)'] *= familySize
    data1['Cinema, International Release, 1 Seat'] *= familySize
    data1['Gasoline (1 liter)'] *= 0.04
    data1['Preschool (or Kindergarten), Full Day, Private, Monthly for 1 Child'] *= noOfChild

    expCity = []

    for i in range(n):
        exp = 0
        for j in data1.columns:
            if j not in ['City', 'Monthly Pass (Regular Price)', 'Taxi 1km (Normal Tariff)',
                         'Gasoline (1 liter)', 'Cinema, International Release, 1 Seat',
                         'Apartment (1 bedroom) in City Centre',
                         'Apartment (1 bedroom) Outside of Centre',
                         'Apartment (3 bedrooms) in City Centre',
                         'Apartment (3 bedrooms) Outside of Centre']:
                exp += data1[j][i]
        if typeOfHouse == 1:
            exp += data1['Apartment (1 bedroom) in City Centre'][i]
        elif typeOfHouse == 2:
            exp += data1['Apartment (3 bedrooms) in City Centre'][i]
        elif typeOfHouse == 3:
            exp += data1['Apartment (1 bedroom) Outside of Centre'][i]
        elif typeOfHouse == 4:
            exp += data1['Apartment (3 bedrooms) Outside of Centre'][i]
        if modeOfTransport == 0:
            exp += data1['Gasoline (1 liter)'][i] * distTravel
        elif modeOfTransport == 1:
            exp += data1['Taxi 1km (Normal Tariff)'][i] * distTravel
        else:
            exp += data1['Monthly Pass (Regular Price)'][i]
        expCity.append([data1['City'][i], exp, (income - toSave) / exp, income - exp, (income - exp) / toSave])
    expCity.sort(key=lambda x: x[4])
    response = app.response_class(
        response=jsonify(expCity),
        headers={'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin': 'http://localhost:3000/',
                 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                 'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'},
        status=200,
        mimetype='application/json'
    )
    return response


if __name__ == '__main__':
    app.run(debug=True)
