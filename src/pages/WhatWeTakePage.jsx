import { useMemo, useState } from 'react';
import heroImage from '../Asset/Hero/dump runner hero section image (3).png';
import fridgeImage from '../Asset/Business Service/ChatGPT Image Sep 20, 2026, 02_32_17 PM.png';
import mattressImage from '../Asset/Business Service/ChatGPT Image Sep 20, 2026, 01_51_39 PM.png';
import furnitureImage from '../Asset/Business Service/ChatGPT Image Sep 20, 2026, 01_56_22 PM.png';
import electronicsImage from '../Asset/Business Service/ChatGPT Image Sep 20, 2026, 02_00_17 PM.png';
import './what-we-take-page.css';

const itemGroups = [
  ['Appliances', ['Air conditioners', 'Dishwashers', 'Washing machines', 'Clothes dryers', 'Freezers', 'Stoves and ovens', 'Microwaves', 'Fans and small appliances']],
  ['Household items', ['BBQs and grills', 'Carpets and rugs', 'Christmas trees', 'Household rubbish', 'Lawn mowers', 'Yard and garden waste', 'Hot tubs']],
  ['Furniture', ['Couches and sofa beds', 'Dining tables', 'Beds', 'Bookcases', 'Dressers', 'Desks', 'Coffee tables', 'Outdoor furniture']],
  ['Mattresses & box springs', ['Foam mattresses', 'Memory foam mattresses', 'Box springs', 'Futons', 'Gel and pillow-top mattresses']],
  ['Renovation & construction', ['Eligible renovation debris', 'Concrete', 'Insulation', 'Glass and mirrors', 'Scrap metal']],
  ['Refrigerators & freezers', ['Top-freezer refrigerators', 'Side-by-side refrigerators', 'French-door refrigerators', 'Compact refrigerators', 'Mini fridges and freezers']],
  ['TVs & electronics', ['LED and LCD televisions', 'Flat-screen TVs', 'Computers and laptops', 'Monitors and displays', 'Printers and scanners', 'Cables and accessories']],
  ['Exercise & recreation', ['Bicycles', 'Treadmills', 'Elliptical machines', 'Dumbbells and weights', 'Pool tables', 'Playsets and trampolines']],
];

const featured = [
  ['Refrigerators & freezers', 'Fridges, freezers and compact cooling appliances.', fridgeImage, 'Refrigerator and freezer removal examples'],
  ['Mattresses & box springs', 'Foam, memory foam, futons and box springs.', mattressImage, 'Mattress and box spring removal examples'],
  ['Furniture', 'Couches, tables, beds, bookcases and more.', furnitureImage, 'Furniture removal examples'],
  ['Televisions & electronics', 'TVs, computers, monitors, printers and accessories.', electronicsImage, 'Television and electronics removal examples'],
];

const notAccepted = ['Chemicals, solvents and oils', 'Asbestos', 'Storage and oil drums', 'Oil and waste storage tanks'];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function WhatWeTakePage() {
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();
  const filteredGroups = useMemo(() => itemGroups.map(([category, items]) => [category, query ? items.filter((item) => item.toLowerCase().includes(query)) : items]).filter(([, items]) => items.length), [query]);
  const resultCount = filteredGroups.reduce((count, [, items]) => count + items.length, 0);

  return <div className="what-we-take-page">
    <section className="take-hero"><div className="container take-hero-inner"><div><p className="eyebrow">FULL-SERVICE REMOVAL</p><h1>What we<br /><em>take.</em></h1><p>From furniture and appliances to electronics, yard waste and eligible renovation debris, we help make unwanted items disappear.</p><p className="take-hero-note"><span>✓</span> Acceptance depends on item type, safety, local rules and availability.</p><a className="button button-primary" href="/book-appointment">Check Availability <Arrow /></a></div><div className="take-hero-image"><img src={heroImage} alt="DUMP RUNNERZ team handling items for removal" /><div className="take-hero-badge">ALL YOU<br /><strong>HAVE TO DO<br />IS POINT</strong></div></div></div></section>

    <section className="take-featured"><div className="container"><div className="take-heading"><div><p className="eyebrow">COMMON ITEMS</p><h2>We take all kinds<br /><em>of junk.</em></h2></div><p>Here are some of the items customers commonly ask us to remove. If you do not see yours, search the directory or contact our team to discuss it.</p></div><div className="take-featured-grid">{featured.map(([title, text, image, alt]) => <article key={title}><img loading="lazy" src={image} alt={alt} /><div><h3>{title}</h3><p>{text}</p><a className="text-link" href="#item-directory">View examples <Arrow /></a></div></article>)}</div></div></section>

    <section className="take-directory" id="item-directory"><div className="container"><div className="take-directory-heading"><p className="eyebrow">ITEM DIRECTORY</p><h2>Wondering if we can<br /><em>take your items?</em></h2><p>Search the item you need removed. Items shown are examples only—final acceptance can depend on safety, local regulations and service availability.</p></div><div className="take-search"><span aria-hidden="true">⌕</span><label htmlFor="take-search-input">Search the item you need removed</label><input id="take-search-input" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the item you need removed…" />{search && <button type="button" onClick={() => setSearch('')} aria-label="Clear item search">Clear</button>}</div>{query && <p className="take-result-count">{resultCount} matching {resultCount === 1 ? 'item' : 'items'}</p>}{filteredGroups.length ? <div className="take-groups">{filteredGroups.map(([category, items]) => <section className="take-group" key={category}><div className="take-group-title"><span>✦</span><h3>{category}</h3><b>{items.length}</b></div><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div> : <div className="take-empty"><strong>We don’t have details about this item.</strong><p>Contact us to confirm whether we can remove it.</p><a className="button button-dark" href="tel:1800555867">Contact the team</a></div>}</div></section>

    <section className="take-not-accepted"><div className="container take-not-grid"><div><p className="eyebrow">PLEASE NOTE</p><h2>What we<br /><em>don’t take.</em></h2><p>Some materials need specialist handling or are restricted by local rules. This is not a complete list, so contact us if you are unsure.</p></div><div className="take-warning-card"><div className="take-warning-icon">!</div><ul>{notAccepted.map((item) => <li key={item}>{item}</li>)}</ul><a className="text-link" href="tel:1800555867">Ask about an item <Arrow /></a></div></div></section>

    <section className="take-responsible"><div className="container take-responsible-grid"><div className="take-responsible-art"><span>♻</span><strong>WHERE POSSIBLE</strong><small>DONATE • RECYCLE • RESPONSIBLY DISPOSE</small></div><div><p className="eyebrow">A THOUGHTFUL CLEAR-OUT</p><h2>Give unwanted items<br /><em>a better next step.</em></h2><p>Suitable reusable items may be donated and eligible materials may be recycled where possible. Remaining items are directed to appropriate disposal for the service and location.</p></div></div></section>

    <section className="take-process"><div className="container"><div className="take-centered"><p className="eyebrow">HOW IT WORKS</p><h2>Point, and we’ll<br /><em>take it from here.</em></h2></div><div className="take-steps"><article><b>01</b><span>⌖</span><h3>Schedule an appointment</h3><p>Choose a booking time or request an estimate through the existing booking flow.</p></article><article><b>02</b><span>✦</span><h3>Get the details</h3><p>Our team reviews the items and explains the service details for your request.</p></article><article><b>03</b><span>✓</span><h3>We remove the approved items</h3><p>If you agree to proceed, the team handles the lifting, loading and removal.</p></article></div></div></section>

    <section className="take-final-cta"><div className="container"><div><p className="eyebrow">READY WHEN YOU ARE</p><h2>Ready to make your<br /><em>junk disappear?</em></h2><p>Check availability and tell us what you would like removed.</p></div><div className="take-cta-actions"><a className="button button-primary" href="/book-appointment">Get Started <Arrow /></a><a className="button take-outline-button" href="tel:1800555867">Call 1800 555 867</a></div></div></section>
  </div>;
}
