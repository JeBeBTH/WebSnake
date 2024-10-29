WEBSNAKE
========

WEBSNAKE is a web-based implementation of the classic Snake game. 
The project includes a containerized frontend, backend, and database service, 
all orchestrated using Docker and deployed on a Kubernetes cluster.

Project Structure
=================

.vscode/
    settings.json
backend/
    app.py
    Dockerfile
    dependencies.txt
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

Services
========

Frontend
--------

The frontend provides the user interface for the Snake game 
and is built using HTML, CSS, and JavaScript. 
It is served by a Nginx server, which is configured in "nginx.conf".

- HTML: "index.html"
- CSS: "style.css"
- JavaScript: "snake.js"

Backend
-------

The backend is a Flask application that exposes APIs to store and retrieve game scores. 
It communicates with a MongoDB database to persist scores.

- Flask Application: "app.py"

Database
--------

The database service is powered by MongoDB, used to store game scores. 
The MongoDB instance is containerized using a Dockerfile located in the "db" directory.

Communication Between Services
==============================

- Frontend ↔ Backend: 
  The frontend sends HTTP requests to the backend when a game ends. 
  It uses a "POST" request to the "/scores" endpoint to store game scores in the database.
  
- Backend ↔ Database: 
  The backend interacts with MongoDB to store and retrieve scores from the "scores" collection.

Deployment
==========

Building and Pushing Docker Images
----------------------------------

To build and push the Docker images for the frontend and backend, run:

    sh/build-push.sh

This script builds the Docker images and pushes them to Docker Hub.

Deploying to Kubernetes
-----------------------

To deploy the application to a Kubernetes cluster, run:

    sh/deploy.sh

This script applies the Kubernetes deployment configuration defined in `websnake-deployment.yaml` 
and restarts the deployments for the frontend and backend.
