import { useEffect, useState } from 'react';
import {
  FileBarChart, FileDown, FileText, Presentation, ShieldCheck,
  ShieldAlert, Target, Network, Sparkles, Clock,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge, ProgressBar } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/Feedback';
import { sampleRisks, sampleFrameworks } from '@/data/sampleData';
import { useLiveGovernanceSummary } from '@/lib/useLiveGovernanceSummary';
import { exportGovernancePdf } from '@/utils/exportPdf';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/lib/ToastContext';

const reports = [
  { id: 'dashboard', title: 'Governance Dashboard', desc: 'A one-page executive summary of score, risks and readiness.', icon: Target, sections: 6 },
  { id: 'board', title: 'Board Report', desc: 'Quarterly governance narrative for board review.', icon: FileText, sections: 8 },
  { id: 'risk', title: 'Risk Report', desc: 'Full risk register with heat map and top risks.', icon: ShieldAlert, sections: 5 },
  { id: 'assessment', title: 'Assessment Report', desc: 'Detailed maturity assessment with recommendations.', icon: ShieldCheck, sections: 7 },
  { id: 'compliance', title: 'Compliance Summary', desc: 'Coverage across all tracked frameworks.', icon: Network, sections: 4 },
];

export function ReportsPage() {
  const { user } = useAuth();
  const { push } = useToast();
  const dashboardSummary = useLiveGovernanceSummary();
  const [history, setHistory] = useState<{ id: string; report_type: string; created_at: string }[]>([]);

  useEffect(() => {
    if (!user || !supabase) { setHistory([]); return; }
    supabase.from('report_log').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10)
      .then(({ data }) => { if (data) setHistory(data); });
  }, [user]);

  const handleExport = (title: string, reportId: string) => {
    exportGovernancePdf({
      title: `${title} — Oblig`,
      subtitle: `Generated ${new Date().toLocaleDateString()}${dashboardSummary.isLive ? '' : ' (sample data — complete your assessment for a real report)'}`,
      overall: dashboardSummary.governanceScore,
      levelLabel: dashboardSummary.maturityLabel,
      perCategory: dashboardSummary.categoryScores.map(c => ({ categoryName: c.name, score: c.score })),
      bodyLines: [
        `${title} prepared from the latest governance data on ${new Date().toLocaleDateString()}.`,
        `Overall governance score: ${dashboardSummary.governanceScore}/100 (Maturity Level ${dashboardSummary.maturityLevel} — ${dashboardSummary.maturityLabel}).`,
        `Open risks: ${dashboardSummary.openRisks}. Policy coverage: ${dashboardSummary.policyCoverage}%. Compliance readiness: ${dashboardSummary.complianceReadiness}%.`,
        `Top frameworks: ${sampleFrameworks.slice(0, 3).map(f => `${f.shortName} ${f.coverage}%`).join(', ')}.`,
      ],
    });
    push('Report downloaded.');
    if (user && supabase) {
      const client = supabase;
      client.from('report_log').insert({ user_id: user.id, report_type: reportId }).then(() => {
        client.from('report_log').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10)
          .then(({ data }) => { if (data) setHistory(data); });
      });
    }
  };

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Generate and export board-ready governance reports."
        action={<button className="btn-primary" disabled title="Coming soon"><Sparkles className="h-4 w-4" /> AI Generate Report</button>}
      />

      {/* Report cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map(r => (
          <Card key={r.id} hover className="flex flex-col p-5">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                <r.icon className="h-5 w-5" />
              </div>
              <Badge variant="neutral">{r.sections} sections</Badge>
            </div>
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{r.title}</h3>
            <p className="mt-1 flex-1 text-sm text-muted">{r.desc}</p>
            <div className="mt-4 flex items-center gap-2">
              <button onClick={() => handleExport(r.title, r.id)} className="btn-secondary !py-2 flex-1"><FileDown className="h-4 w-4" /> PDF</button>
              <button className="btn-secondary !py-2 flex-1" disabled title="Coming soon"><Presentation className="h-4 w-4" /> PPT</button>
              <button className="btn-secondary !py-2 flex-1" disabled title="Coming soon"><FileText className="h-4 w-4" /> Word</button>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview */}
      <Card className="mt-6">
        <CardHeader title="Report Preview" subtitle="Governance Dashboard report" icon={<FileBarChart className="h-5 w-5" />} />
        <CardBody>
          <div className="rounded-xl border border-app bg-slate-50 dark:bg-slate-900/40 p-6">
            <div className="flex items-center justify-between border-b border-app pb-4">
              <div>
                <p className="text-xs text-muted">Oblig Governance Report</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Governance Dashboard</h3>
              </div>
              <span className="text-xs text-muted">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="grid gap-4 py-5 sm:grid-cols-4">
              {[
                { label: 'Governance Score', value: `${dashboardSummary.governanceScore}/100` },
                { label: 'Maturity', value: dashboardSummary.maturityLabel },
                { label: 'Open Risks', value: dashboardSummary.openRisks },
                { label: 'Compliance', value: `${dashboardSummary.complianceReadiness}%` },
              ].map(m => (
                <div key={m.label} className="rounded-lg surface p-3">
                  <p className="text-xs text-muted">{m.label}</p>
                  <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{m.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {dashboardSummary.categoryScores.map(c => (
                <div key={c.name}>
                  <div className="flex justify-between text-xs"><span className="text-slate-600 dark:text-slate-300">{c.name}</span><span className="font-semibold">{c.score}%</span></div>
                  <ProgressBar value={c.score} className="mt-1" />
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg surface p-4">
              <p className="text-xs font-semibold uppercase text-muted">Top risks</p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-700 dark:text-slate-200">
                {sampleRisks.slice(0, 3).map(r => <li key={r.id} className="flex items-center justify-between"><span>{r.title}</span><Badge variant={r.status === 'open' ? 'error' : 'warning'}>{r.status}</Badge></li>)}
              </ul>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" />
            {history.length > 0 ? `Last generated ${new Date(history[0].created_at).toLocaleString()}` : 'No reports generated yet'} · This is a preview — exports include full formatting.
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
