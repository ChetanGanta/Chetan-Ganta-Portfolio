import { Project, Skill, BlogPost, Testimonial } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'snackdev',
    title: 'SnackDev',
    description: 'A revolutionary development environment built using VibeCoding principles for rapid prototyping and deployment.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    tags: ['VibeCoding', 'React', 'Tailwind', 'Vite'],
    link: 'https://snackdev.base44.app',
    github: 'https://github.com/ChetanGanta',
    caseStudy: {
      problem: "Traditional development environments are often slow to set up and heavy on resources, making rapid prototyping and 'vibing' through code difficult for solo developers.",
      solution: "Built a browser-based, lightweight IDE that leverages Vite for instant HMR and a custom AI-assisted workflow that allows developers to describe features in natural language.",
      outcome: "Reduced setup time from minutes to seconds. Users report a 3x increase in prototyping speed and a more intuitive, flow-state development experience."
    }
  },
  {
    id: '1',
    title: 'CloudScale Infrastructure',
    description: 'A high-availability kubernetes cluster automation tool with custom monitoring dashboards.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    tags: ['Go', 'Kubernetes', 'AWS', 'Terraform'],
    github: '#',
    caseStudy: {
      problem: "Managing complex K8s multi-region deployments manually was error-prone and led to significant downtime during scaling events.",
      solution: "Developed a custom operator in Go that automates the deployment lifecycle and a Terraform-based infrastructure-as-code strategy for reproducible environments.",
      outcome: "Achieved 99.99% uptime across all production clusters and reduced manual intervention by 85%."
    }
  },
  {
    id: '2',
    title: 'Fintech Flow App',
    description: 'Real-time expense tracking and budget analytics with encrypted cloud sync.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    link: '#',
    github: '#',
    caseStudy: {
      problem: "Users often find budgeting apps too complex to maintain, often leading to abandonment after just a few weeks of use.",
      solution: "Implemented an 'invisible' expense tracking system using OCR for receipts and direct bank API integrations, focusing on a minimalist UI.",
      outcome: "Increased user retention by 40% after the first month and helped users save an average of $200 per month through automated insights."
    }
  },
  {
    id: '3',
    title: 'Neural Network Visualizer',
    description: 'Interactive playground for visualizing deep learning weights and activations in real-time.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200',
    tags: ['TypeScript', 'Three.js', 'TensorFlow.js'],
    link: '#',
    caseStudy: {
      problem: "Understanding the internal state of deep neural networks is notoriously difficult, presenting a 'black box' problem for students and researchers.",
      solution: "Created a 3D visualization tool using Three.js that maps neural activations to spatial coordinates, allowing users to 'fly' through a live network.",
      outcome: "Adopted as a teaching tool in three major university CS programs, with students reporting a significant improvement in conceptual understanding."
    }
  }
];

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'PostgreSQL', level: 80, category: 'Backend' },
  { name: 'Python', level: 75, category: 'Backend' },
  { name: 'Docker', level: 85, category: 'DevOps' },
  { name: 'Kubernetes', level: 70, category: 'DevOps' },
  { name: 'AWS', level: 80, category: 'DevOps' },
  { name: 'Git', level: 95, category: 'Tools' },
  { name: 'Figma', level: 70, category: 'Tools' },
  { name: 'Vite', level: 90, category: 'Tools' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Optimizing React Performance for Massive Data Grids',
    excerpt: 'How we achieved 60fps scrolling with 10k+ rows using virtualization and memoization techniques.',
    date: 'Oct 12, 2023',
    readTime: '8 min read',
    image: 'https://picsum.photos/seed/post1/600/400'
  },
  {
    id: '2',
    title: 'Why I Switched from REST to GraphQL for Scalable APIs',
    excerpt: 'An in-depth comparison of data fetching strategies in modern microservices architectures.',
    date: 'Sep 24, 2023',
    readTime: '12 min read',
    image: 'https://picsum.photos/seed/post2/600/400'
  },
  {
    id: '3',
    title: 'The Future of WebAssembly in Enterprise Apps',
    excerpt: 'Exploring how Wasm is bridging the gap between native performance and web convenience.',
    date: 'Aug 15, 2023',
    readTime: '6 min read',
    image: 'https://picsum.photos/seed/post3/600/400'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'CTO',
    company: 'Nexus Stream',
    quote: 'Chetan delivered our core infrastructure 2 weeks ahead of schedule. Their attention to system resilience and performance is unmatched.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    role: 'Principal Engineer',
    company: 'CloudScale',
    quote: 'The cleanest TypeScript architecture I\'ve seen in a decade. Truly pushed the boundaries of what our frontend could handle.',
    avatar: 'https://i.pravatar.cc/150?u=marcus'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Product Lead',
    company: 'Fintech Flow',
    quote: 'Not just a developer, but a product thinker. They anticipated our scalability issues before they even became problems.',
    avatar: 'https://i.pravatar.cc/150?u=elena'
  }
];
