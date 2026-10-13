import { forwardRef, useEffect, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Glass } from './Glass.js';
import { Button } from './Button.js';
import { Switch } from './forms.js';
import { cx } from './cx.js';

export type LangOption = { code: string; label: ReactNode };
export type LangSwitcherProps = {
  languages: LangOption[];
  value?: string;
  onChange?: (code: string) => void;
  className?: string;
};
export function LangSwitcher({ languages, value, onChange, className }: LangSwitcherProps) {
  const [inner, setInner] = useState(value ?? languages[0]?.code ?? '');
  const current = value ?? inner;
  return (
    <div className={cx('sg-lang', className)} role="group" aria-label="Language">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className="sg-lang__btn"
          aria-pressed={current === lang.code}
          onClick={() => {
            setInner(lang.code);
            onChange?.(lang.code);
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

export type ThemeToggleProps = {
  value?: 'light' | 'dark';
  onChange?: (mode: 'light' | 'dark') => void;
  className?: string;
};
export function ThemeToggle({ value, onChange, className }: ThemeToggleProps) {
  const [inner, setInner] = useState<'light' | 'dark'>(value ?? 'light');
  const mode = value ?? inner;
  useEffect(() => {
    document.documentElement.dataset.sgTheme = mode;
  }, [mode]);
  return (
    <Switch
      className={className}
      label={mode === 'dark' ? 'Dark' : 'Light'}
      checked={mode === 'dark'}
      onChange={(e) => {
        const next = e.target.checked ? 'dark' : 'light';
        setInner(next);
        onChange?.(next);
      }}
    />
  );
}

export type ConsentProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  acceptLabel?: ReactNode;
  rejectLabel?: ReactNode;
  onAccept?: () => void;
  onReject?: () => void;
  open?: boolean;
};
export const ConsentBanner = forwardRef<HTMLDivElement, ConsentProps>(function ConsentBanner(
  {
    className,
    title = 'Cookies',
    acceptLabel = 'Accept',
    rejectLabel = 'Reject',
    onAccept,
    onReject,
    open = true,
    children,
    ...rest
  },
  ref,
) {
  if (!open) return null;
  return (
    <Glass
      ref={ref}
      className={cx('sg-consent', className)}
      role="dialog"
      aria-label="Consent"
      frosted
      rim
      {...rest}
    >
      <div>
        <strong>{title}</strong>
        <div>{children}</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="button" variant="ghost" size="sm" onClick={onReject}>
          {rejectLabel}
        </Button>
        <Button type="button" size="sm" onClick={onAccept}>
          {acceptLabel}
        </Button>
      </div>
    </Glass>
  );
});
