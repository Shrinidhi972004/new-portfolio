# DevOps Portfolio

[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://hub.docker.com/u/shrinidhiupadhyaya)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes&logoColor=white)](./k8s)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A production-ready DevOps portfolio website featuring a terminal-style interface with animations, contact form backend, and complete Docker + Kubernetes deployment configurations.

**Live Site**: [https://shrinidhi.space](https://shrinidhi.space)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              shrinidhi.space                                 │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Nginx Ingress Controller                             │
│                         (TLS Termination / SSL)                              │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Frontend                                        │
│                    (Nginx + React Static Files)                              │
│                                                                              │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                     │
│   │   Pod 1     │    │   Pod 2     │    │   Pod N     │                     │
│   │   Nginx     │    │   Nginx     │    │   Nginx     │                     │
│   └─────────────┘    └─────────────┘    └─────────────┘                     │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │ /api/*
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Backend                                         │
│                    (Node.js + Express API)                                   │
│                                                                              │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                     │
│   │   Pod 1     │    │   Pod 2     │    │   Pod N     │   ◄── HPA (2-10)    │
│   │   Node.js   │    │   Node.js   │    │   Node.js   │                     │
│   └─────────────┘    └─────────────┘    └─────────────┘                     │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MongoDB                                         │
│                         (StatefulSet + PVC)                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS, Framer Motion, Zustand |
| **Backend** | Node.js, Express, TypeScript, Mongoose, Nodemailer |
| **Database** | MongoDB 7 |
| **Containerization** | Docker, Docker Compose |
| **Orchestration** | Kubernetes, Kustomize |
| **Ingress** | Nginx Ingress Controller |
| **TLS/SSL** | Cert-Manager + Let's Encrypt |
| **CI/CD** | GitHub Actions (optional) |

---

## 📁 Project Structure

```
portfolio-react/
├── src/                          # Frontend React source
│   ├── components/               # React components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── Scanlines.tsx
│   │   └── Skills.tsx
│   ├── data/                     # Static portfolio data
│   ├── services/                 # API client
│   ├── store/                    # Zustand state management
│   ├── types/                    # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── backend/                      # Backend Node.js source
│   ├── src/
│   │   ├── config/               # Database configuration
│   │   ├── middleware/           # Express middleware
│   │   ├── models/               # Mongoose models
│   │   ├── routes/               # API routes
│   │   ├── services/             # Business logic
│   │   └── index.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── k8s/                          # Kubernetes manifests
│   ├── namespace.yaml
│   ├── kustomization.yaml
│   ├── network-policy.yaml
│   ├── cert-manager/
│   ├── configmaps/
│   ├── secrets/
│   ├── mongodb/
│   ├── backend/
│   ├── frontend/
│   ├── ingress/
│   └── README.md
├── public/                       # Static assets
├── docker-compose.yml            # Production Docker Compose
├── Dockerfile                    # Frontend Dockerfile
├── nginx.conf                    # Nginx reverse proxy config
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- kubectl (for Kubernetes deployment)

### Option 1: Docker Compose (Recommended for Local)

```bash
# Clone the repository
git clone https://github.com/shrinidhiupadhyaya/portfolio-react.git
cd portfolio-react

# Start all services
docker compose up --build -d

# Access the application
open http://localhost:8080
```

**Services:**
| Service | URL |
|---------|-----|
| Frontend | http://localhost:8080 |
| Backend API | http://localhost:8080/api |
| MongoDB | localhost:27017 (internal) |

### Option 2: Local Development

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Start MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:7

# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend && npm run dev
```

### Option 3: Kubernetes Deployment

See [Kubernetes Deployment](#-kubernetes-deployment) section below.

---

## 📡 API Endpoints

### Health Checks
| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | System health status |
| `GET /api/health/ready` | Kubernetes readiness probe |
| `GET /api/health/live` | Kubernetes liveness probe |

### Contact Form
| Endpoint | Description |
|----------|-------------|
| `POST /api/contact` | Submit contact form |
| `GET /api/contact` | List messages |
| `PATCH /api/contact/:id/read` | Mark as read |
| `DELETE /api/contact/:id` | Delete message |

---

## 🎨 Features

- **Terminal Boot Animation** - Simulated boot sequence
- **Custom Crosshair Cursor** - Interactive cursor with hover effects
- **Dark/Light Theme** - Toggle with localStorage persistence
- **Sound Effects** - Optional retro UI sounds
- **Smooth Scroll Navigation** - Animated section transitions
- **Scroll-triggered Animations** - Intersection Observer powered
- **Animated Statistics** - Counter animations
- **Bento Grid Layout** - Modern skills section
- **Form Validation** - Zod + React Hook Form
- **Rate Limiting** - API protection
- **Email Notifications** - Contact form alerts via Nodemailer
- **Responsive Design** - Mobile-first approach
- **Scanlines Effect** - Retro CRT aesthetic

---

## 🐳 Docker

### Build Images

```bash
# Build frontend
docker build -t shrinidhiupadhyaya/portfolio-react-frontend:latest .

# Build backend
docker build -t shrinidhiupadhyaya/portfolio-react-backend:latest ./backend
```

### Push to Docker Hub

```bash
docker login
docker push shrinidhiupadhyaya/portfolio-react-frontend:latest
docker push shrinidhiupadhyaya/portfolio-react-backend:latest
```

### Docker Compose Commands

```bash
# Start services
docker compose up -d

# Rebuild and start
docker compose up --build -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v
```

---

## ☸️ Kubernetes Deployment

### Prerequisites

1. **Kubernetes cluster** (GKE, EKS, AKS, DigitalOcean, etc.)
2. **kubectl** configured with cluster access
3. **Nginx Ingress Controller** installed
4. **Cert-Manager** installed (for TLS)
5. **DNS** configured to point to Ingress IP

### Quick Deploy

```bash
# Navigate to k8s directory
cd k8s

# Install Nginx Ingress Controller
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx --create-namespace

# Install Cert-Manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.0/cert-manager.yaml

# Update email in cert-manager/cluster-issuer.yaml
# Update MongoDB credentials in secrets/mongodb-secret.yaml

# Deploy everything
kubectl apply -f namespace.yaml
kubectl apply -f cert-manager/
kubectl apply -k .

# Verify deployment
kubectl get all -n portfolio
kubectl get ingress -n portfolio
kubectl get certificate -n portfolio
```

### Kubernetes Resources

| Resource | Type | Replicas | Description |
|----------|------|----------|-------------|
| frontend | Deployment | 2 | Nginx + React static files |
| backend | Deployment | 2-10 | Node.js API with HPA |
| mongodb | StatefulSet | 1 | MongoDB with PVC |
| frontend-service | ClusterIP | - | Internal frontend service |
| backend-service | ClusterIP | - | Internal backend service |
| mongodb-service | Headless | - | StatefulSet DNS |
| portfolio-ingress | Ingress | - | TLS ingress for shrinidhi.space |

### Useful Commands

```bash
# Check pod status
kubectl get pods -n portfolio -w

# View logs
kubectl logs -f deployment/frontend -n portfolio
kubectl logs -f deployment/backend -n portfolio

# Scale deployment
kubectl scale deployment backend --replicas=5 -n portfolio

# Restart deployment
kubectl rollout restart deployment/frontend -n portfolio

# Check HPA
kubectl get hpa -n portfolio

# Port forward for local testing
kubectl port-forward svc/frontend-service 8080:80 -n portfolio

# Delete everything
kubectl delete -k .
```

For detailed Kubernetes deployment instructions, see [k8s/README.md](./k8s/README.md).

---

## 🔧 Environment Variables

### Frontend

```env
VITE_API_URL=/api
```

### Backend

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://mongo:27017/portfolio
CORS_ORIGIN=https://shrinidhi.space
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_TO=contact@shrinidhi.space
```

---

## 📊 Resource Requirements

| Component | CPU Request | Memory Request | CPU Limit | Memory Limit |
|-----------|-------------|----------------|-----------|--------------|
| Frontend | 50m | 64Mi | 100m | 128Mi |
| Backend | 100m | 128Mi | 300m | 256Mi |
| MongoDB | 250m | 256Mi | 500m | 512Mi |

**Minimum Total**: ~400m CPU, ~450Mi Memory

---

## 🔒 Security Features

- **TLS/SSL** - Let's Encrypt certificates via Cert-Manager
- **Security Headers** - X-Frame-Options, X-Content-Type-Options, CSP
- **Rate Limiting** - API request limiting
- **Helmet.js** - Express security middleware
- **Network Policies** - Pod-to-pod traffic restriction (optional)
- **Non-root Containers** - Security context in Kubernetes
- **Secrets Management** - Kubernetes secrets for credentials

---

## 📝 License

MIT License - feel free to use this for your own portfolio!

---

## 👨‍💻 Author

**Shrinidhi Upadhyaya** - DevOps Engineer

- Website: [shrinidhi.space](https://shrinidhi.space)
- GitHub: [@shrinidhiupadhyaya](https://github.com/shrinidhiupadhyaya)
- Docker Hub: [shrinidhiupadhyaya](https://hub.docker.com/u/shrinidhiupadhyaya)

---

<p align="center">
  Built with 💚 using React, TypeScript, Node.js, Docker & Kubernetes
</p>
