import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sun, Moon, Bell, Search, ChevronDown, ExternalLink } from 'lucide-react';
import { useTheme } from '@/theme';

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { theme, toggle } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-app glass px-4 sm:px-6">
      <button onClick={onMenu} className="btn-ghost !p-2 lg:hidden" aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden flex-1 items-center md:flex">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search policies, risks, evidence…"
            className="input !py-2 pl-9 pr-3 !rounded-sm surface-elev"
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 md:flex-none">
        <button onClick={toggle} className="btn-ghost !p-2" aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button className="btn-ghost relative !p-2" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red ring-2 ring-cream dark:ring-navy" />
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(o => !o)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-cream">
              A
            </div>
            <span className="hidden text-sm font-medium text-navy dark:text-cream sm:inline">Admin</span>
            <ChevronDown className="hidden h-4 w-4 text-muted sm:inline" />
          </button>
          {profileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-12 z-20 w-56 rounded-xl border border-app surface-elev p-1.5 shadow-card">
                <Link to="/app/settings" onClick={() => setProfileOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                  Settings
                </Link>
                <Link to="/" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                  Marketing site <ExternalLink className="h-3.5 w-3.5 text-muted" />
                </Link>
                <div className="my-1 h-px bg-slate-200 dark:bg-slate-700" />
                <button className="block w-full rounded-lg px-3 py-2 text-left text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20">
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
