# Portfolio Application - Kubernetes Deployment Guide

Complete guide to deploy the DevOps Portfolio application on Kubernetes with HTTPS/TLS.

## Architecture Overview

```
                                    ┌─────────────────────────────────────────────────────┐
                                    │                   Kubernetes Cluster                 │
                                    │                                                      │
    Internet                        │  ┌─────────────┐      ┌─────────────────────────┐   │
        │                           │  │   Ingress   │      │      portfolio ns       │   │
        │                           │  │  Controller │      │                         │   │
        ▼                           │  │   (nginx)   │      │  ┌───────┐  ┌───────┐   │   │
   ┌─────────┐                      │  └──────┬──────┘      │  │Frontend│  │Frontend│  │   │
   │   DNS   │                      │         │             │  │ Pod 1  │  │ Pod 2  │  │   │
   │shrinidhi│──────────────────────┼────────►│             │  └───┬────┘  └───┬────┘  │   │
   │ .space  │                      │         │             │      │           │       │   │
   └─────────┘                      │         ▼             │      └─────┬─────┘       │   │
                                    │  ┌─────────────┐      │            │             │   │
                                    │  │  Ingress    │      │            ▼             │   │
                                    │  │  Resource   │──────┼───► frontend-service     │   │
                                    │  │  (TLS/SSL)  │      │            │             │   │
                                    │  └─────────────┘      │            │ /api/*      │   │
                                    │                       │            ▼             │   │
                                    │  ┌─────────────┐      │  ┌───────┐  ┌───────┐   │   │
                                    │  │ Cert-Manager│      │  │Backend│  │Backend│   │   │
                                    │  │ (Let's      │      │  │ Pod 1 │  │ Pod 2 │   │   │
                                    │  │  Encrypt)   │      │  └───┬───┘  └───┬───┘   │   │
                                    │  └─────────────┘      │      │          │        │   │
                                    │                       │      └────┬─────┘        │   │
                                    │                       │           │              │   │
                                    │                       │           ▼              │   │
                                    │                       │    backend-service       │   │
                                    │                       │           │              │   │
                                    │                       │           ▼              │   │
                                    │                       │    ┌───────────┐         │   │
                                    │                       │    │  MongoDB  │         │   │
                                    │                       │    │StatefulSet│         │   │
                                    │                       │    └─────┬─────┘         │   │
                                    │                       │          │               │   │
                                    │                       │          ▼               │   │
                                    │                       │    ┌───────────┐         │   │
                                    │                       │    │    PVC    │         │   │
                                    │                       │    │  (5Gi)    │         │   │
                                    │                       │    └───────────┘         │   │
                                    │                       └─────────────────────────┘   │
                                    └─────────────────────────────────────────────────────┘
```

## Prerequisites

- Kubernetes cluster (GKE, EKS, AKS, DigitalOcean, or self-managed)
- `kubectl` CLI configured with cluster access
- Domain name pointing to your cluster's load balancer IP
- Docker Hub account (or other container registry)

## File Structure

```
k8s/
├── namespace.yaml                 # Isolated namespace
├── kustomization.yaml             # Kustomize orchestration
├── network-policy.yaml            # Network security rules
├── README.md                      # This file
├── cert-manager/
│   └── cluster-issuer.yaml        # Let's Encrypt issuer
├── configmaps/
│   └── nginx-config.yaml          # Nginx reverse proxy config
├── secrets/
│   └── mongodb-secret.yaml        # Database credentials
├── mongodb/
│   ├── pvc.yaml                   # Persistent storage (5Gi)
│   ├── statefulset.yaml           # MongoDB instance
│   └── service.yaml               # Headless service
├── backend/
│   ├── deployment.yaml            # Node.js API (2 replicas)
│   ├── service.yaml               # ClusterIP service
│   └── hpa.yaml                   # Auto-scaling (2-10 pods)
├── frontend/
│   ├── deployment.yaml            # Nginx (2 replicas)
│   └── service.yaml               # ClusterIP service
└── ingress/
    └── ingress.yaml               # TLS ingress for shrinidhi.space
```

---

## Deployment Steps

### Step 1: Build and Push Docker Images

```bash
# Navigate to project root
cd /home/shrinidhi/Desktop/portfolio-react

# Build frontend image
docker build -t shrinidhiupadhyaya/portfolio-react-frontend:latest .

# Build backend image
docker build -t shrinidhiupadhyaya/portfolio-react-backend:latest ./backend

# Login to Docker Hub
docker login

# Push images
docker push shrinidhiupadhyaya/portfolio-react-frontend:latest
docker push shrinidhiupadhyaya/portfolio-react-backend:latest
```

### Step 2: Install Nginx Ingress Controller

```bash
# Add ingress-nginx repository
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Install ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.publishService.enabled=true

# Wait for the LoadBalancer IP
kubectl get svc -n ingress-nginx -w
```

**Note the EXTERNAL-IP** - you'll need to point your domain DNS to this IP.

### Step 3: Install Cert-Manager

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.0/cert-manager.yaml

# Verify installation
kubectl get pods -n cert-manager

# Wait until all pods are Running
kubectl wait --for=condition=Ready pods --all -n cert-manager --timeout=120s
```

### Step 4: Configure DNS

Point your domain to the Ingress Controller's external IP:

| Type | Name | Value |
|------|------|-------|
| A | @ | `<EXTERNAL-IP>` |
| A | www | `<EXTERNAL-IP>` |

Or use a CNAME if your provider assigned a hostname instead of IP.

### Step 5: Update Configuration

**Update your email in `cert-manager/cluster-issuer.yaml`:**
```yaml
email: your-actual-email@gmail.com  # For certificate expiry notifications
```

**Update MongoDB credentials in `secrets/mongodb-secret.yaml`** (for production):
```bash
# Generate base64 encoded values
echo -n 'your-secure-username' | base64
echo -n 'your-secure-password' | base64
```

### Step 6: Deploy the Application

```bash
# Navigate to k8s directory
cd k8s

# Create namespace first
kubectl apply -f namespace.yaml

# Apply cert-manager ClusterIssuer
kubectl apply -f cert-manager/cluster-issuer.yaml

# Deploy all resources using Kustomize
kubectl apply -k .

# Or apply individually in order
kubectl apply -f secrets/
kubectl apply -f configmaps/
kubectl apply -f mongodb/
kubectl apply -f backend/
kubectl apply -f frontend/
kubectl apply -f ingress/
```

### Step 7: Verify Deployment

```bash
# Check all resources in portfolio namespace
kubectl get all -n portfolio

# Watch pods come up
kubectl get pods -n portfolio -w

# Check services
kubectl get svc -n portfolio

# Check ingress and TLS certificate
kubectl get ingress -n portfolio
kubectl get certificate -n portfolio

# Check cert-manager logs if certificate is not ready
kubectl logs -n cert-manager -l app=cert-manager
```

### Step 8: Verify TLS Certificate

```bash
# Check certificate status
kubectl describe certificate portfolio-tls -n portfolio

# Check certificate secret
kubectl get secret portfolio-tls -n portfolio
```

The certificate should show `Ready: True` within 2-5 minutes.

---

## Accessing the Application

Once deployed, access your application at:

- **HTTPS**: https://shrinidhi.space
- **WWW**: https://www.shrinidhi.space (redirects to main domain)

---

## Useful Commands

### Logs

```bash
# Frontend logs
kubectl logs -f deployment/frontend -n portfolio

# Backend logs
kubectl logs -f deployment/backend -n portfolio

# MongoDB logs
kubectl logs -f statefulset/mongodb -n portfolio

# All pods logs
kubectl logs -l app.kubernetes.io/part-of=portfolio -n portfolio
```

### Scaling

```bash
# Manual scaling
kubectl scale deployment frontend --replicas=3 -n portfolio
kubectl scale deployment backend --replicas=5 -n portfolio

# Check HPA status
kubectl get hpa -n portfolio

# Describe HPA for details
kubectl describe hpa backend-hpa -n portfolio
```

### Debugging

```bash
# Describe pods for events
kubectl describe pod <pod-name> -n portfolio

# Execute shell in a pod
kubectl exec -it deployment/backend -n portfolio -- sh

# Check endpoints
kubectl get endpoints -n portfolio

# Test internal DNS
kubectl run -it --rm debug --image=busybox --restart=Never -n portfolio -- nslookup backend-service
```

### Updates & Rollouts

```bash
# Update image
kubectl set image deployment/frontend frontend=shrinidhiupadhyaya/portfolio-react-frontend:v2 -n portfolio

# Restart deployment (pull latest image)
kubectl rollout restart deployment/frontend -n portfolio
kubectl rollout restart deployment/backend -n portfolio

# Check rollout status
kubectl rollout status deployment/frontend -n portfolio

# Rollback if needed
kubectl rollout undo deployment/frontend -n portfolio
```

### Cleanup

```bash
# Delete all resources
kubectl delete -k .

# Or delete namespace (removes everything)
kubectl delete namespace portfolio
```

---

## Troubleshooting

### Certificate Not Issued

```bash
# Check certificate status
kubectl describe certificate portfolio-tls -n portfolio

# Check cert-manager logs
kubectl logs -n cert-manager -l app=cert-manager

# Check challenges
kubectl get challenges -n portfolio
```

Common issues:
- DNS not propagated yet (wait 5-10 minutes)
- Ingress controller not accessible from internet
- Rate limited by Let's Encrypt (use staging issuer for testing)

### Pods Not Starting

```bash
# Check pod events
kubectl describe pod <pod-name> -n portfolio

# Check if images can be pulled
kubectl get events -n portfolio --sort-by='.lastTimestamp'
```

### 502 Bad Gateway

```bash
# Check if backend pods are running
kubectl get pods -n portfolio -l app.kubernetes.io/name=backend

# Check backend service endpoints
kubectl get endpoints backend-service -n portfolio

# Check backend logs
kubectl logs -f deployment/backend -n portfolio
```

### MongoDB Connection Issues

```bash
# Check MongoDB pod
kubectl get pods -n portfolio -l app.kubernetes.io/name=mongodb

# Check MongoDB logs
kubectl logs statefulset/mongodb -n portfolio

# Test connection from backend
kubectl exec -it deployment/backend -n portfolio -- sh
# Inside pod: nc -zv mongodb-service 27017
```

---

## Production Checklist

- [ ] Update MongoDB credentials in `secrets/mongodb-secret.yaml`
- [ ] Update email in `cert-manager/cluster-issuer.yaml`
- [ ] Enable Network Policies (uncomment in `kustomization.yaml`)
- [ ] Configure resource limits based on actual usage
- [ ] Set up monitoring (Prometheus/Grafana)
- [ ] Configure log aggregation (ELK/Loki)
- [ ] Set up backup for MongoDB PVC
- [ ] Configure Pod Disruption Budgets for HA
- [ ] Review and adjust HPA thresholds

---

## Resource Summary

| Component | Replicas | CPU Request | Memory Request | CPU Limit | Memory Limit |
|-----------|----------|-------------|----------------|-----------|--------------|
| Frontend  | 2        | 50m         | 64Mi           | 100m      | 128Mi        |
| Backend   | 2-10     | 100m        | 128Mi          | 300m      | 256Mi        |
| MongoDB   | 1        | 250m        | 256Mi          | 500m      | 512Mi        |

**Total Minimum**: ~400m CPU, ~450Mi Memory
**Total Maximum**: ~1.6 CPU, ~1.5Gi Memory (with max backend replicas)
