export const defaultPortfolioContent = {
  name: 'Jay', fullName: 'Jay Comendador', role: 'Frontend Developer', experience: '4 Years', projects: '4', clients: '1',
  intro: 'Building modern, responsive, user-friendly web applications with React.js, React Native, and Tailwind CSS.',
  about: "I'm a 20-year-old developer from Calbayog City, Samar, and a 4th-year college student taking Bachelor of Science in Information Technology (BSIT) at Northwest Samar State University (NWSSU). I build applications with the MERN stack and AI-assisted tools, focusing on clean UI design, simple and efficient code, and user-friendly experiences.",
  languages: 'JavaScript, React, Node.js, MongoDB, HTML, CSS, PHP, MySQL',
  skillLevels: { JavaScript: 70, React: 70, 'Node.js': 65, MongoDB: 70, HTML: 85, CSS: 80, PHP: 55, MySQL: 80 },
  programmingLanguageLevels: { Java: 50, Python: 50 },
  arsenalLevels: { 'MERN Stack': 70, HTML5: 85, CSS3: 80, 'React.js': 70, 'Node.js': 65, 'React Native': 50, 'REST APIs': 50, 'Git/GitHub': 46, Figma: 49, MySQL: 80, PHP: 55, MongoDB: 70 },
  email: 'jcomendador120@gmail.com',
  location: 'Calbayog City, Samar, Philippines',
};

export function loadPortfolioContent() {
  try {
    const stored = JSON.parse(localStorage.getItem('portfolio-content') || 'null');
    if (localStorage.getItem('portfolio-client-count-adjusted') !== 'true') {
      const content = { ...defaultPortfolioContent, ...(stored || {}) };
      content.clients = String(Math.max(0, Number.parseInt(content.clients, 10) || 0) + 2);
      localStorage.setItem('portfolio-client-count-adjusted', 'true');
      savePortfolioContent(content);
      return content;
    }
    return { ...defaultPortfolioContent, ...(stored || {}) };
  } catch { return defaultPortfolioContent; }
}

export function savePortfolioContent(content) { localStorage.setItem('portfolio-content', JSON.stringify(content)); }

export const defaultProjects = [
  { id: 'alerto-calbayog', name: 'AlertoCalbayog', detail: 'Emergency response system', status: 'Live', url: 'https://alertocalbayog.com', technologies: 'React, Node.js, MongoDB', image: alertoCalbayogImage },
  { id: 'fpop-healthhub', name: 'FPOP HealthHub', detail: 'Clinic management platform', status: 'In progress', url: 'https://fpopclinic.com', technologies: 'React, Express, MongoDB', image: fpopClinicImage },
  { id: 'ayeskeopi', name: 'Ayskeopi', detail: 'Coffee ordering system', status: 'Complete', url: 'https://ayskeopi.vercel.app/', technologies: 'JavaScript, HTML, CSS', image: ayskeopiImage },
  { id: 'crms', name: 'CRMS', detail: 'Room maintenance system', status: 'Complete', url: 'https://crms-rho-weld.vercel.app/', technologies: 'PHP, MySQL, Bootstrap', image: crmsImage },
];

export function mergeProjectDefaults(projects) {
  if (!Array.isArray(projects)) return defaultProjects;
  return projects.map((project) => {
    const defaults = defaultProjects.find((item) => item.id === project.id || item.name.toLowerCase() === String(project.name || '').toLowerCase());
    return defaults && !project.url ? { ...defaults, ...project, url: defaults.url } : project;
  });
}

export function loadProjects() {
  try {
    const storedProjects = JSON.parse(localStorage.getItem('portfolio-projects') || 'null');
    return Array.isArray(storedProjects) ? mergeProjectDefaults(storedProjects) : defaultProjects;
  } catch { return defaultProjects; }
}

export function saveProjects(projects) { localStorage.setItem('portfolio-projects', JSON.stringify(projects)); }

export async function fetchPortfolioRecord() {
  const response = await fetch('/api/portfolio');
  if (!response.ok) throw new Error('Portfolio storage is unavailable.');
  return response.json();
}

export async function savePortfolioRecord(content, projects, certificates = loadCertificates()) {
  const response = await fetch('/api/portfolio', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, projects, certificates }),
  });
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.message || 'Portfolio changes could not be saved to the database.');
  }
  return response.json();
}

export function loadCertificates() {
  try {
    const certificates = JSON.parse(localStorage.getItem('portfolio-certificates') || '[]');
    return Array.isArray(certificates) ? certificates : [];
  } catch { return []; }
}

export function saveCertificates(certificates) {
  localStorage.setItem('portfolio-certificates', JSON.stringify(certificates));
}
import alertoCalbayogImage from '../assets/alertocalbayog.png';
import ayskeopiImage from '../assets/ayeskeopi.png';
import crmsImage from '../assets/CMRS.png';
import fpopClinicImage from '../assets/fpopclinic.png';
