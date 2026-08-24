import type {
  AssessmentCategory, Risk, PolicyDoc, EvidenceItem, Framework,
  ActivityItem, RoadmapPhase, DashboardSummary,
} from '@/types';

export const MATURITY_LABELS: Record<number, string> = {
  1: 'Initial',
  2: 'Developing',
  3: 'Defined',
  4: 'Managed',
  5: 'Optimised',
};

export const assessmentCategories: AssessmentCategory[] = [
  {
    id: 'strategy',
    name: 'Strategy & Leadership',
    description: 'Governance direction, ownership and board-level commitment.',
    icon: 'Target',
    questions: [
      { id: 's1', text: 'We have a documented IT governance strategy aligned to business goals.', category: 'strategy' },
      { id: 's2', text: 'A named executive owns IT governance accountability.', category: 'strategy' },
      { id: 's3', text: 'The board or leadership reviews governance at least annually.', category: 'strategy' },
      { id: 's4', text: 'Governance objectives have measurable targets and KPIs.', category: 'strategy' },
    ],
  },
  {
    id: 'risk',
    name: 'Risk Management',
    description: 'How risks to information and operations are identified and treated.',
    icon: 'ShieldAlert',
    questions: [
      { id: 'r1', text: 'We maintain a documented risk register that is reviewed regularly.', category: 'risk' },
      { id: 'r2', text: 'Risks are assessed for likelihood and impact.', category: 'risk' },
      { id: 'r3', text: 'Each significant risk has a named owner and treatment plan.', category: 'risk' },
      { id: 'r4', text: 'Risk treatment decisions are approved by leadership.', category: 'risk' },
    ],
  },
  {
    id: 'security',
    name: 'Information Security',
    description: 'Controls that protect data, access and systems from threats.',
    icon: 'Lock',
    questions: [
      { id: 'sec1', text: 'We enforce multi-factor authentication for all critical systems.', category: 'security' },
      { id: 'sec2', text: 'Access rights are reviewed and revoked when staff leave.', category: 'security' },
      { id: 'sec3', text: 'Devices are encrypted and remotely manageable.', category: 'security' },
      { id: 'sec4', text: 'Security incidents are logged and triaged.', category: 'security' },
    ],
  },
  {
    id: 'assets',
    name: 'Asset & Data Management',
    description: 'Knowing what you have and classifying it appropriately.',
    icon: 'Database',
    questions: [
      { id: 'a1', text: 'We maintain an asset inventory of hardware and software.', category: 'assets' },
      { id: 'a2', text: 'Data is classified by sensitivity with handling rules per class.', category: 'assets' },
      { id: 'a3', text: 'Backups are tested and follow a documented schedule.', category: 'assets' },
      { id: 'a4', text: 'Software is kept up to date with a patching cadence.', category: 'assets' },
    ],
  },
  {
    id: 'people',
    name: 'People & Awareness',
    description: 'Roles, training and a culture that sustains governance.',
    icon: 'Users',
    questions: [
      { id: 'p1', text: 'Staff receive security and governance awareness training on onboarding and periodically.', category: 'people' },
      { id: 'p2', text: 'Acceptable use and security responsibilities are documented in policy.', category: 'people' },
      { id: 'p3', text: 'We run periodic phishing simulations or awareness checks.', category: 'people' },
      { id: 'p4', text: 'Roles and responsibilities for IT are clearly defined.', category: 'people' },
    ],
  },
  {
    id: 'continuity',
    name: 'Continuity & Compliance',
    description: 'Resilience, recovery and meeting external obligations.',
    icon: 'LifeBuoy',
    questions: [
      { id: 'c1', text: 'We have a documented incident response plan that is tested.', category: 'continuity' },
      { id: 'c2', text: 'A business continuity plan exists with recovery objectives.', category: 'continuity' },
      { id: 'c3', text: 'We understand the compliance obligations relevant to our industry.', category: 'continuity' },
      { id: 'c4', text: 'Third-party and vendor risks are assessed before onboarding.', category: 'continuity' },
    ],
  },
];

export const sampleRisks: Risk[] = [
  { id: 'rk1', title: 'No subcontractor register maintained', description: 'Customer data flows through two sub-processors with no documented consent trail, a direct gap against MAS Notices 658/1121.', likelihood: 4, impact: 5, owner: 'CTO', reviewDate: '2026-08-15', mitigation: 'Build a subcontractor register and retroactively obtain institutional customer consent.', status: 'mitigating', aiGenerated: true },
  { id: 'rk2', title: 'Cambodia data residency exposure', description: 'Production database for a Cambodian FI customer is hosted outside the country, violating NBC\'s in-country data residency requirement.', likelihood: 3, impact: 5, owner: 'Infra Lead', reviewDate: '2026-08-01', mitigation: 'Stand up an in-country replica or regional cloud region that satisfies NBC data sovereignty rules before renewal.', status: 'open' },
  { id: 'rk3', title: 'No 1-hour incident notification runbook for MAS', description: 'Singapore severe-incident notification window is 1 hour; current on-call process has no defined path to notify affected banks that fast.', likelihood: 2, impact: 5, owner: 'IT Lead', reviewDate: '2026-09-10', mitigation: 'Build and tabletop-test a notification runbook with a hard 1-hour SLA and a 14-day root-cause report template.', status: 'open', aiGenerated: true },
  { id: 'rk4', title: 'Single-region hosting creates concentration risk', description: 'All customer workloads run in one cloud region with no failover, a gap MAS\'s emerging TPRMG explicitly targets.', likelihood: 3, impact: 4, owner: 'CTO', reviewDate: '2026-07-30', mitigation: 'Document an exit/portability plan and evaluate a secondary region or provider.', status: 'mitigating' },
  { id: 'rk5', title: 'No annual penetration test on file', description: 'BNM RMiT names annual pentesting as a mandatory baseline control; last test was 18 months ago.', likelihood: 3, impact: 4, owner: 'IT Lead', reviewDate: '2026-08-20', mitigation: 'Schedule an annual pentest cadence with a named vendor and calendar reminder.', status: 'open' },
  { id: 'rk6', title: 'SIEM log retention below BNM RMiT baseline', description: 'Current log retention is 90 days; BNM RMiT specifies a 3-year baseline for regulated Malaysian financial institutions.', likelihood: 2, impact: 3, owner: 'IT Lead', reviewDate: '2026-09-05', mitigation: 'Extend SIEM retention policy to 3 years and confirm storage cost impact.', status: 'open' },
];

export const samplePolicies: PolicyDoc[] = [
  { id: 'p1', title: 'Vendor & Third-Party Risk Management Policy', type: 'Third-party', status: 'approved', version: '1.3', updatedAt: '2026-07-12', owner: 'CTO', summary: 'Due diligence, ongoing monitoring, and subcontractor consent for our own vendor supply chain.' },
  { id: 'p2', title: 'Data Residency & Cross-Border Transfer Policy', type: 'Data', status: 'published', version: '1.1', updatedAt: '2026-06-28', owner: 'Infra Lead', summary: 'Where customer data physically lives, by market, and when it may leave the country.' },
  { id: 'p3', title: 'Incident Notification Policy (Regulator SLAs)', type: 'Security', status: 'review', version: '0.9', updatedAt: '2026-07-20', owner: 'IT Lead', summary: "Notification timers by market, including MAS's 1-hour severe-incident window." },
  { id: 'p4', title: 'AI Governance & Model Risk Policy', type: 'AI Governance', status: 'draft', version: '0.4', updatedAt: '2026-07-22', owner: 'CTO', summary: 'FEAT principles and human oversight for any customer-facing AI/ML use.' },
  { id: 'p5', title: 'Subcontractor Consent & Outsourcing Register Policy', type: 'Third-party', status: 'draft', version: '0.2', updatedAt: '2026-07-25', owner: 'Procurement', summary: 'Prior written consent before subcontracting, and a register mapped to bank outsourcing requirements.' },
];

export const sampleEvidence: EvidenceItem[] = [
  { id: 'e1', name: 'Vendor Due-Diligence Pack v1.3.pdf', type: 'policy', size: '248 KB', uploadedAt: '2026-07-12', tags: ['vendor', 'approved'] },
  { id: 'e2', name: 'MAS 1-Hour Notification Tabletop Test.png', type: 'screenshot', size: '1.2 MB', uploadedAt: '2026-07-05', tags: ['incident', 'sg'] },
  { id: 'e3', name: 'Sub-processor Outsourcing Register.pdf', type: 'contract', size: '512 KB', uploadedAt: '2026-06-30', tags: ['subcontractor', 'legal'] },
  { id: 'e4', name: 'BNM RMiT Annual Pentest Report.pdf', type: 'audit', size: '4.8 MB', uploadedAt: '2026-05-18', tags: ['audit', 'my'] },
  { id: 'e5', name: 'ISO 27001 Certificate.pdf', type: 'certificate', size: '180 KB', uploadedAt: '2026-04-02', tags: ['iso27001'] },
  { id: 'e6', name: 'AI Model Fairness Review (FEAT).csv', type: 'report', size: '64 KB', uploadedAt: '2026-07-18', tags: ['ai-governance', 'sg'] },
];

export const sampleFrameworks: Framework[] = [
  { id: 'mas-trm', name: 'MAS Technology Risk Management Guidelines', shortName: 'MAS TRM (SG)', description: 'Singapore — 10 core domains incl. board oversight, vendor due diligence, cloud, and 1-hour severe-incident notification to MAS.', coverage: 64, totalControls: 42, metControls: 27, color: '#dc2626' },
  { id: 'bnm-rmit', name: 'BNM Risk Management in Technology', shortName: 'BNM RMiT (MY)', description: 'Malaysia — cybersecurity risk (Domain 10) and technology resilience (Domain 11), incl. SOC, SIEM 3-yr retention, annual pentest.', coverage: 52, totalControls: 38, metControls: 20, color: '#0d9488' },
  { id: 'ojk-2026', name: 'OJK Regulation No. 1/2026', shortName: 'OJK (ID)', description: 'Indonesia — IT governance, cyber resilience, and IT service provider engagement for commercial banks, mirrors elements of EU DORA.', coverage: 38, totalControls: 45, metControls: 17, color: '#d97706' },
  { id: 'bsp-808', name: 'BSP Circular 808 / 1137 (SAFr)', shortName: 'BSP (PH)', description: 'Philippines — IT risk management and outsourcing, self-assessed against BSP\'s Supervisory Assessment Framework.', coverage: 57, totalControls: 30, metControls: 17, color: '#2563eb' },
  { id: 'nbc-tcrmg', name: 'NBC Technology & Cyber Risk Mgmt Guidelines', shortName: 'NBC TCRMG (KH)', description: 'Cambodia — 6 policy domains; in-country data residency is a hard requirement, not a recommendation.', coverage: 29, totalControls: 24, metControls: 7, color: '#7c3aed' },
  { id: 'fsa-cyber', name: 'FSA Cybersecurity Guidelines', shortName: 'FSA (JP)', description: 'Japan — 176 discrete response items across 6 areas, checklist-style rather than principles-based.', coverage: 33, totalControls: 176, metControls: 58, color: '#be123c' },
  { id: 'efta-kr', name: 'Electronic Financial Transactions Act', shortName: 'EFTA (KR)', description: 'South Korea — FSC/FSS-enforced; obligations are licensing-status gated, plus PIPA/CIUPA for data and credit info.', coverage: 21, totalControls: 28, metControls: 6, color: '#0891b2' },
  { id: 'fsc-outsourcing-tw', name: 'FSC Outsourcing & Supply Chain Guidelines', shortName: 'FSC (TW)', description: 'Taiwan — strict subcontractor consent requirements; cross-border outsourcing has additional conditions under Article 17.', coverage: 45, totalControls: 26, metControls: 12, color: '#65a30d' },
];

export const sampleAiFrameworks: Framework[] = [
  { id: 'mas-ai-feat', name: 'MAS AI Risk Management Guidelines (in consultation) + FEAT', shortName: 'MAS AI (SG)', description: 'Singapore — principles for fairness, ethics, accountability and transparency in AI/ML use by financial institutions.', coverage: 40, totalControls: 20, metControls: 8, color: '#dc2626' },
  { id: 'bnm-ai', name: 'BNM AI Discussion Paper + AICB Framework', shortName: 'BNM AI (MY)', description: 'Malaysia — emerging industry framework for AI governance in financial services.', coverage: 22, totalControls: 16, metControls: 4, color: '#0d9488' },
  { id: 'ojk-ai', name: 'OJK AI Governance for Indonesian Banking', shortName: 'OJK AI (ID)', description: 'Indonesia — 8-stage AI governance lifecycle for banking institutions.', coverage: 18, totalControls: 22, metControls: 4, color: '#d97706' },
  { id: 'bsp-stars', name: 'BSP STARS Framework', shortName: 'BSP STARS (PH)', description: 'Philippines — Memorandum M-2026-031, AI governance expectations for BSP-supervised institutions.', coverage: 15, totalControls: 18, metControls: 3, color: '#2563eb' },
  { id: 'fsa-ai', name: 'FSA AI Discussion Paper Series + AI Promotion Act', shortName: 'FSA AI (JP)', description: 'Japan — active working groups on frontier AI risk in the financial sector as of mid-2026.', coverage: 12, totalControls: 24, metControls: 3, color: '#be123c' },
  { id: 'fsc-ai-kr', name: 'FSC 7-Principle AI Guidelines + AI Framework Act', shortName: 'FSC AI (KR)', description: 'South Korea — binding for high-impact AI use cases under the AI Framework Act.', coverage: 10, totalControls: 20, metControls: 2, color: '#0891b2' },
];

export const sampleActivity: ActivityItem[] = [
  { id: 'a1', type: 'assessment', title: 'Governance Assessment completed', detail: 'Q3 assessment scored 62/100 — maturity level 3.', timestamp: '2026-07-26T10:30:00Z', user: 'You' },
  { id: 'a2', type: 'ai', title: 'AI Copilot generated a Password Policy', detail: 'Draft v0.4 saved to Policies for review.', timestamp: '2026-07-25T16:12:00Z', user: 'AI Copilot' },
  { id: 'a3', type: 'risk', title: 'New risk added to register', detail: '"Untested backups" flagged with high impact.', timestamp: '2026-07-24T09:05:00Z', user: 'You' },
  { id: 'a4', type: 'policy', title: 'Incident Response Policy moved to review', detail: 'Routed to CTO for sign-off.', timestamp: '2026-07-23T14:40:00Z', user: 'IT Lead' },
  { id: 'a5', type: 'evidence', title: 'SOC 2 report uploaded', detail: 'Added to Evidence Library under audit tags.', timestamp: '2026-07-22T11:20:00Z', user: 'You' },
  { id: 'a6', type: 'system', title: 'Weekly governance digest sent', detail: 'Summary emailed to leadership team.', timestamp: '2026-07-21T08:00:00Z', user: 'System' },
];

export const sampleRoadmap: RoadmapPhase[] = [
  {
    id: 'ph1', title: 'Foundations', level: 2, status: 'done', timeframe: 'Completed Q2',
    items: ['Named executive owner for technology risk', 'Written risk appetite statement', 'Secure SDLC baseline documented'],
  },
  {
    id: 'ph2', title: 'First Market Entry (Singapore)', level: 2, status: 'active', timeframe: 'Now — 8 weeks',
    items: ['Map controls to MAS TRM\'s 10 domains', 'Build outsourcing register for bank buyers', '1-hour incident notification runbook', 'Vendor due-diligence evidence pack ready'],
  },
  {
    id: 'ph3', title: 'Regional Expansion (MY, ID, PH)', level: 3, status: 'upcoming', timeframe: 'Weeks 9-16',
    items: ['BNM RMiT annual pentest + 3-year SIEM retention', 'OJK data residency review for Indonesia', 'BSP SAFr materiality self-assessment'],
  },
  {
    id: 'ph4', title: 'Full APAC Coverage', level: 3, status: 'upcoming', timeframe: 'Weeks 17-24',
    items: ['Cambodia in-country data residency', 'FSA 176-item checklist review (Japan)', 'AI governance lifecycle across all markets'],
  },
];

export const dashboardSummary: DashboardSummary = {
  governanceScore: 62,
  maturityLevel: 3,
  maturityLabel: 'Defined',
  healthStatus: 'attention',
  healthLabel: 'Needs attention',
  recentAssessments: 4,
  openRecommendations: 11,
  policyCoverage: 48,
  openRisks: 4,
  complianceReadiness: 54,
  upcomingTasks: [
    { id: 't1', title: 'Approve Incident Response Policy', due: '2026-08-02', priority: 'high' },
    { id: 't2', title: 'Patch VPN appliance (CVE)', due: '2026-07-30', priority: 'high' },
    { id: 't3', title: 'Review vendor risk for Acme SaaS', due: '2026-08-10', priority: 'medium' },
    { id: 't4', title: 'Run Q3 phishing simulation', due: '2026-08-15', priority: 'low' },
  ],
  categoryScores: [
    { name: 'Strategy', score: 65, fullMark: 100 },
    { name: 'Risk', score: 48, fullMark: 100 },
    { name: 'Security', score: 72, fullMark: 100 },
    { name: 'Assets', score: 41, fullMark: 100 },
    { name: 'People', score: 58, fullMark: 100 },
    { name: 'Continuity', score: 52, fullMark: 100 },
  ],
  trend: [
    { month: 'Feb', score: 38 }, { month: 'Mar', score: 42 }, { month: 'Apr', score: 48 },
    { month: 'May', score: 53 }, { month: 'Jun', score: 58 }, { month: 'Jul', score: 62 },
  ],
  aiRecommendations: [
    { id: 'ai1', title: 'Create a Password Policy — you currently have none approved.', impact: 'high', category: 'Security' },
    { id: 'ai2', title: 'Add an Asset Register to lift your weakest category from 41%.', impact: 'high', category: 'Assets' },
    { id: 'ai3', title: 'Schedule a quarterly backup restore test — backups are untested.', impact: 'medium', category: 'Continuity' },
    { id: 'ai4', title: 'Formalise vendor risk reviews before your next audit.', impact: 'medium', category: 'Risk' },
  ],
};

export const aiPromptSuggestions: string[] = [
  'How can I improve my readiness across markets?',
  'Generate a Vendor Risk Policy',
  'Summarise my governance gaps',
  'What should I prioritise next?',
  'Are we ready for MAS TRM?',
  'Explain my market readiness score',
  'Generate an Incident Notification Policy',
];

export function scoreToLevel(score: number): 1 | 2 | 3 | 4 | 5 {
  if (score >= 85) return 5;
  if (score >= 70) return 4;
  if (score >= 50) return 3;
  if (score >= 30) return 2;
  return 1;
}

export function healthFromScore(score: number): 'healthy' | 'attention' | 'critical' {
  if (score >= 70) return 'healthy';
  if (score >= 45) return 'attention';
  return 'critical';
}
