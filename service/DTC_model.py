from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
import joblib

# Load the iris dataset
iris = load_iris()
X = iris.data
y = iris.target

# Create and train the DecisionTreeClassifier model
model = DecisionTreeClassifier()
model.fit(X, y)

# Dump the model to a file named 'classifier.joblib'
joblib.dump(model, 'classifier.joblib')
