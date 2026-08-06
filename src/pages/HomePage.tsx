import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Sparkles, ArrowRight, Play, CheckCircle2, BarChart3,
  FileText, ShieldAlert, Network, Brain, Zap, TrendingUp, Users, Lock,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { DemoModal } from '@/components/DemoModal';
import { useTheme } from '@/theme';
import { Moon, Sun } from 'lucide-react';

export function HomePage() {
  const { theme, toggle } = useTheme();
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#080b16]">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-app glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">Pricing</Link>
            <a href="#modules" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">Modules</a>
            <a href="#how" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">How it works</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggle} className="btn-ghost !p-2" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/app" className="btn-secondary hidden sm:inline-flex">Sign in</Link>
            <Link to="/app/assessment" className="btn-primary">
              Start Free Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -top-32 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-navy-200/40 to-red-200/30 blur-3xl dark:from-navy-800/30 dark:to-red-900/20" />
        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-app surface px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-soft">
              <CheckCircle2 className="h-4 w-4 text-success-500" />
              Free 5-Minute Governance Assessment
            </span>
            <h1 className="mt-6 text-4xl font-grotesk font-bold tracking-tight text-navy dark:text-cream sm:text-5xl lg:text-6xl text-balance">
              Build Better IT Governance <span className="text-red">with AI</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted text-balance">
              Assess your governance maturity, identify risks, generate policies and build a practical governance roadmap — before investing in expensive consultants or compliance programmes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/app/assessment" className="btn-primary px-6 py-3 text-base">
                Start Free Assessment <ArrowRight className="h-4 w-4" />
              </Link>
              <button onClick={() => setDemoOpen(true)} className="btn-secondary px-6 py-3 text-base">
                <Play className="h-4 w-4" /> Watch Interactive Demo
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4 text-red" /> 5 Minutes</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-red" /> Industry Best Practices</span>
            </div>
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-16 max-w-5xl"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-app surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: '6', label: 'Governance domains assessed' },
            { value: '24', label: 'Questions in 5 minutes' },
            { value: '10+', label: 'Policy templates, AI-generated' },
            { value: '7', label: 'Compliance frameworks mapped' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{s.value}</div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            One platform, before you need a consultant
          </h2>
          <p className="mt-4 text-lg text-muted">
            Oblig turns scattered governance guesswork into a clear, measured programme your leadership can trust.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: BarChart3, title: 'Measure governance maturity', body: 'A 5-minute assessment scores you across six domains and shows exactly where you stand.' },
            { icon: Brain, title: 'AI governance copilot', body: 'Ask how to improve, generate policies, and get prioritised recommendations in plain language.' },
            { icon: FileText, title: 'Generate policies instantly', body: 'Production-ready security, password and incident response policies — editable and exportable.' },
            { icon: ShieldAlert, title: 'Track real risks', body: 'A proper risk register with likelihood, impact, owners and a heat map.' },
            { icon: Network, title: 'Map to frameworks', body: 'See coverage against ISO 27001, SOC 2, NIST CSF, COBIT, CIS, PDPA and GDPR.' },
            { icon: TrendingUp, title: 'A roadmap that makes sense', body: 'A phased plan from where you are today to the maturity level you need next.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card p-6 hover:shadow-card transition-shadow"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-paper text-navy dark:bg-[#16223d] dark:text-cream">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="border-y border-app surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Every module your governance programme needs</h2>
            <p className="mt-4 text-lg text-muted">Start with an assessment. Expand into a full governance platform as you grow.</p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BarChart3, name: 'Dashboard', desc: 'Executive overview of score, risks and readiness.' },
              { icon: ShieldCheck, name: 'Governance Assessment', desc: 'Score maturity across six domains in minutes.' },
              { icon: Sparkles, name: 'AI Governance Copilot', desc: 'Conversational guidance and policy generation.' },
              { icon: FileText, name: 'AI Policy Generator', desc: 'Generate, edit and export governance documents.' },
              { icon: ShieldAlert, name: 'Risk Register', desc: 'Identify, score and mitigate your risks.' },
              { icon: TrendingUp, name: 'Governance Roadmap', desc: 'A phased path to your target maturity.' },
              { icon: Network, name: 'Compliance Mapping', desc: 'Coverage across seven major frameworks.' },
              { icon: Lock, name: 'Evidence Library', desc: 'A searchable home for all your proof.' },
              { icon: FileText, name: 'Reports', desc: 'Board-ready reports in a click.' },
            ].map(m => (
              <div key={m.name} className="flex items-start gap-4 rounded-2xl border border-app surface p-5 hover:border-primary-300 dark:hover:border-primary-700 transition">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-paper text-navy dark:bg-[#16223d] dark:text-cream">
                  <m.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">From uncertainty to a plan in one sitting</h2>
            <p className="mt-4 text-lg text-muted">No consultants, no spreadsheets, no jargon. Oblig meets you where you are and walks you forward.</p>
            <ol className="mt-8 space-y-6">
              {[
                { title: 'Take the free assessment', body: 'Answer 24 questions across six governance domains. It takes about five minutes and auto-saves.' },
                { title: 'See your score and gaps', body: 'Get a maturity level, a radar chart of strengths and weaknesses, and clear recommendations.' },
                { title: 'Generate what you need with AI', body: 'Use the Copilot to draft policies, prioritise actions, and prepare for the frameworks you care about.' },
                { title: 'Track progress over time', body: 'Re-assess, monitor risks, and watch your governance score climb quarter over quarter.' },
              ].map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">{i + 1}</div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to="/app/assessment" className="btn-primary mt-8 px-6 py-3 text-base">
              Start your free assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-3xl border border-app surface p-8 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink">Governance Score</p>
                <p className="font-grotesk text-4xl font-bold text-navy dark:text-cream">62<span className="text-lg text-ink">/100</span></p>
              </div>
              <span className="badge-success"><TrendingUp className="h-3.5 w-3.5" /> +24 in 6 mo</span>
            </div>
            <div className="mt-6 space-y-3">
              {[
                { name: 'Strategy & Leadership', v: 65, c: '#1b2a4a' },
                { name: 'Information Security', v: 72, c: '#22c55e' },
                { name: 'Risk Management', v: 48, c: '#f59e0b' },
                { name: 'Asset & Data Management', v: 41, c: '#c4392e' },
                { name: 'People & Awareness', v: 58, c: '#6a7993' },
              ].map(r => (
                <div key={r.name}>
                  <div className="flex justify-between text-xs"><span className="text-navy dark:text-cream">{r.name}</span><span className="font-semibold text-navy dark:text-cream">{r.v}%</span></div>
                  <div className="mt-1 h-2 rounded-sm bg-line">
                    <div className="h-full rounded-sm" style={{ width: `${r.v}%`, background: r.c }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-sm bg-paper dark:bg-[#16223d]/50 p-4">
              <p className="mono-label">AI Recommendation</p>
              <p className="mt-1 text-sm text-navy dark:text-cream">Add an Asset Register to lift your weakest domain from 41% — high impact, low effort.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-app">
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-red" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Start governing smarter today</h2>
          <Link to="/app/assessment" className="mt-8 inline-flex items-center gap-2 rounded-md bg-cream px-6 py-3 text-base font-semibold text-navy shadow-lg hover:bg-paper transition">
            Start Free Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-app surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Logo />
            <p className="text-sm text-muted">AI Governance Copilot for growing businesses.</p>
            <div className="flex items-center gap-6 text-sm text-muted">
              <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition">Platform</a>
              <a href="#modules" className="hover:text-slate-900 dark:hover:text-white transition">Modules</a>
              <Link to="/app" className="hover:text-slate-900 dark:hover:text-white transition">Dashboard</Link>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-muted">© {new Date().getFullYear()} Oblig. Built for founders, CIOs, CTOs and IT managers.</p>
        </div>
      </footer>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="rounded-md border border-app surface-elev p-2 shadow-card">
      <div className="rounded-md bg-paper dark:bg-navy-900/60 p-6">
        <div className="flex items-center justify-between border-b border-app pb-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red" />
            <div className="h-3 w-3 rounded-full bg-warning-400" />
            <div className="h-3 w-3 rounded-full bg-success-500" />
          </div>
          <span className="text-xs text-ink">oblig.app/dashboard</span>
        </div>
        <div className="grid gap-4 py-5 sm:grid-cols-3">
          <div className="rounded-sm border border-app surface p-4">
            <p className="text-xs text-ink">Governance Score</p>
            <p className="mt-1 font-grotesk text-3xl font-bold text-navy dark:text-cream">62</p>
            <div className="mt-2 h-1.5 rounded-sm bg-line"><div className="h-full w-[62%] rounded-sm bg-navy" /></div>
          </div>
          <div className="rounded-sm border border-app surface p-4">
            <p className="text-xs text-ink">Maturity Level</p>
            <p className="mt-1 font-grotesk text-3xl font-bold text-red">3</p>
            <p className="mt-1 text-xs text-ink">Defined</p>
          </div>
          <div className="rounded-sm border border-app surface p-4">
            <p className="text-xs text-ink">Open Risks</p>
            <p className="mt-1 font-grotesk text-3xl font-bold text-warning-600">4</p>
            <p className="mt-1 text-xs text-ink">2 high priority</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-sm border border-app surface p-4">
            <p className="mono-label">CATEGORY SCORES</p>
            <div className="mt-3 space-y-2">
              {[72, 65, 58, 48, 41].map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-sm bg-line"><div className="h-full rounded-sm bg-navy" style={{ width: `${v}%` }} /></div>
                  <span className="w-8 text-right text-xs font-semibold text-navy dark:text-cream">{v}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-sm border border-app surface p-4">
            <p className="mono-label">AI RECOMMENDATIONS</p>
            <div className="mt-3 space-y-2">
              {['Create a Password Policy', 'Add an Asset Register', 'Test your backups quarterly'].map(t => (
                <div key={t} className="flex items-center gap-2 rounded-sm bg-paper dark:bg-[#16223d]/50 px-3 py-2 text-xs text-navy dark:text-cream">
                  <Sparkles className="h-3.5 w-3.5 text-red shrink-0" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
