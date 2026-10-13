import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'default';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'pill' | 'squircle' | 'circle';
  glass?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = 'default',
    size = 'md',
    shape = 'pill',
    glass = true,
    startIcon,
    endIcon,
    fullWidth,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'sg-button',
        glass && 'sg-glass',
        variant === 'primary' && 'sg-button--primary',
        variant === 'ghost' && 'sg-button--ghost',
        size === 'sm' && 'sg-button--sm',
        size === 'lg' && 'sg-button--lg',
        shape === 'squircle' && 'sg-button--squircle',
        shape === 'circle' && 'sg-button--circle',
        className,
      )}
      style={fullWidth ? { width: '100%' } : undefined}
      {...rest}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
});

export type IconButtonProps = Omit<ButtonProps, 'shape' | 'children'> & {
  label: string;
  children: ReactNode;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, ...rest },
  ref,
) {
  return <Button ref={ref} shape="circle" aria-label={label} {...rest} />;
});
