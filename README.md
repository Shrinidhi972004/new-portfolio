# DevOps Portfolio - React + TypeScript + Node.js

A production-ready portfolio website built with modern tech stack, featuring a terminal-style interface with animations, a contact form backend, and Docker support.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Hook Form + Zod** - Form validation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB + Mongoose** - Database
- **Nodemailer** - Email notifications
- **Helmet** - Security headers
- **Rate Limiting** - API protection

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy & static serving
- **Health checks** - Kubernetes-ready endpoints

## 📁 Project Structure

```
portfolio-react/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── data/              # Static data
│   ├── services/          # API services
│   ├── store/             # Zustand stores
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── backend/               # Backend source
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── index.ts       # Server entry
│   ├── Dockerfile         # Production Dockerfile
│   └── package.json
├── docker-compose.yml     # Production compose
├── docker-compose.dev.yml # Development compose
├── Dockerfile             # Frontend production
├── nginx.conf             # Nginx configuration
└── package.json
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (local or Docker)
- Docker & Docker Compose (optional)

### Local Development

1. **Clone and install dependencies:**
```bash
cd portfolio-react

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

2. **Set up environment variables:**
```bash
# Frontend
cp .env.example .env

# Backend
cp backend/.env.example backend/.env
```

3. **Start MongoDB** (if not using Docker):
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7

# Or install locally and start the service
```

4. **Start development servers:**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend && npm run dev
```

5. **Open browser:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Docker Development

```bash
# Start all services with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Access:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:5000
# - MongoDB: localhost:27017
```

### Production Deployment

```bash
# Build and start production containers
docker-compose up --build -d

# Access:
# - Application: http://localhost
# - Backend API: http://localhost/api
# - MongoDB Admin: http://localhost:8081
```

## 📡 API Endpoints

### Health
- `GET /api/health` - System health check
- `GET /api/health/ready` - Kubernetes readiness probe
- `GET /api/health/live` - Kubernetes liveness probe

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - List messages (needs auth in production)
- `PATCH /api/contact/:id/read` - Mark as read
- `DELETE /api/contact/:id` - Delete message

## 🎨 Features

- **Terminal Animation** - Boot sequence simulation
- **Custom Cursor** - Crosshair cursor with hover effects
- **Theme Toggle** - Dark/Light mode with persistence
- **Sound Effects** - Optional UI sounds
- **Smooth Scrolling** - Navigation with animations
- **Intersection Observer** - Scroll-triggered animations
- **Counter Animation** - Animated statistics
- **Bento Grid** - Skills section layout
- **Form Validation** - Client & server-side validation
- **Rate Limiting** - API protection
- **Email Notifications** - Contact form alerts
- **Responsive Design** - Mobile-first approach

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=DevOps Portfolio
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
CORS_ORIGIN=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_TO=hello@shrinidhi.dev
```

## 🚢 Deployment Options

### Docker (Recommended)
Use the provided `docker-compose.yml` for easy deployment.

### Kubernetes
The backend includes health check endpoints for K8s probes:
- Readiness: `/api/health/ready`
- Liveness: `/api/health/live`

### Vercel (Frontend) + Railway/Render (Backend)
1. Deploy frontend to Vercel
2. Deploy backend to Railway/Render
3. Update `VITE_API_URL` to point to deployed backend

### Traditional VPS
1. Build frontend: `npm run build`
2. Build backend: `cd backend && npm run build`
3. Use Nginx as reverse proxy
4. Use PM2 for process management

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 👨‍💻 Author

**Shrinidhi** - DevOps Engineer

---

Built with 💚 using React, TypeScript & Node.js
