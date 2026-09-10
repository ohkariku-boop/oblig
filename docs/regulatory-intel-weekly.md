# Weekly APAC regulatory intelligence (Oblig)

Automated weekly scan for technology risk, vendor/outsourcing, data residency, and AI governance updates that affect fintechs selling into regulated financial institutions in APAC.

## What this is (and is not)

| This is | This is not |
|---------|-------------|
| A **targeted** weekly sweep of priority regulators + secondary alerts | A full crawl of “the entire internet” |
| Primary-source first (notices, guidelines, consultations) | Legal advice or a substitute for counsel |
| Input to checklist / Copilot / deep-dive docs | Automatic product code changes without human review |

## Schedule

- **Cadence:** Every Monday 08:00 Asia/Singapore  
- **Delivery:** Grok Automation `oblig-apac-reg-weekly` (email + app notification)  
- **Owner:** Product (review digest; decide product actions)

## Priority markets

1. **SEA:** Singapore (MAS), Malaysia (BNM), Indonesia (OJK), Philippines (BSP), Cambodia (NBC)  
2. **NE Asia:** Japan (FSA), South Korea (FSC/FSS), Taiwan (FSC)  
3. **Broader Asia:** only if clearly relevant to cross-border FS vendor risk, data residency, outsourcing, or AI in finance

## Topic filters

Include an item only if it touches at least one of:

- Technology / cyber / TRM / operational risk (FI or vendors)
- Outsourcing, third-party / vendor risk, concentration risk
- Data residency, cross-border transfer, cloud for FS
- AI governance / AI risk management for financial services
- Incident notification timelines, cyber hygiene baselines
- Anything that would change a bank/insurer/payment institution vendor questionnaire

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

Secondary: reputable law-firm and Big Four APAC FS regulatory alerts when the primary PDF is hard to reach.

## Human review loop

After each Monday digest:

1. Mark each item: **update checklist** / **update Copilot knowledge** / **update deep-dive doc** / **monitor only** / **no action**
2. If checklist or Copilot prompts change, ship via normal PR — do not auto-merge from the digest
3. File lasting research in `docs/vendor-risk-deep-dive.md` or `docs/ai-governance-deep-dive.md`

## Limits

- Quiet weeks are normal; “nothing material” is a valid output  
- Consultations can move without English press coverage — prefer regulator sites  
- Effective dates and transition periods matter more than headlines
