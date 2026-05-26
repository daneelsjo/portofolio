'use client';

import { useState, useEffect } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const SECTION_IDS = ['projects', 'kitchen', 'skills', 'contact'];

const NAV_LINKS = [
  { href: '#projects', label: 'Projecten', id: 'projects' },
  { href: '#kitchen',  label: 'In de Keuken', id: 'kitchen' },
  { href: '#skills',   label: 'Skills', id: 'skills' },
  { href: '#contact',  label: 'Contact', id: 'contact' },
];

const PROJECTS = [
  {
    id: 1,
    title: 'BrandweerZone Dashboard',
    challenge:
      'De brandweerzone had geen centraal overzicht voor het opvolgen van interventies en voertuigbeschikbaarheid in real-time.',
    solution:
      'Real-time dashboard gebouwd met Firebase Firestore als backend en Next.js voor de frontend. Live updates via Firestore listeners zonder polling.',
    stack: ['Next.js', 'Firebase', 'Tailwind CSS', 'TypeScript'],
    gradientClass: 'from-emerald-500 to-cyan-500',
    glowClass: 'group-hover:shadow-emerald-500/20',
    githubUrl: null,       // 'https://github.com/...' — null = knop verborgen
    liveUrl: null,         // 'https://...' — null = knop verborgen
    screenshot: null,      // '/screenshots/project1.jpg' — null = geen afbeelding
  },
  {
    id: 2,
    title: 'Multi-Tenant SaaS Billing',
    challenge:
      'Een startup had een schaalbaar facturatiesysteem nodig dat multi-tenant werkte zonder zware infrastructuurkosten.',
    solution:
      'Gebouwd met Next.js App Router, Stripe voor betalingen en Firebase voor auth & data. Volledig geïsoleerde tenant workspaces via Firebase Security Rules.',
    stack: ['Next.js', 'Stripe', 'Firebase', 'Node.js'],
    gradientClass: 'from-violet-500 to-purple-500',
    glowClass: 'group-hover:shadow-violet-500/20',
    githubUrl: null,
    liveUrl: null,
    screenshot: null,
  },
  {
    id: 3,
    title: 'JAMStack Portfolio Engine',
    challenge:
      'Een creatief bureau wilde een razendsnelle website zonder de overhead en veiligheidsproblemen van WordPress.',
    solution:
      'JAMStack aanpak met Next.js statische export en Markdown content. Deploy in seconden via Firebase Hosting met automatische cache-headers.',
    stack: ['Next.js', 'Tailwind CSS', 'Markdown', 'Firebase Hosting'],
    gradientClass: 'from-rose-500 to-orange-400',
    glowClass: 'group-hover:shadow-rose-500/20',
    githubUrl: null,
    liveUrl: null,
    screenshot: null,
  },
];

const KITCHEN = [
  {
    id: 1,
    title: 'Multi-Tenant SaaS Platform',
    statusClass: 'status-dev',
    statusLabel: 'In Ontwikkeling',
    description:
      'Hoe geef je elke klant een volledig geïsoleerde workspace zonder de infrastructuurkosten te laten exploderen? Ik combineer Firebase Security Rules met custom tenant-ID middleware — geen separate databases, wel perfecte isolatie.',
    tags: ['Next.js', 'Firebase', 'Multi-tenant', 'SaaS'],
  },
  {
    id: 2,
    title: 'Embedded Feedback Widget',
    statusClass: 'status-concept',
    statusLabel: 'Concept',
    description:
      'Een lichtgewicht JS widget (&lt; 5 kb) die je met één script-tag integreert op elke website. Gebruikers laten feedback achter, maken screenshots, rapporteren bugs. Jij ziet alles in een real-time dashboard.',
    tags: ['Vanilla JS', 'Firebase', 'Widget SDK', 'Canvas API'],
  },
  {
    id: 3,
    title: 'AI Code Review Bot',
    statusClass: 'status-beta',
    statusLabel: 'Bèta',
    description:
      'Een GitHub Action die automatisch pull requests reviewt via de Claude API. Detecteert bugs, security issues en stijlproblemen — en suggereert concrete fixes. Bespaart kleine teams uren aan handmatige review.',
    tags: ['GitHub Actions', 'Claude API', 'Node.js', 'CI/CD'],
  },
];

const SKILLS = [
  { name: 'Next.js',     level: 'Basis', color: 'text-slate-200' },
  { name: 'React',       level: 'Basis', color: 'text-cyan-400' },
  { name: 'TypeScript',  level: 'Basis', color: 'text-blue-400' },
  { name: 'Tailwind CSS',level: 'Basis', color: 'text-sky-400' },
  { name: 'Firebase',    level: 'Gevorderd', color: 'text-orange-400' },
  { name: 'Node.js',     level: 'Basis', color: 'text-emerald-400' },
  { name: 'GitHub',      level: 'Gevorderd', color: 'text-slate-300' },
  { name: 'Figma',       level: 'Basis', color: 'text-fuchsia-400' },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useActiveSection() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);
  return active;
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useShowBackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return show;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function IconLinkedIn({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconGitHub({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconArrow({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function IconMenu({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function IconClose({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconChevronUp({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );
}

function IconExternalLink({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

// ─── Components ──────────────────────────────────────────────────────────────

function Navbar({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="max-w-5xl mx-auto glass rounded-2xl px-5 py-3 flex items-center justify-between">
        <span className="font-extrabold text-lg gradient-text tracking-tight">JD.</span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 relative pb-1
                ${activeSection === link.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden md:inline-flex btn-primary py-2 px-4 text-xs">
            Contact <IconArrow className="w-3.5 h-3.5" />
          </a>
          {/* Hamburger */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl glass glass-hover text-slate-400 hover:text-white"
            aria-label={isOpen ? 'Menu sluiten' : 'Menu openen'}
          >
            {isOpen ? <IconClose className="w-4 h-4" /> : <IconMenu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden max-w-5xl mx-auto mt-2 glass rounded-2xl px-4 py-3 mobile-menu-enter">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${activeSection === link.id
                    ? 'text-white bg-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-2 py-2.5 text-xs"
            >
              Contact <IconArrow className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function ProfilePhoto() {
  const [error, setError] = useState(false);
  return (
    <div className="profile-ring mx-auto mb-8" data-reveal>
      {error ? (
        <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20
                        flex items-center justify-center text-2xl font-extrabold text-white/40
                        select-none">
          JD
        </div>
      ) : (
        <img
          src="/profile.jpg"
          alt="Jonathan Daneels"
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <div className="orb opacity-20" style={{ width: 700, height: 700, background: 'radial-gradient(circle, #10b981, transparent 65%)', top: -200, right: -200 }} />
      <div className="orb opacity-15" style={{ width: 500, height: 500, background: 'radial-gradient(circle, #6366f1, transparent 65%)', bottom: -150, left: -150 }} />

      <div className="relative max-w-4xl mx-auto text-center">
        <ProfilePhoto />

        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-slate-400 mb-10 border border-white/10" data-reveal>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
          Beschikbaar voor nieuwe projecten
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none mb-6" data-reveal>
          <span className="text-white block">Jonathan</span>
          <span className="gradient-text block">Daneels</span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl font-medium mb-4 tracking-wide" data-reveal>
          Full-stack Webdeveloper · SaaS Architect
        </p>

        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12" data-reveal>
          Ik verander complexe problemen in elegante, schaalbare code.{' '}
          <span className="text-slate-400">Van concept tot productie — snel, modulair en toekomstbestendig.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20" data-reveal>
          <a href="#projects" className="btn-primary w-full sm:w-auto">
            Bekijk mijn werk <IconArrow className="w-4 h-4" />
          </a>
          <a href="#contact" className="btn-secondary w-full sm:w-auto">
            Neem contact op
          </a>
          <a href="/cv.pdf" download className="btn-secondary w-full sm:w-auto">
            Download CV
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto" data-reveal>
          {[
            { value: '5+', label: 'Jaar ervaring' },
            { value: '20+', label: 'Projecten' },
            { value: '100%', label: 'Commitment' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold gradient-text leading-none">{s.value}</div>
              <div className="text-xs text-slate-600 mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-700">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-700 to-transparent" />
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article
      className={`glass glass-hover rounded-2xl p-6 group relative overflow-hidden h-full
                  hover:-translate-y-1.5 hover:shadow-2xl ${project.glowClass} transition-all duration-300`}
    >
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.gradientClass}`} />

      {project.screenshot && (
        <div className="rounded-lg overflow-hidden mb-4 mt-2 border border-white/10">
          <img src={project.screenshot} alt={project.title} className="w-full h-32 object-cover object-top" />
        </div>
      )}

      <h3 className="text-lg font-bold text-white mt-2 mb-5">{project.title}</h3>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">De Uitdaging</p>
          <p className="text-slate-400 text-sm leading-relaxed">{project.challenge}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">De Oplossing</p>
          <p className="text-slate-400 text-sm leading-relaxed">{project.solution}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((tech) => (
          <span key={tech} className="skill-tag">{tech}</span>
        ))}
      </div>

      {(project.liveUrl || project.githubUrl) && (
        <div className="flex items-center gap-5 pt-4 border-t border-white/10">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
               onClick={(e) => e.stopPropagation()}
               className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors duration-200">
              <IconExternalLink className="w-3.5 h-3.5" /> Live demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
               onClick={(e) => e.stopPropagation()}
               className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200">
              <IconGitHub className="w-3 h-3" /> Broncode
            </a>
          )}
        </div>
      )}

      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientClass} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-2xl pointer-events-none`} />
    </article>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16" data-reveal>
          <p className="section-label text-emerald-400">Afgeronde Case Studies</p>
          <h2 className="section-title text-white">Mijn Projecten</h2>
          <p className="text-slate-500 max-w-lg mx-auto mt-4 text-sm leading-relaxed">
            Elk project is een verhaal: een probleem, een aanpak en de lessen die ik onderweg leerde.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <div key={p.id} data-reveal data-reveal-delay={String(i + 1)}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KitchenSection() {
  return (
    <section id="kitchen" className="relative py-28 px-6">
      <div className="orb opacity-10" style={{ width: 600, height: 600, background: 'radial-gradient(circle, #8b5cf6, transparent 65%)', top: '10%', left: '50%', transform: 'translateX(-50%)' }} />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16" data-reveal>
          <p className="section-label text-violet-400">Lopende Ideeën & Concepten</p>
          <h2 className="section-title text-white">In de Keuken</h2>
          <p className="text-slate-500 max-w-lg mx-auto mt-4 text-sm leading-relaxed">
            Niet elk goed idee is al af. Hier zijn de projecten waar ik actief aan bouw, over experimenteer of van droom.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {KITCHEN.map((item, i) => (
            <article key={item.id} data-reveal data-reveal-delay={String(i + 1)}
              className="glass glass-hover rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 4px, transparent 4px, transparent 10px)' }} />
              <div className="flex items-start justify-between gap-3 mb-4 mt-1">
                <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
                <span className={`${item.statusClass} whitespace-nowrap shrink-0`}>{item.statusLabel}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html: item.description }} />
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs rounded-md bg-white/5 border border-white/10 text-slate-500">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16" data-reveal>
          <p className="section-label text-cyan-400">Mijn Toolkit</p>
          <h2 className="section-title text-white">Tech Stack & Skills</h2>
          <p className="text-slate-500 max-w-lg mx-auto mt-4 text-sm leading-relaxed">
            De tools waarmee ik ideeën omzet naar werkende producten.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {SKILLS.map((skill, i) => (
            <div key={skill.name} data-reveal data-reveal-delay={String((i % 4) + 1)}
              className="glass glass-hover rounded-xl p-5 flex flex-col items-center gap-2 text-center group">
              <span className={`text-xl font-extrabold tracking-tight ${skill.color} group-hover:scale-105 transition-transform duration-200`}>
                {skill.name}
              </span>
              <span className="text-[10px] text-slate-600 tracking-widest uppercase">{skill.level}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-600 text-xs mt-8 tracking-wide" data-reveal>
          + altijd aan het leren — momenteel: Rust & edge computing
        </p>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Vervang 'JOUW_FORMSPREE_ID' door jouw eigen endpoint via formspree.io
      const res = await fetch('https://formspree.io/f/JOUW_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const btnLabel = { idle: 'Verstuur bericht', sending: 'Versturen...', success: 'Bericht verstuurd!', error: 'Probeer opnieuw' }[status];

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="orb opacity-15" style={{ width: 500, height: 500, background: 'radial-gradient(circle, #06b6d4, transparent 65%)', bottom: -100, right: -100 }} />
      <div className="relative max-w-xl mx-auto">
        <div className="text-center mb-12" data-reveal>
          <p className="section-label text-emerald-400">Laten we praten</p>
          <h2 className="section-title text-white">Neem Contact Op</h2>
          <p className="text-slate-500 mt-4 text-sm leading-relaxed">
            Heb je een project in gedachten, een vraag, of wil je gewoon connecten? Stuur me een bericht.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-10" data-reveal>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Naam</label>
              <input type="text" name="name" required value={form.name} onChange={handleChange}
                placeholder="Jouw naam" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">E-mail</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange}
                placeholder="jouw@email.com" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Bericht</label>
              <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                placeholder="Vertel me meer over je project of idee..." className="input-field resize-none" />
            </div>
            <button type="submit" disabled={status === 'sending' || status === 'success'}
              className={`w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0
                ${status === 'success' ? 'from-emerald-600 to-emerald-500' : ''}
                ${status === 'error' ? 'from-rose-600 to-rose-500' : ''}`}>
              {btnLabel}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-600 text-xs">of verbind via</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="flex gap-3">
            <a href="https://linkedin.com/in/daneelsjo" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 glass glass-hover rounded-xl py-3 text-slate-400 hover:text-white text-sm font-medium transition-all duration-200">
              <IconLinkedIn className="w-4 h-4" /> LinkedIn
            </a>
            <a href="https://github.com/daneelsjo" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 glass glass-hover rounded-xl py-3 text-slate-400 hover:text-white text-sm font-medium transition-all duration-200">
              <IconGitHub className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BackToTop() {
  const show = useShowBackToTop();
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Terug naar boven"
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full
                  bg-gradient-to-r from-emerald-500 to-cyan-500 text-white
                  shadow-lg shadow-emerald-500/30
                  hover:scale-110 active:scale-95
                  transition-all duration-300
                  ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <IconChevronUp className="w-4 h-4" />
    </button>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-700 text-xs tracking-wide order-2 sm:order-1">
          &copy; {new Date().getFullYear()} Jonathan Daneels &mdash; Gebouwd met Next.js & Tailwind CSS
        </p>
        <div className="flex items-center gap-2 order-1 sm:order-2">
          <a href="https://linkedin.com/in/daneelsjo" target="_blank" rel="noopener noreferrer"
            className="p-2.5 glass glass-hover rounded-xl text-slate-500 hover:text-white transition-all duration-200"
            aria-label="LinkedIn">
            <IconLinkedIn className="w-4 h-4" />
          </a>
          <a href="https://github.com/daneelsjo" target="_blank" rel="noopener noreferrer"
            className="p-2.5 glass glass-hover rounded-xl text-slate-500 hover:text-white transition-all duration-200"
            aria-label="GitHub">
            <IconGitHub className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const activeSection = useActiveSection();
  useScrollReveal();

  return (
    <>
      <div className="fixed inset-0 bg-dot-grid pointer-events-none" />
      <Navbar activeSection={activeSection} />
      <main>
        <HeroSection />
        <ProjectsSection />
        <KitchenSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
