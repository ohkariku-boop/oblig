import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderArchive, Upload, Search, FileText, FileCheck, FileSignature,
  Award, FileSearch, Filter, Sparkles, Download, Eye, Tag,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader, EmptyState } from '@/components/ui/Feedback';
import { sampleEvidence } from '@/data/sampleData';
import type { EvidenceItem } from '@/types';
import { cn, formatDate } from '@/utils/cn';

const typeIcon: Record<string, typeof FileText> = {
  policy: FileText, screenshot: FileSearch, contract: FileSignature, audit: FileCheck, certificate: Award, report: FileText,
};
const typeColor: Record<string, string> = {
  policy: '#3b66f5', screenshot: '#14b8a6', contract: '#f59e0b', audit: '#8b5cf6', certificate: '#22c55e', report: '#0ea5e9',
};

export function EvidencePage() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | EvidenceItem['type']>('all');
  const [selected, setSelected] = useState<EvidenceItem | null>(null);

  const types: ('all' | EvidenceItem['type'])[] = ['all', 'policy', 'screenshot', 'contract', 'audit', 'certificate', 'report'];
  const filtered = sampleEvidence.filter(e =>
    (typeFilter === 'all' || e.type === typeFilter) &&
    (e.name.toLowerCase().includes(query.toLowerCase()) || e.tags.some(t => t.includes(query.toLowerCase()))),
  );

  return (
    <div>
      <PageHeader
        title="Evidence Library"
        description="A searchable repository for policies, contracts, audits and certificates."
        action={<button className="btn-primary"><Upload className="h-4 w-4" /> Upload Evidence</button>}
      />

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total documents', value: sampleEvidence.length },
          { label: 'Policies', value: sampleEvidence.filter(e => e.type === 'policy').length },
          { label: 'Certificates', value: sampleEvidence.filter(e => e.type === 'certificate').length },
          { label: 'Audits & reports', value: sampleEvidence.filter(e => e.type === 'audit' || e.type === 'report').length },
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
      <Card className="mb-6 border-dashed">
        <CardBody className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 dark:bg-primary-900/30 dark:text-primary-300">
            <Upload className="h-6 w-6" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-800 dark:text-slate-100">Drag and drop files here, or click to browse</p>
          <p className="mt-1 text-xs text-muted">PDF, PNG, JPG, DOCX up to 25 MB. AI categorises them automatically.</p>
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
          <p className="text-sm text-muted">AI auto-categorisation and tagging will be applied to new uploads. Existing items can be re-tagged in bulk soon.</p>
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
              <p className="text-sm text-muted">Preview not available for this file type in the demo.</p>
              <div className="flex gap-2">
                <button className="btn-secondary !py-2"><Eye className="h-4 w-4" /> Preview</button>
                <button className="btn-primary !py-2"><Download className="h-4 w-4" /> Download</button>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="btn-secondary mt-4 w-full">Close</button>
          </Card>
        </div>
      )}
    </div>
  );
}
