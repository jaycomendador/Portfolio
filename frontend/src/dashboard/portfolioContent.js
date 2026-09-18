export const defaultPortfolioContent = {
  name: 'Jay', fullName: 'Jay Comendador', role: 'Frontend Developer', experience: '4 Years', projects: '4', clients: '1',
  intro: 'Building modern, responsive, user-friendly web applications with React.js, React Native, and Tailwind CSS.',
  about: "I'm a 20-year-old developer from Calbayog City, Samar, and a 4th-year college student taking Bachelor of Science in Information Technology (BSIT) at Northwest Samar State University (NWSSU). I build applications with the MERN stack and AI-assisted tools, focusing on clean UI design, simple and efficient code, and user-friendly experiences.",
  languages: 'JavaScript, React, Node.js, MongoDB, HTML, CSS, PHP, MySQL',
  skillLevels: { JavaScript: 70, React: 70, 'Node.js': 65, MongoDB: 70, HTML: 85, CSS: 80, PHP: 55, MySQL: 80 },
  email: 'jcomendador120@gmail.com',
  location: 'Calbayog City, Samar, Philippines',
};

export function loadPortfolioContent() {
  try { return { ...defaultPortfolioContent, ...JSON.parse(localStorage.getItem('portfolio-content') || '{}') }; } catch { return defaultPortfolioContent; }
}

export function savePortfolioContent(content) { localStorage.setItem('portfolio-content', JSON.stringify(content)); }

export const defaultProjects = [
  { id: 'alerto-calbayog', name: 'AlertoCalbayog', detail: 'Emergency response system', status: 'Live', url: 'https://alertocalbayog.com', technologies: 'React, Node.js, MongoDB', image: alertoCalbayogImage },
  { id: 'fpop-healthhub', name: 'FPOP HealthHub', detail: 'Clinic management platform', status: 'In progress', url: 'https://fpopclinic.com', technologies: 'React, Express, MongoDB', image: fpopClinicImage },
  { id: 'ayeskeopi', name: 'Ayskeopi', detail: 'Coffee ordering system', status: 'Complete', technologies: 'JavaScript, HTML, CSS', image: ayskeopiImage },
  { id: 'crms', name: 'CRMS', detail: 'Room maintenance system', status: 'Complete', technologies: 'PHP, MySQL, Bootstrap', image: crmsImage },
];

export function loadProjects() {
  try {
    const storedProjects = JSON.parse(localStorage.getItem('portfolio-projects') || 'null');
    return Array.isArray(storedProjects) ? storedProjects : defaultProjects;
  } catch { return defaultProjects; }
}

export function saveProjects(projects) { localStorage.setItem('portfolio-projects', JSON.stringify(projects)); }
import alertoCalbayogImage from '../assets/alertocalbayog.png';
import ayskeopiImage from '../assets/ayeskeopi.png';
import crmsImage from '../assets/CMRS.png';
import fpopClinicImage from '../assets/fpopclinic.png';
