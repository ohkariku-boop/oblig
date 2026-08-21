import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#080b16]">
      <header className="border-b border-app px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/"><Logo /></Link>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-navy dark:text-cream">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated {new Date().toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-slate dark:prose-invert mt-8 max-w-none space-y-6 text-sm leading-relaxed text-ink">
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">1. What we collect</h2>
            <p>If you create an account: your email address, and the governance/vendor-risk assessment answers, risk register entries, and related records you choose to enter. If you don't create an account, your assessment answers stay in your browser's local storage only and are never sent to us.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">2. How we use it</h2>
            <p>Solely to run the product: to save your assessment progress, compute your governance scores, and let you return to your data across sessions. We do not sell your data or share it with third parties for marketing purposes.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">3. Where it's stored</h2>
            <p>Account data is stored with Supabase, a hosted Postgres provider, and protected with row-level security so only you can access your own records.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">4. Your rights</h2>
            <p>You can request a copy of your data or delete your account at any time. Deleting your account permanently removes your stored assessment, risk, and policy data.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">5. Cookies</h2>
            <p>We use local storage to keep you signed in and to remember your theme preference. We don't use third-party advertising or tracking cookies.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy dark:text-cream">6. Contact</h2>
            <p>Questions about this policy can be sent through the contact details on our homepage.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
