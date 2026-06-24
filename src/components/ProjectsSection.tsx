import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  githubUrl?: string;
  liveUrl?: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

const PROJECTS: ProjectData[] = [
  // ── Suraj's AI Projects ───────────────────────────────────────────────────
  {
    number: '01',
    category: 'Agentic AI · Automation',
    name: 'Autonomous AI Employee System',
    githubUrl: 'https://github.com/surajfate/autonomous-ai-employee',
    col1Image1: '/proj-autonomous.png',
    col1Image2: '/proj-autonomous.png',
    col2Image: '/proj-autonomous.png',
  },
  {
    number: '02',
    category: 'RAG · Multimodal AI',
    name: 'Multimodal RAG Knowledge Assistant',
    githubUrl: 'https://github.com/surajfate/multimodal-rag',
    col1Image1: '/proj-rag.png',
    col1Image2: '/proj-rag.png',
    col2Image: '/proj-rag.png',
  },
  {
    number: '03',
    category: 'Real-Time AI · Full Stack',
    name: 'Real-Time AI Interview Copilot',
    githubUrl: 'https://github.com/surajfate',
    col1Image1: '/proj-copilot.png',
    col1Image2: '/proj-copilot.png',
    col2Image: '/proj-copilot.png',
  },
  {
    number: '04',
    category: 'LLMOps · Fine-Tuning',
    name: 'LLM Fine-Tuning & Evaluation Pipeline',
    githubUrl: 'https://github.com/surajfate/llm-finetune-pipeline',
    col1Image1: '/proj-finetune.png',
    col1Image2: '/proj-finetune.png',
    col2Image: '/proj-finetune.png',
  },
  // ── Collaborator Projects (Harsh Goyal) ──────────────────────────────────
  {
    number: '05',
    category: 'Web · Design',
    name: 'Forge',
    liveUrl: 'https://forge-pink-seven.vercel.app/',
    col1Image1: '/Forge.png',
    col1Image2: '/Forge1.png',
    col2Image: '/Forge2.png',
  },
  {
    number: '06',
    category: 'Web · GenAI',
    name: 'LawLab',
    liveUrl: 'https://lawlab-self.vercel.app',
    col1Image1: '/lawlab.png',
    col1Image2: '/lawlab1.png',
    col2Image: '/lawlab2.png',
  },
  {
    number: '07',
    category: 'GenAI · SaaS',
    name: 'ResumeIQ',
    liveUrl: 'https://resumeiq-harsh.vercel.app/',
    col1Image1: '/resumeiq-hero.png',
    col1Image2: '/resumeiq-feedback.png',
    col2Image: '/resumeiq-score.png',
  },
  {
    number: '08',
    category: 'Web · Design',
    name: 'Notch',
    liveUrl: 'https://notch-zeta.vercel.app/',
    col1Image1: '/notch-hero.png',
    col1Image2: '/notch-pricing.png',
    col2Image: '/notch-mockup.png',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
}

const ProjectCard = ({ project, index, total }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const href = project.liveUrl ?? project.githubUrl ?? '#';
  const isGithub = !project.liveUrl && !!project.githubUrl;

  return (
    <div
      ref={cardRef}
      className="sticky w-full"
      style={{ top: `${96 + index * 24}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-6 md:gap-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        {/* Top row: number + meta + button */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">
            <div
              className="shrink-0 font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              <span
                className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
                style={{ fontSize: 'clamp(0.65rem, 1.2vw, 1rem)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/30 bg-[#D7E2EA]/5 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition hover:bg-[#D7E2EA]/15 hover:border-[#D7E2EA]/60 hover:scale-[1.03] w-full sm:w-auto justify-center"
            >
              {isGithub ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Project
                </>
              )}
            </a>
          </div>
        </div>

        {/* Bottom row: two-column image grid */}
        <div className="grid grid-cols-[40%_60%] gap-3 sm:gap-4 md:gap-5 flex-1 min-h-0">
          {/* Left column - 2 stacked */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 min-h-0">
            <div
              className="overflow-hidden rounded-[28px] sm:rounded-[36px] md:rounded-[44px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div
              className="overflow-hidden rounded-[28px] sm:rounded-[36px] md:rounded-[44px]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>

          {/* Right column - 1 tall */}
          <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] md:rounded-[44px] min-h-0">
            <img
              src={project.col2Image}
              alt={`${project.name} preview 3`}
              className="h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p className="text-center font-light uppercase tracking-[0.3em] text-[#D7E2EA]/40 mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)' }}
        >
          01–04 · Suraj Fate &nbsp;·&nbsp; 05–08 · Collaborator Builds
        </p>
      </FadeIn>

      <div className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
