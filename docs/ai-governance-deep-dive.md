# GRCArc Deep Dive: AI Governance in Regulated Industries — Singapore, Malaysia, Indonesia, Philippines, Cambodia, Japan, South Korea, Taiwan

**Purpose:** Extend GRCArc's control library beyond technology/vendor risk into AI-specific governance requirements now emerging across every market in scope. This is a genuinely fast-moving area — nearly every country covered has issued new AI-in-financial-services guidance within the last 12 months, several within the last 60 days.

**Headline finding:** This entire category is roughly 6–24 months old across the board. No competitor platform (Vanta, Drata, Secureframe, Sprinto, Scrut) has built deep AI-governance control mappings for these markets, because most of the source regulations didn't exist when those platforms built their current control libraries. This is a bigger, fresher gap than the vendor-risk gap covered in the first deep dive.

---

## 1. Singapore — MAS AI Risk Management Guidelines (in progress)

**Foundational layer (since 2018):** MAS FEAT Principles — Fairness, Ethics, Accountability, Transparency. Non-binding, illustrative rather than prescriptive; developed jointly with industry.

**What's new and binding-adjacent:** On **November 17, 2025**, MAS released **Consultation Paper P017-2025** proposing formal **Guidelines on Artificial Intelligence Risk Management (AIRM/AIRG)**. Public consultation closed **January 31, 2026**. Once finalized, institutions get a **12-month transition period** to comply. These Guidelines represent a shift from "ethical principles" (FEAT) to **operable, supervisory-ready risk management expectations** — MAS has signaled it will assess AI governance as part of routine inspections and thematic reviews once finalized.

**Scope:** Applies to **all MAS-regulated financial institutions** — banks, insurers, capital markets intermediaries, payment services providers, and fintechs. Covers traditional predictive AI, generative AI, and **agentic AI models** explicitly.

**Five foundational pillars (per industry analysis of the consultation):**
1. Board and senior management oversight — effective governance and appropriate risk culture for AI use
2. AI risk management systems, policies, and procedures
3. AI lifecycle controls — development, deployment, monitoring, retirement
4. Capabilities and capacity for AI use (skilled personnel, resourcing)
5. Third-party AI accountability — **institutions cannot delegate governance to vendors**; this explicitly extends due diligence obligations to AI tools built or operated by third parties

**Complementary tooling already published:** In **March 2026**, MAS published an **AI Risk Management Toolkit**, centered on an **AI Risk Management Operationalisation Handbook** — concrete, non-binding recommendations for how to actually implement the Guidelines' principles. This Handbook is a direct, buildable content source for GRCArc's Singapore AI control pack.

**National-level context these Guidelines explicitly reference:** IMDA's Model AI Governance Framework, the AI Verify Foundation, and Project MindForge (MAS/industry generative AI initiative) — all worth cross-referencing for a complete Singapore AI control set.

**Vendor-facing implication:** A fintech selling AI-powered tools (credit scoring, fraud detection, chatbots, agentic workflows) into a Singapore bank will increasingly be assessed not just on TRM/TPRM grounds but specifically on AI lifecycle governance — model documentation, explainability, bias testing, and human oversight — once these Guidelines finalize (expected sometime in 2026, transition to follow).

---

## 2. Malaysia — BNM's Layered, Still-Forming Approach

**No single standalone AI regulation yet** — Malaysia's approach is currently layered across three tracks:

1. **BNM's existing RMiT framework**, informally extended in practice to cover AI-specific technology risk (due diligence on AI vendors/cloud providers, stricter logging/audit, explicit accountability for AI-related cyber risk) — but this is interpretive extension, not an AI-specific chapter yet.

2. **BNM Discussion Paper on Artificial Intelligence in the Malaysian Financial Sector**, published **August 2025** — a formal consultation exploring how AI can be used responsibly across the sector, balancing innovation with governance and consumer protection. As of the research date, this remains a discussion paper, not finalized guidelines — **track this closely, as it's the most likely candidate to become BNM's formal AI framework.**

3. **Industry self-regulation:** The Association of Banks in Malaysia (via AICB's Chief Risk Officers' Forum), with **BNM's support**, developed an **AI Governance Framework** — described explicitly as "not Government telling banks how to use AI; it is the banking profession governing itself." This industry-led framework was spotlighted at **AICB NEXUS 2026** ("AI, Trust and the Future of the Financial Sector"), where BNM's Governor noted **over 70% of Malaysian financial service providers have already implemented at least one AI application** and previewed a **Financial Sector Master Plan 2027–2030** that will push AI further into collective, ecosystem-wide use (e.g., cross-institution fraud/cyber threat response).

**National-level parallel track:** Malaysia's **National AI Roadmap** and **National Guidelines on AI Governance and Ethics** exist at the whole-of-economy level (via MOSTI/National AI Office), and a new **National AI Action Plan 2026–2030** is expected around December 2026, intended to align with frameworks like the EU AI Act. This is not finance-specific but will likely shape how BNM's eventual financial-sector AI rules are framed.

**Key accountability principle already articulated:** "Financial institutions cannot outsource accountability" for AI-related risk to a third party, even where the model itself is vendor-built — this mirrors Singapore's stance and should be treated as a regional norm, not a one-off.

**Build implication:** Malaysia's AI-in-finance framework is the least mature of the eight markets in terms of a finished, citable regulatory document — but the direction of travel (RMiT + Discussion Paper + industry framework + BNM endorsement) is unambiguous. GRCArc's Malaysia AI control pack should be explicitly versioned as "pre-final" and flagged for update once BNM's Discussion Paper converts into binding guidance.

---

## 3. Indonesia — OJK's Sector-Specific Banking Guidance (already published, non-binding)

**Core document:** **"Artificial Intelligence Governance for Indonesian Banking"** ("Buku Panduan Tata Kelola Kecerdasan Artifisial Perbankan Indonesia"), issued by OJK on **April 29, 2025** (Press Release SP 67).

**Status:** Explicitly a **minimum benchmark, not a binding POJK** — no penalty schedule attached directly, but OJK has stated it expects the framework to become the sector's baseline, and it complements OJK's already-binding IT/cyber regulations (POJK 11/2022, SEOJK 24/2023, SEOJK 29/2022) referenced throughout.

**Structure:** Governs AI across a **six-stage lifecycle** under **three core principles**: accountability, human oversight, and reliability.

**The eight implementation steps OJK lays out (directly buildable as a GRCArc control checklist):**
1. Inventory and risk classification of AI systems (low/medium/high)
2. Policy and standards development (coding, data, security)
3. Role assignment and capacity building (training for data scientists, risk, compliance staff)
4. Model development and documentation standards (model cards, datasheets)
5. Pre-deployment testing and independent validation
6. Deployment controls (canary release, phased rollout, rollback mechanisms)
7. Real-time monitoring and periodic revalidation
8. Audit and record-keeping for supervisory inspection

**High-impact models** (per the Guidance) require additional governance gates: independent model validation and **board-level sign-off**.

**Key risk areas OJK explicitly flags for banking AI use:** new fraud methods (AI-enabled impersonation of key persons/customers), bias/inaccuracy risk (especially in credit risk functions), new cybersecurity attack surfaces, and human/organizational readiness gaps (leadership and policy familiarity).

**Adjacent regulatory layer — fintech-specific AI obligations (2026):**
- **OJK regulates AI use cases directly** in some product categories: robo-advisory services face disclosure/suitability/investor-protection requirements; alternative credit scoring using AI must meet fairness and non-discrimination standards
- **Indonesia's Personal Data Protection Law (PDPL)** requires **DPIAs (Data Protection Impact Assessments)** for high-risk processing — a category that "almost certainly includes algorithmic profiling, automated credit decisions, and behavioural analytics"
- **Multi-regulator overlap is the defining Indonesia characteristic**: OJK (financial services AI), Bank Indonesia (payment-system AI), Komdigi/KOMINFO (data localization, telecom), BSSN (national cybersecurity standards), and the Personal Data Protection Agency all have jurisdiction depending on use case. A single fintech AI product can trigger obligations from three or four of these simultaneously.

**Vendor-facing implication:** Vendor contracts with Indonesian banks/fintechs should already contemplate an **audit/compliance-cooperation clause** — sample language circulating in legal guidance requires vendors to "permit the Company and its regulators (including OJK, Bank Indonesia and Komdigi) reasonable access to audit the AI System's compliance... upon 30 days' written notice." This is a concrete, quotable contractual expectation GRCArc's Indonesia scorecard should surface directly to vendors.

---

## 4. Philippines — BSP's STARS Framework (brand new — June 2026)

**This just happened, literally weeks before this document was compiled.** BSP issued **Memorandum No. M-2026-031**, "Governance Principles for Artificial Intelligence in Financial Services," dated **June 24, 2026**, publicly announced **June 30, 2026**. This is the **Philippines' first formal AI regulatory framework for banking**.

**Framework name: STARS** — five principles:
- **S**ustainability — environmentally efficient, human-centred AI systems
- **T**ransparency — maintain a clear inventory of AI systems, disclose when AI influences a decision, keep documentation sufficient for audits
- **A**ccountability
- **R**esponsibility
- **S**ecurity

**Status:** Voluntary/non-binding, but explicitly framed as **BSP's minimum supervisory expectations**. No asset-size carve-out, no exemption for institutions that only *consume* AI rather than build it.

**Proportionality principle:** Implementation should track the scale, complexity, and materiality of an institution's AI use and its own operational complexity — a thrift bank running one vendor scoring model faces a lighter bar than a universal bank running twenty models across lending, fraud, and advisory.

**The critical detail for GRCArc's product:** STARS explicitly covers **vendors and outsourced service providers under a shared-responsibility model**. Quoting directly from industry analysis: *"the bank remains accountable even when the AI is built and operated by a vendor. Institutions must ensure their vendor contracts include AI governance requirements, and that vendors comply with the same transparency, security, and fairness standards the bank itself must meet."* This is as explicit and vendor-focused a statement as exists anywhere in this research — the Philippines just handed GRCArc a direct product requirement in regulatory language.

**Companion instrument:** **BSP Memorandum No. M-2026-034** — recommendations specifically for managing cybersecurity risks associated with **frontier AI systems** (i.e., AI-enabled cyberattacks getting more sophisticated/scalable), encouraging AI-enabled defensive measures alongside the STARS governance framework.

**Relationship to existing rules:** BSP has been explicit that AI-specific risks still fall under its **existing IT risk management framework** (information security, outsourcing, project management) — meaning STARS supplements, rather than replaces, BSP Circular 808/1137 obligations covered in the first deep dive.

**International alignment claimed:** BSP states STARS aligns with OECD, ASEAN, and Financial Stability Institute AI guidance — useful for positioning GRCArc's Philippines pack as internationally coherent, not a one-off local quirk.

---

## 5. Cambodia — No Sector-Specific AI-in-Finance Framework Yet

**Current status:** Cambodia has **no finalized national AI strategy and no NBC-specific AI governance framework** as of this research. What exists:

- **Draft National Artificial Intelligence Strategy 2025–2030** (Ministry of Post and Telecommunications) — public consultation ran June 1–20, 2025; six strategic priorities (human resources; data/infrastructure; AI for digital government; sectoral adoption incl. finance; ethical/responsible AI; collaboration/R&D) and 41 concrete measures. Still in draft as of mid-2026 reporting.
- Cambodia is "actively engaged in ASEAN discussions on AI governance" and is separately drafting foundational Personal Data Protection and Cybersecurity legislation — neither finalized.
- No AI-specific procurement guidelines exist yet, and there's no requirement to disclose AI use in public services, let alone financial ones.
- Independent analysis explicitly flags continuing "gaps... in strategy, cybersecurity, and data governance" and "fragmentation in institutional roles regarding AI oversight."

**Build implication:** There is currently **nothing to map** for Cambodia specifically. The honest, defensible approach: apply the general **NBC Technology and Cyber Risk Management Guidelines (TCRMG)** as the baseline (AI systems are technology, after all) plus a note that AI-specific rules are pending, rather than inventing Cambodia-specific AI content that doesn't exist yet. This is also a genuine opportunity to **position GRCArc as tracking the draft strategy live** and being first-to-market the moment NBC or the national strategy finalizes anything finance-specific.

---

## 6. Japan — FSA's Discussion Paper Track + New National AI Promotion Act

**National framework:** The **AI Promotion Act** (Act on Promotion of Research and Development and Utilization of AI-Related Technologies) — passed **May 28, 2025**, most provisions effective **June 4, 2025**, AI Strategy Headquarters chapters effective **September 1, 2025**. First **AI Basic Plan** approved by Cabinet **December 23, 2025**.

**Character of the Act:** A **promotion-and-coordination law**, not an EU-style risk-tiered compliance statute. It creates a duty for AI-utilizing businesses to **"cooperate"** with national policy — no direct penalties for non-compliance, but the Act **explicitly preserves sector-specific rule-making** (FSA for finance, PMDA for medical, MLIT for transport, etc.) rather than overriding it.

**Financial-sector-specific track — FSA's AI Discussion Paper series:**
- **Version 1.0** — published **March 2025**: "Preliminary Discussion Points for Promoting the Sound Utilization of AI in the Financial Sector." Explicitly framed as *preliminary* and *encouraging* — FSA states institutions should "actively take on challenges without being overly cautious."
- **FSA AI Public-Private Forum** ran June–December 2025, gathering industry input on AI use cases, risk management/governance examples, and areas needing regulatory clarification.
- **Version 1.1** — published **March 3, 2026** — the updated, more developed discussion paper.
- **Reported update (May 2026, single-source, not independently confirmed as of this writing):** FSA reportedly issued **model risk management guidance requiring explainability protocols specifically for AI-driven credit scoring** — flagged in industry tracking as "Qualified Weak" confidence (one source, primary FSA document not independently verified). **Worth monitoring for confirmation before treating as settled.**

**Joint FSA/Bank of Japan action (very recent):** **May 22, 2026** — FSA and BOJ jointly issued a request to financial institutions on **"Short-Term Measures for Financial Institutions in Response to Changes in Threat Posed by Frontier AI"** — signals active, current concern about frontier-AI-enabled threats to the financial sector specifically (distinct from, but parallel to, the Philippines' frontier-AI cybersecurity memorandum above).

**Third-party risk research (connects Japan's two deep-dive documents together):** FSA's **April 3, 2026** research report, "Strengthening the Management of Third-Party Cybersecurity Risks by Financial Institutions," explicitly studies US/EU/UK third-party risk practices — this is the same document flagged in the first deep dive, and it's directly relevant here because AI vendor governance and general third-party governance are converging in FSA's own thinking.

**Build implication:** Japan's AI-in-finance guidance is currently the **least prescriptive and most "in dialogue"** of the eight markets — FSA is deliberately using a discussion-paper, public-private-forum approach rather than issuing binding rules quickly. This means GRCArc's Japan AI content should be framed as "current FSA direction of travel" rather than "requirements," and updated aggressively — this is likely to firm up faster than Malaysia's, given Japan's overall regulatory sophistication and FSA's clear ongoing cadence of output (three to four discussion documents in 12 months).

---

## 7. South Korea — Most Mature AI-in-Finance Framework in the Region (in force now)

**National layer:** **AI Framework Act** (Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust) — promulgated **January 21, 2025**, took full legal effect **January 22, 2026**, after a one-year transition period. Korea was the **first APAC jurisdiction** and **second globally after the EU** to enact comprehensive AI legislation.

**Key structural feature:** "**High-impact AI**" is a defined legal category, covering sectors including **financial services**, alongside healthcare, energy, employment, and public safety. High-impact AI deployers face **mandatory obligations**: prior notice to affected users, explainability plans for final AI-driven outputs (to the extent technically feasible), and disclosure of training-data overview.

**High-performance AI threshold (technical, may matter for larger fintech/AI vendors):** Systems trained with cumulative compute of at least **10^26 FLOPs** — roughly 10x the EU AI Act's general-purpose AI model threshold.

**Financial-sector-specific track — FSC's evolving guidelines:**
- **2021** — FSC's original "Guidelines for the Operation of AI in the Financial Sector"
- **2022** — "Guidelines for the Development and Utilization of AI in the Financial Sector" (both non-binding but referenced by regulators when assessing internal-control compliance)
- **December 22, 2025** — FSC released a **Draft Integrated AI Guidelines** for the financial sector, consolidating the previously separate development/operation/security guidance into one document
- **June 18, 2026** — FSC held an "AI transformation (AX)" meeting and released the **finalized, revised guidelines**, effective **June 22, 2026** — this is now the live, current framework

**The June 2026 finalized framework — seven principles (directly buildable as GRCArc's Korea control set):**
1. Governance
2. Legitimacy/legality
3. Human supervision (AI as a support tool, not a replacement for human judgment)
4. Data and model credibility/reliability
5. Financial stability
6. Good faith conduct
7. Security

**Applies to:** All financial companies **including fintech businesses** — explicitly broader than just licensed deposit-taking institutions.

**Critical interaction with the AI Framework Act:** AI systems classified as **high-impact**, or otherwise falling under the AI Framework Act, are subject to the **Act's mandatory requirements** *on top of* the FSC's seven voluntary principles — meaning Korea effectively has a **two-tier system**: a binding statutory floor (AI Framework Act, for high-impact classifications) plus a broader voluntary supervisory framework (FSC's seven principles) covering all AI use regardless of impact classification.

**Support infrastructure already stood up:**
- **FSS** — will provide an **AI Risk Management Framework (RMF)** specific to the financial sector
- **FSI (Financial Security Institute)** — will provide an **AI security guidebook** for the financial sector
- An **AI guidelines helpdesk** is being made available to financial companies for implementation questions

**Roadmap for further tightening:** Per the **Draft Korea AI Action Plan** (Dec 2025), the FSC committed to: (i) financial-sector AI guidelines by Q1 2026 (delivered, per above), (ii) a **regular AI risk-monitoring system** by **Q4 2026**, and (iii) a further supplementation of the guidelines by **Q1 2027** to reflect regulatory/technical/business changes.

**Vendor-facing implication:** Korea is the most codified and fastest-tightening AI-in-finance market in this set. A vendor selling AI-powered tools into a Korean bank or fintech should expect assessment against the seven FSC principles now, with high-impact use cases (which very plausibly include credit scoring, fraud detection, and algorithmic trading) facing the AI Framework Act's binding explainability/disclosure requirements directly.

---

## 8. Taiwan — FSC's Financial AI Guidelines (established, tightening toward binding via AI Basic Act)

**Financial-sector track — the most mature part of Taiwan's private-sector AI governance:**
- **October 2023** — FSC issued **"Core Principles and Policy for Use of AI in the Financial Industry"**
- **June 2024** — FSC issued the fuller **"Guidelines for the Use of Artificial Intelligence (AI) in the Financial Industry"** ("Financial AI Guidelines")

**Six key areas covered:**
1. Governance and accountability mechanisms
2. Fairness and human-centric values
3. Privacy and customer-rights safeguarding
4. System robustness and security
5. Transparency and explainability
6. Sustainable development

**Named core principle:** **"Human-in-the-loop"** — significant financial decisions (credit scoring, algorithmic trading) must retain human oversight; AI models must avoid discriminatory lending outcomes and maintain high explainability standards.

**Status today:** Administrative guidance ("soft law"), reinforced by **self-regulatory rules from financial industry associations**. Not yet a binding statute — but that's changing:

**The national AI Basic Act is the mechanism that will make this binding.** As of this research, Taiwan's AI Basic Act exists in **draft form** (NSTC draft released August 2024; multiple competing legislator-submitted drafts exist, disagreeing on penalties, risk-based regulation structure, and interaction with existing law). Once enacted, the Act's design explicitly delegates implementation to sector regulators:
- **MODA (Ministry of Digital Affairs)** is tasked with building an **AI Risk Classification Framework** aligned with international practice — **published July 7, 2026**, per the most recent research, giving competent authorities (including FSC) a structured way to categorize AI applications by risk level.
- **FSC is then required to establish risk-based regulatory standards for AI in finance**, using MODA's classification framework as the foundation, and to help the industry develop sector-specific guidelines/codes of conduct.

**What this means practically:** Once the AI Basic Act is finalized and MODA's risk classification is fully operational, Taiwan's currently-voluntary Financial AI Guidelines are expected to be **"elevated from self-regulatory guidelines to statutory obligations"** — and credit scoring, automated underwriting, robo-advisory, and AML detection are **"almost entirely likely"** to land in the high-risk classification once that happens.

**Adjacent instrument:** Taiwan's Cyber Security Management Act (CSMA) already applies to financial institutions designated as **Critical Infrastructure Providers (CIPs)** — separate from AI-specific rules, but relevant where AI systems run on infrastructure that qualifies as critical.

**Vendor-facing implication:** Taiwan currently occupies a middle position — more mature and specific than Malaysia or Cambodia, less codified than Korea, but on a clear and currently-moving path toward binding, risk-tiered regulation. A GRCArc Taiwan AI pack built now around the six Financial AI Guidelines areas will very likely map directly onto the eventual binding FSC risk-based standards once the AI Basic Act finalizes — this is a good market to build early and iterate, not one to wait out.

---

## 9. Cross-market synthesis: what's actually converging

Despite wildly different legal postures — from Cambodia's total absence of framework to Korea's binding statutory tier — **the same handful of governance concepts recur in every single market's financial-sector AI guidance:**

| Concept | SG | MY | ID | PH | KH | JP | KR | TW |
|---|---|---|---|---|---|---|---|---|
| Board/senior mgmt oversight of AI | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ |
| AI system inventory / risk classification | ✅ | — | ✅ | ✅ | — | — | ✅ | ✅ (via MODA) |
| Explainability / transparency to affected users | ✅ | — | ✅ | ✅ | — | (reported) | ✅ (binding, high-impact) | ✅ |
| Human-in-the-loop for material decisions | ✅ | — | ✅ | — | — | — | ✅ | ✅ (named principle) |
| Vendor/third-party AI accountability retained by institution | ✅ (explicit) | ✅ (explicit) | (implied via due diligence) | ✅ (explicit, shared-responsibility) | — | — | — | — |
| Fairness / non-discrimination (esp. credit) | ✅ | — | ✅ | ✅ | — | — | ✅ | ✅ |
| Frontier-AI-specific cyber threat guidance | — | — | — | ✅ (M-2026-034) | — | ✅ (FSA/BOJ May 2026) | — | — |
| Binding statutory backstop already in force | — | — | — | — | — | — | ✅ (AI Framework Act) | (pending Basic Act) |

**The two standout, immediately-actionable data points:**
1. **The Philippines' STARS framework (June 2026) is the single most explicit "vendor accountability" statement in this entire research set** — it should anchor GRCArc's cross-market vendor-facing pitch, since it says in plain regulatory language exactly what GRCArc's product proves.
2. **South Korea is the only market with a binding statutory AI law already in force**, layered under a live, recently-finalized FSC sector framework — this is the highest-stakes, most defensible market for a premium GRCArc product tier, since non-compliance carries real legal consequence, not just supervisory disapproval.

---

## 10. Build recommendations (AI governance track)

**Sequence AI control-pack development to match regulatory maturity, not GDP or market size:**
1. **Korea first.** It's the only market with binding law already in effect, has the most codified seven-principle framework, and has dedicated support infrastructure (FSS RMF, FSI guidebook) you can build directly against.
2. **Philippines second.** STARS is brand new (weeks old at time of writing), explicitly vendor-inclusive, and nobody else in the compliance-automation space has caught up to it yet — genuine first-mover window.
3. **Singapore third.** The AIRM Guidelines aren't finalized, but the Toolkit/Operationalisation Handbook is already published and detailed enough to build against now, ahead of the 12-month transition period once finalized.
4. **Indonesia fourth.** The OJK banking AI guidance is a full year old and already has a concrete eight-step lifecycle — very buildable — but the multi-regulator overlap (OJK/BI/Komdigi/BSSN) makes this more complex to scope cleanly.
5. **Taiwan fifth.** Mature six-area guidelines exist, but building now means committing to a target that's about to shift (once AI Basic Act + MODA classification land) — build the six-area pack, but flag it as "pre-statutory" the same way Malaysia's pack should be flagged.
6. **Japan sixth.** FSA is deliberately keeping this in "discussion paper" mode — build a lighter-touch pack now, expect to substantially rebuild once (if) FSA moves from discussion papers to actual guidelines.
7. **Malaysia seventh.** BNM's Discussion Paper + industry framework are directionally clear but not yet a finished regulatory document to map cleanly.
8. **Cambodia last, honestly labeled.** Nothing sector-specific exists yet — offer the general NBC TCRMG as the interim baseline and be transparent that dedicated AI rules are still in draft nationally.

**Product structure implication (same as the first deep dive):** This should be a **second control-pack layer** sitting alongside the vendor/technology-risk packs from the first document, not a separate product. A fintech selling AI-powered credit scoring into a Korean bank needs *both* the general technology-risk pack (EFTA-derived) *and* the AI-specific pack (FSC's seven principles + AI Framework Act high-impact obligations) — GRCArc's value is precisely in showing how these two layers combine per market, since no one else has mapped either well, let alone both together.

**Honest operating note (same caveat as the first document, doubled):** This entire subject area is moving even faster than vendor/technology risk generally. Several of the frameworks described above (Malaysia's Discussion Paper, Taiwan's AI Basic Act, Japan's FSA guidance) are explicitly transitional and will likely look different within 6–12 months. A quarterly re-check per market isn't optional here — it's closer to a monthly one for at least Korea, Philippines, and Singapore given how recently each has moved.

---

*Compiled August 2026 from primary regulator sources (MAS, BNM, OJK, BSP, FSA, FSC Korea, FSC Taiwan), international law firm client alerts, and specialist compliance-tracking publications. Several items are flagged in-line as reported-but-unconfirmed or in-draft; verify against primary regulator text before publishing as GRCArc product copy, particularly for Japan's reported May 2026 credit-scoring explainability guidance and Taiwan's AI Basic Act status, both of which were unsettled at time of writing.*
