export const defaultPortfolioContent = {
  name: 'Jay', fullName: 'Jay Comendador', role: 'Frontend Developer', experience: '4 Years', projects: '4', clients: '1',
  intro: 'Building modern, responsive, user-friendly web applications with React.js, React Native, and Tailwind CSS.',
  about: "I'm a 20-year-old developer from Calbayog City, Samar, and a 4th-year college student taking Bachelor of Science in Information Technology (BSIT) at Northwest Samar State University (NWSSU). I build applications with the MERN stack and AI-assisted tools, focusing on clean UI design, simple and efficient code, and user-friendly experiences.",
};

export function loadPortfolioContent() {
  try { return { ...defaultPortfolioContent, ...JSON.parse(localStorage.getItem('portfolio-content') || '{}') }; } catch { return defaultPortfolioContent; }
}

export function savePortfolioContent(content) { localStorage.setItem('portfolio-content', JSON.stringify(content)); }
