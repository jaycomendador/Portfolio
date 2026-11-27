export const defaultPortfolioContent = {
  name: 'Jay', fullName: 'Jay Comendador', role: 'Freelance Frontend Developer', experience: '4 Years', projects: '4', clients: '1',
  intro: 'Freelance frontend developer building modern, responsive, user-friendly web applications with React.js, React Native, and Tailwind CSS.',
  about: "I'm a 21-year-old developer from Calbayog City, Samar, and a 4th-year college student taking Bachelor of Science in Information Technology (BSIT) at Northwest Samar State University (NWSSU). I build applications with the MERN stack and AI-assisted tools, focusing on clean UI design, simple and efficient code, and user-friendly experiences.",
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
      const content = normalizePortfolioAge({ ...defaultPortfolioContent, ...(stored || {}) });
      content.clients = String(Math.max(0, Number.parseInt(content.clients, 10) || 0) + 2);
      localStorage.setItem('portfolio-client-count-adjusted', 'true');
      savePortfolioContent(content);
      return content;
    }
    const content = normalizePortfolioAge({ ...defaultPortfolioContent, ...(stored || {}) });
    savePortfolioContent(content);
    return content;
  } catch { return defaultPortfolioContent; }
}

export function savePortfolioContent(content) { localStorage.setItem('portfolio-content', JSON.stringify(content)); }

function normalizePortfolioAge(content) {
  if (!content || typeof content !== 'object') return content;
  const role = String(content.role || 'Frontend Developer');
  return {
    ...content,
    role: /freelanc/i.test(role) ? role : `Freelance ${role}`,
    about: typeof content.about === 'string' ? content.about.replace(/\b20-year-old\b/g, '21-year-old') : content.about,
  };
}

export const defaultProjects = [
  { id: 'bizzpredict', name: 'BizzPredict', detail: 'Business prediction project.' },
  { id: 'laundry-app', name: 'Laundry App', detail: 'Laundry service application.' },
  { id: 'boardlinker', name: 'BoardLinker', detail: 'BoardLinker project.' },
  { id: 'ligtas-calbayog', name: 'Ligtas Calbayog', detail: 'Calbayog safety project.', url: 'https://ligtascalbayog.com', image: '/ligtas.png' },
  { id: 'alerto-calbayog', name: 'AlertoCalbayog', detail: 'Emergency response system', status: 'Live', url: 'https://alertocalbayog.com', technologies: 'React, Node.js, MongoDB', image: alertoCalbayogImage },
  { id: 'fpop-healthhub', name: 'FPOP HealthHub', detail: 'Clinic management platform', status: 'In progress', url: 'https://fpopclinic.com', technologies: 'React, Express, MongoDB', image: fpopClinicImage },
  { id: 'ayeskeopi', name: 'Ayskeopi', detail: 'Coffee ordering system', status: 'Complete', url: 'https://ayskeopi.vercel.app/', technologies: 'JavaScript, HTML, CSS', image: ayskeopiImage },
  { id: 'crms', name: 'CRMS', detail: 'Room maintenance system', status: 'Complete', url: 'https://crms-rho-weld.vercel.app/', technologies: 'PHP, MySQL, Bootstrap', image: crmsImage },
];

export function mergeProjectDefaults(projects) {
  const savedProjects = Array.isArray(projects) ? projects : [];
  const mergedProjects = savedProjects.map((project) => {
    const defaults = defaultProjects.find((item) => item.id === project.id || item.name.toLowerCase() === String(project.name || '').toLowerCase());
    return defaults ? { ...defaults, ...project, url: project.url || defaults.url, image: project.image || defaults.image } : project;
  });
  const includedIds = new Set(mergedProjects.map((project) => project.id).filter(Boolean));
  const includedNames = new Set(mergedProjects.map((project) => String(project.name || '').toLowerCase()));
  return [...mergedProjects, ...defaultProjects.filter((project) => !includedIds.has(project.id) && !includedNames.has(project.name.toLowerCase()))];
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
  const record = await response.json();
  if (record?.content) record.content = normalizePortfolioAge(record.content);
  return record;
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
    return mergeCertificateDefaults(certificates);
  } catch { return mergeCertificateDefaults([]); }
}

export const defaultCertificates = [
  {
    id: 'achievement',
    title: 'Achievement',
    issuer: '',
    issued: '',
    credentialUrl: '',
    isHardcoded: true,
    fileName: 'achivement.jpg',
    fileType: 'image/jpeg',
    fileData: '/achivement.jpg',
  },
  {
    id: 'own-it-ccis-ip-bootcamp-2026',
    title: 'OWN IT: The CCIS Intellectual Property Bootcamp',
    issuer: 'Northwest Samar State University · College of Computing and Information Sciences',
    issued: '2026-09',
    credentialUrl: '',
    isHardcoded: true,
    fileName: '7ff5fb97-5797-4f6f-94c8-d3726601ba01.jfif',
    fileType: 'image/jpeg',
    fileData: '/7ff5fb97-5797-4f6f-94c8-d3726601ba01.jfif',
  },
];

export function mergeCertificateDefaults(certificates) {
  const savedCertificates = Array.isArray(certificates) ? certificates : [];
  const uniqueSaved = [];
  const seenKeys = new Set();
  const keysFor = (certificate) => {
    const keys = [];
    if (certificate?.id) keys.push(`id:${String(certificate.id).trim().toLowerCase()}`);
    const assetKey = (value) => {
      if (!value) return '';
      const normalized = String(value).trim().replace(/\\/g, '/');
      if (/^data:/i.test(normalized)) return normalized.toLowerCase();
      return normalized.split('/').pop().toLowerCase();
    };
    const fileName = assetKey(certificate?.fileName);
    const fileData = assetKey(certificate?.fileData);
    if (fileName) keys.push(`asset:${fileName}`);
    if (fileData) keys.push(`asset:${fileData}`);
    const title = String(certificate?.title || '').trim().toLowerCase();
    const issuer = String(certificate?.issuer || '').trim().toLowerCase();
    if (title && issuer) {
      const file = String(certificate.fileName || certificate.credentialUrl || certificate.fileData || '').trim().toLowerCase();
      keys.push(`details:${title}|${issuer}|${String(certificate.issued || '').trim().toLowerCase()}|${file}`);
    }
    return keys;
  };
  for (const certificate of savedCertificates) {
    const keys = keysFor(certificate);
    if (keys.some((key) => seenKeys.has(key))) continue;
    uniqueSaved.push(certificate);
    keys.forEach((key) => seenKeys.add(key));
  }
  const missingDefaults = defaultCertificates.filter((certificate) => {
    const keys = keysFor(certificate);
    if (keys.some((key) => seenKeys.has(key))) return false;
    keys.forEach((key) => seenKeys.add(key));
    return true;
  });
  return [...missingDefaults, ...uniqueSaved];
}

export function saveCertificates(certificates) {
  localStorage.setItem('portfolio-certificates', JSON.stringify(certificates));
}
import alertoCalbayogImage from '../assets/alertocalbayog.png';
import ayskeopiImage from '../assets/ayeskeopi.png';
import crmsImage from '../assets/CMRS.png';
import fpopClinicImage from '../assets/fpopclinic.png';
