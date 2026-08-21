import { describe, it, expect } from 'vitest';
import { checkedCount, bandFor, sectionScores, overallPct, marketCoverage, itemKey, DATA, TOTAL_ITEMS, ALL_MARKETS } from '@/data/assessment';
import { generateRealControls, TRM_CONTROLS } from '@/data/trmControls';
import { sampleFrameworks, sampleAiFrameworks } from '@/data/sampleData';

describe('assessment scoring', () => {
  it('checkedCount is 0 for empty state', () => {
    expect(checkedCount({})).toBe(0);
  });

  it('checkedCount only counts true values for real item keys, ignoring stray keys', () => {
    const firstSection = DATA[0];
    const state = {
      [itemKey(firstSection.id, 0)]: true,
      [itemKey(firstSection.id, 1)]: false,
      'some-stray-unrelated-key': true, // must NOT be counted
    };
    expect(checkedCount(state)).toBe(1);
  });

  it('overallPct never exceeds 100 even with extra unknown keys', () => {
    const allChecked: Record<string, boolean> = {};
    DATA.forEach(sec => sec.items.forEach((_, i) => { allChecked[itemKey(sec.id, i)] = true; }));
    allChecked['unrelated-key'] = true;
    expect(overallPct(allChecked)).toBe(100);
  });

  it('bandFor returns a lower band for lower counts', () => {
    const low = bandFor(0);
    const high = bandFor(TOTAL_ITEMS);
    expect(low.level).toBeLessThan(high.level);
  });

  it('sectionScores covers every section in DATA', () => {
    const scores = sectionScores({});
    expect(scores.length).toBe(DATA.length);
    scores.forEach(s => expect(s.pct).toBe(0));
  });
});

describe('market coverage', () => {
  it('is 0% for every market with no answers', () => {
    const coverage = marketCoverage({});
    ALL_MARKETS.forEach(code => {
      expect(coverage[code].checked).toBe(0);
      expect(coverage[code].pct).toBe(0);
    });
  });

  it('every market has at least one applicable item', () => {
    const coverage = marketCoverage({});
    ALL_MARKETS.forEach(code => {
      expect(coverage[code].total).toBeGreaterThan(0);
    });
  });

  it('checking an SG-specific item increases only markets it applies to', () => {
    // Find an item tagged only SG
    let sgOnlyKey: string | null = null;
    DATA.forEach(sec => sec.items.forEach((item, i) => {
      if (item.c.length === 1 && item.c[0] === 'SG') sgOnlyKey = itemKey(sec.id, i);
    }));
    expect(sgOnlyKey).not.toBeNull();
    const key = sgOnlyKey as unknown as string;
    const before = marketCoverage({});
    const after = marketCoverage({ [key]: true });
    expect(after.SG.checked).toBe(before.SG.checked + 1);
    expect(after.MY.checked).toBe(before.MY.checked); // unaffected
  });
});

describe('TRM controls', () => {
  it('every vendor-risk framework has a real control list, not empty', () => {
    sampleFrameworks.forEach(f => {
      expect(TRM_CONTROLS[f.id]).toBeDefined();
      expect(TRM_CONTROLS[f.id].length).toBeGreaterThan(0);
    });
  });

  it('every AI-governance framework has a real control list', () => {
    sampleAiFrameworks.forEach(f => {
      expect(TRM_CONTROLS[f.id]).toBeDefined();
      expect(TRM_CONTROLS[f.id].length).toBeGreaterThan(0);
    });
  });

  it('generateRealControls returns one entry per real domain, not a fabricated fixed count', () => {
    const controls = generateRealControls('mas-trm', 50);
    expect(controls.length).toBe(TRM_CONTROLS['mas-trm'].length);
    controls.forEach(c => expect(['met', 'partial', 'missing']).toContain(c.status));
  });

  it('returns empty array for an unknown framework id rather than throwing', () => {
    expect(generateRealControls('not-a-real-framework', 50)).toEqual([]);
  });
});
