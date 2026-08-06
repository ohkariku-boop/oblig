import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Map, CheckCircle2, Circle, Clock, ArrowRight, Sparkles,
  Target, TrendingUp, Flag,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge, ProgressBar } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/Feedback';
import { sampleRoadmap, MATURITY_LABELS } from '@/data/sampleData';
import { cn } from '@/utils/cn';

const statusConfig = {
  done: { icon: CheckCircle2, color: 'text-success-500', bg: 'bg-success-500', label: 'Completed' },
  active: { icon: Circle, color: 'text-primary-500', bg: 'bg-primary-500', label: 'In progress' },
  upcoming: { icon: Clock, color: 'text-slate-400', bg: 'bg-slate-400', label: 'Upcoming' },
};

export function RoadmapPage() {
  const completedItems = sampleRoadmap.filter(p => p.status === 'done').reduce((n, p) => n + p.items.length, 0);
  const totalItems = sampleRoadmap.reduce((n, p) => n + p.items.length, 0);

  return (
    <div>
      <PageHeader
        title="Governance Roadmap"
        description="A phased path from your current maturity to your target level."
        action={<Link to="/app/copilot" className="btn-primary"><Sparkles className="h-4 w-4" /> Ask AI to refine</Link>}
      />

      {/* Level summary */}
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        <Card>
          <CardBody className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
              <Target className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs text-muted">Current → Target</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">Level 2 → Level 3</p>
              <p className="text-sm text-muted">{MATURITY_LABELS[2]} → {MATURITY_LABELS[3]}</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Progress" subtitle={`${completedItems} of ${totalItems} milestones complete`} icon={<TrendingUp className="h-5 w-5" />} />
          <CardBody>
            <ProgressBar value={(completedItems / totalItems) * 100} className="h-3" />
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div><p className="text-xl font-bold text-success-500">{completedItems}</p><p className="text-xs text-muted">Done</p></div>
              <div><p className="text-xl font-bold text-primary-500">{sampleRoadmap.find(p => p.status === 'active')?.items.length ?? 0}</p><p className="text-xs text-muted">Active</p></div>
              <div><p className="text-xl font-bold text-slate-400">{totalItems - completedItems - (sampleRoadmap.find(p => p.status === 'active')?.items.length ?? 0)}</p><p className="text-xs text-muted">Upcoming</p></div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader title="Phased Roadmap" subtitle="From foundations to maturity" icon={<Map className="h-5 w-5" />} />
        <CardBody>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-8">
              {sampleRoadmap.map((phase, i) => {
                const cfg = statusConfig[phase.status];
                const Icon = cfg.icon;
                return (
                  <motion.div key={phase.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative flex gap-5">
                    <div className={cn('relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-soft', cfg.bg)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{phase.title}</h3>
                        <Badge variant={phase.status === 'done' ? 'success' : phase.status === 'active' ? 'info' : 'neutral'}>
                          {cfg.label}
                        </Badge>
                        <span className="text-xs text-muted">Level {phase.level}</span>
                        <span className="ml-auto text-xs text-muted">{phase.timeframe}</span>
                      </div>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {phase.items.map(item => (
                          <li key={item} className="flex items-center gap-2 rounded-lg border border-app px-3 py-2 text-sm text-slate-700 dark:text-slate-200">
                            {phase.status === 'done' ? <CheckCircle2 className="h-4 w-4 text-success-500 shrink-0" />
                              : phase.status === 'active' ? <ArrowRight className="h-4 w-4 text-primary-500 shrink-0" />
                              : <Circle className="h-4 w-4 text-slate-300 dark:text-slate-600 shrink-0" />}
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Target callout */}
      <Card className="mt-6 overflow-hidden">
        <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 p-6 text-white">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Flag className="h-7 w-7" />
              <div>
                <p className="text-lg font-semibold">Target: Level 3 (Defined) in ~6 months</p>
                <p className="text-sm text-white/90">Complete the active phase and you'll reach a certifiable maturity baseline.</p>
              </div>
            </div>
            <Link to="/app/assessment" className="rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/30 transition">Re-assess</Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
