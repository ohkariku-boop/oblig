# ISO 27001:2022 ↔ Oblig checklist (short crosswalk)

**Purpose:** Show how Oblig’s APAC tech-governance checklist relates to ISO/IEC 27001:2022 Annex A — without treating ISO as a substitute for MAS, BNM, OJK, BSP, NBC, FSA, or FSC expectations.

**Positioning:** ISO 27001 is a useful **baseline ISMS** and sales evidence pack. APAC financial regulators and FI vendor questionnaires add **market-specific** bars (notification timers, residency, outsourcing materiality, AI lifecycle). Oblig prioritises those bars; this crosswalk only maps **themes**.

ISO 27001:2022 Annex A is organised in four themes (93 controls): **Organizational**, **People**, **Physical**, **Technological**.

---

## Section → ISO themes (high level)

| Oblig checklist section | Primary ISO 27001:2022 themes / example controls | What ISO does **not** fully cover |
|-------------------------|--------------------------------------------------|-----------------------------------|
| **Board & Senior Management Oversight** | Organizational — leadership, roles, policies (e.g. A.5.1–A.5.4) | Named CISO expectations under BNM RMiT; FI-specific board reporting cadence |
| **Vendor Due Diligence & Onboarding** | Organizational — supplier relationships (A.5.19–A.5.21); Technological — secure development (A.8.25+) | Materiality tests (e.g. BSP SAFr / TW FSC); buyer-specific evidence packs |
| **Ongoing Vendor & Technology Monitoring** | Technological — vulnerability mgmt (A.8.8), monitoring (A.8.16); Organizational — continuous improvement | BNM-style **annual pentest** naming; **3-year SIEM retention** baselines |
| **Subcontractor & Sub-Processor Visibility** | Organizational — ICT supply chain (A.5.21); supplier agreements (A.5.20) | MAS Notices 658/1121 subcontractor diligence; TW prior **written consent** rules |
| **Data Residency & Localization** | Organizational — cloud services (A.5.23); Technological — data protection controls | Hard **in-country** rules (e.g. KH, parts of ID); per-market “can data leave?” answers |
| **Incident Notification & Response** | Organizational / Technological — incident management, continuity-related controls | **MAS 1-hour** severe-incident notice + 14-day RCA; market-specific FI notification chains |
| **Concentration Risk & Exit Planning** | Organizational — supplier relationships; continuity readiness (e.g. A.5.30) | MAS **TPRMG**-direction concentration/exit expectations for FI third parties |
| **Outsourcing Register & Documentation** | Organizational — documented information, supplier inventory discipline | Bank **outsourcing register** formats (e.g. MAS); regulator inspection clauses (e.g. TW) |
| **AI Governance Readiness** | Limited direct Annex A coverage (secure development, access, monitoring help indirectly) | MAS **FEAT** / AI risk guidelines; OJK AI **lifecycle**; KR high-impact AI oversight |

---

## One-line rules for product & Copilot

1. **ISO supports many checklist themes; it does not replace APAC regulator maps.**  
2. If the user has ISO 27001, treat it as **partial evidence**, then point to **remaining APAC-specific gaps**.  
3. Do not claim “ISO compliant ⇒ MAS TRM / BNM RMiT ready.”  
4. Prefer citing **concrete market requirements** (timers, residency, consent) over generic Annex A numbers unless the user asks about ISO.

---

## Suggested answer pattern (Copilot)

> ISO 27001:2022 gives you a solid ISMS baseline (policies, suppliers, access, vuln management, incident process). Oblig’s checklist still asks for APAC-specific items ISO does not define — for example MAS severe-incident notification timing, BNM log-retention/pentest baselines, and data-residency answers by market. Use ISO evidence where it overlaps; close the regulator-specific gaps next.
