import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, ExternalLink } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { ProgressBar } from '@/components/ui/Badge';
import { supabase } from '@/lib/supabase';
import {
  checkedCount, overallPct, bandFor, marketCoverage, ALL_MARKETS, MARKET_LABELS,
  type ChecklistState,
} from '@/data/assessment';

interface TrustData { client_name: string; answers: ChecklistState; updated_at: string | null }

export function TrustPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<TrustData | null | 'not-found'>(null);

  useEffect(() => {
    if (!token || !supabase) { setData('not-found'); return; }
    supabase.rpc('get_trust_page', { share_token: token }).then(({ data: rows, error }) => {
      const row = Array.isArray(rows) ? rows[0] : rows;
      if (error || !row) { setData('not-found'); return; }
      setData({ client_name: row.client_name, answers: row.answers ?? {}, updated_at: row.updated_at });
    });
  }, [token]);

  if (data === null) {
    return <CenteredShell><p className="text-sm text-muted">Loading…</p></CenteredShell>;
  }

  if (data === 'not-found') {
    return (
      <CenteredShell>
        <ShieldAlert className="mx-auto h-10 w-10 text-error-500" />
        <p className="mt-4 text-lg font-semibold text-navy dark:text-cream">This trust page isn't available</p>
        <p className="mt-2 text-sm text-muted">The link may be incorrect, or sharing may have been turned off.</p>
      </CenteredShell>
    );
  }

  const count = checkedCount(data.answers);
  const pct = overallPct(data.answers);
  const band = bandFor(count);
  const coverage = marketCoverage(data.answers);

  return (
    <div className="min-h-screen bg-white dark:bg-[#080b16]">
      <header className="border-b border-app px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/"><Logo /></Link>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm font-medium text-muted">
          <ShieldCheck className="h-4 w-4 text-success-500" /> Vendor & AI Governance Readiness
        </div>
        <h1 className="mt-2 text-3xl font-bold text-navy dark:text-cream">{data.client_name}</h1>
        {data.updated_at && (
          <p className="mt-1 text-xs text-muted">Last updated {new Date(data.updated_at).toLocaleDateString()}</p>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-md border border-app surface p-5">
            <p className="text-xs text-muted">Overall Readiness</p>
            <p className="mt-1 text-4xl font-bold text-navy dark:text-cream">{pct}%</p>
            <p className="mt-1 text-sm text-muted">{band.levelLabel}</p>
          </div>
          <div className="rounded-md border border-app surface p-5">
            <p className="text-xs text-muted">Markets tracked</p>
            <p className="mt-1 text-4xl font-bold text-navy dark:text-cream">{ALL_MARKETS.length}</p>
            <p className="mt-1 text-sm text-muted">Singapore, Malaysia, Indonesia, Philippines, Cambodia, Japan, South Korea, Taiwan</p>
          </div>
        </div>

        <h2 className="mt-10 mb-4 text-lg font-semibold text-navy dark:text-cream">Market Access Readiness</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ALL_MARKETS.map(code => {
            const c = coverage[code];
            return (
              <div key={code} className="rounded-sm border border-app surface p-3">
                <p className="text-xs font-medium text-navy dark:text-cream">{MARKET_LABELS[code]}</p>
                <p className="mt-1 text-2xl font-bold text-navy dark:text-cream">{c.pct}%</p>
                <div className="mt-2"><ProgressBar value={c.pct} /></div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-md border border-app surface p-5 text-sm text-muted">
          This page reflects a self-reported governance assessment mapped to real APAC financial regulator frameworks (MAS, BNM, OJK, BSP, NBC, FSA, EFTA, FSC). It is not independently audited.
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          <a href="https://ohkariku-boop.github.io/oblig/" className="inline-flex items-center gap-1 hover:underline">
            Generated with Oblig <ExternalLink className="h-3 w-3" />
          </a>
        </p>
      </div>
    </div>
  );
}

function CenteredShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 text-center dark:bg-[#080b16]">
      <div className="max-w-sm">{children}</div>
    </div>
  );
}
