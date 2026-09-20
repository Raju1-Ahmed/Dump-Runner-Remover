import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import heroImage1 from './Asset/Hero/dump runner hero section image (1).png';
import heroImage2 from './Asset/Hero/dump runner hero section image (2).png';
import heroImage3 from './Asset/Hero/dump runner hero section image (3).png';
import heroImage4 from './Asset/Hero/dump runner hero section image (4).png';
import BusinessServices from './pages/BusinessServices';

const Arrow = () => <span aria-hidden="true">↗</span>;

const services = [
  { icon: '⌂', title: 'Household clutter', text: 'Clear out unwanted items, boxes and everyday rubbish.' },
  { icon: '✿', title: 'Green waste', text: 'Branches, garden clean-ups and outdoor debris, gone.' },
  { icon: '▰', title: 'Furniture', text: 'Sofas, beds, tables and bulky furniture removed with care.' },
  { icon: '▧', title: 'Renovation debris', text: 'Make space after a renovation, move or building project.' },
];
const heroImages = [heroImage2, heroImage1, heroImage3, heroImage4];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHero, setActiveHero] = useState(0);
  const isBusinessPage = window.location.pathname.replace(/\/$/, '') === '/business-services';

  useEffect(() => {
    const timer = window.setInterval(() => setActiveHero((current) => (current + 1) % heroImages.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="site-shell">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <a className="top-phone" href="tel:1800555867">1800 555 867</a>
          <span className="top-message">Fast, friendly junk removal when you need it.</span>
          <nav className="top-nav" aria-label="Quick navigation">
            <a href="#services">What We Do</a>
            <a href="#what-we-take">What We Take</a>
            <a href="#how-it-works">How It Works</a>
          </nav>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home" aria-label="DUMP RUNNERZ home">
            <img src="/dump-runnerz-logo.jpeg" alt="DUMP RUNNERZ Junk Removal" />
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            <span></span><span></span><span></span>
          </button>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
            <a href="https://www.1800gotjunk.com.au/au_en/how-our-pricing-works" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="/business-services" onClick={() => setMenuOpen(false)}>Business Services</a>
            <a href="https://www.1800gotjunk.com.au/au_en/frequently-asked-questions" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>FAQ</a>
            <a href="https://www.1800gotjunk.com.au/au_en/reviews" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Reviews</a>
            <a href="https://jobs.1800gotjunk.com/au_en" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Careers</a>
            <a href="https://request.1800gotjunk.com.au/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Book An Appointment</a>
            <a href="https://account.1800gotjunk.com/en_au/?auth0ScreenHint=login" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Sign In</a>
          </nav>
        </div>
      </header>

      <main id={isBusinessPage ? 'business-page-main' : 'home'}>
        {isBusinessPage ? <BusinessServices /> : <>
        <section className="hero">
          <div className="hero-pattern"></div>
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow">JUNK REMOVAL MADE EASY</p>
              <h1>Point to the junk.<br /><em>We’ll make it gone.</em></h1>
              <p className="hero-text">DUMP RUNNERZ lifts, loads and clears your unwanted rubbish—so you can get back to a cleaner space.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#booking">Get a Free Quote <Arrow /></a>
                <a className="button button-ghost" href="tel:1800555867">Call 1800 555 867</a>
              </div>
              <div className="hero-proof"><span>✓</span> No hidden fees &nbsp; <span>✓</span> Friendly local crews</div>
            </div>
            <div className="hero-visual" aria-label="DUMP RUNNERZ junk removal team">
              <div className="hero-image-frame">
                <img src={heroImages[activeHero]} alt="DUMP RUNNERZ team removing unwanted items" />
                <div className="sun-badge">FAST<br /><strong>&amp; EASY</strong></div>
                <div className="visual-card"><strong>Need it gone?</strong><span>We do the heavy lifting.</span></div>
              </div>
              <div className="hero-dots" aria-label="Hero image selector">
                {heroImages.map((_, index) => <button key={index} className={index === activeHero ? 'active' : ''} onClick={() => setActiveHero(index)} aria-label={`Show hero image ${index + 1}`} />)}
              </div>
            </div>
          </div>
        </section>

        <section className="booking-bar" id="booking">
          <div className="container booking-inner">
            <div><p className="eyebrow dark-eyebrow">CHECK AVAILABILITY</p><h2>Ready to clear the clutter?</h2></div>
            <form className="postcode-form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="postcode">Enter your postcode</label>
              <input id="postcode" placeholder="e.g. 4000" inputMode="numeric" />
              <button className="button button-dark" type="submit">See availability <Arrow /></button>
            </form>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div id="how-it-works" className="anchor-target" aria-hidden="true"></div>
            <div className="section-heading centered"><p className="eyebrow">THE DUMP RUNNERZ WAY</p><h2>Three steps to a cleaner space.</h2><p>Simple, transparent and handled from start to finish by our friendly crew.</p></div>
            <div className="steps-grid">
              <article className="step-card"><span className="step-number">01</span><div className="step-icon">☝</div><h3>Point to the junk</h3><p>Show us what needs to go. No sorting or heavy lifting required.</p></article>
              <article className="step-card"><span className="step-number">02</span><div className="step-icon">↗</div><h3>We load it up</h3><p>Our uniformed team does all the work and keeps your space tidy.</p></article>
              <article className="step-card"><span className="step-number">03</span><div className="step-icon">✦</div><h3>Enjoy your clean space</h3><p>We take your items for responsible disposal, recycling or reuse.</p></article>
            </div>
          </div>
        </section>

        <section className="section section-tint" id="what-we-take">
          <div className="container">
            <div className="section-heading split-heading"><div><p className="eyebrow">WHAT WE TAKE</p><h2>Almost anything<br />non-hazardous.</h2></div><p>From one bulky item to a full property clean-out, we’re ready to help you reclaim your space.</p></div>
            <div className="service-grid">{services.map((service) => <article className="service-card" key={service.title}><div className="service-icon">{service.icon}</div><h3>{service.title}</h3><p>{service.text}</p><a href="#booking">Learn more <Arrow /></a></article>)}</div>
            <div className="service-footer"><span>Don’t see your item? We can probably take it.</span><a className="text-link" href="#contact">Ask our team <Arrow /></a></div>
          </div>
        </section>

        <section className="trust-section" id="reviews"><div className="container trust-inner"><div><p className="eyebrow">WHY DUMP RUNNERZ</p><h2>A cleaner job from start to finish.</h2></div><div className="trust-points"><div><strong>4.9/5</strong><span>Customer rating</span></div><div><strong>100%</strong><span>Upfront quotes</span></div><div><strong>0%</strong><span>Heavy lifting for you</span></div></div></div></section>

        <section className="cta-section" id="contact"><div className="container cta-inner"><div><p className="eyebrow">LET’S GET STARTED</p><h2>Your unwanted stuff is<br /><em>our next job.</em></h2></div><a className="button button-primary" href="#booking">Book your pick-up <Arrow /></a></div></section>
        </>}
      </main>

      <footer className="site-footer"><div className="container footer-inner"><a className="footer-brand" href="#home"><img src="/dump-runnerz-logo.jpeg" alt="DUMP RUNNERZ" /></a><p>Fast, reliable junk removal for homes and businesses.</p><a href="tel:1800555867">1800 555 867</a><span>© 2026 DUMP RUNNERZ. All rights reserved.</span></div></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
