import axios from "axios";
import type { Document, Template } from "../types";

const api = axios.create({
  baseURL: "https://writewise-ai-1.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

/*
 * Add JWT token automatically to protected requests.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

/*
 * If the backend returns 401, remove the invalid token.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
    }

    return Promise.reject(error);
  },
);


const sleep = (ms = 350) =>
  new Promise((resolve) => setTimeout(resolve, ms));


const documents: Document[] = [
  {
    id: "1",
    title: "Q3 Product Launch Strategy",
    type: "Strategy brief",
    updatedAt: "Edited 2 hours ago",
    words: 1248,
    favorite: true,
    excerpt:
      "A focused plan for introducing the next generation of our product.",
  },
  {
    id: "2",
    title: "Welcome email sequence",
    type: "Email",
    updatedAt: "Edited yesterday",
    words: 642,
    favorite: true,
    excerpt:
      "A warm, clear onboarding experience for new customers.",
  },
  {
    id: "3",
    title: "The future of remote work",
    type: "Blog post",
    updatedAt: "Edited Jul 18",
    words: 1830,
    excerpt:
      "Distributed teams are reshaping the way meaningful work gets done.",
  },
  {
    id: "4",
    title: "Monthly team update",
    type: "Internal memo",
    updatedAt: "Edited Jul 12",
    words: 478,
    excerpt:
      "A concise recap of this month's progress and priorities.",
  },
];


const templates: Template[] = [
  {
    id: "t1",
    title: "Blog post",
    description: "Create thoughtful long-form content.",
    category: "Marketing",
    icon: "PenLine",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    id: "t2",
    title: "Product description",
    description: "Make every feature feel essential.",
    category: "Marketing",
    icon: "Sparkles",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "t3",
    title: "Professional email",
    description: "Clear, confident communication.",
    category: "Business",
    icon: "Mail",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "t4",
    title: "Social media post",
    description: "Find your audience and voice.",
    category: "Social",
    icon: "MessageCircle",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "t5",
    title: "Meeting summary",
    description: "Capture decisions and next steps.",
    category: "Business",
    icon: "ClipboardList",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "t6",
    title: "Job description",
    description: "Attract the right talent.",
    category: "HR",
    icon: "Users",
    gradient: "from-sky-500 to-indigo-500",
  },
];


/*
 * Temporary mock API for frontend features
 * that do not have backend endpoints yet.
 */
export const mockApi = {
  async getDocuments(): Promise<Document[]> {
    await sleep();
    return documents;
  },

  async getTemplates(): Promise<Template[]> {
    await sleep();
    return templates;
  },

  async generate(prompt: string): Promise<string> {
    await sleep(900);

    return `Here's a polished first draft based on your brief.

${prompt || "Your idea deserves a clear, engaging narrative."}

Start with the reader's most urgent need, then introduce the value with direct, specific language. Keep each paragraph focused on one idea and close with a confident next step.`;
  },
};


export default api;