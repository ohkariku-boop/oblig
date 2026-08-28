import { sampleFrameworks } from '@/data/sampleData';
import { marketCoverage, MARKET_TO_FRAMEWORK, ALL_MARKETS, MARKET_LABELS, type ChecklistState, type MarketCode } from '@/data/assessment';

export function useLiveFrameworks(assessmentState: ChecklistState) {
  const coverage = marketCoverage(assessmentState);
  const frameworkToMarket = Object.fromEntries(
    Object.entries(MARKET_TO_FRAMEWORK).map(([market, fw]) => [fw, market]),
  ) as Record<string, MarketCode>;

  const frameworks = sampleFrameworks.map(f => {
    const market = frameworkToMarket[f.id];
    const cov = market ? coverage[market] : undefined;
    if (cov && cov.checked > 0) {
      return { ...f, coverage: cov.pct, totalControls: cov.total, metControls: cov.checked };
    }
    return f;
  });

  const marketGrid = ALL_MARKETS.map(code => ({ code, label: MARKET_LABELS[code], ...coverage[code] }));

  return { frameworks, marketGrid };
}
