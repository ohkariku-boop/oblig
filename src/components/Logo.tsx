import { ShieldCheck } from 'lucide-react';
import { cn } from '@/utils/cn';

export function Logo({ className, showText = true, size = 'md' }: { className?: string; showText?: boolean; size?: 'sm' | 'md' }) {
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <ShieldCheck className={cn(iconSize, 'text-red')} strokeWidth={2.5} />
      {showText && (
        <span className="font-grotesk text-lg font-bold tracking-tight text-navy dark:text-cream">
          Oblig
        </span>
      )}
    </div>
  );
}
