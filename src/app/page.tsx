"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./contexts/ThemeContext";
import { categoryFont, logoFont, skillFont, taglineFont } from "./fonts";

type TimelineItem = {
  id: string;
  title: string;
  org: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM | undefined for present
  type: "education" | "work";
  details?: string[];
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatTimelineDate(ym: string): string {
  const [year, month] = ym.split("-");
  if (!month) return year;
  return `${MONTH_LABELS[parseInt(month, 10) - 1]} ${year}`;
}

function formatTimelineRange(start: string, end?: string): string {
  return `${formatTimelineDate(start)} – ${end ? formatTimelineDate(end) : "Present"}`;
}

type Project = {
  id: string;
  title: string;
  summary: string;
  type: "web" | "app" | "design";
  color: string; // bg color
  videoSrc?: string;
  imageSrc?: string;
  carouselImages?: string[];
  orientation?: "horizontal" | "vertical"; // layout hint
  github?: string;
  website?: string;
};

const timeline: TimelineItem[] = [
  {
    id: "t_bennett",
    title: "B.Tech Computer Science and Engineering",
    org: "Bennett University",
    start: "2022-08",
    end: "2026-05",
    type: "education",
    details: [
      "8.86 CGPA",
      "Focused on software engineering, data structures & algorithms, databases, and system design.",
    ],
  },
  {
    id: "t_ezlearn",
    title: "Lead Developer Intern",
    org: "EzLearn",
    start: "2024-09",
    end: "2025-03",
    type: "work",
    details: [
      "Led development of key platform features and AI-powered learning tools for an EdTech product.",
    ],
  },
  {
    id: "t_wingify",
    title: "Software Engineering Intern",
    org: "Wingify",
    start: "2025-09",
    end: "2026-03",
    type: "work",
    details: [
      "Contributed to VWO Pulse, building production features and improving reliability for a customer feedback platform used at scale.",
    ],
  },
  {
    id: "t_open",
    title: "Open to Work",
    org: "Actively exploring roles",
    start: "2026-03",
    type: "work",
    details: [
      "Seeking opportunities to contribute to high-impact engineering teams.",
    ],
  },
];

const projects: Project[] = [
  {
    id: "p1",
    title: "Ezlearn Edtech",
    summary: "Developed a complete full-stack platform for Ezlearn with frontend and backend infrastructure on Google Cloud Platform, designed to handle up to 5,000 concurrent users.",
    type: "web",
    color: "var(--accent-peach)",
  },
  {
    id: "p2",
    title: "Stock Market App",
    summary: "App design for a stealth startup stock market application with real-time tracking APIs and advanced analytics.",
    type: "app",
    color: "var(--accent-blue)",
    videoSrc:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    orientation: "vertical",
  },
  {
    id: "p3",
    title: "Catlysis",
    summary: "Developed frontend and complete architecture for an entrance exam analysis and tracking platform with monthly subscription features.",
    type: "web",
    color: "var(--accent-pink)",
    orientation: "horizontal",
  },
  {
    id: "p4",
    title: "Poster Series",
    summary: "Experimental typography posters.",
    type: "design",
    color: "var(--accent-mint)",
  },
  {
    id: "p5",
    title: "Dashboard UI",
    summary: "Data viz with neat components.",
    type: "web",
    color: "var(--accent-lavender)",
  },
  {
    id: "p6",
    title: "Shop Brand",
    summary: "Packaging and logo.",
    type: "design",
    color: "var(--accent-coral)",
  },
];

const selfProjects: Project[] = [
  {
    id: "sp1",
    title: "Dynamic Blog Post Generator",
    summary: "Dynamic blog system with unique slugs and rich text formatting.",
    type: "web",
    color: "var(--accent-peach)",
    imageSrc: "/blog-posts-generator.png",
    carouselImages: [
      "/blog-posts-generator.png",
      "/blog-posts-generator-2.png"
    ],
    github: "https://github.com/KhushiGusain/Dynamic-Blog-Post-with-Admin-Portal-and-Authentication",
    website: "https://dynamic-blog-post-with-admin-portal-brown.vercel.app/",
  },
  {
    id: "sp2",
    title: "TaskHive",
    summary: "SaaS platform for project management with real-time collaboration and AI queries.",
    type: "app",
    color: "var(--accent-blue)",
    imageSrc: "/taskhive.png",
    carouselImages: [
      "/taskhive.png",
      "/taskhive-2.png",
      "/taskhive-3.png"
    ],
    github: "https://github.com/KhushiGusain/TaskHive",
    website: "https://task-hive-otaa.vercel.app/",
  },
  {
    id: "sp3",
    title: "Dsaverse",
    summary: "DSA progress tracking platform with AI-powered roadmaps and performance analysis.",
    type: "web",
    color: "var(--accent-mint)",
    imageSrc: "/dsaverse.png",
    carouselImages: [
      "/dsaverse.png",
      "/dsaverse-2.png",
      "/dsaverse-3.png",
      "/dsaverse-4.png"
    ],
    github: "https://github.com/KhushiGusain/DSAverse",
    website: "https://dsaverse-1k1e.vercel.app/login",
  },
];

const skillCategories = [
  {
    title: "Backend",
    skills: [
      { label: "Java", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/java-light.svg" },
      { label: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { label: "Node.js", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/nodejs-light.svg" },
      { label: "REST APIs", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/expressjs-light.svg" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { label: "PostgreSQL", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/postgressql-light.svg" },
      { label: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { label: "MongoDB", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/mongodb-light.svg" },
      { label: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { label: "AWS", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons%232/aws-light.svg" },
      { label: "Docker", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/docker-light.svg" },
      { label: "CI/CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
      { label: "Git", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/git-light.svg" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { label: "React", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/react-light.svg" },
      { label: "Next.js", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/nextjs-light.svg" },
      { label: "Tailwind CSS", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/tailwindcss-light.svg" },
    ],
  },
];

const heroLinks = [
  { label: "GitHub", href: "https://github.com/KhushiGusain", icon: "github" as const },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/khushii-gusain-673b17282/", icon: "linkedin" as const },
  { label: "LeetCode", href: "https://leetcode.com/u/khushiigusain/", icon: "leetcode" as const },
];

function HeroLinkIcon({ type }: { type: "github" | "linkedin" | "leetcode" }) {
  const className = "h-[18px] w-[18px] shrink-0";

  if (type === "github") {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
      </svg>
    );
  }

  if (type === "leetcode") {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.877V2.926L8.496 6.212a1.374 1.374 0 0 0-.27.866v2.645l-3.132 3.103a1.374 1.374 0 0 0-.383.948v5.086c0 .512.282.978.733 1.216l5.402 2.869a1.374 1.374 0 0 0 1.298 0l5.402-2.869a1.374 1.374 0 0 0 .733-1.216v-5.086a1.374 1.374 0 0 0-.383-.948l-3.132-3.103V7.078a1.374 1.374 0 0 0-.27-.866L14.444.877A1.374 1.374 0 0 0 13.483 0zm-.316 1.096 3.494 3.494-3.494 3.494V1.096zm-1.334 0v6.988L8.655 4.59 11.833 1.096zM2.678 13.24l2.936-2.907 2.936 2.907-2.936 2.907-2.936-2.907zm16.644 0-2.936 2.907-2.936-2.907 2.936-2.907 2.936 2.907zM12 13.583l3.494 3.494H8.506l3.494-3.494z" />
      </svg>
    );
  }

  return null;
}

// Removed unused tech array

const techStacks = [
  { name: "React", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/react-light.svg" },
  { name: "Next.js", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/nextjs-light.svg" },
  { name: "TypeScript", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/typescript.svg" },
  { name: "JavaScript", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/javascript.svg" },
  { name: "Node.js", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/nodejs-light.svg" },
  { name: "Express", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/expressjs-light.svg" },
  { name: "MongoDB", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/mongodb-light.svg" },
  { name: "PostgreSQL", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/postgressql-light.svg" },
  { name: "Tailwind CSS", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/tailwindcss-light.svg" },
  { name: "Git", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/git-light.svg" },
  { name: "GitHub", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/github-light.svg" },
  { name: "Docker", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/docker-light.svg" },
  { name: "AWS", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons%232/aws-light.svg" },
  { name: "Python", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/python-light.svg" },
  { name: "Java", icon: "https://raw.githubusercontent.com/onemarc/tech-icons/main/icons/java-light.svg" },
];

function useHoverVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const onEnter = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  };
  const onLeave = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };
  return { ref, onEnter, onLeave } as const;
}

function smoothScrollTo(targetElement: Element, durationMs = 1400) {
  const startY = window.pageYOffset;
  const targetY = (targetElement as HTMLElement).getBoundingClientRect().top + window.pageYOffset;
  const startTime = performance.now();
  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const eased = easeInOutCubic(progress);
    const currentY = startY + (targetY - startY) * eased;
    window.scrollTo(0, currentY);
    if (elapsed < durationMs) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function Home() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const onClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      smoothScrollTo(target, 1500);
    };
    anchors.forEach((a) => a.addEventListener("click", onClick));
    return () => anchors.forEach((a) => a.removeEventListener("click", onClick));
  }, []);
  // Timeline smooth fill animation
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [timelineFillPct, setTimelineFillPct] = useState(0);
  const timelineFillRef = useRef(0);
  const [activeDots, setActiveDots] = useState<boolean[]>([]);
  const targetPctRef = useRef(0);
  const containerTopRef = useRef(0);
  const containerHeightRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [revealed, setRevealed] = useState<boolean[]>([]);
  const scheduledRevealRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const updateTargets = () => {
      const container = timelineContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = rect.bottom + window.scrollY;
      const height = Math.max(1, bottom - top);
      containerTopRef.current = top;
      containerHeightRef.current = height;
      const viewportBottom = window.scrollY + window.innerHeight;
      const lagPx = Math.max(100, Math.min(200, Math.floor(window.innerHeight * 0.14))); // keep a bit behind
      const filledPx = Math.max(0, Math.min(viewportBottom - top - lagPx, height));
      targetPctRef.current = Math.max(0, Math.min(1, filledPx / height));
    };
    const animate = () => {
      const current = timelineFillRef.current;
      const target = targetPctRef.current;
      const next = current + (target - current) * 0.06; // slower lerp for more visible fill
      timelineFillRef.current = next;
      setTimelineFillPct(next);
      // Update active dots based on smoothed fill
      const containerTop = containerTopRef.current;
      const containerHeight = containerHeightRef.current;
      const smoothedFilledPx = next * containerHeight;
      const nextActive = itemRefs.current.map((el) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const itemTop = r.top + window.scrollY;
        const relative = itemTop - containerTop;
        return relative <= smoothedFilledPx;
      });
      setActiveDots(nextActive);
      rafRef.current = requestAnimationFrame(animate);
    };
    updateTargets();
    animate();
    window.addEventListener("scroll", updateTargets, { passive: true } as AddEventListenerOptions);
    window.addEventListener("resize", updateTargets);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", updateTargets as EventListener);
      window.removeEventListener("resize", updateTargets as EventListener);
    };
  }, []);

  // Reveal animation for timeline cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = itemRefs.current.findIndex((el) => el === entry.target);
          if (idx === -1) return;
          if (entry.isIntersecting) {
            if (scheduledRevealRef.current.has(idx)) return;
            scheduledRevealRef.current.add(idx);
            const baseDelayMs = 220;
            const perItemStaggerMs = 120;
            setTimeout(() => {
              setRevealed((prev) => {
                if (prev[idx]) return prev;
                const next = prev.slice();
                next[idx] = true;
                return next;
              });
              scheduledRevealRef.current.delete(idx);
            }, baseDelayMs + idx * perItemStaggerMs);
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -10% 0px" }
    );
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="bg-dots corner-fade min-h-screen relative overflow-hidden">
      <div className="aurora-hero" />
      {/* Header */}
      <header className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <a
          href="#"
          className={`${logoFont.className} inline-flex items-baseline text-xl font-bold tracking-tight text-[var(--foreground)] transition-opacity hover:opacity-70`}
          aria-label="Khushi Gusain home"
        >
          gusainkhushii<span className="text-lime-700 dark:text-lime-500">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:underline" href="#projects">Projects</a>
          <a className="hover:underline" href="#experience">Experience</a>
          <a className="hover:underline" href="#skills">Skills</a>
          <a className="btn-nav btn-nav-primary ml-1 shrink-0" href="#connect">Contact Me</a>
        </nav>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </header>

      {/* Landing (Hero) */}
      <section className="mx-auto max-w-5xl px-6 pb-12 md:pb-14 pt-10 md:pt-14 lg:pt-16">
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-11 lg:gap-12">
          <div className="flex-1 min-w-0 md:max-w-xl lg:max-w-[34rem] text-left">
            <div className="space-y-2">
              <h1 className={`${categoryFont.className} text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]`}>
                Khushi Gusain
              </h1>
              <p className={`${taglineFont.className} text-sm md:text-[15px] tracking-wide text-lime-700 dark:text-lime-700`}>
                Turning ideas into software.
              </p>
            </div>
            <p className="mt-6 text-base md:text-[17px] leading-relaxed text-[var(--muted)]">
              From EdTech platforms to SaaS products, I've helped build and ship software in fast-paced product environments. Drawn to system design, reliability, and the engineering decisions that shape products at scale.
            </p>
            <div className="mt-7 flex w-full flex-wrap justify-start items-start gap-2.5">
              {heroLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex min-h-0 min-w-0 items-center gap-2.5 rounded-lg py-2.5 text-sm font-medium text-[var(--foreground)]/80 transition hover:text-[var(--foreground)] ${
                    index === 0 ? "pl-0 pr-4" : "px-4"
                  }`}
                >
                  <span className="text-[var(--foreground)]/55 transition group-hover:text-[var(--foreground)]/80">
                    <HeroLinkIcon type={link.icon} />
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="shrink-0 w-full max-w-[320px] sm:max-w-[340px] mx-auto md:mx-0 md:w-[360px] md:pt-1">
            <div className="overflow-hidden rounded-lg border border-black/10 dark:border-white/15">
              <Image
                src="/WhatsApp Image 2025-08-14 at 15.10.00.jpeg"
                alt="Khushi Gusain - Portfolio Hero Image"
                width={360}
                height={348}
                priority
                className="w-full h-[300px] sm:h-[318px] md:h-[348px] object-cover object-[center_18%] block"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Projects Grid styled like Hyperfolio: large cards with meta and tags */}
      <div className="relative">
        <div className="aurora-projects" />
        <ProjectsHyperfolio />
      </div>

      {/* Timeline - Vertical Layout */}
      <section id="experience" className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <h2 className="font-display text-3xl font-bold">Timeline</h2>
        <p className="text-[var(--muted)] mt-1">My professional and educational journey.</p>
        
        <div ref={timelineContainerRef} className="relative mt-10">
          {/* Desktop Vertical Line - centered */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-black/10 dark:bg-white/20 h-full" />
          {/* Mobile Vertical Line - left aligned */}
          <div className="block md:hidden absolute left-6 w-0.5 bg-black/10 dark:bg-white/20 h-full" />
          
          {/* Desktop Filled progress line */}
          <div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 rounded-full"
            style={{
              height: `${Math.max(0, Math.min(100, timelineFillPct * 100))}%`,
              background: isDarkMode 
                ? `linear-gradient(to bottom, var(--accent-blue), var(--accent))`
                : `linear-gradient(to bottom, rgba(186,230,253,0.6), rgba(59,130,246,0.9))`,
              boxShadow: isDarkMode
                ? `0 0 12px 2px rgba(132,204,22,0.35)`
                : `0 0 12px 2px rgba(59,130,246,0.35)`,
              transition: 'height 220ms ease-out'
            }}
          />
          {/* Mobile Filled progress line */}
          <div
            className="block md:hidden absolute left-6 w-0.5 rounded-full"
            style={{
              height: `${Math.max(0, Math.min(100, timelineFillPct * 100))}%`,
              background: isDarkMode 
                ? `linear-gradient(to bottom, var(--accent-blue), var(--accent))`
                : `linear-gradient(to bottom, rgba(186,230,253,0.6), rgba(59,130,246,0.9))`,
              boxShadow: isDarkMode
                ? `0 0 8px 2px rgba(132,204,22,0.25)`
                : `0 0 8px 2px rgba(59,130,246,0.25)`,
              transition: 'height 220ms ease-out'
            }}
          />
          
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0; // For alternating left/right on desktop
              return (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className="relative mb-12 md:mb-16 lg:mb-20 flex items-center w-full"
                >
                {/* Desktop Timeline Dot - centered */}
                <div
                  className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-10 transition-transform duration-300 ${
                    revealed[index] ? 'scale-100' : 'scale-75'
                  }`}
                  style={{
                    background: activeDots[index]
                      ? isDarkMode 
                        ? 'radial-gradient(circle at 50% 50%, rgba(132,204,22,1) 0%, rgba(132,204,22,0.85) 55%, rgba(132,204,22,0.7) 100%)'
                        : 'radial-gradient(circle at 50% 50%, rgba(59,130,246,1) 0%, rgba(59,130,246,0.85) 55%, rgba(59,130,246,0.7) 100%)'
                      : isDarkMode
                        ? 'rgba(132,204,22,0.4)'
                        : 'rgba(186,230,253,0.6)',
                    boxShadow: activeDots[index]
                      ? isDarkMode
                        ? '0 0 18px 8px rgba(132,204,22,0.45)'
                        : '0 0 18px 8px rgba(59,130,246,0.45)'
                      : isDarkMode
                        ? '0 0 8px 3px rgba(132,204,22,0.25)'
                        : '0 0 8px 3px rgba(186,230,253,0.25)',
                    transition: 'all 260ms ease-out'
                  }}
                />
                
                {/* Mobile Timeline Dot - left aligned */}
                <div
                  className={`block md:hidden absolute left-6 transform -translate-x-1/2 w-3 h-3 rounded-full z-10 transition-transform duration-300 ${
                    revealed[index] ? 'scale-100' : 'scale-75'
                  }`}
                  style={{
                    background: activeDots[index]
                      ? isDarkMode 
                        ? 'radial-gradient(circle at 50% 50%, rgba(132,204,22,1) 0%, rgba(132,204,22,0.85) 55%, rgba(132,204,22,0.7) 100%)'
                        : 'radial-gradient(circle at 50% 50%, rgba(59,130,246,1) 0%, rgba(59,130,246,0.85) 55%, rgba(59,130,246,0.7) 100%)'
                      : isDarkMode
                        ? 'rgba(132,204,22,0.4)'
                        : 'rgba(186,230,253,0.6)',
                    boxShadow: activeDots[index]
                      ? isDarkMode
                        ? '0 0 12px 4px rgba(132,204,22,0.35)'
                        : '0 0 12px 4px rgba(59,130,246,0.35)'
                      : isDarkMode
                        ? '0 0 6px 2px rgba(132,204,22,0.2)'
                        : '0 0 6px 2px rgba(186,230,253,0.2)',
                    transition: 'all 260ms ease-out'
                  }}
                />
                
                {/* Card Container */}
                <div className={`w-full md:w-1/2 ${
                  'pl-16 md:pl-0'
                } ${
                  isEven ? 'md:pr-12 md:mr-auto' : 'md:pl-12 md:ml-auto'
                }`}>
                  <div
                    className={`relative ${item.id === 't_open' ? 'overflow-visible' : 'overflow-hidden'} rounded-2xl border-2 bg-white p-4 md:p-6 flex flex-col gap-3 w-full md:w-80 lg:w-96 xl:w-[28rem] ${
                      isEven ? 'md:ml-auto' : 'md:mr-auto'
                    } transform-gpu transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                      revealed[index] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'
                    } ${
                      isDarkMode 
                        ? 'border-white/20 bg-white/5 backdrop-blur-sm shadow-[0_4px_0_0_rgba(255,255,255,0.1)]' 
                        : 'border-black/20 bg-white shadow-[0_6px_0_0_rgba(0,0,0,0.2)]'
                    }`}
                    style={{ transitionDelay: `${Math.min(index * 70, 350)}ms` }}
                  >
                    {/* Type-colored angled overlay - only in light mode */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[18px] dark:opacity-50"
                      style={{
                        background:
                          item.type === 'education'
                            ? `linear-gradient(${isEven ? 'to bottom right' : 'to bottom left'}, rgba(59,130,246,0.12), transparent 45%)`
                            : `linear-gradient(${isEven ? 'to bottom right' : 'to bottom left'}, rgba(163,230,53,0.12), transparent 45%)`,
                      }}
                    />
                    {/* Unique accent ribbon for 'Open to Work' */}
                    {item.id === 't_open' ? (
                      <>
                        <div className="pointer-events-none absolute -top-1 md:-top-2 -right-4 md:-right-6 lg:-right-8 rotate-12 z-20">
                          <span className={`inline-block bg-[var(--accent)] text-black text-[10px] md:text-xs font-semibold px-2 md:px-4 py-1 rounded-full border ${
                            isDarkMode 
                              ? 'border-white/20 shadow-[0_2px_0_0_rgba(255,255,255,0.12)]' 
                              : 'border-black/20 shadow-[0_2px_0_0_rgba(0,0,0,0.12)]'
                          }`}>Open to Work</span>
                        </div>
                      </>
                    ) : null}
                    <div className={`flex items-center justify-between text-left ${
                      isEven ? 'md:text-right' : 'md:text-left'
                    }`}>
                      <h3 className={`${categoryFont.className} text-xl font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                        {item.org}
                      </h3>
                      {item.id !== "t_open" ? (
                      <span className={`rounded-full px-3 py-1 w-fit text-sm font-medium border shrink-0 ${
                        item.type === "education"
                          ? "bg-[var(--accent-blue)]/30 border-[var(--accent-blue)]/40"
                          : "bg-[var(--accent)]/30 border-[var(--accent)]/40"
                      } ${
                        isDarkMode 
                          ? 'shadow-[0_2px_0_0_rgba(255,255,255,0.18)]' 
                          : 'shadow-[0_2px_0_0_rgba(0,0,0,0.18)]'
                      }`}>
                        {item.type === "education" ? "Education" : "Work"}
                      </span>
                      ) : null}
                    </div>
                    <div>
                      {item.id !== "t_open" ? (
                        <h4 className="text-md font-medium">{item.title}</h4>
                      ) : null}
                      {item.id !== "t_open" ? (
                        <p className="text-sm text-[var(--muted)] mt-1">
                          {formatTimelineRange(item.start, item.end)}
                        </p>
                      ) : null}
                      {item.details && item.details.length > 0 ? (
                        item.id === "t_open" ? (
                          <p className="mt-2 text-sm text-[var(--foreground)]/90">{item.details[0]}</p>
                        ) : (
                        <ul className="mt-2 space-y-1 text-sm list-disc list-inside text-left">
                          {item.details.map((d, i) => (
                            <li key={i} className="text-[var(--foreground)]/90">{d}</li>
                          ))}
                        </ul>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technical Knowledge */}
      <section id="skills" className="mx-auto max-w-6xl px-6 pt-8 pb-16">
        <h2 className="font-display text-3xl font-bold">Technical Knowledge</h2>
        <p className="text-[var(--muted)] mt-1">Key skills across backend, databases, cloud/devops & frontend.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <CardShell key={category.title}>
              <div className="p-6 h-full flex flex-col">
                <div className={`pb-4 border-b ${isDarkMode ? "border-white/20" : "border-black/15"}`}>
                  <h3 className={`${categoryFont.className} text-center text-2xl italic ${isDarkMode ? "text-white" : "text-black"}`}>
                    {category.title}
                  </h3>
                </div>
                <ul className="mt-4">
                  {category.skills.map((skill) => (
                    <SkillRow key={skill.label} label={skill.label} icon={skill.icon} />
                  ))}
                </ul>
              </div>
            </CardShell>
          ))}
        </div>
      </section>

      {/* Tech Stack (Marquee) */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-16 relative">
        <h2 className="font-display text-3xl font-bold">Tech Stack</h2>
        <p className="text-[var(--muted)] mt-1">Tools and technologies I use most.</p>
        <div className={`relative mt-8 overflow-hidden rounded-2xl border-2 bg-white ${
          isDarkMode 
            ? 'border-white/20 bg-white/5 backdrop-blur-sm shadow-[0_4px_0_0_rgba(255,255,255,0.1)]' 
            : 'border-black/20 bg-white shadow-[0_6px_0_0_rgba(0,0,0,0.2)]'
        }`}>
          {/* edge fade */}
          <div className={`pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent ${
            isDarkMode ? 'from-[rgba(255,255,255,0.95)]' : 'from-white'
          }`} />
          <div className={`pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent ${
            isDarkMode ? 'from-[rgba(255,255,255,0.95)]' : 'from-white'
          }`} />

          <div className="py-6">
            <div className="animate-marquee flex gap-10 md:gap-14 will-change-transform">
              {/* first set */}
              {techStacks.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center min-w-[96px]">
                  <div className="relative w-16 h-16 md:w-20 md:h-20">
                    <div className="absolute inset-0 rounded-xl bg-[var(--accent)]/10 blur-md" />
                    <div className={`relative w-full h-full rounded-xl border-2 bg-white p-2 ${
                      isDarkMode 
                        ? 'border-white/20 bg-white/10 shadow-[0_2px_0_0_rgba(255,255,255,0.1)]' 
                        : 'border-black/20 bg-white shadow-[0_3px_0_0_rgba(0,0,0,0.2)]'
                    }`}>
                      <Image src={tech.icon} alt={tech.name} fill className="object-contain p-1" unoptimized />
                    </div>
                  </div>
                  <span className="mt-2 text-xs sm:text-sm text-[var(--muted)]">{tech.name}</span>
                </div>
              ))}

              {/* duplicate set for seamless loop */}
              {techStacks.map((tech, i) => (
                <div key={`dup-${tech.name}-${i}`} className="flex flex-col items-center min-w-[96px]">
                  <div className="relative w-16 h-16 md:w-20 md:h-20">
                    <div className="absolute inset-0 rounded-xl bg-[var(--accent)]/10 blur-md" />
                    <div className={`relative w-full h-full rounded-xl border-2 bg-white p-2 ${
                      isDarkMode 
                        ? 'border-white/20 bg-white/10 shadow-[0_2px_0_0_rgba(255,255,255,0.1)]' 
                        : 'border-black/20 bg-white shadow-[0_3px_0_0_rgba(0,0,0,0.2)]'
                    }`}>
                      <Image src={tech.icon} alt={tech.name} fill className="object-contain p-1" unoptimized />
                    </div>
                  </div>
                  <span className="mt-2 text-xs sm:text-sm text-[var(--muted)]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section id="connect" className="mx-auto max-w-6xl px-6 pb-24 relative">
        <div className="aurora-connect" />
        <h2 className="font-display text-3xl font-bold">Let&apos;s Connect</h2>
        <p className="mt-2 text-[var(--muted)] text-lg">The best opportunities often start with a simple conversation. Let's connect.</p>
        
        {/* Contact Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resume Card */}
          <div className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'border-white/20 bg-white/5 backdrop-blur-sm' 
              : 'border-black/20 bg-white shadow-[0_4px_0_0_rgba(0,0,0,0.1)]'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-lavender)]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--accent-lavender)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Resume</h3>
                <p className="text-[var(--muted)] text-sm">Download my latest resume</p>
              </div>
            </div>
            <a className="btn btn-secondary w-full justify-center" href="https://drive.google.com/file/d/10KpKd17pdLdIV2E2EXoEvb24K5UtNlid/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          </div>

          {/* LinkedIn Card */}
          <div className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'border-white/20 bg-white/5 backdrop-blur-sm' 
              : 'border-black/20 bg-white shadow-[0_4px_0_0_rgba(0,0,0,0.1)]'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">LinkedIn</h3>
                <p className="text-[var(--muted)] text-sm">Professional network</p>
              </div>
            </div>
            <a className="btn btn-secondary w-full justify-center" href="https://www.linkedin.com/in/khushii-gusain-673b17282/" target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
          </div>

          {/* GitHub Card */}
          <div className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'border-white/20 bg-white/5 backdrop-blur-sm' 
              : 'border-black/20 bg-white shadow-[0_4px_0_0_rgba(0,0,0,0.1)]'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-800/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">GitHub</h3>
                <p className="text-[var(--muted)] text-sm">Code & projects</p>
              </div>
            </div>
            <a className="btn btn-secondary w-full justify-center" href="https://github.com/KhushiGusain" target="_blank" rel="noopener noreferrer">
              View GitHub
            </a>
          </div>
        </div>



        {/* Contact Details */}
        <div className="mt-16 text-center">
          <h3 className="font-display text-2xl font-bold mb-6">Contact Details</h3>
          <div className={`inline-flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border-2 ${
            isDarkMode 
              ? 'border-white/20 bg-white/5 backdrop-blur-sm' 
              : 'border-black/20 bg-white shadow-[0_4px_0_0_rgba(0,0,0,0.1)]'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-blue)]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--accent-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-[var(--muted)]">Delhi NCR, India</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[var(--muted)]">gusainkhushii@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-coral)]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--accent-coral)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-[var(--muted)]">8076592250</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SkillRow({ label, icon }: { label: string; icon: string }) {
  return (
    <li className="flex items-center gap-3 py-2.5 text-sm">
      <div className="relative h-6 w-6 shrink-0 rounded-md border border-black/8 dark:border-white/10 bg-white dark:bg-white/[0.04] p-1">
        <Image src={icon} alt="" fill className="object-contain" unoptimized aria-hidden />
      </div>
      <span className={`${skillFont.className} font-medium tracking-tight text-[var(--foreground)]/88`}>{label}</span>
    </li>
  );
}

function ProjectsSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-6 py-16">
      <div className="inline-block bg-[var(--accent-yellow)] px-3 py-1 rounded text-lg font-semibold">
        Featured Projects
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[1fr] gap-6 group">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            isDim={hovered !== null && hovered !== p.id}
            onEnter={() => setHovered(p.id)}
            onLeave={() => setHovered(null)}
            isWide={p.type === "app"}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  isDim,
  onEnter,
  onLeave,
  isWide,
}: {
  project: Project;
  isDim: boolean;
  onEnter: () => void;
  onLeave: () => void;
  isWide: boolean;
}) {
  const { ref, onEnter: play, onLeave: stop } = useHoverVideo();
  const rotate = project.id.charCodeAt(0) % 2 === 0 ? "rotate-2" : "-rotate-2";
  return (
    <div
      onMouseEnter={() => {
        onEnter();
        play();
      }}
      onMouseLeave={() => {
        onLeave();
        stop();
      }}
      className={`relative rounded-2xl border-2 border-black/10 p-5 transition will-change-transform shadow-[0_4px_0_0_#000] ${
        isDim ? "scale-95 opacity-70" : "scale-100"
      } ${rotate} ${isWide ? "sm:col-span-2 lg:col-span-3" : ""}`}
      style={{ backgroundColor: project.color }}
    >
      {project.type === "app" && project.videoSrc ? (
        <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-black/15 bg-black/5">
          <video
            ref={ref}
            src={project.videoSrc}
            className="h-full w-full object-cover"
            preload="none"
            muted
            loop
            playsInline
          />
        </div>
      ) : (
        <div className="h-40 rounded-xl bg-white/60 border border-black/10" />
      )}
      <h3 className="mt-4 font-semibold">{project.title}</h3>
      <p className="text-sm text-[var(--muted)]">{project.summary}</p>
      {project.type === "app" && project.videoSrc ? (
        <noscript>
          {/* poster fallback */}
          App demo video
        </noscript>
      ) : null}
    </div>
  );
}

function ProjectsHyperfolio() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<"industry" | "self">("industry");
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  // Three-card layout: two horizontal left, one vertical right
  const twoLeft = projects.filter((p) => p.orientation !== "vertical").slice(0, 2);
  const rightVertical = projects.find((p) => p.orientation === "vertical") ?? projects[1];

  return (
      <section id="projects" className="mx-auto max-w-6xl px-6 pt-4 md:pt-6 pb-2 md:pb-3">
       <div className="mx-auto max-w-6xl px-4 md:px-6">
         <h2 className="font-display text-3xl text-center font-bold">Recent Projects</h2>
         
         {/* Project Type Switch */}
         <div className="flex items-center justify-center mt-4 mb-6">
           <span className="text-sm font-medium text-[var(--foreground)] mr-3">Industry Work</span>
           <button
             onClick={() => setProjectType(projectType === "industry" ? "self" : "industry")}
             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
               projectType === "self" ? "bg-[var(--accent-blue)]" : "bg-[var(--accent-lavender)]"
             } ${
               isDarkMode 
                 ? 'focus:ring-[var(--accent-blue)] focus:ring-offset-[var(--background)]' 
                 : 'focus:ring-[var(--accent-blue)] focus:ring-offset-white'
             }`}
           >
             <span
               className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                 projectType === "self" ? "translate-x-6" : "translate-x-1"
               }`}
             />
           </button>
           <span className="text-sm font-medium text-[var(--foreground)] ml-3">Self Projects</span>
         </div>
       </div>

               {/* Conditional Project Grids */}
        {projectType === "industry" ? (
          <div className="mt-2">
            {/* Mobile: Stacked layout */}
            <div className="block md:hidden space-y-6 px-2">
              {rightVertical && (
                <div className="h-96">
                  <ProjectTall p={rightVertical} hovered={hovered} setHovered={setHovered} />
                </div>
              )}
              {twoLeft[0] && (
                <div className="h-64">
                  <ProjectWide p={twoLeft[0]} hovered={hovered} setHovered={setHovered} />
                </div>
              )}
              {twoLeft[1] && (
                <div className="h-64">
                  <ProjectWide p={twoLeft[1]} hovered={hovered} setHovered={setHovered} />
                </div>
              )}
            </div>
            
            {/* Desktop: Grid layout */}
            <div className="hidden md:grid h-screen grid-cols-4 grid-rows-6 gap-3 px-3">
              {/* Right tall card */}
              <div className="col-start-3 row-start-1 col-span-2 row-span-6">
                <ProjectTall p={rightVertical} hovered={hovered} setHovered={setHovered} />
              </div>
              {/* Left top horizontal */}
              {twoLeft[0] && (
                <div className="col-start-1 row-start-1 col-span-2 row-span-3">
                  <ProjectWide p={twoLeft[0]} hovered={hovered} setHovered={setHovered} />
                </div>
              )}
              {/* Left bottom horizontal */}
              {twoLeft[1] && (
                <div className="col-start-1 row-start-4 col-span-2 row-span-3">
                  <ProjectWide p={twoLeft[1]} hovered={hovered} setHovered={setHovered} />
                </div>
              )}
            </div>
          </div>
                                ) : (
          <div className="mt-2">
            {/* Mobile: Stacked layout */}
            <div className="block md:hidden space-y-6 px-2">
              <div className="h-80">
                <SelfProjectCard project={selfProjects[0]} />
              </div>
              <div className="h-80">
                <SelfProjectCard project={selfProjects[1]} />
              </div>
              <div className="h-80">
                <SelfProjectCard project={selfProjects[2]} />
              </div>
            </div>
            
            {/* Desktop: Grid layout */}
            <div className="hidden md:grid h-screen grid-cols-2 grid-rows-2 gap-3 px-3">
              {/* Top Left: Blog Posts Generator */}
              <div className="col-start-1 row-start-1 col-span-1 row-span-1">
                <SelfProjectCard project={selfProjects[0]} />
              </div>
              {/* Top Right: TaskHive */}
              <div className="col-start-2 row-start-1 col-span-1 row-span-1">
                <SelfProjectCard project={selfProjects[1]} />
              </div>
              {/* Bottom Left: DSAverse */}
              <div className="col-start-1 row-start-2 col-span-1 row-span-1">
                <SelfProjectCard project={selfProjects[2]} />
              </div>
            </div>
          </div>
         )}
    </section>
  );
}

function CardShell({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <article
      className={`group h-full rounded-3xl border-2 bg-white overflow-hidden transition-all duration-500 ease-out hover:scale-[1.08] ${
        dim ? "opacity-70 scale-[0.99]" : "opacity-100"
      } ${
        isDarkMode 
          ? 'border-white/20 bg-white/5 backdrop-blur-sm shadow-[0_4px_0_0_rgba(255,255,255,0.1)] hover:shadow-[0_12px_0_0_rgba(255,255,255,0.15)]' 
          : 'border-black/20 bg-white shadow-[0_6px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_12px_0_0_rgba(0,0,0,0.25)]'
      }`}
    >
      {children}
    </article>
  );
}



function SelfProjectCard({ project }: { project: Project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Auto-advance carousel every 4 seconds if multiple images exist
  useEffect(() => {
    if (project.carouselImages && project.carouselImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.carouselImages!.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [project.carouselImages]);

  return (
    <CardShell>
      <div 
        className="h-full flex flex-col relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background color overlay - only in light mode */}
        <div 
          className={`absolute inset-0 rounded-[20px] ${isDarkMode ? 'opacity-10' : 'opacity-30'}`}
          style={{ backgroundColor: project.color }}
        />
        
        {/* Project Image Carousel - expanded to show more of the image */}
        <div className="relative flex-1 mt-6 mx-6 mb-0 z-10">
          <div className="w-full h-full rounded-lg overflow-hidden">
            {project.carouselImages && project.carouselImages.length > 1 ? (
              // Carousel with multiple images
              <div className="relative w-full h-full">
                {project.carouselImages.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className={`object-cover transition-all duration-1000 ease-in-out ${
                      index === currentImageIndex 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95'
                    } ${isHovered ? 'scale-110' : 'scale-100'}`}
                    unoptimized
                  />
                ))}
              </div>
            ) : (
              // Single image fallback
              project.imageSrc && (
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  fill
                  className={`object-cover transition-all duration-500 ease-out ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                  priority
                />
              )
            )}
          </div>
        </div>
        
        {/* Carousel Navigation Dots - only show if multiple images */}
        {project.carouselImages && project.carouselImages.length > 1 && (
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {project.carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Footer overlay with details - more compact layout */}
        <div className={`relative z-10 backdrop-blur border-t px-3 py-2 ${
          isDarkMode 
            ? 'bg-black/80 border-white/20 shadow-[0_-2px_0_0_rgba(255,255,255,0.05)]' 
            : 'bg-white/95 border-black/10 shadow-[0_-2px_0_0_rgba(0,0,0,0.08)]'
        }`}>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
            <span className={`rounded-full px-2 py-0.5 ${
              isDarkMode ? 'bg-white/10' : 'bg-black/5'
            }`}>2024</span>
            <span className={`rounded-full px-2 py-0.5 capitalize ${
              isDarkMode ? 'bg-white/10' : 'bg-black/5'
            }`}>{project.type}</span>
            <span className={`rounded-full px-2 py-0.5 ${
              isDarkMode ? 'bg-white/10' : 'bg-black/5'
            }`}>Personal</span>
          </div>
          <div className="mt-1 flex items-center justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold line-clamp-1">{project.title}</h3>
              <p className="text-[var(--muted)] text-xs line-clamp-1 mt-0.5">{project.summary}</p>
            </div>
            <div className="shrink-0 flex gap-1">
              {project.github && (
                <a className={`btn btn-secondary h-7 px-2 text-xs ${
                  isDarkMode ? '!bg-white/10' : '!bg-white'
                }`} href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              )}
              {project.website && (
                <a className={`btn btn-secondary h-7 px-2 text-xs ${
                  isDarkMode ? '!bg-white/10' : '!bg-white'
                }`} href={project.website} target="_blank" rel="noopener noreferrer">Demo</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function ProjectWide({
  p,
  hovered,
  setHovered,
}: {
  p: Project;
  hovered: string | null;
  setHovered: (id: string | null) => void;
}) {
  const isHovered = hovered === p.id;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Carousel images for top left container (p1 - "Brand System")
  const topLeftImages = [
    "/project-left-2.png",
    "/project-brand-1.png",
    "/project-brand-2.png",
    "/project-brand-3.png"
  ];
  
  // Carousel images for bottom left container (p3 - "Marketing Site")
  const bottomLeftImages = [
    "/project-left-1.png",
    "/project-left-bottom-1.png",
    "/project-left-bottom-2.png"
  ];
  
  // Auto-advance carousel every 4 seconds for both containers
  useEffect(() => {
    if (p.id === "p1" || p.id === "p3") { // For both left containers
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const maxIndex = p.id === "p1" ? topLeftImages.length - 1 : bottomLeftImages.length - 1;
          return (prev + 1) % (maxIndex + 1);
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [p.id, topLeftImages.length, bottomLeftImages.length]);
  
  return (
    <CardShell dim={hovered !== null && hovered !== p.id}>
      <div
        onMouseEnter={() => setHovered(p.id)}
        onMouseLeave={() => setHovered(null)}
        className="relative h-full transition-all duration-500 ease-out"
      >
        {/* Media fills the entire card */}
        <div className={`absolute inset-0 rounded-[20px] ${isDarkMode ? 'opacity-10' : 'opacity-30'}`} style={{ backgroundColor: p.color }}>
          {p.type === "app" && p.videoSrc ? (
            <video className="h-full w-full object-cover" src={p.videoSrc} muted loop playsInline preload="none" />
          ) : null}
        </div>
        
        {/* Project Image - with carousel for both left containers */}
        <div className="absolute inset-0 z-5 overflow-hidden rounded-[20px]">
          {p.id === "p1" ? (
            // Carousel for top left container (Brand System)
            <div className="relative w-full h-full">
              {topLeftImages.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Project screenshot ${index + 1}`}
                  fill
                  className={`object-cover transition-all duration-1000 ease-in-out ${
                    index === currentImageIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95'
                  } ${isHovered ? 'scale-110' : 'scale-100'}`}
                  unoptimized
                />
              ))}
            </div>
          ) : p.id === "p3" ? (
            // Carousel for bottom left container (Marketing Site)
            <div className="relative w-full h-full">
              {bottomLeftImages.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Project screenshot ${index + 1}`}
                  fill
                  className={`object-cover transition-all duration-1000 ease-in-out ${
                    index === currentImageIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95'
                  } ${isHovered ? 'scale-110' : 'scale-100'}`}
                  unoptimized
                />
              ))}
            </div>
          ) : null}
        </div>
        
        {/* Carousel Navigation Dots for both left containers */}
        {(p.id === "p1" || p.id === "p3") && (
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            {(p.id === "p1" ? topLeftImages : bottomLeftImages).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
          )}
        
        {/* Footer overlay with details */}
        <div className={`absolute inset-x-0 bottom-0 z-10 backdrop-blur border-t px-3 py-2 md:px-4 md:py-3 ${
          isDarkMode 
            ? 'bg-black/80 border-white/20 shadow-[0_-2px_0_0_rgba(255,255,255,0.05)]' 
            : 'bg-white/95 border-black/10 shadow-[0_-2px_0_0_rgba(0,0,0,0.08)]'
        }`}>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
            <span className={`rounded-full px-3 py-1 ${
              isDarkMode ? 'bg-white/10' : 'bg-black/5'
            }`}>{p.id === "p3" ? "2025" : "2024"}</span>
            <span className={`rounded-full px-3 py-1 capitalize ${
              isDarkMode ? 'bg-white/10' : 'bg-black/5'
            }`}>{p.type}</span>
            <span className={`rounded-full px-3 py-1 ${
              isDarkMode ? 'bg-white/10' : 'bg-black/5'
            }`}>{p.id === "p1" ? "Edtech" : "SaaS"}</span>
          </div>
          <div className="mt-1 flex items-start justify-between gap-3">
            <div className="flex-1 min-h-[4rem]">
              <h3 className="text-lg md:text-xl font-semibold line-clamp-2">{p.title}</h3>
              <p className="text-[var(--muted)] text-xs md:text-sm line-clamp-3 mt-1">{p.summary}</p>
            </div>
            <div className="shrink-0 mt-8">
              <a className={`btn btn-secondary h-8 px-3 ${
                isDarkMode ? '!bg-white/10' : '!bg-white'
              }`} href={p.id === "p1" ? "https://ezlearn.in" : p.id === "p2" ? "https://github.com/KhushiGusain/CLIStock" : p.id === "p3" ? "https://catlysis.com" : "#"} target="_blank" rel="noopener noreferrer">Visit</a>
            </div>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function ProjectTall({
  p,
  hovered,
  setHovered,
}: {
  p: Project;
  hovered: string | null;
  setHovered: (id: string | null) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const images = [
    "/project-screenshot.png",
    "/project-vertical-1.png", 
    "/project-vertical-2.png"
  ];

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <CardShell dim={hovered !== null && hovered !== p.id}>
      <div
        onMouseEnter={() => setHovered(p.id)}
        onMouseLeave={() => setHovered(null)}
        className="relative h-full"
      >
        {/* Media fills entire card */}
        <div className={`absolute inset-0 rounded-[20px] ${isDarkMode ? 'opacity-10' : 'opacity-30'}`} style={{ backgroundColor: p.color }}>
          {p.type === "app" && p.videoSrc ? (
            <video className="h-full w-full object-cover" src={p.videoSrc} muted loop playsInline preload="none" />
          ) : null}
        </div>
        
        {/* Project Image Carousel - positioned in middle, touching bottom, with medium margins */}
        <div className="absolute inset-0 flex items-end justify-center pb-16 px-8 pt-8 z-5">
          <div className="relative w-full h-full flex items-center justify-center">
            {images.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Project screenshot ${index + 1}`}
                width={400}
                height={600}
                className={`absolute max-w-full max-h-full object-contain drop-shadow-2xl transition-all duration-1000 ease-in-out ${
                  index === currentImageIndex 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-95'
                }`}
                unoptimized
              />
            ))}
          </div>
        </div>
        
        {/* Carousel Navigation Dots */}
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-10 flex flex-col gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
        
        {/* Bottom overlay */}
        <div className={`absolute inset-x-0 bottom-0 z-10 backdrop-blur border-t px-3 py-2 md:px-4 md:py-3 ${
          isDarkMode 
            ? 'bg-black/80 border-white/20 shadow-[0_-2px_0_0_rgba(255,255,255,0.05)]' 
            : 'bg-white/95 border-black/10 shadow-[0_-2px_0_0_rgba(0,0,0,0.08)]'
        }`}>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
            <span className={`rounded-full px-3 py-1 ${
              isDarkMode ? 'bg-white/10' : 'bg-black/5'
            }`}>2025</span>
            <span className={`rounded-full px-3 py-1 capitalize ${
              isDarkMode ? 'bg-white/10' : 'bg-black/5'
            }`}>{p.type}</span>
            <span className={`rounded-full px-3 py-1 ${
              isDarkMode ? 'bg-white/10' : 'bg-black/5'
            }`}>Fintech</span>
          </div>
          <div className="mt-1 min-h-[4rem]">
            <h3 className="text-lg md:text-xl font-semibold line-clamp-2">{p.title}</h3>
            <p className="text-[var(--muted)] text-xs md:text-sm line-clamp-3 mt-1">{p.summary}</p>
          </div>
          <div className="mt-2 text-sm">
            <a className={`btn btn-secondary h-8 px-3 ${
              isDarkMode ? '!bg-white/10' : '!bg-white'
            }`} href="https://github.com/KhushiGusain/CLIStock" target="_blank" rel="noopener noreferrer">Visit</a>
          </div>
        </div>
      </div>
    </CardShell>
  );
}
