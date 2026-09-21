import { useEffect, useState } from 'react';
import './auth-page.css';

export default function AuthPage({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', remember: false });

  useEffect(() => {
    document.title = mode === 'login' ? 'Sign In | DUMP RUNNERZ' : 'Create Account | DUMP RUNNERZ';
  }, [mode]);

  const updateForm = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setSubmitted(false);
    setError('');
  };

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setSubmitted(false);
    setError('');
    window.history.replaceState({}, '', nextMode === 'register' ? '/register' : '/sign-in');
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setError('');
    if (mode === 'register' && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'https://dump-runner-remover-server.onrender.com';
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = mode === 'login'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };
      const response = await fetch(`${apiBase}${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Unable to continue. Please try again.');
      localStorage.setItem('dumpRunnerzToken', data.token);
      localStorage.setItem('dumpRunnerzUser', JSON.stringify(data.user));
      window.dispatchEvent(new Event('dumpRunnerz-auth-change'));
      setSubmitted(true);
      window.setTimeout(() => { window.location.href = '/book-appointment'; }, 450);
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background-shape auth-shape-one"></div><div className="auth-background-shape auth-shape-two"></div>
      <div className="container auth-layout">
        <section className="auth-message"><p className="auth-kicker">DUMP RUNNERZ ACCOUNT</p><h1>Clear spaces.<br /><em>Stay in control.</em></h1><p>Sign in to manage your pickup requests, review your booking details and make your next clean-up even easier.</p><div className="auth-points"><span>✓ Manage your bookings</span><span>✓ Save your pickup details</span><span>✓ Request quotes faster</span></div></section>
        <section className="auth-card" aria-label={mode === 'login' ? 'Sign in form' : 'Registration form'}>
          <div className="auth-card-brand"><img src="/dump-runnerz-logo.jpeg" alt="DUMP RUNNERZ" /></div>
          <div className="auth-tabs"><button className={mode === 'login' ? 'active' : ''} onClick={() => changeMode('login')} type="button">Sign In</button><button className={mode === 'register' ? 'active' : ''} onClick={() => changeMode('register')} type="button">Create Account</button></div>
          {submitted ? <div className="auth-success"><div className="auth-success-icon">✓</div><h2>{mode === 'login' ? 'Welcome back.' : 'Account created.'}</h2><p>Success! Taking you to the appointment booking page…</p></div> : <form className="auth-form" onSubmit={submitForm}><h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2><p>{mode === 'login' ? 'Sign in to continue to your account.' : 'Save time on your next rubbish removal booking.'}</p>{error && <div className="auth-error" role="alert">{error}</div>}{mode === 'register' && <><label htmlFor="name">Full name</label><input id="name" name="name" value={form.name} onChange={updateForm} placeholder="Your full name" autoComplete="name" required /></>}<label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={form.email} onChange={updateForm} placeholder="you@example.com" autoComplete="email" required /><label htmlFor="password">Password</label><input id="password" name="password" type="password" value={form.password} onChange={updateForm} placeholder="Enter your password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength="6" required />{mode === 'register' && <><label htmlFor="confirmPassword">Confirm password</label><input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateForm} placeholder="Repeat your password" autoComplete="new-password" minLength="6" required /></>}<div className="auth-form-row">{mode === 'login' ? <label className="remember"><input type="checkbox" name="remember" checked={form.remember} onChange={updateForm} /> Remember me</label> : <span className="password-note">Minimum 6 characters</span>}{mode === 'login' && <a href="#forgot-password">Forgot password?</a>}</div><button className="button button-primary auth-submit" type="submit" disabled={loading}>{loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'} {!loading && <span>→</span>}</button><p className="auth-switch">{mode === 'login' ? 'New to DUMP RUNNERZ?' : 'Already have an account?'} <button type="button" onClick={() => changeMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Create an account' : 'Sign in'}</button></p></form>}
        </section>
      </div>
    </div>
  );
}
