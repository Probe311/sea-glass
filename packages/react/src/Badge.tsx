import type { HTMLAttributes, ReactNode } from 'react';
import { Glass } from './Glass';
import type { PebbleKey } from './tokens';

export type BadgeProps = {
  tint?: PebbleKey;
  dot?: boolean;
  children?: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export function Badge({ tint, dot, className = '', children, style, ...rest }: BadgeProps) {
  return (
    <Glass
      as="span"
      className={`badge ${className}`.trim()}
      tint={tint}
      tintA={0.62}
      refractive={false}
      alive={false}
      glow={false}
      style={{
        color: tint ? `var(--${tint}-ink)` : undefined,
        ...style,
      }}
      {...rest}
    >
      {dot ? <i /> : null}
      {children}
    </Glass>
  );
}
