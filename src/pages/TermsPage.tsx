import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#080b16]">
      <header className="border-b border-app px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/"><Logo /></Link>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-navy dark:text-cream">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted">Last updated {new Date().toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-slate dark:prose-invert mt-8 max-w-none space-y-6 text-sm leading-relaxed text-ink">
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">1. What Oblig is</h2>
            <p>Oblig is a self-assessment and governance-tracking tool for fintech and technology companies preparing to sell into regulated financial institutions across Singapore, Malaysia, Indonesia, the Philippines, Cambodia, Japan, South Korea and Taiwan.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">2. Not legal or regulatory advice</h2>
            <p>Oblig maps your self-reported answers against publicly available regulatory guidance. It does not constitute legal, compliance, or regulatory advice, and using it does not guarantee approval by any regulator or institutional buyer. You remain responsible for verifying your actual compliance obligations with qualified counsel.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">3. Your account</h2>
            <p>You're responsible for keeping your login credentials secure and for the accuracy of the information you enter. You may delete your account and associated data at any time from Settings.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">4. Acceptable use</h2>
            <p>Don't use Oblig to misrepresent your governance posture to a third party, attempt to access another user's data, or reverse-engineer the service.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">5. No warranty</h2>
            <p>Oblig is provided "as is." We don't warrant that assessment results are complete, error-free, or sufficient for any specific regulator's or buyer's requirements.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">6. Changes</h2>
            <p>These terms may be updated as the product evolves. Material changes will be reflected here with an updated date.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">7. Contact</h2>
            <p>Questions about these terms can be sent through the contact details on our homepage.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
