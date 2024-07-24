from flask import Flask, request, make_response, jsonify
from flask_restx import Api, Resource, fields
import joblib
import numpy as np
flask_app = Flask(__name__)
app = Api(app = flask_app, 
			version = "1.0", 
			title = "ML React App", 
			description = "Predict results using a trained model")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params', 
				  {'start_latitude': fields.Float(required = True, 
				  							   description="start_latitude", 
    					  				 	   help="Start Latitude cannot be blank"),
				  'start_longitude': fields.Float(required = True, 
				  							   description="start_longitude", 
    					  				 	   help="start Longitude cannot be blank"),
				  'destination_latitude': fields.Float(required = True, 
				  							description="destination_latitude", 
    					  				 	help="Destination Latitude cannot be blank"),
				  'destination_longitude': fields.Float(required = True, 
				  							description="destination_longitude", 
    					  				 	help="Destination Longitude cannot be blank")})

classifier = joblib.load('classifier.joblib')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)		
	
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData]
			print('Data received on backend::',data)
			prediction = classifier.predict(np.array([[5.8,2.7,5.1,1.9]]).reshape(1, -1))
			types = { 0: "Iris Setosa", 1: "Iris Versicolour ", 2: "Iris Virginica"}
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "The type of iris plant is: " + types[prediction[0]]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})
