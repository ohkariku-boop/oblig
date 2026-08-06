export type Milestone = '30min' | 'first-hire' | 'first-customer' | 'growth';

export interface ChecklistItem {
  t: string;   // title
  w: string;   // why
  m: Milestone[]; // milestone relevance
}

export interface ChecklistSection {
  id: string;
  name: string;
  tag: string;
  items: ChecklistItem[];
}

export const MILESTONES: { value: Milestone; label: string }[] = [
  { value: '30min', label: '30-Minute Setup Sprint' },
  { value: 'first-hire', label: 'Before your first hire' },
  { value: 'first-customer', label: 'Before your first paying customer' },
  { value: 'growth', label: 'Growing team & data' },
];

export const MILESTONE_NOTES: Record<Milestone | 'none', string> = {
  none: 'The full checklist. Work through it in any order — your progress saves in this browser.',
  '30min': 'Just 30 minutes today gets the highest-leverage foundations in place. Items for this stage are highlighted below.',
  'first-hire': "You're about to bring someone in. Lock down access, devices and acceptable use before day one.",
  'first-customer': "You'll be handling someone else's data or money. Prove you can protect it before they ask.",
  growth: 'Your team and data footprint are growing. These items keep governance from becoming a tax later.',
};

export const DATA: ChecklistSection[] = [
  {
    id: 'access',
    name: 'Access & Identity',
    tag: 'who can get in',
    items: [
      { t: 'Multi-factor authentication (MFA) on every admin and email account', w: 'Stolen passwords cause the majority of breaches. MFA stops most of them cold.', m: ['30min'] },
      { t: 'A shared password manager (1Password, Bitwarden) — no passwords in chat or docs', w: 'Reused and shared-in-Slack passwords are how startups get popped. A manager fixes this in 20 minutes.', m: ['30min'] },
      { t: 'Remove access when someone leaves — a written offboarding checklist', w: 'Forgotten accounts are a silent risk. A checklist means nothing gets missed under stress.', m: ['first-hire'] },
      { t: 'Review who has admin rights every quarter', w: 'Admin sprawl happens fast. A 5-minute review prevents a former contractor from haunting you.', m: ['growth'] },
      { t: 'Use single sign-on (SSO) where available', w: 'One identity to provision and revoke beats chasing ten dashboards.', m: ['growth'] },
    ],
  },
  {
    id: 'devices',
    name: 'Devices & Endpoint',
    tag: 'what they log in from',
    items: [
      { t: 'Full-disk encryption on every laptop (FileVault / BitLocker)', w: 'A lost laptop with customer data is a breach. Encryption makes it a non-event.', m: ['30min'] },
      { t: 'Remote lock/wipe enrolled (Find My, MDM)', w: 'If a device is stolen you want to act in minutes, not after a meeting.', m: ['first-hire'] },
      { t: 'Automatic screen lock after 5 minutes', w: 'The cheapest control there is. Stops shoulder-surfing in cafes and offices.', m: ['30min'] },
      { t: 'A mobile device management (MDM) tool for team laptops', w: 'You cannot enforce security on devices you cannot see. MDM gives you that visibility.', m: ['growth'] },
      { t: 'Keep operating systems and browsers auto-updating', w: 'Most exploits target old, patched software. Auto-updates close the door for you.', m: ['30min'] },
    ],
  },
  {
    id: 'data',
    name: 'Data & Backups',
    tag: 'what you stand to lose',
    items: [
      { t: 'Know where your customer data actually lives (SaaS, cloud, laptops)', w: 'You cannot protect what you have not located. This one list unlocks everything else.', m: ['30min'] },
      { t: 'Backups running automatically, in a separate account/region', w: 'Ransomware and accidental deletion happen. A backup that is not tested is not a backup.', m: ['30min'] },
      { t: 'Test a restore at least once — actually recover a file', w: 'Backups fail silently. The only way to know they work is to use one.', m: ['first-customer'] },
      { t: 'A simple data-classification scheme: Public / Internal / Confidential', w: 'Not everything needs the same protection. Three buckets your team can actually remember.', m: ['first-customer'] },
      { t: 'Encrypt backups at rest', w: 'A backup is a second copy of your crown jewels. It should not be readable by anyone who finds it.', m: ['growth'] },
    ],
  },
  {
    id: 'apps',
    name: 'Applications & Code',
    tag: 'what you build and buy',
    items: [
      { t: 'Inventory of every SaaS tool in use — who pays, who owns, what data', w: 'Shadow IT is how data leaks. A quarterly spreadsheet catches the drift.', m: ['30min'] },
      { t: 'Separate production and development environments', w: 'Testing in prod is how customer data gets exposed. Keep them apart.', m: ['first-customer'] },
      { t: 'Secrets and API keys in a vault, never in code or repos', w: 'A leaked key in a public repo can drain an account in minutes.', m: ['30min'] },
      { t: 'Dependency scanning on your codebase (Dependabot, Snyk)', w: "You ship other people's code. Scanning tells you when a library you use has a hole.", m: ['growth'] },
      { t: 'A documented change process — even a lightweight one', w: 'Unreviewed changes cause outages and breaches. A PR review is a control.', m: ['growth'] },
    ],
  },
  {
    id: 'people',
    name: 'People & Policy',
    tag: 'the rules of the road',
    items: [
      { t: 'A simple Acceptable Use Policy signed at onboarding', w: 'Sets expectations day one. Without it you cannot enforce much later.', m: ['first-hire'] },
      { t: 'Security awareness basics in onboarding (phishing, passwords)', w: 'People are the attack surface. A 20-minute talk prevents most incidents.', m: ['first-hire'] },
      { t: 'A named person accountable for IT/governance', w: 'If everyone owns it, no one does. Name one human, even if it is you.', m: ['30min'] },
      { t: 'A written incident response plan — who calls whom, what to do first', w: 'In a crisis you will not invent a plan. You will follow the one you wrote.', m: ['first-customer'] },
      { t: 'Run a phishing simulation once a quarter', w: 'Training rots. A fake phish tells you who actually clicks.', m: ['growth'] },
    ],
  },
  {
    id: 'vendors',
    name: 'Vendors & Third Parties',
    tag: 'who you trust',
    items: [
      { t: 'A signed data processing agreement (DPA) with any vendor handling customer data', w: 'A contract is how you pass your obligations on. Without it, you keep the liability.', m: ['first-customer'] },
      { t: 'Basic vendor due diligence before onboarding (SOC2 / ISO 27001 / security page)', w: "You inherit your vendor's risks. A 10-minute check is cheap insurance.", m: ['first-customer'] },
      { t: 'A list of vendors with access to production data, reviewed annually', w: 'Access accumulates. A yearly review removes the ones who no longer need it.', m: ['growth'] },
      { t: 'Require MFA on vendor accounts too', w: 'A vendor breach is your breach. Their front door matters as much as yours.', m: ['growth'] },
    ],
  },
  {
    id: 'continuity',
    name: 'Continuity & Compliance',
    tag: 'keeping the lights on',
    items: [
      { t: 'Document your critical services and their owners', w: 'When something breaks at 2am you need to know what matters most and who owns it.', m: ['first-customer'] },
      { t: 'Recovery time objective — how fast must you be back online?', w: 'Every system has a tolerance. Writing it down turns panic into a runbook.', m: ['growth'] },
      { t: 'Know which regulations apply to you (PDPA, GDPR, SOC 2) and why', w: 'Compliance is cheaper when you plan for it than when a customer demands it.', m: ['first-customer'] },
      { t: 'Annual review of this checklist with the team', w: 'Governance drifts. A yearly hour keeps it honest.', m: ['growth'] },
      { t: 'Keep an evidence folder (policies, screenshots, certificates)', w: 'When a customer or auditor asks, you have it ready instead of scrambling.', m: ['growth'] },
    ],
  },
];

export const TOTAL_ITEMS = DATA.reduce((n, s) => n + s.items.length, 0);
