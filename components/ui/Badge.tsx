import React from 'react';

const badgeVariants = {
  default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
  outline: 'text-foreground',
  approved: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  rejected: 'border-transparent bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  under_review: 'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  submitted: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  draft: 'border-transparent bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  in_development: 'border-transparent bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  validated: 'border-transparent bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  pending_approval: 'border-transparent bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
};

export type BadgeVariant = keyof typeof badgeVariants;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

// FIX: Corrected the function signature to properly type and destructure props, resolving type errors.
function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${badgeVariants[variant]} ${className || ''}`}
      {...props}
    >
        {children}
    </div>
  );
}

export { Badge, badgeVariants };