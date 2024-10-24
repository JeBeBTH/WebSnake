# Description:
# This file contains the commands needed to build the Docker image for the frontend service.

# Use the official Nginx image from Docker Hub as the base image
FROM nginx:alpine

# Set the working directory inside the container to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Copy all files from the current directory on the host to the /usr/share/nginx/html directory in the container
COPY . .

# Copy the nginx.conf file from the current directory on the host to the /etc/nginx/conf.d/default.conf directory in the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000 to the host
EXPOSE 3000

# Specify the command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]