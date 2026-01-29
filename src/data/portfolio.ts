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
    title: 'Cloud-Native E-Commerce Platform',
    badges: {
      live: '99.9% Uptime',
      tech: 'Kubernetes',
    },
    architecture: {
      nodes: ['Ingress', 'Services', 'Pods', 'DB'],
      arrows: ['→', '→', '→'],
    },
    description:
      'Migrated monolithic application to microservices architecture on Kubernetes, reducing deployment time by 80% and improving scalability.',
    challenges: [
      'Zero-downtime deployments with blue-green strategy',
      'Auto-scaling based on custom metrics',
      'Secrets management with HashiCorp Vault',
    ],
    techStack: ['Terraform', 'EKS', 'ArgoCD', 'Prometheus'],
  },
  {
    id: 2,
    title: 'Enterprise CI/CD Pipeline',
    badges: {
      live: '500+ Builds/Day',
      tech: 'GitOps',
    },
    architecture: {
      nodes: ['Git', 'CI', 'Registry', 'Deploy'],
      arrows: ['→', '→', '→'],
    },
    description:
      'Designed and implemented a GitOps-based CI/CD pipeline supporting 50+ microservices with automated testing and security scanning.',
    challenges: [
      'Multi-environment promotion workflows',
      'Integrated security scanning (SAST/DAST)',
      'Automated rollback on failure detection',
    ],
    techStack: ['GitHub Actions', 'ArgoCD', 'Trivy', 'SonarQube'],
  },
  {
    id: 3,
    title: 'Infrastructure Cost Optimization',
    badges: {
      live: '60% Cost Reduction',
      tech: 'Multi-Cloud',
    },
    architecture: {
      nodes: ['AWS', 'Terraform', 'GCP'],
      arrows: ['↔', '↔'],
    },
    description:
      'Implemented multi-cloud strategy with automated resource scheduling, spot instance management, and right-sizing recommendations.',
    challenges: [
      'Automated spot instance failover',
      'Resource tagging and cost allocation',
      'Scheduled scaling for non-prod environments',
    ],
    techStack: ['Terraform', 'AWS', 'GCP', 'Infracost'],
  },
]

export const stats = [
  { value: 50, suffix: '+', label: 'Pipelines Built' },
  { value: 99.9, suffix: '%', label: 'Uptime Achieved' },
  { value: 5, suffix: '+', label: 'Years Experience' },
]

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/shrinidhi' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/shrinidhi' },
  { name: 'Email', url: 'mailto:hello@shrinidhi.dev' },
]

export const contactInfo = {
  status: 'Available for hire',
  location: 'Remote / Worldwide',
  responseTime: '< 24 hours',
  links: {
    github: 'github.com/shrinidhi',
    linkedin: 'linkedin.com/in/shrinidhi',
    email: 'hello@shrinidhi.dev',
  },
}
