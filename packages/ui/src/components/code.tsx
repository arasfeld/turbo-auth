import { cn } from '../utils';

export function Code({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <code
      className={cn(
        'bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold',
        className,
      )}
    >
      {children}
    </code>
  );
}
