import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Glass } from './Glass';

export type ButtonVariant = 'neutral' | 'primary' | 'ghost' | 'love';
export type ButtonShape = 'pill' | 'rect' | 'circle';
export type ButtonSize = 'sm' | undefined | 'xl';

export type ButtonProps = {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  size?: ButtonSize;
  icon?: boolean;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'neutral', shape, size, icon, className = '', children, disabled, ...rest },
  ref,
) {
  const resolvedShape = shape || (icon ? 'circle' : 'pill');
  const ghost = variant === 'ghost';
  const love = variant === 'love';
  const loveOff = love && rest['aria-pressed'] === false;
  const cls = [
    'btn',
    `shape-${resolvedShape}`,
    size,
    variant === 'primary' && 'primary',
    love && 'love',
    loveOff && 'off',
    ghost && 'ghost',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Glass
      as="button"
      type="button"
      ref={ref as never}
      className={cls}
      disabled={disabled}
      tint={variant === 'primary' ? 'seafoam' : love && !loveOff ? 'ruby' : undefined}
      tintA={variant === 'primary' ? 0.62 : 0.93}
      glow={variant === 'primary' || (love && !loveOff)}
      refractive={false}
      frosted={!ghost}
      rim={!ghost}
      alive={!ghost}
      {...rest}
    >
      {children}
    </Glass>
  );
});
