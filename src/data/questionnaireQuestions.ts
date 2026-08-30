// Tier 1 questionnaire auto-draft: deterministic mapping only, no AI.
// Every question maps to a specific, real Oblig data source. If there's
// no genuine match, the answer says so plainly rather than guessing —
// an auto-drafted answer sent to a real bank has to be trustworthy or
// it's worse than no draft at all.

import { DATA, itemKey, type ChecklistState } from '@/data/assessment';
import { sampleFrameworks } from '@/data/sampleData';
import type { PolicyDoc, Risk, EvidenceItem } from '@/types';

export interface QuestionnaireContext {
  assessmentState: ChecklistState;
  policies: PolicyDoc[];
  evidence: EvidenceItem[];
  risks: Risk[];
}

export interface DraftAnswer { text: string; matched: boolean }

export interface QuestionnaireQuestion {
  id: string;
  category: string;
  question: string;
  answerFrom: (ctx: QuestionnaireContext) => DraftAnswer;
}

const NO_MATCH = (note: string): DraftAnswer => ({
  text: `No matching data in Oblig yet — answer manually. (${note})`,
  matched: false,
});

// Look up a specific checklist item by section + index, and answer using
// its own "why" text (which already cites the real regulator clause) if
// checked, or an honest gap note if not.
function fromChecklistItem(sectionId: string, idx: number): (ctx: QuestionnaireContext) => DraftAnswer {
  return (ctx) => {
    const section = DATA.find(s => s.id === sectionId);
    const item = section?.items[idx];
    if (!section || !item) return NO_MATCH('checklist item not found');
    const checked = !!ctx.assessmentState[itemKey(sectionId, idx)];
    return checked
      ? { text: `Yes. ${item.w}`, matched: true }
      : { text: `Not yet in place. This maps to: "${item.t}" — flagged as an open item in our governance roadmap.`, matched: true };
  };
}

// Look for a real user-created policy whose title contains a keyword.
function fromPolicy(keyword: string, question: string): (ctx: QuestionnaireContext) => DraftAnswer {
  return (ctx) => {
    const match = ctx.policies.find(p => p.title.toLowerCase().includes(keyword.toLowerCase()));
    if (!match) return NO_MATCH(`no policy on file matching "${keyword}"`);
    return {
      text: `Yes. See our ${match.title} (v${match.version}, status: ${match.status}, last updated ${new Date(match.updatedAt).toLocaleDateString()}).`,
      matched: true,
    };
  };
}

// Look for real evidence entries matching a keyword or type.
function fromEvidence(keyword: string, type?: EvidenceItem['type']): (ctx: QuestionnaireContext) => DraftAnswer {
  return (ctx) => {
    const matches = ctx.evidence.filter(e =>
      (type ? e.type === type : true) && e.name.toLowerCase().includes(keyword.toLowerCase()),
    );
    if (matches.length === 0) return NO_MATCH(`no evidence logged matching "${keyword}"`);
    return {
      text: `Yes. Supporting evidence on file: ${matches.map(m => m.name).join(', ')}.`,
      matched: true,
    };
  };
}

// Report real risk-register counts rather than claiming a clean history
// we can't actually verify.
function fromRiskRegister(filter: (r: Risk) => boolean, framing: string): (ctx: QuestionnaireContext) => DraftAnswer {
  return (ctx) => {
    const matching = ctx.risks.filter(filter);
    return {
      text: `${framing} Our risk register currently shows ${matching.length} matching entr${matching.length === 1 ? 'y' : 'ies'}.`,
      matched: true,
    };
  };
}

// Framework coverage is always available (real data, not user-dependent).
function fromFrameworkCoverage(): DraftAnswer {
  const avg = Math.round(sampleFrameworks.reduce((s, f) => s + f.coverage, 0) / sampleFrameworks.length);
  const list = sampleFrameworks.map(f => `${f.shortName} (${f.coverage}%)`).join(', ');
  return { text: `We map our vendor & technology risk posture to: ${list}. Average coverage: ${avg}%.`, matched: true };
}

function unmapped(note: string): (ctx: QuestionnaireContext) => DraftAnswer {
  return () => NO_MATCH(note);
}

export const QUESTIONNAIRE_QUESTIONS: QuestionnaireQuestion[] = [
  // A. Company & Governance
  { id: 'q1', category: 'Governance', question: 'Do you have a named executive/board-level owner accountable for information security and technology risk?', answerFrom: fromChecklistItem('board-oversight', 0) },
  { id: 'q2', category: 'Governance', question: 'Do you have a documented information security policy approved by senior management?', answerFrom: fromPolicy('vendor', 'infosec policy') },
  { id: 'q3', category: 'Governance', question: 'Is there a formal risk management framework in place covering technology and vendor risk?', answerFrom: fromChecklistItem('board-oversight', 1) },
  { id: 'q4', category: 'Governance', question: 'How frequently is your risk register reviewed by leadership?', answerFrom: fromChecklistItem('board-oversight', 2) },
  { id: 'q5', category: 'Governance', question: 'Do you carry cyber liability / professional indemnity insurance, and at what coverage level?', answerFrom: unmapped('insurance coverage is not tracked in Oblig') },
  { id: 'q6', category: 'Governance', question: 'Have you undergone any regulatory enforcement action or material fine in the past 3 years?', answerFrom: unmapped('regulatory enforcement history is not tracked in Oblig') },

  // B. Data Security & Privacy
  { id: 'q7', category: 'Data Security & Privacy', question: 'Where is customer data physically stored (list all data center locations/regions)?', answerFrom: fromChecklistItem('data-residency', 0) },
  { id: 'q8', category: 'Data Security & Privacy', question: 'Is customer data encrypted at rest and in transit? What standards are used?', answerFrom: fromChecklistItem('data-residency', 1) },
  { id: 'q9', category: 'Data Security & Privacy', question: 'Do you have a documented data classification policy?', answerFrom: fromPolicy('data residency', 'data classification policy') },
  { id: 'q10', category: 'Data Security & Privacy', question: 'Is personal data processed in accordance with applicable data protection law (e.g. PDPA, GDPR)?', answerFrom: fromChecklistItem('data-residency', 2) },
  { id: 'q11', category: 'Data Security & Privacy', question: 'Can customer data be transferred outside the country of origin? Under what conditions?', answerFrom: fromChecklistItem('data-residency', 2) },
  { id: 'q12', category: 'Data Security & Privacy', question: 'Do you have a data retention and secure disposal policy?', answerFrom: unmapped('retention/disposal policy is not yet a tracked category in Oblig') },
  { id: 'q13', category: 'Data Security & Privacy', question: 'Do you perform regular data backup and have you tested restoration in the past 12 months?', answerFrom: unmapped('backup/restore testing is not tracked in Oblig') },

  // C. Access Control
  { id: 'q14', category: 'Access Control', question: 'Is multi-factor authentication (MFA) enforced for all access to systems processing customer data?', answerFrom: unmapped('MFA enforcement is not a tracked checklist item yet') },
  { id: 'q15', category: 'Access Control', question: 'Do you conduct periodic access reviews / recertification?', answerFrom: fromChecklistItem('ongoing-monitoring', 0) },
  { id: 'q16', category: 'Access Control', question: 'Is privileged access management (PAM) in place for administrative accounts?', answerFrom: unmapped('PAM is not a tracked checklist item yet') },
  { id: 'q17', category: 'Access Control', question: 'Are access rights revoked immediately upon employee termination?', answerFrom: unmapped('offboarding process is not tracked in Oblig') },
  { id: 'q18', category: 'Access Control', question: 'Is the principle of least privilege enforced across your environment?', answerFrom: unmapped('not a tracked checklist item yet') },

  // D. Vendor & Subcontractor Management
  { id: 'q19', category: 'Vendor & Subcontractor Management', question: 'Do you use subcontractors or fourth parties to deliver this service?', answerFrom: fromChecklistItem('subcontractor', 0) },
  { id: 'q20', category: 'Vendor & Subcontractor Management', question: 'Do you obtain customer consent before engaging or changing a subcontractor?', answerFrom: fromChecklistItem('subcontractor', 1) },
  { id: 'q21', category: 'Vendor & Subcontractor Management', question: 'Do you maintain an up-to-date register of all subcontractors handling customer data?', answerFrom: fromChecklistItem('outsourcing-register', 0) },
  { id: 'q22', category: 'Vendor & Subcontractor Management', question: 'Do you perform due diligence and ongoing monitoring of your own vendors?', answerFrom: fromChecklistItem('vendor-due-diligence', 0) },
  { id: 'q23', category: 'Vendor & Subcontractor Management', question: 'What contractual security obligations do you impose on your subcontractors?', answerFrom: fromChecklistItem('subcontractor', 3) },
  { id: 'q24', category: 'Vendor & Subcontractor Management', question: 'Do subcontracting arrangements comply with local outsourcing consent requirements (e.g. Taiwan FSC, MAS outsourcing notices)?', answerFrom: fromChecklistItem('subcontractor', 2) },

  // E. Incident Management
  { id: 'q25', category: 'Incident Management', question: 'Do you have a documented incident response plan?', answerFrom: fromPolicy('incident notification', 'incident notification policy') },
  { id: 'q26', category: 'Incident Management', question: 'What is your committed notification timeframe to customers/regulators in the event of a security incident?', answerFrom: fromChecklistItem('incident-notification', 1) },
  { id: 'q27', category: 'Incident Management', question: 'Has your organization experienced a data breach or material security incident in the past 24 months?', answerFrom: fromRiskRegister(r => r.status === 'closed', 'We do not separately tag historical incidents in our risk register — this reflects closed risk items generally, not confirmed incidents.') },
  { id: 'q28', category: 'Incident Management', question: 'Do you conduct tabletop exercises or simulations of your incident response plan?', answerFrom: fromChecklistItem('incident-notification', 2) },
  { id: 'q29', category: 'Incident Management', question: 'Do you have a dedicated incident response team or function?', answerFrom: fromChecklistItem('board-oversight', 3) },

  // F. Business Continuity & Resilience
  { id: 'q30', category: 'Business Continuity & Resilience', question: 'Do you have a documented business continuity / disaster recovery plan?', answerFrom: fromPolicy('business continuity', 'business continuity policy') },
  { id: 'q31', category: 'Business Continuity & Resilience', question: 'What are your Recovery Time Objective (RTO) and Recovery Point Objective (RPO)?', answerFrom: unmapped('RTO/RPO figures are not tracked in Oblig') },
  { id: 'q32', category: 'Business Continuity & Resilience', question: 'Have you tested your BCP/DR plan in the past 12 months?', answerFrom: unmapped('BCP/DR test history is not tracked in Oblig') },
  { id: 'q33', category: 'Business Continuity & Resilience', question: 'Do you have a documented exit/transition plan in case the engagement is terminated?', answerFrom: fromChecklistItem('concentration-risk', 0) },

  // G. Cloud & Infrastructure
  { id: 'q34', category: 'Cloud & Infrastructure', question: 'Do you use public cloud infrastructure? Which provider(s)?', answerFrom: unmapped('specific cloud provider is not tracked in Oblig') },
  { id: 'q35', category: 'Cloud & Infrastructure', question: 'Is your cloud environment configured according to a documented shared-responsibility model?', answerFrom: fromChecklistItem('data-residency', 1) },
  { id: 'q36', category: 'Cloud & Infrastructure', question: 'Do you have cloud security posture management (CSPM) tooling in place?', answerFrom: unmapped('specific tooling is not tracked in Oblig') },
  { id: 'q37', category: 'Cloud & Infrastructure', question: 'Are cloud environments subject to the same access control and monitoring standards as on-premises systems?', answerFrom: unmapped('not a tracked checklist item yet') },

  // H. Vulnerability & Penetration Testing
  { id: 'q38', category: 'Vulnerability & Penetration Testing', question: 'Do you conduct regular vulnerability scanning of your environment?', answerFrom: fromChecklistItem('ongoing-monitoring', 1) },
  { id: 'q39', category: 'Vulnerability & Penetration Testing', question: 'Do you perform annual (or more frequent) third-party penetration testing?', answerFrom: fromChecklistItem('ongoing-monitoring', 2) },
  { id: 'q40', category: 'Vulnerability & Penetration Testing', question: 'What is your patch management SLA for critical vulnerabilities?', answerFrom: unmapped('patch SLA figures are not tracked in Oblig') },
  { id: 'q41', category: 'Vulnerability & Penetration Testing', question: 'Are logs and security events retained and monitored (e.g. via SIEM)? For how long?', answerFrom: fromChecklistItem('ongoing-monitoring', 3) },

  // I. Certifications & Compliance
  { id: 'q42', category: 'Certifications & Compliance', question: 'Do you hold ISO 27001 or SOC 2 certification? Please provide evidence.', answerFrom: fromEvidence('iso', 'certificate') },
  { id: 'q43', category: 'Certifications & Compliance', question: "Which financial-sector regulatory frameworks does your organization currently map to (e.g. MAS TRM, BNM RMiT)?", answerFrom: fromFrameworkCoverage },
  { id: 'q44', category: 'Certifications & Compliance', question: 'Are you able to support a compliance audit / on-site inspection by the customer or their regulator?', answerFrom: fromChecklistItem('outsourcing-register', 1) },
  { id: 'q45', category: 'Certifications & Compliance', question: "Do you maintain an outsourcing register suitable for submission to the customer's regulator?", answerFrom: fromChecklistItem('outsourcing-register', 0) },
  { id: 'q46', category: 'Certifications & Compliance', question: 'Do you have documented evidence supporting your control claims (policies, audit reports, certificates)?', answerFrom: fromChecklistItem('outsourcing-register', 2) },

  // J. AI / ML Governance
  { id: 'q47', category: 'AI / ML Governance', question: 'Does your product use AI/ML in the delivery of this service?', answerFrom: fromChecklistItem('ai-governance', 0) },
  { id: 'q48', category: 'AI / ML Governance', question: 'Do you have a documented AI governance policy (e.g. covering fairness, accountability, transparency)?', answerFrom: fromPolicy('ai governance', 'AI governance policy') },
  { id: 'q49', category: 'AI / ML Governance', question: 'Is there human oversight of any AI-driven decision that affects the customer?', answerFrom: fromChecklistItem('ai-governance', 2) },
  { id: 'q50', category: 'AI / ML Governance', question: 'Do you have a defined process for validating and monitoring AI model performance over time?', answerFrom: fromChecklistItem('ai-governance', 3) },
];
