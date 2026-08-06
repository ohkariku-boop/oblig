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
  { id: 'rk1', title: 'Unencrypted laptop with customer data', description: 'Field team laptops may store unencrypted customer records.', likelihood: 3, impact: 5, owner: 'IT Lead', reviewDate: '2026-08-15', mitigation: 'Enforce full-disk encryption via MDM and audit quarterly.', status: 'mitigating', aiGenerated: true },
  { id: 'rk2', title: 'No offboarding access revocation', description: 'Former contractor accounts remained active for 30 days.', likelihood: 4, impact: 4, owner: 'People Ops', reviewDate: '2026-08-01', mitigation: 'Automate offboarding checklist tied to HR system.', status: 'open' },
  { id: 'rk3', title: 'Single-vendor hosting dependency', description: 'Primary SaaS vendor has no failover, creating concentration risk.', likelihood: 2, impact: 4, owner: 'CTO', reviewDate: '2026-09-10', mitigation: 'Document exit plan and evaluate secondary provider.', status: 'accepted' },
  { id: 'rk4', title: 'Unpatched VPN appliance', description: 'Edge VPN appliance behind on critical CVE patches.', likelihood: 4, impact: 5, owner: 'IT Lead', reviewDate: '2026-07-30', mitigation: 'Emergency patch window scheduled this week.', status: 'mitigating' },
  { id: 'rk5', title: 'Weak password policy', description: 'No minimum length or breach-list screening enforced.', likelihood: 3, impact: 3, owner: 'IT Lead', reviewDate: '2026-08-20', mitigation: 'Adopt 14-char minimum with breached-password screening.', status: 'open', aiGenerated: true },
  { id: 'rk6', title: 'Untested backups', description: 'Backups run but have not been restored in 12 months.', likelihood: 2, impact: 5, owner: 'IT Lead', reviewDate: '2026-09-05', mitigation: 'Schedule quarterly restore tests and log results.', status: 'open' },
];

export const samplePolicies: PolicyDoc[] = [
  { id: 'p1', title: 'Information Security Policy', type: 'Security', status: 'approved', version: '1.3', updatedAt: '2026-07-12', owner: 'CTO', summary: 'Defines responsibilities for protecting company and customer information.' },
  { id: 'p2', title: 'Acceptable Use Policy', type: 'Usage', status: 'published', version: '1.1', updatedAt: '2026-06-28', owner: 'People Ops', summary: 'Rules for appropriate use of company systems and data.' },
  { id: 'p3', title: 'Incident Response Policy', type: 'Security', status: 'review', version: '0.9', updatedAt: '2026-07-20', owner: 'IT Lead', summary: 'How security incidents are detected, contained and reported.' },
  { id: 'p4', title: 'Remote Working Policy', type: 'Workplace', status: 'draft', version: '0.4', updatedAt: '2026-07-22', owner: 'People Ops', summary: 'Expectations for secure remote access and home working.' },
  { id: 'p5', title: 'Vendor Management Policy', type: 'Third-party', status: 'draft', version: '0.2', updatedAt: '2026-07-25', owner: 'Procurement', summary: 'Due diligence and monitoring of suppliers handling company data.' },
];

export const sampleEvidence: EvidenceItem[] = [
  { id: 'e1', name: 'InfoSec Policy v1.3.pdf', type: 'policy', size: '248 KB', uploadedAt: '2026-07-12', tags: ['security', 'approved'] },
  { id: 'e2', name: 'Q2 Backup Restore Test.png', type: 'screenshot', size: '1.2 MB', uploadedAt: '2026-07-05', tags: ['backup', 'continuity'] },
  { id: 'e3', name: 'Acme SaaS DPA.pdf', type: 'contract', size: '512 KB', uploadedAt: '2026-06-30', tags: ['vendor', 'legal'] },
  { id: 'e4', name: 'SOC2 Type II Report.pdf', type: 'audit', size: '4.8 MB', uploadedAt: '2026-05-18', tags: ['audit', 'soc2'] },
  { id: 'e5', name: 'ISO 27001 Certificate.pdf', type: 'certificate', size: '180 KB', uploadedAt: '2026-04-02', tags: ['iso27001'] },
  { id: 'e6', name: 'Phishing Simulation Results.csv', type: 'report', size: '64 KB', uploadedAt: '2026-07-18', tags: ['awareness', 'people'] },
];

export const sampleFrameworks: Framework[] = [
  { id: 'cobit', name: 'COBIT 2019', shortName: 'COBIT', description: 'Governance framework for enterprise IT objectives.', coverage: 41, totalControls: 40, metControls: 16, color: '#3b66f5' },
  { id: 'iso27001', name: 'ISO/IEC 27001', shortName: 'ISO 27001', description: 'International standard for information security management.', coverage: 58, totalControls: 93, metControls: 54, color: '#14b8a6' },
  { id: 'nistcsf', name: 'NIST Cybersecurity Framework', shortName: 'NIST CSF', description: 'Framework to understand and reduce cyber risk.', coverage: 64, totalControls: 108, metControls: 69, color: '#f59e0b' },
  { id: 'cis', name: 'CIS Controls v8', shortName: 'CIS', description: 'Prioritised actions to protect against common attacks.', coverage: 47, totalControls: 153, metControls: 72, color: '#ef4444' },
  { id: 'soc2', name: 'SOC 2', shortName: 'SOC 2', description: 'Trust services criteria for service organisations.', coverage: 52, totalControls: 64, metControls: 33, color: '#8b5cf6' },
  { id: 'pdpa', name: 'PDPA (SG)', shortName: 'PDPA', description: 'Personal Data Protection Act obligations.', coverage: 70, totalControls: 12, metControls: 8, color: '#0ea5e9' },
  { id: 'gdpr', name: 'GDPR', shortName: 'GDPR', description: 'EU General Data Protection Regulation requirements.', coverage: 62, totalControls: 18, metControls: 11, color: '#22c55e' },
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
    items: ['Establish governance ownership', 'Define information classification', 'Implement MFA on critical systems'],
  },
  {
    id: 'ph2', title: 'Core Controls', level: 2, status: 'active', timeframe: 'Now — 8 weeks',
    items: ['Implement Asset Register', 'Roll out Password Policy', 'Vendor risk reviews', 'Document incident response'],
  },
  {
    id: 'ph3', title: 'Operationalise', level: 3, status: 'upcoming', timeframe: 'Weeks 9-16',
    items: ['Quarterly risk reviews', 'Annual governance review', 'Awareness training programme', 'Backup restore tests'],
  },
  {
    id: 'ph4', title: 'Mature', level: 3, status: 'upcoming', timeframe: 'Weeks 17-24',
    items: ['KPI-driven governance reporting', 'ISO 27001 gap analysis', 'Continuous control monitoring'],
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
  'How can I improve my governance maturity score?',
  'Generate a Password Policy',
  'Summarise my governance gaps',
  'What should I prioritise next?',
  'Are we ready for ISO 27001?',
  'Explain my governance score',
  'Generate an Incident Response Policy',
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
