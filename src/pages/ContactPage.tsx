import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

const CONTACT_EMAIL = 'oblig.me@tutamail.com';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General enquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = [
      name && `Name: ${name}`,
      email && `From: ${email}`,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n');
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`[Oblig] ${subject}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#080b16]">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-red">Contact</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy dark:text-cream sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-3 text-lg text-muted">
          Questions about Oblig, enterprise trials, or partnerships — we read every message.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="rounded-md border border-app surface p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-paper text-navy dark:bg-navy-800 dark:text-cream">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-semibold text-navy dark:text-cream">Email</h2>
            <p className="mt-1 text-sm text-muted">Best for demos, billing, and privacy requests.</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-flex text-sm font-semibold text-navy underline dark:text-cream"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="rounded-md border border-app surface p-6">
            <h2 className="font-semibold text-navy dark:text-cream">What to include</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Company and role (optional)</li>
              <li>Markets you care about (e.g. SG, MY)</li>
              <li>Whether you need a demo or support</li>
            </ul>
            <p className="mt-4 text-sm text-muted">
              See also{' '}
              <Link to="/docs" className="underline text-navy dark:text-cream">Docs</Link>
              {' · '}
              <Link to="/pricing" className="underline text-navy dark:text-cream">Pricing</Link>
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-10 space-y-4 rounded-md border border-app surface p-6">
          <h2 className="font-semibold text-navy dark:text-cream">Send a message</h2>
          <p className="text-sm text-muted">
            Opens your email client with a pre-filled message to {CONTACT_EMAIL}. No data is stored on our servers from this form.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-muted">Name</span>
              <input
                className="input mt-1 w-full"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted">Your email</span>
              <input
                type="email"
                className="input mt-1 w-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="text-muted">Subject</span>
            <select
              className="input mt-1 w-full"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            >
              <option>General enquiry</option>
              <option>Enterprise demo</option>
              <option>Pricing & plans</option>
              <option>Partnership</option>
              <option>Privacy or account</option>
              <option>Support</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-muted">Message</span>
            <textarea
              className="input mt-1 min-h-[120px] w-full"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="How can we help?"
              required
            />
          </label>
          <button type="submit" className="btn-primary">
            Open email to send <ArrowRight className="h-4 w-4" />
          </button>
          {sent && (
            <p className="flex items-center gap-2 text-sm text-success-600">
              <CheckCircle2 className="h-4 w-4" />
              If your mail app did not open, email us directly at {CONTACT_EMAIL}.
            </p>
          )}
        </form>
      </div>
      <SiteFooter />
    </div>
  );
}
