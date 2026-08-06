import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Network, Search, CheckCircle2, XCircle, AlertTriangle,
  ArrowRight, Layers, Sparkles,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge, ProgressBar } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/Feedback';
import { sampleFrameworks } from '@/data/sampleData';
import type { Framework } from '@/types';
import { cn } from '@/utils/cn';

export function CompliancePage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Framework | null>(sampleFrameworks[1]);
  const [compare, setCompare] = useState<string[]>(['iso27001', 'soc2']);

  const filtered = sampleFrameworks.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
  const compareFrameworks = sampleFrameworks.filter(f => compare.includes(f.id));

  const controls = selected ? generateControls(selected) : [];

  return (
    <div>
      <PageHeader
        title="Compliance Mapping"
        description="See your coverage against major governance and security frameworks."
        action={<button className="btn-primary"><Sparkles className="h-4 w-4" /> AI Gap Analysis</button>}
      />

      {/* Overall coverage */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs text-muted">Frameworks tracked</p>
          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{sampleFrameworks.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-muted">Average coverage</p>
          <p className="mt-1 text-3xl font-bold text-primary-600">{Math.round(sampleFrameworks.reduce((s, f) => s + f.coverage, 0) / sampleFrameworks.length)}%</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-muted">Controls met</p>
          <p className="mt-1 text-3xl font-bold text-success-600">{sampleFrameworks.reduce((s, f) => s + f.metControls, 0)}</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Framework list */}
        <div>
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search frameworks…" className="input pl-9 !py-2" />
          </div>
          <div className="space-y-2">
            {filtered.map(f => (
              <button
                key={f.id}
                onClick={() => setSelected(f)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition',
                  selected?.id === f.id ? 'border-primary-300 bg-primary-50 dark:border-primary-700 dark:bg-primary-900/20' : 'border-app surface hover:border-slate-300 dark:hover:border-slate-600',
                )}
              >
                <div className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ background: f.color }}>
                  {f.shortName.slice(0, 4)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{f.shortName}</p>
                  <p className="text-xs text-muted">{f.metControls}/{f.totalControls} controls · {f.coverage}%</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        {selected && (
          <div className="space-y-6">
            <Card>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selected.name}</h2>
                    <p className="mt-1 text-sm text-muted">{selected.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold" style={{ color: selected.color }}>{selected.coverage}%</p>
                    <p className="text-xs text-muted">{selected.metControls}/{selected.totalControls} controls</p>
                  </div>
                </div>
                <ProgressBar value={selected.coverage} color={selected.color} className="mt-4 h-2.5" />
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Control Coverage" subtitle="Met, missing and partial controls" icon={<Layers className="h-5 w-5" />} />
              <CardBody className="space-y-2">
                {controls.map(c => (
                  <div key={c.id} className="flex items-start gap-3 rounded-xl border border-app p-3">
                    {c.status === 'met' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-500" />
                      : c.status === 'partial' ? <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning-500" />
                      : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-400" />}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{c.id} — {c.name}</p>
                      </div>
                      <p className="mt-0.5 text-xs text-muted">{c.description}</p>
                    </div>
                    <Badge variant={c.status === 'met' ? 'success' : c.status === 'partial' ? 'warning' : 'error'}>
                      {c.status}
                    </Badge>
                  </div>
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Recommendations" subtitle="Close the gaps for this framework" icon={<Sparkles className="h-5 w-5" />} />
              <CardBody className="space-y-2">
                {controls.filter(c => c.status !== 'met').slice(0, 3).map(c => (
                  <div key={c.id} className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 p-3">
                    <Sparkles className="h-4 w-4 text-primary-500 shrink-0" />
                    <p className="flex-1 text-sm text-slate-700 dark:text-slate-200">Implement <span className="font-medium">{c.name}</span> to progress toward {selected.shortName} compliance.</p>
                    <button className="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">Start <ArrowRight className="inline h-3 w-3" /></button>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        )}
      </div>

      {/* Comparison */}
      <Card className="mt-6">
        <CardHeader title="Framework Comparison" subtitle="Select frameworks to compare side by side" icon={<Network className="h-5 w-5" />} />
        <CardBody>
          <div className="mb-4 flex flex-wrap gap-2">
            {sampleFrameworks.map(f => {
              const active = compare.includes(f.id);
              return (
                <button key={f.id} onClick={() => setCompare(c => active ? c.filter(id => id !== f.id) : [...c, f.id])} className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition', active ? 'bg-primary-600 text-white' : 'surface border border-app text-slate-600 dark:text-slate-300')}>
                  {f.shortName}
                </button>
              );
            })}
          </div>
          {compareFrameworks.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-app text-left text-xs uppercase tracking-wide text-muted">
                    <th className="py-2 pr-4 font-semibold">Framework</th>
                    <th className="py-2 px-4 font-semibold">Coverage</th>
                    <th className="py-2 px-4 font-semibold">Controls met</th>
                    <th className="py-2 px-4 font-semibold">Total</th>
                    <th className="py-2 pl-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {compareFrameworks.map(f => (
                    <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-app last:border-0">
                      <td className="py-3 pr-4 font-medium text-slate-800 dark:text-slate-100">{f.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <ProgressBar value={f.coverage} color={f.color} className="w-24" />
                          <span className="text-xs font-semibold" style={{ color: f.color }}>{f.coverage}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted">{f.metControls}</td>
                      <td className="py-3 px-4 text-muted">{f.totalControls}</td>
                      <td className="py-3 pl-4"><Badge variant={f.coverage >= 70 ? 'success' : f.coverage >= 45 ? 'warning' : 'error'}>{f.coverage >= 70 ? 'Strong' : f.coverage >= 45 ? 'Developing' : 'Early'}</Badge></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function generateControls(f: Framework) {
  const base = [
    { id: 'A.1', name: 'Governance & Leadership', description: 'Defined ownership and direction for the programme.', status: f.coverage >= 60 ? 'met' : 'partial' as const },
    { id: 'A.2', name: 'Risk Assessment', description: 'Identify and assess risks to objectives.', status: f.coverage >= 55 ? 'met' : 'partial' as const },
    { id: 'A.3', name: 'Access Control', description: 'Identity, authentication and authorisation.', status: f.coverage >= 65 ? 'met' : 'partial' as const },
    { id: 'A.4', name: 'Asset Management', description: 'Inventory and classification of assets.', status: f.coverage >= 50 ? 'met' : 'missing' as const },
    { id: 'A.5', name: 'Incident Management', description: 'Detect, respond to and learn from incidents.', status: f.coverage >= 58 ? 'met' : 'missing' as const },
    { id: 'A.6', name: 'Business Continuity', description: 'Resilience and recovery capabilities.', status: f.coverage >= 52 ? 'partial' : 'missing' as const },
    { id: 'A.7', name: 'Supplier Relationships', description: 'Third-party risk management.', status: f.coverage >= 48 ? 'partial' : 'missing' as const },
    { id: 'A.8', name: 'Awareness & Training', description: 'Ongoing staff security awareness.', status: f.coverage >= 56 ? 'met' : 'partial' as const },
  ];
  return base;
}
