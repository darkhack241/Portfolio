import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import AnimatedText from './AnimatedText';

const ABOUT_TEXT =
  "AI Engineer with production experience building GenAI systems, multi-agent orchestration platforms, RAG pipelines, and scalable backend services on AWS. Delivered systems handling 500+ daily queries at sub-200ms p95 latency. Recognised with Rockstar of the Month & Pinnacle Award at Zepto. CGPA 9.6/10.";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#D7E2EA 0,#D7E2EA 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#D7E2EA 0,#D7E2EA 1px,transparent 1px,transparent 60px)',
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20">
          {/* Photo */}
          <FadeIn delay={0.1} y={30}>
            <div
              className="relative mx-auto overflow-hidden rounded-full border-2 border-[#D7E2EA]/20"
              style={{ width: 'clamp(110px, 18vw, 180px)', height: 'clamp(110px, 18vw, 180px)' }}
            >
              <img
                src="/suraj.jpg"
                alt="Suraj Fate"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </FadeIn>

          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium leading-relaxed text-[#D7E2EA] max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          {/* Skills */}
          <FadeIn delay={0.15} className="w-full max-w-3xl">
            <div className="flex flex-col gap-5 sm:gap-6">
              {[
                {
                  label: 'AI / GenAI',
                  items: ['LangGraph', 'CrewAI', 'LangChain', 'LlamaIndex', 'OpenAI', 'HuggingFace', 'Whisper'],
                },
                {
                  label: 'ML / DL',
                  items: ['PyTorch', 'LoRA/QLoRA', 'RAG', 'FAISS', 'Pinecone', 'RAGAS', 'MLflow'],
                },
                {
                  label: 'Backend',
                  items: ['FastAPI', 'Flask', 'Django', 'Spring Boot', 'PostgreSQL', 'Redis', 'MongoDB'],
                },
                {
                  label: 'Cloud & DevOps',
                  items: ['AWS EC2/S3/Lambda', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD'],
                },
                {
                  label: 'Languages',
                  items: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript'],
                },
              ].map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5"
                >
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 sm:w-44 sm:shrink-0 sm:text-right">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] px-3 py-1 text-sm text-[#D7E2EA]/80 hover:border-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
