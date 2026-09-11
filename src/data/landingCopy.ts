/**
 * Landing page copy variants for A/B tests.
 * See docs/tone-guidelines.md for theory, tone rules, and test process.
 *
 * Positioning: Oblig is a **fintech technology governance platform**
 * (tech risk, data, AI) for APAC fintechs who need a clear current posture —
 * whether for internal leadership, board readiness, or vendor due diligence
 * when selling into regulated FIs. Not payments-licensing compliance.
 *
 * Assignment: localStorage key oblig_landing_variant, override with ?v=a|b
 */

export type LandingVariantId = 'a' | 'b';

export interface LandingHeroCopy {
  badge: string;
  headline: string;
  headlineAccent: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  trustLine1: string;
  trustLine2: string;
  /** Soft currency line — not a headline, not dated circulars */
  trustLine3: string;
}

export interface LandingCopy {
  id: LandingVariantId;
  label: string;
  hypothesis: string;
  hero: LandingHeroCopy;
  featuresTitle: string;
  featuresSub: string;
  howTitle: string;
  howSub: string;
  ctaTitle: string;
}

/** Control — platform + posture first; FI questionnaires as proof of usefulness */
export const landingVariantA: LandingCopy = {
  id: 'a',
  label: 'Control — platform + posture',
  hypothesis:
    'Framing Oblig as a fintech tech-governance platform (know your posture) broadens ICP beyond “selling into FIs” while keeping APAC regulators as the credibility anchor.',
  hero: {
    badge: 'Tech, data & AI governance — ten APAC markets',
    headline: 'Know your tech governance posture',
    headlineAccent: 'before the gap costs you',
    subhead:
      'Measure technology risk, data handling, and AI controls against the frameworks that shape APAC financial services — for fintechs building their own bar, and for those selling into banks, insurers, and payment institutions.',
    primaryCta: 'See my current posture',
    secondaryCta: 'Watch interactive demo',
    trustLine1: 'About 5 minutes',
    trustLine2: '10 APAC markets',
    trustLine3: 'Updated as APAC guidance moves',
  },
  featuresTitle: 'A governance programme you can actually run',
  featuresSub:
    'From a clear score today to policies, risks, and a roadmap — built for fintech operators, not a six-month GRC rollout.',
  howTitle: 'From “we think we’re fine” to a measured plan',
  howSub: 'No consultants required to start. Assess, prioritise, improve, and re-check as guidelines move.',
  ctaTitle: 'Get a clear view of where you stand',
};

/**
 * Challenger — sharper outcome line; still platform not only “vendor DD”
 */
export const landingVariantB: LandingCopy = {
  id: 'b',
  label: 'Challenger — posture score + dual use',
  hypothesis:
    'Leading with “current posture” and naming both internal use and FI due diligence increases relevance for fintechs who are not mid-RFP.',
  hero: {
    badge: 'Free 5-minute tech governance check',
    headline: 'Your Tech Governance',
    headlineAccent: 'scored and ready to act on',
    subhead:
      'A clear baseline on tech risk, data, and AI — mapped to APAC expectations, not only a generic SOC 2 story. Built for fintechs that want to know where they stand, and for those selling into regulated FIs.',
    primaryCta: 'Get my posture score',
    secondaryCta: 'Watch how it works',
    trustLine1: 'No credit card',
    trustLine2: 'Saves as you go',
    trustLine3: 'Updated as APAC guidance moves',
  },
  featuresTitle: 'Built for how fintechs actually govern technology',
  featuresSub:
    'Measure readiness, close gaps with AI help, and stay aligned with the latest tech, data, and AI guidance across the region.',
  howTitle: 'Four steps to a living governance view',
  howSub: 'Designed for founders, CIOs, and IT leads who need signal this quarter — not a binder next year.',
  ctaTitle: 'Start with your free posture score',
};

export const LANDING_VARIANTS: Record<LandingVariantId, LandingCopy> = {
  a: landingVariantA,
  b: landingVariantB,
};

const STORAGE_KEY = 'oblig_landing_variant';

export function resolveLandingVariant(search: string): LandingCopy {
  if (typeof window === 'undefined') return landingVariantA;

  const params = new URLSearchParams(search);
  const fromQuery = params.get('v')?.toLowerCase();
  if (fromQuery === 'a' || fromQuery === 'b') {
    try {
      localStorage.setItem(STORAGE_KEY, fromQuery);
    } catch {
      /* ignore */
    }
    return LANDING_VARIANTS[fromQuery];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'a' || stored === 'b') return LANDING_VARIANTS[stored];
  } catch {
    /* ignore */
  }

  // Default to variant B (posture + fintechs / selling into FIs)
  const assigned: LandingVariantId = 'b';
  try {
    localStorage.setItem(STORAGE_KEY, assigned);
  } catch {
    /* ignore */
  }
  return LANDING_VARIANTS[assigned];
}
