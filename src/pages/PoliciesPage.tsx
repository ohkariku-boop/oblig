import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Plus, Search, Sparkles, FileDown, Edit3, History,
  CheckCircle2, Clock, AlertCircle, FileEdit, type LucideIcon,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader, EmptyState, ComingSoon } from '@/components/ui/Feedback';
import { samplePolicies } from '@/data/sampleData';
import type { PolicyDoc } from '@/types';
import { cn, formatDate } from '@/utils/cn';

const policyTemplates: { title: string; type: string; icon: LucideIcon; desc: string }[] = [
  { title: 'Information Security Policy', type: 'Security', icon: FileText, desc: 'Core security responsibilities and controls.' },
  { title: 'Password Policy', type: 'Security', icon: FileText, desc: 'Password standards and MFA requirements.' },
  { title: 'Remote Working Policy', type: 'Workplace', icon: FileText, desc: 'Secure remote access expectations.' },
  { title: 'Asset Management Policy', type: 'Operations', icon: FileText, desc: 'How assets are tracked and classified.' },
  { title: 'Vendor Management Policy', type: 'Third-party', icon: FileText, desc: 'Supplier due diligence and monitoring.' },
  { title: 'Incident Response Policy', type: 'Security', icon: FileText, desc: 'How incidents are detected and handled.' },
  { title: 'Business Continuity Policy', type: 'Continuity', icon: FileText, desc: 'Keeping the business running.' },
  { title: 'Disaster Recovery Plan', type: 'Continuity', icon: FileText, desc: 'Recovery objectives and procedures.' },
  { title: 'Acceptable Use Policy', type: 'Usage', icon: FileText, desc: 'Appropriate use of systems and data.' },
  { title: 'Data Classification Policy', type: 'Data', icon: FileText, desc: 'How data is classified and handled.' },
];

const statusVariant: Record<string, 'success' | 'info' | 'warning' | 'neutral'> = {
  approved: 'success', published: 'success', review: 'warning', draft: 'neutral',
};
const statusIcon: Record<string, typeof CheckCircle2> = {
  approved: CheckCircle2, published: CheckCircle2, review: Clock, draft: AlertCircle,
};

export function PoliciesPage() {
  const [filter, setFilter] = useState<'all' | 'draft' | 'review' | 'approved'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<PolicyDoc | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);

  const filtered = samplePolicies.filter(p =>
    (filter === 'all' || p.status === filter) &&
    p.title.toLowerCase().includes(query.toLowerCase()),
  );

  if (selected) {
    return <PolicyEditor policy={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div>
      <PageHeader
        title="AI Policy Generator"
        description="Generate, edit and export governance documentation."
        action={
          <>
            <button className="btn-secondary"><History className="h-4 w-4" /> Version history</button>
            <button onClick={() => setShowGenerator(true)} className="btn-primary"><Sparkles className="h-4 w-4" /> Generate Policy</button>
          </>
        }
      />

      {/* Status summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Approved', value: samplePolicies.filter(p => p.status === 'approved').length, tone: 'text-success-600' },
          { label: 'In review', value: samplePolicies.filter(p => p.status === 'review').length, tone: 'text-warning-600' },
          { label: 'Drafts', value: samplePolicies.filter(p => p.status === 'draft').length, tone: 'text-slate-600' },
          { label: 'Coverage', value: '48%', tone: 'text-primary-600' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className={cn('text-2xl font-bold', s.tone)}>{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Filters + search */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1.5">
          {(['all', 'draft', 'review', 'approved'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition',
                filter === f ? 'bg-primary-600 text-white' : 'surface border border-app text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800',
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search policies…" className="input pl-9 !py-2" />
        </div>
      </div>

      {/* Policy list */}
      {filtered.length === 0 ? (
        <Card><EmptyState icon={<FileText className="h-6 w-6" />} title="No policies found" description="Try a different filter or generate a new policy with AI." /></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => {
            const SIcon = statusIcon[p.status] ?? AlertCircle;
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card hover className="h-full cursor-pointer p-5" onClick={() => setSelected(p)}>
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                      <FileText className="h-5 w-5" />
                    </div>
                    <Badge variant={statusVariant[p.status]}><SIcon className="h-3 w-3" /> {p.status}</Badge>
                  </div>
                  <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{p.summary}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span>v{p.version} · {p.owner}</span>
                    <span>{formatDate(p.updatedAt)}</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Templates */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Generate from a template</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {policyTemplates.map(t => (
            <div key={t.title} className="flex items-center gap-3 rounded-xl border border-app surface p-4 hover:border-primary-300 dark:hover:border-primary-700 transition">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                <t.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{t.title}</p>
                <p className="truncate text-xs text-muted">{t.desc}</p>
              </div>
              <button className="btn-ghost !p-1.5" aria-label={`Generate ${t.title}`}><Sparkles className="h-4 w-4 text-primary-500" /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Generator modal placeholder */}
      {showGenerator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowGenerator(false)} />
          <Card className="relative w-full max-w-lg p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Generate a policy with AI</h3>
            </div>
            <p className="mt-2 text-sm text-muted">Choose a template and the AI Copilot will draft a full policy based on your governance context. Editing and export open automatically.</p>
            <div className="mt-4 max-h-72 space-y-2 overflow-y-auto">
              {policyTemplates.map(t => (
                <button key={t.title} onClick={() => { setShowGenerator(false); }} className="flex w-full items-center gap-3 rounded-xl border border-app p-3 text-left hover:border-primary-300 transition">
                  <t.icon className="h-4 w-4 text-primary-500" />
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{t.title}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowGenerator(false)} className="btn-secondary mt-4 w-full">Close</button>
          </Card>
        </div>
      )}
    </div>
  );
}

function PolicyEditor({ policy, onBack }: { policy: PolicyDoc; onBack: () => void }) {
  return (
    <div>
      <PageHeader
        title={policy.title}
        description={`Version ${policy.version} · ${policy.owner} · Updated ${formatDate(policy.updatedAt)}`}
        action={
          <>
            <button onClick={onBack} className="btn-secondary">Back</button>
            <button className="btn-secondary"><FileDown className="h-4 w-4" /> Export Word</button>
            <button className="btn-primary"><FileDown className="h-4 w-4" /> Export PDF</button>
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <Card>
          <CardHeader title="Document" icon={<FileEdit className="h-5 w-5" />} action={<Badge variant={statusVariant[policy.status]}>{policy.status}</Badge>} />
          <CardBody>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h2>1. Purpose</h2>
              <p>{policy.summary}</p>
              <h2>2. Scope</h2>
              <p>This policy applies to all employees, contractors and third parties who access company systems or data.</p>
              <h2>3. Responsibilities</h2>
              <ul>
                <li>Leadership: approve and review this policy annually.</li>
                <li>IT: implement and monitor technical controls.</li>
                <li>All staff: comply with the requirements below.</li>
              </ul>
              <h2>4. Requirements</h2>
              <p>Detailed control requirements are defined in the supporting procedures. Edit this section to tailor it to your organisation.</p>
              <h2>5. Review</h2>
              <p>This policy is reviewed at least annually or following a significant incident.</p>
            </div>
            <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
              <p className="flex items-center gap-2 text-xs text-muted"><Sparkles className="h-3.5 w-3.5 text-primary-500" /> This is an AI-generated draft. Review and edit before publishing.</p>
            </div>
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Version history" />
            <CardBody className="space-y-2">
              {[
                { v: policy.version, date: policy.updatedAt, by: policy.owner, current: true },
                { v: '1.0', date: '2026-05-10', by: 'CTO', current: false },
                { v: '0.8', date: '2026-04-22', by: 'IT Lead', current: false },
              ].map(v => (
                <div key={v.v} className={cn('rounded-lg p-3 text-sm', v.current ? 'bg-primary-50 dark:bg-primary-900/20' : 'border border-app')}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800 dark:text-slate-100">v{v.v}</span>
                    {v.current && <Badge variant="info">current</Badge>}
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{v.by} · {formatDate(v.date)}</p>
                </div>
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <ComingSoon title="Collaboration" description="Comments, suggestions and approval workflows are coming soon." icon={<Edit3 className="h-7 w-7" />} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
