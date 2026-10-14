import {
  forwardRef,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { cx } from './cx.js';

function snap(v: number, min: number, max: number, step: number) {
  const n = Math.round((v - min) / step) * step + min;
  return Math.round(Math.max(min, Math.min(max, n)) * 1e6) / 1e6;
}

export type SliderProps = {
  label?: ReactNode;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    label,
    unit = '',
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue = 50,
    onChange,
    disabled,
    className,
    'aria-label': ariaLabel,
  },
  ref,
) {
  const id = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [inner, setInner] = useState(defaultValue);
  const [dragging, setDragging] = useState(false);
  const current = value ?? inner;
  const frac = (current - min) / (max - min);

  function fromX(clientX: number) {
    const el = trackRef.current;
    if (!el) return current;
    const r = el.getBoundingClientRect();
    const f = Math.max(0, Math.min(1, (clientX - r.left - 10) / Math.max(1, r.width - 20)));
    return snap(min + f * (max - min), min, max, step);
  }

  function commit(next: number) {
    setInner(next);
    onChange?.(next);
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (disabled) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    commit(fromX(e.clientX));
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    const big = Math.max(step, Math.round((max - min) / 10 / step) * step);
    const delta: Record<string, number> = {
      ArrowRight: current + step,
      ArrowUp: current + step,
      ArrowLeft: current - step,
      ArrowDown: current - step,
      PageUp: current + big,
      PageDown: current - big,
      Home: min,
      End: max,
    };
    const next = delta[e.key];
    if (next === undefined) return;
    e.preventDefault();
    commit(snap(next, min, max, step));
  }

  const style = {
    ['--sg-sl-b' as string]: frac,
    ['--sg-sl-v' as string]: frac,
  } as CSSProperties;

  return (
    <div className={cx(className)} style={{ display: 'grid', gap: 8 }}>
      {label ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
          <span id={id}>{label}</span>
          <output>
            {current}
            {unit}
          </output>
        </div>
      ) : null}
      <div
        ref={(node) => {
          trackRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className="sg-slider"
        style={style}
        data-dragging={dragging || undefined}
        aria-disabled={disabled || undefined}
        onPointerDown={onPointerDown}
        onPointerMove={(e) => {
          if (dragging) commit(fromX(e.clientX));
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <div className="sg-slider__rail" />
        <div className="sg-slider__fill" />
        <div
          className="sg-slider__thumb"
          role="slider"
          tabIndex={disabled ? -1 : 0}
          data-active={dragging || undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current}
          aria-valuetext={`${current}${unit}`}
          aria-labelledby={label ? id : undefined}
          aria-label={label ? undefined : ariaLabel}
          onKeyDown={onKeyDown}
        >
          <i className="sg-slider__blob" aria-hidden />
          <i className="sg-slider__stem" aria-hidden />
          <i className="sg-slider__ring sg-slider__ring--2" aria-hidden />
          <i className="sg-slider__ring sg-slider__ring--1" aria-hidden />
          <span className="sg-slider__value" aria-hidden>
            {current}
            {unit}
          </span>
        </div>
      </div>
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
        style={
          indeterminate
            ? undefined
            : ({ ['--sg-progress-f' as string]: pct / 100 } as CSSProperties)
        }
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
