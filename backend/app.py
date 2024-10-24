# Description: 
# This file contains the Flask application that serves as the backend for the Snake Game application. 
# It provides two routes: one to add a score to the database and another to get the top scores from the database.

from flask import Flask, request, jsonify               # Import Flask and necessary modules for handling requests and JSON responses
from flask_cors import CORS                             # Import CORS for handling Cross-Origin Resource Sharing
from pymongo import MongoClient                         # Import MongoClient to interact with MongoDB 

app = Flask(__name__)                                   # Initialize the Flask application
CORS(app)                                               # Enable CORS for the Flask app

# Connect to MongoDB
client = MongoClient('mongodb://mongodb:27017/')        # Create a MongoDB client connected to the specified URI
db = client.snake_game                                  # Access the 'snake_game' database
scores_collection = db.scores                           # Access the 'scores' collection within the 'snake_game' database

# Route to add a score
@app.route('/scores', methods=['POST'])
def add_score():
    score = request.json.get('score')                   # Get the 'score' from the JSON request body
    if score is not None:                               # Check if the score is not None
        scores_collection.insert_one({'score': score})  # Insert the score into the 'scores' collection
    return jsonify({'status': 'success'}), 201          # Return a success response with status code 201

# Route to get top scores
@app.route('/top-scores', methods=['GET'])
def get_top_scores():
    top_scores = scores_collection.find().sort('score', -1).limit(5)        # Find the top 5 scores sorted in descending order
    top_scores_list = [{'score': score['score']} for score in top_scores]   # Create a list of top scores
    return jsonify(top_scores_list), 200                                    # Return the top scores as a JSON response with status code 200

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)      # Run the Flask app on all available IPs at port 5000 with debug mode enabled