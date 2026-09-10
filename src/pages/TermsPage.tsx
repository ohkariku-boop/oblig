import { Link } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export function TermsPage() {
  const updated = new Date().toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-white dark:bg-[#080b16]">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-navy dark:text-cream">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted">Last updated {updated}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink">
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">1. Agreement</h2>
            <p className="mt-2">
              These Terms of Service (“Terms”) govern your access to and use of Oblig’s websites, applications, and related
              services (the “Service”). By accessing or using the Service, you agree to these Terms. If you use the Service
              on behalf of an organisation, you represent that you have authority to bind that organisation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">2. What Oblig is</h2>
            <p className="mt-2">
              Oblig is a technology governance product for fintechs and technology companies. It helps you assess and track
              technology risk, data, and AI-related posture with reference to expectations commonly associated with APAC
              financial-sector frameworks, and to prepare for internal governance needs or vendor due diligence by regulated
              institutions. Oblig is not a payments-licensing, AML, or pure financial-product compliance service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">3. Not legal or regulatory advice</h2>
            <p className="mt-2">
              Content, scores, mappings, policies, and Copilot outputs are informational only. They do not constitute legal,
              compliance, audit, or regulatory advice. Using Oblig does not guarantee approval by any regulator, supervisor,
              or institutional buyer. You are solely responsible for verifying obligations with qualified professionals and
              for any representations you make to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">4. Accounts</h2>
            <p className="mt-2">
              You must provide accurate registration information and keep credentials confidential. You are responsible for
              activity under your account. Notify us promptly of unauthorised use. We may suspend or terminate accounts that
              violate these Terms or present security or abuse risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">5. Acceptable use</h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Misrepresent assessment results or governance posture to deceive a third party</li>
              <li>Attempt to access another user’s data or probe the Service without authorisation</li>
              <li>Reverse engineer, scrape at abusive volume, or disrupt the Service</li>
              <li>Use the Service for unlawful purposes or to generate content that is harmful or infringing</li>
              <li>Circumvent plan limits, authentication, or usage controls</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">6. Plans, trials, and payment</h2>
            <p className="mt-2">
              Free and paid features are described on the pricing page and may change. Trials, if offered, convert to paid
              access only if you continue after the trial on the terms presented at signup. Fees are non-refundable except
              where required by law or explicitly stated. Taxes may apply.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">7. Intellectual property</h2>
            <p className="mt-2">
              Oblig and its licensors own the Service, branding, software, and documentation. You retain ownership of content
              you submit. You grant us a limited licence to host and process that content solely to provide the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">8. AI features</h2>
            <p className="mt-2">
              AI-assisted features may generate draft text or suggestions. Outputs can be incorrect or incomplete. Review
              them before use. Do not submit secrets or personal data you are not allowed to process through third-party model providers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">9. Disclaimer of warranties</h2>
            <p className="mt-2">
              THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT
              RESULTS ARE COMPLETE, ACCURATE, OR SUFFICIENT FOR ANY REGULATOR OR BUYER.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">10. Limitation of liability</h2>
            <p className="mt-2">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, OBLIG AND ITS SUPPLIERS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, OR DATA. OUR TOTAL LIABILITY FOR
              CLAIMS RELATING TO THE SERVICE WILL NOT EXCEED THE AMOUNTS YOU PAID US FOR THE SERVICE IN THE TWELVE MONTHS
              BEFORE THE CLAIM (OR ONE HUNDRED US DOLLARS IF YOU HAVE NOT PAID).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">11. Termination</h2>
            <p className="mt-2">
              You may stop using the Service at any time and may request account deletion as described in the product and
              Privacy Policy. We may suspend or terminate access for breach of these Terms or to protect the Service and users.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">12. Changes</h2>
            <p className="mt-2">
              We may update these Terms from time to time. The “Last updated” date will change when we do. Continued use after
              changes become effective constitutes acceptance of the revised Terms where permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">13. Contact</h2>
            <p className="mt-2">
              Questions about these Terms:{' '}
              <a href="mailto:oblig.me@tutamail.com" className="underline">oblig.me@tutamail.com</a>.
              See also our <Link to="/docs" className="underline">Documentation</Link> and{' '}
              <Link to="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </section>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
