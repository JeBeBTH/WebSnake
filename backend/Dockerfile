# Description: 
# This file contains all the commands needed to build the Docker image for the backend service.

# Use the official Python 3.9 image from Docker Hub as the base image
FROM python:3.9

# Set the working directory inside the container to /app
WORKDIR /app

# Copy all files from the current directory on the host to the /app directory in the container
COPY . .

# Install the Python dependencies specified in requirements.txt
RUN pip install -r requirements.txt

# Specify the command to run the application
CMD ["python", "app.py"]