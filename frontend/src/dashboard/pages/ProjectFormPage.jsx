import { ArrowLeft, Plus } from 'lucide-react';
import { useState } from 'react';

const blankProject = { name: '', detail: '', technologies: '', status: 'In progress', url: '', image: '' };

export default function ProjectFormPage({ initialProject, onSave, onCancel }) {
  const [project, setProject] = useState(() => ({ ...blankProject, ...initialProject, status: initialProject?.status || 'In progress' }));
  const [error, setError] = useState('');
  const update = (event) => setProject((current) => ({ ...current, [event.target.name]: event.target.value }));
  const changeImage = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) return setError('Choose an image file smaller than 2 MB.');
    const reader = new FileReader();
    reader.onload = () => { setProject((current) => ({ ...current, image: reader.result })); setError(''); };
    reader.readAsDataURL(file);
  };
  const submit = (event) => {
    event.preventDefault();
    if (!project.name.trim() || !project.detail.trim() || !project.technologies.trim() || !project.image) return setError('Complete all required details and add a landing-page image.');
    onSave({ ...project, id: project.id || crypto.randomUUID(), name: project.name.trim(), detail: project.detail.trim(), technologies: project.technologies.trim(), url: project.url.trim() });
  };
  const isEditing = Boolean(project.id);
  return <section className="dashboard-panel project-form-page"><button type="button" className="form-back-button" onClick={onCancel}><ArrowLeft size={15} /> Back to projects</button><div className="project-form-heading"><div><p className="dashboard-kicker">PROJECT REQUIREMENTS</p><h2>{isEditing ? 'Edit project' : 'Add new project'}</h2><span>These details will appear on your public portfolio landing page.</span></div></div><form className="project-form" onSubmit={submit}><label>Project name <b>*</b><input name="name" value={project.name} onChange={update} placeholder="e.g. Campus Connect" required /></label><label>Status <b>*</b><select name="status" value={project.status} onChange={update} required><option value="In progress">In progress</option><option value="Live">Live</option><option value="Complete">Complete</option></select></label><label className="project-form-wide">Project description <b>*</b><textarea name="detail" value={project.detail} onChange={update} rows="4" placeholder="What problem does this project solve?" required /></label><label>Technologies used <b>*</b><input name="technologies" value={project.technologies} onChange={update} placeholder="e.g. React, Node.js, MongoDB" required /></label><label>Project URL <small>(optional)</small><input type="url" name="url" value={project.url} onChange={update} placeholder="https://example.com" /></label><label className="project-form-wide">Landing-page image <b>*</b><span className="image-upload"><input type="file" accept="image/*" onChange={(event) => changeImage(event.target.files?.[0])} />{project.image ? <img src={project.image} alt="Landing page preview" /> : <small>Upload a JPG, PNG, or WebP image (2 MB max).</small>}</span></label>{error && <p className="project-form-error">{error}</p>}<div className="project-form-actions"><button type="button" className="project-secondary-button" onClick={onCancel}>Cancel</button><button className="project-primary-button"><Plus size={16} /> {isEditing ? 'Save changes' : 'Save project'}</button></div></form></section>;
}
