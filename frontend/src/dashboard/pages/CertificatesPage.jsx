import { Award, ExternalLink, FileText, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const emptyCertificate = { title: '', issuer: '', issued: '', credentialUrl: '', fileName: '', fileType: '', fileData: '' };

export default function CertificatesPage({ certificates, onAdd, onDelete }) {
  const [form, setForm] = useState(emptyCertificate);
  const [error, setError] = useState('');

  const chooseFile = (file) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type)) {
      setError('Choose a JPG, PNG, WebP, or PDF certificate.');
      return;
    }
    if (file.size > 1.5 * 1024 * 1024) {
      setError('Choose a certificate file smaller than 1.5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, fileName: file.name, fileType: file.type, fileData: String(reader.result) }));
      setError('');
    };
    reader.onerror = () => setError('Could not read that file. Please try again.');
    reader.readAsDataURL(file);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.fileData) return setError('Upload the certificate image or PDF before saving.');
    try {
      onAdd({ ...form, id: crypto.randomUUID() });
      setForm(emptyCertificate);
      setError('');
      event.currentTarget.reset();
    } catch {
      setError('There is not enough browser storage for this certificate. Try a smaller file.');
    }
  };

  return <section className="dashboard-panel certificates-dashboard">
    <div className="panel-heading projects-heading"><div><p className="dashboard-kicker">PORTFOLIO CONTENT</p><h2>Certificates</h2><span>Upload certificates to display them on your portfolio page.</span></div></div>
    <form className="project-form certificate-upload-form" onSubmit={submit}>
      <label>Certificate name <b>*</b><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Responsive Web Design" required /></label>
      <label>Issuing organization <b>*</b><input value={form.issuer} onChange={(event) => setForm({ ...form, issuer: event.target.value })} placeholder="e.g. freeCodeCamp" required /></label>
      <label>Issue date <small>(optional)</small><input type="month" value={form.issued} onChange={(event) => setForm({ ...form, issued: event.target.value })} /></label>
      <label>Credential link <small>(optional)</small><input type="url" value={form.credentialUrl} onChange={(event) => setForm({ ...form, credentialUrl: event.target.value })} placeholder="https://example.com/verify" /></label>
      <label className="project-form-wide">Certificate file <b>*</b><span className="image-upload certificate-file-upload"><input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => chooseFile(event.target.files?.[0])} />{form.fileData ? <><FileText size={17} /><small>{form.fileName}</small></> : <small>Upload a JPG, PNG, WebP, or PDF file (1.5 MB max).</small>}</span></label>
      {error && <p className="project-form-error">{error}</p>}
      <div className="project-form-actions"><button className="project-primary-button"><Plus size={16} /> Add certificate</button></div>
    </form>
    <div className="certificate-manager-list">{certificates.length ? certificates.map((certificate) => <article className="certificate-manager-card" key={certificate.id}>
      {certificate.fileType === 'application/pdf' ? <div className="certificate-manager-preview pdf"><FileText size={28} /><span>PDF</span></div> : <img className="certificate-manager-preview" src={certificate.fileData} alt={`${certificate.title} certificate`} />}
      <div className="certificate-manager-info"><strong>{certificate.title}</strong><span>{certificate.issuer}{certificate.issued ? ` · ${certificate.issued}` : ''}</span></div>
      <div className="certificate-manager-actions">{certificate.credentialUrl && <a href={certificate.credentialUrl} target="_blank" rel="noreferrer" aria-label={`Open ${certificate.title} credential`}><ExternalLink size={15} /></a>}<button type="button" onClick={() => onDelete(certificate.id)} aria-label={`Delete ${certificate.title}`}><Trash2 size={15} /></button></div>
    </article>) : <div className="empty-state"><Award size={25} /><strong>No certificates yet</strong><span>Upload one above and it will appear on your portfolio.</span></div>}</div>
  </section>;
}
