import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/theme';

export function SiteHeader({ active }: { active?: 'home' | 'pricing' | 'docs' }) {
  const { theme, toggle } = useTheme();
  const link = (id: typeof active, to: string, label: string) => (
    <Link
      to={to}
      className={
        active === id
          ? 'text-sm font-medium text-navy dark:text-cream'
          : 'text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition'
      }
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-app glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/"><Logo /></Link>
        <nav className="hidden items-center gap-8 md:flex">
          {link('pricing', '/pricing', 'Pricing')}
          {link('docs', '/docs', 'Docs')}
          <a href="/#modules" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">Modules</a>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="btn-ghost !p-2" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/login" className="btn-secondary hidden sm:inline-flex">Sign in</Link>
          <Link to="/app/assessment" className="btn-primary">Start free assessment</Link>
        </div>
      </div>
    </header>
  );
}
