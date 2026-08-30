import { useEffect, useMemo, useState } from 'react';
import { ClipboardList, Search, CheckCircle2, AlertCircle, FileDown, Sparkles } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/Feedback';
import { useAuth } from '@/lib/AuthContext';
import { useClient } from '@/lib/ClientContext';
import { supabase } from '@/lib/supabase';
import { QUESTIONNAIRE_QUESTIONS, type QuestionnaireContext, type DraftAnswer } from '@/data/questionnaireQuestions';
import { exportGovernancePdf } from '@/utils/exportPdf';
import type { PolicyDoc, Risk, EvidenceItem } from '@/types';

export function QuestionnairePage() {
  const { user } = useAuth();
  const { activeClient, assessmentState } = useClient();
  const [policies, setPolicies] = useState<PolicyDoc[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [query, setQuery] = useState('');
  const [edited, setEdited] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user || !supabase || !activeClient) return;
    supabase.from('policies').select('*').eq('client_id', activeClient.id)
      .then(({ data }) => { if (data) setPolicies(data.map((r): PolicyDoc => ({ id: r.id, title: r.title, type: r.framework_ref ?? 'General', status: r.status, version: '1.0', updatedAt: r.updated_at, owner: user.email ?? 'You', summary: (r.content ?? '').slice(0, 140) }))); });
    supabase.from('risks').select('*').eq('client_id', activeClient.id)
      .then(({ data }) => { if (data) setRisks(data.map((r): Risk => ({ id: r.id, title: r.title, description: r.description ?? '', likelihood: r.likelihood, impact: r.impact, owner: r.owner ?? '', reviewDate: r.review_date ?? '', mitigation: r.mitigation ?? '', status: r.status }))); });
    supabase.from('evidence').select('*').eq('client_id', activeClient.id)
      .then(({ data }) => { if (data) setEvidence(data.map((r): EvidenceItem => ({ id: r.id, name: r.title, type: r.type ?? 'policy', size: '—', uploadedAt: r.created_at, tags: r.framework_ref ? [r.framework_ref] : [] }))); });
  }, [user, activeClient]);

  const ctx: QuestionnaireContext = useMemo(() => ({ assessmentState, policies, risks, evidence }), [assessmentState, policies, risks, evidence]);

  const drafts = useMemo(() => {
    const map: Record<string, DraftAnswer> = {};
    QUESTIONNAIRE_QUESTIONS.forEach(q => { map[q.id] = q.answerFrom(ctx); });
    return map;
  }, [ctx]);

  const matchedCount = Object.values(drafts).filter(d => d.matched).length;

  const filtered = QUESTIONNAIRE_QUESTIONS.filter(q =>
    q.question.toLowerCase().includes(query.toLowerCase()) || q.category.toLowerCase().includes(query.toLowerCase()),
  );

  const grouped = filtered.reduce<Record<string, typeof QUESTIONNAIRE_QUESTIONS>>((acc, q) => {
    (acc[q.category] ??= []).push(q);
    return acc;
  }, {});

  function answerText(id: string) {
    return edited[id] ?? drafts[id]?.text ?? '';
  }

  function exportPack() {
    const bodyLines: string[] = [];
    Object.entries(grouped).forEach(([category, qs]) => {
      bodyLines.push(`\n${category.toUpperCase()}`);
      qs.forEach(q => {
        bodyLines.push(`Q: ${q.question}`);
        bodyLines.push(`A: ${answerText(q.id)}`);
        bodyLines.push('');
      });
    });
    exportGovernancePdf({
      title: `Vendor Questionnaire Response Pack — ${activeClient?.name ?? 'Oblig'}`,
      subtitle: `${matchedCount}/${QUESTIONNAIRE_QUESTIONS.length} questions auto-drafted from real data · Generated ${new Date().toLocaleDateString()}`,
      bodyLines,
    });
  }

  return (
    <div>
      <PageHeader
        title="Questionnaire Auto-Draft"
        description="50 common APAC vendor risk questions, pre-filled from your real assessment, policies, evidence, and risk register."
        action={<button onClick={exportPack} className="btn-primary"><FileDown className="h-4 w-4" /> Export Response Pack</button>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <p className="text-xs text-muted">Auto-drafted from real data</p>
          <p className="mt-1 text-3xl font-bold text-success-600">{matchedCount} / {QUESTIONNAIRE_QUESTIONS.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-muted">Needs manual answer</p>
          <p className="mt-1 text-3xl font-bold text-warning-600">{QUESTIONNAIRE_QUESTIONS.length - matchedCount}</p>
        </Card>
      </div>

      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search questions or category…" className="input w-full pl-9" />
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([category, qs]) => (
          <div key={category}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">{category}</h2>
            <div className="space-y-3">
              {qs.map(q => {
                const draft = drafts[q.id];
                return (
                  <Card key={q.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{q.question}</p>
                      {draft.matched
                        ? <Badge variant="success"><CheckCircle2 className="h-3 w-3" /> Auto-drafted</Badge>
                        : <Badge variant="warning"><AlertCircle className="h-3 w-3" /> Manual</Badge>}
                    </div>
                    <textarea
                      value={answerText(q.id)}
                      onChange={e => setEdited(prev => ({ ...prev, [q.id]: e.target.value }))}
                      rows={2}
                      className="input mt-3 w-full text-sm"
                    />
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-md border border-app surface p-4">
        <p className="flex items-center gap-2 text-xs text-muted">
          <Sparkles className="h-3.5 w-3.5 text-primary-500" />
          Deterministic drafts only — nothing here is generated or guessed by AI. Every "Auto-drafted" answer traces to a specific real item in your Assessment, Policies, Evidence, or Risk Register. Review every answer before sending.
        </p>
      </div>
    </div>
  );
}
