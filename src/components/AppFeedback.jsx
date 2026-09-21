import React from 'react';
import './app-feedback.css';

export function LoadingScreen({ message = 'Loading your experience…' }) {
  return <div className="brand-loading" role="status" aria-live="polite"><div className="brand-loading-card"><img src="/dump-runnerz-logo.jpeg" alt="DUMP RUNNERZ" /><span className="loading-spinner"></span><p>{message}</p></div></div>;
}

export class AppErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  render() {
    if (!this.state.hasError) return this.props.children;
    return <div className="app-error-screen"><img src="/dump-runnerz-logo.jpeg" alt="DUMP RUNNERZ" /><h1>Something went wrong.</h1><p>Please refresh the page and try again.</p><button className="button button-primary" onClick={() => window.location.reload()}>Refresh page</button></div>;
  }
}
