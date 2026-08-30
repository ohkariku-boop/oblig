// A bank of the questions that actually recur across APAC vendor risk
// questionnaires (SIG-style, CAIQ-style, and bank-specific TPRM forms),
// each mapped to the Oblig data source that can answer it.
//
// Deliberately includes questions with NO mapped source (sourceType:
// 'none') — real questionnaires ask things Oblig doesn't collect yet
// (encryption specifics, BCP/DR, security training), and pretending
// otherwise would mean fabricating an answer. The bank names that gap
// honestly rather than silently matching to something loosely related.

export type SourceType = 'checklist' | 'policy' | 'evidence' | 'risk-incidents' | 'compliance-coverage' | 'none';

export interface QuestionnaireQuestion {
  id: string;
  category: string;
  question: string;
  sourceType: SourceType;
  itemKeys?: string[];       // for 'checklist' — one or more DATA item keys
  policyTitleMatch?: string; // for 'policy' — substring match against policy titles
  evidenceTypeMatch?: string; // for 'evidence' — matches EvidenceItem.type
  marketCode?: string;       // for 'compliance-coverage' or market-specific checklist questions
}

export const QUESTIONNAIRE_BANK: QuestionnaireQuestion[] = [
  // Governance & Organization
  { id: 'q1', category: 'Governance', question: 'Does your organization have a named executive responsible for technology and information security risk?', sourceType: 'checklist', itemKeys: ['board-oversight__0'] },
  { id: 'q2', category: 'Governance', question: 'Is there a documented risk appetite statement covering technology and vendor risk?', sourceType: 'checklist', itemKeys: ['board-oversight__1'] },
  { id: 'q3', category: 'Governance', question: 'How frequently is technology and security risk reported to senior management or the board?', sourceType: 'checklist', itemKeys: ['board-oversight__2'] },
  { id: 'q4', category: 'Governance', question: 'Do you have a designated CISO or equivalent security leadership role?', sourceType: 'checklist', itemKeys: ['board-oversight__3'] },
  { id: 'q5', category: 'Governance', question: 'Do you maintain a formal information security policy approved by leadership?', sourceType: 'policy', policyTitleMatch: 'Board Risk Reporting' },

  // Vendor / Third-Party Risk Management
  { id: 'q6', category: 'Vendor Risk', question: 'Do you have a documented process for assessing the risk of your own third-party vendors?', sourceType: 'checklist', itemKeys: ['vendor-due-diligence__0'] },
  { id: 'q7', category: 'Vendor Risk', question: 'Can you provide security evidence (certifications, audit reports, policies) on request within a reasonable timeframe?', sourceType: 'checklist', itemKeys: ['vendor-due-diligence__1'] },
  { id: 'q8', category: 'Vendor Risk', question: 'Do you perform a materiality or criticality assessment of your own vendor relationships?', sourceType: 'checklist', itemKeys: ['vendor-due-diligence__2'] },
  { id: 'q9', category: 'Vendor Risk', question: 'Is a documented Vendor & Third-Party Risk Management policy in place?', sourceType: 'policy', policyTitleMatch: 'Vendor & Third-Party Risk Management' },
  { id: 'q10', category: 'Vendor Risk', question: 'How often do you re-assess your own vendors\' security posture after onboarding?', sourceType: 'checklist', itemKeys: ['ongoing-monitoring__0'] },

  // Subcontracting
  { id: 'q11', category: 'Subcontracting', question: 'Do you maintain a current list of all subcontractors or sub-processors that would handle our data?', sourceType: 'checklist', itemKeys: ['subcontractor__0'] },
  { id: 'q12', category: 'Subcontracting', question: 'Do you obtain customer consent before subcontracting any work involving our data?', sourceType: 'checklist', itemKeys: ['subcontractor__1'] },
  { id: 'q13', category: 'Subcontracting', question: 'Will you notify us, or seek written consent, before adding a new subcontractor?', sourceType: 'checklist', itemKeys: ['subcontractor__2'] },
  { id: 'q14', category: 'Subcontracting', question: 'Are subcontracting terms and scope explicitly defined in your standard vendor contracts?', sourceType: 'checklist', itemKeys: ['subcontractor__3'] },
  { id: 'q15', category: 'Subcontracting', question: 'Do you have a Subcontractor Consent & Outsourcing Register policy in place?', sourceType: 'policy', policyTitleMatch: 'Subcontractor Consent' },

  // Data Security & Residency
  { id: 'q16', category: 'Data Security', question: 'Where is our data physically stored and processed (by country/region)?', sourceType: 'checklist', itemKeys: ['data-residency__0'] },
  { id: 'q17', category: 'Data Security', question: 'Can our data be transferred to, or stored in, a country outside the one we operate in?', sourceType: 'checklist', itemKeys: ['data-residency__2'] },
  { id: 'q18', category: 'Data Security', question: 'What is your cloud security posture, including how the shared-responsibility model is applied?', sourceType: 'checklist', itemKeys: ['data-residency__1'] },
  { id: 'q19', category: 'Data Security', question: 'Do you have a documented Data Residency & Cross-Border Transfer policy?', sourceType: 'policy', policyTitleMatch: 'Data Residency' },
  { id: 'q20', category: 'Data Security', question: 'Is data encrypted at rest and in transit, and how are encryption keys managed?', sourceType: 'none' },
  { id: 'q21', category: 'Data Security', question: 'Do you have a documented data classification and retention/disposal policy?', sourceType: 'none' },
  { id: 'q22', category: 'Data Security', question: 'Describe your access control model, including multi-factor authentication and least-privilege enforcement.', sourceType: 'none' },

  // Cybersecurity Controls
  { id: 'q23', category: 'Cybersecurity', question: 'Do you have a vulnerability management and patch management program?', sourceType: 'checklist', itemKeys: ['ongoing-monitoring__1'] },
  { id: 'q24', category: 'Cybersecurity', question: 'Do you perform regular penetration testing? At what frequency?', sourceType: 'checklist', itemKeys: ['ongoing-monitoring__2'] },
  { id: 'q25', category: 'Cybersecurity', question: 'Do you have centralized logging (SIEM or equivalent) with a defined retention period?', sourceType: 'checklist', itemKeys: ['ongoing-monitoring__3'] },
  { id: 'q26', category: 'Cybersecurity', question: 'Do you have documented network security architecture and controls (firewalls, segmentation)?', sourceType: 'none' },
  { id: 'q27', category: 'Cybersecurity', question: 'Do you provide regular security awareness training to employees?', sourceType: 'none' },
  { id: 'q28', category: 'Cybersecurity', question: 'Do you have a Vulnerability & Penetration Testing policy in place?', sourceType: 'policy', policyTitleMatch: 'Vulnerability' },
  { id: 'q29', category: 'Cybersecurity', question: 'Do you have a documented Access Control & Privileged Access policy?', sourceType: 'policy', policyTitleMatch: 'Access Control' },

  // Incident Management
  { id: 'q30', category: 'Incident Management', question: 'Do you have a documented and tested incident response plan?', sourceType: 'checklist', itemKeys: ['incident-notification__0'] },
  { id: 'q31', category: 'Incident Management', question: 'What are your incident notification timelines to customers and regulators?', sourceType: 'checklist', itemKeys: ['incident-notification__1'] },
  { id: 'q32', category: 'Incident Management', question: 'Has your incident response plan been tested via tabletop exercise or simulation?', sourceType: 'checklist', itemKeys: ['incident-notification__2'] },
  { id: 'q33', category: 'Incident Management', question: 'Have you experienced any security incidents or data breaches in the past 12 months?', sourceType: 'risk-incidents' },
  { id: 'q34', category: 'Incident Management', question: 'Do you have a formal Incident Notification policy covering regulator-specific SLAs?', sourceType: 'policy', policyTitleMatch: 'Incident Notification' },

  // Business Continuity & Exit
  { id: 'q35', category: 'Continuity', question: 'Do you have a documented business continuity and disaster recovery plan?', sourceType: 'none' },
  { id: 'q36', category: 'Continuity', question: 'What is your exit or offboarding process if this relationship ends?', sourceType: 'checklist', itemKeys: ['concentration-risk__0'] },
  { id: 'q37', category: 'Continuity', question: 'Is our data portable and returnable to us upon contract termination?', sourceType: 'checklist', itemKeys: ['concentration-risk__1'] },
  { id: 'q38', category: 'Continuity', question: 'Do you have a Business Continuity & Exit Planning policy in place?', sourceType: 'policy', policyTitleMatch: 'Business Continuity' },

  // Compliance & Certifications
  { id: 'q39', category: 'Compliance', question: 'Which regulatory frameworks or certifications does your organization currently address?', sourceType: 'compliance-coverage' },
  { id: 'q40', category: 'Compliance', question: 'Are you positioned to meet MAS Technology Risk Management (TRM) requirements?', sourceType: 'compliance-coverage', marketCode: 'SG' },
  { id: 'q41', category: 'Compliance', question: 'Are you positioned to meet Bank Negara Malaysia RMiT requirements?', sourceType: 'compliance-coverage', marketCode: 'MY' },
  { id: 'q42', category: 'Compliance', question: 'Do you hold ISO 27001, SOC 2, or an equivalent independent certification?', sourceType: 'evidence', evidenceTypeMatch: 'certificate' },
  { id: 'q43', category: 'Compliance', question: 'Can you provide your latest independent audit or penetration test report?', sourceType: 'evidence', evidenceTypeMatch: 'audit' },
  { id: 'q44', category: 'Compliance', question: 'Do you maintain a one-page outsourcing summary suitable for our regulatory register?', sourceType: 'checklist', itemKeys: ['outsourcing-register__0'] },
  { id: 'q45', category: 'Compliance', question: 'Does your contract support audit rights and inspection access by us or our regulator?', sourceType: 'checklist', itemKeys: ['outsourcing-register__1'] },

  // AI / ML Governance
  { id: 'q46', category: 'AI Governance', question: 'Do you use AI or machine learning in your product or service delivery? If so, where?', sourceType: 'checklist', itemKeys: ['ai-governance__0'] },
  { id: 'q47', category: 'AI Governance', question: 'Do you have documented AI governance principles covering fairness, ethics, and accountability?', sourceType: 'checklist', itemKeys: ['ai-governance__1'] },
  { id: 'q48', category: 'AI Governance', question: 'Is human oversight in place for any AI-driven decision that affects a customer?', sourceType: 'checklist', itemKeys: ['ai-governance__2'] },
  { id: 'q49', category: 'AI Governance', question: 'Do you have a documented AI model lifecycle process (development, validation, deployment, monitoring)?', sourceType: 'checklist', itemKeys: ['ai-governance__3'] },
  { id: 'q50', category: 'AI Governance', question: 'Do you maintain an AI Governance & Model Risk policy?', sourceType: 'policy', policyTitleMatch: 'AI Governance' },
];

export const QUESTIONNAIRE_CATEGORIES = Array.from(new Set(QUESTIONNAIRE_BANK.map(q => q.category)));
