import { useState } from 'react';
import './book-appointment.css';

const services = ['Office cleanout', 'Retail / commercial rubbish', 'Property cleanup', 'Renovation waste', 'General commercial rubbish'];
const timeSlots = ['8:00am - 10:00am', '10:00am - 12:00pm', '12:00pm - 2:00pm', '2:00pm - 4:00pm'];
const BOOKINGS_KEY = 'dumpRunnerzBookings';

function formatDate(date) {
  return new Intl.DateTimeFormat('en-AU', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
}

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [postcode, setPostcode] = useState('');
  const [booking, setBooking] = useState({ service: '', date: '', time: '' });
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', suburb: '', state: '', notes: '', consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const selectedDateLabel = booking.date ? formatDate(new Date(`${booking.date}T12:00:00`)) : '';

  const updateForm = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const checkAvailability = (event) => {
    event.preventDefault();
    if (postcode.trim().length >= 4) setStep(2);
  };

  const chooseAppointment = (event) => {
    event.preventDefault();
    if (booking.service && booking.date && booking.time) setStep(3);
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setBookingError('');
    if (form.firstName && form.lastName && form.email && form.phone && form.address && form.consent) {
      setSubmitting(true);
      try {
        const token = localStorage.getItem('dumpRunnerzToken');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/api/bookings`, { method: 'POST', headers, body: JSON.stringify({ service: booking.service, date: booking.date, dateLabel: selectedDateLabel, time: booking.time, ...form }) });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || 'Unable to save your booking.');
        setSubmitted(true);
      } catch (requestError) { setBookingError(requestError.message || 'We could not save your booking. Please try again.'); }
      finally { setSubmitting(false); }
    }
  };

  return (
    <div className="booking-page">
      <section className="booking-intro"><div className="container booking-intro-inner"><p className="booking-kicker">DUMP RUNNERZ BOOKING</p><h1>Book your rubbish<br /><em>removal pickup.</em></h1><p>Choose a time that works for you. We’ll handle the heavy lifting from there.</p></div></section>
      <section className="booking-workspace"><div className="container booking-layout">
        <div className="booking-card">
          {bookingError && <div className="booking-operation-error" role="alert">{bookingError}</div>}
          <div className="booking-steps" aria-label="Booking progress">
            {[['01', 'Check Availability'], ['02', 'Choose Appointment'], ['03', 'Enter Pick-Up Details']].map(([number, label], index) => <div className={`booking-step ${step === index + 1 ? 'active' : ''} ${step > index + 1 || submitted ? 'complete' : ''}`} key={number}><span>{step > index + 1 || submitted ? '✓' : number}</span><strong>{label}</strong></div>)}
          </div>

          {submitted ? <div className="booking-success"><div className="success-icon">✓</div><p className="booking-kicker red">REQUEST RECEIVED</p><h2>Thanks, {form.firstName}.</h2><p>Your pickup request has been recorded. Our team will contact you at <strong>{form.phone}</strong> to confirm the details.</p><a className="button button-primary" href="/">Back to home <span>↗</span></a></div> : <>
            {step === 1 && <form className="booking-panel" onSubmit={checkAvailability}><p className="booking-kicker red">STEP 01</p><h2>Check Availability</h2><p className="panel-intro">Enter your postcode to see the next available pickup times in your area.</p><label htmlFor="postcode">Your postcode</label><input id="postcode" value={postcode} onChange={(event) => setPostcode(event.target.value)} placeholder="e.g. 4000" inputMode="numeric" required minLength="4" /><button className="button button-primary" type="submit">Next <span>→</span></button><div className="booking-reassurance"><strong>No credit card required.</strong><span>Cancel or reschedule anytime.</span></div></form>}

            {step === 2 && <form className="booking-panel" onSubmit={chooseAppointment}><p className="booking-kicker red">STEP 02</p><h2>Choose Appointment</h2><p className="panel-intro">Select the service, date and time that suits your business or property.</p><label htmlFor="service">What do you need removed?</label><select id="service" value={booking.service} onChange={(event) => setBooking({ ...booking, service: event.target.value })} required><option value="">Select a service</option>{services.map((service) => <option key={service} value={service}>{service}</option>)}</select><div className="booking-field-row"><div><label htmlFor="date">Preferred date</label><input className="calendar-input" id="date" type="date" min={today} value={booking.date} onChange={(event) => setBooking({ ...booking, date: event.target.value })} required /></div><div><label htmlFor="time">Preferred time</label><select id="time" value={booking.time} onChange={(event) => setBooking({ ...booking, time: event.target.value })} required><option value="">Choose a time</option>{timeSlots.map((time) => <option key={time} value={time}>{time}</option>)}</select></div></div><button className="button button-primary" type="submit">Enter Pick-Up Details <span>→</span></button><button type="button" className="back-button" onClick={() => setStep(1)}>← Change postcode</button></form>}

            {step === 3 && <form className="booking-panel details-panel" onSubmit={submitBooking}><p className="booking-kicker red">STEP 03</p><h2>Enter Pick-Up Details</h2><p className="panel-intro">Tell us where to collect your items and how we can reach you.</p><div className="booking-summary"><span>{booking.service}</span><span>{selectedDateLabel} · {booking.time}</span></div><div className="booking-field-row"><div><label htmlFor="firstName">First name</label><input id="firstName" name="firstName" value={form.firstName} onChange={updateForm} required /></div><div><label htmlFor="lastName">Last name</label><input id="lastName" name="lastName" value={form.lastName} onChange={updateForm} required /></div></div><div className="booking-field-row"><div><label htmlFor="email">Email</label><input id="email" name="email" type="email" value={form.email} onChange={updateForm} required /></div><div><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" value={form.phone} onChange={updateForm} required /></div></div><label htmlFor="address">Pickup address</label><input id="address" name="address" value={form.address} onChange={updateForm} placeholder="Street address" required /><div className="booking-field-row"><div><label htmlFor="suburb">Suburb</label><input id="suburb" name="suburb" value={form.suburb} onChange={updateForm} required /></div><div><label htmlFor="state">State</label><select id="state" name="state" value={form.state} onChange={updateForm} required><option value="">Select state</option><option>QLD</option><option>NSW</option><option>VIC</option><option>WA</option><option>SA</option><option>TAS</option><option>ACT</option><option>NT</option></select></div></div><label htmlFor="notes">Anything else we should know? <small>Optional</small></label><textarea id="notes" name="notes" value={form.notes} onChange={updateForm} placeholder="Access details, item notes or special instructions"></textarea><label className="consent-label"><input type="checkbox" name="consent" checked={form.consent} onChange={updateForm} required /> <span>I agree to be contacted about this pickup request.</span></label><button className="button button-primary" type="submit">Request Pickup <span>→</span></button><button type="button" className="back-button" onClick={() => setStep(2)}>← Change appointment</button></form>}
          </>}
        </div>
        <aside className="booking-aside"><div className="aside-image"><img src="/dump-runnerz-logo.jpeg" alt="DUMP RUNNERZ" /></div><h2>Simple booking.<br /><em>Less hassle.</em></h2><ul><li><span>✓</span> Professional, friendly crews</li><li><span>✓</span> Clear communication from start to finish</li><li><span>✓</span> We do the lifting and loading</li><li><span>✓</span> Flexible pickup times</li></ul><div className="aside-call"><span>Need help booking?</span><a href="tel:1800555867">1800 555 867</a></div></aside>
      </div></section>
    </div>
  );
}
