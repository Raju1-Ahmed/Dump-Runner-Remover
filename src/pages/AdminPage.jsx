import { useEffect, useState } from 'react';
import './admin-page.css';

const ADMIN_KEY = 'dumpRunnerzAdmin';
const SESSION_KEY = 'dumpRunnerzAdminSession';
const BOOKINGS_KEY = 'dumpRunnerzBookings';

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; }
}

export default function AdminPage() {
  const [admin, setAdmin] = useState(() => readStorage(ADMIN_KEY, null));
  const [bookings, setBookings] = useState(() => readStorage(BOOKINGS_KEY, []));
  // Require admin credentials whenever the protected page is opened or refreshed.
  const [authenticated, setAuthenticated] = useState(false);
  const authMode = 'login';
  const setAuthMode = () => {};
  const [view, setView] = useState('overview');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [authForm, setAuthForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });

  useEffect(() => { document.title = authenticated ? 'Admin Dashboard | DUMP RUNNERZ' : 'Admin Access | DUMP RUNNERZ'; }, [authenticated]);
  useEffect(() => {
    const syncBookings = () => setBookings(readStorage(BOOKINGS_KEY, []));
    window.addEventListener('storage', syncBookings);
    return () => window.removeEventListener('storage', syncBookings);
  }, []);

  const accessInput = (event) => setAuthForm({ ...authForm, [event.target.name]: event.target.value });
  const passwordInput = (event) => setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value });
  const submitAccess = async (event) => {
    event.preventDefault(); setError(''); setMessage('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/api/auth/admin-login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: authForm.email, password: authForm.password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Invalid admin email or password.');
      localStorage.setItem('dumpRunnerzToken', data.token); localStorage.setItem('dumpRunnerzUser', JSON.stringify(data.user)); localStorage.setItem(SESSION_KEY, 'active');
      setAdmin(data.user); setAuthenticated(true);
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the server.');
    }
  };
  const changePassword = async (event) => {
    event.preventDefault(); setError(''); setMessage('');
    if (passwordForm.next.length < 6) return setError('New password must be at least 6 characters.');
    if (passwordForm.next !== passwordForm.confirm) return setError('New passwords do not match.');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/api/auth/admin-password`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('dumpRunnerzToken') || ''}` }, body: JSON.stringify({ currentPassword: passwordForm.current, newPassword: passwordForm.next }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to change password.');
      setPasswordForm({ current: '', next: '', confirm: '' }); setMessage(data.message);
    } catch (requestError) { setError(requestError.message || 'Unable to change password.'); }
  };
  const logout = () => { localStorage.removeItem(SESSION_KEY); localStorage.removeItem('dumpRunnerzToken'); setAuthenticated(false); };

  if (!authenticated) return <div className="admin-page admin-gate"><div className="admin-gate-card"><div className="admin-logo"><img src="/dump-runnerz-logo.jpeg" alt="DUMP RUNNERZ" /></div><p className="admin-kicker">DUMP RUNNERZ ADMIN</p><h1>{authMode === 'create' ? 'Create admin access' : 'Welcome back'}</h1><p className="admin-subtitle">{authMode === 'create' ? 'Set up the first admin account for this dashboard.' : 'Sign in to manage your rubbish removal operations.'}</p><form onSubmit={submitAccess} className="admin-form"><label htmlFor="admin-email">Admin email</label><input id="admin-email" name="email" type="email" value={authForm.email} onChange={accessInput} placeholder="admin@example.com" required /><label htmlFor="admin-password">Password</label><input id="admin-password" name="password" type="password" value={authForm.password} onChange={accessInput} placeholder="Enter password" minLength="6" required />{authMode === 'create' && <><label htmlFor="admin-confirm-password">Confirm password</label><input id="admin-confirm-password" name="confirmPassword" type="password" value={authForm.confirmPassword} onChange={accessInput} placeholder="Repeat password" minLength="6" required /></>}{error && <p className="admin-error" role="alert">{error}</p>}<button className="button button-primary" type="submit">{authMode === 'create' ? 'Create Admin Account' : 'Sign In to Dashboard'} <span>→</span></button></form><button className="admin-switch" type="button" onClick={() => { setAuthMode(authMode === 'create' ? 'login' : 'create'); setError(''); }}>{authMode === 'create' ? 'Already have admin access? Sign in' : 'First time here? Create admin account'}</button><p className="admin-security-note">Frontend prototype access. Production admin security will be connected to the server.</p></div></div>;

  return <div className="admin-page"><div className="admin-dashboard"><aside className="admin-sidebar"><div className="admin-sidebar-brand"><img src="/dump-runnerz-logo.jpeg" alt="DUMP RUNNERZ" /></div><p className="admin-kicker">CONTROL CENTRE</p><button className={view === 'overview' ? 'active' : ''} onClick={() => setView('overview')} type="button">▦ <span>Overview</span></button><button className={view === 'bookings' ? 'active' : ''} onClick={() => { setBookings(readStorage(BOOKINGS_KEY, [])); setView('bookings'); }} type="button">▣ <span>Bookings <b className="booking-count">{bookings.length}</b></span></button><button className={view === 'settings' ? 'active' : ''} onClick={() => setView('settings')} type="button">⚙ <span>Settings</span></button><button className="admin-sidebar-logout" onClick={logout} type="button">↪ <span>Sign out</span></button></aside><main className="admin-content"><header className="admin-topbar"><div><p className="admin-kicker">DUMP RUNNERZ ADMIN</p><h1>{view === 'overview' ? 'Good morning, admin.' : view === 'bookings' ? 'Bookings' : 'Account settings'}</h1></div><div className="admin-avatar">{admin?.email?.slice(0, 1).toUpperCase()}</div></header>{message && <div className="admin-success" role="status">✓ {message}</div>}{error && <div className="admin-error admin-content-error" role="alert">{error}</div>}{view === 'overview' && <><div className="admin-stat-grid"><div><span>Upcoming pickups</span><strong>{bookings.length}</strong><small>{bookings.length ? 'Bookings received' : 'No bookings yet'}</small></div><div><span>Quote requests</span><strong>0</strong><small>Ready to review</small></div><div><span>Available slots</span><strong>—</strong><small>Set availability soon</small></div></div><section className="admin-panel"><div><p className="admin-kicker">BOOKING ACTIVITY</p><h2>{bookings.length ? `${bookings.length} booking${bookings.length > 1 ? 's' : ''} received` : 'Connect your booking calendar'}</h2><p>{bookings.length ? 'Review your latest customer appointment requests from the bookings section.' : 'Customer bookings will appear here after the first appointment request is submitted.'}</p></div><button className="button button-primary" type="button" onClick={() => setView('bookings')}>View bookings <span>→</span></button></section></>}{view === 'bookings' && <section className="admin-bookings">{bookings.length === 0 ? <div className="admin-panel admin-empty"><div className="admin-empty-icon">▣</div><h2>No bookings yet</h2><p>Customer appointment requests will appear here.</p><a className="button button-primary" href="/book-appointment">Open booking page <span>↗</span></a></div> : bookings.map((booking) => <article className="booking-record" key={booking.id}><div className="booking-record-top"><div><span className="booking-id">{booking.id}</span><h2>{booking.firstName} {booking.lastName}</h2></div><span className="booking-status">{booking.status}</span></div><div className="booking-record-grid"><div><small>Service</small><strong>{booking.service}</strong></div><div><small>Appointment</small><strong>{booking.dateLabel} · {booking.time}</strong></div><div><small>Contact</small><strong>{booking.phone}</strong><span>{booking.email}</span></div><div><small>Pickup address</small><strong>{booking.address}</strong><span>{booking.suburb}{booking.state ? `, ${booking.state}` : ''}</span></div></div>{booking.notes && <p className="booking-notes"><b>Notes:</b> {booking.notes}</p>}</article>)}</section>}{view === 'settings' && <section className="admin-panel admin-settings"><p className="admin-kicker">SECURITY</p><h2>Change admin password</h2><p>Update the password used to access this dashboard.</p><form className="admin-form" onSubmit={changePassword}><label htmlFor="current-password">Current password</label><input id="current-password" name="current" type="password" value={passwordForm.current} onChange={passwordInput} required /><label htmlFor="new-password">New password</label><input id="new-password" name="next" type="password" value={passwordForm.next} onChange={passwordInput} minLength="6" required /><label htmlFor="confirm-new-password">Confirm new password</label><input id="confirm-new-password" name="confirm" type="password" value={passwordForm.confirm} onChange={passwordInput} minLength="6" required /><button className="button button-primary" type="submit">Update password <span>→</span></button></form></section>}</main></div></div>;
}
