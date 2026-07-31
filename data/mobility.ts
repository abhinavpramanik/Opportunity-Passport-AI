import type { MobilityData } from "@/types";

export const mobility: MobilityData = {
  from: "India",
  to: "Singapore",
  readinessScore: 71,
  visaType: "Employment Pass (EP)",
  estimatedSalary: {
    min: 5000,
    max: 7500,
    currency: "SGD",
  },
  currentSalaryINR: 45000,
  livingCostIndex: 78,
  missingSkills: ["Docker", "Kubernetes", "AWS (certification)", "System Design"],
  recommendedCertifications: [
    "AWS Solutions Architect Associate",
    "Google Cloud Professional",
    "CKA (Certified Kubernetes Administrator)",
  ],
  timelineMonths: 6,
  steps: [
    {
      step: 1,
      title: "Complete AWS Certification",
      description: "AWS Solutions Architect cert dramatically improves EP application prospects.",
      status: "in-progress",
      duration: "8 weeks",
    },
    {
      step: 2,
      title: "Apply to 20+ Singapore Roles",
      description: "Use LinkedIn, NodeFlair, and Glassdoor. Target Grab, Sea, GovTech, and startups.",
      status: "upcoming",
      duration: "4 weeks",
    },
    {
      step: 3,
      title: "Pass Interviews",
      description: "Complete DSA prep (150 LC) and 5 mock system design interviews.",
      status: "upcoming",
      duration: "6 weeks",
    },
    {
      step: 4,
      title: "Receive Job Offer ≥ SGD 5,000",
      description: "Employment Pass requires a minimum salary threshold set by MOM.",
      status: "upcoming",
      duration: "2 weeks",
    },
    {
      step: 5,
      title: "Employment Pass Application",
      description: "Employer applies for your EP via MOM's EP Online portal.",
      status: "upcoming",
      duration: "3 weeks",
    },
    {
      step: 6,
      title: "Relocate to Singapore 🎉",
      description: "Begin your Singapore career journey.",
      status: "upcoming",
      duration: "1 week",
    },
  ],
  costOfLiving: [
    { category: "Housing (Shared Room)", amount: 1200, currency: "SGD" },
    { category: "Food & Groceries", amount: 600, currency: "SGD" },
    { category: "Transportation (MRT/Bus)", amount: 150, currency: "SGD" },
    { category: "Phone & Internet", amount: 80, currency: "SGD" },
    { category: "Healthcare (basic)", amount: 100, currency: "SGD" },
    { category: "Entertainment", amount: 200, currency: "SGD" },
    { category: "Total Monthly Est.", amount: 2330, currency: "SGD" },
  ],
  aiInsight:
    "At SGD 5,500 salary, you'd take home ~SGD 4,675 after CPF (new EP holders don't pay CPF initially). After expenses of ~SGD 2,330, you save SGD 2,345/month — significantly more than your current savings. Singapore's Employment Pass has a 6-month validity — land your job, and you're set.",
};
