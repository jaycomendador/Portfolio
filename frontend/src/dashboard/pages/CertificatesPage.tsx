import { Award, ExternalLink, FileText, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { uploadToCloudinary } from '../cloudinary';

const emptyCertificate = { title: '', issuer: '', issued: '', credentialUrl: '', fileName: '', fileType: '', fileData: '' };

export default function CertificatesPage({ certificates, onAdd, onDelete }) {
  const [form, setForm] = useState(emptyCertificate);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const chooseFile = (nextFile) => {
    if (!nextFile) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(nextFile.type)) {
      setError('Choose a JPG, PNG, WebP, or PDF certificate.');
      return;
    }
    setFile(nextFile);
    setForm((current) => ({ ...current, fileName: nextFile.name, fileType: nextFile.type, fileData: '' }));
    setError('');
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!file) return setError('Choose the certificate image or PDF first.');
    setUploading(true);
    try {
      const fileData = await uploadToCloudinary(file);
      await onAdd({ ...form, fileData, id: crypto.randomUUID() });
      setForm(emptyCertificate);
      setFile(null);
      setError('');
      event.currentTarget.reset();
    } catch (uploadError) {
      setError(uploadError.message || 'The certificate could not be uploaded.');
    } finally {
      setUploading(false);
    }
  };

  return <section className="dashboard-panel certificates-dashboard">
    <div className="panel-heading projects-heading"><div><p className="dashboard-kicker">PORTFOLIO CONTENT</p><h2>Certificates</h2><span>Upload certificates to Cloudinary. They will appear as text links on your public portfolio.</span></div></div>
    <form className="project-form certificate-upload-form" onSubmit={submit}>
      <label>Certificate name <b>*</b><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Responsive Web Design" required /></label>
      <label>Issuing organization <b>*</b><input value={form.issuer} onChange={(event) => setForm({ ...form, issuer: event.target.value })} placeholder="e.g. freeCodeCamp" required /></label>
      <label>Issue date <small>(optional)</small><input type="month" value={form.issued} onChange={(event) => setForm({ ...form, issued: event.target.value })} /></label>
      <label>Credential link <small>(optional)</small><input type="url" value={form.credentialUrl} onChange={(event) => setForm({ ...form, credentialUrl: event.target.value })} placeholder="https://example.com/verify" /></label>
      <label className="project-form-wide">Certificate file <b>*</b><span className="image-upload certificate-file-upload"><input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => chooseFile(event.target.files?.[0])} />{file ? <><FileText size={17} /><small>{file.name}</small></> : <small>Choose a JPG, PNG, WebP, or PDF. The file is uploaded directly to Cloudinary.</small>}</span></label>
      {error && <p className="project-form-error">{error}</p>}
      <div className="project-form-actions"><button className="project-primary-button" disabled={uploading}><Plus size={16} /> {uploading ? 'Uploading…' : 'Add certificate'}</button></div>
    </form>
    <div className="certificate-manager-list">{certificates.length ? certificates.map((certificate) => <article className="certificate-manager-card" key={certificate.id}>
      {certificate.fileType === 'application/pdf' ? <div className="certificate-manager-preview pdf"><FileText size={28} /><span>PDF</span></div> : <img className="certificate-manager-preview" src={certificate.fileData} alt="" />}
      <div className="certificate-manager-info"><strong>{certificate.title}</strong><span>{certificate.issuer}{certificate.issued ? ` · ${certificate.issued}` : ''}</span></div>
      <div className="certificate-manager-actions">{certificate.credentialUrl && <a href={certificate.credentialUrl} target="_blank" rel="noreferrer" aria-label={`Open ${certificate.title} credential`}><ExternalLink size={15} /></a>}<button type="button" onClick={() => onDelete(certificate.id)} aria-label={`Delete ${certificate.title}`}><Trash2 size={15} /></button></div>
    </article>) : <div className="empty-state"><Award size={25} /><strong>No certificates yet</strong><span>Upload one above and it will appear on your portfolio.</span></div>}</div>
  </section>;
}
