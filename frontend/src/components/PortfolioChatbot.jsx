import { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';

function answerFromPortfolio(question, portfolio) {
  const query = question.toLowerCase();
  const sections = [];
  const projectMatch = portfolio.projects.find((project) => query.includes(project.name.toLowerCase()));
  const listedSkills = [...new Set([...Object.keys(portfolio.skillLevels || {}), ...Object.keys(portfolio.arsenalLevels || {}), ...Object.keys(portfolio.programmingLanguageLevels || {})])];
  const wantsProjects = /project|work|website|site|vercel|deployed|live/.test(query);
  const wantsAbout = /about|who|background|bio|name|location|experience|education|school|university|degree/.test(query);
  const wantsSkills = /skill|technology|technologies|tech stack|programming|language|tools/.test(query) || listedSkills.some((skill) => query.includes(skill.toLowerCase().replace(/\.js$/, '')));
  const wantsCertificates = /certificate|certification|credential/.test(query);
  const wantsContact = /contact|email|phone|reach|hire|message/.test(query);
  const wantsSocial = /github|linkedin|facebook|instagram|social/.test(query);
  const wantsStats = /client|count|number of|how many/.test(query);
  const wantsServices = /service|offer|build|website|app|design|prototype/.test(query);
  const wantsOverview = /all|everything|tell me|what do you know|information/.test(query);

  if (wantsAbout || wantsOverview || (!wantsProjects && !wantsSkills && !wantsCertificates && !wantsContact && !wantsSocial && !wantsStats && !wantsServices && !projectMatch)) {
    sections.push(`${portfolio.fullName || 'Jay Comendador'} is a ${portfolio.role || 'Frontend Developer'}${portfolio.location ? ` based in ${portfolio.location}` : ''}.${portfolio.experience ? ` He has ${portfolio.experience} of experience.` : ''} ${portfolio.about || portfolio.intro || ''}`);
  }
  if (wantsProjects || projectMatch || wantsOverview) {
    const matchingProjects = projectMatch ? [projectMatch] : portfolio.projects;
    sections.push(matchingProjects.length ? `Projects: ${matchingProjects.map((project) => `${project.name} — ${project.detail || 'project'}${project.status ? ` (${project.status})` : ''}${project.url ? `: ${project.url}` : ''}`).join('; ')}.` : 'There are no projects listed yet.');
  }
  if (wantsSkills || wantsOverview) {
    sections.push(`Skills and technologies: ${portfolio.languages || listedSkills.join(', ') || 'Details are listed in the Technical Arsenal section.'}${listedSkills.length ? ` (including ${listedSkills.join(', ')})` : ''}.`);
  }
  if (wantsCertificates || wantsOverview) sections.push(portfolio.certificates.length ? `Certificates: ${portfolio.certificates.map((certificate) => `${certificate.title}${certificate.issuer ? ` from ${certificate.issuer}` : ''}`).join(', ')}.` : 'No certificates are listed yet.');
  if (wantsServices || wantsOverview) sections.push('Services include web frontend development, app development, and Figma prototyping.');
  if (wantsContact || wantsOverview) sections.push(`Contact Jay at ${portfolio.email || 'jcomendador120@gmail.com'}${portfolio.phone ? ` or ${portfolio.phone}` : ''}.`);
  if (wantsSocial || wantsOverview) sections.push(`Social links: ${Object.entries(portfolio.socialLinks || {}).map(([site, url]) => `${site}: ${url}`).join('; ') || 'See the Connect section.'}.`);
  if (wantsStats || wantsOverview) sections.push(`The portfolio currently lists ${portfolio.projects.length} projects and ${portfolio.clients || 0} clients.`);

  if (!sections.length) return `I can share details about ${portfolio.fullName || 'Jay'}, projects, skills, certificates, services, or contact information. What would you like to know?`;
  return sections.join('\n\n');
}

const welcome = 'Hi! Ask me about Jay’s background, skills, projects, certificates, or contact details.';

function TypewriterMessage({ message }) {
  const [visibleText, setVisibleText] = useState('');
  useEffect(() => {
    const characters = Array.from(message.text);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleText(message.text);
      return undefined;
    }
    let position = 0;
    const timer = window.setInterval(() => {
      position += 1;
      setVisibleText(characters.slice(0, position).join(''));
      if (position >= characters.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [message.id, message.text]);

  const isTyping = visibleText.length < message.text.length;
  return <p className={`portfolio-chat-message ${message.from}`}>{visibleText}{isTyping && <span className="portfolio-chat-type-cursor" aria-hidden="true" />}</p>;
}

export default function PortfolioChatbot({ content, projects, certificates }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([{ id: 0, from: 'bot', text: welcome }]);
  const [isTyping, setIsTyping] = useState(false);
  const messageList = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    input.current?.focus();
    const closeOnEscape = (event) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (messageList.current) messageList.current.scrollTop = messageList.current.scrollHeight;
  }, [messages, open]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;
    const now = Date.now();
    setMessages((current) => [...current, { id: now, from: 'user', text: question }]);
    setIsTyping(true);
    setDraft('');
    const history = messages.filter((item) => item.id !== 0).map((item) => ({
      role: item.from === 'bot' ? 'assistant' : 'user',
      content: item.text,
    }));
    const portfolio = {
      name: content.name,
      fullName: content.fullName,
      role: content.role,
      experience: content.experience,
      clients: content.clients,
      intro: content.intro,
      about: content.about,
      languages: content.languages,
      skillLevels: content.skillLevels,
      programmingLanguageLevels: content.programmingLanguageLevels,
      arsenalLevels: content.arsenalLevels,
      location: content.location,
      email: content.email,
      phone: '+63 962 631 7088',
      socialLinks: {
        GitHub: 'https://github.com/jaycomendador',
        Facebook: 'https://www.facebook.com/jay.comendador.92',
        LinkedIn: 'https://www.linkedin.com/in/jay-comendador-b81074313',
        Instagram: 'https://www.instagram.com/mr_yajz/?hl=en',
      },
      services: ['Web frontend development', 'App development', 'Figma prototyping'],
      projects: projects.map(({ name, detail, status, url, technologies }) => ({ name, detail, status, url, technologies })),
      certificates: certificates.map(({ title, issuer, issued }) => ({ title, issuer, issued })),
    };
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history, portfolio }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.status === 404 || response.status === 503) {
        setMessages((current) => [...current, { id: `${now}-reply`, from: 'bot', text: answerFromPortfolio(question, portfolio) }]);
        return;
      }
      if (!response.ok) throw new Error(result.message || 'The AI assistant is temporarily unavailable. Please try again shortly.');
      if (typeof result.reply !== 'string' || !result.reply.trim()) throw new Error('The AI assistant returned an empty reply. Please try again.');
      setMessages((current) => [...current, { id: `${now}-reply`, from: 'bot', text: result.reply }]);
    } catch (error) {
      setMessages((current) => [...current, { id: `${now}-reply`, from: 'bot', text: answerFromPortfolio(question, portfolio) }]);
    } finally {
      setIsTyping(false);
    }
  };

  return <aside className="portfolio-chat-widget" aria-label="Portfolio assistant">
    {open && <section className="portfolio-chat-panel" role="dialog" aria-modal="false" aria-labelledby="portfolio-chat-title">
      <header className="portfolio-chat-header"><span className="portfolio-chat-avatar"><Bot size={18} /></span><span><strong id="portfolio-chat-title">Portfolio assistant</strong><small>Ask about Jay’s work</small></span><button type="button" onClick={() => setOpen(false)} aria-label="Close chat"><X size={17} /></button></header>
      <div className="portfolio-chat-messages" ref={messageList} aria-live="polite">{messages.map((message) => message.from === 'bot' ? <TypewriterMessage message={message} key={message.id} /> : <p className="portfolio-chat-message user" key={message.id}>{message.text}</p>)}{isTyping && <div className="portfolio-chat-typing" role="status" aria-label="Assistant is typing"><i /><i /><i /></div>}</div>
      <form className="portfolio-chat-form" onSubmit={sendMessage}><input ref={input} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={isTyping ? 'Writing a reply...' : 'Ask about my portfolio...'} aria-label="Ask about this portfolio" disabled={isTyping} /><button type="submit" aria-label="Send message" disabled={!draft.trim() || isTyping}><Send size={16} /></button></form>
    </section>}
    <button type="button" className="portfolio-chat-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close portfolio assistant' : 'Ask about my portfolio'} title={open ? 'Close chat' : 'Ask about my portfolio'}><span className="portfolio-chat-toggle-icon">{open ? <X size={21} /> : <MessageCircle size={22} />}</span></button>
  </aside>;
}
