import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

const variants: Record<Variant, string> = {
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  info: 'badge-info',
  neutral: 'badge-neutral',
};

export function Badge({ variant = 'neutral', children, icon, className }: { variant?: Variant; children: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <span className={cn(variants[variant], className)}>
      {icon}
      {children}
    </span>
  );
}

export function ScoreRing({ score, size = 88, label }: { score: number; size?: number; label?: string }) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 70 ? '#22c55e' : score >= 45 ? '#f59e0b' : '#ef4444';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-200 dark:text-slate-700" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900 dark:text-white">{score}</span>
        {label && <span className="text-[10px] text-muted uppercase tracking-wide">{label}</span>}
      </div>
    </div>
  );
}

export function ProgressBar({ value, className, color }: { value: number; className?: string; color?: string }) {
  return (
    <div className={cn('h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden', className)}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color ?? 'linear-gradient(90deg,#3b66f5,#14b8a6)' }}
      />
    </div>
  );
}

export function StatPill({ label, value, tone = 'default' }: { label: string; value: ReactNode; tone?: 'default' | 'good' | 'warn' | 'bad' }) {
  const toneClass = tone === 'good' ? 'text-success-600 dark:text-success-400' : tone === 'warn' ? 'text-warning-600 dark:text-warning-400' : tone === 'bad' ? 'text-error-600 dark:text-error-400' : 'text-slate-900 dark:text-white';
  return (
    <div className="flex flex-col">
      <span className={cn('text-2xl font-bold', toneClass)}>{value}</span>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
