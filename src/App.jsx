import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
// Consolidated all lucide-react imports to the top and aliased Layout to LayoutIcon
import { Mail, Phone, Menu, X, ArrowRight, Layout as LayoutIcon, Server, Database, Terminal, Code, Linkedin, Github, Sparkles, Globe, ExternalLink, Shield, Cloud, Cpu, Bot, Wrench } from 'lucide-react';

// --- Custom SVG Icons ---
const JavaIcon = ({ s = 24, c }) => (<svg viewBox="0 0 384 512" width={s} height={s} className={c}><path fill="#5382a1" d="M277.7 336.6c-29.6 3.4-64.9-6.9-87.5-29.3-29.5-29.5-47-83.4-16.5-125.7 7.4-10.2 2.2-21.6-8.3-25.7-14.1-5.5-26.6 2.5-33.3 14-16.9 29-22.4 67.5-5.5 103.4 16.3 34.6 46 58.7 75.3 67.2 44.6 12.9 97.2-8.3 95.8-23.9zm41.7 33.7c-6.8-25.1-38.8-32.8-73.9-35.2-32.6-2.3-74.3 4-103.5 32.7-19 18.7-27.1 39.7-22 51.9 5.3 12.9 22.8 17.6 51 13.7 47.3-6.5 77.3-35.7 108.7-63.9 11.4-10.3 39.7-10.1 39.7.8zm-33.6 31.5c-17.5 14.2-41 32.4-78.5 38-27.7 4.1-52-1-60.6-12.8-8.5-11.7-1.8-32 17.3-50.8 25-24.6 62.3-30.7 92.2-28.5 18.7 1.4 38.3 5 44.3 20.1 2.5 6.2-3.4 22.3-14.7 34z" /><path fill="#f89820" d="M173.3 87.7c-9.5 17.5-10.5 37.8-7.2 58.2 2.7 16.7 8.2 30.7 14.7 40.8 3.6 5.6 8.5 9.9 13.4 13.4 21.8 15.6 54.2 12 74.3-11.7 13.6-16.1 18.2-35.8 14.9-53.9-5.5-30.7-38.6-54.3-73.8-57.7-12.9-1.3-26.7 3.9-36.3 10.9zM384 302c1.3 46.2-38.3 86-91 91.4-31.4 3.2-65.2-7.9-89.6-27.4-15-12-28.5-24.8-41.8-37.2-9.7-9.1-19.1-17.9-29.5-25.3-11.6-8.2-23.9-13.5-36.4-16.3-16-3.5-30.5-2.9-43.7 1.8-10.8 3.9-17 12.5-15.3 21 3.6 18.8 32.4 38.4 66 46.3 24.7 5.8 51.3 5.4 75.3-1.3 24-6.6 45.5-18.3 65.5-32.2 10-7 20.3-13.9 31.2-19.2 12.7-6.2 26.8-10.1 42-10.1 26.7 0 52.3 12.2 63.8 33.5 4.5 8.3 6.4 18 2.1 28.7z" /></svg>);
const JsIcon = ({ s = 24, c }) => (<svg viewBox="0 0 24 24" width={s} height={s} className={c}><path fill="#F7DF1E" d="M0 0h24v24H0V0z" /><path fill="#000000" d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.427-.414l-1.286 1.554c.3.525.85.966 1.615 1.182 2.48.725 4.83-.79 4.83-3.35.02-2.275.06-4.85.06-7.113z" /></svg>);
const ReactIcon = ({ s = 24, c }) => (<svg viewBox="0 0 24 24" width={s} height={s} fill="none" className={c}><circle cx="12" cy="12" r="2" fill="#61DAFB" /><g stroke="#61DAFB" strokeWidth="1.5"><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></g></svg>);
const HtmlIcon = ({ s = 24, c }) => (<svg viewBox="0 0 24 24" width={s} height={s} className={c}><path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0z" /><path fill="#EF652A" d="M11.977 22.18L19.013 20.24 20.5 2.343H11.977v19.837z" /><path fill="#FFFFFF" d="M5.412 4.41l.698 8.01h5.867V9.75H7.818l-.23-2.622h4.39V4.41H5.413zm.9 10.565l.195 2.194 2.899.802.002.001.004-.001 2.897-.801.332-3.71h-2.56l-.117 1.295-1.023.283-1.026-.28-.068-.77H5.99l.322 3.603z" /></svg>);
const CssIcon = ({ s = 24, c }) => (<svg viewBox="0 0 24 24" width={s} height={s} className={c}><path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0z" /><path fill="#33A9DC" d="M11.977 22.18l7.036-1.94L20.5 2.343H11.977v19.837z" /><path fill="#FFFFFF" d="M5.412 4.41l.23 2.622h6.335v2.718H6.08l.321 3.602 5.598 1.55V17.69l-2.897-.801-.195-2.194H6.402l.321 3.602 5.597 1.549.003-.002.003.002 5.598-1.55.826-9.248H5.412z" /></svg>);
const NodeIcon = ({ s = 24, c }) => (<svg viewBox="0 0 32 32" width={s} height={s} className={c}><path fill="#339933" d="M16 0l14 8v16l-14 8L2 24V8L16 0z" /><path fill="#FFFFFF" d="M16 5l9 5v12l-9 5-9-5V10l9-5z" opacity="0.1" /><path fill="#FFFFFF" d="M15.03 9.45v3.65h-3.636v1.836h3.636v3.672h2.182v-3.672h3.636V13.1h-3.636V9.45h-2.182z" /></svg>);
const MongoIcon = ({ s = 24, c }) => (<svg viewBox="0 0 24 24" width={s} height={s} className={c}><path fill="#47A248" d="M12.018 3.7C7.493 3.7 3.793 7.075 3.793 10.95c0 2.4 1.175 4.625 2.35 6.025 1.75 2.1 5.875 6.825 5.875 6.825s4.025-4.65 5.85-6.8c1.15-1.375 2.35-3.625 2.35-6.05 0-3.875-3.7-7.25-8.2-7.25z" /><path fill="#3FA037" d="M11.618 17.3c-.075-.175-.2-.85-.075-1.575.2-.875.675-2.55 1.35-4.3.225-.575.475-1.15.725-1.675.65-1.4 1.275-2.425 1.275-2.425s-.35 1.25-.925 3.275c-.25.85-.5 1.8-.7 2.8-.15.7-.25 1.325-.275 1.725a4.35 4.35 0 0 0 .05 1.35c.025.125.075.5.2.825l-1.625-.025z" /></svg>);
const SpringIcon = ({ s = 24, c }) => (<svg viewBox="0 0 24 24" width={s} height={s} className={c}><path fill="#6DB33F" d="M21.36 12.91c-.93-2.1-3.33-3.18-5.75-2.29-2.04.74-2.9 3.01-2.15 4.92.21.54.58 1.01 1.04 1.34.99.7 2.33.77 3.42.38 1.37-.5 2.53-2.07 3.44-4.35zm-8.38-7.29c1.24 0 2.47.41 3.4 1.25.94.84 1.39 1.96 1.24 3.16-.25 1.8-1.57 3.16-3.33 3.39-1.24.16-2.47-.23-3.39-1.08-.93-.84-1.39-1.96-1.23-3.16.09-1.81 1.55-3.17 3.31-3.56zM7.36 6.04C8.37 3.89 11.57 2.5 13.91 2.5c3.24 0 6.24 2.12 6.91 5.47.67 3.44-1.12 7.07-4.12 8.55-2.09 1.03-4.58 1.03-6.69.12-2.97-1.25-4.7-4.81-3.89-8.02.29-1.54 1.24-2.69 1.24-2.69z" /></svg>);
const ExpressIcon = ({ s = 24, c }) => (<svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor" className={c}><path d="M4.628 3c-.35.362-.632.864-.847 1.505L.04 15.946c-.053.16.002.33.135.422.132.092.308.096.444.01L5.46 13.3c.268-.17.512-.36.73-.57.383-.368.67-.814.857-1.336L10.8 3.073c.08-.225-.02-.478-.236-.596-.217-.118-.48-.07-.64.115L6.716 7.27c-.135.16-.366.183-.526.047-.16-.136-.183-.367-.047-.527l3.885-4.6c.225-.265.164-.663-.137-.85-.3-.185-.69-.107-.9.176L5.507 6.81c-.173.23-.506.277-.736.103-.23-.173-.276-.506-.103-.736L8.68 1.295c.324-.432.146-1.05-.348-1.25-.493-.2-1.033.04-1.23.546L3.716 10.477c-.18.46.264.932.742.792l4.814-1.412c.538-.158 1.02-.525 1.285-1.02L13.7 2.043c.107-.2.366-.276.565-.168.198.11.275.367.167.566l-3.143 5.84c-.37.687-1.21.96-1.92.623L4.82 7.57c-.19-.09-.417-.01-.507.18-.09.19-.01.416.18.506l4.55 2.17c.64.305 1.397.08 1.765-.526l3.45-5.72c.13-.217.414-.288.63-.158.217.13.287.414.157.63L11.5 10.62c-.334.552-.134 1.27.446 1.604l5.1 2.94c.53.307.754.947.51 1.515l-2.4 5.6c-.083.194-.34.25-.5.11l-2.8-2.5c-.38-.34-.96-.31-1.3.07-.34.38-.31.96.07 1.3l2.8 2.5c.47.42 1.21.33 1.56-.18l2.8-6.54c.3-.696-.02-1.507-.71-1.8l-5.1-2.94c-.2-.114-.27-.366-.156-.564l3.545-5.9c.13-.215.412-.285.628-.155.215.13.285.412.155.628l-3.1 5.16c-.26.433.05.986.557.986h6.2c.52 0 .98-.33 1.16-.82l2.1-5.6c.08-.215-.03-.456-.246-.537-.214.08.455.03.535-.245l2.1-5.6c-.06.16-.21.27.38-.27h6.2c.17 0 .32.18.23.32l-3.1 5.16c-.32-.53-.14-1.22.4-1.54l-3.546-2.04c-.54-.31-1.23-.13-1.54.4l-3.545 5.9c-.28.47-.89.62-1.36.35l5.1 2.94c.47.27.63.88.36 1.35l-3.546 5.9c-.16.266-.08.613.186.773.266.16.613.08.773-.186z" /></svg>);
const TailwindIcon = ({ s = 24, c }) => (<svg viewBox="0 0 24 24" width={s} height={s} className={c}><path fill="#06B6D4" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" /></svg>);
const GitIcon = ({ s = 24, c }) => (<svg viewBox="0 0 24 24" width={s} height={s} className={c}><path fill="#F05032" d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.881 0-2.6.105-.105.213-.201.334-.283v-5.819c-.538-.215-1.09-.06-1.506.355l-2.846-2.844c.415-.415.561-.969.351-1.507l-3.52-3.52-1.117 1.119c-.609.609-.609 1.59 0 2.198l10.48 10.478c.604.604 1.582.604 2.184 0l10.48-10.48c.611-.609.611-1.59 0-2.196z" /></svg>);
const GithubIcon = ({ s = 24, c }) => (<svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor" className={c}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>);

// --- Data ---
export const SKILLS = {
  frontend: {
    label: "Frontend & UI",
    icon: <LayoutIcon size={24} />,
    items: [
      { name: "Next.js (App Router)", icon: <LayoutIcon size={16} />, color: "text-gray-900" },
      { name: "React.js", icon: <ReactIcon s={16} />, color: "text-blue-500" },
      { name: "TypeScript", icon: <Code size={16} />, color: "text-blue-600" },
      { name: "Redux Toolkit", icon: <Code size={16} />, color: "text-purple-600" },
      { name: "Tailwind CSS", icon: <TailwindIcon s={16} />, color: "text-teal-500" },
      { name: "JavaScript (ES6+)", icon: <JsIcon s={16} />, color: "text-yellow-500" }
    ],
    style: "from-cyan-400 to-blue-400", bg: "bg-cyan-100/60", border: "border-cyan-200/30", text: "text-cyan-700"
  },
  backend: {
    label: "Backend Architecture",
    icon: <Server size={24} />,
    items: [
      { name: "Node.js", icon: <NodeIcon s={16} />, color: "text-green-600" },
      { name: "Express.js", icon: <ExpressIcon s={16} />, color: "text-gray-700" },
      { name: "Java 17", icon: <JavaIcon s={16} />, color: "text-red-500" },
      { name: "Spring Boot", icon: <SpringIcon s={16} />, color: "text-green-500" },
      { name: "RESTful APIs", icon: <Server size={16} />, color: "text-gray-600" },
      { name: "JWT / RBAC", icon: <Code size={16} />, color: "text-indigo-600" }
    ],
    style: "from-emerald-400 to-green-400", bg: "bg-emerald-100/60", border: "border-emerald-200/30", text: "text-emerald-700"
  },
  database: {
    label: "Database & Storage",
    icon: <Database size={24} />,
    items: [
      { name: "MongoDB Atlas", icon: <MongoIcon s={16} />, color: "text-green-600" },
      { name: "Mongoose ODM", icon: <Code size={16} />, color: "text-[#880000]" },
      { name: "MySQL", icon: <Database size={16} />, color: "text-[#4479A1]" },
      { name: "Aggregation Pipelines", icon: <Database size={16} />, color: "text-gray-700" }
    ],
    style: "from-amber-400 to-orange-400", bg: "bg-amber-100/60", border: "border-amber-200/30", text: "text-amber-700"
  },
  ai: {
    label: "AI Engineering",
    icon: <Cpu size={24} />,
    items: [
      { name: "GitHub Models", icon: <GithubIcon s={16} />, color: "text-gray-900" },
      { name: "OpenAI SDK", icon: <Code size={16} />, color: "text-black" },
      { name: "GPT-4o / GPT-4o-mini", icon: <Bot size={16} />, color: "text-green-600" },
      { name: "Prompt Engineering", icon: <Terminal size={16} />, color: "text-purple-600" }
    ],
    style: "from-rose-400 to-red-400", bg: "bg-rose-100/60", border: "border-rose-200/30", text: "text-rose-700"
  },
  devops: {
    label: "DevOps & Cloud",
    icon: <Globe size={24} />,
    items: [
      { name: "Azure App Service", icon: <Globe size={16} />, color: "text-[#0089D6]" },
      { name: "GitHub Actions", icon: <GitIcon s={16} />, color: "text-gray-800" },
      { name: "Docker", icon: <Terminal size={16} />, color: "text-[#2496ED]" },
      { name: "Git Workflow", icon: <GitIcon s={16} />, color: "text-[#F05032]" }
    ],
    style: "from-fuchsia-400 to-purple-400", bg: "bg-fuchsia-100/60", border: "border-fuchsia-200/30", text: "text-fuchsia-700"
  },
  tools: {
    label: "Tools & Testing",
    icon: <Wrench size={24} />,
    items: [
      { name: "Postman", icon: <Globe size={16} />, color: "text-[#FF6C37]" },
      { name: "SonarQube", icon: <Code size={16} />, color: "text-[#4E9BCD]" },
      { name: "VS Code", icon: <LayoutIcon size={16} />, color: "text-[#007ACC]" },
      { name: "Vite", icon: <Terminal size={16} />, color: "text-[#646CFF]" }
    ],
    style: "from-slate-400 to-gray-400", bg: "bg-slate-100/60", border: "border-slate-200/30", text: "text-slate-700"
  }
};

// Flagship Project - Hybrid Name to pass ATS and match GitHub
const FLAGSHIP_PROJECT = {
  title: "Institutional Grievance System (Digital Complaint Box)",
  category: "Enterprise Full-Stack Application",
  year: "2024-2025",
  description: "A production-grade, role-based ERP module for employee grievance management. Integrated Generative AI (GPT-4o) to automate complaint summarization, reducing administrative review time by 40%. Features secure workflow routing, JWT authentication, and cloud-native deployment on Microsoft Azure.",
  tech: ["React", "Node.js", "Express", "MongoDB Atlas", "Azure", "GenAI (GPT-4o)", "OpenAI SDK"],
  githubLink: "https://github.com/Jithinnnnnn/complaintbox-production",
  liveLink: "https://complaintbox-api-eqehdzewe6cpekg3.centralindia-01.azurewebsites.net/",
  gradient: "from-indigo-500 via-purple-500 to-pink-500",
  accent: "indigo",
  isDeployed: true,
  features: [
    "AI-Powered Complaint Summarization (GPT-4o-mini)",
    "Role-Based Access Control (Admin/Employee/Authority)",
    "Automated Status Lifecycle Tracking (Open → Resolved)",
    "Secure JWT Authentication & Authorization",
    "Cloud-Native Deployment on Azure App Service",
    "Enterprise Security (Helmet, Rate Limiting, Mongo Sanitize)"
  ],
  techStack: {
    frontend: ["React 18", "Vite", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "JWT"],
    ai: ["GitHub Models", "OpenAI SDK", "GPT-4o-mini"],
    database: ["MongoDB Atlas", "Mongoose"],
    security: ["Helmet", "express-rate-limit"],
    deployment: ["Azure App Service", "Git/GitHub"]
  }
};

export const PROJECTS = [
  {
    title: "Smart Bookmark Manager",
    category: "Knowledge Management System",
    year: "2026",
    description: "Distributed bookmark management system built with Next.js 14 and Supabase. Implemented real-time state synchronization via WebSockets and multi-tenant data isolation using Row-Level Security (RLS). Optimized for edge delivery and high-throughput reads.",
    tech: ["Next.js 14", "TypeScript", "Supabase", "WebSockets", "Tailwind CSS"],
    architecture: {
      database: "PostgreSQL with REPLICA IDENTITY FULL for real-time logical replication.",
      caching: "Edge-optimized dynamic rendering integrated with Vercel Data Cache.",
      security: "PostgreSQL Row-Level Security (RLS) enforced via strict JWT-based auth.",
      scalability: "Serverless singleton client pattern utilizing Supabase Connection Pooling."
    },
    aiIntegration: "Schema engineered for pgvector/Pinecone embeddings. Planned OpenAI SDK integration for semantic tagging.",
    link: "https://smartbookmarkapp-jm8sw0nsq-jithinnnnnns-projects.vercel.app/",
    gradient: "from-blue-500 via-blue-400 to-cyan-300",
    accent: "blue"
  },
  {
    title: "Skill Force",
    category: "Manpower Portal",
    year: "2025",
    description: "Enterprise-grade manpower supply platform designed with role-based multi-tenant architecture to connect job seekers, contractors, and organizations. Implements secure authentication with JWT, and strict tenant-level data isolation to ensure privacy across organizations.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "JWT Auth"],
    link: "https://github.com/Jithinnnnnn/Skillforce",
    gradient: "from-emerald-400 via-teal-400 to-cyan-400",
    accent: "emerald"
  },
  {
    title: "PC Builder",
    category: "Configurator Tool",
    year: "2024",
    description: "Interactive hardware compatibility engine with real-time validation logic and dynamic pricing calculation.",
    tech: ["React.js", "Node.js", "Validation Engine", "State Management"],
    link: "https://github.com/Jithinnnnnn/pc-Builder",
    gradient: "from-fuchsia-400 via-pink-400 to-rose-400",
    accent: "pink"
  },
  {
    title: "Geocart",
    category: "E-commerce Platform",
    year: "2025",
    description: "Full-stack e-commerce platform featuring automated delivery routing via Geolocation APIs and secure cart state management.",
    tech: ["React.js", "Node.js", "MongoDB", "Geolocation API"],
    link: "https://github.com/Jithinnnnnn/geocart",
    gradient: "from-indigo-500 via-purple-500 to-violet-500",
    accent: "indigo"
  }
];

// --- Components ---
const SkillCard = ({ category, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-7 rounded-[32px] bg-gradient-to-br from-white to-gray-50 shadow-[8px_8px_24px_rgba(0,0,0,0.08),-8px_-8px_24px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_32px_rgba(0,0,0,0.12),-12px_-12px_32px_rgba(255,255,255,0.95)] active:shadow-[inset_4px_4px_12px_rgba(0,0,0,0.08),inset_-4px_-4px_12px_rgba(255,255,255,0.9)] transition-all duration-300 group border border-gray-100/50"
  >
    <div className="flex items-center gap-4 mb-5">
      <div className={`p-4 rounded-[20px] bg-gradient-to-br ${category.style} text-white shadow-[inset_2px_2px_8px_rgba(255,255,255,0.2),4px_4px_16px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-300`}>
        {category.icon}
      </div>
      <h3 className="font-heading font-bold text-xl text-slate-800">{category.label}</h3>
    </div>
    <div className="flex flex-wrap gap-2.5">
      {category.items.map((item, idx) => (
        <span
          key={idx}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-[16px] ${category.bg} ${item.color} ${category.border} shadow-[3px_3px_8px_rgba(0,0,0,0.06),-3px_-3px_8px_rgba(255,255,255,0.8)] hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.06),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-200 border`}
        >
          {item.icon} {item.name}
        </span>
      ))}
    </div>
  </motion.div>
);

const FlagshipProjectCard = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative rounded-[48px] overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 shadow-[16px_16px_40px_rgba(0,0,0,0.25),-8px_-8px_40px_rgba(255,255,255,0.05)] mb-8 md:mb-12 border border-slate-600/30"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl"></div>
    <div className={`h-3 w-full bg-gradient-to-r ${project.gradient} shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]`}></div>

    <div className="absolute top-4 right-4 z-20">
      <span className="px-4 py-2 bg-gradient-to-br from-emerald-400 to-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-[20px] flex items-center gap-2 shadow-[4px_4px_12px_rgba(0,0,0,0.2),-2px_-2px_8px_rgba(255,255,255,0.1)]">
        <Cloud size={12} /> Live
      </span>
    </div>

    <div className="relative z-10 p-6 md:p-10 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-1.5 rounded-[16px] text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r ${project.gradient} shadow-[3px_3px_10px_rgba(0,0,0,0.2)]`}>
                {project.category}
              </span>
              <span className="font-mono text-xs font-medium text-slate-400">{project.year}</span>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 drop-shadow-sm">{project.title}</h3>
            <p className="text-slate-300 text-base leading-relaxed">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="text-xs font-bold px-4 py-2 bg-white/10 text-white rounded-[14px] border border-white/20 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.1),2px_2px_8px_rgba(0,0,0,0.15)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-base font-bold rounded-[24px] hover:from-indigo-400 hover:to-purple-400 active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.2),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center gap-2 shadow-[6px_6px_20px_rgba(79,70,229,0.3)]"
            >
              <ExternalLink size={18} /> View Live Demo
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-white/10 text-white text-base font-bold rounded-[24px] border border-white/20 hover:bg-white/15 active:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center gap-2 shadow-[4px_4px_16px_rgba(0,0,0,0.15)]"
            >
              <Github size={18} /> Source Code
            </a>
          </div>
        </div>

        <div className="hidden lg:block bg-white/5 rounded-[32px] p-7 border border-white/10 backdrop-blur-sm shadow-[inset_2px_2px_8px_rgba(255,255,255,0.05),8px_8px_24px_rgba(0,0,0,0.2)]">
          <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Shield size={22} className="text-emerald-400" /> Key Features & Security
          </h4>
          <ul className="space-y-3.5">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.4)]"></span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-7 pt-7 border-t border-white/10">
            <h5 className="text-sm font-bold text-white mb-4">Tech Stack Breakdown</h5>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-indigo-400 font-semibold">Frontend:</span>
                <span className="text-slate-400 ml-1">{project.techStack.frontend.slice(0, 2).join(", ")}</span>
              </div>
              <div>
                <span className="text-emerald-400 font-semibold">Backend:</span>
                <span className="text-slate-400 ml-1">{project.techStack.backend.slice(0, 2).join(", ")}</span>
              </div>
              <div>
                <span className="text-rose-400 font-semibold">AI Layer:</span>
                <span className="text-slate-400 ml-1">{project.techStack.ai[0]}</span>
              </div>
              <div>
                <span className="text-amber-400 font-semibold">Database:</span>
                <span className="text-slate-400 ml-1">{project.techStack.database[0]}</span>
              </div>
              <div className="col-span-2 mt-1">
                <span className="text-purple-400 font-semibold">Cloud Infrastructure:</span>
                <span className="text-slate-400 ml-1">{project.techStack.deployment[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative rounded-[32px] overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-[10px_10px_30px_rgba(0,0,0,0.1),-10px_-10px_30px_rgba(255,255,255,0.9)] hover:shadow-[14px_14px_40px_rgba(0,0,0,0.14),-14px_-14px_40px_rgba(255,255,255,0.95)] active:shadow-[inset_5px_5px_15px_rgba(0,0,0,0.1),inset_-5px_-5px_15px_rgba(255,255,255,0.9)] transition-all duration-300 flex flex-col h-full border border-gray-100/50"
  >
    <div className={`h-3 w-full bg-gradient-to-r ${project.gradient} shadow-[inset_0_1px_3px_rgba(255,255,255,0.2)]`}></div>
    <div className="p-7 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-5">
        <div className={`px-4 py-1.5 rounded-[14px] text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${project.gradient} shadow-[3px_3px_8px_rgba(0,0,0,0.15)]`}>
          {project.category}
        </div>
        <span className="font-mono text-xs font-medium text-slate-400">{project.year}</span>
      </div>
      <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors drop-shadow-sm">{project.title}</h3>
      <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">{project.description}</p>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-[11px] font-bold px-3 py-1.5 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-700 rounded-[12px] border border-slate-200/50 shadow-[2px_2px_6px_rgba(0,0,0,0.06),-2px_-2px_6px_rgba(255,255,255,0.8)]"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          className={`inline-flex items-center gap-2 text-sm font-bold ${project.accent === 'blue' ? 'text-blue-600 hover:text-blue-700' :
            project.accent === 'emerald' ? 'text-emerald-600 hover:text-emerald-700' :
              'text-pink-600 hover:text-pink-700'
            } transition-colors drop-shadow-sm`}
        >
          View Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#e6eaf0] via-[#eef1f5] to-[#e6eaf0]"
        >
          {/* Decorative background blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200/40 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-fuchsia-200/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, scale: 1, letterSpacing: '-0.02em' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-8xl font-heading font-bold text-slate-900 drop-shadow-sm"
            >
              Jithin Jose
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-4 text-sm sm:text-base text-slate-500 font-medium tracking-widest uppercase"
            >
              Full-Stack Developer
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 mx-auto h-1 w-24 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 rounded-full origin-center"
            />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
            {/* Navbar */}
            <motion.nav style={{ opacity: headerOpacity }} className="fixed top-0 w-full z-50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-b border-gray-200/50"></div>
              <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-50">
                <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-[20px] flex items-center justify-center text-white shadow-[6px_6px_20px_rgba(99,102,241,0.3),-3px_-3px_12px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform">
                    <Code size={22} strokeWidth={2.5} />
                  </div>
                  <span className="text-slate-900 font-heading drop-shadow-sm">Jithin</span>
                </a>

                <div className="hidden md:flex items-center gap-2 bg-gradient-to-br from-slate-50 to-gray-100 p-2 rounded-[28px] border border-gray-200/50 backdrop-blur-sm shadow-[inset_2px_2px_6px_rgba(0,0,0,0.06),inset_-2px_-2px_6px_rgba(255,255,255,0.9),4px_4px_16px_rgba(0,0,0,0.06)]">
                  {['about', 'skills', 'projects', 'contact'].map((item) => (
                    <a
                      key={item}
                      href={`#${item}`}
                      onClick={(e) => { e.preventDefault(); document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' }); }}
                      className={`px-6 py-2.5 rounded-[20px] text-sm font-bold transition-all duration-300 ${activeSection === item
                        ? 'bg-gradient-to-br from-white to-gray-50 text-indigo-600 shadow-[4px_4px_12px_rgba(0,0,0,0.08),-4px_-4px_12px_rgba(255,255,255,0.9)] scale-105'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                        }`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                  <a
                    href="https://github.com/jithinnnnnn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-[16px] bg-gradient-to-br from-slate-50 to-gray-100 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-[3px_3px_10px_rgba(0,0,0,0.08),-3px_-3px_10px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.06)] active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.08)] transition-all"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/jithin-jose-9092a91ba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-[16px] bg-gradient-to-br from-slate-50 to-gray-100 text-slate-600 hover:text-blue-600 flex items-center justify-center shadow-[3px_3px_10px_rgba(0,0,0,0.08),-3px_-3px_10px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.06)] active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.08)] transition-all"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="#contact"
                    className="px-6 py-2.5 bg-gradient-to-br from-slate-800 to-slate-900 text-white text-sm font-bold rounded-[20px] hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-[6px_6px_20px_rgba(0,0,0,0.15),-2px_-2px_8px_rgba(255,255,255,0.1)] active:shadow-[inset_3px_3px_10px_rgba(0,0,0,0.3)]"
                  >
                    Contact me
                  </a>
                </div>

                <button
                  className="md:hidden text-slate-800 p-2 z-50 relative focus:outline-none rounded-[12px] bg-gradient-to-br from-slate-50 to-gray-100 shadow-[3px_3px_10px_rgba(0,0,0,0.08),-3px_-3px_10px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.08)]"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-40 bg-gradient-to-br from-white to-gray-50 flex flex-col items-center justify-center md:hidden"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-60 h-60 bg-fuchsia-100/50 rounded-full blur-3xl"></div>
                    </div>

                    <div className="flex flex-col items-center gap-6 relative z-10 w-full px-8">
                      {['about', 'skills', 'projects', 'contact'].map((item, i) => (
                        <motion.a
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={item}
                          href={`#${item}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMenuOpen(false);
                            document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-4xl font-heading font-bold text-slate-900 hover:text-indigo-600 transition-colors drop-shadow-sm"
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </motion.a>
                      ))}

                      <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        href="#contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="mt-6 px-10 py-4 bg-gradient-to-br from-slate-800 to-slate-900 text-white text-lg font-bold rounded-[28px] hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-[8px_8px_24px_rgba(0,0,0,0.2)] active:shadow-[inset_4px_4px_12px_rgba(0,0,0,0.3)] w-full max-w-xs text-center"
                      >
                        Contact me
                      </motion.a>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-8 mt-4"
                      >
                        <a
                          href="https://github.com/jithinnnnnn"
                          target="_blank"
                          className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-slate-50 to-gray-100 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-[4px_4px_12px_rgba(0,0,0,0.08),-4px_-4px_12px_rgba(255,255,255,0.9)] active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.08)] transition-all transform hover:scale-110"
                        >
                          <Github size={28} />
                        </a>
                        <a
                          href="https://linkedin.com/in/jithin-jose-9092a91ba"
                          target="_blank"
                          className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-slate-50 to-gray-100 text-slate-600 hover:text-blue-600 flex items-center justify-center shadow-[4px_4px_12px_rgba(0,0,0,0.08),-4px_-4px_12px_rgba(255,255,255,0.9)] active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.08)] transition-all transform hover:scale-110"
                        >
                          <Linkedin size={28} />
                        </a>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>

            {/* Hero Section */}
            <section
              id="about"
              className="pt-16 pb-16 lg:pt-24 lg:pb-32 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center relative overflow-hidden"
            >

              <div className="lg:hidden absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-200/30 rounded-full blur-[100px] -z-10"></div>
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex-1 w-full text-center lg:text-left"
                >
                  <div className="inline-block px-5 py-2 mb-6 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-gradient-to-br from-indigo-50 to-indigo-100/50 backdrop-blur-sm rounded-[20px] border border-indigo-200/50 shadow-[4px_4px_12px_rgba(99,102,241,0.1),-2px_-2px_8px_rgba(255,255,255,0.8)]">
                    Available for work
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold tracking-tight mb-6 leading-[1.15] text-slate-900 drop-shadow-sm">
                    Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">Digital Experiences</span> that Matter.
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Hi, I'm <span className="font-bold text-slate-900">Jithin Jose</span>, a full-stack developer specializing in
                    <span className="font-semibold text-indigo-600"> MERN stack </span>.<p></p> I build scalable applications with , React, Node.js, Express, and MongoDB. <span className="font-semibold text-emerald-600">I've successfully deployed production applications to Azure</span>, with strong experience in REST APIs, authentication, AI Integrations, and cloud platforms.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
                    <a
                      href="#projects"
                      className="w-full sm:w-auto px-10 py-4 bg-gradient-to-br from-slate-800 to-slate-900 text-white font-bold rounded-[28px] hover:from-indigo-600 hover:to-indigo-700 active:shadow-[inset_4px_4px_12px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-2 shadow-[8px_8px_24px_rgba(0,0,0,0.15),-3px_-3px_12px_rgba(255,255,255,0.1)]"
                    >
                      View Work <ArrowRight size={18} />
                    </a>
                    <a
                      href="#contact"
                      className="w-full sm:w-auto px-10 py-4 bg-gradient-to-br from-white to-gray-50 text-slate-900 font-bold rounded-[28px] border border-gray-200 hover:border-gray-300 active:shadow-[inset_4px_4px_12px_rgba(0,0,0,0.08)] transition-all flex items-center justify-center gap-2 shadow-[6px_6px_20px_rgba(0,0,0,0.08),-6px_-6px_20px_rgba(255,255,255,0.9)]"
                    >
                      Contact Me
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex-1 relative w-full max-w-lg hidden lg:flex items-end justify-center"
                >
                  <img
                    src="/hero.png"
                    alt="Jithin Jose - Full Stack Developer"
                    className="w-full max-w-[480px] object-contain drop-shadow-2xl animate-float select-none"
                    draggable={false}
                  />
                </motion.div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 md:py-32 relative">
              <div className="max-w-7xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center max-w-3xl mx-auto mb-16"
                >
                  <div className="inline-flex items-center gap-2 px-5 py-2 mb-4 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-[20px] shadow-[4px_4px_12px_rgba(99,102,241,0.1),-2px_-2px_8px_rgba(255,255,255,0.8)] border border-indigo-200/50">
                    <Sparkles size={12} /> Expertise
                  </div>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6 drop-shadow-sm">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Arsenal</span></h2>
                  <p className="text-slate-600 text-base md:text-lg">A comprehensive toolkit for building robust, intelligent, and scalable applications.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 md:gap-6">
                  <div className="xl:col-span-2"><SkillCard category={SKILLS.frontend} index={0} /></div>
                  <div className="xl:col-span-2"><SkillCard category={SKILLS.backend} index={1} /></div>
                  <div className="xl:col-span-2"><SkillCard category={SKILLS.database} index={2} /></div>
                  <div className="xl:col-span-2"><SkillCard category={SKILLS.ai} index={3} /></div>
                  <div className="xl:col-span-2"><SkillCard category={SKILLS.devops} index={4} /></div>
                  <div className="xl:col-span-2"><SkillCard category={SKILLS.tools} index={5} /></div>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 md:py-32 max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-block px-5 py-2 mb-4 text-xs font-bold tracking-widest text-fuchsia-600 uppercase bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/50 rounded-[20px] shadow-[4px_4px_12px_rgba(217,70,239,0.1),-2px_-2px_8px_rgba(255,255,255,0.8)] border border-fuchsia-200/50">Portfolio</div>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4 drop-shadow-sm">Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600">Works</span></h2>
                </motion.div>
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  href="https://github.com/jithinnnnnn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-fuchsia-600 transition-colors px-7 py-3 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-[24px] active:shadow-[inset_3px_3px_10px_rgba(0,0,0,0.08)] hover:shadow-[6px_6px_20px_rgba(0,0,0,0.1),-6px_-6px_20px_rgba(255,255,255,0.9)] shadow-[4px_4px_16px_rgba(0,0,0,0.08),-4px_-4px_16px_rgba(255,255,255,0.9)] w-full md:w-auto justify-center"
                >
                  View Full Archive <ArrowRight size={16} />
                </motion.a>
              </div>

              {/* Flagship Project */}
              <FlagshipProjectCard project={FLAGSHIP_PROJECT} />

              {/* Other Projects */}
              <h3 className="text-xl font-heading font-bold text-slate-700 mb-6 mt-8 drop-shadow-sm">Other Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {PROJECTS.map((project, idx) => <ProjectCard key={idx} project={project} index={idx} />)}
              </div>
            </section>

            {/* Contact Section */}
            <footer id="contact" className="py-20 md:py-32 relative bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
              <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center justify-center p-5 mb-8 bg-gradient-to-br from-indigo-50 to-fuchsia-50 rounded-[28px] text-indigo-600 shadow-[8px_8px_24px_rgba(99,102,241,0.15),-6px_-6px_24px_rgba(255,255,255,0.9)]"
                >
                  <Mail size={36} />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-5xl md:text-7xl font-heading font-bold text-slate-900 mb-8 tracking-tight break-words drop-shadow-sm"
                >
                  Let's build something <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">extraordinary.</span>
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-20"
                >
                  <a
                    href="mailto:jithinjose10341@gmail.com"
                    className="w-full md:w-auto px-10 py-4 bg-gradient-to-br from-slate-800 to-slate-900 text-white font-bold rounded-[28px] hover:from-indigo-600 hover:to-indigo-700 active:shadow-[inset_4px_4px_12px_rgba(0,0,0,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-3 shadow-[8px_8px_24px_rgba(0,0,0,0.15),-3px_-3px_12px_rgba(255,255,255,0.1)]"
                  >
                    <Mail size={20} /> jithinjose10341@gmail.com
                  </a>
                </motion.div>

                <div className="flex justify-center gap-6 border-t border-gray-200/50 pt-12">
                  <a
                    href="https://github.com/jithinnnnnn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-slate-50 to-gray-100 text-slate-500 hover:text-slate-900 flex items-center justify-center shadow-[4px_4px_12px_rgba(0,0,0,0.08),-4px_-4px_12px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.06)] active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.08)] transition-all hover:scale-110"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/jithin-jose-9092a91ba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-slate-50 to-gray-100 text-slate-500 hover:text-blue-600 flex items-center justify-center shadow-[4px_4px_12px_rgba(0,0,0,0.08),-4px_-4px_12px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.06)] active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.08)] transition-all hover:scale-110"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
                <p className="text-slate-400 text-sm font-medium mt-12">© 2026 Jithin Jose. Crafted with React & Tailwind.</p>
              </div>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}