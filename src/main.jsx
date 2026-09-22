import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import heroImage1 from './Asset/file_00000000978881f5b8dd22e28b780b49.png';
import heroImage2 from './Asset/file_00000000255c81faadc0cb8a3afdd725.png';
import heroImage3 from './Asset/file_000000002f988230b6afa48a63d520b0.png';
import heroImage4 from './Asset/file_0000000096cc81f58f838e2774e509ca.png';
import serviceImage1 from './Asset/file_0000000096cc81f58f838e2774e509ca.png';
import serviceImage2 from './Asset/file_000000002f988230b6afa48a63d520b0.png';
import serviceImage3 from './Asset/file_00000000367481faa2da276dbd9617c8.png';
import serviceImage4 from './Asset/dump_runnerz_16.jpg.jpeg';
import galleryImage1 from './Asset/dump_runnerz_01.jpg.jpeg';
import galleryImage2 from './Asset/dump_runnerz_22.jpg.jpeg';
import galleryImage3 from './Asset/dump_runnerz_30.jpg.jpeg';
import BusinessServices from './pages/BusinessServices';
import BookAppointment from './pages/BookAppointment';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import PricingPage from './pages/PricingPage';
import FaqPage from './pages/FaqPage';
import WhatWeDoPage from './pages/WhatWeDoPage';
import WhatWeTakePage from './pages/WhatWeTakePage';
import ContactUsPage from './pages/ContactUsPage';
import AboutUsPage from './pages/AboutUsPage';
import NotFoundPage from './pages/NotFoundPage';
import { AppErrorBoundary, LoadingScreen } from './components/AppFeedback';

const Arrow = () => <span aria-hidden="true">↗</span>;

const services = [
  { icon: '⌂', title: 'Household clutter', text: 'Clear out unwanted items, boxes and everyday rubbish.' },
  { icon: '✿', title: 'Green waste', text: 'Branches, garden clean-ups and outdoor debris, gone.' },
  { icon: '▰', title: 'Furniture', text: 'Sofas, beds, tables and bulky furniture removed with care.' },
  { icon: '▧', title: 'Renovation debris', text: 'Make space after a renovation, move or building project.' },
];
const heroImages = [heroImage2, heroImage1, heroImage3, heroImage4];
const homeServices = [
  { image: serviceImage1, title: 'Household clutter', text: 'Clear out unwanted items, boxes and everyday rubbish.', href: '/what-we-take', alt: 'Household items ready for removal' },
  { image: serviceImage2, title: 'Appliances', text: 'Make space by removing old fridges and bulky appliances.', href: '/what-we-take', alt: 'Refrigerator removal service' },
  { image: serviceImage3, title: 'Commercial clear-outs', text: 'Remove office, retail and business items with less disruption.', href: '/business-services', alt: 'Commercial office clean-out' },
  { image: serviceImage4, title: 'Renovation debris', text: 'Make space after a renovation, move or building project.', href: '/what-we-do', alt: 'Renovation debris removal' },
];

function getStoredUser() {
  if (!localStorage.getItem('dumpRunnerzToken')) return null;
  try { return JSON.parse(localStorage.getItem('dumpRunnerzUser') || 'null'); } catch { return null; }
}

function App() {
  const [appLoading, setAppLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHero, setActiveHero] = useState(0);
  const [postcode, setPostcode] = useState('');
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const isBusinessPage = window.location.pathname.replace(/\/$/, '') === '/business-services';
  const isBookingPage = window.location.pathname.replace(/\/$/, '') === '/book-appointment';
  const isRegisterPage = window.location.pathname.replace(/\/$/, '') === '/register';
  const isSignInPage = window.location.pathname.replace(/\/$/, '') === '/sign-in';
  const isAdminPage = window.location.pathname.replace(/\/$/, '') === '/admin';
  const isPricingPage = window.location.pathname.replace(/\/$/, '') === '/pricing';
  const isFaqPage = window.location.pathname.replace(/\/$/, '') === '/faq';
  const isWhatWeDoPage = window.location.pathname.replace(/\/$/, '') === '/what-we-do';
  const isWhatWeTakePage = window.location.pathname.replace(/\/$/, '') === '/what-we-take';
  const isContactUsPage = window.location.pathname.replace(/\/$/, '') === '/contact-us';
  const isAboutUsPage = window.location.pathname.replace(/\/$/, '') === '/about-us';
  const knownPage = ['', '/business-services', '/book-appointment', '/register', '/sign-in', '/admin', '/pricing', '/faq', '/what-we-do', '/what-we-take', '/contact-us', '/about-us'].includes(window.location.pathname.replace(/\/$/, ''));

  useEffect(() => {
    const timer = window.setTimeout(() => setAppLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveHero((current) => (current + 1) % heroImages.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const syncUser = () => {
      setCurrentUser(getStoredUser());
    };
    window.addEventListener('storage', syncUser);
    window.addEventListener('dumpRunnerz-auth-change', syncUser);
    window.addEventListener('pageshow', syncUser);
    return () => { window.removeEventListener('storage', syncUser); window.removeEventListener('dumpRunnerz-auth-change', syncUser); window.removeEventListener('pageshow', syncUser); };
  }, []);

  const logout = () => {
    localStorage.removeItem('dumpRunnerzToken');
    localStorage.removeItem('dumpRunnerzUser');
    window.dispatchEvent(new Event('dumpRunnerz-auth-change'));
    setCurrentUser(null);
    setMenuOpen(false);
    window.location.href = '/';
  };

  if (appLoading) return <LoadingScreen message="Preparing your clean space…" />;

  return (
    <div className="site-shell">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <a className="top-phone" href="tel:1800555867">1800 555 867</a>
          <span className="top-message">Fast, friendly junk removal when you need it.</span>
          <nav className="top-nav" aria-label="Quick navigation">
            <a href="/what-we-do">What We Do</a>
            <a href="/what-we-take">What We Take</a>
          </nav>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="/" aria-label="DUMP RUNNERZ home">
            <img src="/dump-runnerz-logo.jpeg" alt="DUMP RUNNERZ Junk Removal" />
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            <span></span><span></span><span></span>
          </button>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
            <a href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="/business-services" onClick={() => setMenuOpen(false)}>Business Services</a>
            <a href="/about-us" onClick={() => setMenuOpen(false)}>About Us</a>
            <a href="/contact-us" onClick={() => setMenuOpen(false)}>Contact Us</a>
            <a href="/faq" onClick={() => setMenuOpen(false)}>FAQ</a>
            <a href="/book-appointment" onClick={() => setMenuOpen(false)}>Book An Appointment</a>
            {currentUser ? <><span className="nav-user">Hi, {currentUser.name}</span><button className="nav-logout" type="button" onClick={logout}>Logout</button></> : <a href="/sign-in" onClick={() => setMenuOpen(false)}>Sign In</a>}
          </nav>
        </div>
      </header>

      <main id={isBusinessPage ? 'business-page-main' : isBookingPage ? 'book-appointment-main' : isSignInPage || isRegisterPage ? 'auth-page-main' : isAdminPage ? 'admin-page-main' : isPricingPage ? 'pricing-page-main' : isFaqPage ? 'faq-page-main' : isWhatWeDoPage ? 'what-we-do-page-main' : isWhatWeTakePage ? 'what-we-take-page-main' : isContactUsPage ? 'contact-us-page-main' : isAboutUsPage ? 'about-us-page-main' : knownPage ? 'home' : 'not-found-page-main'}>
        {isBusinessPage ? <BusinessServices /> : isBookingPage ? <BookAppointment /> : isSignInPage || isRegisterPage ? <AuthPage initialMode={isRegisterPage ? 'register' : 'login'} /> : isAdminPage ? <AdminPage /> : isPricingPage ? <PricingPage /> : isFaqPage ? <FaqPage /> : isWhatWeDoPage ? <WhatWeDoPage /> : isWhatWeTakePage ? <WhatWeTakePage /> : isContactUsPage ? <ContactUsPage /> : isAboutUsPage ? <AboutUsPage /> : knownPage ? <>
        <section className="hero">
          <div className="hero-pattern"></div>
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow">JUNK REMOVAL MADE EASY</p>
              <h1>Point to the junk.<br /><em>We’ll clear the space.</em></h1>
              <p className="hero-text">DUMP RUNNERZ lifts, loads and clears your unwanted rubbish so you can get back to a cleaner space.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="/book-appointment">Get a Free Estimate <Arrow /></a>
                <a className="button button-ghost" href="tel:1800555867">Call 1800 555 867</a>
              </div>
              <div className="hero-proof"><span>✓</span> Homes &amp; businesses &nbsp; <span>✓</span> Friendly removal team</div>
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
            <form className="postcode-form" onSubmit={(e) => { e.preventDefault(); window.location.href = postcode.trim() ? `/book-appointment?postcode=${encodeURIComponent(postcode.trim())}` : '/book-appointment'; }}>
              <label htmlFor="postcode">Enter your postcode</label>
              <input id="postcode" placeholder="e.g. 4000" inputMode="numeric" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
              <button className="button button-dark" type="submit">See availability <Arrow /></button>
            </form>
          </div>
        </section>

        <section className="home-trust-bar"><div className="container home-trust-items"><span><b>01</b> Homes &amp; businesses</span><span><b>02</b> Simple online booking</span><span><b>03</b> Friendly removal team</span><span><b>04</b> Responsible options where possible</span></div></section>

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
            <div className="service-grid">{homeServices.map((service) => <article className="service-card" key={service.title}><img className="service-card-image" src={service.image} alt={service.alt} /><div className="service-card-body"><h3>{service.title}</h3><p>{service.text}</p><a href={service.href}>Explore service <Arrow /></a></div></article>)}</div>
            <div className="service-footer"><span>Don’t see your item? We can probably take it.</span><a className="text-link" href="#contact">Ask our team <Arrow /></a></div>
          </div>
        </section>

        <section className="trust-section" id="why-us"><div className="container trust-inner"><div><p className="eyebrow">WHY DUMP RUNNERZ</p><h2>A clearer way to reclaim your space.</h2><p className="trust-description">From the first booking detail to the final load, we keep the process simple and practical.</p></div><div className="trust-points"><div><strong>01</strong><span>Book online</span></div><div><strong>02</strong><span>We do the lifting</span></div><div><strong>03</strong><span>Clear next steps</span></div></div></div></section>

        <section className="home-gallery"><div className="container"><div className="section-heading split-heading"><div><p className="eyebrow">THE WORK WE DO</p><h2>From cluttered<br />to clear.</h2></div><p>Furniture, garden waste and everyday unwanted items—handled by a team that keeps the job moving.</p></div><div className="home-gallery-grid"><img src={galleryImage1} alt="DUMP RUNNERZ team carrying a sofa" /><img src={galleryImage2} alt="DUMP RUNNERZ team loading green waste" /><img src={galleryImage3} alt="DUMP RUNNERZ team sweeping after removal" /></div></div></section>

        <section className="home-faq-preview"><div className="container home-faq-inner"><div><p className="eyebrow">QUICK ANSWERS</p><h2>Have a question<br /><em>before you book?</em></h2><p>Find answers about pricing, appointments, accepted items and our service process.</p></div><div className="home-faq-links"><a href="/faq">How does junk removal pricing work? <Arrow /></a><a href="/faq">What items can you remove? <Arrow /></a><a href="/faq">How do I book a pickup? <Arrow /></a><a className="text-link" href="/faq">Visit all FAQs <Arrow /></a></div></div></section>

        <section className="cta-section" id="contact"><div className="container cta-inner"><div><p className="eyebrow">LET’S GET STARTED</p><h2>Your unwanted stuff is<br /><em>our next job.</em></h2></div><a className="button button-primary" href="/book-appointment">Book your pick-up <Arrow /></a></div></section>
        </> : <NotFoundPage />}
      </main>

      <footer className="site-footer"><div className="container footer-main"><div className="footer-brand-column"><a className="footer-brand" href="/" aria-label="DUMP RUNNERZ home"><img src="/dump-runnerz-logo.jpeg" alt="DUMP RUNNERZ" /></a><p>Fast, reliable junk removal for homes and businesses. You point to the items—we handle the heavy lifting.</p><a className="footer-phone" href="tel:1800555867"><span aria-hidden="true">☎</span> 1800 555 867</a></div><div className="footer-column"><h3>Explore</h3><a href="/what-we-do">What We Do</a><a href="/what-we-take">What We Take</a><a href="/pricing">How Pricing Works</a><a href="/faq">Frequently Asked Questions</a></div><div className="footer-column"><h3>Our Company</h3><a href="/about-us">About Us</a><a href="/business-services">Business Services</a><a href="/contact-us">Contact Us</a><a href="/book-appointment">Book An Appointment</a></div><div className="footer-action"><span className="footer-kicker">READY TO CLEAR SPACE?</span><h3>Let’s make your junk disappear.</h3><p>Choose a convenient time and get your pickup started.</p><a className="button footer-button" href="/book-appointment">Get Started <span aria-hidden="true">↗</span></a></div></div><div className="container footer-bottom"><span>© 2026 DUMP RUNNERZ. All rights reserved.</span><span>Professional junk removal made simple.</span><a href="tel:1800555867">Call us today</a></div></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<AppErrorBoundary><App /></AppErrorBoundary>);
