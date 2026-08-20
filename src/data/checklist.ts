export type Milestone = 'quick-wins' | 'sg-my' | 'first-fi' | 'expansion';
export type MarketCode = 'SG' | 'MY' | 'ID' | 'PH' | 'KH' | 'JP' | 'KR' | 'TW';
export const ALL_MARKETS: MarketCode[] = ['SG', 'MY', 'ID', 'PH', 'KH', 'JP', 'KR', 'TW'];
export const MARKET_LABELS: Record<MarketCode, string> = {
  SG: '🇸🇬 Singapore', MY: '🇲🇾 Malaysia', ID: '🇮🇩 Indonesia', PH: '🇵🇭 Philippines',
  KH: '🇰🇭 Cambodia', JP: '🇯🇵 Japan', KR: '🇰🇷 South Korea', TW: '🇹🇼 Taiwan',
};

export interface ChecklistItem {
  t: string;   // title
  w: string;   // why
  m: Milestone[]; // milestone relevance
  c: MarketCode[]; // which markets this item's citation actually applies to
}

export interface ChecklistSection {
  id: string;
  name: string;
  tag: string;
  items: ChecklistItem[];
}

export const MILESTONES: { value: Milestone; label: string }[] = [
  { value: 'quick-wins', label: 'Quick Wins Before Your First RFP' },
  { value: 'sg-my', label: 'Before Selling into Singapore/Malaysia' },
  { value: 'first-fi', label: 'Before Your First Regulated FI Customer' },
  { value: 'expansion', label: 'Expanding to ID/PH/JP/KR/TW/KH' },
];

export const MILESTONE_NOTES: Record<Milestone | 'none', string> = {
  none: 'The full vendor-risk readiness checklist, grounded in what MAS, BNM, OJK, BSP, NBC, FSA and FSC actually ask for. Your progress saves in this browser.',
  'quick-wins': 'The handful of items every one of the 8 markets converges on. Get these in place before you send out a single vendor questionnaire response.',
  'sg-my': "Singapore and Malaysia are usually the first markets fintechs sell into, and both regulators (MAS, BNM) are actively rewriting their frameworks in 2026. Being mapped early is a real advantage here.",
  'first-fi': "A regulated bank, insurer or payment institution is about to run a formal vendor security assessment on you. This is what they'll actually ask for.",
  expansion: 'Each additional market has its own regulator, its own data residency rules, and its own subcontractor-consent requirements. Treat each as a distinct control pack, not a copy-paste of SG/MY.',
};

export const DATA: ChecklistSection[] = [
  {
    id: 'board-oversight',
    name: 'Board & Senior Management Oversight',
    tag: 'the domain every regulator checks first',
    items: [
      { t: 'A named executive owner for technology risk, not just "the CTO handles it"', w: 'Every one of the 8 markets expects a clear accountability line to senior management or the board, not an informal arrangement.', m: ['quick-wins', 'first-fi'], c: ['SG','MY','ID','PH','KH','JP','KR','TW'] },
      { t: 'A written risk appetite statement for technology and vendor risk', w: 'MAS TRM Domain 1 and BNM RMiT governance requirements both expect this in writing, not verbally understood.', m: ['sg-my'], c: ['SG','MY'] },
      { t: 'Regular (at least quarterly) risk reporting to leadership', w: 'Regulators across the region want to see this is a standing agenda item, not a once-a-year fire drill before an audit.', m: ['first-fi'], c: ['SG','MY','ID','PH','KH','JP','KR','TW'] },
      { t: 'A designated CISO-level owner, even if it is a fractional or part-time role', w: 'BNM RMiT explicitly expects designated CISO-level ownership; several other markets ask for the equivalent in practice.', m: ['expansion'], c: ['MY'] },
    ],
  },
  {
    id: 'vendor-due-diligence',
    name: 'Vendor Due Diligence & Onboarding',
    tag: 'what your buyer checks before signing',
    items: [
      { t: 'A documented due-diligence process you run before onboarding your own vendors', w: 'Regulated FIs will ask how you vet your own supply chain, since their exposure runs through you to your vendors too.', m: ['first-fi'], c: ['SG','MY','ID','PH','KH','JP','KR','TW'] },
      { t: 'Security evidence ready to hand over on request (not built from scratch when asked)', w: 'A vendor who can produce evidence within a day closes deals faster than one who needs three weeks to assemble it.', m: ['quick-wins'], c: ['SG','MY','ID','PH','KH','JP','KR','TW'] },
      { t: 'A materiality test for your own outsourcing arrangements', w: "BSP Circular 1137 and Taiwan's FSC framework both classify arrangements as material or non-material, knowing where you sit shapes how deep the questionnaire goes.", m: ['expansion'], c: ['PH','TW'] },
      { t: 'Secure SDLC practices documented (secure coding, change approval, testing)', w: "This is explicitly domain 3 of MAS TRM and shows up in nearly every market's vendor questionnaire in some form.", m: ['sg-my'], c: ['SG'] },
    ],
  },
  {
    id: 'ongoing-monitoring',
    name: 'Ongoing Vendor & Technology Monitoring',
    tag: 'proving it did not stop after onboarding',
    items: [
      { t: 'A cadence for re-assessing your own security posture (not just at signup)', w: 'Every one of the 8 frameworks distinguishes onboarding due diligence from continuous monitoring, regulators explicitly check for the second one.', m: ['first-fi'], c: ['SG','MY','ID','PH','KH','JP','KR','TW'] },
      { t: 'Vulnerability management and patching cadence documented', w: "Part of MAS TRM's cybersecurity controls domain and echoed in BNM RMiT and FSA's guidelines.", m: ['sg-my'], c: ['SG','MY','JP'] },
      { t: 'Annual penetration testing, or a credible plan to get there', w: 'Explicitly named as a mandatory baseline control under BNM RMiT; increasingly expected elsewhere too.', m: ['expansion'], c: ['MY'] },
      { t: 'SIEM or equivalent logging with a defined retention period', w: "BNM RMiT specifies 3-year log retention as a baseline, a concrete, checkable number a buyer may ask for directly.", m: ['expansion'], c: ['MY'] },
    ],
  },
  {
    id: 'subcontractor',
    name: 'Subcontractor & Sub-Processor Visibility',
    tag: 'the question most vendors get caught flat on',
    items: [
      { t: 'A current list of your own subcontractors/sub-processors handling customer data', w: 'Under MAS Notices 658/1121, banks must do due diligence on your subcontractors too, not just you directly.', m: ['sg-my'], c: ['SG'] },
      { t: 'A process to get customer consent before subcontracting work that touches their data', w: 'Explicitly required under MAS outsourcing notices when subcontracting discloses customer information.', m: ['first-fi'], c: ['SG'] },
      { t: 'Written consent from your own institutional customers before adding new subcontractors', w: "Taiwan's FSC framework is the strictest on this point regionally, prior written consent, not just notification.", m: ['expansion'], c: ['TW'] },
      { t: 'Subcontracting terms and scope spelled out explicitly in vendor contracts', w: 'A generic "vendor may subcontract" clause will not satisfy Taiwanese or Singaporean institutional buyers, they expect scope and conditions in writing.', m: ['expansion'], c: ['TW','SG'] },
    ],
  },
  {
    id: 'data-residency',
    name: 'Data Residency & Localization',
    tag: 'non-negotiable in several markets, not a nice-to-have',
    items: [
      { t: 'Know exactly where your customer data physically lives, by market', w: 'Cambodia and parts of Indonesia (rural banks, FSTI providers) have hard in-country data residency requirements, not a preference, a rule.', m: ['expansion'], c: ['KH','ID'] },
      { t: 'A cloud security posture story ready for Singapore-specific questions', w: 'MAS TRM has cloud-specific requirements: data residency, the shared-responsibility model, and cloud security posture management all get asked about.', m: ['sg-my'], c: ['SG'] },
      { t: 'A documented answer for "can this data leave the country" per market you sell into', w: 'This single question stops more regional deals than any other technical control, know your answer before it is asked live on a call.', m: ['first-fi'], c: ['SG','MY','ID','PH','KH','JP','KR','TW'] },
    ],
  },
  {
    id: 'incident-notification',
    name: 'Incident Notification & Response',
    tag: 'the clock starts the moment something breaks',
    items: [
      { t: 'A written incident response plan with defined roles', w: "Every market expects this in some form; Japan's FSA guidelines break it into detection, response and recovery as separate scored areas.", m: ['sg-my'], c: ['SG','MY','ID','PH','KH','JP','KR','TW'] },
      { t: 'Know your actual notification deadlines by market, not a generic "we will tell you"', w: 'Singapore requires 1-hour notification to MAS for severe incidents, with a 14-day root-cause report, a number worth having memorized, not looked up mid-incident.', m: ['first-fi'], c: ['SG'] },
      { t: 'A tested (not just written) communication chain for notifying affected institutional customers', w: 'A plan that has never been run through a tabletop exercise usually falls apart on the first real incident.', m: ['expansion'], c: ['SG','MY','ID','PH','KH','JP','KR','TW'] },
    ],
  },
  {
    id: 'concentration-risk',
    name: 'Concentration Risk & Exit Planning',
    tag: 'what happens if your buyer has to walk away',
    items: [
      { t: 'An exit/offboarding plan your institutional customers can actually see', w: "MAS's emerging Third-Party Risk Management Guidelines (TPRMG, in consultation as of March 2026) explicitly extend into concentration risk and exit planning, this is where the regulatory direction is heading, not a static requirement.", m: ['expansion'], c: ['SG'] },
      { t: 'Data portability and handover process documented for contract termination', w: 'A buyer needs to know they are not locked in before they will commit, this is as much a sales enabler as a compliance one.', m: ['first-fi'], c: ['SG','MY','ID','PH','KH','JP','KR','TW'] },
    ],
  },
  {
    id: 'outsourcing-register',
    name: 'Outsourcing Register & Documentation',
    tag: 'be ready to be the entry in someone else\'s spreadsheet',
    items: [
      { t: 'A one-page summary of your service that maps cleanly to a bank outsourcing register', w: 'Singapore banks must maintain and submit an outsourcing register to MAS, the easier you make it for them to describe you accurately, the faster you get approved.', m: ['sg-my'], c: ['SG'] },
      { t: 'Contract language ready that covers audit rights and inspection access', w: "Taiwan's Article 10 explicitly allows the FSC and central bank to demand information or inspect outsourced arrangements at any time, buyers there will check your contract supports this.", m: ['expansion'], c: ['TW'] },
      { t: 'Evidence folder kept current: certificates, audit reports, policies, screenshots', w: 'When a buyer or regulator asks, you produce it in minutes instead of assembling it from scratch under deadline pressure.', m: ['quick-wins'], c: ['SG','MY','ID','PH','KH','JP','KR','TW'] },
    ],
  },
  {
    id: 'ai-governance',
    name: 'AI Governance Readiness',
    tag: 'the newest, fastest-moving track across every market',
    items: [
      { t: 'A documented answer for what AI/ML you use in your product, and where', w: "Every market's AI governance track starts here, you cannot be assessed against a framework if you cannot first state what you are doing.", m: ['quick-wins'], c: ['SG','MY','ID','PH','KH','JP','KR','TW'] },
      { t: 'Fairness, ethics, accountability and transparency (FEAT) principles considered for any customer-facing AI', w: "Singapore's MAS AI guidelines (in consultation) are built directly around FEAT, worth getting ahead of before it is finalized.", m: ['expansion'], c: ['SG'] },
      { t: 'Human oversight defined for any AI-driven decision that affects a customer', w: "South Korea's AI Framework Act is binding for high-impact AI use cases specifically, 'the model decided' is not a defensible answer there.", m: ['expansion'], c: ['KR'] },
      { t: 'A lifecycle view of your AI systems: development, validation, deployment, monitoring', w: "Indonesia's OJK AI governance framework is explicitly structured as an 8-stage lifecycle, thinking in stages now saves a rebuild later.", m: ['expansion'], c: ['ID'] },
    ],
  },
];

export const TOTAL_ITEMS = DATA.reduce((n, s) => n + s.items.length, 0);
