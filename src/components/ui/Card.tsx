import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  elevated?: boolean;
  hover?: boolean;
}

export function Card({ children, elevated, hover, className, ...rest }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border-app',
        elevated ? 'surface-elev shadow-card' : 'surface shadow-soft',
        hover && 'transition-shadow hover:shadow-card',
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ title, subtitle, icon, action }: { title: string; subtitle?: string; icon?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 p-5 pb-0">
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 text-primary-500">{icon}</div>}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-5', className)}>{children}</div>;
}
