import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode;
  unit?: string;
};
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { label, unit, className, value, defaultValue = 50, onChange, ...rest },
  ref,
) {
  const [inner, setInner] = useState(Number(defaultValue));
  const current = value !== undefined ? Number(value) : inner;
  return (
    <div className={cx(className)} style={{ display: 'grid', gap: 8 }}>
      {label ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
          <span>{label}</span>
          <output>
            {current}
            {unit}
          </output>
        </div>
      ) : null}
      <input
        ref={ref}
        type="range"
        className="sg-slider"
        value={current}
        onChange={(e) => {
          setInner(Number(e.target.value));
          onChange?.(e);
        }}
        {...rest}
      />
    </div>
  );
});

export type ProgressProps = {
  value?: number;
  max?: number;
  label?: ReactNode;
  tone?: 'seafoam' | 'aqua' | 'amber' | 'ruby';
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  className?: string;
};
export function Progress({
  value = 0,
  max = 100,
  label,
  tone,
  size = 'md',
  indeterminate,
  className,
}: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cx(className)} style={{ display: 'grid', gap: 6 }}>
      {label ? <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div> : null}
      <div
        className={cx(
          'sg-progress',
          'sg-glass',
          size === 'sm' && 'sg-progress--sm',
          size === 'lg' && 'sg-progress--lg',
          tone === 'aqua' && 'sg-progress--aqua',
          tone === 'amber' && 'sg-progress--amber',
          tone === 'ruby' && 'sg-progress--ruby',
          indeterminate && 'sg-progress--indeterminate',
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="sg-progress__bar"
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export type TabsItem = { id: string; label: ReactNode; panel: ReactNode; disabled?: boolean };
export type TabsProps = {
  items: TabsItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
};
export function Tabs({ items, value, defaultValue, onChange, className }: TabsProps) {
  const first = items.find((i) => !i.disabled)?.id ?? '';
  const [inner, setInner] = useState(defaultValue ?? first);
  const current = value ?? inner;
  return (
    <div className={className}>
      <div className="sg-tabs sg-glass" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className="sg-tabs__tab"
            id={`tab-${item.id}`}
            aria-selected={current === item.id}
            aria-controls={`panel-${item.id}`}
            disabled={item.disabled}
            tabIndex={current === item.id ? 0 : -1}
            onClick={() => {
              setInner(item.id);
              onChange?.(item.id);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={current !== item.id}
          style={{ paddingTop: 16 }}
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}
