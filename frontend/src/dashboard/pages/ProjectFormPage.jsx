import { ArrowLeft, Code2, Plus, RefreshCw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const blankProject = { name: '', detail: '', technologies: '', status: 'In progress', url: '', image: '' };
const repositoriesUrl = 'https://api.github.com/users/jaycomendador/repos?per_page=100&sort=updated&type=owner';

export default function ProjectFormPage({ initialProject, onSave, onCancel }) {
  const [project, setProject] = useState(() => ({ ...blankProject, ...initialProject, status: initialProject?.status || 'In progress' }));
  const [repositories, setRepositories] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState('');
  const [repositorySearch, setRepositorySearch] = useState('');
  const [loadingRepositories, setLoadingRepositories] = useState(false);
  const [repositoryReload, setRepositoryReload] = useState(0);
  const [repositoryError, setRepositoryError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialProject?.id) return undefined;
    const controller = new AbortController();
    const loadRepositories = async () => {
      setLoadingRepositories(true);
      setRepositoryError('');
      try {
        let nextPage = repositoriesUrl;
        const allRepositories = [];
        while (nextPage) {
          const response = await fetch(nextPage, {
            headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
            signal: controller.signal,
          });
          if (!response.ok) {
            const result = await response.json().catch(() => ({}));
            throw new Error(response.status === 403 ? 'GitHub rate limit reached. Try again shortly.' : result.message || 'Could not load GitHub repositories.');
          }
          const page = await response.json();
          allRepositories.push(...page);
          const nextLink = response.headers.get('Link')?.match(/<([^>]+)>;\s*rel="next"/);
          nextPage = nextLink?.[1] || '';
        }
        setRepositories(allRepositories);
      } catch (loadError) {
        if (loadError.name !== 'AbortError') setRepositoryError(loadError.message || 'Could not connect to GitHub.');
      } finally {
        if (!controller.signal.aborted) setLoadingRepositories(false);
      }
    };
    loadRepositories();
    return () => controller.abort();
  }, [initialProject?.id, repositoryReload]);

  const visibleRepositories = useMemo(() => repositories.filter((repository) =>
    repository.full_name.toLowerCase().includes(repositorySearch.toLowerCase())
      || (repository.description || '').toLowerCase().includes(repositorySearch.toLowerCase()),
  ), [repositories, repositorySearch]);

  const update = (event) => setProject((current) => ({ ...current, [event.target.name]: event.target.value }));
  const chooseRepository = (repository) => {
    setSelectedRepository(String(repository.id));
    if (!repository) return;
    const technologies = [...new Set([repository.language, ...(repository.topics || [])].filter(Boolean))].join(', ');
    setProject((current) => ({
      ...current,
      name: repository.name,
      detail: repository.description || `Project built in ${technologies || 'this repository'}.`,
      technologies: technologies || 'Not specified',
      url: repository.html_url,
    }));
    setError('');
  };
  const changeImage = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) return setError('Choose an image file smaller than 2 MB.');
    const reader = new FileReader();
    reader.onload = () => { setProject((current) => ({ ...current, image: reader.result })); setError(''); };
    reader.readAsDataURL(file);
  };
  const submit = (event) => {
    event.preventDefault();
    if (!project.name.trim() || !project.detail.trim() || !project.technologies.trim()) return setError('Complete the project name, description, and technologies.');
    onSave({ ...project, id: project.id || crypto.randomUUID(), name: project.name.trim(), detail: project.detail.trim(), technologies: project.technologies.trim(), url: project.url.trim() });
  };
  const isEditing = Boolean(project.id);

  return <section className="dashboard-panel project-form-page"><button type="button" className="form-back-button" onClick={onCancel}><ArrowLeft size={15} /> Back to projects</button><div className="project-form-heading"><div><p className="dashboard-kicker">PROJECT REQUIREMENTS</p><h2>{isEditing ? 'Edit project' : 'Add new project'}</h2><span>These details will appear on your public portfolio landing page.</span></div></div><form className="project-form" onSubmit={submit}>    {!isEditing && <fieldset className="github-import-panel project-form-wide"><legend><Code2 size={16} /> GitHub repositories</legend><div className="github-import-toolbar"><input aria-label="Search GitHub repositories" value={repositorySearch} onChange={(event) => setRepositorySearch(event.target.value)} placeholder="Filter repositories" /><button type="button" className="project-secondary-button" onClick={() => setRepositoryReload((count) => count + 1)} disabled={loadingRepositories}><RefreshCw size={14} /> Refresh</button></div><div className="github-repository-list" role="listbox" aria-label="Public GitHub repositories">{loadingRepositories ? <p className="github-repository-message">Loading repositories...</p> : visibleRepositories.length ? visibleRepositories.map((repository) => <button type="button" role="option" aria-selected={selectedRepository === String(repository.id)} className={selectedRepository === String(repository.id) ? 'github-repository-option selected' : 'github-repository-option'} key={repository.id} onClick={() => chooseRepository(repository)}><span><strong>{repository.full_name}</strong><small>{repository.description || 'No description provided'}</small></span><em>{repository.language || 'Repository'}</em></button>) : <p className="github-repository-message">{repositoryError ? 'Repository list unavailable.' : repositories.length ? 'No repositories match your search.' : 'No public repositories found.'}</p>}</div>{repositoryError ? <p className="github-import-error">{repositoryError} <a href="https://github.com/jaycomendador?tab=repositories" target="_blank" rel="noreferrer">Open GitHub repositories</a></p> : <small className="github-import-note">Choose a public repository to fill in its name, description, technologies, and GitHub link. Private repositories require GitHub authorization, which is not configured here.</small>}</fieldset>}
    <label>Project name <b>*</b><input name="name" value={project.name} onChange={update} placeholder="e.g. Campus Connect" required /></label><label>Status <b>*</b><select name="status" value={project.status} onChange={update} required><option value="In progress">In progress</option><option value="Live">Live</option><option value="Complete">Complete</option></select></label><label className="project-form-wide">Project description <b>*</b><textarea name="detail" value={project.detail} onChange={update} rows="4" placeholder="What problem does this project solve?" required /></label><label>Technologies used <b>*</b><input name="technologies" value={project.technologies} onChange={update} placeholder="e.g. React, Node.js, MongoDB" required /></label><label>Project URL <small>(optional)</small><input type="url" name="url" value={project.url} onChange={update} placeholder="https://example.com" /></label><label className="project-form-wide">Landing-page image <small>(optional)</small><span className="image-upload"><input type="file" accept="image/*" onChange={(event) => changeImage(event.target.files?.[0])} />{project.image ? <img src={project.image} alt="Landing page preview" /> : <small>Add an optional screenshot (JPG, PNG, or WebP, up to 2 MB). Projects without screenshots use the default preview.</small>}</span></label>{error && <p className="project-form-error">{error}</p>}<div className="project-form-actions"><button type="button" className="project-secondary-button" onClick={onCancel}>Cancel</button><button className="project-primary-button"><Plus size={16} /> {isEditing ? 'Save changes' : 'Save project'}</button></div></form></section>;
}
