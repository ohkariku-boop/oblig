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
import type { ChatMessage } from '@/types';
import { cn } from '@/utils/cn';

const quickActions: { icon: LucideIcon; label: string; prompt: string }[] = [
  { icon: FileText, label: 'Generate Password Policy', prompt: 'Generate a Password Policy' },
  { icon: ShieldAlert, label: 'Summarise my gaps', prompt: 'Summarise my governance gaps' },
  { icon: TrendingUp, label: 'What to prioritise', prompt: 'What should I prioritise next?' },
  { icon: Brain, label: 'ISO 27001 readiness', prompt: 'Are we ready for ISO 27001?' },
];

const cannedResponses: { match: RegExp; reply: string }[] = [
  {
    match: /password policy/i,
    reply: "Here's a draft Password Policy you can adapt:\n\n**1. Purpose**\nThis policy defines requirements for secure password creation and management across all company systems.\n\n**2. Minimum standards**\n- Minimum 14 characters\n- Mix of upper, lower, numbers and symbols\n- Not found in known breach lists (screened on login)\n- Unique per system — no reuse\n\n**3. Multi-factor authentication**\nMFA is required for all critical systems, email and remote access.\n\n**4. Storage & transmission**\n- Never shared or written down in plaintext\n- Stored only in approved password managers\n- Transmitted only over encrypted channels\n\n**5. Review**\nReviewed annually or after a security incident.\n\nYou can open this in the Policy Generator to edit and export.",
  },
  {
    match: /incident response/i,
    reply: "Here's a draft Incident Response Policy outline:\n\n**1. Purpose & scope**\nDefines how security incidents are detected, contained, eradicated and recovered.\n\n**2. Roles**\n- Incident Lead: coordinates response\n- IT: technical containment\n- Comms: internal/external notification\n\n**3. Phases**\n1. Detect & report (within 1 hour)\n2. Contain & assess impact\n3. Eradicate the cause\n4. Recover systems\n5. Post-incident review within 2 weeks\n\n**4. Escalation**\nNotify leadership for any incident involving customer data.\n\nOpen this in the Policy Generator for a full editable version.",
  },
  {
    match: /gap|summar/i,
    reply: "Based on your latest assessment (62/100, Level 3 — Defined), here are your key gaps:\n\n**High priority**\n• Asset & Data Management (41%) — no asset register, untested backups\n• Risk Management (48%) — risk register exists but not reviewed regularly\n\n**Medium priority**\n• Continuity (52%) — incident response plan untested\n• People & Awareness (58%) — no phishing simulations\n\n**Strongest areas**\n• Information Security (72%)\n• Strategy & Leadership (65%)\n\nWould you like me to generate a roadmap to close these gaps?",
  },
  {
    match: /priorit/i,
    reply: "Here's what I'd prioritise next, ranked by impact-to-effort:\n\n1. **Create an Asset Register** — lifts your weakest score (41%) and underpins everything else.\n2. **Approve a Password Policy** — quick win, closes a common audit finding.\n3. **Schedule a quarterly backup restore test** — your backups run but are untested.\n4. **Formalise vendor risk reviews** — needed before any compliance audit.\n\nWant me to generate any of these as policy drafts or roadmap items?",
  },
  {
    match: /iso.?27001|certif/i,
    reply: "ISO 27001 readiness assessment:\n\n**Where you are**: ~58% coverage of Annex A controls.\n\n**Ready**: Information Security (MFA, access reviews), Strategy ownership.\n\n**Gaps to close before certification**:\n• Asset register and classification (Annex A.5)\n• Documented incident response, tested (A.5.24-26)\n• Supplier risk assessments (A.5.19-22)\n• Continuity and backup testing (A.5.29-30)\n• Formal risk treatment plan with Statement of Applicability\n\n**Realistic timeline**: 4-6 months of focused work to reach audit-ready.\n\nI can generate a gap-closure roadmap if you'd like.",
  },
  {
    match: /improve|score|matur/i,
    reply: "To improve your governance maturity score (currently 62, Level 3):\n\n**Quick wins (1-2 weeks each)**\n• Approve your draft Password and Incident Response policies\n• Document and test your backup restore process\n\n**Medium term (1-2 months)**\n• Build an asset register with data classification\n• Start quarterly risk reviews with leadership\n\n**Strategic (3-6 months)**\n• Run an ISO 27001 gap analysis\n• Introduce KPIs for governance reporting\n\nTargeting Level 4 (Managed, 70+) is realistic within two quarters. Want a phased roadmap?",
  },
];

function findReply(prompt: string): string {
  for (const r of cannedResponses) if (r.match.test(prompt)) return r.reply;
  return "I can help with governance strategy, policy generation, risk prioritisation and compliance readiness. Try asking me to 'Generate a Password Policy', 'Summarise my gaps', or 'Are we ready for ISO 27001?'. I'll draw on your latest assessment (62/100, Level 3).";
}

export function CopilotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm your Oblig AI Governance Copilot. I can help you improve governance maturity, generate policies, prioritise risks and prepare for compliance. What would you like to work on?",
      timestamp: new Date().toISOString(),
      suggestions: aiPromptSuggestions.slice(0, 4),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: `u${Date.now()}`, role: 'user', content: trimmed, timestamp: new Date().toISOString() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply: ChatMessage = { id: `a${Date.now()}`, role: 'assistant', content: findReply(trimmed), timestamp: new Date().toISOString() };
      setMessages(m => [...m, reply]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <PageHeader
        title="AI Governance Copilot"
        description="Your AI partner for governance, policy and compliance guidance."
        action={<Badge variant="info"><Sparkles className="h-3.5 w-3.5" /> Powered by Oblig AI</Badge>}
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
                    <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200 [&]:text-white">{m.content}</p>
                    {m.role === 'assistant' && (
                      <div className="mt-3 flex items-center gap-2 border-t border-app pt-2">
                        <button onClick={() => navigator.clipboard?.writeText(m.content)} className="inline-flex items-center gap-1 text-xs text-muted hover:text-slate-700 dark:hover:text-slate-200 transition">
                          <Copy className="h-3 w-3" /> Copy
                        </button>
                        <button className="inline-flex items-center gap-1 text-xs text-muted hover:text-slate-700 dark:hover:text-slate-200 transition">
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
                {['Password Policy draft', 'Gap summary — Jul 26', 'ISO 27001 readiness check'].map(h => (
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
