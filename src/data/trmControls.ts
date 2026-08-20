// Real control domains per framework, sourced directly from
// docs/vendor-risk-deep-dive.md and docs/ai-governance-deep-dive.md.
// Replaces the placeholder A.1-A.8 generic control set previously shown
// on every framework regardless of which one was selected.

export interface TrmControl {
  id: string;
  name: string;
  description: string;
}

export const TRM_CONTROLS: Record<string, TrmControl[]> = {
  'mas-trm': [
    { id: '1', name: 'Board & Senior Management Oversight', description: 'Clear risk appetite, regular risk reporting to leadership.' },
    { id: '2', name: 'Risk Identification, Evaluation & Treatment', description: 'A maintained, living risk register, not a point-in-time document.' },
    { id: '3', name: 'Secure SDLC', description: 'Secure coding, security testing, and change approval built into delivery.' },
    { id: '4', name: 'Access Controls', description: 'Strong authentication (MFA), privileged access management, regular access reviews.' },
    { id: '5', name: 'Data Security', description: 'Classification, encryption, and key management.' },
    { id: '6', name: 'Cybersecurity Controls', description: 'Network security, threat monitoring, incident response, vulnerability management.' },
    { id: '7', name: 'Third-Party / Vendor Risk Management', description: 'Due diligence, continuous monitoring, resilience against vendor failure.' },
    { id: '8', name: 'Concentration Risk', description: 'Over-reliance on a single vendor, and exit planning if it fails.' },
    { id: '9', name: 'Cloud-Specific Requirements', description: 'Data residency, shared responsibility model, cloud security posture management.' },
    { id: '10', name: 'Incident Notification', description: '1-hour notification to MAS for severe-impact incidents; 14-day root-cause report.' },
  ],
  'bnm-rmit': [
    { id: 'D10', name: 'Cybersecurity Risk Management', description: 'Board-approved cybersecurity policy with designated CISO-level ownership.' },
    { id: 'D11', name: 'Technology Resilience', description: 'System availability, disaster recovery, and resilience testing.' },
    { id: 'GOV', name: 'Governance', description: 'Accountability structure across the technology risk programme.' },
    { id: 'OPS', name: 'Technology Operations', description: '24/7 SOC capability; SIEM with 3-year log retention.' },
    { id: 'TPR', name: 'Third-Party / Cloud Risk', description: 'Vendor and cloud-specific risk assessment and monitoring.' },
    { id: 'AUD', name: 'Technology Audit', description: 'Annual penetration testing and independent review cadence.' },
    { id: 'BCM', name: 'Business Continuity', description: 'Continuity planning specific to technology failure scenarios.' },
  ],
  'ojk-2026': [
    { id: 'GOV', name: 'IT Governance', description: 'Board and management accountability for technology, per POJK 1/2026.' },
    { id: 'RISK', name: 'IT Risk Management', description: 'Risk identification and treatment mirroring elements of EU DORA.' },
    { id: 'CYBER', name: 'Cybersecurity & Cyber Resilience', description: 'Annual self-evaluation on cybersecurity maturity, submitted to OJK.' },
    { id: 'ITSP', name: 'IT Service Provider Engagement', description: 'Due diligence and oversight of outsourced IT providers.' },
    { id: 'RES', name: 'Data / Electronic System Location', description: 'Data residency; in-country hosting for rural/sharia banks is mandatory from Jan 2026.' },
    { id: 'DMA', name: 'Digital Maturity Assessment', description: 'Periodic maturity self-assessment reported to OJK.' },
    { id: 'FSTI', name: 'FSTI Governance (fintech platforms)', description: 'POJK 30/2025 — governance and risk practices for fintech innovation platforms.' },
  ],
  'bsp-808': [
    { id: 'IS', name: 'Information Security', description: 'Core security controls per Circular 808.' },
    { id: 'PM', name: 'Project / Development / Change Management', description: 'Controlled software delivery lifecycle.' },
    { id: 'OPS', name: 'IT Operations', description: 'Day-to-day technology operations risk management.' },
    { id: 'OUT', name: 'IT Outsourcing / Vendor Management', description: 'Materiality-tested vendor risk under the SAFr framework (Circular 1137).' },
    { id: 'EBANK', name: 'Electronic Banking / Payments / E-Money', description: 'Channel-specific controls for digital financial services.' },
  ],
  'nbc-tcrmg': [
    { id: '1', name: 'Information Technology Guidance', description: 'Baseline IT governance direction from NBC.' },
    { id: '2', name: 'IT Governance Policy & Procedures', description: 'Board-approved policy framework.' },
    { id: '3', name: 'Information Security Policy & Procedures', description: 'Documented security controls, commonly mapped to NIST CSF as a translation layer.' },
    { id: '4', name: 'IT Services Outsourcing', description: 'Vendor oversight for outsourced technology services.' },
    { id: '5', name: 'Information Security Audit', description: 'Independent review of the security programme.' },
    { id: '6', name: 'Payment Card Security', description: 'Controls specific to card and payment-rail security.' },
  ],
  'fsa-cyber': [
    { id: '1', name: 'Cybersecurity Management Systems', description: 'Governance structure for the cybersecurity programme.' },
    { id: '2', name: 'Identification of Cybersecurity Risks', description: 'Systematic risk identification across 176 discrete response items.' },
    { id: '3', name: 'Protection Against Cyberattacks', description: 'Preventive technical and organisational controls.' },
    { id: '4', name: 'Detection of Cyberattacks', description: 'Monitoring and detection capability.' },
    { id: '5', name: 'Response & Recovery', description: 'Incident response and post-incident recovery process.' },
    { id: '6', name: 'Third-Party Risk Management', description: 'Vendor risk classification, concentration risk, exit strategy — an area FSA is actively studying against Western TPRM models.' },
  ],
  'efta-kr': [
    { id: 'GATE', name: 'Licensing-Status Gate', description: 'EFTA obligations apply based on formal financial licensing status, not just function — check this first.' },
    { id: 'GOV', name: 'IT Governance & Controls', description: 'Internal control obligations under EFTA Articles 39/51.' },
    { id: 'PIPA', name: 'PIPA (Data Protection)', description: 'General personal data protection obligations, applies alongside EFTA.' },
    { id: 'CIUPA', name: 'CIUPA (Credit Information)', description: 'Heavier bar for any vendor handling credit information specifically.' },
  ],
  'fsc-outsourcing-tw': [
    { id: 'PRE', name: 'Pre-Outsourcing Security Analysis', description: 'Thorough planning and risk analysis before any outsourcing begins.' },
    { id: 'SEL', name: 'Vendor Assessment & Selection', description: 'Selection based on demonstrated security capability.' },
    { id: 'CTR', name: 'Contractual Cybersecurity Provisions', description: 'Explicit security terms required in every outsourcing contract.' },
    { id: 'ONG', name: 'Ongoing Security Principles', description: 'Security obligations maintained through the full contract term (Article 7).' },
    { id: 'SUB', name: 'Subcontractor Consent', description: 'Written consent required before any subcontracting; strictest regionally on this point.' },
  ],
  // AI governance track
  'mas-ai-feat': [
    { id: 'F', name: 'Fairness', description: 'AI/ML outcomes tested for unfair bias against customers.' },
    { id: 'E', name: 'Ethics', description: 'Ethical use principles applied to customer-facing AI decisions.' },
    { id: 'A', name: 'Accountability', description: 'A named owner accountable for each AI system\'s outcomes.' },
    { id: 'T', name: 'Transparency', description: 'Customers can understand when and how AI affects them.' },
  ],
  'bnm-ai': [
    { id: '1', name: 'AI Risk Identification', description: 'Emerging discussion-paper stage; identify where AI/ML is used in the product.' },
    { id: '2', name: 'Industry Framework Alignment', description: 'AICB industry framework as the current reference point.' },
  ],
  'ojk-ai': [
    { id: '1', name: 'Development', description: 'Stage 1 of the 8-stage AI governance lifecycle.' },
    { id: '2', name: 'Validation', description: 'Pre-deployment testing and validation of AI models.' },
    { id: '3', name: 'Deployment', description: 'Controlled rollout of AI systems into production.' },
    { id: '4', name: 'Monitoring', description: 'Ongoing performance and drift monitoring post-deployment.' },
  ],
  'bsp-stars': [
    { id: '1', name: 'AI Use Disclosure', description: 'Document what AI/ML is used and where, per Memorandum M-2026-031.' },
    { id: '2', name: 'Governance Structure', description: 'Accountability structure for AI-driven decisions.' },
  ],
  'fsa-ai': [
    { id: '1', name: 'Frontier AI Risk Awareness', description: 'Active working group topic as of mid-2026; track short-term measures guidance.' },
    { id: '2', name: 'Third-Party AI Risk', description: 'Extends FSA\'s broader third-party risk management focus to AI vendors specifically.' },
  ],
  'fsc-ai-kr': [
    { id: '1', name: 'Human Oversight', description: 'Defined human oversight for any AI-driven decision affecting a customer, binding for high-impact use cases.' },
    { id: '2', name: '7-Principle Compliance', description: 'Alignment with FSC\'s 7-principle AI guidelines.' },
  ],
};

export function generateRealControls(frameworkId: string, coverage: number) {
  const list = TRM_CONTROLS[frameworkId];
  if (!list) return [];
  // Deterministic status spread based on real coverage %, applied across
  // the framework's actual domains rather than a fabricated generic set.
  return list.map((c, i) => {
    const threshold = 40 + ((i * 37) % 45); // spreads thresholds across the real domain list
    const status: 'met' | 'partial' | 'missing' =
      coverage >= threshold + 15 ? 'met' : coverage >= threshold - 10 ? 'partial' : 'missing';
    return { id: c.id, name: c.name, description: c.description, status };
  });
}
