# Weekly APAC regulatory intelligence (Oblig)

Automated weekly scan for **technology governance** updates that affect fintechs selling into regulated financial institutions in APAC:

- Technology risk / TRM / cyber  
- Data residency, cross-border transfer, cloud  
- Vendor / outsourcing **technology** risk  
- AI governance for financial services  

**Out of scope for Oblig:** pure payments licensing, e-money/scheme rules, prudential capital/credit, product conduct, and AML-only updates — unless they specifically impose **technology, data, or AI** control requirements on vendors.

## What this is (and is not)

| This is | This is not |
|---------|-------------|
| A **targeted** weekly sweep of priority regulators + secondary alerts | A full crawl of “the entire internet” |
| Focused on **tech, data, AI, vendor-tech** | A payments or financial-product compliance monitor |
| Primary-source first (notices, guidelines, consultations) | Legal advice or a substitute for counsel |
| Input to checklist / Copilot / deep-dive docs | Automatic product code changes without human review |

## Schedule

- **Cadence:** Every Monday 08:00 Asia/Singapore  
- **Delivery:** Grok Automation `oblig-apac-reg-weekly` (email + app notification)  
- **Owner:** Product (review digest; decide product actions)

## Priority markets

1. **SEA:** Singapore (MAS), Malaysia (BNM), Indonesia (OJK), Philippines (BSP), Cambodia (NBC)  
2. **NE Asia:** Japan (FSA), South Korea (FSC/FSS), Taiwan (FSC)  
3. **Broader Asia:** only if clearly relevant to cross-border FS **technology / data / AI / vendor-tech** obligations

## Topic filters

**Include** an item only if it touches at least one of:

- Technology / cyber / TRM / operational resilience as applied to technology and vendors  
- Outsourcing, third-party / vendor **technology** risk, concentration risk, exit planning  
- Data residency, cross-border transfer, cloud for FS and their vendors  
- AI governance / AI risk management for financial services  
- Incident notification, cyber hygiene, logging, secure SDLC, access control (tech-vendor angle)  
- Anything that would change a bank/insurer/payment institution **security, data, AI, or outsourcing-tech** questionnaire  

**Exclude:** pure payments licensing, scheme/interchange rules, pure prudential or product rules with no tech/data/AI content. If an instrument mixes both, extract only the tech/data/AI portions.

## Primary sources (starting points)

| Market | Regulator | Typical entry points |
|--------|-----------|----------------------|
| SG | MAS | mas.gov.sg — guidelines, notices, consultations |
| MY | BNM | bnm.gov.my — policy documents, RMiT-related |
| ID | OJK | ojk.go.id |
| PH | BSP | bsp.gov.ph — circulars, memoranda |
| KH | NBC | nbc.gov.kh |
| JP | FSA | fsa.go.jp |
| KR | FSC / FSS | fsc.go.kr |
| TW | FSC | fsc.gov.tw |

Secondary: reputable law-firm and Big Four APAC FS **tech-risk or AI** alerts when the primary PDF is hard to reach.

## Human review loop

After each Monday digest:

1. Mark each item: **update checklist** / **update Copilot knowledge** / **update deep-dive doc** / **monitor only** / **no action**  
2. If checklist or Copilot prompts change, ship via normal PR — do not auto-merge from the digest  
3. File lasting research in `docs/vendor-risk-deep-dive.md` or `docs/ai-governance-deep-dive.md`  

## Limits

- Quiet weeks on tech governance are normal; “nothing material” is a valid output  
- Consultations can move without English press coverage — prefer regulator sites  
- Effective dates and transition periods matter more than headlines  
