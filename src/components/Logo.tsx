import { cn } from '@/utils/cn';
import { ObligIcon } from '@/components/ObligIcon';

export function Logo({ className, showText = true, size = 'md' }: { className?: string; showText?: boolean; size?: 'sm' | 'md' }) {
  const iconSize = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';
  const textSize = size === 'sm' ? 'text-base' : 'text-lg';
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <ObligIcon className={cn(iconSize, 'shrink-0')} />
      {showText && (
        <span className={cn('font-grotesk font-bold tracking-tight text-navy dark:text-cream', textSize)}>
          Oblig
        </span>
      )}
    </div>
  );
}
