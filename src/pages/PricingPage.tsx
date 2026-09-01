import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Sparkles, Building2, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/theme';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/utils/cn';

type Billing = 'monthly' | 'annual';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    icon: ShieldCheck,
    tagline: 'Get your governance baseline',
    monthly: 0,
    annual: 0,
    cta: 'Start free assessment',
    href: '/app/assessment',
    highlight: false,
    features: [
      'Full governance assessment (7 domains, 30+ items)',
      'Maturity score & radar chart',
      'Branded PDF export of your scorecard',
      'Local progress saving in your browser',
      'Risk register (up to 5 risks)',
      'AI Copilot — 10 messages / month',
    ],
    missing: [
      'AI policy generation',
      'Compliance framework mapping',
      'Evidence library',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Sparkles,
    tagline: 'For teams building a real programme',
    monthly: 49,
    annual: 39,
    cta: 'Start 14-day trial',
    href: '/login',
    highlight: true,
    features: [
      'Everything in Starter, plus:',
      'Unlimited assessments & history tracking',
      'AI policy generation (10+ templates)',
      'Unlimited AI Copilot messages',
      'Full risk register with heat maps',
      'Compliance mapping (MAS, BNM, OJK, BSP, NBC, FSA, FSC — 8 APAC markets)',
      'Governance roadmap builder',
      'Evidence library (1 GB storage)',
      'Board-ready report exports',
      'Up to 5 team members',
    ],
    missing: [],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Building2,
    tagline: 'Advanced controls & support',
    monthly: 199,
    annual: 169,
    cta: 'Book a demo',
    href: 'mailto:oblig.me@tutamail.com?subject=Enterprise%20demo%20request',
    highlight: false,
    features: [
      'Everything in Professional, plus:',
      'Unlimited team members & roles',
      'SSO / SAML authentication',
      'Custom compliance frameworks',
      'Advanced evidence workflows (50 GB storage)',
      'Audit trail & activity logging',
      'Dedicated onboarding session',
      'Priority email & chat support',
      'Custom branding on PDFs & reports',
      'SLA & data processing agreement',
    ],
    missing: [],
  },
];

const FAQ = [
  { q: 'Can I switch plans or cancel anytime?', a: 'Yes. You can upgrade, downgrade or cancel from Settings at any time. Changes take effect at the next billing cycle.' },
  { q: 'Is the free Starter plan really free forever?', a: 'Yes. The Starter plan never expires and does not require a credit card. You get the full assessment, a maturity score and a branded PDF.' },
  { q: 'How does the 14-day trial work?', a: 'Professional and Enterprise plans include a 14-day trial with full access. No card required to start. You only pay if you continue after the trial.' },
  { q: 'Do you offer discounts for non-profits or startups?', a: 'Yes — eligible non-profits and early-stage startups (under 10 employees) get 50% off Professional. Contact us from Settings to apply.' },
  { q: 'Is my assessment data secure?', a: 'All data is encrypted in transit and at rest. Starter plan data stays in your browser; Professional and Enterprise plans store data in an encrypted, access-controlled database.' },
];

export function PricingPage() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-cream dark:bg-[#0a0f1e]">
      <header className="sticky top-0 z-40 border-b border-app glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/"><Logo /></Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-sm font-medium text-ink hover:text-navy dark:hover:text-cream transition">Home</Link>
            <Link to="/pricing" className="text-sm font-medium text-navy dark:text-cream">Pricing</Link>
            <Link to="/#features" className="text-sm font-medium text-ink hover:text-navy dark:hover:text-cream transition">Platform</Link>
            <Link to="/#modules" className="text-sm font-medium text-ink hover:text-navy dark:hover:text-cream transition">Modules</Link>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggle} className="btn-ghost !p-2" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/login" className="btn-secondary hidden sm:inline-flex">Sign in</Link>
            <Link to="/app/assessment" className="btn-primary">Start Free Assessment</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -top-24 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-gradient-to-br from-navy-200/40 to-red-200/30 blur-3xl dark:from-navy-800/30 dark:to-red-900/20" />
        <div className="relative mx-auto max-w-3xl px-4 pt-20 pb-12 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-app surface px-4 py-1.5 text-sm font-medium text-ink shadow-soft">
            <Sparkles className="h-4 w-4 text-red" /> Simple, transparent pricing
          </span>
          <h1 className="mt-6 text-4xl font-grotesk font-bold tracking-tight text-navy dark:text-cream sm:text-5xl text-balance">
            Plans that scale with your governance programme
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink">
            Start free. Upgrade when you need AI policy generation, compliance mapping and team collaboration.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={cn(
                'relative flex flex-col rounded-md border bg-paper p-6 dark:bg-navy-900/40',
                plan.highlight
                  ? 'border-navy shadow-glow lg:scale-[1.03]'
                  : 'border-app',
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-red px-3 py-1 text-xs font-bold uppercase tracking-wider text-cream">
                  Most popular
                </span>
              )}
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-md',
                  plan.highlight ? 'bg-navy text-cream' : 'bg-paper text-navy dark:bg-navy-800 dark:text-cream',
                )}>
                  <plan.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-grotesk text-lg font-semibold text-navy dark:text-cream">{plan.name}</h3>
                  <p className="text-xs text-ink">{plan.tagline}</p>
                </div>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-grotesk text-4xl font-bold text-navy dark:text-cream">
                  ${plan.monthly === 0 ? '0' : plan.monthly}
                </span>
                <span className="text-sm text-ink">/month</span>
              </div>
              {plan.annual > 0 && (
                <p className="mt-1 text-xs text-success-600">
                  ${plan.annual}/mo billed annually — save 20%
                </p>
              )}
              {plan.monthly === 0 && <p className="mt-1 text-xs text-ink">Free forever, no card required</p>}

              {plan.href.startsWith('mailto:') ? (
                <a href={plan.href} className={cn('mt-5 w-full', plan.highlight ? 'btn-primary' : 'btn-secondary')}>
                  {plan.cta} <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <Link to={plan.href} className={cn('mt-5 w-full', plan.highlight ? 'btn-primary' : 'btn-secondary')}>
                  {plan.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-navy dark:text-cream">
                    <Check className={cn('mt-0.5 h-4 w-4 shrink-0', plan.highlight ? 'text-red' : 'text-success-500')} />
                    <span>{f}</span>
                  </li>
                ))}
                {plan.missing.map((f, idx) => (
                  <li key={`m-${idx}`} className="flex items-start gap-2.5 text-sm text-ink/60">
                    <X className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="line-through">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-md border border-app bg-paper p-6 text-center dark:bg-navy-900/40">
          <p className="text-sm text-ink">
            All plans include the full governance assessment. Annual billing saves 20%. Prices in USD.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="text-center font-grotesk text-2xl font-bold text-navy dark:text-cream">Frequently asked questions</h2>
        <div className="mt-8 space-y-4">
          {FAQ.map((item, i) => (
            <div key={i} className="rounded-md border border-app bg-paper p-5 dark:bg-navy-900/40">
              <h3 className="font-semibold text-navy dark:text-cream">{item.q}</h3>
              <p className="mt-2 text-sm text-ink">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-app">
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-red" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-cream">Ready to start?</h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">Take the free 5-minute assessment and see exactly where your governance stands today.</p>
          <Link to="/app/assessment" className="mt-6 inline-flex items-center gap-2 rounded-md bg-cream px-6 py-3 text-base font-semibold text-navy shadow-lg hover:bg-paper transition">
            Start Free Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-app surface">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link to="/"><Logo /></Link>
            <p className="text-sm text-ink">© {new Date().getFullYear()} Oblig. Built for founders, CIOs, CTOs and IT managers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
