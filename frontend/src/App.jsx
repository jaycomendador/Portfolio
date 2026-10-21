import { useEffect, useState } from 'react';
import { ArrowRight, Atom, Award, BriefcaseBusiness, Braces, ChevronDown, ChevronRight, Code2, Coffee, Database, ExternalLink, FileText, GitBranch, Globe2, Layers, LayoutDashboard, Leaf, Menu, Moon, Palette, PanelsTopLeft, Phone, Server, Sun, UsersRound, X, Monitor, Smartphone, PenTool } from 'lucide-react';
import profileImage from './assets/ako.png';
import GitHubContributions from './components/GitHubContributions.jsx';
import PortfolioChatbot from './components/PortfolioChatbot.jsx';
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
function TechIcon({ name }) { const [Icon, color] = skillIconMap[name] || [Code2, '#9aa8bb']; return <span className="arsenal-item-icon" style={{ '--skill-icon-color': color }} aria-hidden="true"><Icon size={15} strokeWidth={2.2} /></span>; }

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  // The public site intentionally opens in its dark presentation.
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('portfolio-theme') !== 'light');
  const [typedLength, setTypedLength] = useState(0);
  const [portfolioContent, setPortfolioContent] = useState(loadPortfolioContent);
  const [projects, setProjects] = useState(loadProjects);
  const [certificates, setCertificates] = useState(loadCertificates);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const toggleTheme = () => {
    const updateTheme = () => setDarkMode((enabled) => {
      const nextMode = !enabled;
      localStorage.setItem('portfolio-theme', nextMode ? 'dark' : 'light');
      return nextMode;
    });
    if (document.startViewTransition) {
      document.startViewTransition(updateTheme);
    } else {
      document.documentElement.classList.add('theme-transitioning');
      updateTheme();
      window.setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 2500);
    }
  };
  const codeSample = `const developer = {\n  name: '${portfolioContent.fullName}',\n  age: 21,\n  knowledge: 'I build responsive web and mobile apps with React and the MERN stack.'\n};`;
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
    const animatedItems = document.querySelectorAll('[data-scroll-animation], .portfolio-page > section[id], .github-activity-section');
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
    const delay = typedLength < codeSample.length ? 32 : 1800;
    const timer = window.setTimeout(() => setTypedLength((length) => length < codeSample.length ? length + 1 : 0), delay);
    return () => window.clearTimeout(timer);
  }, [typedLength, codeSample]);
  const links = [['Home', '#home'], ['About', '#about'], ['Skills', '#skills'], ['Projects', '#works'], ['Certificates', '#certificates'], ['Contact', '#connect']];
  const frontendSkills = ['HTML5', 'CSS3', 'React.js', 'React Native'];
  const professionalSkills = ['Figma', 'Git/GitHub'];
  const fullStackSkills = ['MERN Stack'];
  const backendSkills = ['Node.js', 'REST APIs', 'MySQL', 'PHP', 'MongoDB'];
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);
  const clientCount = Math.max(0, Number.parseInt(portfolioContent.clients, 10) || 0);
  const deployedWebsiteCount = projects.filter((project) => typeof project?.status === 'string' && project.status.toLowerCase() === 'live' && /^https?:\/\//i.test(project.url || '')).length;
  const programmingLanguages = Object.entries({ Java: 50, Python: 50, ...portfolioContent.programmingLanguageLevels });
  const arsenalLevels = { 'MERN Stack': 70, HTML5: 85, CSS3: 80, 'React.js': 70, 'Node.js': 65, 'React Native': 50, 'REST APIs': 50, 'Git/GitHub': 46, Figma: 49, MySQL: 80, PHP: 55, MongoDB: 70, ...portfolioContent.arsenalLevels };
  return (
    <main className={darkMode ? 'portfolio-page dark-mode' : 'portfolio-page'}>
      <section className="hero-section" id="home">
        <header className="site-header shell">
          <a className="brand" href="#home"><img src="/Glossy%20Black%20and%20Gold%20JC%20Monogram.png" alt="" /><span>Portfolio</span></a>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>{links.map(([label, href]) => <a onClick={() => setMenuOpen(false)} href={href} key={label}>{label}</a>)}<button className="mobile-theme-button" onClick={toggleTheme} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={darkMode}><span className="theme-pill" aria-hidden="true"><span className="theme-indicator" /><span className="theme-sun"><Sun size={13} /></span><span className="theme-moon"><Moon size={13} /></span></span><span>{darkMode ? 'Light mode' : 'Dark mode'}</span></button></nav>
          <div className="social-links"><a href="#connect">f</a><a href="#connect">in</a><a href="#connect">â—Ž</a></div>
          <button className="theme-button" onClick={toggleTheme} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={darkMode} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}><span className="theme-indicator" /><span className="theme-sun"><Sun size={13} /></span><span className="theme-moon"><Moon size={13} /></span></button>
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </header>
        <div className="hero shell">
          <div className="hero-copy"><p className="eyebrow">PORTFOLIO â€” 2026</p><h1>Hello I'm <span>{portfolioContent.name}</span></h1><h2>{portfolioContent.role}</h2><p className="intro">{portfolioContent.intro}</p><div className="hero-actions"><a className="button primary" href="#works">View Projects <ArrowRight size={14} /></a><a className="button secondary" href="#connect">Contact Me</a></div><div className="hero-secondary-links"><a href="/resume.pdf" target="_blank" rel="noreferrer">View Resume <ExternalLink size={12} /></a><a href="#services">Explore Services <ArrowRight size={12} /></a></div><div className="hero-stats" aria-label="Portfolio statistics"><article><div><BriefcaseBusiness size={13} /><strong>{projects.length}</strong></div><span>Projects</span></article><article><div><UsersRound size={13} /><strong>{clientCount}</strong></div><span>Clients</span></article><article><div><Globe2 size={13} /><strong>{deployedWebsiteCount}</strong></div><span>Deployed websites</span></article></div></div>
          <aside className="code-card" aria-label="Developer code sample"><div className="code-card-top"><span><i /> <i /> <i /></span><b>developer.js</b></div><code className="typing-code">{codeSample.slice(0, typedLength)}<span className="typing-cursor" aria-hidden="true" /></code></aside>
          <div className="hero-art" aria-label="Portrait of Jay Comendador"><div className="orb orb-one" /><div className="orb orb-two" /><img className="hero-portrait" src={profileImage} alt="Jay Comendador" /></div>
        </div>
      </section>
      <section className="about-section" id="about"><div className="shell about-grid"><div className="standing-figure" data-scroll-animation><div className="sf-head" /><div className="sf-body" /><div className="sf-leg one" /><div className="sf-leg two" /></div><article className="about-card" data-scroll-animation><p className="eyebrow">GET TO KNOW ME</p><h2>About Me</h2><p>{portfolioContent.about}</p><a href="#certificates" className="button outline">View certificates <ChevronRight size={14} /></a></article></div></section>
      <section className="skills-section" id="skills"><div className="shell"><div className="arsenal-heading"><h2><span className="arsenal-heading-icon" aria-hidden="true"><Code2 size={18} /></span> Technical Arsenal</h2><small>/ stack</small></div><div className="arsenal-grid"><div className="arsenal-column"><h3><span className="arsenal-section-icon frontend-icon" aria-hidden="true"><PanelsTopLeft size={14} /></span> Frontend</h3><ul>{frontendSkills.map((skill) => <li key={skill}><span className="arsenal-skill-name"><TechIcon name={skill} />{skill}</span><small>{arsenalLevels[skill]}%</small></li>)}</ul><h3 className="arsenal-subheading"><span className="arsenal-section-icon languages-icon" aria-hidden="true"><Braces size={14} /></span> Programming Languages</h3><div className="language-proficiency-list">{programmingLanguages.map(([language, level]) => <div className="language-proficiency" key={language}><span className="language-proficiency-name"><TechIcon name={language} />{language}</span><div className="proficiency-track"><span style={{ width: `${Math.min(100, Math.max(0, Number(level) || 0))}%` }} /></div><small>{level}%</small></div>)}</div></div><div className="arsenal-column"><h3><span className="arsenal-section-icon backend-icon" aria-hidden="true"><Server size={14} /></span> Backend</h3><ul>{backendSkills.map((skill) => <li key={skill}><span className="arsenal-skill-name"><TechIcon name={skill} />{skill}</span><small>{arsenalLevels[skill]}%</small></li>)}</ul><h3 className="arsenal-subheading"><span className="arsenal-section-icon fullstack-icon" aria-hidden="true"><Layers size={14} /></span> Full Stack</h3><ul>{fullStackSkills.map((skill) => <li key={skill}><span className="arsenal-skill-name"><TechIcon name={skill} />{skill}</span><small>{arsenalLevels[skill]}%</small></li>)}</ul><h3 className="arsenal-subheading"><span className="arsenal-section-icon design-icon" aria-hidden="true"><Palette size={14} /></span> Design &amp; Tools</h3><ul>{professionalSkills.map((skill) => <li key={skill}><span className="arsenal-skill-name"><TechIcon name={skill} />{skill}</span><small>{arsenalLevels[skill]}%</small></li>)}</ul></div></div></div></section>
      <GitHubContributions username="jaycomendador" />
      <section className="content-section" id="works"><div className="shell projects-shell"><div className="section-title left"><p className="eyebrow">SELECTED WORK</p><h2>Recent Projects</h2></div><div className="project-text-list" id="project-list">{visibleProjects.map((project) => { const liveUrl = /^https?:\/\//i.test(project.url || '') ? project.url : ''; const rowContent = <><div className="project-text-copy"><div className="project-text-heading"><h3>{project.name}</h3>{project.status && <span>{project.status}</span>}</div><p>{project.detail || 'Project details coming soon.'}</p>{project.technologies && <small>{project.technologies}</small>}</div>{liveUrl && <span className="project-open-label">View website <ArrowRight size={14} /></span>}</>; return liveUrl ? <a className="project-text-row project-text-row-link" key={project.id || project.name} href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} website`}>{rowContent}</a> : <article className="project-text-row" key={project.id || project.name}>{rowContent}</article>; })}{!projects.length && <p className="project-list-empty">Projects will appear here soon.</p>}</div>{projects.length > 3 && <button className="view-all-projects" type="button" aria-expanded={showAllProjects} aria-controls="project-list" onClick={() => setShowAllProjects((visible) => !visible)}>{showAllProjects ? 'Show fewer projects' : 'View all projects'}<ChevronDown size={15} className={showAllProjects ? 'expanded' : ''} /></button>}</div></section>
      <section className="services-section" id="services"><div className="shell"><div className="section-title left"><p className="eyebrow">WHAT I CAN DO</p><h2>Services</h2><span>From the first sketch to a polished, working product.</span></div><div className="services-grid"><article className="service-card" data-scroll-animation><div className="service-icon"><Monitor size={23} /></div><span className="service-number">01</span><h3>Web Frontend</h3><p>Responsive, accessible websites built to look sharp and work smoothly on every screen.</p><div className="service-tags"><span>Web design</span><span>Development</span><span>Responsive</span></div></article><article className="service-card" data-scroll-animation><div className="service-icon"><Smartphone size={23} /></div><span className="service-number">02</span><h3>App Development</h3><p>Mobile app interfaces and features shaped around real user needs and a simple experience.</p><div className="service-tags"><span>Mobile UI</span><span>App development</span><span>Usability</span></div></article><article className="service-card" data-scroll-animation><div className="service-icon"><PenTool size={23} /></div><span className="service-number">03</span><h3>Figma Prototypes</h3><p>Clickable Figma prototypes that make ideas easy to explore, review, and validate before development.</p><div className="service-tags"><span>Wireframes</span><span>UI/UX</span><span>Prototype</span></div></article></div><a className="services-cta" href="#connect">Have a project in mind? <span>Let&apos;s talk <ArrowRight size={14} /></span></a></div></section>      <section className="certificates-section" id="certificates"><div className="shell"><div className="section-title"><p className="eyebrow">LEARNING & ACHIEVEMENTS</p><h2>Certificates</h2><span>Click a certificate to view it.</span></div>{certificates.length ? <div className="certificate-grid">{certificates.map((certificate) => <button className="portfolio-certificate-card certificate-text-card" type="button" key={certificate.id} onClick={() => setSelectedCertificate(certificate)}><span className="certificate-text-kicker"><Award size={14} /> Certificate</span><strong>{certificate.title}</strong><span className="certificate-text-issuer">{certificate.issuer}{certificate.issued ? ` · ${certificate.issued}` : ''}</span><span className="certificate-text-open">Click to view certificate <ExternalLink size={13} /></span></button>)}</div> : <div className="certificates-empty"><Award size={28} /><p>Certificates will be added here soon.</p></div>}</div></section>
      <section className="connect-section" id="connect"><div className="shell"><div className="connect-heading"><h2><span></span>Connect</h2><small>/contact</small></div><div className="connect-grid"><a className="connect-card" href="https://github.com/jaycomendador" target="_blank" rel="noreferrer"><span className="connect-icon connect-icon-github"><GitHubIcon /></span><span><strong>GitHub</strong><small>jaycomendador</small></span><ExternalLink size={14} /></a><a className="connect-card" href="https://mail.google.com/mail/?view=cm&fs=1&to=Jcomendador120%40gmail.com" target="_blank" rel="noreferrer"><span className="connect-icon connect-icon-email"><GmailIcon /></span><span><strong>Email</strong><small>Jcomendador120@gmail.com</small></span><ExternalLink size={14} /></a><a className="connect-card" href="tel:+639626317088"><span className="connect-icon connect-icon-phone"><Phone size={21} /></span><span><strong>Phone</strong><small>+63 962 631 7088</small></span><ArrowRight size={14} /></a><a className="connect-card" href="https://www.facebook.com/jay.comendador.92" target="_blank" rel="noreferrer"><span className="connect-icon connect-icon-facebook"><FacebookIcon /></span><span><strong>Facebook</strong><small>Connect with me</small></span><ExternalLink size={14} /></a><a className="connect-card" href="https://www.linkedin.com/in/jay-comendador-b81074313" target="_blank" rel="noreferrer"><span className="connect-icon connect-icon-linkedin"><LinkedInIcon /></span><span><strong>LinkedIn</strong><small>Connect with me</small></span><ExternalLink size={14} /></a><a className="connect-card" href="https://www.instagram.com/mr_yajz/?hl=en" target="_blank" rel="noreferrer"><span className="connect-icon connect-icon-instagram"><InstagramIcon /></span><span><strong>Instagram</strong><small>@mr_yajz</small></span><ExternalLink size={14} /></a></div></div></section>      <footer className="site-footer shell"><span>© 2026 Jay Comendador</span><div><a href="#home">Back to top</a><a className="dashboard-link" aria-label="Open portfolio dashboard" title="Portfolio dashboard" href="/dashboard"><LayoutDashboard size={16} /></a></div></footer>
      {selectedCertificate && <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />}
      <PortfolioChatbot content={portfolioContent} projects={projects} certificates={certificates} />
    </main>
  );
}

function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const isPdf = certificate.fileType === 'application/pdf';
  return <div className="certificate-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title">
      <header><div><p className="eyebrow">CERTIFICATE</p><h2 id="certificate-modal-title">{certificate.title}</h2><p>{certificate.issuer}{certificate.issued ? ` · ${certificate.issued}` : ''}</p></div><button type="button" onClick={onClose} aria-label="Close certificate">×</button></header>
      <div className="certificate-modal-content">{isPdf ? <iframe src={certificate.fileData} title={`${certificate.title} certificate`} /> : <img src={certificate.fileData} alt={`${certificate.title} certificate`} />}</div>
      <footer>{certificate.credentialUrl && <a href={certificate.credentialUrl} target="_blank" rel="noreferrer">Verify credential <ExternalLink size={14} /></a>}{isPdf && <a href={certificate.fileData} target="_blank" rel="noreferrer">Open PDF <ExternalLink size={14} /></a>}</footer>
    </section>
  </div>;
}
  
  
