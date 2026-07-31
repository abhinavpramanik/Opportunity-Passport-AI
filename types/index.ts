// ============================================================
// ALL TYPESCRIPT INTERFACES FOR OPPORTUNITY PASSPORT AI
// ============================================================

// --- User ---
export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: string;
}

export interface User {
  id: string;
  name: string;
  age: number;
  degree: string;
  university: string;
  gpa: number;
  skills: Skill[];
  goal: string;
  location: string;
  targetLocation: string;
  avatar: string;
  tagline: string;
  email: string;
  linkedIn: string;
  github: string;
}

// --- Passport Scores ---
export interface ScoreBreakdown {
  label: string;
  value: number;
}

export interface PassportScore {
  category: string;
  score: number;
  maxScore: number;
  label: string;
  description: string;
  trend: "up" | "down" | "stable";
  trendValue: number;
  color: string;
  breakdowns: ScoreBreakdown[];
}

export interface Passport {
  userId: string;
  generatedAt: string;
  overallScore: number;
  scores: PassportScore[];
  aiSummary: string;
  strengths: string[];
  gaps: string[];
  topRecommendation: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

// --- Jobs ---
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship" | "freelance";
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  match: number; // percentage 0-100
  skills: string[];
  description: string;
  postedAt: string;
  logo: string;
  tags: string[];
  isRemote: boolean;
  aiInsight: string;
}

// --- Scholarships ---
export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: number;
  currency: string;
  deadline: string;
  eligibility: string[];
  match: number;
  link: string;
  category: "merit" | "need-based" | "field-specific" | "country-specific";
  description: string;
  aiInsight: string;
}

// --- Government Schemes ---
export interface Scheme {
  id: string;
  name: string;
  ministry: string;
  country: "india" | "singapore" | "both";
  category: string;
  benefit: string;
  eligibility: string[];
  isEligible: boolean;
  missingCriteria: string[];
  amount?: string;
  link: string;
  description: string;
  icon: string;
  tags: string[];
}

// --- Finance ---
export interface FinanceCategory {
  label: string;
  current: number;
  recommended: number;
  currency: string;
}

export interface Investment {
  type: string;
  allocation: number;
  expectedReturn: number;
  risk: "low" | "medium" | "high";
  description: string;
}

export interface FinanceData {
  monthlySalary: number;
  currency: string;
  savings: number;
  savingsRate: number;
  emergencyFund: {
    current: number;
    recommended: number;
    months: number;
  };
  categories: FinanceCategory[];
  investments: Investment[];
  creditScore: number;
  aiInsight: string;
  monthlyChart: { month: string; income: number; expenses: number; savings: number }[];
}

// --- Insurance ---
export interface InsurancePlan {
  id: string;
  type: "health" | "life" | "travel" | "professional";
  name: string;
  provider: string;
  coverage: string;
  premium: number;
  currency: string;
  period: string;
  recommended: boolean;
  match: number;
  benefits: string[];
  description: string;
  icon: string;
}

// --- AI Mentor ---
export interface MentorMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface MentorConversation {
  trigger: string;
  messages: MentorMessage[];
}

export interface MentorPersona {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialty: string;
  description: string;
  color: string;
  defaultConversations: MentorConversation[];
}

// --- Timeline ---
export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  type: "education" | "career" | "achievement" | "milestone" | "future";
  status: "completed" | "current" | "upcoming";
  icon: string;
  detail?: string;
}

// --- Notifications ---
export interface Notification {
  id: string;
  type: "job" | "scholarship" | "scheme" | "learning" | "finance" | "system";
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
  actionLabel?: string;
  actionLink?: string;
  icon?: string;
}

// --- Learning ---
export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  match: number;
  skills: string[];
  certificate: boolean;
  free: boolean;
  price?: number;
  currency?: string;
  url: string;
  description: string;
  category: string;
  icon: string;
  completionRate?: number;
}

export interface LearningRoadmap {
  title: string;
  description: string;
  steps: {
    step: number;
    title: string;
    courses: string[];
    duration: string;
    outcome: string;
  }[];
}

export interface FutureSkill {
  name: string;
  relevance: "critical" | "important" | "nice-to-have";
  demand: number;
  description: string;
}

// --- Global Mobility ---
export interface MobilityData {
  from: string;
  to: string;
  readinessScore: number;
  visaType: string;
  estimatedSalary: {
    min: number;
    max: number;
    currency: string;
  };
  currentSalaryINR: number;
  livingCostIndex: number;
  missingSkills: string[];
  recommendedCertifications: string[];
  timelineMonths: number;
  steps: {
    step: number;
    title: string;
    description: string;
    status: "done" | "in-progress" | "upcoming";
    duration: string;
  }[];
  costOfLiving: {
    category: string;
    amount: number;
    currency: string;
  }[];
  aiInsight: string;
}

// --- Opportunity Graph ---
export interface GraphNodeData {
  id: string;
  label: string;
  type: "user" | "skill" | "job" | "scholarship" | "scheme" | "course" | "global" | "finance";
  description?: string;
  match?: number;
  color: string;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

// --- Future Simulator ---
export interface SimulatorScenario {
  id: string;
  label: string;
  icon: string;
  description: string;
  impact: {
    salary: number;
    savings: number;
    careerGrowth: number;
    globalMobility: number;
    opportunityIndex: number;
  };
}

// --- AI Insights ---
export interface AIInsight {
  id: string;
  type: "opportunity" | "warning" | "tip" | "achievement";
  title: string;
  description: string;
  priority: number;
  icon: string;
}
