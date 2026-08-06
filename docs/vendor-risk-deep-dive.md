# GRCArc Regional Deep Dive: Governance & Vendor-Risk Readiness for Fintechs Selling into APAC Financial Institutions

**Scope:** Singapore, Malaysia, Indonesia, Philippines, Cambodia, Japan, South Korea, Taiwan
**Purpose:** Ground GRCArc's framework library and scorecard logic in the actual regulatory text financial institutions in each market use to vet their vendors.

---

## 1. The core insight this document supports

Every bank, insurer, or payment institution in these eight markets is legally required to conduct due diligence on its technology vendors and hold them to (roughly) the same technology risk standard it holds itself to. That obligation is what creates GRCArc's market: **fintechs and SaaS vendors selling into these regulated institutions get hit with vendor security questionnaires that map back to these specific national frameworks** — not SOC 2, not ISO 27001 alone. A vendor that can walk into that conversation with a scorecard already mapped to MAS TRM, BNM RMiT, or FSA Cybersecurity Guidelines closes the deal faster than one waving a SOC 2 report and hoping it translates.

None of Vanta, Drata, Secureframe, Sprinto, or Scrut build native mappings to these frameworks. That's the gap.

---

## 2. Singapore — Monetary Authority of Singapore (MAS)

**Core framework:** MAS Technology Risk Management (TRM) Guidelines (first issued 2001, revised January 2021)
**Status:** Non-binding guidelines, but MAS expects proportionate implementation based on size/complexity/risk profile. Sits alongside binding notices.

**Binding instruments that sit next to it:**
- Notice on Cyber Hygiene (**MAS Notice 655 / PSN02**) — prescribes six baseline controls
- **Notice 658** (Banks) and **Notice 1121** (Merchant Banks) on Outsourcing — legally binding, effective **December 11, 2024**
- Guidelines on Outsourcing (Banks) and (Financial Institutions other than Banks)
- Business Continuity Management Guidelines

**What's currently in motion (important for a 2026 build):**
On **March 6, 2026**, MAS published Consultation Paper P004-2026 proposing new **Guidelines on Third-Party Risk Management (TPRMG)**, which will supersede the existing Outsourcing Guidelines. Consultation closed April 20, 2026; final guidelines are pending with an expected 6-month transition. Critically, the new TPRMG will apply to a *broader* set of third-party arrangements than just "outsourcing" — including SaaS subscriptions, data vendors, and intragroup arrangements that currently sit outside scope. This is a live regulatory expansion GRCArc should track and build for now, not retrofit later.

**Core TRM domains to map into GRCArc's scorecard:**
1. Board/senior management oversight — clear risk appetite, regular risk reporting
2. Risk identification, evaluation, and treatment (maintained risk register)
3. Secure SDLC — secure coding, security testing, change approval
4. Access controls — strong authentication (MFA), privileged access management, regular access reviews
5. Data security — classification, encryption, key management
6. Cybersecurity controls — network security, threat monitoring, incident response, vulnerability management
7. **Third-party/vendor risk management** — due diligence, continuous monitoring, BCP resilience despite vendor failure
8. **Concentration risk** — over-reliance on single vendors, exit planning
9. Cloud-specific requirements — data residency, shared responsibility model, cloud security posture management
10. Incident notification — **1-hour notification to MAS** for severe-impact incidents (>4 hours service unavailability or material customer impact), root-cause report within **14 days**

**Vendor-facing implication:** Under Notices 658/1121, banks must maintain and submit an **outsourcing register** to MAS and are required to do due diligence on subcontractors too, not just direct vendors. Customer consent is mandatory for subcontracting that discloses customer information. A vendor selling to a Singapore bank should expect to be asked for evidence across all 10 domains above, plus explicit subcontractor disclosure.

---

## 3. Malaysia — Bank Negara Malaysia (BNM)

**Core framework:** Risk Management in Technology (RMiT) Policy Document (introduced 2019, latest version effective **November 28, 2025**)

**Scope:** Licensed banks, Islamic banks, investment banks, insurers, takaful operators, money services businesses, payment system operators, and Development Financial Institutions (DFIs).

**Structure:** RMiT is organized into domains, most relevant being:
- **Domain 10 — Cybersecurity Risk Management**
- **Domain 11 — Technology Resilience**
- Governance, technology operations, third-party/cloud risk, technology audit, business continuity

**Mandatory baseline controls (from compliance checklists):**
- Board-approved cybersecurity policy
- Designated CISO-level ownership
- 24/7 Security Operations Centre (SOC) capability
- SIEM with **3-year log retention**
- Annual penetration testing
- Multi-factor authentication (mandated in the 2023 cloud-technology update)

**Important 2026 development — a second track just opened up:**
On **March 12, 2026**, BNM issued a separate **Policy Document on Technology Requirements for Payment Services Regulatees** — this is distinct from RMiT and targets non-bank payment players: approved e-money issuers, registered merchant acquirers, licensed money services businesses, and designated payment system operators. Affected entities must submit a **gap analysis and implementation action plan within 90 days** (~June 2026), with full compliance required by **March 12, 2027**.

This matters for GRCArc's positioning: Malaysia now has **two parallel technology-risk tracks** — RMiT for banks/insurers, and this new Payment Services Regulatee policy for the non-bank payments layer. A vendor selling into a Malaysian e-money issuer or PSP will be assessed against the newer, payments-specific document, not RMiT directly. GRCArc's scorecard should distinguish these two tracks explicitly rather than treating "Malaysia" as one framework.

**Vendor-facing implication:** Groups sharing common technology infrastructure must aggregate transaction volumes/values across entities to determine if they cross regulatory thresholds — relevant if your fintech customer operates a multi-entity group structure in Malaysia.

---

## 4. Indonesia — Otoritas Jasa Keuangan (OJK)

**This is the most fragmented (and fastest-moving) regulatory picture in the region right now.** Multiple overlapping regulations apply depending on what kind of institution your customer is.

**For commercial banks:**
- **BOC OJK Regulation No. 1/2026** — took effect **March 1, 2026**, replacing the prior **OJK Circular Letter No. 21/SEOJK.03/2017**. Covers IT governance, IT risk management, cybersecurity/cyber resilience, engagement of IT service providers, data/electronic system location, and digital maturity assessment.
- Underlying it: **OJK Regulation No. 11/POJK.03/2022** (Organisation of IT by Commercial Banks) — the regulation explicitly mirrors elements of the EU's DORA (Digital Operational Resilience Act), including third-party IT risk management and incident reporting.
- **OJK Circular Letter No. 29/SEOJK.03/2022** — Cyber-Resilience and Cybersecurity for Commercial Banks (annual self-evaluation on cybersecurity maturity, submitted to OJK; periodic cybersecurity testing at least annually)
- **OJK Circular Letter No. 24/SEOJK.03/2023** — Digital Maturity Assessment

**For fintech / Financial Sector Technology Innovation (FSTI) platforms:**
- **POJK 30/2025** — Governance and Risk Management Practices for FSTI Platforms, mandated under the P2SK Law (Law No. 4 of 2023). First business plan submission deadline: **November 30, 2026**.
- Separate **Cybersecurity Guidelines for FSTI Providers**, with defined incident-reporting timelines and escalation matrices
- Applies to any entity registered with, or sandboxed by, OJK's technology innovation cluster — a broader net than "licensed bank," and directly relevant to fintech-to-fintech vendor relationships

**For rural/sharia rural banks (a segment often overlooked):**
- New OJK rule (effective **January 2026**) requiring IT governance, improved data management, cyber resilience, disaster recovery, and **mandatory in-country data center location**.

**For non-bank financial institutions generally:**
- **OJK Regulation No. 21/SEOJK.03/2017** — general IT risk management framework requirement
- **OJK Regulation No. 22/POJK.03/2023** — Consumer and Public Protection, which extends accountability for outsourced IT to data privacy and fair-treatment obligations

**Vendor-facing implication:** Indonesian banks retain "ultimate IT risk management" responsibility and must conduct due diligence on outsourced IT — this is explicit and repeated across every version of the regulation. Data localization is a recurring, non-negotiable theme (especially for rural banks and FSTI providers) — any vendor whose infrastructure isn't clearly mappable to in-country hosting options will face friction here regardless of framework sophistication elsewhere.

---

## 5. Philippines — Bangko Sentral ng Pilipinas (BSP)

**Core frameworks:**
- **BSP Circular No. 808** — the foundational IT Risk Management Guidelines, covering: (1) Information security, (2) Project management/development/change management, (3) IT operations, (4) IT outsourcing/vendor management, (5) Electronic banking/payments/e-money
- **BSP Circular No. 1137** — Amendments to Outsourcing and IT Risk Management (issued Feb 2022), which introduced the **Supervisory Assessment Framework (SAFr)** and increased the frequency of risk assessments
- **BSP Circular No. 1105** — additional requirements specifically for **digital banks** (enhanced technology risk governance on top of standard BSP requirements)

**Materiality test for outsourcing (Circular 1137):** An arrangement is "material" if disruption, service failure, data breach, or security breach would significantly impact the bank's operations, financial condition, reputation, customers, or regulatory compliance. Material arrangements get the full documentation and BSP-notification burden; non-material arrangements get a lighter touch.

**Key procedural point:** Circular 1137 removed the requirement for BSP to pre-approve most new outsourcing arrangements or changes to existing material ones — institutions self-assess against SAFr instead, with BSP conducting supervisory review rather than gatekeeping every arrangement. This is a lighter-touch, more self-service compliance posture than Singapore's or Malaysia's — relevant to how "friction-heavy" your product experience needs to be for Philippine customers.

**Vendor-facing implication:** BSP requires periodic assessment of "exposure to risk of confidentiality" both at the contract-specific level and the institution-wide level — meaning a vendor serving multiple business units of the same Philippine bank may get assessed in aggregate, not just per-contract.

---

## 6. Cambodia — National Bank of Cambodia (NBC)

**Core framework:** Technology and Cyber Risk Management Guidelines (TCRMG) — this **superseded the original 2019 Technology Risk Management Guidelines (TRMG)** earlier in 2026. If your reference material still says "TRMG," it's the prior version; check for TCRMG language specifically.

**Six policy domains (from the original TRMG structure, likely retained in TCRMG):**
1. Information Technology Guidance
2. IT Governance Policy & Procedures
3. Information Security Policy & Procedures
4. **IT Services Outsourcing**
5. Information Security Audit
6. Payment Card Security

**Practical alignment path:** Multiple compliance vendors map NBC's guidelines to the **NIST Cybersecurity Framework (CSF)** as a common language, since NBC's guidelines don't specify one framework exclusively — this is useful for GRCArc: a NIST CSF-aligned control set can serve as the translation layer for Cambodia rather than building entirely bespoke controls.

**Data sovereignty requirement:** Critical data must be stored and processed **within Cambodia** — a hard requirement under the cloud-computing guidance, not just a "consideration."

**Context worth knowing:** Cambodia's digital finance landscape is also shaped by the NBC's **Bakong** payment system (state-backed) and a January 2025 crypto-asset framework (Prakas B7-024-735 Prokor) that restricts most crypto activity to two licensed sandbox platforms. This signals NBC's overall regulatory posture: cautious, sandbox-first, protective of the state payment rail. A vendor pitching Cambodia should expect a more centralized, less self-service regulatory relationship than Singapore or the Philippines.

---

## 7. Japan — Financial Services Agency (FSA)

**Core framework:** Guidelines on Cybersecurity for the Financial Sector — published **October 20, 2025** (recent enough that most competitor platforms won't have caught up yet).

**Structure:** Six core areas, each with defined "**basic/fundamental response measures**" and "**recommended/desirable response measures**":
1. Establishment of cybersecurity management systems (governance)
2. Identification of cybersecurity risks
3. Protection against cyberattacks
4. Detection of cyberattacks
5. Response and recovery from cyber incidents
6. **Third-party risk management**

**Granularity:** The guidelines specify **176 discrete response items** across these six areas — this is unusually granular compared to MAS TRM or BNM RMiT, and suggests Japan wants a checklist-style assessment rather than a principles-based one. This is directly usable as GRCArc scorecard content: a 176-item Japan-specific control library is a concrete, buildable asset.

**Very recent developments to track:**
- **April 3, 2026** — FSA published a research report, "Strengthening the Management of Third-Party Cybersecurity Risks by Financial Institutions" — this explicitly studies US/EU/UK third-party risk management practices (classification of third parties, concentration risk, ongoing monitoring, exit strategies, incident response) to inform Japanese practice. This tells you where Japan's TPRM expectations are heading: toward the more mature Western TPRM models, not staying static.
- **May 14, 2026** — working group formed specifically on AI-related cybersecurity threats in the financial sector
- **June 15, 2026** — FSA request on short-term measures for financial institutions responding to frontier AI risks

**Complementary industry standard:** **FISC Security Guidelines on Computer Systems for Financial Institutions** — a long-standing industry-developed standard widely used alongside FSA guidance; also referenced against the international **CRI Profile** (Cyber Risk Institute).

**Vendor-facing implication:** Japan's framework is more prescriptive and item-by-item than Singapore's or Malaysia's — expect Japanese financial institution procurement/security teams to ask for evidence against specific numbered controls rather than accepting a narrative compliance posture.

---

## 8. South Korea — Financial Services Commission (FSC) / Financial Supervisory Service (FSS)

**Core statute:** Electronic Financial Transactions Act (EFTA) — the primary legal basis for financial-sector IT/cybersecurity obligations, amended most recently around **September 2024** to expand scope over prepaid service providers.

**Regulatory structure:**
- **FSC** — overall supervisory authority, sets policy, can impose sanctions (corrective orders, dismissal recommendations, business suspension, administrative penalties) under **Articles 39 and 51 of the EFTA**
- **FSS** — day-to-day inspection authority under **Article 39 EFTA**, conducts the actual examinations
- **Financial Security Institute (FSI)** — technical/operational security body supporting both

**Important scope limitation to flag:** Fintech companies that operate **without a financial license are not subject to the EFTA's security-related obligations**. This is a real gap/nuance — a Korean fintech customer's obligations depend heavily on whether they hold a formal license, not just on what they do functionally. GRCArc's Korea scorecard needs a licensing-status gate before applying EFTA-derived controls.

**2026 enforcement posture:** FSS's 2026 business plan (announced Feb 9, 2026) explicitly commits to **stronger IT and cybersecurity accountability for financial firms**, alongside AI-based market surveillance tools — signaling an actively tightening environment, not a stable one.

**Adjacent regimes to be aware of (not EFTA, but frequently co-required):**
- **PIPA** (Personal Information Protection Act) — general data protection
- **CIUPA** (Credit Information Use and Protection Act) — governs credit information specifically
- MyData licensing (Credit Information Act) for aggregators/robo-advisors

**Vendor-facing implication:** Korean financial institution vendor assessments will likely reference EFTA-derived internal control obligations plus, depending on data type, PIPA/CIUPA — a vendor handling credit information faces a materially heavier bar than one handling only transactional data.

---

## 9. Taiwan — Financial Supervisory Commission (FSC)

**Core framework:** Regulations Governing Internal Operating Systems and Procedures for the Outsourcing of Financial Institution Operation ("Outsourcing Regulations") — most recently amended **August 2023** to enable cloud/AI adoption.

**Companion document:** "Financial Institutions' Risk Management Guidelines for Information Communication Systems and Service Chain" (**Supply Chain Guidelines**), published by the Bankers Association at FSC's request, **April 2023**. Five key points:
1. Thorough security analysis/planning before any outsourcing
2. Vendor assessment and selection based on security capability
3. Explicit cybersecurity provisions required in outsourcing/entrustment contracts
4. Ongoing security principles maintained throughout the contract term (Article 7)
5. (Implied) exit/termination security handling

**Materiality definition (relevant for scoping vendor risk depth):** An outsourced operation is "material" if:
- It can't be performed, or has information security concerns that will significantly impact operations, OR
- It's involved in a customer data security incident with significant impact, OR
- It otherwise has significant impact on the institution or customers

**Key procedural requirements (Article 10 of the Outsourcing Regulations):**
- FSC and the central bank can demand information/reports or conduct inspections related to outsourced matters at any time
- Vendors cannot subcontract without the financial institution's prior written consent — and any permitted subcontracting scope/conditions must be specified in the outsourcing contract itself
- Cross-border outsourcing (Article 17) has additional specific conditions

**Broader legal context:** Taiwan's Cyber Security Management Act (CSMA) sits above sector-specific rules, mandating audit and incident-reporting mechanisms with penalties across public and designated critical private sectors, including finance.

**Vendor-facing implication:** The subcontracting-consent requirement is stricter and more explicit here than in most of the other markets covered — GRCArc's Taiwan scorecard should specifically probe a vendor's own subcontractor/sub-processor chain, since that's where Taiwanese institutions focus scrutiny.

---

## 10. Cross-market control pattern (build this as GRCArc's core scorecard engine)

Despite different regulators and different legal force (binding notice vs non-binding guideline vs statute), **every single market above converges on the same seven control domains** for vendor/third-party technology risk:

| Control domain | SG (MAS) | MY (BNM) | ID (OJK) | PH (BSP) | KH (NBC) | JP (FSA) | KR (FSC/FSS) | TW (FSC) |
|---|---|---|---|---|---|---|---|---|
| Board/senior mgmt oversight | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Vendor due diligence pre-onboarding | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (license-gated) | ✅ |
| Ongoing/continuous vendor monitoring | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Subcontractor/sub-processor consent & visibility | ✅ | — | — | — | — | ✅ (via research direction) | — | ✅ (explicit, strict) |
| Data residency / localization | ✅ (cloud-specific) | — | ✅ (explicit, strong) | — | ✅ (explicit, strong) | — | — | — |
| Incident notification timelines | ✅ (1hr/14 days) | — | ✅ | — | — | ✅ | — | — |
| Concentration risk / exit planning | ✅ (emerging TPRMG) | — | — | — | — | ✅ (research phase) | — | — |
| Board-approved outsourcing/vendor register | ✅ (mandatory) | — | — | — | — | — | — | ✅ |

This table itself is a sellable product artifact — it's the kind of cross-market comparison a fintech's compliance lead searches for and can't easily find assembled anywhere else.

---

## 11. Build recommendations for GRCArc

**Phased rollout, not simultaneous launch:**
1. **Phase 1 — Singapore + Malaysia.** These are your home-turf regulators (MAS, BNM) where your personal credibility and network are strongest, and both have very recent, well-documented, actively-changing frameworks (MAS TPRMG consultation, BNM's new Payment Services Regulatee track) — meaning you can credibly be "first to map" a brand-new requirement before competitors notice it exists.
2. **Phase 2 — Indonesia + Philippines.** Larger, fragmented markets where the "translation layer" value (turning dense regulatory text into a usable scorecard) is highest, given how many overlapping OJK regulations currently exist.
3. **Phase 3 — Japan.** The 176-item FSA framework is dense enough to be a standalone premium product line — likely appeals to a different buyer profile (larger, more process-mature fintechs) than Phase 1/2.
4. **Phase 4 — South Korea + Taiwan + Cambodia.** Smaller immediate TAM but rounds out "full APAC coverage" as a marketing claim once Phases 1-3 have paying customers.

**Product structure implication:** Build the scorecard as **one core engine with market-specific control packs**, not eight separate products. The cross-market table above (Section 10) is essentially your data model — a control taxonomy with a matrix of which regulator requires which control, at what strictness.

**Positioning language to test:** "Vendor security readiness for fintechs selling into Southeast Asian and Northeast Asian financial institutions — mapped to MAS, BNM, OJK, BSP, NBC, FSA, FSC, and FSC(Taiwan) requirements, not just SOC 2."

**Honest gap to flag for yourself:** Several of these frameworks (Indonesia especially) are moving fast enough in 2026 that "map it once and ship it" won't hold — you'll need a lightweight regulatory-monitoring habit (quarterly re-check per market) built into your own operating cadence, not just the product.

---

*Compiled August 2026 from primary regulator sources, law firm client alerts, and compliance-vendor documentation. Treat dates and specific figures (fines, thresholds, deadlines) as directionally accurate but verify against the primary regulator text before publishing anything as GRCArc product copy — several of these frameworks were mid-consultation or newly effective at time of writing.*
