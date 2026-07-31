import type { MentorPersona } from "@/types";

export const mentors: MentorPersona[] = [
  {
    id: "mentor-001",
    name: "Aria Chen",
    title: "Senior Technical Recruiter",
    avatar: "AC",
    specialty: "Tech Hiring & Resume Optimization",
    description:
      "12 years recruiting engineers for Grab, Google, and Meta. I know exactly what interviewers look for.",
    color: "#2563EB",
    defaultConversations: [
      {
        trigger: "How should I improve my resume?",
        messages: [
          { id: "m1", role: "user", content: "How should I improve my resume?", timestamp: "" },
          {
            id: "m2",
            role: "assistant",
            content:
              "Great question, Alex! Based on your profile, here are the top 3 changes that will double your callback rate:\n\n**1. Quantify your impact.** Instead of 'Built React components', say 'Built React components that reduced page load time by 40% for 10,000+ daily users.'\n\n**2. Add a Projects section** highlighting 2-3 projects with GitHub links. Singaporean recruiters look for this heavily.\n\n**3. Use a Singapore-optimized format** — 1 page, clean white space, include your LinkedIn prominently. ATS systems here scan for keywords like 'TypeScript', 'Node.js', and 'microservices'.",
            timestamp: "",
          },
        ],
      },
      {
        trigger: "What salary should I expect in Singapore?",
        messages: [
          {
            id: "m3",
            role: "user",
            content: "What salary should I expect in Singapore?",
            timestamp: "",
          },
          {
            id: "m4",
            role: "assistant",
            content:
              "For a fresh B.Tech graduate with your skillset going to Singapore in 2026:\n\n📊 **Market Benchmarks:**\n- Junior SE (0-1 yr): SGD 4,500 – 5,500/month\n- Mid SE (2-3 yrs): SGD 6,000 – 9,000/month\n\nWith your React + Next.js + TypeScript stack, **SGD 5,000–5,800** is realistic as a starting range at a startup, and **SGD 6,000–7,500** at a Grab/Sea-level company.\n\n💡 **Tip:** Don't reveal your INR salary. State your expected salary in SGD directly. Indian salary conversions can anchor you lower.",
            timestamp: "",
          },
        ],
      },
    ],
  },
  {
    id: "mentor-002",
    name: "Raj Mehta",
    title: "Principal Engineer @ Google Singapore",
    avatar: "RM",
    specialty: "Career Strategy & Technical Interviews",
    description:
      "Ex-Amazon, now at Google. I help engineers crack FAANG interviews and build long-term career strategies.",
    color: "#7C3AED",
    defaultConversations: [
      {
        trigger: "How do I crack a FAANG interview?",
        messages: [
          {
            id: "m5",
            role: "user",
            content: "How do I crack a FAANG interview?",
            timestamp: "",
          },
          {
            id: "m6",
            role: "assistant",
            content:
              "Alex, FAANG interviews are more predictable than people think. Here's the framework that worked for me:\n\n**Phase 1 — DSA Foundation (6 weeks)**\nSolve 150 LeetCode questions: 60 Easy, 70 Medium, 20 Hard. Focus on: Arrays, Strings, Trees, Graphs, DP.\n\n**Phase 2 — System Design (4 weeks)**\nLearn to design: URL shortener, Instagram, WhatsApp, Uber. Read 'Designing Data-Intensive Applications'.\n\n**Phase 3 — Behavioral (2 weeks)**\nPrepare 12 STAR stories. Amazon focuses on Leadership Principles. Google focuses on culture and impact.\n\n🎯 **Your edge:** Your Next.js projects demonstrate real product thinking. Lead with that.",
            timestamp: "",
          },
        ],
      },
    ],
  },
  {
    id: "mentor-003",
    name: "Priya Nair",
    title: "Financial Advisor | SEBI Registered",
    avatar: "PN",
    specialty: "Personal Finance & Wealth Building",
    description:
      "Helped 2,000+ young professionals build their first ₹10L portfolio. Finance expert for tech workers moving abroad.",
    color: "#22C55E",
    defaultConversations: [
      {
        trigger: "How should I manage money before moving to Singapore?",
        messages: [
          {
            id: "m7",
            role: "user",
            content: "How should I manage money before moving to Singapore?",
            timestamp: "",
          },
          {
            id: "m8",
            role: "assistant",
            content:
              "Alex, this is the most important financial question you can ask right now! Here's your 8-month Singapore Fund Plan:\n\n**Target: ₹8,00,000 buffer before you land**\n\n📋 **Monthly Breakdown:**\n- Save ₹25,000/month aggressively (cut entertainment to ₹2K)\n- ₹10K → Liquid Fund (Zerodha Coin — instant withdrawal)\n- ₹15K → High-interest savings (IDFC First 7%)\n\n**Before flying:**\n✅ Get a Wise multi-currency account (best SGD rates)\n✅ Don't close Indian bank accounts — keep SBI/HDFC\n✅ File last ITR in India before relocation\n✅ Convert 50% of emergency fund to USD/SGD before visa\n\n💡 At SGD 5,500 salary, your first month covers itself easily.",
            timestamp: "",
          },
        ],
      },
    ],
  },
  {
    id: "mentor-004",
    name: "Dr. Sarah Lim",
    title: "Scholarship Advisor | NUS Alumni",
    avatar: "SL",
    specialty: "Scholarships, Higher Studies & Research",
    description:
      "Helped 500+ students secure scholarships totaling over $5M. Expert in Indian and Singapore funding ecosystems.",
    color: "#F59E0B",
    defaultConversations: [
      {
        trigger: "Which scholarship should I apply to first?",
        messages: [
          {
            id: "m9",
            role: "user",
            content: "Which scholarship should I apply to first?",
            timestamp: "",
          },
          {
            id: "m10",
            role: "assistant",
            content:
              "Based on your profile (8.7 GPA, B.Tech CSE, goal: Singapore), here's your priority order:\n\n🥇 **Apply This Week:**\n1. **AICTE Pragati** (deadline Aug 31) — 88% match, ₹50K guaranteed\n2. **Google Generation Scholarship** — $1000 USD, your GPA qualifies\n\n🥈 **Apply Next Month:**\n3. **PM Young Researcher Fellowship** — Publish one arXiv paper first\n4. **NTU ASEAN Scholarship** — Start the Masters application process\n\n**My top tip:** Your personal statement should anchor on \"using tech for social impact\". Both AICTE and Google prioritize this narrative. Want me to review a draft?",
            timestamp: "",
          },
        ],
      },
    ],
  },
  {
    id: "mentor-005",
    name: "Kevin Tan",
    title: "Startup Founder | 2x Exit | Antler Alumni",
    avatar: "KT",
    specialty: "Entrepreneurship & Startup Ecosystem",
    description:
      "Built two startups in Singapore's tech ecosystem. Expert in Antler, Y Combinator, and SEA startup funding.",
    color: "#EF4444",
    defaultConversations: [
      {
        trigger: "Should I join a startup or build my own?",
        messages: [
          {
            id: "m11",
            role: "user",
            content: "Should I join a startup or build my own?",
            timestamp: "",
          },
          {
            id: "m12",
            role: "assistant",
            content:
              "Alex, great question! My honest advice after 2 exits:\n\n**Join a startup first (2 years)** — here's why:\n✅ You'll learn without losing your own money\n✅ Build network in SG's startup ecosystem\n✅ Understand PMF, fundraising, and operations up close\n✅ Get equity that might pay off\n\n**Then build your own** — when you have:\n- A real problem you've seen firsthand\n- 3-5 co-founders you trust\n- $20K-$50K personal runway (or an Antler acceptance)\n\n🎯 **Right now for you:** Apply to Antler's APAC cohort as a future founder track. They accept pre-idea founders. This gives you Singapore network + $100K if accepted.\n\nYour tech stack (React/Next.js) is literally what 90% of SaaS startups need. That's leverage.",
            timestamp: "",
          },
        ],
      },
    ],
  },
];
