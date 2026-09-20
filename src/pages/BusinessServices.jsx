import { useEffect } from 'react';
import './business-services.css';
import commercialHero from '../Asset/Hero/dump runner hero section image (2).png';
import commercialTeam from '../Asset/Hero/dump runner hero section image (3).png';
import cleanoutImage from '../Asset/Hero/dump runner hero section image (1).png';
import renovationImage from '../Asset/Hero/dump runner hero section image (4).png';

const businessServices = [
  ['▦', 'Office Cleanouts', 'Remove unwanted furniture, equipment, clutter and general office waste quickly and efficiently.'],
  ['⌂', 'Property Management', 'Reliable rubbish removal for rental properties, apartments, move-outs and property maintenance.'],
  ['◫', 'Retail & Commercial Spaces', 'Keep commercial spaces clean by removing unwanted fixtures, furniture, packaging and general rubbish.'],
  ['▧', 'Renovation & Construction', 'Clear unwanted materials, debris and renovation waste from commercial projects.'],
  ['▤', 'Large Property Cleanouts', 'Efficient removal solutions for warehouses, commercial buildings and large-scale cleanouts.'],
  ['✦', 'General Commercial Rubbish', 'Flexible rubbish removal for a wide range of business needs.'],
];

const benefits = [
  ['✧', 'Professional & Friendly Team', 'A respectful crew that works around your business.'],
  ['◷', 'Flexible Scheduling', 'Choose a time that works for your team and site.'],
  ['↗', 'Fast Rubbish Removal', 'Keep projects moving and workspaces clear.'],
  ['✓', 'Upfront Quote', 'Know what to expect before the work begins.'],
  ['↕', 'We Handle the Heavy Lifting', 'Your employees can stay focused on their jobs.'],
  ['♻', 'Responsible Disposal', 'We sort items for reuse, recycling and disposal where possible.'],
  ['▰', 'Small or Large Jobs', 'Practical support for everyday needs and major clear-outs.'],
  ['☼', 'Hassle-Free Service', 'A simple process from booking through to clean-up.'],
];

const showcases = [
  [cleanoutImage, 'Office Clearance', 'Clear furniture, equipment and unwanted office items.'],
  [commercialHero, 'Retail Cleanout', 'Make room for new stock, fixtures or a fresh fit-out.'],
  [commercialTeam, 'Property Cleanup', 'Prepare apartments, rentals and commercial spaces.'],
  [renovationImage, 'Renovation Waste', 'Remove building debris and unwanted project materials.'],
];

const steps = [
  ['01', '⌕', 'Book Your Pickup', 'Choose the service and tell us what needs to be removed.'],
  ['02', '→', 'We Arrive', 'Our team arrives at the scheduled time.'],
  ['03', '▣', 'Get Your Quote', 'Receive a clear quote based on the rubbish that needs to be removed.'],
  ['04', '✦', 'We Load & Clear', 'We handle the heavy lifting and leave your space cleaner.'],
];

export default function BusinessServices() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Commercial Rubbish Removal Services | DUMP RUNNERZ';
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    const previousDescription = description.content;
    description.content = 'Professional commercial rubbish removal for offices, retail businesses, property managers, renovation projects and commercial spaces.';
    return () => {
      document.title = previousTitle;
      description.content = previousDescription;
    };
  }, []);

  return (
    <div className="business-page">
      <section className="business-hero">
        <img src={commercialHero} alt="Commercial rubbish removal team loading a truck" />
        <div className="business-hero-overlay"></div>
        <div className="container business-hero-content">
          <p className="business-kicker">COMMERCIAL RUBBISH REMOVAL</p>
          <h1>Commercial Rubbish<br /><em>Removal Made Simple</em></h1>
          <p className="business-hero-copy">Reliable rubbish removal solutions for offices, retail businesses, property managers, renovation projects and commercial spaces.</p>
          <div className="business-actions"><a className="button button-primary" href="#commercial-booking">Book a Pickup <span>↗</span></a><a className="business-outline-button" href="#commercial-quote">Get a Free Quote</a></div>
          <p className="business-trust">Professional <b>•</b> Reliable <b>•</b> Flexible <b>•</b> Business Friendly</p>
        </div>
      </section>

      <section className="business-section" id="business-services">
        <div className="container">
          <div className="business-section-heading"><div><p className="business-kicker red">HOW WE HELP BUSINESSES</p><h2>Built around<br /><em>your business.</em></h2></div><p>From small business cleanouts to large commercial rubbish removal projects, we make the process simple and hassle-free.</p></div>
          <div className="business-service-grid">{businessServices.map(([icon, title, text]) => <article className="business-service-card" key={title}><span className="business-card-icon">{icon}</span><h3>{title}</h3><p>{text}</p><a href="#commercial-booking" aria-label={`Learn more about ${title}`}>Learn more <span>↗</span></a></article>)}</div>
        </div>
      </section>

      <section className="business-benefits-section"><div className="container"><div className="business-section-heading benefits-heading"><div><p className="business-kicker red">A BETTER WAY TO CLEAR OUT</p><h2>Why businesses<br /><em>choose us.</em></h2></div><p>Professional support that keeps your people productive and your spaces ready for what comes next.</p></div><div className="benefits-grid">{benefits.map(([icon, title, text]) => <div className="benefit-item" key={title}><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

      <section className="productivity-section"><div className="container productivity-grid"><div className="productivity-image"><img src={commercialTeam} alt="DUMP RUNNERZ team clearing commercial furniture" loading="lazy" /></div><div className="productivity-copy"><p className="business-kicker red">LESS CLUTTER. MORE PRODUCTIVITY.</p><h2>Let Your Team<br /><em>Focus on Business</em></h2><p>Your employees should be focused on running your business, not moving heavy furniture, clearing unwanted items or dealing with rubbish. Let our team handle the removal while your team gets back to work.</p><a className="button button-primary" href="#commercial-quote">Request a Free Quote <span>↗</span></a></div></div></section>

      <section className="showcase-section"><div className="container"><div className="centered-business-heading"><p className="business-kicker red">ONE TEAM. MANY SOLUTIONS.</p><h2>Commercial Rubbish Removal<br /><em>for Every Business</em></h2></div><div className="showcase-grid">{showcases.map(([image, title, text]) => <a href="#commercial-booking" className="showcase-card" key={title}><img src={image} alt={`${title} rubbish removal service`} loading="lazy" /><span className="showcase-shade"></span><div><h3>{title}</h3><p>{text}</p><span className="showcase-arrow">↗</span></div></a>)}</div></div></section>

      <section className="process-section"><div className="container"><div className="centered-business-heading"><p className="business-kicker">SIMPLE FROM START TO FINISH</p><h2>How It Works</h2></div><div className="process-grid">{steps.map(([number, icon, title, text]) => <article className="process-card" key={number}><span className="process-number">{number}</span><span className="process-icon">{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="commercial-cta" id="commercial-booking"><div className="container commercial-cta-inner"><div><p className="business-kicker">READY WHEN YOU ARE</p><h2>Ready to Clear Your<br /><em>Commercial Space?</em></h2><p>Whether it’s an office cleanout, retail space, property cleanup or renovation waste, we’re ready to help.</p></div><div className="business-actions"><a className="button button-primary" href="tel:1800555867">Book a Pickup <span>↗</span></a><a className="business-outline-button" id="commercial-quote" href="mailto:hello@dumprunnerz.com">Get a Free Quote</a></div></div></section>
    </div>
  );
}
