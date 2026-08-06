import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert, Plus, Search, Sparkles, Filter, ArrowUpDown,
  Flame, AlertTriangle, CheckCircle2, Eye,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge, ProgressBar } from '@/components/ui/Badge';
import { PageHeader, EmptyState } from '@/components/ui/Feedback';
import { sampleRisks } from '@/data/sampleData';
import type { Risk } from '@/types';
import { cn, formatDate, daysUntil } from '@/utils/cn';

const statusVariant: Record<string, 'error' | 'warning' | 'success' | 'neutral'> = {
  open: 'error', mitigating: 'warning', closed: 'success', accepted: 'neutral',
};

function riskScore(likelihood: number, impact: number) {
  return likelihood * impact;
}
function riskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score >= 16) return 'critical';
  if (score >= 10) return 'high';
  if (score >= 5) return 'medium';
  return 'low';
}
const levelColor: Record<string, string> = {
  low: '#22c55e', medium: '#f59e0b', high: '#f97316', critical: '#ef4444',
};

type SortKey = 'score' | 'likelihood' | 'impact' | 'reviewDate';

export function RiskPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'mitigating' | 'closed' | 'accepted'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [selected, setSelected] = useState<Risk | null>(null);

  let risks = sampleRisks.filter(r =>
    (statusFilter === 'all' || r.status === statusFilter) &&
    r.title.toLowerCase().includes(query.toLowerCase()),
  );
  risks = [...risks].sort((a, b) => {
    if (sortKey === 'reviewDate') return new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime();
    if (sortKey === 'score') return riskScore(b.likelihood, b.impact) - riskScore(a.likelihood, a.impact);
    return (b[sortKey] as number) - (a[sortKey] as number);
  });

  const heatData = sampleRisks.map(r => ({ x: r.likelihood, y: r.impact, title: r.title, level: riskLevel(riskScore(r.likelihood, r.impact)) }));

  if (selected) return <RiskDetail risk={selected} onBack={() => setSelected(null)} />;

  return (
    <div>
      <PageHeader
        title="Risk Register"
        description="Identify, score and mitigate your governance and security risks."
        action={
          <>
            <button className="btn-secondary"><Sparkles className="h-4 w-4" /> AI Generate Risks</button>
            <button className="btn-primary"><Plus className="h-4 w-4" /> Add Risk</button>
          </>
        }
      />

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Open risks', value: sampleRisks.filter(r => r.status === 'open').length, tone: 'text-error-600' },
          { label: 'Mitigating', value: sampleRisks.filter(r => r.status === 'mitigating').length, tone: 'text-warning-600' },
          { label: 'Closed', value: sampleRisks.filter(r => r.status === 'closed').length, tone: 'text-success-600' },
          { label: 'High+ critical', value: sampleRisks.filter(r => riskLevel(riskScore(r.likelihood, r.impact)) === 'high' || riskLevel(riskScore(r.likelihood, r.impact)) === 'critical').length, tone: 'text-accent-600' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className={cn('text-2xl font-bold', s.tone)}>{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Heat map + table */}
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader title="Risk Heat Map" subtitle="Likelihood × Impact" icon={<Flame className="h-5 w-5" />} />
          <CardBody>
            <HeatMap data={heatData} />
            <div className="mt-4 grid grid-cols-4 gap-1.5 text-center text-[10px]">
              {(['low', 'medium', 'high', 'critical'] as const).map(l => (
                <div key={l} className="flex items-center justify-center gap-1">
                  <span className="h-2.5 w-2.5 rounded" style={{ background: levelColor[l] }} />
                  <span className="capitalize text-muted">{l}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Risk Register" subtitle={`${risks.length} risks`} icon={<ShieldAlert className="h-5 w-5" />}
            action={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search…" className="input !py-1.5 pl-8 text-sm w-40" />
                </div>
              </div>
            }
          />
          <CardBody className="p-0">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 border-b border-app px-5 py-3">
              <Filter className="h-4 w-4 text-muted" />
              {(['all', 'open', 'mitigating', 'closed', 'accepted'] as const).map(f => (
                <button key={f} onClick={() => setStatusFilter(f)} className={cn('rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition', statusFilter === f ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800')}>{f}</button>
              ))}
              <div className="ml-auto flex items-center gap-1.5 text-xs text-muted">
                <ArrowUpDown className="h-3.5 w-3.5" /> Sort:
                <select value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)} className="rounded-lg border border-app surface px-2 py-1 text-xs">
                  <option value="score">Risk score</option>
                  <option value="likelihood">Likelihood</option>
                  <option value="impact">Impact</option>
                  <option value="reviewDate">Review date</option>
                </select>
              </div>
            </div>

            {risks.length === 0 ? (
              <EmptyState icon={<ShieldAlert className="h-6 w-6" />} title="No risks match" description="Adjust filters or add a new risk." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-app text-left text-xs uppercase tracking-wide text-muted">
                      <th className="px-5 py-3 font-semibold">Risk</th>
                      <th className="px-3 py-3 font-semibold">L</th>
                      <th className="px-3 py-3 font-semibold">I</th>
                      <th className="px-3 py-3 font-semibold">Score</th>
                      <th className="px-3 py-3 font-semibold">Owner</th>
                      <th className="px-3 py-3 font-semibold">Review</th>
                      <th className="px-3 py-3 font-semibold">Status</th>
                      <th className="px-3 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {risks.map((r, i) => {
                      const score = riskScore(r.likelihood, r.impact);
                      const level = riskLevel(score);
                      return (
                        <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-app last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer" onClick={() => setSelected(r)}>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              {r.aiGenerated && <Sparkles className="h-3.5 w-3.5 text-primary-500 shrink-0" />}
                              <span className="font-medium text-slate-800 dark:text-slate-100">{r.title}</span>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-muted">{r.likelihood}</td>
                          <td className="px-3 py-3 text-muted">{r.impact}</td>
                          <td className="px-3 py-3">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="h-2.5 w-2.5 rounded-full" style={{ background: levelColor[level] }} />
                              <span className="font-semibold text-slate-800 dark:text-slate-100">{score}</span>
                            </span>
                          </td>
                          <td className="px-3 py-3 text-muted">{r.owner}</td>
                          <td className="px-3 py-3 text-muted">{formatDate(r.reviewDate)}</td>
                          <td className="px-3 py-3"><Badge variant={statusVariant[r.status]}>{r.status}</Badge></td>
                          <td className="px-3 py-3"><Eye className="h-4 w-4 text-muted" /></td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function HeatMap({ data }: { data: { x: number; y: number; title: string; level: string }[] }) {
  const cells: { l: number; i: number; color: string }[] = [];
  for (let l = 1; l <= 5; l++) {
    for (let i = 1; i <= 5; i++) {
      const score = l * i;
      const level = riskLevel(score);
      cells.push({ l, i, color: levelColor[level] });
    }
  }
  return (
    <div className="flex items-end gap-2">
      <div className="flex flex-col justify-between py-1 text-[10px] text-muted">
        <span>5</span><span>4</span><span>3</span><span>2</span><span>1</span>
      </div>
      <div>
        <div className="grid grid-cols-5 gap-1">
          {[5, 4, 3, 2, 1].map(impact => (
            [1, 2, 3, 4, 5].map(like => {
              const risksHere = data.filter(d => d.x === like && d.y === impact);
              return (
                <div key={`${like}-${impact}`} className="relative h-12 w-12 rounded-md flex items-center justify-center" style={{ background: levelColor[riskLevel(like * impact)], opacity: 0.25 }}>
                  {risksHere.length > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-md" style={{ background: levelColor[riskLevel(like * impact)], opacity: 0.9 }}>
                      <span className="text-xs font-bold text-white">{risksHere.length}</span>
                    </div>
                  )}
                </div>
              );
            })
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-muted"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
        <p className="mt-1 text-center text-[10px] text-muted">Likelihood →</p>
      </div>
    </div>
  );
}

function RiskDetail({ risk, onBack }: { risk: Risk; onBack: () => void }) {
  const score = riskScore(risk.likelihood, risk.impact);
  const level = riskLevel(score);
  return (
    <div>
      <PageHeader
        title={risk.title}
        description={risk.description}
        action={<>
          <button onClick={onBack} className="btn-secondary">Back</button>
          <button className="btn-primary">Update</button>
        </>}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader title="Risk Score" />
          <CardBody className="text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full text-white" style={{ background: levelColor[level] }}>
              <div>
                <p className="text-4xl font-bold">{score}</p>
                <p className="text-xs uppercase opacity-90">{level}</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-left">
              <div>
                <div className="flex justify-between text-xs"><span className="text-muted">Likelihood</span><span className="font-semibold">{risk.likelihood}/5</span></div>
                <ProgressBar value={risk.likelihood * 20} color={levelColor[level]} className="mt-1" />
              </div>
              <div>
                <div className="flex justify-between text-xs"><span className="text-muted">Impact</span><span className="font-semibold">{risk.impact}/5</span></div>
                <ProgressBar value={risk.impact * 20} color={levelColor[level]} className="mt-1" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Mitigation Plan" action={<Badge variant={statusVariant[risk.status]}>{risk.status}</Badge>} />
          <CardBody>
            <p className="text-sm text-slate-700 dark:text-slate-200">{risk.mitigation}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <DetailRow label="Owner" value={risk.owner} />
              <DetailRow label="Review date" value={`${formatDate(risk.reviewDate)} (${daysUntil(risk.reviewDate)}d)`} />
              <DetailRow label="Status" value={<Badge variant={statusVariant[risk.status]}>{risk.status}</Badge>} />
              <DetailRow label="AI generated" value={risk.aiGenerated ? <Badge variant="info"><Sparkles className="h-3 w-3" /> Yes</Badge> : 'No'} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-app p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">{value}</p>
    </div>
  );
}
