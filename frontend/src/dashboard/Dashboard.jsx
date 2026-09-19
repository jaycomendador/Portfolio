import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Bell, BriefcaseBusiness, CreditCard, FileText, Grid2X2, LogOut, Search, Settings, X } from 'lucide-react';
import profile from '../../public/profile.png';
import { loadPortfolioContent, loadProjects, savePortfolioContent, saveProjects } from './portfolioContent';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import PortfolioPage from './pages/PortfolioPage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';
import ProjectFormPage from './pages/ProjectFormPage';

const account = { username: 'jayadmin', password: 'JayPortfolio!2026' };
const nav = [['Dashboard', Grid2X2], ['Projects', BriefcaseBusiness], ['All info', FileText], ['Messages', CreditCard], ['Settings', Settings]];
const languageCategories = {
  'Core web': ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
  'Frontend frameworks': ['React', 'React Native', 'Vue', 'Angular', 'Svelte', 'Next.js'],
  'Styling & UI': ['Tailwind CSS', 'Bootstrap', 'Sass', 'Material UI', 'Chakra UI'],
  'Backend & data': ['Node.js', 'Express', 'PHP', 'Python', 'Java', 'C#', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase'],
  'Tools & platforms': ['Git', 'GitHub', 'Figma', 'GraphQL', 'Vite', 'Docker'],
};
export default function Dashboard() {
  const [username, setUsername] = useState(''); const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); const [signedIn, setSignedIn] = useState(() => sessionStorage.getItem('portfolio-dashboard') === 'signed-in');
  const [content, setContent] = useState(loadPortfolioContent); const [editing, setEditing] = useState(false); const [active, setActive] = useState(() => { const savedPage = localStorage.getItem('portfolio-dashboard-page'); return nav.some(([page]) => page === savedPage) ? savedPage : 'Dashboard'; });
  const [projects, setProjects] = useState(loadProjects);
  const [query, setQuery] = useState(''); const [notice, setNotice] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('portfolio-dashboard-theme') === 'dark');
  const [projectForm, setProjectForm] = useState(null);
  const [messages, setMessages] = useState([]); const [messagesStatus, setMessagesStatus] = useState('loading'); const [unreadCount, setUnreadCount] = useState(0);
  const [notificationOpen, setNotificationOpen] = useState(false); const [notificationMessages, setNotificationMessages] = useState([]);
  const knownMessageIds = useRef(null);
  const update = (e) => setContent((old) => ({ ...old, [e.target.name]: e.target.value }));
  const navigate = (item) => { localStorage.setItem('portfolio-dashboard-page', item); setActive(item); if (item === 'Messages') { setUnreadCount(0); setNotice(null); } };
  const signOut = () => { sessionStorage.removeItem('portfolio-dashboard'); setSignedIn(false); };
  function signIn(e) { e.preventDefault(); if (username === account.username && password === account.password) { sessionStorage.setItem('portfolio-dashboard', 'signed-in'); setSignedIn(true); setMessage(''); } else setMessage('Incorrect username or password.'); }
  function save(e) { e.preventDefault(); savePortfolioContent(content); setEditing(false); setActive('Dashboard'); setMessage('Changes saved.'); }
  const addProject = (project) => {
    const updatedProjects = [project, ...projects];
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    setContent((current) => ({ ...current, projects: String(updatedProjects.length) }));
    setProjectForm(null);
  };
  const updateProject = (updatedProject) => {
    const updatedProjects = projects.map((project) => project.id === updatedProject.id ? updatedProject : project);
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    setProjectForm(null);
  };
  const toggleDarkMode = () => setDarkMode((enabled) => { localStorage.setItem('portfolio-dashboard-theme', enabled ? 'light' : 'dark'); return !enabled; });
  useEffect(() => {
    if (!signedIn) return undefined;
    let active = true;
    const checkMessages = async () => {
      try {
        const response = await fetch('/api/contact');
        if (!response.ok || !active) return;
        const nextMessages = await response.json();
        if (!active) return;
        const previousIds = knownMessageIds.current;
        const newMessages = previousIds ? nextMessages.filter((item) => !previousIds.has(item._id)) : [];
        knownMessageIds.current = new Set(nextMessages.map((item) => item._id));
        setMessages(nextMessages);
        setMessagesStatus('ready');
        if (newMessages.length) {
          setUnreadCount((count) => count + newMessages.length);
          setNotificationMessages((current) => [...newMessages, ...current].slice(0, 10));
          setNotice(newMessages.length === 1 ? `New message from ${newMessages[0].name}.` : `${newMessages.length} new messages received.`);
        }
      } catch { if (active) setMessagesStatus('unavailable'); }
    };
    checkMessages();
    const interval = window.setInterval(checkMessages, 15000);
    return () => { active = false; window.clearInterval(interval); };
  }, [signedIn]);

  if (!signedIn) return <Login username={username} password={password} message={message} setUsername={setUsername} setPassword={setPassword} signIn={signIn} />;
  const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(query.toLowerCase()));
  const deleteMessage = async (id) => {
    const response = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.message || 'Unable to delete this message.'); }
    knownMessageIds.current?.delete(id);
    setMessages((current) => current.filter((item) => item._id !== id));
  };
  return <main className={darkMode ? 'client-dashboard dashboard-dark' : 'client-dashboard'} id="dashboard"><aside className="dashboard-sidebar"><button className="dashboard-profile" onClick={() => { window.location.href = '/'; }}><img src={profile} alt="Jay Comendador" /><strong>{content.fullName}</strong><span>Portfolio owner</span></button><nav>{nav.map(([item, Icon]) => <button key={item} type="button" className={active === item ? 'active' : ''} onClick={() => { setProjectForm(null); navigate(item); }}><Icon size={17} />{item}{item === 'Messages' && messages.length > 0 && <b className="sidebar-count">{messages.length}</b>}</button>)}</nav><button type="button" className="sidebar-help" onClick={() => { window.location.href = 'mailto:jcomendador120@gmail.com?subject=Portfolio%20dashboard%20support'; }}><small>Need help?</small><strong>Contact support</strong></button><button type="button" className="signout-button" onClick={signOut}><LogOut size={16} /> Sign out</button></aside><section className="dashboard-content"><header className="dashboard-header"><h1>{projectForm ? (projectForm.id ? 'Edit project' : 'Add new project') : active === 'Dashboard' ? <>Good morning, <span>{content.name}</span></> : active}</h1><div><label className="dashboard-search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects" /></label><button type="button" className="bell-button" aria-label={unreadCount ? `${unreadCount} new messages` : 'Notifications'} onClick={() => setNotificationOpen(true)}><Bell size={19} />{unreadCount > 0 && <b className="notification-count">{unreadCount > 9 ? '9+' : unreadCount}</b>}</button></div></header>{notice && <div className="dashboard-notice">{notice}<button type="button" onClick={() => setNotice(null)} aria-label="Close"><X size={14} /></button></div>}<DashboardBody active={active} content={content} filteredProjects={filteredProjects} setActive={navigate} edit={() => setEditing(true)} addProject={addProject} updateProject={updateProject} darkMode={darkMode} toggleDarkMode={toggleDarkMode} projectForm={projectForm} openProjectForm={setProjectForm} messages={messages} messagesStatus={messagesStatus} onDeleteMessage={deleteMessage} /></section>{notificationOpen && <NotificationModal notifications={notificationMessages} close={() => setNotificationOpen(false)} viewMessages={() => { setNotificationOpen(false); navigate('Messages'); }} />}{editing && <InformationModal content={content} update={update} save={save} close={() => setEditing(false)} message={message} />}</main>;
}

function DashboardBody({ active, content, filteredProjects, setActive, edit, addProject, updateProject, darkMode, toggleDarkMode, projectForm, openProjectForm, messages, messagesStatus, onDeleteMessage }) {
  if (projectForm) return <ProjectFormPage initialProject={projectForm.id ? projectForm : undefined} onSave={projectForm.id ? updateProject : addProject} onCancel={() => openProjectForm(null)} />;
  if (active === 'Projects') return <ProjectsPage projects={filteredProjects} onEdit={edit} onOpenAdd={() => openProjectForm({})} onOpenEdit={openProjectForm} />;
  if (active === 'All info') return <PortfolioPage content={content} onEdit={edit} />;
  if (active === 'Messages') return <MessagesPage messages={messages} status={messagesStatus} onDelete={onDeleteMessage} />;
  if (active === 'Settings') return <SettingsPage darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
  return <DashboardPage content={content} projects={filteredProjects} onNavigate={setActive} onEdit={edit} />;
}

function NotificationModal({ notifications, close, viewMessages }) {
  return <div className="notification-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="notification-modal" role="dialog" aria-modal="true" aria-labelledby="notification-title"><header><div><p className="dashboard-kicker">NOTIFICATIONS</p><h2 id="notification-title">Message activity</h2></div><button type="button" onClick={close} aria-label="Close notifications"><X size={17} /></button></header>{notifications.length ? <div className="notification-list">{notifications.map((item) => <article key={item._id}><b>{item.name}</b><span>sent you a new message</span><time>{new Date(item.createdAt).toLocaleString()}</time></article>)}</div> : <div className="notification-empty"><Bell size={22} /><strong>All caught up</strong><span>New portfolio messages will appear here.</span></div>}<footer><button type="button" className="project-secondary-button" onClick={close}>Close</button><button type="button" className="project-primary-button" onClick={viewMessages}>View messages</button></footer></section></div>;
}

function Login({ username, password, message, setUsername, setPassword, signIn }) { return <main className="dashboard-page"><section className="dashboard-login-card"><a className="dashboard-back" href="/"><ArrowLeft size={16} /> Back to portfolio</a><div className="dashboard-icon"><Grid2X2 size={26} /></div><p className="dashboard-kicker">PORTFOLIO ADMIN</p><h1>Welcome back</h1><p className="dashboard-copy">Sign in to manage your portfolio information.</p><form className="dashboard-form" onSubmit={signIn}><label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required /></label><label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required /></label><button>Sign in</button></form>{message && <p className="dashboard-message">{message}</p>}</section></main>; }
function InformationModal({ content, update, save, close, message }) { const updateLanguages = (languages, levels) => { update({ target: { name: 'languages', value: languages.join(', ') } }); update({ target: { name: 'skillLevels', value: levels } }); }; return <div className="information-modal-backdrop" role="presentation"><section className="information-modal" role="dialog" aria-modal="true" aria-labelledby="information-modal-title"><div className="information-modal-header"><div><p className="dashboard-kicker">PORTFOLIO ADMIN</p><h2 id="information-modal-title">Edit all information</h2><span>Projects are managed separately in the Projects section.</span></div><button type="button" onClick={close} aria-label="Close editor"><X size={18} /></button></div><form className="dashboard-editor" onSubmit={save}>{[['name','First name'],['fullName','Full name'],['role','Role'],['experience','Experience'],['clients','Clients count'],['email','Email'],['location','Location']].map(([name,label]) => <label key={name}>{label}<input name={name} value={content[name]} onChange={update} readOnly={name === 'name' || name === 'fullName'} aria-label={`${label}${name === 'name' || name === 'fullName' ? ' (locked)' : ''}`} required /></label>)}<LanguagePicker value={content.languages} levels={content.skillLevels || {}} onChange={updateLanguages} /><label className="dashboard-wide">Hero introduction<textarea name="intro" value={content.intro} onChange={update} rows="3" /></label><label className="dashboard-wide">About me<textarea name="about" value={content.about} onChange={update} rows="5" /></label><div className="information-modal-actions"><button type="button" className="project-secondary-button" onClick={close}>Cancel</button><button className="project-primary-button">Save changes</button></div></form>{message && <p className="dashboard-message dashboard-success">{message}</p>}</section></div>; }

function LanguagePicker({ value, levels, onChange }) { const [search, setSearch] = useState(''); const selected = value.split(',').map((item) => item.trim()).filter(Boolean); const matches = (language) => language.toLowerCase().includes(search.toLowerCase()); const toggle = (language) => { const next = selected.includes(language) ? selected.filter((item) => item !== language) : [...selected, language]; const nextLevels = { ...levels }; if (next.includes(language)) nextLevels[language] = nextLevels[language] || 50; else delete nextLevels[language]; onChange(next, nextLevels); }; const changeLevel = (language, percentage) => onChange(selected, { ...levels, [language]: Math.min(100, Math.max(1, Number(percentage) || 1)) }); return <fieldset className="language-picker dashboard-wide"><legend>Languages and technologies</legend><div className="language-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search frontend languages and tools" /></div><div className="selected-languages">{selected.length ? selected.map((language) => <label key={language}>{language}<input type="number" min="1" max="100" value={levels[language] || 50} onChange={(event) => changeLevel(language, event.target.value)} required /><span>%</span><button type="button" onClick={() => toggle(language)} aria-label={`Remove ${language}`}><X size={12} /></button></label>) : <span>Select the technologies you use.</span>}</div>{Object.entries(languageCategories).map(([category, languages]) => { const visibleLanguages = languages.filter(matches); return visibleLanguages.length ? <section className="language-category" key={category}><h3>{category}</h3><div>{visibleLanguages.map((language) => <button type="button" className={selected.includes(language) ? 'selected' : ''} key={language} onClick={() => toggle(language)}>{language}</button>)}</div></section> : null; })}</fieldset>; }
