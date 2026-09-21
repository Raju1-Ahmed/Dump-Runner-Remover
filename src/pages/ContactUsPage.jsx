import { useState } from 'react';
import './contact-us-page.css';

const subjects = ['General Inquiry', 'Junk Removal Estimate', 'Existing Appointment', 'Commercial Services', 'Other'];

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };
const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

function Arrow() { return <span aria-hidden="true">↗</span>; }

function validateForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your full name.';
  if (!form.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address.';
  if (!form.subject) errors.subject = 'Please choose a subject.';
  if (!form.message.trim()) errors.message = 'Please enter a message.';
  return errors;
}

export default function ContactUsPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [noticeType, setNoticeType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
    setNotice('');
    setNoticeType('');
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setNotice('Please check the highlighted fields and try again.');
      setNoticeType('error');
      return;
    }
    setSubmitting(true);
    setNotice('');
    try {
      const response = await fetch(`${API}/api/contact-messages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Unable to send your message.');
      setForm(initialForm);
      setErrors({});
      setNotice(data.message || 'Your message has been received.');
      setNoticeType('success');
    } catch (requestError) {
      setErrors({ __submit: requestError.message });
      setNotice(`${requestError.message} Please call 1800 555 867 if you need immediate help.`);
      setNoticeType('error');
    } finally { setSubmitting(false); }
  };

  return <div className="contact-page">
    <section className="contact-hero"><div className="container contact-hero-inner"><div><p className="eyebrow">LET’S TALK</p><h1>Contact<br /><em>Us.</em></h1><p>Have a question or need help with junk removal? We’re here to help.</p><p>Reach out about an estimate, an existing appointment or a commercial clear-out.</p></div><div className="contact-hero-mark" aria-hidden="true"><span>DR</span><b>HERE TO HELP</b></div></div></section>

    <section className="contact-info"><div className="container"><div className="contact-heading"><p className="eyebrow">GET IN TOUCH</p><h2>We’re ready to<br /><em>hear from you.</em></h2><p>Choose the easiest way to get in touch with the DUMP RUNNERZ team.</p></div><div className="contact-info-grid"><article><span className="contact-icon" aria-hidden="true">☎</span><div><small>CALL US</small><h3>1800 555 867</h3><p>Speak with our team about your removal needs.</p><a href="tel:1800555867">Call now <Arrow /></a></div></article><article><span className="contact-icon" aria-hidden="true">✦</span><div><small>BOOK ONLINE</small><h3>Request a pickup</h3><p>Choose a service, date and available time online.</p><a href="/book-appointment">Book an appointment <Arrow /></a></div></article><article><span className="contact-icon" aria-hidden="true">⌖</span><div><small>FOR BUSINESSES</small><h3>Commercial help</h3><p>Discuss office, retail and business clear-out needs.</p><a href="/business-services">Business services <Arrow /></a></div></article></div></div></section>

    <section className="contact-form-section"><div className="container contact-form-grid"><div><p className="eyebrow">SEND A MESSAGE</p><h2>How can we<br /><em>help?</em></h2><p>Share a few details and we’ll use them to understand what you need. Required fields are marked with an asterisk.</p><div className="contact-form-note"><strong>Need help right now?</strong><a href="tel:1800555867">1800 555 867</a></div></div><form className="contact-form" onSubmit={submitForm} noValidate><div className="contact-field-grid"><Field label="Full Name" name="name" value={form.name} onChange={updateField} error={errors.name} required /><Field label="Email Address" name="email" type="email" value={form.email} onChange={updateField} error={errors.email} required /></div><div className="contact-field-grid"><Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={updateField} /><div className="contact-field"><label htmlFor="subject">Subject <span>*</span></label><select id="subject" name="subject" value={form.subject} onChange={updateField} aria-invalid={Boolean(errors.subject)}><option value="">Choose a subject</option>{subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}</select>{errors.subject && <small className="field-error">{errors.subject}</small>}</div></div><div className="contact-field"><label htmlFor="message">Message <span>*</span></label><textarea id="message" name="message" rows="6" value={form.message} onChange={updateField} placeholder="Tell us how we can help..." aria-invalid={Boolean(errors.message)} />{errors.message && <small className="field-error">{errors.message}</small>}</div><button className="button button-primary" type="submit">Send Message <Arrow /></button>{notice && <p className={`contact-form-notice ${Object.keys(errors).length ? 'is-error' : 'is-info'}`} role="alert">{notice}</p>}</form></div></section>

    <section className="contact-requests"><div className="container"><div className="contact-centered"><p className="eyebrow">QUICK HELP</p><h2>Choose your next<br /><em>best step.</em></h2></div><div className="contact-request-grid"><a href="/book-appointment"><span>01</span><h3>Get a junk removal estimate</h3><p>Tell us what needs to go and request a pickup.</p><Arrow /></a><a href="tel:1800555867"><span>02</span><h3>Questions about an appointment</h3><p>Call the team about an existing booking.</p><Arrow /></a><a href="/what-we-take"><span>03</span><h3>Learn what items we take</h3><p>Browse common items and search the directory.</p><Arrow /></a><a href="/business-services"><span>04</span><h3>Explore commercial removal</h3><p>Find support for offices, retail and business spaces.</p><Arrow /></a></div></div></section>

    <section className="contact-faq-shortcut"><div className="container"><div><p className="eyebrow">NEED A QUICK ANSWER?</p><h2>Looking for a<br /><em>quick answer?</em></h2><p>Browse common questions about pricing, appointments, accepted items and service information.</p></div><a className="button button-outline-light" href="/faq">Visit FAQs <Arrow /></a></div></section>

    <section className="contact-final"><div className="container"><div><p className="eyebrow">READY WHEN YOU ARE</p><h2>Ready to clear out<br /><em>the clutter?</em></h2><p>Get started by choosing a pickup time that works for you.</p></div><a className="button button-primary" href="/book-appointment">Get Started <Arrow /></a></div></section>
  </div>;
}

function Field({ label, name, type = 'text', value, onChange, error, required = false }) {
  return <div className="contact-field"><label htmlFor={name}>{label} {required && <span>*</span>}</label><input id={name} name={name} type={type} value={value} onChange={onChange} aria-invalid={Boolean(error)} />{error && <small className="field-error">{error}</small>}</div>;
}
