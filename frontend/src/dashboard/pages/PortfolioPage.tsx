import { Pencil } from 'lucide-react';

export default function PortfolioPage({ content, onEdit }) {
  return <section className="dashboard-panel"><div className="panel-heading"><div><p className="dashboard-kicker">PROFILE</p><h2>All information</h2></div><button className="project-primary-button" onClick={onEdit}><Pencil size={15} /> Edit information</button></div><div className="settings-row"><div><strong>{content.fullName}</strong><span>{content.role} · {content.location}</span></div></div><div className="settings-row"><div><strong>Introduction</strong><span>{content.intro}</span></div></div><div className="settings-row"><div><strong>Languages and technologies</strong><span>{content.languages}</span></div></div><div className="settings-row"><div><strong>Contact</strong><span>{content.email}</span></div></div><div className="settings-row"><div><strong>About</strong><span>{content.about}</span></div></div></section>;
}
