import React from 'react';
import clsx from 'clsx';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
