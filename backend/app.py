from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://mongodb:27017/')
db = client.snake_game
scores_collection = db.scores

@app.route('/scores', methods=['POST'])
def add_score():
    score = request.json.get('score')
    if score is not None:
        scores_collection.insert_one({'score': score})
    return jsonify({'status': 'success'}), 201

@app.route('/top-scores', methods=['GET'])
def get_top_scores():
    top_scores = scores_collection.find().sort('score', -1).limit(5)
    top_scores_list = [{'score': score['score']} for score in top_scores]
    return jsonify(top_scores_list), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)