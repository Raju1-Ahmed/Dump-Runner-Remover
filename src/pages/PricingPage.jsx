import { useState } from 'react';
import heroImage from '../Asset/Hero/dump runner hero section image (2).png';
import singleItemImage from '../Asset/Business Service/ChatGPT Image Sep 20, 2026, 01_51_39 PM.png';
import multipleItemImage from '../Asset/Business Service/ChatGPT Image Sep 20, 2026, 01_56_22 PM.png';
import capacityImage from '../Asset/Business Service/ChatGPT Image Sep 20, 2026, 02_27_45 PM.png';
import './pricing-page.css';

const volumeOptions = [
  { label: '1/8', title: 'A small load', text: 'A few items or a compact clear-out.' },
  { label: '1/4', title: 'A quarter truck', text: 'A room refresh with several bulky items.' },
  { label: '1/2', title: 'Half a truck', text: 'A larger household or office clear-out.' },
  { label: '3/4', title: 'Three-quarter truck', text: 'A substantial load from a bigger project.' },
  { label: 'Full', title: 'A full truckload', text: 'A complete property, renovation or move-out clear.' },
];

const faqs = [
  ['How is junk removal pricing calculated?', 'Your estimate depends on the amount and type of junk, the truck space it occupies, your pickup location and any service requirements.'],
  ['Do you charge by item or truck volume?', 'Single items can be estimated individually. For multiple items, the estimate is based on how much space the load takes in the truck.'],
  ['Can I get an estimate before removal?', 'Yes. Book an appointment and our team can review what needs to go before work begins, so you can decide how you would like to proceed.'],
  ['Does the estimate include loading and cleanup?', 'Our service is designed to handle the loading and leave the work area tidy. The exact scope is confirmed with your estimate.'],
  ['Can I reschedule my appointment?', 'Contact the DUMP RUNNERZ team as soon as possible if your plans change and we will help with the next available option.'],
  ['What happens to items that can be recycled?', 'Items are sorted for responsible disposal, reuse or recycling where appropriate and available for the material and location.'],
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

function VolumeTruck({ level }) {
  return <div className="pricing-truck" aria-label={`${volumeOptions[level].label} truck volume selected`}>
    <div className="pricing-truck-body"><div className="pricing-truck-fill" style={{ width: `${(level + 1) * 20}%` }} /></div>
    <div className="pricing-truck-cab"><span>DR</span></div>
    <i className="pricing-wheel pricing-wheel-one" /><i className="pricing-wheel pricing-wheel-two" />
  </div>;
}

export default function PricingPage() {
  const [volume, setVolume] = useState(2);
  const [openFaq, setOpenFaq] = useState(null);
  const selected = volumeOptions[volume];

  return <div className="pricing-page">
    <section className="pricing-hero">
      <div className="container pricing-hero-inner">
        <div className="pricing-hero-copy">
          <p className="eyebrow">CLEAR PRICING, CLEAR SPACE</p>
          <h1>How our<br /><em>pricing works.</em></h1>
          <p>Simple, transparent junk removal pricing. We make it easy to understand your options and get an estimate.</p>
          <div className="pricing-actions"><a className="button button-primary" href="/book-appointment">Get a Free Estimate <Arrow /></a><a className="button button-ghost" href="#pricing-overview">Explore Pricing</a></div>
        </div>
        <div className="pricing-hero-photo"><img src={heroImage} alt="DUMP RUNNERZ team loading a junk removal truck" /><span className="pricing-photo-badge">NO<br /><strong>SURPRISES</strong></span></div>
      </div>
    </section>

    <section className="pricing-section" id="pricing-overview">
      <div className="container"><div className="pricing-heading"><p className="eyebrow">PRICING OVERVIEW</p><h2>Simple pricing.<br /><em>No surprises.</em></h2><p>Pricing depends on the amount and type of junk, the space it takes in the truck and the service factors at your location. We do not display made-up prices—your estimate is based on the job.</p></div>
        <div className="pricing-cards">
          <article className="pricing-card"><img loading="lazy" src={singleItemImage} alt="Single furniture item ready for removal" /><div><span className="pricing-card-kicker">ONE ITEM</span><h3>Single item removal</h3><p>For one sofa, mattress, appliance or other bulky item, an estimate can be based on the item’s size and type.</p><ul><li>Sofas and furniture</li><li>Mattresses and appliances</li><li>TVs and other single items</li></ul><a className="text-link" href="/book-appointment">Get an estimate <Arrow /></a></div></article>
          <article className="pricing-card"><img loading="lazy" src={multipleItemImage} alt="Multiple household items being prepared for removal" /><div><span className="pricing-card-kicker">MULTIPLE ITEMS</span><h3>Multiple item removal</h3><p>For several items, your estimate is based on the amount of truck space your rubbish takes up.</p><ul><li>From a small load to a full truck</li><li>Household and office clear-outs</li><li>Renovation and move-out debris</li></ul><a className="text-link" href="/book-appointment">Get an estimate <Arrow /></a></div></article>
        </div>
      </div>
    </section>

    <section className="pricing-section pricing-volume-section">
      <div className="container pricing-volume-grid"><div><p className="eyebrow">TRUCK VOLUME ESTIMATOR</p><h2>How much space<br /><em>will you need?</em></h2><p>Select a volume to see a simple visual guide. This is not a price calculator—your final estimate depends on the items and service location.</p><VolumeTruck level={volume} /></div><div className="volume-controls"><div className="volume-selected"><span>Selected volume</span><strong>{selected.label} truck</strong><p>{selected.title} — {selected.text}</p></div><div className="volume-options" role="group" aria-label="Choose truck volume">{volumeOptions.map((option, index) => <button type="button" key={option.label} className={index === volume ? 'active' : ''} aria-pressed={index === volume} onClick={() => setVolume(index)}><strong>{option.label}</strong><span>truck</span></button>)}</div><a className="button button-primary" href="/book-appointment">Get your estimate <Arrow /></a></div></div>
    </section>

    <section className="pricing-section"><div className="container"><div className="pricing-heading centered-pricing"><p className="eyebrow">THE DUMP RUNNERZ WAY</p><h2>Getting a price is easy.</h2></div><div className="pricing-steps"><article><b>01</b><span>✦</span><h3>Book an appointment</h3><p>Schedule a pickup or request an estimate at a time that works for you.</p></article><article><b>02</b><span>⌖</span><h3>Show us what needs to go</h3><p>Our team reviews the items and explains the estimate before work begins.</p></article><article><b>03</b><span>✓</span><h3>We remove the items</h3><p>Once you are happy to proceed, our crew handles the removal process.</p></article></div></div></section>

    <section className="pricing-section pricing-included"><div className="container"><div className="pricing-heading centered-pricing"><p className="eyebrow">FULL-SERVICE SUPPORT</p><h2>What’s included in your service?</h2></div><div className="included-grid"><article><span>↗</span><h3>Loading and removal</h3><p>Our team handles the heavy lifting and loading.</p></article><article><span>✦</span><h3>Cleanup after removal</h3><p>We leave the work area ready for its next use.</p></article><article><span>♙</span><h3>Trained service team</h3><p>Friendly support from a crew focused on your clear-out.</p></article><article><span>♻</span><h3>Responsible disposal</h3><p>Items are considered for reuse, recycling or disposal.</p></article></div></div></section>

    <section className="pricing-section capacity-section"><div className="container capacity-grid"><img loading="lazy" src={capacityImage} alt="Junk removal crew handling bulky items" /><div><p className="eyebrow">TRUCK CAPACITY</p><h2>Volume is the<br /><em>difference.</em></h2><p>Furniture, appliances, boxes and renovation debris all take different amounts of room. The more space your items occupy, the more the estimate reflects the load.</p><div className="capacity-notes"><span><b>⅛ → full</b> Flexible volume options</span><span><b>On-site view</b> Estimate based on your items</span><span><b>No fake prices</b> Location and service considered</span></div><a className="button button-dark" href="/book-appointment">Book an estimate <Arrow /></a></div></div></section>

    <section className="pricing-section factors-section"><div className="container"><div className="pricing-heading centered-pricing"><p className="eyebrow">YOUR ESTIMATE</p><h2>What affects your estimate?</h2></div><div className="factor-grid">{['Amount of junk','Item size and type','Pickup location','Access and removal requirements','Disposal and recycling needs'].map((factor, index) => <article key={factor}><span>0{index + 1}</span><h3>{factor}</h3><p>We consider the details of your job so the estimate matches the work required.</p></article>)}</div></div></section>

    <section className="pricing-section faq-section"><div className="container faq-grid"><div><p className="eyebrow">NEED TO KNOW</p><h2>Questions,<br /><em>answered.</em></h2><p>Still unsure? Our team can help you understand your options.</p><a className="text-link" href="tel:1800555867">Call 1800 555 867 <Arrow /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><b aria-hidden="true">{openFaq === index ? '−' : '+'}</b></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>

    <section className="pricing-final-cta"><div className="container"><div><p className="eyebrow">LET’S GET STARTED</p><h2>Ready to clear<br /><em>your space?</em></h2><p>Get in touch to discuss your junk removal needs and receive an estimate.</p></div><div className="pricing-actions"><a className="button button-primary" href="/book-appointment">Get a Free Estimate <Arrow /></a><a className="button button-outline-dark" href="tel:1800555867">Contact Us</a></div></div></section>
  </div>;
}
