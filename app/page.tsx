'use client';

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { initRevealEffects, nextMenuState } from './workshop-behavior.mjs';
import {
  advisers,
  cfpTopics,
  importantDates,
  organizers,
  researchQuestions,
  schedule,
  speakers,
  submissionPolicy,
  workshop,
} from './workshop-data.mjs';

const primaryLinks = [
  { href: '#about', label: 'About' },
  { href: '#cfp', label: 'CFP' },
  { href: '#dates', label: 'Dates' },
  { href: '#schedule', label: 'Program' },
  { href: '#speakers', label: 'People' },
];

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(nextMenuState(menuOpen, 'close'));
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    initRevealEffects();
    const sections = primaryLinks
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => section !== null);
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-18% 0px -64% 0px', threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen((open) => nextMenuState(open, 'close'));

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Agents Under Threat home">
          <span className="wordmark-mark" aria-hidden="true"><ShieldCheck size={18} strokeWidth={1.8} /></span>
          <span>AGENTS <b>/</b> UNDER THREAT</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <a key={link.href} href={link.href} data-active={activeSection === link.href.slice(1)}>{link.label}</a>
          ))}
          <a className="nav-contact" href={`mailto:${workshop.contact}`}>Contact <ArrowUpRight size={14} aria-hidden="true" /></a>
        </nav>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => nextMenuState(open, 'toggle'))}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" data-open={menuOpen} hidden={!menuOpen}>
          {primaryLinks.map((link) => <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>)}
          <a href={`mailto:${workshop.contact}`} onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Image className="hero-image" src="/hero-montreal.jpg" alt="Panoramic view of Montréal and the Saint Lawrence River" fill priority sizes="100vw" />
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
          <div className="section-heading" data-reveal>
            <p className="section-index">01 / ABOUT</p>
            <h2 id="about-title">Agents are no longer just models.<br /><span>They are attack surfaces.</span></h2>
            <p>Autonomous agents observe, remember, plan, coordinate, and act through tools. Each capability opens a new boundary where adversarial intent can enter—and where a small mistake can become a real-world action.</p>
          </div>
          <div className="threat-map" aria-label="Three research questions" data-reveal>
            <div className="threat-track" aria-hidden="true"><span /><span /><span /></div>
            {researchQuestions.map((question) => (
              <article className="question" key={question.index}>
                <div className="question-meta"><span>{question.index}</span><small>{question.tag}</small></div>
                <h3>{question.title}</h3><p>{question.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-cfp" id="cfp" aria-labelledby="cfp-title">
          <div className="section-heading section-heading-light" data-reveal>
            <p className="section-index">02 / CALL FOR PAPERS</p>
            <h2 id="cfp-title">Research that treats the agent as a system.</h2>
            <p>We invite technical, empirical, and position work that sharpens threat models, demonstrates realistic failures, or advances defenses for deployed agentic systems.</p>
          </div>
          <div className="topic-list" data-reveal>
            {cfpTopics.map((topic) => (
              <article className="topic-row" key={topic.number}>
                <span>{topic.number}</span><h3>{topic.title}</h3><p>{topic.text}</p><ArrowUpRight aria-hidden="true" />
              </article>
            ))}
          </div>
          <div className="submission-grid" data-reveal>
            <div className="submission-intro"><span>TENTATIVE SUBMISSION POLICY</span><h3>One track. Broad forms of evidence.</h3><p>{submissionPolicy.destination}</p></div>
            <dl>
              <div><dt>Length</dt><dd>{submissionPolicy.format}</dd></div>
              <div><dt>Format</dt><dd>{submissionPolicy.style}</dd></div>
              <div><dt>Review</dt><dd>{submissionPolicy.review}</dd></div>
              <div><dt>Publication</dt><dd>{submissionPolicy.publication}</dd></div>
              <div><dt>Disclosure</dt><dd>{submissionPolicy.disclosure}</dd></div>
            </dl>
          </div>
        </section>

        <section className="section section-dates" id="dates" aria-labelledby="dates-title">
          <div className="section-heading compact-heading" data-reveal>
            <p className="section-index">03 / IMPORTANT DATES</p>
            <h2 id="dates-title">A short runway<br /><span>to Montréal.</span></h2>
            <p>All dates remain tentative while the proposal is under review. The submission deadline uses Anywhere on Earth time.</p>
          </div>
          <div className="date-grid" data-reveal>
            {importantDates.map((date, index) => (
              <article className="date-item" key={date.label}>
                <span className="date-number">0{index + 1}</span>
                <span className="tentative-label">Tentative</span>
                <h3>{date.label}</h3><time>{date.value}</time><p>{date.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-schedule" id="schedule" aria-labelledby="schedule-title">
          <div className="schedule-heading" data-reveal>
            <div><p className="section-index">04 / PROGRAM</p><h2 id="schedule-title">A full day of<br />evidence and debate.</h2></div>
            <aside><Clock3 aria-hidden="true" /><span>TENTATIVE PROGRAM</span><p>Timing and session assignments may change after paper decisions and workshop confirmation.</p></aside>
          </div>
          <ol className="schedule-list" data-reveal>
            {schedule.map((item, index) => (
              <li key={`${item.time}-${item.title}`}>
                <span className="schedule-index">{String(index + 1).padStart(2, '0')}</span>
                <time>{item.time}</time><h3>{item.title}</h3><span className="schedule-type">{item.type}</span><em>Tentative</em>
              </li>
            ))}
          </ol>
        </section>

        <section className="section section-people" id="speakers" aria-labelledby="speakers-title">
          <div className="people-heading" data-reveal>
            <p className="section-index">05 / INVITED SPEAKERS</p>
            <h2 id="speakers-title">Perspectives from security,<br />privacy, and trustworthy AI.</h2>
            <p>Invitations and roles are tentative pending workshop confirmation.</p>
          </div>
          <div className="speaker-grid" data-reveal>
            {speakers.map((speaker, index) => (
              <article className="speaker-card" key={speaker.name}>
                <div className="speaker-monogram" aria-hidden="true">{speaker.initials}</div>
                <span className="tentative-label">Tentative</span><small>0{index + 1}</small>
                <h3>{speaker.name}</h3><p>{speaker.affiliation}</p><strong>{speaker.role}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-organizers" id="organizers" aria-labelledby="organizers-title">
          <div className="people-heading" data-reveal>
            <p className="section-index">06 / ORGANIZERS</p>
            <h2 id="organizers-title">A team spanning robustness,<br />security, and learning.</h2>
            <p>Committee roles are tentative and listed from the submitted proposal.</p>
          </div>
          <div className="organizer-grid" data-reveal>
            {organizers.map((organizer) => (
              <article className="organizer-card" key={organizer.name}>
                <div className="portrait">
                  <span aria-hidden="true">{initials(organizer.name)}</span>
                  {organizer.imageAvailable ? <Image src={organizer.image} alt={`${organizer.name} portrait`} fill sizes="(max-width: 680px) 100vw, (max-width: 900px) 50vw, 25vw" /> : null}
                </div>
                <span className="tentative-label">Tentative role</span>
                <h3>{organizer.name}</h3><p>{organizer.affiliation}</p><strong>{organizer.role}</strong>
              </article>
            ))}
          </div>
          <div className="advisory" data-reveal>
            <div><p className="section-index">ADVISORY BOARD</p><p>Proposed committee · tentative</p></div>
            <ul>{advisers.map((adviser) => <li key={adviser.name}><span>{adviser.name}</span><small>{adviser.affiliation}</small></li>)}</ul>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-frame" data-reveal>
            <div className="contact-icon" aria-hidden="true"><Mail /></div>
            <p className="section-index">07 / CONTACT</p>
            <h2 id="contact-title">Questions about scope,<br />fit, or the proposal?</h2>
            <a href={`mailto:${workshop.contact}`}>{workshop.contact}<ArrowRight aria-hidden="true" /></a>
            <div className="contact-meta"><span><MapPin size={15} /> {workshop.location}</span><span>{workshop.format}</span><span>Tentative · {workshop.status}</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div><span className="wordmark-mark" aria-hidden="true"><ShieldCheck size={18} /></span><p>{workshop.title}<br /><small>{workshop.status}</small></p></div>
        <p>Montréal photograph by <a href="https://commons.wikimedia.org/wiki/File:Montreal_August_2017_01.jpg">Arild Vågen</a>, licensed <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
