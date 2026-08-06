import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import {
  ShieldCheck, ShieldAlert, FileText, TrendingUp, Sparkles, ArrowRight,
  CalendarClock, Activity, Target, AlertTriangle, ChevronRight, type LucideIcon,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { ScoreRing, ProgressBar, Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/Feedback';
import { dashboardSummary, sampleActivity } from '@/data/sampleData';
import { formatRelative, daysUntil, cn } from '@/utils/cn';

const activityIcon: Record<string, LucideIcon> = {
  assessment: Target, ai: Sparkles, risk: ShieldAlert, policy: FileText,
  evidence: FileText, system: Activity,
};

export function DashboardPage() {
  const s = dashboardSummary;
  const healthTone = s.healthStatus === 'healthy' ? 'success' : s.healthStatus === 'attention' ? 'warning' : 'error';

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Your governance programme at a glance."
        action={
          <>
            <Link to="/app/assessment" className="btn-secondary">New Assessment</Link>
            <Link to="/app/copilot" className="btn-primary"><Sparkles className="h-4 w-4" /> Ask AI Copilot</Link>
          </>
        }
      />

      {/* Top KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Target} label="Governance Score" value={`${s.governanceScore}`} suffix="/100" tone="primary" trend="+4 this month" />
        <KpiCard icon={ShieldCheck} label="Maturity Level" value={`${s.maturityLevel}`} suffix={` · ${s.maturityLabel}`} tone="secondary" trend="Defined" />
        <KpiCard icon={ShieldAlert} label="Open Risks" value={`${s.openRisks}`} tone="warning" trend="2 high priority" />
        <KpiCard icon={FileText} label="Policy Coverage" value={`${s.policyCoverage}%`} tone="primary" trend="3 drafts pending" />
      </div>

      {/* Score + trend */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader title="Governance Health" subtitle="Overall maturity score" icon={<ShieldCheck className="h-5 w-5" />} />
          <CardBody className="flex flex-col items-center pt-2">
            <ScoreRing score={s.governanceScore} size={140} label="Score" />
            <Badge variant={healthTone as 'success' | 'warning' | 'error'} className="mt-4">
              {s.healthStatus === 'healthy' ? <ShieldCheck className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
              {s.healthLabel}
            </Badge>
            <div className="mt-4 grid w-full grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
                <p className="text-lg font-bold text-slate-900 dark:text-white">{s.maturityLabel}</p>
                <p className="text-xs text-muted">Maturity</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
                <p className="text-lg font-bold text-slate-900 dark:text-white">{s.complianceReadiness}%</p>
                <p className="text-xs text-muted">Compliance</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Governance Score Trend" subtitle="Last 6 months" icon={<TrendingUp className="h-5 w-5" />} />
          <CardBody>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={s.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1b2a4a" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#1b2a4a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(106,121,147,0.18)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6a7993' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6a7993' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 6, border: '1px solid #e6ddca', fontSize: 13 }} />
                  <Area type="monotone" dataKey="score" stroke="#1b2a4a" strokeWidth={2.5} fill="url(#scoreGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Radar + recommendations */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Category Scores" subtitle="Strengths and gaps across domains" icon={<Target className="h-5 w-5" />} />
          <CardBody>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={s.categoryScores} outerRadius="72%">
                  <PolarGrid stroke="rgba(106,121,147,0.25)" />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: '#6a7993' }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#6a7993' }} axisLine={false} />
                  <Radar dataKey="score" stroke="#1b2a4a" fill="#1b2a4a" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Latest AI Recommendations"
            subtitle="Prioritised by impact"
            icon={<Sparkles className="h-5 w-5" />}
            action={<Link to="/app/copilot" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">Open Copilot</Link>}
          />
          <CardBody className="space-y-3">
            {s.aiRecommendations.map(r => (
              <div key={r.id} className="flex items-start gap-3 rounded-xl border border-app bg-slate-50 dark:bg-slate-800/40 p-3.5 hover:border-primary-300 dark:hover:border-primary-700 transition">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-red text-cream">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 dark:text-slate-200">{r.title}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Badge variant={r.impact === 'high' ? 'error' : r.impact === 'medium' ? 'warning' : 'info'}>{r.impact} impact</Badge>
                    <span className="text-xs text-muted">{r.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Tasks + activity */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Upcoming Governance Tasks" subtitle="What needs your attention" icon={<CalendarClock className="h-5 w-5" />} />
          <CardBody className="space-y-2.5">
            {s.upcomingTasks.map(t => {
              const days = daysUntil(t.due);
              const overdue = days < 0;
              const soon = days >= 0 && days <= 3;
              return (
                <div key={t.id} className="flex items-center gap-3 rounded-xl border border-app p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <div className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                    t.priority === 'high' ? 'bg-error-100 text-error-600 dark:bg-error-900/30 dark:text-error-400'
                      : t.priority === 'medium' ? 'bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
                  )}>
                    <CalendarClock className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{t.title}</p>
                    <p className={cn('text-xs', overdue ? 'text-error-500' : soon ? 'text-warning-500' : 'text-muted')}>
                      {overdue ? `${Math.abs(days)} days overdue` : `Due in ${days} days`}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted" />
                </div>
              );
            })}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recent Activity" subtitle="Across your workspace" icon={<Activity className="h-5 w-5" />} />
          <CardBody>
            <ol className="relative space-y-4 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200 dark:before:bg-slate-700">
              {sampleActivity.map(a => {
                const Icon = activityIcon[a.type] ?? Activity;
                return (
                  <li key={a.id} className="relative flex gap-3">
                    <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full surface border border-app text-slate-500 dark:text-slate-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 pb-1">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{a.title}</p>
                      <p className="text-xs text-muted">{a.detail}</p>
                      <p className="mt-0.5 text-xs text-muted">{formatRelative(a.timestamp)} · {a.user}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </CardBody>
        </Card>
      </div>

      {/* Quick stats footer */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat icon={Target} label="Recent Assessments" value={s.recentAssessments} />
        <MiniStat icon={AlertTriangle} label="Open Recommendations" value={s.openRecommendations} />
        <MiniStat icon={ShieldAlert} label="High Risks" value={2} />
        <MiniStat icon={ShieldCheck} label="Compliance Readiness" value={`${s.complianceReadiness}%`} />
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, suffix, tone, trend }: { icon: LucideIcon; label: string; value: string; suffix?: string; tone: 'primary' | 'secondary' | 'warning'; trend: string }) {
  const toneClass = tone === 'primary' ? 'from-navy to-[#2a4170]' : tone === 'secondary' ? 'from-red to-[#a82d24]' : 'from-warning-500 to-accent-500';
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card hover className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
              {value}<span className="text-base font-medium text-muted">{suffix}</span>
            </p>
          </div>
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br text-cream', toneClass)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">{trend}</p>
      </Card>
    </motion.div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string | number }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-paper text-navy dark:bg-[#16223d] dark:text-cream">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-lg font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs text-muted">{label}</p>
      </div>
    </div>
  );
}
