/**
 * Landing page copy variants for A/B tests.
 * See docs/tone-guidelines.md for theory, tone rules, and test process.
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

/** Control — current product positioning, slightly de-jargonised for load */
export const landingVariantA: LandingCopy = {
  id: 'a',
  label: 'Control — category + markets',
  hypothesis: 'Baseline: clear category and who it’s for; regulators deferred past the first line.',
  hero: {
    badge: 'Free 5-minute governance assessment',
    headline: 'Technology risk & governance',
    headlineAccent: 'for APAC fintechs',
    subhead:
      'See how ready you are for the vendor reviews banks, insurers, and payment institutions actually run — mapped to the frameworks they use across eight APAC markets, not only SOC 2 or ISO 27001.',
    primaryCta: 'Start free assessment',
    secondaryCta: 'Watch interactive demo',
    trustLine1: 'About 5 minutes',
    trustLine2: '8 APAC markets',
  },
  featuresTitle: 'One platform, before you need a consultant',
  featuresSub: 'Turn scattered governance guesswork into a clear programme your leadership can trust.',
  howTitle: 'From uncertainty to a plan in one sitting',
  howSub: 'No consultants, no spreadsheets, no jargon. Oblig meets you where you are and walks you forward.',
  ctaTitle: 'Start governing smarter today',
};

/**
 * Challenger — outcome-led, lower intrinsic load in the hero
 * (problem → time → action; regulator list stays below the fold)
 */
export const landingVariantB: LandingCopy = {
  id: 'b',
  label: 'Challenger — outcome + time',
  hypothesis:
    'Leading with the buyer pain and time cost reduces extraneous load and increases assessment starts vs category-first headline.',
  hero: {
    badge: 'Built for fintechs selling into regulated FIs',
    headline: 'Know your gaps before',
    headlineAccent: 'the questionnaire hits',
    subhead:
      'A short readiness check shows where you stand for APAC vendor due diligence — then a clear plan and AI help to close the gaps. About five minutes to your first score.',
    primaryCta: 'See my gaps in 5 minutes',
    secondaryCta: 'Watch how it works',
    trustLine1: 'No credit card',
    trustLine2: 'Saves as you go',
  },
  featuresTitle: 'Everything you need before the RFP',
  featuresSub: 'Measure readiness, draft what buyers ask for, and prioritise the work that unblocks deals.',
  howTitle: 'Four steps. One afternoon is enough to start.',
  howSub: 'Designed for busy founders and IT leads — not a six-month GRC rollout.',
  ctaTitle: 'Get your readiness score free',
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

  // Sticky random assignment for new visitors
  const assigned: LandingVariantId = Math.random() < 0.5 ? 'a' : 'b';
  try {
    localStorage.setItem(STORAGE_KEY, assigned);
  } catch {
    /* ignore */
  }
  return LANDING_VARIANTS[assigned];
}
