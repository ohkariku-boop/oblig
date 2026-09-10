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
  { id: 'mas-trm', label: 'MAS TRM (deep dive)' },
  { id: 'bnm-rmit', label: 'BNM RMiT (deep dive)' },
  { id: 'vietnam-thailand', label: 'Vietnam & Thailand' },
  { id: 'apac-emea', label: 'APAC vs EMEA' },
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
                Oblig covers ten APAC markets. Control maps are deepest for the original eight; Vietnam and Thailand are included in documentation and expanding in-product. Official PDFs and circular numbers change — treat links as starting points.
              </p>
              <p className="mt-3 font-medium text-navy dark:text-cream">AI governance</p>
              <p className="mt-1">
                Emerging market-specific AI risk and governance guidance (for example MAS FEAT-oriented principles,
                OJK lifecycle-style expectations, and high-impact AI oversight in markets such as Korea). AI guidance moves quickly;
                Oblig monitors material tech, data, and AI updates weekly for product research.
              </p>
            </Section>

            <Section id="mas-trm" title="Deep dive: MAS Technology Risk Management (TRM)">
              <p>
                <strong className="text-navy dark:text-cream">Instrument:</strong>{' '}
                <a className="underline" href="https://www.mas.gov.sg/regulation/guidelines/technology-risk-management-guidelines" target="_blank" rel="noopener noreferrer">MAS Technology Risk Management Guidelines</a>
                {' '}(current major revision: <strong>January 2021</strong>). Status: <em>guidelines</em> — not a statute — but MAS expects proportionate implementation and uses them in supervision. They sit beside binding notices (e.g. cyber hygiene, technology risk notices for certain entities) and outsourcing rules.
              </p>
              <p className="mt-3">
                <strong className="text-navy dark:text-cream">Who they bind in practice:</strong> MAS-regulated financial institutions. Fintech <em>vendors</em> feel TRM because banks and other FIs must oversee third parties to a standard consistent with their own technology risk framework — so vendor questionnaires recycle TRM themes.
              </p>
              <p className="mt-3 font-medium text-navy dark:text-cream">What the 2021 guidelines emphasise</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li><strong className="text-navy dark:text-cream">Board and senior management oversight</strong> — technology risk culture, risk appetite, members who understand cyber/tech risk; appointment of appropriately skilled CIO/CISO (or equivalent) roles.</li>
                <li><strong className="text-navy dark:text-cream">Technology risk management framework</strong> — policies, standards, procedures; independent technology risk function; ongoing identification and treatment of tech risk.</li>
                <li><strong className="text-navy dark:text-cream">Third-party service providers</strong> — assessment of arrangements that affect confidentiality, integrity, and resilience; ongoing oversight so providers meet a high standard of care (not a one-time onboarding checkbox).</li>
                <li><strong className="text-navy dark:text-cream">IT project and change / secure development</strong> — project risk, secure SDLC, testing, and controlled change into production.</li>
                <li><strong className="text-navy dark:text-cream">Cybersecurity and operations</strong> — threat monitoring, vulnerability management, access control, cryptography, network and data security, online financial services protections.</li>
                <li><strong className="text-navy dark:text-cream">Resilience</strong> — availability, recovery, continuity aligned with the criticality of systems and services.</li>
              </ul>
              <p className="mt-3 font-medium text-navy dark:text-cream">Related Singapore instruments vendors still hit</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  <a className="underline" href="https://www.mas.gov.sg/regulation/guidelines/guidelines-on-outsourcing" target="_blank" rel="noopener noreferrer">Guidelines on Outsourcing</a>
                  {' '}and binding outsourcing notices for banks / merchant banks — due diligence, contracts, audit rights, subcontractor visibility, concentration and exit themes.
                </li>
                <li>
                  Evolving <strong className="text-navy dark:text-cream">third-party risk</strong> policy work (e.g. MAS consultation on Third-Party Risk Management Guidelines) that may broaden expectations beyond classic “outsourcing” labels to more SaaS and data arrangements — watch the final text and transition period.
                </li>
                <li>
                  Incident expectations in the wider MAS technology-risk stack are often stricter than generic ISO language (industry practice and related notices emphasise rapid severe-incident reporting and follow-up root-cause analysis — treat specific timers as requiring primary-source confirmation for your entity type).
                </li>
              </ul>
              <p className="mt-3 font-medium text-navy dark:text-cream">What this means on an Oblig assessment</p>
              <p className="mt-1">
                Checklist items on executive ownership, written risk appetite, secure SDLC, vendor evidence packs, subcontractor lists, cloud/shared-responsibility stories, and tested incident communication map directly to how Singapore FIs operationalise TRM + outsourcing. Closing those items is how you become “easy to approve” in a MAS-oriented questionnaire — not by waving ISO alone.
              </p>
            </Section>

            <Section id="bnm-rmit" title="Deep dive: BNM Risk Management in Technology (RMiT)">
              <p>
                <strong className="text-navy dark:text-cream">Instrument:</strong>{' '}
                <a className="underline" href="https://www.bnm.gov.my/-/pd-rmit-nov25" target="_blank" rel="noopener noreferrer">BNM Policy Document — Risk Management in Technology (RMiT)</a>
                {' '}(major revision issued <strong>28 November 2025</strong>; effective that date except where the PD states otherwise). Unlike MAS TRM guidelines, RMiT is a <strong className="text-navy dark:text-cream">policy document</strong> with minimum requirements for in-scope institutions under BNM’s mandates.
              </p>
              <p className="mt-3">
                <strong className="text-navy dark:text-cream">Scope (high level):</strong> licensed banks, investment banks, Islamic banks, insurers/takaful, prescribed DFIs, certain e-money and payment-system entities, and — in the 2025 revision — expanded reach toward larger non-bank merchant acquirers and intermediary remittance institutions meeting market-share thresholds. Always confirm the applicability list in the current PD.
              </p>
              <p className="mt-3 font-medium text-navy dark:text-cream">Themes the 2025 PD reinforces</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li><strong className="text-navy dark:text-cream">Governance and the CISO</strong> — board/senior oversight of technology and cyber risk; elevated expectations on CISO capability and authority.</li>
                <li><strong className="text-navy dark:text-cream">Service resilience and customer impact</strong> — risk appetite that includes customer impact tolerances; structured handling of intermittent degradation, not only total outages; recovery capabilities including harder cyber-resumption scenarios (e.g. isolated recovery concepts in recent updates).</li>
                <li><strong className="text-navy dark:text-cream">Technology operations</strong> — enterprise technology architecture discipline; capacity and continuity; stronger baseline security expectations extended more broadly across the industry.</li>
                <li><strong className="text-navy dark:text-cream">Cybersecurity management</strong> — heightened controls aligned with global practice; proactive testing culture (vulnerability assessment, penetration testing, and periodic red-team style exercises appear in industry summaries of the PD — confirm cadence in the primary text for your entity class).</li>
                <li><strong className="text-navy dark:text-cream">Third parties and cyber supply chain</strong> — due diligence, continuous monitoring of third-party cyber posture, and supply-chain risk management — directly relevant to fintech vendors.</li>
                <li><strong className="text-navy dark:text-cream">Cloud</strong> — cloud-specific risk assessment, shared responsibility, key ownership, architecture and exit considerations (detailed appendix-style guidance in recent RMiT editions).</li>
                <li><strong className="text-navy dark:text-cream">Digital services & fraud</strong> — stronger fraud detection, monitoring, and customer-empowerment expectations for digital channels.</li>
              </ul>
              <p className="mt-3 font-medium text-navy dark:text-cream">Concrete expectations vendors often hear (verify in PD)</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>Named technology/cyber accountability (CISO-level ownership is a frequent questionnaire theme).</li>
                <li>Logging / monitoring retention and SOC-style capability discussions — BNM has historically set explicit operational baselines industry participants quote in DD (confirm current numbers in the PD text you are assessed against).</li>
                <li>Annual (or otherwise periodic) independent security testing evidence.</li>
                <li>Cloud and outsourcing files: contracts, audit rights, exit, and continuous assurance — not a certificate alone.</li>
              </ul>
              <p className="mt-3 font-medium text-navy dark:text-cream">Parallel Malaysia track</p>
              <p className="mt-1">
                BNM has also issued technology requirements aimed at <strong className="text-navy dark:text-cream">payment-services regulatees</strong> (distinct from the core RMiT bank/insurer track). If you sell into a Malaysian e-money issuer or payment player, ask which policy document drives their vendor assessment rather than assuming “RMiT only.”
              </p>
              <p className="mt-3 font-medium text-navy dark:text-cream">What this means on an Oblig assessment</p>
              <p className="mt-1">
                Items on CISO ownership, pentest cadence, SIEM/logging discipline, cloud posture, and continuous vendor monitoring are RMiT-shaped. Strengthening them improves both Malaysian FI questionnaires and your overall APAC readiness score.
              </p>
            </Section>

            <Section id="vietnam-thailand" title="Vietnam & Thailand — status">
              <p>
                Vietnam and Thailand are part of Oblig’s <strong className="text-navy dark:text-cream">ten-market APAC set</strong>.
                They matter for fintechs expanding across mainland Southeast Asia: local banks and payment institutions will still test
                technology, data, and third-party controls even when your “home” map is Singapore or Malaysia.
              </p>
              <p className="mt-3 font-medium text-navy dark:text-cream">Vietnam (SBV)</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-navy dark:text-cream">Primary tech-security baseline:</strong>{' '}
                  Circular <strong>09/2020/TT-NHNN</strong> — security of information systems in banking operations
                  (risk assessment, third-party/cloud conditions, incident response network, vulnerability management).
                  Applies to credit institutions, foreign bank branches, and related payment/credit-information entities.
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Online / digital banking security:</strong>{' '}
                  Circular <strong>50/2024/TT-NHNN</strong> (as amended) — security and confidentiality for online banking services,
                  system security levels, and ongoing assessment expectations. Start from{' '}
                  <a className="underline" href="https://sbv.gov.vn" target="_blank" rel="noopener noreferrer">sbv.gov.vn</a>;
                  full texts are often mirrored on official legal portals.
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Vendor angle:</strong> institutions must assess third parties for higher-level systems
                  and systems processing client personal data; contracts are expected to cover security commitments, interruption limits,
                  continuity, and related controls. That is what flows into questionnaires you receive as a tech vendor.
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Oblig product status:</strong> documented and monitored; in-app control maps are
                  <em> thinner</em> than SG/MY until a dedicated VN pack is completed. Treat VN as an expansion market with clear primary instruments.
                </li>
              </ul>
              <p className="mt-3 font-medium text-navy dark:text-cream">Thailand (BOT)</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-navy dark:text-cream">IT outsourcing for financial institutions:</strong>{' '}
                  <a className="underline" href="https://www.bot.or.th/content/dam/bot/fipcs/documents/FPG/2560/EngPDF/25600035.pdf" target="_blank" rel="noopener noreferrer">BOT Notification on IT Outsourcing</a>{' '}
                  — board oversight, risk management across security/integrity/availability, monitoring of providers, and cloud-related expectations.
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Broader IT risk for FIs:</strong> BOT has issued IT risk regulations and implementation-style guidance
                  (including third-party / IT outsourcing reporting themes). Payment-system operators also face dedicated IT security notifications
                  (e.g.{' '}
                  <a className="underline" href="https://www.bot.or.th/content/dam/bot/fipcs/documents/FPG/2561/EngPDF/25610093.pdf" target="_blank" rel="noopener noreferrer">IT security for designated payment systems/services</a>).
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Vendor angle:</strong> Thai FIs must manage outsourcing risk as if the activity remained in-house —
                  due diligence, contracts, continuity, and customer-data protection. Fintech vendors should expect those themes on questionnaires.
                </li>
                <li>
                  <strong className="text-navy dark:text-cream">Oblig product status:</strong> documented with stable English PDF entry points; in-app depth is
                  expanding. Pair TH with your SG/MY posture rather than treating it as “unregulated.”
                </li>
              </ul>
            </Section>

            <Section id="apac-emea" title="APAC vs EMEA — how the regimes differ">
              <p>
                Both regions push banks toward strong technology risk, cyber resilience, and third-party oversight.
                The <em>shape</em> of the rulebook differs — which is why a single “global GRC” checklist rarely matches what an APAC FI asks a vendor.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-app">
                      <th className="py-2 pr-3 font-semibold text-navy dark:text-cream">Theme</th>
                      <th className="py-2 pr-3 font-semibold text-navy dark:text-cream">APAC (Oblig focus)</th>
                      <th className="py-2 font-semibold text-navy dark:text-cream">EMEA (illustrative)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted">
                    <tr className="border-b border-app align-top">
                      <td className="py-2 pr-3 text-navy dark:text-cream">Structure</td>
                      <td className="py-2 pr-3">National supervisors (MAS, BNM, OJK, BSP, NBC, SBV, BOT, FSA, FSC…). Each market has its own TRM / outsourcing / cyber pack.</td>
                      <td className="py-2">EU-level instruments (notably <strong>DORA</strong> for digital operational resilience; <strong>NIS2</strong> for essential entities) plus national competent authorities; UK has its own operational-resilience and outsourcing approach post-Brexit.</td>
                    </tr>
                    <tr className="border-b border-app align-top">
                      <td className="py-2 pr-3 text-navy dark:text-cream">Binding style</td>
                      <td className="py-2 pr-3">Mix of guidelines, policy documents, circulars, and notices. “Guideline” can still drive examination and vendor DD in practice (e.g. MAS TRM).</td>
                      <td className="py-2">DORA is a regulation with direct effect for in-scope financial entities; detailed RTS/ITS sit underneath. More uniform ICT risk language across the EU single market.</td>
                    </tr>
                    <tr className="border-b border-app align-top">
                      <td className="py-2 pr-3 text-navy dark:text-cream">Third parties</td>
                      <td className="py-2 pr-3">Outsourcing / vendor risk is intense and local: materiality tests, subcontractor consent, data-location answers, register-style documentation for the bank.</td>
                      <td className="py-2">DORA emphasises ICT third-party risk, contractual terms, and oversight of critical ICT third-party providers at EU level — a different concentration model than ten separate national packs.</td>
                    </tr>
                    <tr className="border-b border-app align-top">
                      <td className="py-2 pr-3 text-navy dark:text-cream">Incident & resilience</td>
                      <td className="py-2 pr-3">Market-specific timers and reporting paths (e.g. severe-incident expectations under MAS-related regimes). Operational resilience is rising on APAC agendas in parallel with Europe.</td>
                      <td className="py-2">DORA standardises ICT incident classification/reporting and resilience testing themes (including threat-led testing for significant entities via EU frameworks).</td>
                    </tr>
                    <tr className="border-b border-app align-top">
                      <td className="py-2 pr-3 text-navy dark:text-cream">What vendors feel</td>
                      <td className="py-2 pr-3">Questionnaires that cite <em>local</em> frameworks — not “are you DORA ready?” alone. ISO/SOC help, but residency, consent, and local SLAs still appear.</td>
                      <td className="py-2">Large EU FIs increasingly map vendor ICT controls to DORA-oriented clauses; cross-border vendors may still need country addenda.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                <strong className="text-navy dark:text-cream">Practical takeaway for Oblig users:</strong> if you already invested in ISO 27001 or EU-style operational resilience,
                keep that evidence — then close <em>APAC-specific</em> gaps (notification culture, data location, outsourcing registers, local AI expectations).
                Oblig is built for that second step, not as a DORA implementation tool.
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
                <Gloss term="APAC" def="Asia-Pacific. In Oblig, primarily ten markets: Singapore, Malaysia, Indonesia, Philippines, Cambodia, Vietnam, Thailand, Japan, South Korea, Taiwan." />
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
              <Faq q="Which markets do you cover?" a="Ten priority markets across Southeast and Northeast Asia, with weekly research focused on tech, data, and AI governance updates — not pure payments licensing." />
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
