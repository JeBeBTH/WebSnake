# For frontend
cd ../frontend
docker build -t jebe24/websnake-frontend:latest .
docker push jebe24/websnake-frontend:latest

# For backend
cd ../backend
docker build -t jebe24/websnake-backend:latest .
docker push jebe24/websnake-backend:latest
