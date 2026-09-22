import heroImage from '../Asset/file_00000000978881f5b8dd22e28b780b49.png';
import householdImage from '../Asset/file_0000000096cc81f58f838e2774e509ca.png';
import movingImage from '../Asset/dump_runnerz_01.jpg.jpeg';
import renovationImage from '../Asset/dump_runnerz_16.jpg.jpeg';
import disasterImage from '../Asset/dump_runnerz_25.jpg.jpeg';
import commercialImage from '../Asset/file_00000000367481faa2da276dbd9617c8.png';
import './what-we-do-page.css';

const categories = [
  { title: 'Household junk removal', text: 'Furniture, appliances, general household clutter and unwanted items—cleared from the space you point us to.', image: householdImage, alt: 'Household furniture prepared for junk removal', href: '/book-appointment', cta: 'Explore household removal' },
  { title: 'Moving & decluttering', text: 'Clear the things you no longer need while preparing to move, downsize or make room for what is next.', image: movingImage, alt: 'Items being cleared during a move', href: '/book-appointment', cta: 'Explore moving & decluttering' },
  { title: 'Dumpster alternative', text: 'For eligible clear-outs, a removal team can handle the lifting and loading so you do not have to manage a rental yourself.', image: renovationImage, alt: 'Renovation material ready for removal', href: '/book-appointment', cta: 'Explore the service' },
  { title: 'Disaster & debris cleanup', text: 'We can discuss eligible debris and cleanup-related removal needs. Contact us first about any unusual or restricted material.', image: disasterImage, alt: 'Debris from a cleanup project', href: '/book-appointment', cta: 'Explore cleanup services' },
  { title: 'Commercial junk removal', text: 'Make space in offices, retail locations and other business environments with a planned or one-off clear-out.', image: commercialImage, alt: 'Commercial junk removal service', href: '/business-services', cta: 'Explore commercial services' },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function WhatWeDoPage() {
  return <div className="what-we-do-page">
    <section className="what-hero">
      <div className="container what-hero-inner"><div className="what-hero-copy"><p className="eyebrow">FULL-SERVICE JUNK REMOVAL</p><h1>We make junk<br /><em>disappear.</em></h1><p>From old furniture and appliances to electronics, yard waste and renovation debris, DUMP RUNNERZ helps homes and businesses reclaim their space.</p><p className="what-hero-note"><span>✓</span> You point. We handle the lifting and removal.</p><a className="button button-primary" href="/book-appointment">Check Availability <Arrow /></a></div><div className="what-hero-image"><img src={heroImage} alt="DUMP RUNNERZ team removing unwanted items" /><div className="what-hero-stamp">POINT<br /><strong>IT’S GONE</strong></div></div></div>
    </section>

    <section className="what-intro"><div className="container what-intro-grid"><div><p className="eyebrow">THE EASY WAY TO CLEAR OUT</p><h2>Just point to what<br /><em>needs to go.</em></h2></div><div><p>Tell our team what you would like removed and where it is located. We take care of the lifting, loading and removal from the place you specify.</p><p>Suitable reusable items may be donated and eligible materials may be recycled where possible. The goal is simple: make junk removal more convenient for you.</p><a className="text-link" href="/book-appointment">Book a pickup <Arrow /></a></div></div></section>

    <section className="what-services"><div className="container"><div className="what-heading"><div><p className="eyebrow">WHAT WE DO</p><h2>Find the right<br /><em>clear-out service.</em></h2></div><p>Whether it is one bulky item, a full property clean-out or business rubbish, choose the category that best matches your project.</p></div><div className="what-card-grid">{categories.map((category) => <article className="what-service-card" key={category.title}><img loading="lazy" src={category.image} alt={category.alt} /><div className="what-card-content"><h3>{category.title}</h3><p>{category.text}</p><a className="text-link" href={category.href}>{category.cta} <Arrow /></a></div></article>)}</div></div></section>

    <section className="what-process"><div className="container"><div className="what-centered-heading"><p className="eyebrow">THE DUMP RUNNERZ WAY</p><h2>Rubbish removal,<br /><em>made simple.</em></h2><p>A clear, straightforward process from the first conversation to the final load.</p></div><div className="what-steps"><article><b>01</b><span>⌖</span><h3>Show us what to remove</h3><p>Identify the items and tell us where they are located.</p></article><article><b>02</b><span>✦</span><h3>Get the details</h3><p>Our team reviews the job and explains the service details for your request.</p></article><article><b>03</b><span>✓</span><h3>We handle the removal</h3><p>Once approved, our team takes care of the lifting, loading and removal.</p></article></div></div></section>

    <section className="what-responsible"><div className="container what-responsible-grid"><div className="what-responsible-visual"><div className="what-leaf">♻</div><div><strong>RESPONSIBLE</strong><span>WHERE POSSIBLE</span></div></div><div><p className="eyebrow">A THOUGHTFUL NEXT STEP</p><h2>Handled with<br /><em>care.</em></h2><p>We consider whether suitable items can be donated or eligible materials recycled where possible. Items that cannot be reused or recycled are directed to appropriate disposal for the service and location.</p><a className="text-link" href="/faq">Learn more in our FAQs <Arrow /></a></div></div></section>

    <section className="what-final-cta" id="availability"><div className="container"><div><p className="eyebrow">READY WHEN YOU ARE</p><h2>Ready to get rid<br /><em>of your junk?</em></h2><p>Tell us what needs to go and check the next available appointment for your area.</p></div><div className="what-cta-actions"><a className="button button-primary" href="/book-appointment">Get Started <Arrow /></a><a className="button what-outline-button" href="tel:1800555867">Call 1800 555 867</a></div></div></section>
  </div>;
}
