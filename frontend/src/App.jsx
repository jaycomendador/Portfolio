import { useState } from 'react'
import './App.css'

const projects = [
  { number: '01', title: 'SaaS analytics', type: 'Product design · Development', color: 'violet' },
  { number: '02', title: 'Orion finance', type: 'Brand identity · Web design', color: 'blue' },
  { number: '03', title: 'Cedar House', type: 'Digital experience · Commerce', color: 'orange' },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main>
      <nav className="nav container" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Avery Morgan home">AM<span>®</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <a className="availability" href="mailto:hello@averymorgan.design"><i /> Available for select projects</a>
      </nav>

      <section className="hero-section container" id="home">
        <p className="eyebrow"><span>✦</span> Independent designer & developer</p>
        <div className="hero-copy">
          <h1>Designing digital<br /><em>experiences</em> with intent.</h1>
          <div className="intro">
            <p>I’m Avery, an independent designer and developer helping thoughtful brands make a meaningful impression.</p>
            <a className="text-link" href="#work">Explore my work <Arrow /></a>
          </div>
        </div>
        <div className="hero-footer">
          <p>Based in Phoenix, AZ<br />Working worldwide</p>
          <a className="scroll" href="#about">Scroll to discover <b>↓</b></a>
        </div>
      </section>

      <section className="statement" id="about">
        <div className="container statement-grid">
          <p className="section-label">01 — About</p>
          <div>
            <h2>Strategy, design, and code — brought together to make brands feel <em>unmistakable.</em></h2>
            <div className="capabilities">
              <span>Creative direction</span><span>Digital products</span><span>Web development</span><span>Brand systems</span>
            </div>
          </div>
        </div>
      </section>

      <section className="work container" id="work">
        <div className="section-heading">
          <div><p className="section-label">02 — Selected work</p><h2>A few things I’m proud of.</h2></div>
          <a className="text-link" href="mailto:hello@averymorgan.design">Start a project <Arrow /></a>
        </div>
        <div className="projects">
          {projects.map((project) => (
            <article className="project" key={project.number}>
              <div className={`project-visual ${project.color}`}>
                <span className="project-mark">{project.number}</span>
                <span className="visual-shape" />
              </div>
              <div className="project-info"><h3>{project.title}</h3><p>{project.type}</p><a href="#contact" aria-label={`View ${project.title}`}><Arrow /></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container contact-inner">
          <p className="section-label">03 — Contact</p>
          <div><p className="eyebrow"><span>✦</span> Have a project in mind?</p><h2>Let’s make something<br /><em>memorable.</em></h2><a className="contact-button" href="mailto:hello@averymorgan.design">hello@averymorgan.design <Arrow /></a></div>
        </div>
      </section>

      <footer className="footer container"><span>© 2026 Avery Morgan</span><span>Built with care, in the desert.</span><div><a href="#home">LinkedIn</a><a href="#home">Instagram</a></div></footer>
    </main>
  )
}

export default App
