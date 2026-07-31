import type { GraphNodeData, GraphEdgeData } from "@/types";

export const graphNodes: GraphNodeData[] = [
  // Central user node
  { id: "user", label: "Alex Sharma", type: "user", description: "You — the center of your opportunity universe", color: "#2563EB" },

  // Skills
  { id: "skill-react", label: "React", type: "skill", description: "Advanced • Frontend", color: "#7C3AED" },
  { id: "skill-nextjs", label: "Next.js", type: "skill", description: "Advanced • Frontend", color: "#7C3AED" },
  { id: "skill-python", label: "Python", type: "skill", description: "Intermediate • Backend", color: "#7C3AED" },
  { id: "skill-nodejs", label: "Node.js", type: "skill", description: "Intermediate • Backend", color: "#7C3AED" },
  { id: "skill-ml", label: "Machine Learning", type: "skill", description: "Beginner • AI/ML", color: "#7C3AED" },
  { id: "skill-docker", label: "Docker", type: "skill", description: "Beginner • DevOps", color: "#7C3AED" },

  // Jobs
  { id: "job-grab", label: "Grab SG", type: "job", description: "91% Match • SGD 6-9K", color: "#22C55E", match: 91 },
  { id: "job-sea", label: "Sea Group", type: "job", description: "87% Match • SGD 5.5-8K", color: "#22C55E", match: 87 },
  { id: "job-govtech", label: "GovTech SG", type: "job", description: "74% Match • SGD 4.5-6.5K", color: "#22C55E", match: 74 },
  { id: "job-razorpay", label: "Razorpay", type: "job", description: "85% Match • ₹18-28L", color: "#22C55E", match: 85 },

  // Scholarships
  { id: "sch-aicte", label: "AICTE Scholarship", type: "scholarship", description: "88% Match • ₹50K", color: "#F59E0B", match: 88 },
  { id: "sch-google", label: "Google Gen Scholarship", type: "scholarship", description: "82% Match • $1K USD", color: "#F59E0B", match: 82 },
  { id: "sch-ntu", label: "NTU ASEAN Award", type: "scholarship", description: "58% Match • SGD 57K", color: "#F59E0B", match: 58 },

  // Schemes
  { id: "scheme-pmi", label: "PM Internship", type: "scheme", description: "Eligible • ₹66K/year", color: "#06B6D4" },
  { id: "scheme-skill", label: "Skill India Digital", type: "scheme", description: "Eligible • Free Courses", color: "#06B6D4" },
  { id: "scheme-sf", label: "SkillsFuture SG", type: "scheme", description: "Post-Relocation • SGD 500", color: "#06B6D4" },

  // Courses
  { id: "course-aws", label: "AWS Cert", type: "course", description: "96% relevance • 8 weeks", color: "#A78BFA" },
  { id: "course-ml", label: "ML Specialization", type: "course", description: "88% relevance • 12 weeks", color: "#A78BFA" },
  { id: "course-docker", label: "Docker & K8s", type: "course", description: "82% relevance • 4 weeks", color: "#A78BFA" },

  // Global
  { id: "global-sg", label: "Singapore 🇸🇬", type: "global", description: "71% Ready • 6 months to go", color: "#EF4444" },

  // Finance
  { id: "finance-savings", label: "Savings Plan", type: "finance", description: "₹8L target in 8 months", color: "#22C55E" },
];

export const graphEdges: GraphEdgeData[] = [
  // User to skills
  { id: "e-u-react", source: "user", target: "skill-react", animated: true },
  { id: "e-u-nextjs", source: "user", target: "skill-nextjs", animated: true },
  { id: "e-u-python", source: "user", target: "skill-python" },
  { id: "e-u-nodejs", source: "user", target: "skill-nodejs" },
  { id: "e-u-ml", source: "user", target: "skill-ml" },
  { id: "e-u-docker", source: "user", target: "skill-docker" },

  // Skills to jobs
  { id: "e-react-grab", source: "skill-react", target: "job-grab", label: "key skill" },
  { id: "e-nextjs-sea", source: "skill-nextjs", target: "job-sea", label: "key skill" },
  { id: "e-python-govtech", source: "skill-python", target: "job-govtech" },
  { id: "e-react-razorpay", source: "skill-react", target: "job-razorpay" },
  { id: "e-ml-govtech", source: "skill-ml", target: "job-govtech" },

  // Skills to scholarships
  { id: "e-u-aicte", source: "user", target: "sch-aicte" },
  { id: "e-u-google", source: "user", target: "sch-google" },
  { id: "e-sg-ntu", source: "global-sg", target: "sch-ntu" },

  // Courses boost jobs
  { id: "e-aws-grab", source: "course-aws", target: "job-grab", label: "unlocks +" },
  { id: "e-aws-govtech", source: "course-aws", target: "job-govtech", label: "unlocks +" },
  { id: "e-ml-govtech2", source: "course-ml", target: "job-govtech", label: "unlocks +" },
  { id: "e-docker-grab", source: "course-docker", target: "job-grab" },

  // User to schemes
  { id: "e-u-pmi", source: "user", target: "scheme-pmi" },
  { id: "e-u-skill", source: "user", target: "scheme-skill" },
  { id: "e-sg-sf", source: "global-sg", target: "scheme-sf" },

  // Jobs to Singapore
  { id: "e-grab-sg", source: "job-grab", target: "global-sg", animated: true },
  { id: "e-sea-sg", source: "job-sea", target: "global-sg", animated: true },
  { id: "e-govtech-sg", source: "job-govtech", target: "global-sg" },

  // Finance to Singapore
  { id: "e-fin-sg", source: "finance-savings", target: "global-sg" },
  { id: "e-u-fin", source: "user", target: "finance-savings" },
];
