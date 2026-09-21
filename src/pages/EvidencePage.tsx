import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FolderArchive, Upload, Search, FileText, FileCheck, FileSignature,
  Award, FileSearch, Filter, Sparkles, Download, Eye, Tag, Trash2, X,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader, EmptyState } from '@/components/ui/Feedback';
import { sampleEvidence } from '@/data/sampleData';
import type { EvidenceItem } from '@/types';
import { cn, formatDate } from '@/utils/cn';
import { useAuth } from '@/lib/AuthContext';
import { useClient } from '@/lib/ClientContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/lib/ToastContext';
import { logError } from '@/lib/errorLogging';

const typeIcon: Record<string, typeof FileText> = {
  policy: FileText, screenshot: FileSearch, contract: FileSignature, audit: FileCheck, certificate: Award, report: FileText,
};
const typeColor: Record<string, string> = {
  policy: '#3b66f5', screenshot: '#14b8a6', contract: '#f59e0b', audit: '#8b5cf6', certificate: '#22c55e', report: '#0ea5e9',
};

export function EvidencePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { activeClient } = useClient();
  const { push } = useToast();
  const [userEvidence, setUserEvidence] = useState<EvidenceItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | EvidenceItem['type']>('all');
  const [selected, setSelected] = useState<EvidenceItem | null>(null);

  useEffect(() => {
    if (!user || !supabase || !activeClient) { setUserEvidence([]); return; }
    supabase.from('evidence').select('*').eq('client_id', activeClient.id).order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!data) return;
        setUserEvidence(data.map((r): EvidenceItem => ({
          id: r.id, name: r.title, type: r.type ?? 'policy', size: '—',
          uploadedAt: r.created_at,
          tags: [r.framework_ref, r.control_ref, r.checklist_key].filter(Boolean) as string[],
          controlRef: r.control_ref ?? undefined,
          checklistKey: r.checklist_key ?? undefined,
          systemId: r.system_id ?? null,
          vendorId: r.vendor_id ?? null,
          coverageStatus: r.coverage_status ?? 'partial',
          description: r.description ?? undefined,
        })));
      });
  }, [user, activeClient]);

  async function addEvidence(input: {
    title: string; description: string; type: EvidenceItem['type']; frameworkRef: string;
    controlRef: string; checklistKey: string; coverageStatus: 'none' | 'partial' | 'full';
  }) {
    if (!user || !supabase || !activeClient) return;
    const { data, error } = await supabase.from('evidence').insert({
      user_id: user.id, client_id: activeClient.id, title: input.title, description: input.description,
      type: input.type, framework_ref: input.frameworkRef || null,
      control_ref: input.controlRef || null,
      checklist_key: input.checklistKey || null,
      coverage_status: input.coverageStatus,
    }).select().single();
    if (error || !data) {
      logError(`Failed to add evidence: ${error?.message ?? 'unknown error'}`);
      push('Could not save this entry. Please try again.', 'error');
      return;
    }
    setUserEvidence(prev => [{
      id: data.id, name: data.title, type: data.type ?? 'policy', size: '—',
      uploadedAt: data.created_at,
      tags: [data.framework_ref, data.control_ref, data.checklist_key].filter(Boolean) as string[],
      controlRef: data.control_ref ?? undefined,
      checklistKey: data.checklist_key ?? undefined,
      coverageStatus: data.coverage_status ?? 'partial',
      description: data.description ?? undefined,
    }, ...prev]);
    setShowAdd(false);
    push('Evidence logged.');
  }

  async function deleteEvidence(id: string) {
    if (!supabase) return;
    const { error } = await supabase.from('evidence').delete().eq('id', id);
    if (error) {
      logError(`Failed to delete evidence: ${error.message}`);
      push('Could not delete this entry. Please try again.', 'error');
      return;
    }
    setUserEvidence(prev => prev.filter(e => e.id !== id));
    setSelected(null);
    push('Evidence deleted.');
  }

  const allEvidence = user ? userEvidence : [...userEvidence, ...sampleEvidence];
  const types: ('all' | EvidenceItem['type'])[] = ['all', 'policy', 'screenshot', 'contract', 'audit', 'certificate', 'report'];
  const filtered = allEvidence.filter(e =>
    (typeFilter === 'all' || e.type === typeFilter) &&
    (e.name.toLowerCase().includes(query.toLowerCase()) || e.tags.some(t => t.includes(query.toLowerCase()))),
  );

  if (showAdd) return <AddEvidenceForm onCancel={() => setShowAdd(false)} onSave={addEvidence} />;

  return (
    <div>
      <PageHeader
        title="Evidence Library"
        description="Log evidence and link it to controls or checklist items. File upload comes later — metadata and coverage status first."
        action={<button onClick={() => user ? setShowAdd(true) : navigate('/login')} className="btn-primary">{user ? <><Upload className="h-4 w-4" /> Upload Evidence</> : <>Sign in to add evidence</>}</button>}
      />

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total documents', value: allEvidence.length },
          { label: 'Policies', value: allEvidence.filter(e => e.type === 'policy').length },
          { label: 'Certificates', value: allEvidence.filter(e => e.type === 'certificate').length },
          { label: 'Audits & reports', value: allEvidence.filter(e => e.type === 'audit' || e.type === 'report').length },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {types.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition', typeFilter === t ? 'bg-primary-600 text-white' : 'surface border border-app text-slate-600 dark:text-slate-300')}>
              {t}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or tag…" className="input pl-9 !py-2" />
        </div>
      </div>

      {/* Upload dropzone */}
      <Card className="mb-6 cursor-pointer border-dashed" onClick={() => user ? setShowAdd(true) : navigate('/login')}>
        <CardBody className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 dark:bg-primary-900/30 dark:text-primary-300">
            <Upload className="h-6 w-6" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-800 dark:text-slate-100">Log a piece of evidence</p>
          <p className="mt-1 text-xs text-muted">{user ? 'Click to record a title, type, and note (file upload not yet available).' : 'Sign in to add evidence to your account.'}</p>
        </CardBody>
      </Card>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card><EmptyState icon={<FolderArchive className="h-6 w-6" />} title="No evidence found" description="Try a different search or upload new evidence." /></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e, i) => {
            const Icon = typeIcon[e.type] ?? FileText;
            return (
              <motion.div key={e.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card hover className="cursor-pointer p-5" onClick={() => setSelected(e)}>
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: typeColor[e.type] }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="neutral">{e.type}</Badge>
                  </div>
                  <h3 className="mt-3 truncate font-semibold text-slate-900 dark:text-white">{e.name}</h3>
                  <p className="mt-1 text-xs text-muted">{e.size} · {formatDate(e.uploadedAt)}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.tags.map(t => (
                      <span key={t} className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <Tag className="h-2.5 w-2.5" /> {t}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* AI categorisation note */}
      <Card className="mt-6">
        <CardBody className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-primary-500 shrink-0" />
          <p className="text-sm text-muted">Evidence entries are logged manually for now (title, type, framework reference). Real file storage and AI auto-categorisation are on the roadmap.</p>
        </CardBody>
      </Card>

      {/* Preview modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <Card className="relative w-full max-w-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-white" style={{ background: typeColor[selected.type] }}>
                {(() => { const Icon = typeIcon[selected.type] ?? FileText; return <Icon className="h-6 w-6" />; })()}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{selected.name}</h3>
                <p className="mt-0.5 text-sm text-muted">{selected.size} · Uploaded {formatDate(selected.uploadedAt)}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selected.tags.map(t => <Badge key={t} variant="info">{t}</Badge>)}
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
              <p className="text-sm text-muted">{userEvidence.some(e => e.id === selected.id) ? 'Logged manually — no file attached yet.' : 'Sample entry — no real file exists behind this in the demo.'}</p>
              {userEvidence.some(e => e.id === selected.id) && (
                <button onClick={() => deleteEvidence(selected.id)} className="btn-secondary !py-2 text-error-600"><Trash2 className="h-4 w-4" /> Delete</button>
              )}
            </div>
            <button onClick={() => setSelected(null)} className="btn-secondary mt-4 w-full">Close</button>
          </Card>
        </div>
      )}
    </div>
  );
}

function AddEvidenceForm({ onCancel, onSave }: {
  onCancel: () => void;
  onSave: (input: {
    title: string; description: string; type: EvidenceItem['type']; frameworkRef: string;
    controlRef: string; checklistKey: string; coverageStatus: 'none' | 'partial' | 'full';
  }) => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<EvidenceItem['type']>('policy');
  const [frameworkRef, setFrameworkRef] = useState('');
  const [controlRef, setControlRef] = useState('');
  const [checklistKey, setChecklistKey] = useState('');
  const [coverageStatus, setCoverageStatus] = useState<'none' | 'partial' | 'full'>('partial');

  return (
    <div>
      <PageHeader
        title="Log Evidence"
        description="Link metadata to a control or checklist item. Real file storage is on the roadmap."
        action={<button onClick={onCancel} className="btn-secondary"><X className="h-4 w-4" /> Cancel</button>}
      />
      <Card className="max-w-xl">
        <CardBody className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="input w-full" placeholder="e.g. ISO 27001 certificate 2026" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink">Type</label>
            <select value={type} onChange={e => setType(e.target.value as EvidenceItem['type'])} className="input w-full">
              <option value="policy">Policy</option>
              <option value="screenshot">Screenshot</option>
              <option value="contract">Contract</option>
              <option value="audit">Audit</option>
              <option value="certificate">Certificate</option>
              <option value="report">Report</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink">Notes / location</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="input w-full" rows={3} placeholder="Where the real file lives, who owns it, when it expires, etc." />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink">Framework ref</label>
            <input value={frameworkRef} onChange={e => setFrameworkRef(e.target.value)} className="input w-full" placeholder="e.g. MAS TRM, BNM RMiT" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink">Control ref</label>
            <input value={controlRef} onChange={e => setControlRef(e.target.value)} className="input w-full" placeholder="e.g. TPR, GOV, access-control" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink">Checklist key (optional)</label>
            <input value={checklistKey} onChange={e => setChecklistKey(e.target.value)} className="input w-full" placeholder="e.g. section id or item label" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink">Coverage status</label>
            <select value={coverageStatus} onChange={e => setCoverageStatus(e.target.value as 'none' | 'partial' | 'full')} className="input w-full">
              <option value="none">None</option>
              <option value="partial">Partial</option>
              <option value="full">Full</option>
            </select>
          </div>
          <button
            type="button"
            className="btn-primary"
            disabled={!title.trim()}
            onClick={() => onSave({
              title: title.trim(), description, type, frameworkRef, controlRef, checklistKey, coverageStatus,
            })}
          >
            Save evidence
          </button>
        </CardBody>
      </Card>
    </div>
  );
}
