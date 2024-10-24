# Description: 
# Deploy the application to the Kubernetes cluster
# and cleanup exited pods

# Apply changes
cd ../yaml
kubectl apply -f websnake-deployment.yaml

# Restart deployments
kubectl rollout restart deployment backend
kubectl rollout restart deployment frontend

# Cleanup exited pods
kubectl get pods --field-selector=status.phase!=Running -o name | xargs kubectl delete