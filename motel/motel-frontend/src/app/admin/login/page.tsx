"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, Home, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@mareahouse.com');
  const [password, setPassword] = useState('marea2026');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/admin/dashboard');
    }, 600);
  };

  const handleDemoFill = () => {
    setEmail('admin@mareahouse.com');
    setPassword('marea2026');
  };

  return (
    <div className="split-login-wrap">
      {/* Left Column: Visual Hero Banner */}
      <div className="split-login-hero">
        <div className="hero-overlay-gradient"></div>
        <div className="hero-content-box">
          <div className="hero-top-row">
            <Link href="/" className="monogram hero-monogram" aria-label="Marea House Home">
              M<span>H</span>
            </Link>
            <span className="hero-system-badge">
              <span className="live-dot"></span> System Online
            </span>
          </div>

          <div className="hero-text-block">
            <span className="hero-eyebrow">
              <Sparkles size={14} /> Management & Hospitality Portal
            </span>
            <h1 className="hero-title">Unrushed stays.<br />Seamless operations.</h1>
            <p className="hero-desc">
              Centralized CMS control center for Marea House boutique motel. Manage reservations, guest experiences, and marketing content.
            </p>

            <ul className="hero-features-list">
              <li>
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Real-time suite inventory & pricing controls</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Instant reservation engine & guest messaging</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Occupancy analytics & financial reporting</span>
              </li>
            </ul>
          </div>

          <div className="hero-bottom-quote">
            <p className="quote-phrase">
              “A little closer to the ocean. A little further from the everyday.”
            </p>
            <div className="hero-status-tag">
              <Compass size={14} /> Marea House Coastal Sanctuary · Sydney, AU
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form Panel */}
      <div className="split-login-form-side">
        <div className="login-form-container">
          <div className="form-header">
            <span className="admin-badge">Management Portal</span>
            <h2>Sign in to CMS</h2>
            <p>Enter your verified management credentials below.</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-input-group">
              <label htmlFor="admin-email">Email Address</label>
              <div className="admin-input-field">
                <Mail size={18} className="input-icon" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mareahouse.com"
                />
              </div>
            </div>

            <div className="admin-input-group">
              <div className="label-row">
                <label htmlFor="admin-password">Password</label>
                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => alert('Demo Mode: Password reset link sent to admin@mareahouse.com')}
                >
                  Forgot password?
                </button>
              </div>
              <div className="admin-input-field">
                <Lock size={18} className="input-icon" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="admin-options">
              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember session on this device</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="admin-submit-btn">
              {loading ? 'Authenticating…' : 'Access CMS Portal'}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Demo Helper Card */}
          <div className="admin-demo-box">
            <div className="demo-header">
              <ShieldCheck size={16} />
              <span>Demo Access Enabled</span>
            </div>
            <p>Click below to pre-fill test administrator credentials.</p>
            <button type="button" onClick={handleDemoFill} className="demo-fill-btn">
              Autofill Demo Credentials
            </button>
          </div>

          <div className="admin-footer-link">
            <Link href="/">
              <Home size={14} /> Back to Marea House Guest Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

