import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import FadeIn from './FadeIn';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

/* ─── Three.js Particle System ─────────────────────────────────────── */
const useParticles = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 3;

    // Particles geometry
    const COUNT = 1400;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const warm = new THREE.Color('#ff8c42');
    const cool = new THREE.Color('#7c6ff7');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const pick = Math.random();
      const c = pick < 0.4 ? warm : pick < 0.7 ? cool : white;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Mouse parallax
    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 0.3;
      my = (e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener('mousemove', onMove);

    // Resize
    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animate
    let raf: number;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.025 + mx;
      points.rotation.x = t * 0.012 - my;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [canvasRef]);
};

/* ─── GSAP Entrance Animations ─────────────────────────────────────── */
const useGsapEntrance = (ready: boolean) => {
  useEffect(() => {
    if (!ready) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.gsap-nav',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }
    )
    .fromTo('.gsap-badge',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.5'
    )
    .fromTo('.gsap-name',
      { y: 80, opacity: 0, skewY: 4 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.1, stagger: 0.12 },
      '-=0.4'
    )
    .fromTo('.gsap-subtitle',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    )
    .fromTo('.gsap-bottom',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
      '-=0.4'
    );
  }, [ready]);
};

/* ─── Hero Section ──────────────────────────────────────────────────── */
const HeroSection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const [muted, setMuted]               = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const [videoReady, setVideoReady]     = useState(false);

  useParticles(canvasRef);
  useGsapEntrance(true);

  // Sound hint auto-hide
  useEffect(() => {
    const t = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Auto-mute when scrolled away
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (!e.isIntersecting) { const v = videoRef.current; if (v && !v.muted) { v.muted = true; setMuted(true); } } },
      { threshold: 0, rootMargin: '-50% 0px 0px 0px' }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // Snap-scroll wheel
  useEffect(() => {
    let fired = false;
    const go = () => { if (fired) return; fired = true; document.getElementById('about')?.scrollIntoView({ behavior: 'auto' }); };
    const onWheel = (e: WheelEvent) => { if (fired || e.deltaY <= 0 || window.scrollY > 50) return; e.preventDefault(); go(); };
    const onKey   = (e: KeyboardEvent) => { if (fired || window.scrollY > 50) return; if (['ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); go(); } };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey); };
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowSoundHint(false);
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">

      {/* ── Ambient blurred background video ── */}
      <video
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 h-full w-full object-cover scale-110"
        style={{ filter: 'blur(28px) brightness(0.35)', transform: 'scale(1.12)' }}
        aria-hidden
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* ── Foreground cinematic video ── */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline preload="auto"
        onCanPlay={() => setVideoReady(true)}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* ── Three.js particle canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{ zIndex: 3 }}
      />

      {/* ── Cinematic gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-black/45" style={{ zIndex: 4 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" style={{ zIndex: 4 }} />
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ zIndex: 4, background: 'linear-gradient(to top, #0C0C0C, transparent)' }} />

      {/* ── Content layer ── */}
      <div className="relative flex h-full flex-col" style={{ zIndex: 5 }}>

        {/* Top nav */}
        <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          <ul className="flex items-center gap-5 sm:gap-8 md:gap-12">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="gsap-nav" style={{ opacity: 0 }}>
                <a
                  href={link.href}
                  className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="gsap-nav inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-[1.03]"
            style={{ opacity: 0 }}
          >
            Email me
          </a>
        </div>

        {/* Center name block */}
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-7xl px-6 md:px-10">

            <p
              className="gsap-badge mb-4 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-white/60"
              style={{ opacity: 0 }}
            >
              Portfolio · 2026
            </p>

            <h1
              className="font-black uppercase leading-[0.88] tracking-tight text-white"
              style={{ fontSize: 'clamp(3rem, 12vw, 10.5rem)' }}
            >
              <span className="gsap-name block" style={{ opacity: 0 }}>Suraj</span>
              <span className="gsap-name block" style={{ opacity: 0 }}>Fate</span>
            </h1>

            <p
              className="gsap-subtitle mt-5 md:mt-7 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-white/75"
              style={{ opacity: 0 }}
            >
              AI Engineer · GenAI / Agentic Systems · LLMOps
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-10 md:pb-12">
          {/* Scroll indicator */}
          <a
            href="#about"
            aria-label="Scroll to next section"
            className="gsap-bottom group flex flex-col items-center gap-3"
            style={{ opacity: 0 }}
          >
            <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 transition group-hover:text-white">
              Scroll
            </span>
            <div className="relative h-12 w-px overflow-hidden bg-white/20">
              <span
                className="absolute inset-x-0 top-0 h-1/2 w-full bg-white"
                style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }}
              />
            </div>
          </a>

          {/* Mute + Sound hint */}
          <div className="gsap-bottom flex items-center gap-3" style={{ opacity: 0 }}>
            {showSoundHint && (
              <span
                className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.25em] text-white/80"
                style={{ animation: 'pulseFade 2s ease-in-out infinite' }}
              >
                Tap for sound
              </span>
            )}
            <button
              onClick={toggleMute}
              aria-label={muted ? 'Unmute video' : 'Mute video'}
              className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-110"
            >
              {muted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
