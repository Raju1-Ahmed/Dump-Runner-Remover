import './not-found-page.css';

export default function NotFoundPage() {
  return <div className="not-found-page"><div className="container not-found-inner"><div className="not-found-number">404</div><p className="eyebrow">DUMP RUNNERZ</p><h1>This page<br /><em>disappeared.</em></h1><p className="not-found-copy">Sorry, we couldn’t find the page you were looking for. It may have moved or the link may be incorrect.</p><div className="not-found-actions"><a className="button button-primary" href="/">Back to Home <span aria-hidden="true">↗</span></a><a className="button button-outline-dark" href="/contact-us">Contact Us</a></div></div></div>;
}
