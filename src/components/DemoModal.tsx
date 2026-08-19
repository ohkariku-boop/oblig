import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Play, Pause, ChevronRight, Sparkles, Send, User, Flame,
  ShieldAlert, Network, CheckCircle2, AlertTriangle, XCircle, ArrowRight,
} from 'lucide-react';
import { sampleRisks, sampleFrameworks } from '@/data/sampleData';
import { cn } from '@/utils/cn';

type Scene = 'copilot' | 'risk' | 'compliance';

const SCENES: { id: Scene; title: string; subtitle: string; icon: typeof Sparkles }[] = [
  { id: 'copilot', title: 'AI Governance Copilot', subtitle: 'Generate policies and get guidance in plain language', icon: Sparkles },
  { id: 'risk', title: 'Risk Register & Heat Map', subtitle: 'Impact analysis with likelihood × impact scoring', icon: ShieldAlert },
  { id: 'compliance', title: 'Compliance Mapping', subtitle: 'Coverage across ISO 27001, SOC 2, NIST and more', icon: Network },
];

const COPILOT_SCRIPT: { role: 'user' | 'assistant'; content: string; delay: number }[] = [
  { role: 'user', content: 'Generate a Password Policy for my company', delay: 600 },
  { role: 'assistant', content: "Here's a draft Password Policy:\n\n**1. Purpose** — secure password creation across all systems.\n\n**2. Standards** — min 14 chars, mixed case, numbers, symbols, not in breach lists, unique per system.\n\n**3. MFA** — required for critical systems, email and remote access.\n\n**4. Storage** — approved password managers only, encrypted in transit.\n\nYou can open this in the Policy Generator to edit and export as PDF.", delay: 1400 },
  { role: 'user', content: 'What should I prioritise next?', delay: 900 },
  { role: 'assistant', content: "Ranked by impact-to-effort:\n\n1. **Create an Asset Register** — lifts your weakest score (41%)\n2. **Approve the Password Policy** — closes a common audit finding\n3. **Test backup restores quarterly** — your backups run but are untested\n4. **Formalise vendor risk reviews** — needed before any compliance audit\n\nWant me to generate any of these as roadmap items?", delay: 1500 },
];

function riskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score >= 16) return 'critical';
  if (score >= 10) return 'high';
  if (score >= 5) return 'medium';
  return 'low';
}
const levelColor: Record<string, string> = {
  low: '#22c55e', medium: '#f59e0b', high: '#f97316', critical: '#ef4444',
};

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [scene, setScene] = useState<Scene>('copilot');
  const [playing, setPlaying] = useState(true);
  const [copilotStep, setCopilotStep] = useState(0);
  const [copilotMessages, setCopilotMessages] = useState<typeof COPILOT_SCRIPT>([]);
  const [copilotTyping, setCopilotTyping] = useState(false);

  const resetScene = useCallback((s: Scene) => {
    setScene(s);
    setCopilotStep(0);
    setCopilotMessages([]);
    setCopilotTyping(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    resetScene('copilot');
    setPlaying(true);
  }, [open, resetScene]);

  // Copilot auto-play
  useEffect(() => {
    if (!open || scene !== 'copilot' || !playing) return;
    if (copilotStep >= COPILOT_SCRIPT.length) return;
    const msg = COPILOT_SCRIPT[copilotStep];
    if (msg.role === 'user') {
      const t = setTimeout(() => {
        setCopilotMessages(m => [...m, msg]);
        setCopilotStep(s => s + 1);
      }, msg.delay);
      return () => clearTimeout(t);
    } else {
      setCopilotTyping(true);
      const t = setTimeout(() => {
        setCopilotTyping(false);
        setCopilotMessages(m => [...m, msg]);
        setCopilotStep(s => s + 1);
      }, msg.delay);
      return () => clearTimeout(t);
    }
  }, [open, scene, playing, copilotStep]);

  // Auto-advance scenes
  useEffect(() => {
    if (!open || !playing) return;
    if (scene === 'copilot' && copilotStep >= COPILOT_SCRIPT.length) {
      const t = setTimeout(() => resetScene('risk'), 3000);
      return () => clearTimeout(t);
    }
    if (scene === 'risk') {
      const t = setTimeout(() => resetScene('compliance'), 8000);
      return () => clearTimeout(t);
    }
    if (scene === 'compliance') {
      const t = setTimeout(() => resetScene('copilot'), 8000);
      return () => clearTimeout(t);
    }
  }, [open, playing, scene, copilotStep, resetScene]);

  const sceneIdx = SCENES.findIndex(s => s.id === scene);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-app bg-paper shadow-2xl dark:bg-navy-900"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-app px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy to-red text-cream">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy dark:text-cream">Oblig Interactive Demo</p>
                  <p className="text-xs text-ink">A 60-second tour of the platform</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPlaying(p => !p)}
                  className="flex items-center gap-1.5 rounded-md border border-app px-2.5 py-1.5 text-xs font-medium text-ink hover:bg-cream/10 transition"
                >
                  {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  {playing ? 'Pause' : 'Play'}
                </button>
                <button onClick={onClose} className="rounded-md p-1.5 text-ink hover:bg-cream/10 transition" aria-label="Close demo">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scene tabs / progress */}
            <div className="flex items-center gap-1 border-b border-app bg-cream/5 px-5 py-2">
              {SCENES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => resetScene(s.id)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition',
                    scene === s.id
                      ? 'bg-navy text-cream'
                      : i < sceneIdx
                        ? 'text-success-600'
                        : 'text-ink hover:bg-cream/10',
                  )}
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.title}
                  {i < sceneIdx && <CheckCircle2 className="h-3 w-3" />}
                </button>
              ))}
            </div>

            {/* Scene content */}
            <div className="flex-1 overflow-y-auto bg-cream/5 p-5">
              <AnimatePresence mode="wait">
                {scene === 'copilot' && (
                  <CopilotScene key="copilot" messages={copilotMessages} typing={copilotTyping} step={copilotStep} total={COPILOT_SCRIPT.length} />
                )}
                {scene === 'risk' && <RiskScene key="risk" />}
                {scene === 'compliance' && <ComplianceScene key="compliance" />}
              </AnimatePresence>
            </div>

            {/* Footer — scene subtitle */}
            <div className="flex items-center justify-between border-t border-app px-5 py-3">
              <div className="flex items-center gap-2">
                {SCENES.map((s, i) => (
                  <div key={s.id} className={cn('h-1.5 rounded-full transition-all', i === sceneIdx ? 'w-8 bg-red' : i < sceneIdx ? 'w-4 bg-success-500' : 'w-4 bg-line')} />
                ))}
              </div>
              <p className="text-xs text-ink">{SCENES[sceneIdx].subtitle}</p>
              <button
                onClick={() => resetScene(SCENES[(sceneIdx + 1) % SCENES.length].id)}
                className="flex items-center gap-1 text-xs font-medium text-navy hover:text-red dark:text-cream transition"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CopilotScene({ messages, typing, step, total }: { messages: typeof COPILOT_SCRIPT; typing: boolean; step: number; total: number }) {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-red" />
        <p className="text-sm font-semibold text-navy dark:text-cream">AI Governance Copilot</p>
        <span className="ml-auto text-xs text-ink">{Math.min(step, total)}/{total} steps</span>
      </div>
      <div className="space-y-4 rounded-xl border border-app bg-paper p-4 dark:bg-navy-900/60 min-h-[340px]">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('flex gap-3', m.role === 'user' && 'flex-row-reverse')}
          >
            <div className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white',
              m.role === 'assistant' ? 'bg-gradient-to-br from-navy to-red' : 'bg-slate-400',
            )}>
              {m.role === 'assistant' ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </div>
            <div className={cn('max-w-[80%] rounded-xl px-4 py-2.5', m.role === 'assistant' ? 'border border-app bg-cream/10' : 'bg-navy text-cream')}>
              <p className={cn('whitespace-pre-wrap text-sm', m.role === 'assistant' ? 'text-navy dark:text-cream' : 'text-cream')}>{m.content}</p>
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-navy to-red text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 rounded-xl border border-app bg-cream/10 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-red animate-pulse" />
              <span className="h-2 w-2 rounded-full bg-red animate-pulse [animation-delay:150ms]" />
              <span className="h-2 w-2 rounded-full bg-red animate-pulse [animation-delay:300ms]" />
            </div>
          </div>
        )}
        {messages.length === 0 && !typing && (
          <p className="py-12 text-center text-sm text-ink">Starting conversation…</p>
        )}
      </div>
      {/* Fake input bar */}
      <div className="flex items-center gap-2 rounded-xl border border-app bg-paper px-4 py-2.5 dark:bg-navy-900/60">
        <input disabled placeholder="Ask about governance, policies, risks or compliance…" className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink/50 outline-none" />
        <button className="flex h-8 w-8 items-center justify-center rounded-md bg-navy text-cream"><Send className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

function RiskScene() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setVisible(v => (v + 1) % (sampleRisks.length + 1)), 1200);
    return () => clearInterval(interval);
  }, []);

  const heatData = sampleRisks.map(r => ({ x: r.likelihood, y: r.impact, title: r.title }));

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-red" />
        <p className="text-sm font-semibold text-navy dark:text-cream">Risk Register with Impact Analysis</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        {/* Heat map */}
        <div className="rounded-xl border border-app bg-paper p-4 dark:bg-navy-900/60">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-navy dark:text-cream"><Flame className="h-4 w-4 text-red" /> Risk Heat Map</p>
          <div className="flex items-end gap-2">
            <div className="flex flex-col justify-between py-1 text-[10px] text-ink">
              <span>5</span><span>4</span><span>3</span><span>2</span><span>1</span>
            </div>
            <div>
              <div className="grid grid-cols-5 gap-1">
                {[5, 4, 3, 2, 1].map(impact =>
                  [1, 2, 3, 4, 5].map(like => {
                    const here = heatData.filter(d => d.x === like && d.y === impact);
                    return (
                      <div key={`${like}-${impact}`} className="relative h-10 w-10 rounded-md flex items-center justify-center" style={{ background: levelColor[riskLevel(like * impact)], opacity: here.length > 0 ? 0.9 : 0.2 }}>
                        {here.length > 0 && <span className="text-xs font-bold text-white">{here.length}</span>}
                      </div>
                    );
                  }),
                )}
              </div>
              <p className="mt-1.5 text-center text-[10px] text-ink">Likelihood →</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5 text-center text-[10px]">
            {(['low', 'medium', 'high', 'critical'] as const).map(l => (
              <div key={l} className="flex items-center justify-center gap-1">
                <span className="h-2.5 w-2.5 rounded" style={{ background: levelColor[l] }} />
                <span className="capitalize text-ink">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk table */}
        <div className="rounded-xl border border-app bg-paper dark:bg-navy-900/60 overflow-hidden">
          <div className="border-b border-app px-4 py-2.5">
            <p className="text-xs font-semibold text-navy dark:text-cream">Risk Register · {sampleRisks.length} risks</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-app text-left text-[10px] uppercase tracking-wide text-ink">
                <th className="px-4 py-2 font-semibold">Risk</th>
                <th className="px-2 py-2 font-semibold">L</th>
                <th className="px-2 py-2 font-semibold">I</th>
                <th className="px-2 py-2 font-semibold">Score</th>
                <th className="px-4 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleRisks.map((r, i) => {
                const score = r.likelihood * r.impact;
                const level = riskLevel(score);
                const shown = i < visible;
                return (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={shown ? { opacity: 1, x: 0 } : { opacity: 0.15 }}
                    className="border-b border-app last:border-0"
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        {r.aiGenerated && <Sparkles className="h-3 w-3 text-red shrink-0" />}
                        <span className="text-xs font-medium text-navy dark:text-cream">{r.title}</span>
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-xs text-ink">{r.likelihood}</td>
                    <td className="px-2 py-2.5 text-xs text-ink">{r.impact}</td>
                    <td className="px-2 py-2.5">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ background: levelColor[level] }} />
                        <span className="text-xs font-semibold text-navy dark:text-cream">{score}</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-medium capitalize" style={{ background: levelColor[level] + '22', color: levelColor[level] }}>
                        {r.status}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impact analysis highlight */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        className="mt-4 flex items-start gap-3 rounded-xl border border-app bg-paper p-4 dark:bg-navy-900/60"
      >
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-red" />
        <div>
          <p className="text-xs font-semibold text-navy dark:text-cream">AI Impact Analysis</p>
          <p className="mt-1 text-xs text-ink">2 critical risks (score ≥ 16) need immediate treatment: <strong className="text-navy dark:text-cream">Unpatched VPN appliance</strong> and <strong className="text-navy dark:text-cream">Unencrypted laptop with customer data</strong>. Both have high likelihood and severe impact on customer trust.</p>
        </div>
      </motion.div>
    </div>
  );
}

function ComplianceScene() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIdx(i => (i + 1) % sampleFrameworks.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress(0);
    const target = sampleFrameworks[selectedIdx].coverage;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= target) { clearInterval(interval); return target; }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [selectedIdx]);

  const fw = sampleFrameworks[selectedIdx];
  const controls = [
    { id: 'A.1', name: 'Governance & Leadership', status: fw.coverage >= 60 ? 'met' : 'partial' as const },
    { id: 'A.2', name: 'Risk Assessment', status: fw.coverage >= 55 ? 'met' : 'partial' as const },
    { id: 'A.3', name: 'Access Control', status: fw.coverage >= 65 ? 'met' : 'partial' as const },
    { id: 'A.4', name: 'Asset Management', status: fw.coverage >= 50 ? 'met' : 'missing' as const },
    { id: 'A.5', name: 'Incident Management', status: fw.coverage >= 58 ? 'met' : 'missing' as const },
    { id: 'A.6', name: 'Business Continuity', status: fw.coverage >= 52 ? 'partial' : 'missing' as const },
    { id: 'A.7', name: 'Supplier Relationships', status: fw.coverage >= 48 ? 'partial' : 'missing' as const },
    { id: 'A.8', name: 'Awareness & Training', status: fw.coverage >= 56 ? 'met' : 'partial' as const },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center gap-2">
        <Network className="h-4 w-4 text-red" />
        <p className="text-sm font-semibold text-navy dark:text-cream">Compliance Framework Mapping</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        {/* Framework list */}
        <div className="space-y-2">
          {sampleFrameworks.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setSelectedIdx(i)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition',
                i === selectedIdx ? 'border-navy bg-cream/10' : 'border-app bg-paper hover:bg-cream/5 dark:bg-navy-900/60',
              )}
            >
              <div className="h-8 w-8 shrink-0 rounded-md flex items-center justify-center text-white text-[10px] font-bold" style={{ background: f.color }}>
                {f.shortName.slice(0, 4)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-medium text-navy dark:text-cream">{f.shortName}</p>
                <p className="text-[10px] text-ink">{f.coverage}% · {f.metControls}/{f.totalControls}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="space-y-4">
          <div className="rounded-xl border border-app bg-paper p-4 dark:bg-navy-900/60">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-navy dark:text-cream">{fw.name}</p>
                <p className="mt-0.5 text-xs text-ink">{fw.description}</p>
              </div>
              <div className="text-right">
                <motion.p key={fw.id} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-3xl font-bold" style={{ color: fw.color }}>
                  {progress}%
                </motion.p>
                <p className="text-[10px] text-ink">{fw.metControls}/{fw.totalControls} controls</p>
              </div>
            </div>
            <div className="mt-3 h-2.5 rounded-full bg-line overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: fw.color }} />
            </div>
          </div>

          <div className="rounded-xl border border-app bg-paper p-4 dark:bg-navy-900/60">
            <p className="mb-3 text-xs font-semibold text-navy dark:text-cream">Control Coverage</p>
            <div className="space-y-2">
              {controls.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2.5 rounded-lg border border-app p-2.5"
                >
                  {c.status === 'met' ? <CheckCircle2 className="h-4 w-4 shrink-0 text-success-500" />
                    : c.status === 'partial' ? <AlertTriangle className="h-4 w-4 shrink-0 text-warning-500" />
                    : <XCircle className="h-4 w-4 shrink-0 text-error-400" />}
                  <span className="flex-1 text-xs font-medium text-navy dark:text-cream">{c.id} — {c.name}</span>
                  <span className={cn(
                    'rounded-full px-2 py-0.5 text-[10px] font-medium capitalize',
                    c.status === 'met' ? 'bg-success-500/15 text-success-600' : c.status === 'partial' ? 'bg-warning-500/15 text-warning-600' : 'bg-error-400/15 text-error-500',
                  )}>{c.status}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex items-start gap-3 rounded-xl border border-app bg-paper p-3 dark:bg-navy-900/60"
          >
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-red" />
            <p className="text-xs text-ink">Close <strong className="text-navy dark:text-cream">Asset Management</strong> and <strong className="text-navy dark:text-cream">Incident Management</strong> gaps to move from {fw.coverage}% to 70%+ readiness for {fw.shortName}. <span className="font-medium text-navy dark:text-cream flex items-center gap-1 mt-1">Start gap analysis <ArrowRight className="h-3 w-3" /></span></p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
