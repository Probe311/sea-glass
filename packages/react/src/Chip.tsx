import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Glass } from './Glass';

export type ChipProps = {
  shape?: 'pill' | 'rect';
  defaultPressed?: boolean;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Chip({
  shape = 'pill',
  defaultPressed = false,
  className = '',
  children,
  disabled,
  ...rest
}: ChipProps) {
  const [on, setOn] = useState(defaultPressed);
  return (
    <Glass
      as="button"
      type="button"
      className={`chip shape-${shape} ${className}`.trim()}
      aria-pressed={on}
      disabled={disabled}
      tint={on ? 'seafoam' : undefined}
      tintA={0.62}
      glow={on}
      refractive={false}
      onClick={() => setOn((v) => !v)}
      {...rest}
    >
      {children}
    </Glass>
  );
}
