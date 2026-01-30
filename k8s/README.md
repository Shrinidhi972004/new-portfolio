# Kubernetes Deployment for Portfolio

## Prerequisites

1. **Kubernetes cluster** (e.g., DigitalOcean, AWS EKS, GKE, or local k3s)
2. **kubectl** configured to access your cluster
3. **NGINX Ingress Controller** installed
4. **cert-manager** installed for SSL certificates

## Installing Prerequisites

### Install NGINX Ingress Controller
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

### Install cert-manager
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
```

## Building and Pushing Docker Images

```bash
# Build and push frontend
docker build -t shrinidhiupadhyaya/portfolio-frontend:latest .
docker push shrinidhiupadhyaya/portfolio-frontend:latest

# Build and push backend
docker build -t shrinidhiupadhyaya/portfolio-backend:latest ./backend
docker push shrinidhiupadhyaya/portfolio-backend:latest
```

## Deployment

### Option 1: Using Kustomize (Recommended)
```bash
kubectl apply -k k8s/
```

### Option 2: Apply Individual Files
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/mongodb-pvc.yaml
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/mongodb-service.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/cluster-issuer.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/backend-hpa.yaml
kubectl apply -f k8s/frontend-hpa.yaml
```

## DNS Configuration

Point your domain to the Ingress Controller's external IP:

```bash
# Get the external IP
kubectl get svc -n ingress-nginx ingress-nginx-controller
```

Add these DNS records:
- `A` record: `shrinidhi.space` → `<EXTERNAL-IP>`
- `A` record: `www.shrinidhi.space` → `<EXTERNAL-IP>`

## Verify Deployment

```bash
# Check all resources
kubectl get all -n portfolio

# Check ingress
kubectl get ingress -n portfolio

# Check certificate status
kubectl get certificate -n portfolio

# View logs
kubectl logs -n portfolio -l app=backend
kubectl logs -n portfolio -l app=frontend
```

## Updating Deployment

```bash
# Update images
kubectl set image deployment/frontend frontend=shrinidhiupadhyaya/portfolio-frontend:v2 -n portfolio
kubectl set image deployment/backend backend=shrinidhiupadhyaya/portfolio-backend:v2 -n portfolio

# Or rollout restart
kubectl rollout restart deployment/frontend -n portfolio
kubectl rollout restart deployment/backend -n portfolio
```

## Cleanup

```bash
kubectl delete -k k8s/
```
