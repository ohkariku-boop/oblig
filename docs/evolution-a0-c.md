# Evolution stages A0–C (implemented foundation)

## A0 — Stabilize
- Market messaging: deepest maps on eight core markets; VN/TH expanding
- Evidence: control_ref, checklist_key, coverage_status (metadata still OK)
- Dashboard: inventory entry point; readiness subtitle no longer overclaims “all 10”
- Assessment → Inventory bridge callout

## A1–A2 — Inventory + bridge
- Migration `0006_inventory.sql`: `vendors`, `ai_systems`, evidence link columns
- UI `/app/inventory`: CRUD for AI systems (unit of analysis) and vendors
- Agent profile fields on systems (is_agent, allowed actions, approval)
- Assessment page links to inventory after AI/vendor/data items

## A3–A4 — Map & prove (foundation)
- Systems store `control_refs` (tags toward MAS/BNM-style controls)
- Evidence stores control/checklist coverage status
- Roadmap points at inventory/evidence gaps
- Full automated gap engine still incremental

## B–C (stubs / direction)
- Agent fields present on AI systems (not a full agent platform)
- Vendor Passport content packs: not built yet (inventory is the prerequisite)
- Weekly intel remains external automation; in-app changelog not yet

## Ops
Run in Supabase SQL Editor after prior migrations:

```sql
-- paste contents of supabase/migrations/0006_inventory.sql
```

Without this migration, Inventory create actions will error until tables exist.
