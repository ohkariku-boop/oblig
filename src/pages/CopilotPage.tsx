import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Send, Copy, Download, FileText, ShieldAlert, TrendingUp,
  Lightbulb, Brain, CheckCircle2, RefreshCw, User, type LucideIcon,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/Feedback';
import { aiPromptSuggestions } from '@/data/sampleData';
import { useClient } from '@/lib/ClientContext';
import { overallPct, bandFor, checkedCount, marketCoverage, ALL_MARKETS, MARKET_LABELS } from '@/data/assessment';
import type { ChatMessage } from '@/types';
import { cn } from '@/utils/cn';

const quickActions: { icon: LucideIcon; label: string; prompt: string }[] = [
  { icon: FileText, label: 'Generate Vendor Risk Policy', prompt: 'Generate a Vendor Risk Policy' },
  { icon: ShieldAlert, label: 'Summarise my gaps', prompt: 'Summarise my governance gaps' },
  { icon: TrendingUp, label: 'What to prioritise', prompt: 'What should I prioritise next?' },
  { icon: Brain, label: 'MAS TRM readiness', prompt: 'Are we ready for MAS TRM?' },
];

const cannedResponses: { match: RegExp; reply: string }[] = [
  {
    match: /vendor|third.?party/i,
    reply: "Here's a draft Vendor & Third-Party Risk Management Policy you can adapt:\n\n**1. Purpose**\nDefines how we assess, onboard, and continuously monitor our own vendors and subcontractors, since your institutional customers' due diligence runs through you to them.\n\n**2. Due diligence before onboarding**\n- Security evidence reviewed before signing\n- Materiality test (per BSP SAFr / Taiwan FSC classification)\n- Subcontractor list disclosed and consented\n\n**3. Ongoing monitoring**\n- Annual re-assessment, not just at signup\n- Vulnerability management and patching cadence tracked\n\n**4. Subcontractor consent**\nWritten consent required before adding any new subcontractor that touches customer data (strictest under Taiwan's FSC framework).\n\n**5. Review**\nReviewed annually or after any subcontractor change.\n\nYou can open this in the Policy Generator to edit and export.",
  },
  {
    match: /incident (response|notification)/i,
    reply: "Here's a draft Incident Notification Policy outline (regulator SLAs):\n\n**1. Purpose & scope**\nDefines how security incidents are detected, contained, and — critically — notified to regulators and affected institutional customers within each market's actual deadline.\n\n**2. Notification timers by market**\n- Singapore (MAS): 1 hour for severe-impact incidents, 14-day root-cause report\n- Japan (FSA): structured across detection/response/recovery phases\n- Other markets: general 'prompt notification' expectation, tabletop-tested\n\n**3. Roles**\n- Incident Lead: coordinates response and the notification clock\n- IT: technical containment\n- Comms: regulator and customer notification\n\n**4. Escalation**\nAny incident touching customer data triggers leadership notification immediately, not after triage.\n\nOpen this in the Policy Generator for a full editable version.",
  },
  {
    match: /gap|summar/i,
    reply: "Based on your latest assessment, here are your key gaps by market:\n\n**High priority**\n• Cambodia (NBC) — lowest coverage, in-country data residency is a hard requirement, not a recommendation\n• South Korea (EFTA) — licensing-status gate not yet confirmed, this determines which obligations even apply\n\n**Medium priority**\n• Japan (FSA) — 176-item checklist is dense; focus on third-party risk items first\n• Malaysia (BNM RMiT) — annual pentest and 3-year SIEM retention baseline not yet met\n\n**Strongest markets**\n• Singapore (MAS TRM) — furthest along, board oversight and vendor due diligence largely in place\n\nWant me to generate a market-by-market roadmap to close these?",
  },
  {
    match: /priorit/i,
    reply: "Here's what I'd prioritise next, ranked by impact-to-effort:\n\n1. **Build the subcontractor register** — required under MAS Notices 658/1121 and unlocks Singapore deals fastest.\n2. **Schedule the BNM RMiT annual pentest** — a named mandatory baseline, and Malaysia deals will ask for it directly.\n3. **Confirm your Cambodia data residency posture** — this is a hard blocker, not a nice-to-have, for any NBC-regulated customer.\n4. **Draft the 1-hour incident notification runbook** — closes a common gap MAS explicitly checks for.\n\nWant me to generate any of these as policy drafts or roadmap items?",
  },
  {
    match: /mas.?trm|readiness|certif/i,
    reply: "MAS TRM readiness assessment:\n\n**Where you are**: coverage varies by domain — strongest in board oversight and vendor due diligence, weakest in cloud-specific requirements and incident notification.\n\n**Ready**: Named risk owner, written risk appetite statement, secure SDLC baseline.\n\n**Gaps to close**:\n• Cloud security posture (data residency, shared-responsibility model)\n• 1-hour severe-incident notification runbook, tabletop-tested\n• Outsourcing register mapped to what MAS expects banks to submit\n• Third-party concentration risk / exit planning (where MAS's emerging TPRMG is heading)\n\n**Realistic timeline**: 2-3 months of focused work to reach a strong MAS TRM position.\n\nI can generate a gap-closure roadmap if you'd like.",
  },
  {
    match: /improve|score|matur/i,
    reply: "To improve your overall readiness across markets:\n\n**Quick wins (1-2 weeks each)**\n• Approve your draft Vendor Risk and Incident Notification policies\n• Document your subcontractor list and consent trail\n\n**Medium term (1-2 months)**\n• Schedule the BNM RMiT annual pentest\n• Confirm Cambodia/Indonesia data residency posture\n\n**Strategic (3-6 months)**\n• Build out AI governance lifecycle controls across markets\n• Formalise board-level quarterly risk reporting\n\nGetting your top 2 markets to strong coverage is realistic within a quarter. Want a phased roadmap?",
  },
];

function buildContext(assessmentState: Record<string, boolean>): string {
  const count = checkedCount(assessmentState);
  if (count === 0) return '';
  const pct = overallPct(assessmentState);
  const band = bandFor(count);
  const coverage = marketCoverage(assessmentState);
  const marketLines = ALL_MARKETS
    .map(code => `${MARKET_LABELS[code]}: ${coverage[code].pct}% (${coverage[code].checked}/${coverage[code].total})`)
    .join('; ');
  return `Overall readiness: ${pct}% (${band.levelLabel}). Per-market coverage: ${marketLines}.`;
}

function findReply(prompt: string): string {
  for (const r of cannedResponses) if (r.match.test(prompt)) return r.reply;
  return "I can help with vendor risk strategy, policy generation, incident notification planning, and market-specific compliance readiness. Try asking me to 'Generate a Vendor Risk Policy', 'Summarise my gaps', or 'Are we ready for MAS TRM?'. I'll draw on your latest assessment.";
}

export function CopilotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm your Oblig AI Governance Copilot. I can help you manage vendor & third-party risk, generate policies, and get market-specific ready for MAS, BNM, OJK and the other regulators you sell into. What would you like to work on?",
      timestamp: new Date().toISOString(),
      suggestions: aiPromptSuggestions.slice(0, 4),
    },
  ]);
  const { assessmentState } = useClient();
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: `u${Date.now()}`, role: 'user', content: trimmed, timestamp: new Date().toISOString() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, context: buildContext(assessmentState) }),
      });
      if (!res.ok) throw new Error('AI unavailable');
      const data = await res.json();
      if (!data.reply) throw new Error('Empty reply');
      const reply: ChatMessage = { id: `a${Date.now()}`, role: 'assistant', content: data.reply, timestamp: new Date().toISOString(), model: data.model };
      setMessages(m => [...m, reply]);
    } catch {
      // Real AI not configured or unreachable — fall back to the scripted
      // guidance rather than leaving the user with nothing.
      const reply: ChatMessage = { id: `a${Date.now()}`, role: 'assistant', content: findReply(trimmed), timestamp: new Date().toISOString() };
      setMessages(m => [...m, reply]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <PageHeader
        title="AI Governance Copilot"
        description="Your AI partner for governance, policy and compliance guidance."
        action={<Badge variant="neutral"><Sparkles className="h-3.5 w-3.5" /> Guided responses — AI copilot coming soon</Badge>}
      />

      <div className="grid flex-1 gap-6 overflow-hidden lg:grid-cols-[1fr_280px]">
        {/* Chat column */}
        <Card className="flex flex-col overflow-hidden">
          <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-5">
            <AnimatePresence>
              {messages.map(m => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn('flex gap-3', m.role === 'user' && 'flex-row-reverse')}
                >
                  <div className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white',
                    m.role === 'assistant' ? 'bg-gradient-to-br from-primary-500 to-secondary-500' : 'bg-slate-400',
                  )}>
                    {m.role === 'assistant' ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={cn('max-w-[80%] rounded-2xl px-4 py-3', m.role === 'assistant' ? 'surface-elev border border-app' : 'bg-primary-600 text-white')}>
                    <p className={cn('whitespace-pre-wrap text-sm', m.role === 'assistant' ? 'text-slate-700 dark:text-slate-200' : 'text-white')}>{m.content}</p>
                    {m.model && (
                      <p className="mt-1.5 text-[10px] text-muted">via {m.model}</p>
                    )}
                    {m.role === 'assistant' && (
                      <div className="mt-3 flex items-center gap-2 border-t border-app pt-2">
                        <button onClick={() => navigator.clipboard?.writeText(m.content)} className="inline-flex items-center gap-1 text-xs text-muted hover:text-slate-700 dark:hover:text-slate-200 transition">
                          <Copy className="h-3 w-3" /> Copy
                        </button>
                        <button onClick={() => {
                          const blob = new Blob([m.content], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url; a.download = 'oblig-copilot-response.txt'; a.click();
                          URL.revokeObjectURL(url);
                        }} className="inline-flex items-center gap-1 text-xs text-muted hover:text-slate-700 dark:hover:text-slate-200 transition">
                          <Download className="h-3 w-3" /> Export
                        </button>
                      </div>
                    )}
                    {m.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.suggestions.map(s => (
                          <button key={s} onClick={() => send(s)} className="rounded-lg border border-app px-2.5 py-1 text-xs text-slate-600 hover:border-primary-300 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-300 transition">
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="surface-elev flex items-center gap-1 rounded-2xl border border-app px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-primary-400 animate-pulse [animation-delay:150ms]" />
                  <span className="h-2 w-2 rounded-full bg-primary-400 animate-pulse [animation-delay:300ms]" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-app p-4">
            <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                rows={1}
                placeholder="Ask about governance, policies, risks or compliance…"
                className="input max-h-32 resize-none"
              />
              <button type="submit" disabled={!input.trim()} className="btn-primary !px-3 !py-2.5">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </Card>

        {/* Side panel */}
        <div className="hidden flex-col gap-4 overflow-y-auto lg:flex">
          <Card>
            <CardBody>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <Lightbulb className="h-4 w-4 text-accent-500" /> Suggested prompts
              </h3>
              <div className="mt-3 space-y-2">
                {aiPromptSuggestions.map(s => (
                  <button key={s} onClick={() => send(s)} className="block w-full rounded-lg border border-app px-3 py-2 text-left text-sm text-slate-600 hover:border-primary-300 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-300 transition">
                    {s}
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <RefreshCw className="h-4 w-4 text-secondary-500" /> Quick actions
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {quickActions.map(a => (
                  <button key={a.label} onClick={() => send(a.prompt)} className="flex flex-col items-start gap-1.5 rounded-lg border border-app p-3 text-left hover:border-primary-300 transition">
                    <a.icon className="h-4 w-4 text-primary-500" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{a.label}</span>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <CheckCircle2 className="h-4 w-4 text-success-500" /> Conversation history
              </h3>
              <div className="mt-3 space-y-2">
                {['Vendor Risk Policy draft', 'Gap summary — Jul 26', 'MAS TRM readiness check'].map(h => (
                  <div key={h} className="rounded-lg px-2.5 py-1.5 text-xs text-muted hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">{h}</div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
