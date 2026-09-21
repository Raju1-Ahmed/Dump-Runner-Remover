import { useMemo, useState } from 'react';
import './faq-page.css';

const faqCategories = [
  {
    title: 'Pricing & Payment',
    intro: 'Understand how estimates are prepared and what to expect before the work starts.',
    items: [
      ['How is junk removal pricing calculated?', 'Your estimate depends on the amount and type of junk, the space it takes in the truck, your pickup location and the work needed to remove it.'],
      ['Do you charge by item or truck volume?', 'A single item may be assessed on its own. For multiple items, the estimate is generally based on the amount of truck space the load occupies.'],
      ['Can I get an estimate before removal?', 'Yes. Book an appointment and our team will review the items with you before work begins, so you can decide whether you would like to continue.'],
      ['When do I pay for the service?', 'Payment details are confirmed with your estimate. Contact our team if you need help understanding the options available for your booking.'],
    ],
  },
  {
    title: 'My Appointment',
    intro: 'Everything you need to know about booking, arrival times and changes.',
    items: [
      ['How do I book a pickup?', 'Use the Book An Appointment page to choose a service, date and available time slot, then enter your pickup details.'],
      ['Can I change or cancel my appointment?', 'If your plans change, contact DUMP RUNNERZ as soon as possible. We will help you find another suitable time when availability allows.'],
      ['Do I need to be home during the pickup?', 'Please include clear access instructions when you book. Whether someone needs to be present can depend on the items, location and agreed service details.'],
      ['What should I do before the team arrives?', 'Make sure the items are safe to access and tell us about stairs, gates, parking restrictions or anything else that could affect removal.'],
    ],
  },
  {
    title: 'What We Take',
    intro: 'Learn about common household, garden and business items we can help remove.',
    items: [
      ['What items can DUMP RUNNERZ remove?', 'We can help with many non-hazardous items including furniture, mattresses, appliances, green waste, household clutter and renovation debris.'],
      ['Can you remove large and bulky items?', 'Often, yes. Tell us what the item is and where it is located so our team can confirm the safest way to handle it.'],
      ['Do you remove paint, chemicals or hazardous materials?', 'Some materials require special handling or may not be accepted. Contact us before booking if you are unsure about an item.'],
      ['What happens to the items after pickup?', 'Where appropriate, items may be sorted for reuse or recycling. The remaining material is handled through suitable disposal channels for the service location.'],
    ],
  },
  {
    title: 'Service & Location Information',
    intro: 'Find quick answers about service areas, access and getting in touch.',
    items: [
      ['Do you service my area?', 'Enter your details during booking or contact our team to check whether DUMP RUNNERZ currently services your location.'],
      ['Do you offer business rubbish removal?', 'Yes. We can discuss recurring or one-off clean-outs for offices, retail spaces, property managers and other businesses.'],
      ['What if access to my items is difficult?', 'Tell us about narrow access, stairs, elevators, long carries or parking restrictions when you request an estimate.'],
      ['How can I contact the team?', 'Call 1800 555 867 or use the Book An Appointment page to send your pickup details online.'],
    ],
  },
];

function matchesQuestion(item, query) {
  return `${item[0]} ${item[1]}`.toLowerCase().includes(query.toLowerCase());
}

export default function FaqPage() {
  const [query, setQuery] = useState('');
  const [openKey, setOpenKey] = useState(null);
  const trimmedQuery = query.trim();
  const visibleCategories = useMemo(() => faqCategories.map((category) => ({
    ...category,
    items: trimmedQuery ? category.items.filter((item) => matchesQuestion(item, trimmedQuery)) : category.items,
  })).filter((category) => category.items.length), [trimmedQuery]);

  const toggle = (key) => setOpenKey((current) => current === key ? null : key);

  return <div className="faq-page">
    <section className="faq-hero">
      <div className="container faq-hero-inner">
        <div><p className="eyebrow">WE’RE HERE TO HELP</p><h1>Frequently Asked<br /><em>Questions.</em></h1><p>Find clear answers about junk removal, pricing, appointments and the items we take.</p></div>
        <div className="faq-hero-mark" aria-hidden="true"><span>?</span><b>FAQ</b></div>
      </div>
    </section>

    <section className="faq-content">
      <div className="container">
        <div className="faq-search-wrap"><label htmlFor="faq-search">Search frequently asked questions</label><div className="faq-search"><span aria-hidden="true">⌕</span><input id="faq-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a question..." /></div><p>{trimmedQuery ? `Showing results for “${trimmedQuery}”` : 'Browse by category or search for a quick answer.'}</p></div>
        {visibleCategories.length ? <div className="faq-categories">{visibleCategories.map((category) => <section className="faq-category" key={category.title}><div className="faq-category-heading"><span className="faq-category-number">{String(faqCategories.indexOf(category) + 1).padStart(2, '0')}</span><div><h2>{category.title}</h2><p>{category.intro}</p></div></div><div className="faq-items">{category.items.map(([question, answer]) => { const key = `${category.title}-${question}`; const isOpen = openKey === key; return <div className={`faq-row ${isOpen ? 'is-open' : ''}`} key={key}><button type="button" aria-expanded={isOpen} aria-controls={`answer-${key}`} onClick={() => toggle(key)}><span>{question}</span><b aria-hidden="true">{isOpen ? '−' : '+'}</b></button><div id={`answer-${key}`} className="faq-answer" hidden={!isOpen}><p>{answer}</p></div></div>; })}</div></section>)}</div> : <div className="faq-empty"><strong>No results found.</strong><p>Try a different search.</p><button className="button button-dark" type="button" onClick={() => setQuery('')}>Show all questions</button></div>}
      </div>
    </section>

    <section className="faq-help"><div className="container faq-help-inner"><div><p className="eyebrow">NEED MORE HELP?</p><h2>Still have<br /><em>questions?</em></h2><p>Our friendly team can help you understand your options and find the right next step.</p></div><div className="pricing-actions"><a className="button button-primary" href="tel:1800555867">Contact Us ↗</a><a className="button button-outline-dark" href="/book-appointment">Book An Appointment</a></div></div></section>
  </div>;
}
