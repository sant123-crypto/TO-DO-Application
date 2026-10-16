import { useState } from 'react';

const DEMO_EMAIL = 'student@example.com';
const DEMO_PASSWORD = 'password123';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('Those details don’t match the demo account. Try the credentials below.');
      return;
    }
    setError('');
    onLogin();
  }

  return (
    <main className="login-layout">
      <section className="login-story" aria-label="Daymark introduction">
        <a className="brand" href="#home" aria-label="Daymark home">
          <span className="brand-mark"><span /></span> daymark
        </a>
        <div className="story-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> A little more room to think</span>
          <h1>Make space<br />for what <em>matters.</em></h1>
          <p>A quieter way to keep track of your day. One thing at a time is plenty.</p>
          <div className="story-note"><span className="note-check">✓</span><span>Small steps add up.<br /><strong>You’re already on your way.</strong></span><span className="note-spark">✳</span></div>
        </div>
        <span className="story-footer">A calmer corner of your day <span>© 2026 Daymark</span></span>
      </section>

      <section className="login-side">
        <div className="login-topline">Already have a plan? <span>We’ll keep it safe.</span></div>
        <div className="login-card">
          <div className="mobile-brand"><span className="brand-mark"><span /></span> daymark</div>
          <div className="login-heading"><span className="mini-label">WELCOME BACK</span><h2>Good to see you.</h2><p>Pick up right where you left off.</p></div>
          <form onSubmit={handleSubmit} noValidate>
            <label className="field-label" htmlFor="email">Email address</label>
            <div className="input-wrap"><span className="input-icon" aria-hidden="true">✉</span><input id="email" type="email" autoComplete="username" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} aria-describedby={error ? 'login-error' : undefined} /></div>
            <div className="password-label"><label className="field-label" htmlFor="password">Password</label></div>
            <div className="input-wrap"><span className="input-icon lock-icon" aria-hidden="true">▣</span><input id="password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} aria-describedby={error ? 'login-error' : undefined} /></div>
            {error && <p className="form-error" id="login-error" role="alert">{error}</p>}
            <button className="primary-button login-button" type="submit">Sign in <span aria-hidden="true">→</span></button>
          </form>
          <div className="demo-box"><span className="demo-icon">✳</span><div><span className="demo-title">JUST EXPLORING?</span><p>Use the demo account to take a look around.</p><code>student@example.com</code><code>password123</code></div></div>
          <p className="login-footnote">A simple demo sign-in. Your tasks stay on this device.</p>
        </div>
        <div className="login-bottom"><span>Thoughtfully simple, by design.</span><span>Private by default <b>·</b> Stored on your device</span></div>
      </section>
    </main>
  );
}


export default LoginPage;
