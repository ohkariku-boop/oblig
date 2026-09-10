import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

const NAV = [
  { id: 'getting-started', label: 'Getting started' },
  { id: 'who-its-for', label: 'Who it’s for' },
  { id: 'assessment', label: 'The assessment' },
  { id: 'modules', label: 'Modules' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'iso', label: 'ISO 27001' },
  { id: 'accounts', label: 'Accounts & data' },
  { id: 'glossary', label: 'Glossary' },
  { id: 'faq', label: 'FAQ' },
  { id: 'disclaimer', label: 'Disclaimer' },
];

export function DocsPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#080b16]">
      <SiteHeader active="docs" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-red">Documentation</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy dark:text-cream sm:text-4xl">
            How Oblig works
          </h1>
          <p className="mt-3 text-lg text-muted">
            Practical guidance for measuring and improving technology governance — tech risk, data, and AI —
            for APAC fintechs and those selling into regulated financial institutions.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav className="space-y-1">
              {NAV.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block rounded-md px-3 py-2 text-sm text-muted hover:bg-slate-100 hover:text-navy dark:hover:bg-slate-800 dark:hover:text-cream transition"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="max-w-3xl space-y-14 text-sm leading-relaxed text-ink">
            <Section id="getting-started" title="Getting started">
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  <strong className="text-navy dark:text-cream">Open the free assessment</strong>
                  {' '}— no account required to begin. Progress can save in your browser; sign in when you want it synced across devices.
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Work through the checklist</strong>
                  {' '}— short items across governance domains (oversight, vendors, monitoring, data, incidents, AI, and more). Mark what you already have in place.
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Read your score and gaps</strong>
                  {' '}— overall readiness, per-market coverage signals, and prioritised next steps.
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Use the Copilot and modules</strong>
                  {' '}— draft policies, explore compliance maps, track risks, and build a roadmap. Paid plans unlock more AI and collaboration features.
                </li>
              </ol>
              <p className="mt-4">
                <Link to="/app/assessment" className="font-semibold text-navy underline dark:text-cream">Start the free assessment →</Link>
              </p>
            </Section>

            <Section id="who-its-for" title="Who it’s for">
              <p>
                Oblig is a <strong className="text-navy dark:text-cream">technology governance platform</strong> for APAC fintechs
                and technology companies that need a clear view of tech risk, data handling, and AI controls.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><strong className="text-navy dark:text-cream">Fintechs</strong> that want an internal baseline for leadership or the board.</li>
                <li><strong className="text-navy dark:text-cream">Teams selling into regulated FIs</strong> — banks, insurers, payment institutions — that will face vendor questionnaires mapped to local frameworks.</li>
                <li><strong className="text-navy dark:text-cream">CIOs, CTOs, founders, and IT leads</strong> who need signal this quarter, not a six-month GRC programme.</li>
              </ul>
              <p className="mt-3">
                Oblig is <em>not</em> a payments-licensing, AML, or pure financial-product compliance tool. It focuses on
                technology, data, AI, and vendor-technology risk.
              </p>
            </Section>

            <Section id="assessment" title="The assessment">
              <p>
                The assessment is a structured checklist grounded in what APAC financial regulators and institutional buyers
                typically probe in technology and vendor risk reviews. It is self-reported: you mark items you have in place;
                Oblig scores coverage and highlights gaps.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><strong className="text-navy dark:text-cream">Time:</strong> on the order of minutes for a first pass, not a multi-week audit.</li>
                <li><strong className="text-navy dark:text-cream">Saving:</strong> anonymous progress can stay in local browser storage; signed-in users can persist assessments per client/workspace.</li>
                <li><strong className="text-navy dark:text-cream">Output:</strong> readiness percentage bands, domain breakdowns, and market-oriented coverage signals.</li>
              </ul>
              <p className="mt-3">
                Completing the assessment does not certify you against any standard or guarantee a buyer’s approval.
                It gives you a working baseline and a prioritised list of improvements.
              </p>
            </Section>

            <Section id="modules" title="Modules">
              <dl className="space-y-4">
                <Mod name="Dashboard" desc="Executive view of score, open risks, and readiness at a glance." />
                <Mod name="Governance assessment" desc="The core checklist and scoring engine." />
                <Mod name="AI Governance Copilot" desc="Conversational help for policies, prioritisation, and framework-specific questions. Uses your readiness context when signed in." />
                <Mod name="Policies" desc="Generate and refine governance documents (vendor risk, incident notification, and related topics)." />
                <Mod name="Risk register" desc="Track likelihood, impact, owners, and treatments." />
                <Mod name="Roadmap" desc="Phased plan from current posture toward a stronger maturity level." />
                <Mod name="Compliance mapping" desc="Coverage views against APAC technology/vendor and AI frameworks." />
                <Mod name="Evidence & reports" desc="Store proof and export board-oriented summaries (plan-dependent)." />
              </dl>
            </Section>

            <Section id="frameworks" title="Frameworks we map">
              <p>
                Oblig centres on <strong className="text-navy dark:text-cream">APAC financial-sector technology and AI expectations</strong> —
                the references that show up when a regulated institution assesses a fintech vendor.
                Links below point to primary regulator pages or official PDFs where a stable public URL is available.
                Instruments change; always confirm the current version on the regulator’s site.
              </p>
              <p className="mt-3 font-medium text-navy dark:text-cream">Technology & vendor risk</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-navy dark:text-cream">Singapore</strong>
                  {' — '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://www.mas.gov.sg/regulation/guidelines/technology-risk-management-guidelines" target="_blank" rel="noopener noreferrer">MAS Technology Risk Management (TRM) Guidelines</a>
                  {' · '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://www.mas.gov.sg/regulation/guidelines/guidelines-on-outsourcing" target="_blank" rel="noopener noreferrer">Guidelines on Outsourcing</a>
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Malaysia</strong>
                  {' — '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://www.bnm.gov.my/-/pd-rmit-nov25" target="_blank" rel="noopener noreferrer">BNM Risk Management in Technology (RMiT)</a>
                  {' '}
                  <span className="text-muted">(policy page; PDF linked from BNM)</span>
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Indonesia</strong>
                  {' — '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://ojk.go.id" target="_blank" rel="noopener noreferrer">OJK</a>
                  {' '}technology, cyber, and digital governance instruments (current POJK / SEOJK on ojk.go.id)
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Philippines</strong>
                  {' — '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://www.bsp.gov.ph" target="_blank" rel="noopener noreferrer">BSP</a>
                  {' '}technology and IT outsourcing circulars on bsp.gov.ph
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Cambodia</strong>
                  {' — '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://www.nbc.gov.kh" target="_blank" rel="noopener noreferrer">NBC</a>
                  {' '}technology risk guidance on nbc.gov.kh
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Vietnam</strong>
                  {' — '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://sbv.gov.vn" target="_blank" rel="noopener noreferrer">State Bank of Vietnam (SBV)</a>
                  {' '}— e.g. Circular 09/2020/TT-NHNN (IS security in banking), Circular 50/2024/TT-NHNN (online banking security). Full texts often via gazette / legal portals; start at sbv.gov.vn.
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Thailand</strong>
                  {' — '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://www.bot.or.th/content/dam/bot/fipcs/documents/FPG/2560/EngPDF/25600035.pdf" target="_blank" rel="noopener noreferrer">BOT IT Outsourcing for FIs</a>
                  {' · '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://www.bot.or.th/content/dam/bot/fipcs/documents/FPG/2561/EngPDF/25610093.pdf" target="_blank" rel="noopener noreferrer">BOT IT security (payment systems)</a>
                  {' · '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://www.bot.or.th" target="_blank" rel="noopener noreferrer">bot.or.th</a>
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Japan</strong>
                  {' — '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://www.fsa.go.jp/en/" target="_blank" rel="noopener noreferrer">FSA</a>
                  {' '}cybersecurity-related guidelines for financial institutions
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">South Korea</strong>
                  {' — '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://www.fsc.go.kr/eng" target="_blank" rel="noopener noreferrer">FSC</a>
                  {' '}and related technology / electronic financial supervision materials
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Taiwan</strong>
                  {' — '}
                  <a className="underline hover:text-navy dark:hover:text-cream" href="https://www.fsc.gov.tw" target="_blank" rel="noopener noreferrer">FSC</a>
                  {' '}outsourcing and supply-chain expectations for financial institutions
                </li>
              </ul>
              <p className="mt-3 text-muted">
                In-product scoring currently emphasises eight core markets with the deepest control maps; Vietnam and Thailand are included here and on the expansion roadmap. Official PDFs and circular numbers change — treat links as starting points.
              </p>
              <p className="mt-3 font-medium text-navy dark:text-cream">AI governance</p>
              <p className="mt-1">
                Emerging market-specific AI risk and governance guidance (for example MAS FEAT-oriented principles,
                OJK lifecycle-style expectations, and high-impact AI oversight in markets such as Korea). AI guidance moves quickly;
                Oblig monitors material tech, data, and AI updates weekly for product research.
              </p>
            </Section>

            <Section id="iso" title="ISO 27001 and Oblig">
              <p>
                ISO/IEC 27001 is a valuable <strong className="text-navy dark:text-cream">ISMS baseline</strong> (policies, suppliers, access control,
                vulnerability management, incident process). Many checklist themes overlap with ISO 27001:2022 Annex A.
              </p>
              <p className="mt-3">
                ISO does <em>not</em> define APAC-specific bars such as MAS severe-incident notification timing,
                BNM pentest or log-retention baselines, hard data-residency rules, or local AI frameworks.
                <strong className="text-navy dark:text-cream"> ISO-ready is not the same as MAS TRM or BNM RMiT questionnaire-ready.</strong>
              </p>
              <p className="mt-3">
                Use ISO evidence where it helps; close regulator-specific gaps with the Oblig checklist.
                See also the product research note on ISO crosswalk in the repository documentation.
              </p>
            </Section>

            <Section id="accounts" title="Accounts & data">
              <ul className="list-disc space-y-2 pl-5">
                <li><strong className="text-navy dark:text-cream">Without an account:</strong> assessment progress can remain in your browser only.</li>
                <li><strong className="text-navy dark:text-cream">With an account:</strong> you can sync progress, use higher Copilot limits (plan-dependent), and manage workspace settings.</li>
                <li><strong className="text-navy dark:text-cream">Password reset:</strong> available from the sign-in page; completion uses a dedicated update-password flow.</li>
                <li><strong className="text-navy dark:text-cream">Account deletion:</strong> request permanent deletion from Settings → Account (service configuration permitting).</li>
              </ul>
              <p className="mt-3">
                Details on collection and retention are in the <Link to="/privacy" className="underline">Privacy Policy</Link>.
              </p>
            </Section>

            <Section id="glossary" title="Glossary">
              <dl className="space-y-4">
                <Gloss term="APAC" def="Asia-Pacific. In Oblig, primarily eight markets: Singapore, Malaysia, Indonesia, Philippines, Cambodia, Japan, South Korea, Taiwan." />
                <Gloss term="Assessment / checklist" def="Oblig’s self-reported readiness questionnaire across technology governance domains." />
                <Gloss term="Coverage" def="Share of relevant checklist items or framework controls marked as in place for a domain or market." />
                <Gloss term="FEAT" def="Fairness, Ethics, Accountability, Transparency — principles associated with MAS AI guidance discussions." />
                <Gloss term="FI" def="Financial institution — e.g. bank, insurer, or regulated payment institution that may assess fintech vendors." />
                <Gloss term="ISMS" def="Information Security Management System — the management system certified under ISO 27001." />
                <Gloss term="Maturity" def="Banded view of how developed your governance practices are, based on assessment results." />
                <Gloss term="Outsourcing / third-party risk" def="Risk from relying on external technology or service providers; a core theme in APAC FI supervision of vendors." />
                <Gloss term="Posture" def="Your current state of technology, data, and AI governance controls and evidence." />
                <Gloss term="RMiT" def="BNM Risk Management in Technology — Malaysia’s technology risk expectations for regulated entities (and, by extension, what they ask of vendors)." />
                <Gloss term="TRM" def="Technology Risk Management — commonly refers to MAS TRM guidelines in Singapore." />
                <Gloss term="Vendor questionnaire" def="Security and governance questionnaire an FI sends to a fintech or tech supplier during due diligence." />
              </dl>
            </Section>

            <Section id="faq" title="FAQ">
              <Faq q="Do I need an account?" a="No, to try the assessment. Sign in when you want cloud save, Copilot with your readiness context, or paid features." />
              <Faq q="Is this a certification?" a="No. Oblig does not issue ISO, SOC, or regulatory certifications. It helps you measure and improve posture against APAC-oriented expectations." />
              <Faq q="Is this legal advice?" a="No. Framework mappings are informational. Confirm obligations with qualified counsel and your buyers’ actual requirements." />
              <Faq q="How is this different from ISO 27001 tools?" a="ISO is a global ISMS standard. Oblig focuses on APAC financial-sector technology, data, and AI expectations that vendor questionnaires often test beyond a generic certificate." />
              <Faq q="Which markets do you cover?" a="Eight priority markets across Southeast and Northeast Asia, with weekly research focused on tech, data, and AI governance updates — not pure payments licensing." />
            </Section>

            <Section id="disclaimer" title="Disclaimer">
              <p>
                Oblig provides software and informational mappings only. It does not provide legal, compliance, audit, or regulatory advice.
                Assessment results depend on information you enter and may be incomplete or out of date relative to a specific regulator,
                supervisor, or buyer. You remain solely responsible for your compliance decisions, disclosures to third parties, and
                verification of requirements with appropriate professionals.
              </p>
              <p className="mt-3">
                Use of Oblig is subject to our <Link to="/terms" className="underline">Terms of Service</Link> and{' '}
                <Link to="/privacy" className="underline">Privacy Policy</Link>.
              </p>
            </Section>
          </article>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-bold text-navy dark:text-cream">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function Mod({ name, desc }: { name: string; desc: string }) {
  return (
    <div>
      <dt className="font-semibold text-navy dark:text-cream">{name}</dt>
      <dd className="mt-0.5 text-muted">{desc}</dd>
    </div>
  );
}

function Gloss({ term, def }: { term: string; def: string }) {
  return (
    <div>
      <dt className="font-semibold text-navy dark:text-cream">{term}</dt>
      <dd className="mt-0.5 text-muted">{def}</dd>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-md border border-app p-4">
      <p className="font-semibold text-navy dark:text-cream">{q}</p>
      <p className="mt-1 text-muted">{a}</p>
    </div>
  );
}
