import { Project, Skill } from '../types'

export const terminalLines = [
  { type: 'command', text: '$ ./system_diagnostics.sh', delay: 0 },
  { type: 'output', text: '[INFO] Initializing system check...', delay: 300 },
  { type: 'output', text: '[INFO] Loading kernel modules...', delay: 200 },
  { type: 'success', text: '[OK] CPU: Online (8 cores @ 3.6GHz)', delay: 250 },
  { type: 'success', text: '[OK] Memory: 32GB DDR4 Available', delay: 200 },
  { type: 'success', text: '[OK] Storage: 1TB NVMe Mounted', delay: 200 },
  { type: 'success', text: '[OK] Network: Connected (1Gbps)', delay: 200 },
  { type: 'output', text: '[INFO] Running security audit...', delay: 300 },
  { type: 'success', text: '[OK] Firewall: Active', delay: 150 },
  { type: 'success', text: '[OK] SSL Certificates: Valid', delay: 150 },
  { type: 'output', text: '[INFO] Checking container status...', delay: 250 },
  { type: 'success', text: '[OK] Docker: Running (47 containers)', delay: 200 },
  { type: 'success', text: '[OK] Kubernetes: Healthy (12 pods)', delay: 200 },
  { type: 'output', text: '', delay: 100 },
  { type: 'success', text: '═══════════════════════════════════════════', delay: 100 },
  { type: 'success', text: '  SYSTEM STATUS: ALL SYSTEMS OPERATIONAL  ', delay: 100 },
  { type: 'success', text: '═══════════════════════════════════════════', delay: 100 },
  { type: 'output', text: '', delay: 300 },
  { type: 'command', text: '$ whoami', delay: 500 },
  { type: 'output', text: 'Loading profile...', delay: 400 },
]

export const skills: Skill[] = [
  {
    id: 'cicd',
    icon: '⚙️',
    title: 'CI/CD',
    status: 'ACTIVE',
    tags: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'ArgoCD', 'Tekton', 'CircleCI'],
    size: 'large',
    metric: {
      value: '1000+',
      label: 'Deployments/Month',
    },
  },
  {
    id: 'iac',
    icon: '📦',
    title: 'Infrastructure as Code',
    status: 'ACTIVE',
    tags: ['Terraform', 'Ansible', 'Pulumi', 'CloudFormation', 'Helm'],
    size: 'medium',
  },
  {
    id: 'containers',
    icon: '🐳',
    title: 'Containers',
    tags: ['Docker', 'Kubernetes', 'Podman'],
    size: 'small',
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud Platforms',
    status: 'CONNECTED',
    tags: ['AWS', 'GCP', 'Azure', 'DigitalOcean'],
    size: 'medium',
    cloudBadges: [
      { name: 'AWS', type: 'aws' },
      { name: 'GCP', type: 'gcp' },
      { name: 'AZ', type: 'azure' },
    ],
  },
  {
    id: 'observability',
    icon: '📊',
    title: 'Observability',
    status: 'MONITORING',
    tags: ['Prometheus', 'Grafana', 'ELK Stack', 'Datadog', 'Jaeger', 'PagerDuty'],
    size: 'large',
    showChart: true,
  },
  {
    id: 'security',
    icon: '🔐',
    title: 'Security',
    tags: ['Vault', 'Trivy', 'SOPS'],
    size: 'small',
  },
  {
    id: 'scripting',
    icon: '💻',
    title: 'Scripting',
    tags: ['Bash', 'Python', 'Go'],
    size: 'small',
  },
]

export const projects: Project[] = [
  {
    id: 1,
    title: 'Legal & Cyber Education Platform',
    badges: {
      live: 'AI-Powered',
      tech: '3D Games',
    },
    architecture: {
      nodes: ['React', 'Three.js', 'Node.js', 'SQLite'],
      arrows: ['→', '→', '→'],
    },
    description:
      'An interactive, gamified learning platform teaching Digital Laws, Cyber Ethics, and Legislation through immersive 3D games with 50+ progressive levels.',
    challenges: [
      'Built 4 interactive games: Phishing Detective, Cyber Judge, Legislation Architect',
      '3D environments with React Three Fiber and Three.js',
      'JWT authentication with XP tracking, badges, and leaderboards',
    ],
    techStack: ['React', 'TypeScript', 'Three.js', 'Node.js', 'SQLite', 'Tailwind CSS'],
    github: 'https://github.com/Shrinidhi972004/majorproject',
  },
  {
    id: 2,
    title: 'Construction Site Safety AI System',
    badges: {
      live: '99.9% Uptime',
      tech: 'YOLOv8',
    },
    architecture: {
      nodes: ['Camera', 'YOLOv8', 'FastAPI', 'K8s'],
      arrows: ['→', '→', '→'],
    },
    description:
      'Real-time safety monitoring system using computer vision and YOLOv8 for PPE detection, zone monitoring, and emergency alerting on construction sites.',
    challenges: [
      'Real-time PPE detection with custom-trained YOLOv8 model',
      'Kubernetes deployment with HPA, SSL, and Prometheus/Grafana monitoring',
      'Twilio integration for automated emergency calling',
    ],
    techStack: ['Python', 'FastAPI', 'YOLOv8', 'React', 'Docker', 'Kubernetes', 'Prometheus'],
    github: 'https://github.com/Shrinidhi972004/DevHost-2025-CodeMartials',
  },
  {
    id: 3,
    title: 'Passwordless Authentication System',
    badges: {
      live: 'FIDO2/WebAuthn',
      tech: 'Zero Password',
    },
    architecture: {
      nodes: ['Browser', 'Express', 'MongoDB', 'FIDO2'],
      arrows: ['→', '→', '→'],
    },
    description:
      'Modern diary application eliminating passwords entirely using FIDO2/WebAuthn technology with biometric authentication and hardware security keys.',
    challenges: [
      'FIDO2 compliance with biometric and hardware key support',
      'Kubernetes deployment with automated cloud detection scripts',
      'Multi-cloud deployment support (AWS, GCP, Azure)',
    ],
    techStack: ['Node.js', 'Express', 'MongoDB', 'WebAuthn', 'Docker', 'Kubernetes'],
    github: 'https://github.com/Shrinidhi972004/passwordless-password-authentication-system',
  },
  {
    id: 4,
    title: 'Cloud Media Gallery',
    badges: {
      live: 'Production Ready',
      tech: 'AWS S3',
    },
    architecture: {
      nodes: ['React', 'Express', 'MongoDB', 'S3'],
      arrows: ['→', '→', '→'],
    },
    description:
      'Cloud-based media gallery with MERN stack and AWS S3 for secure image/video upload, folder organization, and responsive media management.',
    challenges: [
      'AWS S3 integration with secure file uploads and management',
      'Security hardened with Helmet, rate limiting, and input validation',
      'Docker multi-stage builds with Nginx reverse proxy',
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'Docker', 'Nginx'],
    github: 'https://github.com/Shrinidhi972004/Image-and-video-gallery-using-aws-s3-',
  },
  {
    id: 5,
    title: 'Placement Notification Bot',
    badges: {
      live: '<10s Latency',
      tech: 'Real-time',
    },
    architecture: {
      nodes: ['Email', 'Python', 'Docker', 'Notify'],
      arrows: ['→', '→', '→'],
    },
    description:
      'Automated notification bot that monitors placement officer emails and instantly notifies students with less than 10 seconds latency.',
    challenges: [
      'Real-time email monitoring with sub-10 second latency',
      'Dockerized deployment for reliable 24/7 operation',
      'Instant push notifications to students',
    ],
    techStack: ['Python', 'Docker', 'IMAP', 'Push Notifications'],
    github: 'https://github.com/Shrinidhi972004/placements-updates-notification-bot',
  },
]

export const stats = [
  { value: 50, suffix: '+', label: 'Pipelines Built' },
  { value: 99.9, suffix: '%', label: 'Uptime Achieved' },
  { value: 5, suffix: '+', label: 'Years Experience' },
]

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Shrinidhi972004' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/shrinidhi' },
  { name: 'Email', url: 'mailto:shrinidhiupadhyaya00@gmail.com' },
]

export const contactInfo = {
  status: 'Available for hire',
  location: 'Remote / Worldwide',
  responseTime: '< 24 hours',
  links: {
    github: 'github.com/Shrinidhi972004',
    linkedin: 'linkedin.com/in/shrinidhi',
    email: 'shrinidhiupadhyaya00@gmail.com',
  },
}
