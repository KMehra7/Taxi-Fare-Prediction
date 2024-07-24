import joblib
#from sklearn.datasets import load_iris
classifier = joblib.load('classifier.joblib')

#iris = load_iris()

print(classifier.predict([[5.8,2.7,5.1,1.9]]))