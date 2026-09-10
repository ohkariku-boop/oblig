import { cn } from '@/utils/cn';
import { ObligIcon } from '@/components/ObligIcon';

export function Logo({ className, showText = true, size = 'md' }: { className?: string; showText?: boolean; size?: 'sm' | 'md' }) {
  const iconSize = size === 'sm' ? 'h-6 w-6' : 'h-8 w-8';
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <ObligIcon className={cn(iconSize, 'rounded-md')} />
      {showText && (
        <span className="font-grotesk text-lg font-bold tracking-tight text-navy dark:text-cream">
          Oblig
        </span>
      )}
    </div>
  );
}
