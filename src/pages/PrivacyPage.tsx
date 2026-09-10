import { Link } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export function PrivacyPage() {
  const updated = new Date().toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-white dark:bg-[#080b16]">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-navy dark:text-cream">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated {updated}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink">
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">1. Introduction</h2>
            <p className="mt-2">
              This Privacy Policy explains how Oblig collects, uses, and shares information when you use our websites and
              applications (the “Service”). We aim to collect only what we need to operate and improve Oblig.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">2. Information we collect</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-navy dark:text-cream">Account data</strong> — email address and authentication data when you register.
              </li>
              <li>
                <strong className="text-navy dark:text-cream">Governance content you enter</strong> — assessment answers, risk entries,
                policy drafts, and similar records you choose to save.
              </li>
              <li>
                <strong className="text-navy dark:text-cream">Usage and diagnostics</strong> — approximate technical logs (for example
                path, user agent) and optional error reports to keep the Service reliable.
              </li>
              <li>
                <strong className="text-navy dark:text-cream">Communications</strong> — messages you send us (for example support email).
              </li>
            </ul>
            <p className="mt-3">
              If you use Oblig without an account, assessment progress may remain only in your browser’s local storage and
              is not sent to our servers until you sign in and sync.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">3. How we use information</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Provide, secure, and improve the Service</li>
              <li>Authenticate users and enforce plan limits (including AI Copilot usage)</li>
              <li>Generate scores, recommendations, and AI-assisted drafts you request</li>
              <li>Respond to support requests and important service notices</li>
              <li>Comply with law and protect against abuse or security incidents</li>
            </ul>
            <p className="mt-3">We do not sell your personal data. We do not use your assessment content for third-party advertising.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">4. Processors and subprocessors</h2>
            <p className="mt-2">
              We use infrastructure and service providers to host databases, authentication, and (where enabled) AI model
              inference. Typical categories include cloud hosting, authentication/database providers, and AI API providers.
              Those providers process data only to deliver their services to us under contractual obligations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">5. AI features</h2>
            <p className="mt-2">
              When you use the Copilot or similar features, the prompts and limited readiness context you send may be
              processed by third-party model providers to generate a response. Avoid pasting secrets, passwords, or
              unnecessary personal data into AI prompts.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">6. Retention</h2>
            <p className="mt-2">
              We retain account and workspace data while your account is active and for a reasonable period afterward as
              needed for backups, dispute resolution, and legal obligations. You may request deletion of your account;
              we will delete or anonymise associated personal data within a reasonable time, except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">7. Your choices</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Access or update account email via product settings where available</li>
              <li>Export or copy data you entered by using product export features where available, or by contacting us</li>
              <li>Delete your account from Settings → Account, or by emailing us if the self-serve flow is unavailable</li>
              <li>Stop using the Service and clear local browser storage for anonymous progress</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">8. Security</h2>
            <p className="mt-2">
              We implement administrative and technical measures appropriate to the nature of the Service, including encrypted
              transport and access-controlled databases for account-backed data. No method of transmission or storage is
              completely secure; we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">9. International transfers</h2>
            <p className="mt-2">
              Data may be processed in countries where we or our providers operate. Where required, we use appropriate
              safeguards for cross-border transfers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">10. Children</h2>
            <p className="mt-2">The Service is directed at business users and is not intended for children under 16.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">11. Changes</h2>
            <p className="mt-2">
              We may update this Policy from time to time. The “Last updated” date will change when we do. Material changes
              may be highlighted in the product or by email where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">12. Contact</h2>
            <p className="mt-2">
              Privacy questions:{' '}
              <a href="mailto:oblig.me@tutamail.com" className="underline">oblig.me@tutamail.com</a>.
              Related:{' '}
              <Link to="/terms" className="underline">Terms of Service</Link>
              {' · '}
              <Link to="/docs" className="underline">Documentation</Link>.
            </p>
          </section>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
