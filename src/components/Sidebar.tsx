import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth, hasSupabase } from '@/lib/AuthContext';
import { useClient } from '@/lib/ClientContext';
import { LogOut, UserCircle, ChevronDown, Plus, Building2, ShieldCheck, Copy, Check } from 'lucide-react';
import {
  LayoutDashboard, ClipboardCheck, Sparkles, FileText, ShieldAlert,
  Map, Network, FolderArchive, FileBarChart, Settings, ClipboardList, type LucideIcon,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { cn } from '@/utils/cn';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export const navItems: NavItem[] = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/assessment', label: 'Assessment', icon: ClipboardCheck },
  { to: '/app/copilot', label: 'AI Copilot', icon: Sparkles, badge: 'BETA' },
  { to: '/app/policies', label: 'Policies', icon: FileText },
  { to: '/app/risk', label: 'Risk Register', icon: ShieldAlert },
  { to: '/app/roadmap', label: 'Roadmap', icon: Map },
  { to: '/app/compliance', label: 'Compliance', icon: Network },
  { to: '/app/evidence', label: 'Evidence Library', icon: FolderArchive },
  { to: '/app/reports', label: 'Reports', icon: FileBarChart },
  { to: '/app/questionnaire', label: 'Questionnaire', icon: ClipboardList, badge: 'NEW' },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5 border-b border-app">
        <Link to="/"><Logo /></Link>
      </div>
      <ClientSwitcher />
      <nav className="flex-1 overflow-y-auto px-3 py-4 no-scrollbar">
        <p className="px-3 pb-2 mono-label">Platform</p>
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/app'}
                onClick={onNavigate}
                className={({ isActive }) => cn(
                  'group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-navy-50 text-navy dark:bg-navy-800 dark:text-cream'
                    : 'text-ink hover:bg-navy-soft hover:text-navy dark:hover:text-cream',
                )}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-sm bg-red px-1.5 py-0.5 text-[10px] font-bold text-cream">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-app p-4 space-y-3">
        <AccountBadge />
        <div className="rounded-md bg-navy p-4 text-cream">
          <p className="text-sm font-semibold">Free plan</p>
          <p className="mt-1 text-xs text-white/80">Upgrade for AI policy generation and unlimited assessments.</p>
          <Link to="/pricing" className="mt-3 block w-full rounded-sm bg-cream/15 px-3 py-1.5 text-center text-xs font-semibold text-cream hover:bg-cream/25 transition">
            Explore plans
          </Link>
        </div>
      </div>
    </div>
  );
}

function AccountBadge() {
  const { user, signOut } = useAuth();
  if (!hasSupabase) return null;
  if (!user) {
    return (
      <Link to="/login" className="flex items-center gap-2 rounded-md border border-app px-3 py-2 text-xs font-medium text-ink hover:border-navy dark:hover:border-cream transition">
        <UserCircle className="h-4 w-4" /> Sign in to save your progress
      </Link>
    );
  }
  return (
    <div className="flex items-center justify-between rounded-md border border-app px-3 py-2">
      <span className="truncate text-xs font-medium text-navy dark:text-cream">{user.email}</span>
      <button onClick={() => signOut()} title="Sign out" className="text-ink hover:text-error-600 transition">
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}

function ClientSwitcher() {
  const { user } = useAuth();
  const { clients, activeClient, setActiveClientId, addClient } = useClient();
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');

  if (!hasSupabase || !user) return null;

  return (
    <div className="relative border-b border-app px-3 py-2.5">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
      >
        <Building2 className="h-4 w-4 shrink-0 text-navy dark:text-cream" />
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-navy dark:text-cream">
          {activeClient?.name ?? 'Select client'}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-ink" />
      </button>

      {open && (
        <div className="absolute left-3 right-3 top-full z-20 mt-1 rounded-md border border-app surface shadow-lg">
          <ul className="max-h-48 overflow-y-auto py-1">
            {clients.map(c => (
              <li key={c.id}>
                <button
                  onClick={() => { setActiveClientId(c.id); setOpen(false); }}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800/50 transition',
                    c.id === activeClient?.id ? 'font-semibold text-navy dark:text-cream' : 'text-ink',
                  )}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
          <TrustPageToggle />
          <div className="border-t border-app p-2">
            {adding ? (
              <div className="flex items-center gap-1.5">
                <input
                  autoFocus
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && name.trim()) { addClient(name.trim()); setName(''); setAdding(false); setOpen(false); }
                    if (e.key === 'Escape') { setAdding(false); setName(''); }
                  }}
                  placeholder="Client name"
                  className="input !py-1.5 flex-1 text-sm"
                />
                <button
                  onClick={() => { if (name.trim()) { addClient(name.trim()); setName(''); setAdding(false); setOpen(false); } }}
                  className="btn-primary !px-2.5 !py-1.5"
                >
                  Add
                </button>
              </div>
            ) : (
              <button onClick={() => setAdding(true)} className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-medium text-primary-600 hover:bg-slate-100 dark:text-primary-400 dark:hover:bg-slate-800/50 transition">
                <Plus className="h-4 w-4" /> Add client
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TrustPageToggle() {
  const { activeClient, setTrustPageEnabled } = useClient();
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!activeClient) return null;
  const enabled = activeClient.public_share_enabled;
  const url = `${window.location.origin}/trust/${activeClient.public_token}`;

  return (
    <div className="border-t border-app p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-medium text-ink">
          <ShieldCheck className="h-3.5 w-3.5" /> Trust page
        </span>
        <button
          onClick={async () => { setBusy(true); await setTrustPageEnabled(!enabled); setBusy(false); }}
          disabled={busy}
          className={cn('relative h-5 w-9 shrink-0 rounded-full transition', enabled ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700')}
        >
          <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all', enabled ? 'left-[18px]' : 'left-0.5')} />
        </button>
      </div>
      {enabled && (
        <button
          onClick={() => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="mt-2 flex w-full items-center gap-1.5 rounded-sm border border-app px-2 py-1.5 text-left text-[11px] text-ink hover:border-navy dark:hover:border-cream transition"
        >
          {copied ? <Check className="h-3 w-3 shrink-0 text-success-600" /> : <Copy className="h-3 w-3 shrink-0" />}
          <span className="truncate">{copied ? 'Link copied' : url}</span>
        </button>
      )}
      {!enabled && (
        <p className="mt-1.5 text-[11px] text-muted">Share a live readiness page with prospects, no login required.</p>
      )}
    </div>
  );
}
