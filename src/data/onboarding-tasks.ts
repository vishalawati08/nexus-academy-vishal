
export type OnboardingTask = {
  id: number;
  day: string;
  sequence: number;
  title: string;
  description: string;
  instructions: string[];
  resourceUrl?: string;
  resourceLabel?: string;
  isActive: boolean;
};

export const DEMO_ONBOARDING_TASKS: OnboardingTask[] = [
  {
    id: 1,
    day: "DAY 01",
    sequence: 1,
    title: "Welcome to Nexus Academy",
    description: "Get familiar with your guided onboarding journey.",
    instructions: [
      "Understand the purpose of Nexus Academy.",
      "Review how tasks unlock in sequence.",
      "Continue when you are ready to begin.",
    ],
    isActive: true,
  },
  {
    id: 2,
    day: "DAY 01",
    sequence: 2,
    title: "Understand the Product Specialist Role",
    description: "Learn about the responsibilities of a Product Specialist.",
    instructions: [
      "Review your role and responsibilities.",
      "Understand how product, engineering, sales, and customers collaborate.",
      "Note any questions for your manager.",
    ],
    isActive: true,
  },
 
{
  id: 3,
  day: "DAY 01",
  sequence: 3,
  title: "Connector Fundamentals",
  description: "Complete the assigned connector fundamentals learning.",
  instructions: [
    "Open the resource assigned to this task.",
    "Complete the required learning activities.",
    "Return here after completing the assigned work.",
  ],
  resourceUrl: "/mission/connector-fundamentals",
  resourceLabel: "Open Connector Fundamentals",
  isActive: true,
},
 
{
  id: 4,
  day: "DAY 02",
  sequence: 4,
  title: "Explore Product Families",
  description: "Learn about the assigned product portfolio.",
  instructions: [
    "Open the resource assigned to this task.",
    "Review product applications and key differences.",
    "Record questions for your trainer.",
  ],
  resourceUrl: "/mission/product-families",
  resourceLabel: "Open Product Families",
  isActive: true,
},
  {
    id: 5,
    day: "DAY 02",
    sequence: 5,
    title: "Learning Review",
    description: "Review your learning and identify knowledge gaps.",
    instructions: [
      "Review the learning you have completed.",
      "List topics that need clarification.",
      "Discuss next steps with your manager.",
    ],
    isActive: true,
  },
];
