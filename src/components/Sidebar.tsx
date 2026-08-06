import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, ClipboardCheck, Sparkles, FileText, ShieldAlert,
  Map, Network, FolderArchive, FileBarChart, Settings, type LucideIcon,
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
  { to: '/app/copilot', label: 'AI Copilot', icon: Sparkles, badge: 'AI' },
  { to: '/app/policies', label: 'Policies', icon: FileText },
  { to: '/app/risk', label: 'Risk Register', icon: ShieldAlert },
  { to: '/app/roadmap', label: 'Roadmap', icon: Map },
  { to: '/app/compliance', label: 'Compliance', icon: Network },
  { to: '/app/evidence', label: 'Evidence Library', icon: FolderArchive },
  { to: '/app/reports', label: 'Reports', icon: FileBarChart },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5 border-b border-app">
        <Logo />
      </div>
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
      <div className="border-t border-app p-4">
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
