import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-app surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/"><Logo /></Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Technology governance for APAC fintechs — tech risk, data, and AI posture you can measure and improve.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy dark:text-cream">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><Link to="/#features" className="hover:text-navy dark:hover:text-cream transition">Platform</Link></li>
              <li><Link to="/#modules" className="hover:text-navy dark:hover:text-cream transition">Modules</Link></li>
              <li><Link to="/pricing" className="hover:text-navy dark:hover:text-cream transition">Pricing</Link></li>
              <li><Link to="/app/assessment" className="hover:text-navy dark:hover:text-cream transition">Free assessment</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy dark:text-cream">Docs</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><Link to="/docs" className="hover:text-navy dark:hover:text-cream transition">Documentation</Link></li>
              <li><Link to="/docs#getting-started" className="hover:text-navy dark:hover:text-cream transition">Getting started</Link></li>
              <li><Link to="/docs#glossary" className="hover:text-navy dark:hover:text-cream transition">Glossary</Link></li>
              <li><Link to="/docs#frameworks" className="hover:text-navy dark:hover:text-cream transition">Frameworks</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy dark:text-cream">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><Link to="/terms" className="hover:text-navy dark:hover:text-cream transition">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-navy dark:hover:text-cream transition">Privacy Policy</Link></li>
              <li><Link to="/docs#disclaimer" className="hover:text-navy dark:hover:text-cream transition">Disclaimer</Link></li>
              <li><Link to="/contact" className="hover:text-navy dark:hover:text-cream transition">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-app pt-6 sm:flex-row">
          <p className="text-xs text-muted">© {year} Oblig. Built for founders, CIOs, CTOs and IT managers.</p>
          <p className="text-xs text-muted">Not legal or regulatory advice.</p>
        </div>
      </div>
    </footer>
  );
}
