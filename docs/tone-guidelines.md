# Oblig tone & copy guidelines

Grounded in **cognitive load theory** (Sweller): working memory is limited. Landing and product copy should minimise *extraneous* load so the reader can spend capacity on the decision that matters — starting the assessment.

## Cognitive load principles we follow

| Load type | What it means here | Do | Don’t |
|-----------|-------------------|-----|--------|
| **Intrinsic** | Governance *is* complex | One idea per sentence; define jargon only when needed | Assume the reader knows MAS TRM / BNM RMiT on first paint |
| **Extraneous** | How we present it | Chunk, scan-friendly labels, one primary CTA | Stack 7 regulator acronyms in the hero subhead |
| **Germane** | Useful mental model building | Map “your problem → our path → outcome” in order | Bury the outcome under feature laundry lists |

### Practical rules

1. **Hero = outcome + who it’s for + time cost.** Not a framework catalogue.
2. **Acronyms after the promise.** “Banks and payment institutions in Singapore, Malaysia, and six other APAC markets” beats listing MAS, BNM, OJK… in the first screen.
3. **One primary action.** Secondary actions (demo, sign in) stay quieter.
4. **Prefer effort over inventory.** “About five minutes” > “31 checklist items.”
5. **Numbers that can drift** use soft forms (`~5 min`, `10+`) or are derived from code.
6. **Scannable structure.** Short paragraphs, clear H2s, numbered steps max 4.
7. **Same words for same things.** Assessment, score, gaps, roadmap — not “questionnaire / scorecard / maturity index” mixed randomly.

## Voice

- **Credible, not corporate.** Written for a busy founder, CIO, or compliance lead who has been burned by generic GRC tools.
- **Specific to APAC buyers.** We name the problem (vendor questionnaires from regulated FIs), not “enterprise security posture.”
- **Plain language first.** Regulator names appear when they add trust, not as decoration.
- **Honest about stage.** Pre-launch / beta claims stay factual; no fake social proof counts.
- **British/Singaporean professional English is fine** (programme, prioritise) if consistent within a page.

### Tone dials

| Dimension | Oblig sits here |
|-----------|-----------------|
| Formal ↔ casual | Professional, slightly direct — not startup-hype |
| Warm ↔ cool | Warm enough to feel human; not playful |
| Bold ↔ cautious | Confident about the gap we fill; careful with legal/regulatory claims |
| Short ↔ long | Short on marketing surfaces; longer allowed in docs and Copilot answers |

## Words we prefer / avoid

| Prefer | Avoid |
|--------|--------|
| Assessment | Audit (unless they mean a real audit) |
| Gaps / readiness | Compliance guaranteed |
| Mapped to [regulator] frameworks | “Fully compliant with MAS” |
| About five minutes | Exactly N questions (when N changes) |
| Banks, insurers, payment institutions | “Enterprises” alone |
| Start free assessment | Get started / Learn more (as primary CTA) |

## A/B testing landing copy

Variants live in `src/data/landingCopy.ts`.

- Assignment: sticky in `localStorage` (`oblig_landing_variant`), overridable with `?v=a` or `?v=b`.
- **Primary metric:** click-through on “Start Free Assessment” (hero + mid-page + footer CTA).
- **Secondary:** scroll to `#how`, open demo modal.
- Keep variants equal on everything except the tested string(s) so results are interpretable.
- Retire losers; don’t let dead variants linger in production longer than a test cycle.

### What to test first (recommended order)

1. Hero headline (category vs outcome-led)
2. Hero subhead (acronym-heavy vs problem-led)
3. Primary CTA label (“Start Free Assessment” vs “See my gaps in 5 minutes”)

## Checklist before shipping marketing copy

- [ ] Can someone understand the offer in under 10 seconds?
- [ ] Is there only one primary CTA above the fold?
- [ ] Are exact counts either stable or softened?
- [ ] Would a non-compliance person know what to do next?
- [ ] Does this match the product they land in after the click?
