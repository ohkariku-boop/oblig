import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts';
import {
  ShieldCheck, ChevronDown, FileDown, RotateCcw, Sparkles, ArrowRight,
  ArrowLeft, Lightbulb, TrendingUp, Target, Clock, Save, CheckCircle2,
  Circle, AlertTriangle, type LucideIcon,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { ScoreRing, ProgressBar, Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/Feedback';
import {
  DATA, TOTAL_ITEMS, MILESTONES, MILESTONE_NOTES, type Milestone,
  itemKey, checkedCount, bandFor, sectionScores, overallPct, recommendations,
  marketCoverage, ALL_MARKETS, MARKET_LABELS, type ChecklistState,
} from '@/data/assessment';
import { exportScorecardPdf } from '@/utils/exportPdf';
import { cn } from '@/utils/cn';
import { useClient } from '@/lib/ClientContext';

type View = 'checklist' | 'results';

const sectionIcons: Record<string, LucideIcon> = {
  access: ShieldCheck, devices: ShieldCheck, data: ShieldCheck,
  apps: ShieldCheck, people: ShieldCheck, vendors: ShieldCheck, continuity: ShieldCheck,
};

export function AssessmentPage() {
  const { assessmentState: state, setAssessmentState: setState, activeClient, clients, setActiveClientId } = useClient();
  const [view, setView] = useState<View>('checklist');
  const [milestone, setMilestone] = useState<Milestone | 'none'>('none');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ access: true });

  const count = useMemo(() => checkedCount(state), [state]);
  const band = useMemo(() => bandFor(count), [count]);
  const scores = useMemo(() => sectionScores(state), [state]);
  const recs = useMemo(() => recommendations(state), [state]);
  const coverage = useMemo(() => marketCoverage(state), [state]);
  const pct = overallPct(state);

  function toggleItem(key: string, checked: boolean) {
    setState(prev => ({ ...prev, [key]: checked }));
  }
  function toggleSection(id: string) {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  }
  function resetAll() {
    if (confirm('Reset every checked item? This can\u2019t be undone.')) {
      setState({});
      setView('checklist');
    }
  }

  if (view === 'results') {
    return <Results state={state} scores={scores} band={band} count={count} pct={pct} recs={recs} milestone={milestone} onReview={() => setView('checklist')} onRetake={resetAll} />;
  }

  return (
    <div>
      <PageHeader
        title="Governance Scorecard"
        description="The original Oblig IT Governance Checklist — work through it and export a branded PDF."
        action={
          <>
            <span className="hidden items-center gap-1.5 mono-label sm:flex"><Save className="h-3.5 w-3.5 text-success-500" /> Auto-saved</span>
            <button onClick={resetAll} className="btn-secondary"><RotateCcw className="h-4 w-4" /> Reset</button>
            <button onClick={() => setView('results')} className="btn-primary">View Results <ArrowRight className="h-4 w-4" /></button>
          </>
        }
      />

      {/* Score + milestone cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="card px-5 py-5">
          <div className="font-grotesk text-5xl font-bold leading-none text-navy dark:text-cream">
            {count}/{TOTAL_ITEMS}
          </div>
          <span className="mt-1.5 block mono-label text-red">{band.label}</span>
          <div className="mt-2 text-[13px] text-ink">{band.desc}</div>
          <div className="mt-3"><ProgressBar value={pct} /></div>
        </div>

        <div className="card px-5 py-5">
          <label htmlFor="milestone" className="mb-2 block mono-label">Where are you right now?</label>
          <select
            id="milestone"
            value={milestone}
            onChange={e => setMilestone(e.target.value as Milestone | 'none')}
            className="input"
          >
            <option value="none">Just get me the full list</option>
            {MILESTONES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
          <div className="mt-2.5 text-[13px] text-ink">{MILESTONE_NOTES[milestone]}</div>
        </div>
      </div>

      {/* Market readiness — the piece that makes this different from a generic checklist */}
      <div className="card mb-8 px-5 py-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="mono-label">Market Access Readiness</p>
          <Link to="/app/compliance" className="text-xs font-medium text-red hover:underline">View full framework mapping →</Link>
        </div>
        <p className="mb-4 text-[13px] text-ink">Each market maps to a real regulator framework. Coverage updates live as you check items above.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ALL_MARKETS.map(code => {
            const c = coverage[code];
            return (
              <div key={code} className="rounded-sm border border-app surface p-3">
                <p className="text-xs font-medium text-navy dark:text-cream">{MARKET_LABELS[code]}</p>
                <p className="mt-1 text-2xl font-bold text-navy dark:text-cream">{c.pct}%</p>
                <p className="text-[11px] text-ink">{c.checked}/{c.total} applicable items</p>
                <div className="mt-2"><ProgressBar value={c.pct} /></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sections */}
      <div>
        {DATA.map((sec, sIdx) => {
          const sectionChecked = sec.items.filter((_, i) => state[itemKey(sec.id, i)]).length;
          const isOpen = !!openSections[sec.id];
          const SecIcon = sectionIcons[sec.id] ?? ShieldCheck;
          return (
            <div key={sec.id} className="mb-3.5 overflow-hidden rounded-md border border-app surface">
              <div
                onClick={() => toggleSection(sec.id)}
                className={cn('flex cursor-pointer select-none items-center justify-between px-5 py-4', isOpen && 'border-b border-app')}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[13px] font-bold text-red">{String(sIdx + 1).padStart(2, '0')}</span>
                  <span className="font-grotesk text-[17px] font-semibold text-navy dark:text-cream">{sec.name}</span>
                  <span className="hidden text-[13px] text-ink sm:inline">— {sec.tag}</span>
                </div>
                <div className="flex items-center">
                  <span className="ml-3 whitespace-nowrap font-mono text-xs text-ink">{sectionChecked}/{sec.items.length}</span>
                  <ChevronDown className={cn('ml-2.5 h-4 w-4 text-ink transition-transform duration-150', isOpen && 'rotate-180')} />
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    {sec.items.map((it, i) => {
                      const key = itemKey(sec.id, i);
                      const checked = !!state[key];
                      const isMilestoneHit = milestone !== 'none' && it.m.includes(milestone);
                      return (
                        <div
                          key={key}
                          className={cn(
                            'flex gap-3 border-t border-app px-5 py-3',
                            i === 0 && 'border-t-0',
                            isMilestoneHit && 'bg-[#f6ede4] dark:bg-[#2a1a14]',
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={e => toggleItem(key, e.target.checked)}
                            onClick={e => e.stopPropagation()}
                            className="mt-[3px] h-4 w-4 flex-shrink-0 accent-red"
                          />
                          <div>
                            <div className="text-[14.5px] text-navy dark:text-cream">
                              {it.t}
                              {isMilestoneHit && <span className="ml-2 font-mono text-[10px] text-red">★ YOUR STAGE</span>}
                            </div>
                            <div className="mt-[3px] text-[13px] text-ink">
                              <span className="mr-1.5 font-mono text-[10px] text-red">WHY</span>{it.w}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={() => exportScorecardPdf(state, milestone)} className="btn-primary">
          <FileDown className="h-4 w-4" /> Export branded PDF
        </button>
        <button onClick={() => setView('results')} className="btn-secondary">
          View maturity results <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Results({ state, scores, band, count, pct, recs, milestone, onReview, onRetake }: {
  state: ChecklistState;
  scores: ReturnType<typeof sectionScores>;
  band: ReturnType<typeof bandFor>;
  count: number;
  pct: number;
  recs: ReturnType<typeof recommendations>;
  milestone: Milestone | 'none';
  onReview: () => void;
  onRetake: () => void;
}) {
  const radarData = scores.map(s => ({ name: s.name.split(' ')[0], score: s.pct, fullMark: 100 }));
  const barData = [...scores].map(s => ({ ...s, name: s.shortName })).sort((a, b) => a.pct - b.pct);
  const scoreColor = (s: number) => s >= 70 ? '#22c55e' : s >= 40 ? '#f59e0b' : '#2563eb';

  return (
    <div>
      <PageHeader
        title="Assessment Results"
        description={`${count} of ${TOTAL_ITEMS} items checked — ${band.label} (Level ${band.level}: ${band.levelLabel})`}
        action={
          <>
            <button onClick={onReview} className="btn-secondary"><ArrowLeft className="h-4 w-4" /> Review checklist</button>
            <button onClick={() => exportScorecardPdf(state, milestone)} className="btn-primary"><FileDown className="h-4 w-4" /> Download PDF</button>
          </>
        }
      />

      {/* Score hero */}
      <Card className="mb-6 overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col items-center justify-center border-b border-app p-8 lg:border-b-0 lg:border-r">
            <ScoreRing score={pct} size={160} label="Complete" />
            <Badge variant={pct >= 70 ? 'success' : pct >= 40 ? 'warning' : 'error'} className="mt-4">
              <ShieldCheck className="h-3.5 w-3.5" /> Level {band.level} — {band.levelLabel}
            </Badge>
            <p className="mt-3 max-w-xs text-center text-sm text-ink">{band.desc}</p>
          </div>
          <div className="p-6">
            <h3 className="mono-label">Section breakdown</h3>
            <div className="mt-4 space-y-3">
              {scores.map(s => (
                <div key={s.id}>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy dark:text-cream">{s.name}</span>
                    <span className="font-semibold text-navy dark:text-cream">{s.checked}/{s.total}</span>
                  </div>
                  <ProgressBar value={s.pct} className="mt-1" color={scoreColor(s.pct)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Maturity Radar" subtitle="Strengths vs gaps" icon={<Target className="h-5 w-5" />} />
          <CardBody>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke="rgba(106,121,147,0.25)" />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: '#5b7280' }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#5b7280' }} axisLine={false} />
                  <Radar dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Section Scores" subtitle="Lowest to highest" icon={<TrendingUp className="h-5 w-5" />} />
          <CardBody>
            <div className="h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ left: 8, right: 20, top: 4, bottom: 4 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#5b7280' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 11, fill: '#5b7280' }} axisLine={false} tickLine={false} interval={0} />
                  <Tooltip contentStyle={{ borderRadius: 6, border: '1px solid #d3dfe6', fontSize: 13 }} formatter={(value) => [`${value}%`, 'Score']} />
                  <Bar dataKey="pct" radius={[0, 4, 4, 0]} barSize={22}>
                    {barData.map((entry, i) => <Cell key={i} fill={scoreColor(entry.pct)} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Benchmark */}
      <Card className="mt-6">
        <CardHeader title="Benchmark Comparison" subtitle="How you compare" icon={<TrendingUp className="h-5 w-5" />} />
        <CardBody>
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { label: 'Your score', value: pct, color: '#2563eb' },
              { label: 'SMB average', value: 42, color: '#5b7280' },
              { label: 'Industry leaders', value: 82, color: '#22c55e' },
              { label: 'Certification ready', value: 75, color: '#0c1b2e' },
            ].map(b => (
              <div key={b.label} className="rounded-md border border-app p-4 text-center">
                <p className="text-3xl font-bold" style={{ color: b.color }}>{b.value}%</p>
                <p className="mt-1 text-xs text-ink">{b.label}</p>
                <ProgressBar value={b.value} className="mt-2" color={b.color} />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Recommendations */}
      <Card className="mt-6">
        <CardHeader title="Recommendations" subtitle="Prioritised by impact" icon={<Lightbulb className="h-5 w-5" />} />
        <CardBody className="space-y-3">
          {recs.map((r, i) => (
            <div key={i} className="flex items-start gap-3 rounded-md border border-app p-4">
              <div className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-cream',
                r.impact === 'high' ? 'bg-red' : r.impact === 'medium' ? 'bg-warning-500' : 'bg-navy',
              )}>
                {r.impact === 'high' ? <AlertTriangle className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant={r.impact === 'high' ? 'error' : r.impact === 'medium' ? 'warning' : 'info'}>{r.impact}</Badge>
                  <span className="text-xs text-ink">{r.section}</span>
                </div>
                <p className="mt-1.5 text-sm text-navy dark:text-cream">{r.text}</p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* History + CTA */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Assessment History" subtitle="Your progress" icon={<Clock className="h-5 w-5" />} />
          <CardBody>
            <div className="space-y-3">
              {[
                { date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), score: pct, current: true },
                { date: 'Apr 15, 2026', score: 41 },
                { date: 'Jan 20, 2026', score: 28 },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between rounded-md border border-app p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-paper text-red dark:bg-navy-800">
                      <Target className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy dark:text-cream">{h.date}</p>
                      {h.current && <span className="text-xs text-red">Latest</span>}
                    </div>
                  </div>
                  <span className="text-lg font-bold text-navy dark:text-cream">{h.score}%</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card className="flex flex-col justify-center">
          <CardBody className="text-center">
            <Sparkles className="mx-auto h-8 w-8 text-red" />
            <h3 className="mt-3 font-grotesk text-lg font-semibold text-navy dark:text-cream">Put these insights to work</h3>
            <p className="mt-1 text-sm text-ink">Ask the AI Copilot to build your roadmap or generate the policies you're missing.</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link to="/app/copilot" className="btn-primary"><Sparkles className="h-4 w-4" /> Open AI Copilot</Link>
              <button onClick={onRetake} className="btn-secondary"><RotateCcw className="h-4 w-4" /> Retake</button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
