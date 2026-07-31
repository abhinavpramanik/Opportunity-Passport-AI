import type { Scholarship } from "@/types";

export const scholarships: Scholarship[] = [
  {
    id: "sch-001",
    name: "AICTE Pragati Scholarship",
    provider: "AICTE (Govt. of India)",
    amount: 50000,
    currency: "INR",
    deadline: "2026-08-31",
    eligibility: ["B.Tech student", "Family income < 8 LPA", "No active arrears"],
    match: 88,
    link: "#",
    category: "need-based",
    description:
      "Government scholarship for meritorious students pursuing technical education in India.",
    aiInsight:
      "You meet all eligibility criteria. Deadline in 1 month — apply now before it closes.",
  },
  {
    id: "sch-002",
    name: "SkillsFuture Study Award",
    provider: "SkillsFuture Singapore",
    amount: 5000,
    currency: "SGD",
    deadline: "2026-09-30",
    eligibility: ["Singapore PR or citizen", "Enrolled in approved course", "Under 40 years old"],
    match: 45,
    link: "#",
    category: "field-specific",
    description:
      "An award for individuals committed to deepening their skills in sectors like tech and engineering.",
    aiInsight: "Eligibility requires PR status. This becomes accessible once you move to Singapore.",
  },
  {
    id: "sch-003",
    name: "Google Generation Scholarship (APAC)",
    provider: "Google",
    amount: 1000,
    currency: "USD",
    deadline: "2026-10-15",
    eligibility: ["CS or related field", "Underrepresented background", "Strong academics (GPA > 8)"],
    match: 82,
    link: "#",
    category: "merit",
    description:
      "Google's scholarship program for students from underrepresented groups pursuing CS degrees.",
    aiInsight:
      "Your 8.7 GPA and CS background meet criteria. Write a strong community impact statement.",
  },
  {
    id: "sch-004",
    name: "Tata Capital Pankh Scholarship",
    provider: "Tata Capital",
    amount: 30000,
    currency: "INR",
    deadline: "2026-08-15",
    eligibility: ["Annual family income ≤ 2.5 LPA", "Enrolled in ITI/Diploma/B.Tech", "Class 12 score ≥ 60%"],
    match: 70,
    link: "#",
    category: "need-based",
    description:
      "Tata Capital's scholarship for deserving students from low-income families pursuing professional courses.",
    aiInsight: "Good match if income criteria are met. Apply before the August 15 deadline.",
  },
  {
    id: "sch-005",
    name: "NTU ASEAN Undergraduate Scholarship",
    provider: "Nanyang Technological University",
    amount: 57600,
    currency: "SGD",
    deadline: "2026-09-01",
    eligibility: ["ASEAN citizen", "Exceptional academic performance", "Applying for NTU Masters"],
    match: 58,
    link: "#",
    category: "country-specific",
    description:
      "Full scholarship for ASEAN students to pursue postgraduate studies at NTU Singapore.",
    aiInsight:
      "Consider this for higher studies. Your GPA of 8.7 is competitive. An NTU degree fast-tracks Singapore PR.",
  },
  {
    id: "sch-006",
    name: "PM Young Researcher Fellowship",
    provider: "Ministry of Education, India",
    amount: 70000,
    currency: "INR",
    deadline: "2026-11-30",
    eligibility: ["Final year B.Tech", "Published research paper OR top 5% of batch", "AI/ML domain preferred"],
    match: 72,
    link: "#",
    category: "merit",
    description:
      "Fellowship for top final-year engineering students to pursue research in emerging technologies.",
    aiInsight:
      "Publish one AI/ML project on arXiv to boost your eligibility. This unlocks research experience for Singapore jobs.",
  },
];
