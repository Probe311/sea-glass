import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { cx } from './cx.js';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'default';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'pill' | 'squircle' | 'circle';
  glass?: boolean;
  /** Pebble tint; primary defaults to seafoam */
  tint?: string;
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
    tint,
    startIcon,
    endIcon,
    fullWidth,
    children,
    type = 'button',
    style,
    ...rest
  },
  ref,
) {
  const pebble = tint ?? (variant === 'primary' ? 'seafoam' : undefined);
  const nextStyle = (
    pebble || fullWidth
      ? ({
          ...style,
          ...(fullWidth ? { width: '100%' } : null),
          ...(pebble ? { ['--sg-glass-tint-rgb']: `var(--sg-color-${pebble}-rgb)` } : null),
        } as CSSProperties)
      : style
  ) as CSSProperties | undefined;

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
      data-tint={pebble}
      style={nextStyle}
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
