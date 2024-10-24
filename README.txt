WEBSNAKE is a web-based implementation of the classic Snake game. 
The project consists of a frontend, a backend, and a database service
All of these are containerized using Docker and deployed on a Kubernetes cluster.

--------- Project Structure ---------

.vscode/
    settings.json
backend/
    app.py
    Dockerfile
    requirements.txt
db/
    Dockerfile
frontend/
    Dockerfile
    index.html
    nginx.conf
    snake.js
    style.css
README
sh/
    build-push.sh
    deploy.sh
yaml/
    websnake-deployment.yaml
--------------------------------------




--------- Services ---------


--------- Frontend ---------

The frontend is a web application that provides the user interface for the Snake game. 
It is implemented using HTML, CSS, and JavaScript.

------------------------
HTML: index.html
CSS: style.css
JavaScript: snake.js
------------------------

The frontend is served by an Nginx server, configured in nginx.conf.




--------- Backend---------

The backend is a Flask application that provides APIs for storing and retrieving game scores. 
It interacts with a MongoDB database to persist the scores.

------------------------
Flask Application: app.py
------------------------




--------- Database---------

The database service uses MongoDB to store the game scores. 
The MongoDB instance is containerized and configured using a Dockerfile in the db directory.




--------- Communication Between Services ---------

Frontend to Backend: The frontend communicates with the backend via HTTP requests. 
When a game ends, the frontend sends the score to the backend using a POST request to the /scores endpoint. 
The backend stores this score in the MongoDB database.

Backend to Database: 
The backend uses the MongoDB client to interact with the database. 
It stores the scores in the scores collection and retrieves the top scores when requested.




--------- Deployment ---------

Building and Pushing Docker Images
To build and push the Docker images for the frontend and backend, run the following script:
----------------------------
|     sh/build-push.sh     |
----------------------------
This script builds the Docker images and pushes them to Docker Hub.



Deploying to Kubernetes
To deploy the application to a Kubernetes cluster, run the following script:
----------------------------
|	   sh/deploy.sh	       |
----------------------------
This script applies the Kubernetes deployment configuration defined in websnake-deployment.yaml
and restarts the deployments for the frontend and backend.
