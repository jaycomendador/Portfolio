import { useEffect, useState } from 'react';
import { ArrowRight, Award, ChevronRight, Code2, ExternalLink, FileText, LayoutDashboard, Menu, Moon, Palette, Phone, Sun, X } from 'lucide-react';
import profileImage from './assets/ako.png';
import { loadCertificates, loadPortfolioContent, loadProjects } from './dashboard/portfolioContent';

const GitHubIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.52.1.72-.22.72-.5v-1.96c-2.93.64-3.55-1.24-3.55-1.24-.48-1.22-1.17-1.55-1.17-1.55-.96-.65.07-.64.07-.64 1.06.08 1.62 1.09 1.62 1.09.94 1.61 2.47 1.14 3.07.87.1-.68.37-1.14.67-1.4-2.34-.27-4.8-1.17-4.8-5.2 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.34.1-2.8 0 0 .88-.28 2.89 1.08A10 10 0 0 1 12 8.14c.9 0 1.8.12 2.64.36 2.01-1.36 2.89-1.08 2.89-1.08.57 1.46.21 2.53.1 2.8.67.74 1.08 1.68 1.08 2.83 0 4.04-2.47 4.92-4.82 5.18.38.33.72.97.72 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z" /></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.87.24-1.46 1.5-1.46h1.6V3.96c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.88 1.4-3.88 3.98V10H7.8v3h2.6v8h3.1Z" /></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.3" cy="6.8" r="1.1" fill="currentColor" /></svg>;
const GmailIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M3 6.6A1.6 1.6 0 0 1 5.6 5.3L7 6.4v12.1H3z" /><path fill="#34A853" d="M17 6.4l1.4-1.1A1.6 1.6 0 0 1 21 6.6v11.9h-4z" /><path fill="#EA4335" d="M3 6.6a1.6 1.6 0 0 1 2.6-1.3L12 10.2l6.4-4.9A1.6 1.6 0 0 1 21 6.6v2L12 15.5 3 8.6z" /><path fill="#FBBC04" d="M17 9.3l4-3v12.2h-4z" /></svg>;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  // The public site intentionally opens in its dark presentation.
  const [darkMode, setDarkMode] = useState(true);
  const [typedLength, setTypedLength] = useState(0);
  const [portfolioContent] = useState(loadPortfolioContent);
  const [projects] = useState(loadProjects);
  const [certificates] = useState(loadCertificates);
  const codeSample = `const developer = {\n  name: '${portfolioContent.fullName}',\n  experience: '${portfolioContent.experience}',\n  projects: '${portfolioContent.projects}',\n  clients: '${portfolioContent.clients}'\n};`;
  useEffect(() => {
    const animatedItems = document.querySelectorAll('[data-scroll-animation]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
    }, { threshold: 0.18 });
    animatedItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const delay = typedLength < codeSample.length ? 32 : 1800;
    const timer = window.setTimeout(() => setTypedLength((length) => length < codeSample.length ? length + 1 : 0), delay);
    return () => window.clearTimeout(timer);
  }, [typedLength, codeSample]);
  const links = [['Home', '#home'], ['About', '#about'], ['Skills', '#skills'], ['Projects', '#works'], ['Certificates', '#certificates']];
  const skillIcons = { html: 'html5', css: 'css', javascript: 'javascript', typescript: 'typescript', react: 'react', 'react native': 'react', vue: 'vuedotjs', angular: 'angular', svelte: 'svelte', nextjs: 'nextdotjs', nodejs: 'nodedotjs', express: 'express', php: 'php', python: 'python', java: 'openjdk', csharp: 'csharp', mysql: 'mysql', postgresql: 'postgresql', mongodb: 'mongodb', firebase: 'firebase', tailwindcss: 'tailwindcss', bootstrap: 'bootstrap', sass: 'sass', git: 'git', figma: 'figma', graphql: 'graphql', vite: 'vite', docker: 'docker' };
  const skillTones = ['yellow', 'sky', 'orange', 'cyan', 'purple', 'green'];
  const skills = portfolioContent.languages.split(',').map((language, index) => {
    const name = language.trim(); const lookup = name.toLowerCase().replace(/\s+/g, '');
    return { name, icon: `https://cdn.simpleicons.org/${skillIcons[lookup] || 'javascript'}/6f8fb0`, tone: skillTones[index % skillTones.length], level: Math.min(100, Math.max(1, Number(portfolioContent.skillLevels?.[name]) || 50)) };
  }).filter(({ name }) => name);
  return (
    <main className={darkMode ? 'portfolio-page dark-mode' : 'portfolio-page'}>
      <section className="hero-section" id="home">
        <header className="site-header shell">
          <a className="brand" href="#home"><Code2 size={16} /> <span>Portfolio</span></a>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>{links.map(([label, href]) => <a onClick={() => setMenuOpen(false)} href={href} key={label}>{label}</a>)}<button className="mobile-theme-button" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">{darkMode ? <Sun size={16} /> : <Moon size={16} />}<span>{darkMode ? 'Light mode' : 'Dark mode'}</span></button></nav>
          <div className="social-links"><a href="#contact">f</a><a href="#contact">in</a><a href="#contact">◎</a></div>
          <button className="theme-button" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">{darkMode ? <Sun size={15} /> : <Moon size={15} />}</button>
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </header>
        <div className="hero shell">
          <div className="hero-copy"><p className="eyebrow">PORTFOLIO — 2026</p><h1>Hello I'm <span>{portfolioContent.name}</span></h1><h2>{portfolioContent.role}</h2><p className="intro">{portfolioContent.intro}</p><div className="intro-social-links" aria-label="Social media links"><a href="https://github.com/jaycomendador" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a><a href="https://www.facebook.com/jay.comendador.92" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a><a href="https://www.instagram.com/mr_yajz/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a><a href="https://mail.google.com/mail/?view=cm&fs=1&to=Jcomendador120%40gmail.com" target="_blank" rel="noreferrer" aria-label="Email Jcomendador120@gmail.com" title="Email me"><GmailIcon /></a><a href="tel:+639626317088" onClick={(event) => { if (!window.confirm('Would you like to call me at 09626317088?')) event.preventDefault(); }} aria-label="Call 09626317088" title="Call 09626317088"><Phone size={15} /></a></div><div className="hero-actions"><a className="button primary" href="#works">View Projects <ArrowRight size={14} /></a><a className="button secondary" href="https://mail.google.com/mail/?view=cm&fs=1&to=Jcomendador120%40gmail.com" target="_blank" rel="noreferrer">Contact Me</a></div></div>
          <aside className="code-card" aria-label="Developer code sample"><div className="code-card-top"><span><i /> <i /> <i /></span><b>developer.js</b></div><code className="typing-code">{codeSample.slice(0, typedLength)}<span className="typing-cursor" aria-hidden="true" /></code></aside>
          <div className="hero-art" aria-label="Portrait of Jay Comendador"><div className="orb orb-one" /><div className="orb orb-two" /><img className="hero-portrait" src={profileImage} alt="Jay Comendador" /></div>
        </div>
      </section>
      <section className="about-section" id="about"><div className="shell about-grid"><div className="standing-figure" data-scroll-animation><div className="sf-head" /><div className="sf-body" /><div className="sf-leg one" /><div className="sf-leg two" /></div><article className="about-card" data-scroll-animation><p className="eyebrow">GET TO KNOW ME</p><h2>About Me</h2><p>{portfolioContent.about}</p><a href="#certificates" className="button outline">View certificates <ChevronRight size={14} /></a></article></div></section>
      <section className="skills-section" id="skills"><div className="shell"><div className="section-title"><p className="eyebrow">MY TOOLKIT</p><h2>My Tech Stack</h2><span>Technologies I specialize in</span></div><div className="skills-grid">{skills.map(({ name, icon, tone, level }) => <div className={'skill-card ' + tone} data-scroll-animation key={name}><img className="skill-icon" src={icon} alt="" /><strong>{name}</strong><div className="skill-level"><span style={{ width: `${level}%` }} /></div><small>{level}%</small></div>)}</div></div></section>
      <section className="content-section" id="works"><div className="shell"><div className="section-title left"><p className="eyebrow">SELECTED WORK</p><h2>Recent Projects</h2></div><div className="work-grid">{projects.map((project, i) => <article className="work-card" data-scroll-animation key={project.id || project.name}><div className={'work-preview preview-' + i}>{project.image ? <img src={project.image} alt={`${project.name} website preview`} /> : <Palette size={28} />}</div><p>{project.technologies || 'Project'}</p><h3>{project.name}</h3><span className="project-description">{project.detail}</span><a href={project.url || '#certificates'} target={project.url ? '_blank' : undefined} rel={project.url ? 'noreferrer' : undefined}>View project <ArrowRight size={14} /></a></article>)}</div></div></section>
      <section className="certificates-section" id="certificates"><div className="shell"><div className="section-title"><p className="eyebrow">LEARNING & ACHIEVEMENTS</p><h2>Certificates</h2><span>Professional certificates and courses I have completed</span></div>{certificates.length ? <div className="certificate-grid">{certificates.map((certificate) => <article className="portfolio-certificate-card" key={certificate.id}><div className="portfolio-certificate-preview">{certificate.fileType === 'application/pdf' ? <FileText size={34} /> : <img src={certificate.fileData} alt={`${certificate.title} certificate`} />}</div><div className="portfolio-certificate-details"><span><Award size={14} /> Certificate</span><h3>{certificate.title}</h3><p>{certificate.issuer}{certificate.issued ? ` · ${certificate.issued}` : ''}</p>{certificate.credentialUrl && <a href={certificate.credentialUrl} target="_blank" rel="noreferrer">View credential <ExternalLink size={13} /></a>}{certificate.fileType === 'application/pdf' && <a href={certificate.fileData} target="_blank" rel="noreferrer">Open certificate <ExternalLink size={13} /></a>}</div></article>)}</div> : <div className="certificates-empty"><Award size={28} /><p>Certificates will be added here soon.</p></div>}</div></section>
      <footer className="site-footer shell"><span>© 2026 Jay Comendador</span><div><a href="#home">Back to top</a><a className="dashboard-link" aria-label="Open portfolio dashboard" title="Portfolio dashboard" href="/dashboard"><LayoutDashboard size={16} /></a></div></footer>
    </main>
  );
}
  
  
