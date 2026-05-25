'use client';

import { useState } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '#projects', label: 'Projecten' },
  { href: '#kitchen', label: 'In de Keuken' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
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
    accentFrom: '#10b981',
    accentTo: '#06b6d4',
    gradientClass: 'from-emerald-500 to-cyan-500',
    glowClass: 'group-hover:shadow-emerald-500/20',
  },
  {
    id: 2,
    title: 'Multi-Tenant SaaS Billing',
    challenge:
      'Een startup had een schaalbaar facturatiesysteem nodig dat multi-tenant werkte zonder zware infrastructuurkosten.',
    solution:
      'Gebouwd met Next.js App Router, Stripe voor betalingen en Firebase voor auth & data. Volledig geïsoleerde tenant workspaces via Firebase Security Rules.',
    stack: ['Next.js', 'Stripe', 'Firebase', 'Node.js'],
    accentFrom: '#8b5cf6',
    accentTo: '#a855f7',
    gradientClass: 'from-violet-500 to-purple-500',
    glowClass: 'group-hover:shadow-violet-500/20',
  },
  {
    id: 3,
    title: 'JAMStack Portfolio Engine',
    challenge:
      'Een creatief bureau wilde een razendsnelle website zonder de overhead en veiligheidsproblemen van WordPress.',
    solution:
      'JAMStack aanpak met Next.js statische export en Markdown content. Deploy in seconden via Firebase Hosting met automatische cache-headers.',
    stack: ['Next.js', 'Tailwind CSS', 'Markdown', 'Firebase Hosting'],
    accentFrom: '#f43f5e',
    accentTo: '#fb923c',
    gradientClass: 'from-rose-500 to-orange-400',
    glowClass: 'group-hover:shadow-rose-500/20',
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
  { name: 'Next.js', level: 'Expert', color: 'text-slate-200' },
  { name: 'React', level: 'Expert', color: 'text-cyan-400' },
  { name: 'TypeScript', level: 'Gevorderd', color: 'text-blue-400' },
  { name: 'Tailwind CSS', level: 'Expert', color: 'text-sky-400' },
  { name: 'Firebase', level: 'Expert', color: 'text-orange-400' },
  { name: 'Node.js', level: 'Gevorderd', color: 'text-emerald-400' },
  { name: 'GitHub', level: 'Gevorderd', color: 'text-slate-300' },
  { name: 'Figma', level: 'Basis', color: 'text-fuchsia-400' },
];

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

// ─── Components ──────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="max-w-5xl mx-auto glass rounded-2xl px-5 py-3 flex items-center justify-between">
        <span className="font-extrabold text-lg gradient-text tracking-tight">JD.</span>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="btn-primary py-2 px-4 text-xs">
          Contact <IconArrow className="w-3.5 h-3.5" />
        </a>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
    >
      {/* Background orbs */}
      <div
        className="orb opacity-20"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, #10b981, transparent 65%)',
          top: -200,
          right: -200,
        }}
      />
      <div
        className="orb opacity-15"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, #6366f1, transparent 65%)',
          bottom: -150,
          left: -150,
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-slate-400 mb-10 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
          Beschikbaar voor nieuwe projecten
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none mb-6">
          <span className="text-white block">Jonathan</span>
          <span className="gradient-text block">Daneels</span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl font-medium mb-4 tracking-wide">
          Full-stack Webdeveloper · SaaS Architect
        </p>

        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          Ik verander complexe problemen in elegante, schaalbare code.{' '}
          <span className="text-slate-400">Van concept tot productie — snel, modulair en toekomstbestendig.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a href="#projects" className="btn-primary w-full sm:w-auto">
            Bekijk mijn werk <IconArrow className="w-4 h-4" />
          </a>
          <a href="#contact" className="btn-secondary w-full sm:w-auto">
            Neem contact op
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
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

      {/* Scroll cue */}
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
      className={`glass glass-hover rounded-2xl p-6 group relative overflow-hidden
                  hover:-translate-y-1.5 hover:shadow-2xl ${project.glowClass} transition-all duration-300 cursor-pointer`}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.gradientClass}`}
      />

      <h3 className="text-lg font-bold text-white mt-2 mb-5">{project.title}</h3>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">
            De Uitdaging
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">{project.challenge}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">
            De Oplossing
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">{project.solution}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span key={tech} className="skill-tag">{tech}</span>
        ))}
      </div>

      {/* Hover glow overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradientClass}
                    opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300
                    rounded-2xl pointer-events-none`}
      />
    </article>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label text-emerald-400">Afgeronde Case Studies</p>
          <h2 className="section-title text-white">Mijn Projecten</h2>
          <p className="text-slate-500 max-w-lg mx-auto mt-4 text-sm leading-relaxed">
            Elk project is een verhaal: een probleem, een aanpak en de lessen die ik onderweg leerde.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function KitchenSection() {
  return (
    <section id="kitchen" className="relative py-28 px-6">
      {/* Subtle background accent */}
      <div
        className="orb opacity-10"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, #8b5cf6, transparent 65%)',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label text-violet-400">Lopende Ideeën & Concepten</p>
          <h2 className="section-title text-white">
            In de Keuken
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto mt-4 text-sm leading-relaxed">
            Niet elk goed idee is al af. Hier zijn de projecten waar ik actief aan bouw, over experimenteer of van droom.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {KITCHEN.map((item) => (
            <article key={item.id} className="glass glass-hover rounded-2xl p-6 relative overflow-hidden">
              {/* Dashed top border */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 4px, transparent 4px, transparent 10px)',
                }}
              />

              <div className="flex items-start justify-between gap-3 mb-4 mt-1">
                <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
                <span className={`${item.statusClass} whitespace-nowrap shrink-0`}>
                  {item.statusLabel}
                </span>
              </div>

              <p
                className="text-slate-400 text-sm leading-relaxed mb-5"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-md bg-white/5 border border-white/10 text-slate-500"
                  >
                    {tag}
                  </span>
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
        <div className="text-center mb-16">
          <p className="section-label text-cyan-400">Mijn Toolkit</p>
          <h2 className="section-title text-white">Tech Stack & Skills</h2>
          <p className="text-slate-500 max-w-lg mx-auto mt-4 text-sm leading-relaxed">
            De tools waarmee ik ideeën omzet naar werkende producten.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="glass glass-hover rounded-xl p-5 flex flex-col items-center gap-2 text-center group"
            >
              <span className={`text-xl font-extrabold tracking-tight ${skill.color} group-hover:scale-105 transition-transform duration-200`}>
                {skill.name}
              </span>
              <span className="text-[10px] text-slate-600 tracking-widest uppercase">{skill.level}</span>
            </div>
          ))}
        </div>

        {/* Extra: a subtle "always learning" note */}
        <p className="text-center text-slate-600 text-xs mt-8 tracking-wide">
          + altijd aan het leren — momenteel: Rust & edge computing
        </p>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // TODO: vervang deze URL door jouw Formspree endpoint of Firebase Function
      // Formspree voorbeeld: await fetch('https://formspree.io/f/JOUW_ID', { method:'POST', ... })
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const buttonLabel = {
    idle: 'Verstuur bericht',
    sending: 'Versturen...',
    success: 'Bericht verstuurd!',
    error: 'Probeer opnieuw',
  }[status];

  return (
    <section id="contact" className="relative py-28 px-6">
      <div
        className="orb opacity-15"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, #06b6d4, transparent 65%)',
          bottom: -100,
          right: -100,
        }}
      />

      <div className="relative max-w-xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label text-emerald-400">Laten we praten</p>
          <h2 className="section-title text-white">Neem Contact Op</h2>
          <p className="text-slate-500 mt-4 text-sm leading-relaxed">
            Heb je een project in gedachten, een vraag, of wil je gewoon connecten? Stuur me een bericht.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Naam
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jouw naam"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="jouw@email.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Bericht
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Vertel me meer over je project of idee..."
                className="input-field resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className={`w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0
                ${status === 'success' ? 'from-emerald-600 to-emerald-500' : ''}
                ${status === 'error' ? 'from-rose-600 to-rose-500' : ''}`}
            >
              {buttonLabel}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-600 text-xs">of verbind via</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="flex gap-3">
            <a
              href="https://linkedin.com/in/jonathandaneels"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 glass glass-hover rounded-xl py-3 text-slate-400 hover:text-white text-sm font-medium transition-all duration-200"
            >
              <IconLinkedIn className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/jonathandaneels"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 glass glass-hover rounded-xl py-3 text-slate-400 hover:text-white text-sm font-medium transition-all duration-200"
            >
              <IconGitHub className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5 text-center">
      <p className="text-slate-700 text-xs tracking-wide">
        &copy; {new Date().getFullYear()} Jonathan Daneels &mdash; Gebouwd met Next.js & Tailwind CSS &mdash; Hosted op Firebase
      </p>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 bg-dot-grid pointer-events-none opacity-100" />
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <KitchenSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
