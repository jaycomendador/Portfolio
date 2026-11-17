import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight, Atom, Award, BriefcaseBusiness, Braces, ChevronRight, Code2, Coffee, Database, ExternalLink, FileText, GitBranch, Globe2, Layers, LayoutDashboard, Leaf, Menu, Palette, PanelsTopLeft, Phone, Server, UsersRound, X, Monitor, Smartphone, PenTool } from 'lucide-react';
import GitHubContributions from './components/GitHubContributions';
import ElectricLogo from './components/ElectricLogo';
import { fetchPortfolioRecord, loadCertificates, loadPortfolioContent, loadProjects, mergeProjectDefaults, saveCertificates, savePortfolioContent, saveProjects } from './dashboard/portfolioContent';

const GitHubIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.52.1.72-.22.72-.5v-1.96c-2.93.64-3.55-1.24-3.55-1.24-.48-1.22-1.17-1.55-1.17-1.55-.96-.65.07-.64.07-.64 1.06.08 1.62 1.09 1.62 1.09.94 1.61 2.47 1.14 3.07.87.1-.68.37-1.14.67-1.4-2.34-.27-4.8-1.17-4.8-5.2 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.34.1-2.8 0 0 .88-.28 2.89 1.08A10 10 0 0 1 12 8.14c.9 0 1.8.12 2.64.36 2.01-1.36 2.89-1.08 2.89-1.08.57 1.46.21 2.53.1 2.8.67.74 1.08 1.68 1.08 2.83 0 4.04-2.47 4.92-4.82 5.18.38.33.72.97.72 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z" /></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.87.24-1.46 1.5-1.46h1.6V3.96c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.88 1.4-3.88 3.98V10H7.8v3h2.6v8h3.1Z" /></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.3" cy="6.8" r="1.1" fill="currentColor" /></svg>;
const LinkedInIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.2 3.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9.5h3.8v11H3.3v-11Zm6.1 0H13v1.5h.1c.5-.9 1.7-1.8 3.5-1.8 3.8 0 4.5 2.5 4.5 5.7v5.6h-3.8v-5c0-1.2 0-2.8-1.8-2.8s-2.1 1.3-2.1 2.7v5.1H9.4v-11Z" /></svg>;
const GmailIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M3 6.6A1.6 1.6 0 0 1 5.6 5.3L7 6.4v12.1H3z" /><path fill="#34A853" d="M17 6.4l1.4-1.1A1.6 1.6 0 0 1 21 6.6v11.9h-4z" /><path fill="#EA4335" d="M3 6.6a1.6 1.6 0 0 1 2.6-1.3L12 10.2l6.4-4.9A1.6 1.6 0 0 1 21 6.6v2L12 15.5 3 8.6z" /><path fill="#FBBC04" d="M17 9.3l4-3v12.2h-4z" /></svg>;

const skillIconMap = {
  HTML5: [Code2, '#e34f26'], CSS3: [Code2, '#1572b6'], 'React.js': [Atom, '#61dafb'], 'React Native': [Atom, '#61dafb'],
  Java: [Coffee, '#ed8b00'], Python: [Code2, '#3776ab'], 'Node.js': [Code2, '#539e43'], 'REST APIs': [Globe2, '#8da4bd'],
  MySQL: [Database, '#00758f'], PHP: [Code2, '#777bb4'], MongoDB: [Leaf, '#47a248'], 'MERN Stack': [Layers, '#8b5cf6'],
  Figma: [Palette, '#f24e1e'], 'Git/GitHub': [GitBranch, '#f05032'],
};
function TechIcon({ name }) { const [Icon, color] = skillIconMap[name] || [Code2, '#9aa8bb']; return <span className="arsenal-item-icon" style={{ '--skill-icon-color': color } as CSSProperties} aria-hidden="true"><Icon size={15} strokeWidth={2.2} /></span>; }
function AnimatedName({ name }: { name: string }) { return <span className="interactive-name" tabIndex={0} aria-label={name}>{Array.from(name).map((letter, index) => <span className="interactive-name-letter" key={`${letter}-${index}`} style={{ '--glyph-index': index } as CSSProperties} aria-hidden="true">{letter === ' ' ? '\u00a0' : letter}</span>)}</span>; }

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  // The public site intentionally opens in its dark presentation.
  const darkMode = true;
  const [portfolioContent, setPortfolioContent] = useState(loadPortfolioContent);
  const [projects, setProjects] = useState(loadProjects);
  const [certificates, setCertificates] = useState(loadCertificates);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectListRef = useRef<HTMLDivElement>(null);
  const projectDragRef = useRef<{ startX: number; scrollLeft: number; pointerId: number; moved: boolean } | null>(null);
  const draggedProjectRef = useRef(false);
  const beginProjectDrag = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0 || (event.target as HTMLElement).closest('a, button')) return;
    const list = projectListRef.current;
    if (!list) return;
    projectDragRef.current = { startX: event.clientX, scrollLeft: list.scrollLeft, pointerId: event.pointerId, moved: false };
    list.classList.add('is-dragging');
    list.setPointerCapture(event.pointerId);
  };
  const moveProjectDrag = (event) => {
    const drag = projectDragRef.current;
    const list = projectListRef.current;
    if (!drag || !list || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) drag.moved = true;
    if (drag.moved) {
      event.preventDefault();
      list.scrollLeft = drag.scrollLeft - distance;
    }
  };
  const endProjectDrag = (event) => {
    const drag = projectDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    draggedProjectRef.current = drag.moved;
    projectDragRef.current = null;
    const list = projectListRef.current;
    list?.classList.remove('is-dragging');
    if (drag.moved) window.setTimeout(() => { draggedProjectRef.current = false; }, 100);
    if (list?.hasPointerCapture(event.pointerId)) list.releasePointerCapture(event.pointerId);
  };
  useEffect(() => {
    let active = true;
    fetchPortfolioRecord().then((record) => {
      if (!active || !record.initialized) return;
      setPortfolioContent(record.content);
      const updatedProjects = mergeProjectDefaults(record.projects);
      setProjects(updatedProjects);
      if (Array.isArray(record.certificates) && (record.certificates.length > 0 || loadCertificates().length === 0)) {
        setCertificates(record.certificates);
        saveCertificates(record.certificates);
      }
      savePortfolioContent(record.content);
      saveProjects(updatedProjects);
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const animatedItems = document.querySelectorAll<HTMLElement>('[data-scroll-animation], .portfolio-page > section[id], .github-activity-section');
    const motionBySection = { home: 'zoom', about: 'rise', skills: 'flip', works: 'slide', services: 'rise', certificates: 'zoom', connect: 'slide' };
    animatedItems.forEach((item) => {
      if (item.matches('.portfolio-page > section[id], .github-activity-section')) item.dataset.scrollMotion = motionBySection[item.id] || (item.classList.contains('github-activity-section') ? 'zoom' : 'rise');
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.matches('.portfolio-page > section[id], .github-activity-section')) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        } else entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.08 });
    animatedItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'works', 'journey', 'connect'].map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0.05, 0.2, 0.45] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!selectedProject) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setSelectedProject(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedProject]);
  useEffect(() => {
    const scene = document.querySelector<HTMLElement>('.portfolio-world');
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const move = (event) => {
      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      scene.style.setProperty('--world-tilt-x', `${(-y * 5).toFixed(2)}deg`);
      scene.style.setProperty('--world-tilt-y', `${(x * 7).toFixed(2)}deg`);
    };
    const reset = () => {
      scene.style.setProperty('--world-tilt-x', '0deg');
      scene.style.setProperty('--world-tilt-y', '0deg');
    };
    scene.addEventListener('pointermove', move);
    scene.addEventListener('pointerleave', reset);
    return () => {
      scene.removeEventListener('pointermove', move);
      scene.removeEventListener('pointerleave', reset);
    };
  }, []);
  const links = [['Home', '#home'], ['About', '#about'], ['Skills', '#skills'], ['Projects', '#works'], ['Journey', '#journey'], ['Contact', '#connect']];
  const frontendSkills = ['HTML5', 'CSS3', 'React.js', 'React Native'];
  const professionalSkills = ['Figma', 'Git/GitHub'];
  const fullStackSkills = ['MERN Stack'];
  const backendSkills = ['Node.js', 'REST APIs', 'MySQL', 'PHP', 'MongoDB'];
  const visibleProjects = projects;
  const carouselProjects = [...visibleProjects.map((project) => ({ project, copy: 'original' })), ...visibleProjects.map((project) => ({ project, copy: 'clone' }))];
  const clientCount = Math.max(0, Number.parseInt(portfolioContent.clients, 10) || 0);
  const deployedWebsiteCount = projects.filter((project) => typeof project?.status === 'string' && project.status.toLowerCase() === 'live' && /^https?:\/\//i.test(project.url || '')).length;
  const programmingLanguages = Object.entries({ Java: 50, Python: 50, ...portfolioContent.programmingLanguageLevels });
  const backendMarqueeSkills = [...backendSkills, ...programmingLanguages.map(([language]) => String(language)), ...fullStackSkills, ...professionalSkills];
  const programmingLanguagePercentages = Object.fromEntries(programmingLanguages.map(([language, level]) => [String(language), level]));
  const marqueePercent = (skill: string) => programmingLanguagePercentages[skill] ?? arsenalLevels[skill] ?? 0;
  const arsenalLevels = { 'MERN Stack': 70, HTML5: 85, CSS3: 80, 'React.js': 70, 'Node.js': 65, 'React Native': 50, 'REST APIs': 50, 'Git/GitHub': 46, Figma: 49, MySQL: 80, PHP: 55, MongoDB: 70, ...portfolioContent.arsenalLevels };
  return (
    <main className={darkMode ? 'portfolio-page dark-mode' : 'portfolio-page'}>
      <header className="site-header shell">
          <a className="brand" href="#home"><img src="/Glossy%20Black%20and%20Gold%20JC%20Monogram.png" alt="" /><span>Portfolio</span></a>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>{links.map(([label, href]) => <a onClick={() => setMenuOpen(false)} href={href} key={label} className={activeSection === href.slice(1) ? 'active' : ''} aria-current={activeSection === href.slice(1) ? 'location' : undefined}>{label}</a>)}</nav>
          <div className="social-links"><a href="#connect">f</a><a href="#connect">in</a><a href="#connect">â—Ž</a></div>
          
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </header>
      <section className="hero-section" id="home">
        
        <div className="hero shell">
          <div className="hero-copy"><p className="eyebrow">PORTFOLIO â€” 2026</p><h1>Hello I'm <AnimatedName name={portfolioContent.name} /></h1><h2>{portfolioContent.role}</h2><p className="intro">{portfolioContent.intro}</p><div className="hero-actions"><a className="button primary" href="#works">View Projects <ArrowRight size={14} /></a><a className="button secondary" href="#connect">Contact Me</a></div><div className="hero-secondary-links"><a href="/resume.pdf" target="_blank" rel="noreferrer">View Resume <ExternalLink size={12} /></a><a href="#services">Explore Services <ArrowRight size={12} /></a></div><div className="hero-stats" aria-label="Portfolio statistics"><article><div><BriefcaseBusiness size={13} /><strong>{projects.length}</strong></div><span>Projects</span></article><article><div><UsersRound size={13} /><strong>{clientCount}</strong></div><span>Clients</span></article><article><div><Globe2 size={13} /><strong>{deployedWebsiteCount}</strong></div><span>Deployed websites</span></article></div></div>
          <div className="portfolio-world react-atom-scene" aria-label="A red neon 3D atom with animated electric strands">
            <div className="hero-scroll-object">
              <ElectricLogo src="/react-atom.svg" color="#fff0f5" glowColor="#d83a5e" scale={0.66} intensity={0.95} glow={0.55} thickness={1.45} strands={4} bend={0.48} crackle={1.5} arcs={2} flicker={1.15} fill={0} speed={3.4} interactive cursorIntensity={0.8} cursorRadius={100} theme="dark" className="react-atom-electric-logo" />
            </div>
          </div>
        </div>
      </section>
      <section className="about-section" id="about"><div className="shell about-grid"><div className="about-portrait" data-scroll-animation><img src="/profile.png" alt={`${portfolioContent.name} portrait`} loading="lazy" /></div><article className="about-card" data-scroll-animation><p className="eyebrow">GET TO KNOW ME</p><h2>About Me</h2><h3 className="about-profile-name">{portfolioContent.name}</h3><p className="about-profile-role">{portfolioContent.role}</p><p className="about-description">{portfolioContent.about}</p><a href="#certificates" className="button outline">View certificates <ChevronRight size={14} /></a></article></div></section>
      <section className="skills-section" id="skills"><div className="shell"><div className="arsenal-heading"><h2><span className="arsenal-heading-icon" aria-hidden="true"><Code2 size={18} /></span> Technical Arsenal</h2><small>/ stack</small></div><div className="skills-marquee" role="img" aria-label={`Frontend: ${frontendSkills.map((skill) => `${skill} ${marqueePercent(skill)}%`).join(', ')}. Backend and tools: ${backendMarqueeSkills.map((skill) => `${skill} ${marqueePercent(skill)}%`).join(', ')}`}><div className="skills-marquee-row"><span className="skills-marquee-label">FRONTEND</span><div className="skills-marquee-window"><div className="skills-marquee-track">{[...frontendSkills, ...frontendSkills].map((skill, index) => <span className="skills-marquee-chip" key={`frontend-${skill}-${index}`} aria-hidden="true">{skill}<small>{marqueePercent(skill)}%</small></span>)}</div></div></div><div className="skills-marquee-row"><span className="skills-marquee-label">BACKEND</span><div className="skills-marquee-window"><div className="skills-marquee-track reverse">{[...backendMarqueeSkills, ...backendMarqueeSkills].map((skill, index) => <span className="skills-marquee-chip" key={`backend-${skill}-${index}`} aria-hidden="true">{skill}<small>{marqueePercent(skill)}%</small></span>)}</div></div></div></div><div className="arsenal-grid"><div className="arsenal-column"><h3><span className="arsenal-section-icon frontend-icon" aria-hidden="true"><PanelsTopLeft size={14} /></span> Frontend</h3><ul>{frontendSkills.map((skill) => <li key={skill}><span className="arsenal-skill-name"><TechIcon name={skill} />{skill}</span><small>{arsenalLevels[skill]}%</small></li>)}</ul><h3 className="arsenal-subheading"><span className="arsenal-section-icon languages-icon" aria-hidden="true"><Braces size={14} /></span> Programming Languages</h3><div className="language-proficiency-list">{programmingLanguages.map(([language, level]) => <div className="language-proficiency" key={String(language)}><span className="language-proficiency-name"><TechIcon name={String(language)} />{String(language)}</span><div className="proficiency-track"><span style={{ width: `${Math.min(100, Math.max(0, Number(level) || 0))}%` }} /></div><small>{String(level)}%</small></div>)}</div></div><div className="arsenal-column"><h3><span className="arsenal-section-icon backend-icon" aria-hidden="true"><Server size={14} /></span> Backend</h3><ul>{backendSkills.map((skill) => <li key={skill}><span className="arsenal-skill-name"><TechIcon name={skill} />{skill}</span><small>{arsenalLevels[skill]}%</small></li>)}</ul><h3 className="arsenal-subheading"><span className="arsenal-section-icon fullstack-icon" aria-hidden="true"><Layers size={14} /></span> Full Stack</h3><ul>{fullStackSkills.map((skill) => <li key={skill}><span className="arsenal-skill-name"><TechIcon name={skill} />{skill}</span><small>{arsenalLevels[skill]}%</small></li>)}</ul><h3 className="arsenal-subheading"><span className="arsenal-section-icon design-icon" aria-hidden="true"><Palette size={14} /></span> Design &amp; Tools</h3><ul>{professionalSkills.map((skill) => <li key={skill}><span className="arsenal-skill-name"><TechIcon name={skill} />{skill}</span><small>{arsenalLevels[skill]}%</small></li>)}</ul></div></div></div></section>

      <section className="content-section" id="works">
        <div className="shell projects-shell">
          <div className="projects-heading-row"><div className="section-title"><p className="eyebrow">SELECTED WORK</p><h2>Recent Projects</h2></div></div>
          <div className="project-text-list" id="project-list" ref={projectListRef} onPointerDown={beginProjectDrag} onPointerMove={moveProjectDrag} onPointerUp={endProjectDrag} onPointerCancel={endProjectDrag} aria-label="Recent projects. The gallery moves continuously. Drag or swipe to browse projects.">
            <div className="project-marquee-track" style={{ '--project-loop-duration': `${Math.max(24, visibleProjects.length * 11)}s` } as CSSProperties}>
            {carouselProjects.map(({ project, copy }) => {
              const liveUrl = /^https?:\/\//i.test(project.url || '') ? project.url : '';
              const openDetails = () => {
                if (draggedProjectRef.current) { draggedProjectRef.current = false; return; }
                setSelectedProject(project);
              };
              return <article className="project-text-row project-card-interactive" key={`${copy}-${project.id || project.name}`} data-project-copy={copy} role="button" tabIndex={copy === 'original' ? 0 : -1} aria-hidden={copy === 'clone' ? true : undefined} aria-label={`View details for ${project.name}`} onClick={openDetails} onKeyDown={(event) => { if ((event.target as HTMLElement).closest('a, button')) return; if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedProject(project); } }}>
                <div className="project-preview">{project.image && <img src={project.image} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement?.querySelector('.project-no-image')?.classList.add('is-visible'); }} />}<span className={`project-no-image${project.image ? '' : ' is-visible'}`} aria-hidden="true"><Code2 size={44} strokeWidth={1.25} /></span></div>
                <div className="project-gallery-copy"><div className="project-text-heading"><h3>{project.name}</h3>{project.status && <span>{project.status}</span>}</div><p>{project.detail || 'Project details coming soon.'}</p>{project.technologies && <small>{project.technologies}</small>}</div>
                {liveUrl ? <a className="project-open-label" href={liveUrl} target="_blank" rel="noopener noreferrer" tabIndex={copy === 'clone' ? -1 : undefined} onClick={(event) => event.stopPropagation()} aria-label={`View ${project.name} project`}>View project <ArrowRight size={14} /></a> : <button className="project-open-label" type="button" tabIndex={copy === 'clone' ? -1 : undefined} onClick={(event) => { event.stopPropagation(); setSelectedProject(project); }} aria-label={`View ${project.name} details`}>View project <ArrowRight size={14} /></button>}
              </article>;
            })}
            </div>
            {!projects.length && <p className="project-list-empty">Projects will appear here soon.</p>}
          </div>
        </div>
      </section>
      <section className="services-section" id="services"><div className="shell"><div className="section-title left"><p className="eyebrow">WHAT I CAN DO</p><h2>Services</h2><span>From the first sketch to a polished, working product.</span></div><div className="services-grid"><article className="service-card" data-scroll-animation><div className="service-icon"><Monitor size={23} /></div><span className="service-number">01</span><h3>Web Frontend</h3><p>Responsive, accessible websites built to look sharp and work smoothly on every screen.</p><div className="service-tags"><span>Web design</span><span>Development</span><span>Responsive</span></div></article><article className="service-card" data-scroll-animation><div className="service-icon"><Smartphone size={23} /></div><span className="service-number">02</span><h3>App Development</h3><p>Mobile app interfaces and features shaped around real user needs and a simple experience.</p><div className="service-tags"><span>Mobile UI</span><span>App development</span><span>Usability</span></div></article><article className="service-card" data-scroll-animation><div className="service-icon"><PenTool size={23} /></div><span className="service-number">03</span><h3>Figma Prototypes</h3><p>Clickable Figma prototypes that make ideas easy to explore, review, and validate before development.</p><div className="service-tags"><span>Wireframes</span><span>UI/UX</span><span>Prototype</span></div></article></div><a className="services-cta" href="#connect">Have a project in mind? <span>Let&apos;s talk <ArrowRight size={14} /></span></a></div></section>      <section className="journey-section" id="journey"><GitHubContributions username="jaycomendador" /><section className="certificates-section" id="certificates">
        <div className="shell">
          <div className="section-title certificate-section-heading"><p className="eyebrow">LEARNING &amp; ACHIEVEMENTS</p><h2>Certificates</h2><span>Click a certificate to view it.</span></div>
          {certificates.length ? <>
            <div className="certificate-gallery">
              {certificates.map((certificate, index) => <article className={`certificate-gallery-card${selectedCertificate?.id === certificate.id ? ' is-selected' : ''}`} key={certificate.id}>
                <button className="certificate-gallery-select" type="button" onClick={() => setSelectedCertificate(certificate)} aria-pressed={selectedCertificate?.id === certificate.id}>
                  <span className="certificate-gallery-cover">
                    {certificate.fileType === 'application/pdf' ? <span className="certificate-gallery-pdf"><FileText size={30} /><small>PDF CERTIFICATE</small></span> : <img src={certificate.fileData} alt={`${certificate.title} certificate`} />}
                    <span className="certificate-gallery-index">{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  <span className="certificate-gallery-info"><strong>{certificate.title}</strong><span>{certificate.issuer}</span>{certificate.issued && <small>{certificate.issued}</small>}</span>
                  <span className="certificate-gallery-action">View details <ChevronRight size={14} /></span>
                </button>
              </article>)}
            </div>
            {selectedCertificate && <article className="certificate-selected-detail" id="certificate-details" aria-live="polite">
              <div className="certificate-selected-heading"><div><p className="eyebrow">CERTIFICATE DETAILS</p><h3>{selectedCertificate.title}</h3><p>{selectedCertificate.issuer}{selectedCertificate.issued ? ` · ${selectedCertificate.issued}` : ''}</p></div><button type="button" onClick={() => setSelectedCertificate(null)} aria-label="Close certificate details"><X size={18} /></button></div>
              <div className="certificate-selected-preview">{selectedCertificate.fileType === 'application/pdf' ? <iframe src={selectedCertificate.fileData} title={`${selectedCertificate.title} certificate`} /> : <img src={selectedCertificate.fileData} alt={`${selectedCertificate.title} certificate`} />}</div>
              <div className="certificate-detail-actions">
                {selectedCertificate.credentialUrl && <a href={selectedCertificate.credentialUrl} target="_blank" rel="noreferrer">Verify credential <ExternalLink size={14} /></a>}
                {selectedCertificate.fileType === 'application/pdf' && <a href={selectedCertificate.fileData} target="_blank" rel="noreferrer">Open PDF <ExternalLink size={14} /></a>}
              </div>
            </article>}
          </> : <div className="certificates-empty"><Award size={28} /><p>Certificates will be added here soon.</p></div>}
        </div>
      </section></section>
      <section className="connect-section" id="connect"><div className="shell"><div className="connect-heading"><h2><span></span>Contact</h2><small>/contact</small></div><ContactForm email={portfolioContent.email} /><div className="connect-grid"><a className="connect-card" href="https://github.com/jaycomendador" target="_blank" rel="noreferrer"><span className="connect-icon connect-icon-github"><GitHubIcon /></span><span><strong>GitHub</strong><small>jaycomendador</small></span><ExternalLink size={14} /></a><a className="connect-card" href="https://mail.google.com/mail/?view=cm&fs=1&to=Jcomendador120%40gmail.com" target="_blank" rel="noreferrer"><span className="connect-icon connect-icon-email"><GmailIcon /></span><span><strong>Email</strong><small>Jcomendador120@gmail.com</small></span><ExternalLink size={14} /></a><a className="connect-card" href="tel:+639626317088"><span className="connect-icon connect-icon-phone"><Phone size={21} /></span><span><strong>Phone</strong><small>+63 962 631 7088</small></span><ArrowRight size={14} /></a><a className="connect-card" href="https://www.facebook.com/jay.comendador.92" target="_blank" rel="noreferrer"><span className="connect-icon connect-icon-facebook"><FacebookIcon /></span><span><strong>Facebook</strong><small>Connect with me</small></span><ExternalLink size={14} /></a><a className="connect-card" href="https://www.linkedin.com/in/jay-comendador-b81074313" target="_blank" rel="noreferrer"><span className="connect-icon connect-icon-linkedin"><LinkedInIcon /></span><span><strong>LinkedIn</strong><small>Connect with me</small></span><ExternalLink size={14} /></a><a className="connect-card" href="https://www.instagram.com/mr_yajz/?hl=en" target="_blank" rel="noreferrer"><span className="connect-icon connect-icon-instagram"><InstagramIcon /></span><span><strong>Instagram</strong><small>@mr_yajz</small></span><ExternalLink size={14} /></a></div></div></section>      <footer className="site-footer shell">
        <div className="footer-main">
          <div className="footer-brand-column">
            <a className="footer-brand" href="#home"><Atom size={25} aria-hidden="true" /><span>{portfolioContent.name}</span></a>

            <div className="footer-socials" aria-label="Social links">
              <a href="https://github.com/jaycomendador" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
              <a href="https://www.linkedin.com/in/jay-comendador-b81074313" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href="https://www.instagram.com/mr_yajz/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
              <a href="https://www.facebook.com/jay.comendador.92" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a>
            </div>
          </div>
          <nav className="footer-link-column" aria-label="Explore">
            <h3>Explore</h3>
            {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          </nav>
          <nav className="footer-link-column" aria-label="Connect">
            <h3>Connect</h3>
            <a href="#connect">Contact</a>
            <a href="#certificates">Certificates</a>
            <a href="mailto:Jcomendador120@gmail.com">Email</a>
            <a href="tel:+639626317088">Phone</a>
          </nav>
          <nav className="footer-link-column" aria-label="Resources">
            <h3>Resources</h3>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
            <a href="/dashboard">Dashboard</a>
            <a href="#home">Back to top</a>
          </nav>
        </div>
        <div className="footer-bottom"><span>&copy; 2026 Jay Comendador</span></div>
      </footer>
      <div className={`project-detail-scrim${selectedProject ? ' is-open' : ''}`} aria-hidden="true" onClick={() => setSelectedProject(null)} />
      <aside className={`project-detail-panel${selectedProject ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label={selectedProject ? `${selectedProject.name} project details` : 'Project details'} aria-hidden={!selectedProject} inert={!selectedProject}>
        <button className="project-detail-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={18} /></button>
        {selectedProject && <><p className="eyebrow">PROJECT DETAILS</p>{selectedProject.image && <div className="project-detail-image"><img src={selectedProject.image} alt="" /></div>}<div className="project-text-heading"><h2>{selectedProject.name}</h2>{selectedProject.status && <span>{selectedProject.status}</span>}</div><p className="project-detail-description">{selectedProject.detail || 'Project details coming soon.'}</p>{selectedProject.technologies && <div className="project-detail-meta"><span>TECHNOLOGIES</span><p>{selectedProject.technologies}</p></div>}{selectedProject.url && /^https?:\/\//i.test(selectedProject.url) && <a className="button primary project-detail-link" href={selectedProject.url} target="_blank" rel="noopener noreferrer">Visit project <ExternalLink size={14} /></a>}</>}
      </aside>

    </main>
  );
}

function ContactForm({ email }) {
  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = `Name: ${form.get('name')}\nEmail: ${form.get('email')}\n\n${form.get('message')}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Portfolio inquiry from ${form.get('name')}`)}&body=${encodeURIComponent(body)}`;
  };
  return <form className="reference-contact-form" onSubmit={submit}>
    <div className="reference-contact-fields"><label>Your name<input name="name" autoComplete="name" required placeholder="Name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label></div>
    <label>Tell me about your project<textarea name="message" rows={4} required placeholder="A few details about what you have in mind…" /></label>
    <button className="button primary" type="submit">Send message <ArrowRight size={15} /></button>
  </form>;
}





