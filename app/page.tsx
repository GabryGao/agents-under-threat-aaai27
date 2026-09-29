'use client';

import { ArrowDownRight, ArrowUpRight, Menu, ShieldCheck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cfpTopics, researchQuestions, workshop } from './workshop-data.mjs';

const primaryLinks = [
  { href: '#about', label: 'About' },
  { href: '#cfp', label: 'Call for Papers' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Agents Under Threat home">
          <span className="wordmark-mark" aria-hidden="true">
            <ShieldCheck size={18} strokeWidth={1.8} />
          </span>
          <span>AGENTS <b>/</b> UNDER THREAT</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a className="nav-contact" href={`mailto:${workshop.contact}`}>
            Contact <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" data-open={menuOpen}>
          {primaryLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a href={`mailto:${workshop.contact}`} onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <img className="hero-image" src="/hero-montreal.jpg" alt="Panoramic view of Montréal and the Saint Lawrence River" />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="attack-line attack-line-one" aria-hidden="true" />
          <div className="attack-line attack-line-two" aria-hidden="true" />
          <div className="hero-inner">
            <p className="status-chip"><span aria-hidden="true" /> {workshop.status}</p>
            <div className="hero-copy">
              <p className="hero-kicker">SECURITY · AUTONOMY · ADVERSARIAL SYSTEMS</p>
              <h1 id="hero-title">LLM Agents<br />Under Threat<br /><span>in Cyberspace</span></h1>
              <p className="hero-summary">{workshop.summary}</p>
            </div>

            <div className="hero-rail" aria-label="Workshop details">
              <div><span>DATE · TENTATIVE</span><strong>{workshop.date}</strong></div>
              <div><span>LOCATION</span><strong>{workshop.location}</strong></div>
              <a href="#cfp">Explore the call <ArrowDownRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <p className="hero-credit">Photo: Arild Vågen · CC BY-SA 4.0</p>
        </section>

        <section className="section section-about" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="section-index">01 / ABOUT</p>
            <h2 id="about-title">Agents are no longer just models.<br /><span>They are attack surfaces.</span></h2>
            <p>Autonomous agents observe, remember, plan, coordinate, and act through tools. Each capability opens a new boundary where adversarial intent can enter—and where a small mistake can become a real-world action.</p>
          </div>

          <div className="threat-map" aria-label="Three research questions">
            <div className="threat-track" aria-hidden="true"><span /><span /><span /></div>
            {researchQuestions.map((question) => (
              <article className="question" key={question.index}>
                <div className="question-meta"><span>{question.index}</span><small>{question.tag}</small></div>
                <h3>{question.title}</h3>
                <p>{question.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-cfp" id="cfp" aria-labelledby="cfp-title">
          <div className="section-heading section-heading-light">
            <p className="section-index">02 / CALL FOR PAPERS</p>
            <h2 id="cfp-title">Research that treats the agent as a system.</h2>
            <p>We invite technical, empirical, and position work that sharpens threat models, demonstrates realistic failures, or advances defenses for deployed agentic systems.</p>
          </div>

          <div className="topic-list">
            {cfpTopics.map((topic) => (
              <article className="topic-row" key={topic.number}>
                <span>{topic.number}</span><h3>{topic.title}</h3><p>{topic.text}</p><ArrowUpRight aria-hidden="true" />
              </article>
            ))}
          </div>

          <aside className="cfp-note" aria-label="Submission status">
            <span>TENTATIVE</span>
            <p>Submission instructions will be announced after workshop confirmation. No submission portal is open at this time.</p>
          </aside>
        </section>
      </main>

      <footer className="preview-footer">
        <p>{workshop.status}</p>
        <p>Montréal photograph by Arild Vågen, licensed CC BY-SA 4.0.</p>
      </footer>
    </>
  );
}
