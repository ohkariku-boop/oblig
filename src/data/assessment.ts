import { DATA, TOTAL_ITEMS, MILESTONES, MILESTONE_NOTES, type Milestone } from '@/data/checklist';

export { DATA, TOTAL_ITEMS, MILESTONES, MILESTONE_NOTES };
export type { Milestone };
export type ChecklistState = Record<string, boolean>;

export function itemKey(sectionId: string, idx: number): string {
  return `${sectionId}__${idx}`;
}

export function checkedCount(state: ChecklistState): number {
  return Object.values(state).filter(Boolean).length;
}

export interface Band {
  label: string;
  desc: string;
  level: 1 | 2 | 3 | 4 | 5;
  levelLabel: string;
}

const LEVEL_LABELS: Record<number, string> = {
  1: 'Initial', 2: 'Developing', 3: 'Defined', 4: 'Managed', 5: 'Optimised',
};

export function bandFor(count: number): Band {
  const pct = count / TOTAL_ITEMS;
  if (count <= 12) {
    return { label: 'Bare Minimum', desc: 'Start with the 30-Minute Setup Sprint items, marked below.', level: 1, levelLabel: LEVEL_LABELS[1] };
  }
  if (count <= 22) {
    return { label: 'Solid', desc: "You're ahead of most funded startups at this stage. Keep the habit.", level: 3, levelLabel: LEVEL_LABELS[3] };
  }
  if (pct < 0.9) {
    return { label: 'Strong', desc: 'You have the fundamentals covered. Time to operationalise and measure.', level: 4, levelLabel: LEVEL_LABELS[4] };
  }
  return { label: 'Buttoned-Up', desc: 'Revisit the Milestone Playbook — you may be ready for the next stage gate.', level: 5, levelLabel: LEVEL_LABELS[5] };
}

export function sectionScores(state: ChecklistState) {
  return DATA.map(sec => {
    const checked = sec.items.filter((_, i) => state[itemKey(sec.id, i)]).length;
    return {
      id: sec.id,
      name: sec.name,
      tag: sec.tag,
      checked,
      total: sec.items.length,
      pct: Math.round((checked / sec.items.length) * 100),
    };
  });
}

export function overallPct(state: ChecklistState): number {
  return Math.round((checkedCount(state) / TOTAL_ITEMS) * 100);
}

export function recommendations(state: ChecklistState) {
  const scores = sectionScores(state);
  const sorted = [...scores].sort((a, b) => a.pct - b.pct);
  const recs: { section: string; text: string; impact: 'high' | 'medium' | 'low' }[] = [];
  for (const s of sorted) {
    if (s.pct < 40) {
      recs.push({ section: s.name, text: `${s.name} is your weakest area (${s.checked}/${s.total}). Start with the highest-leverage items here.`, impact: 'high' });
    } else if (s.pct < 70) {
      recs.push({ section: s.name, text: `Strengthen ${s.name} — you're at ${s.pct}%. Close the remaining gaps to lift your overall score.`, impact: 'medium' });
    }
  }
  if (recs.length === 0) {
    recs.push({ section: 'All', text: 'Excellent coverage. Focus on continuous improvement, measurement and external certification readiness.', impact: 'low' });
  }
  return recs.slice(0, 6);
}

export function milestoneFiltered(state: ChecklistState, milestone: Milestone) {
  let count = 0;
  for (const sec of DATA) {
    sec.items.forEach((it, i) => {
      if (it.m.includes(milestone) && state[itemKey(sec.id, i)]) count++;
    });
  }
  return count;
}
