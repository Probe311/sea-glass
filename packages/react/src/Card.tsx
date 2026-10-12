import type { HTMLAttributes, ReactNode } from 'react';
import { Glass } from './Glass';
import type { PebbleKey } from './tokens';

export type CardProps = {
  tint?: PebbleKey;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function Card({ tint, className = '', children, ...rest }: CardProps) {
  return (
    <Glass as="article" className={`card ${className}`.trim()} tint={tint} tintA={0.4} {...rest}>
      {children}
    </Glass>
  );
}
