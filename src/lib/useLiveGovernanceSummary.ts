import { useMemo } from 'react';
import { dashboardSummary } from '@/data/sampleData';
import { checkedCount, overallPct, bandFor, sectionScores, marketCoverage, ALL_MARKETS, type ChecklistState } from '@/data/assessment';

export function useLiveGovernanceSummary() {
  return useMemo(() => {
    let assessmentState: ChecklistState = {};
    try { assessmentState = JSON.parse(localStorage.getItem('oblig_scorecard_v1') ?? '{}'); } catch { /* ignore */ }
    const count = checkedCount(assessmentState);
    if (count === 0) return { ...dashboardSummary, isLive: false as const };

    const pct = overallPct(assessmentState);
    const band = bandFor(count);
    const coverage = marketCoverage(assessmentState);
    const avgMarketCoverage = Math.round(
      ALL_MARKETS.reduce((sum, code) => sum + coverage[code].pct, 0) / ALL_MARKETS.length,
    );
    const categoryScores = sectionScores(assessmentState).map(sec => ({ name: sec.name.split(' ').slice(0, 2).join(' '), score: sec.pct }));

    return {
      ...dashboardSummary,
      governanceScore: pct,
      maturityLevel: band.level,
      maturityLabel: band.levelLabel,
      healthStatus: (pct >= 70 ? 'healthy' : pct >= 40 ? 'attention' : 'critical') as 'healthy' | 'attention' | 'critical',
      healthLabel: pct >= 70 ? 'On Track' : pct >= 40 ? 'Needs Attention' : 'Critical Gaps',
      complianceReadiness: avgMarketCoverage,
      categoryScores,
      isLive: true as const,
    };
  }, []);
}
