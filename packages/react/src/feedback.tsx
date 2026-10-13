import { forwardRef, useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Glass } from './Glass.js';
import { Button } from './Button.js';
import { cx } from './cx.js';

export type Tone = 'info' | 'success' | 'warning' | 'danger' | 'error';

const ALERT_ICONS: Record<string, ReactNode> = {
  info: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6M12 7h.01" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 3l9 16H3L12 3z" strokeLinejoin="round" />
      <path d="M12 10v4M12 16h.01" strokeLinecap="round" />
    </svg>
  ),
  danger: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
    </svg>
  ),
};

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: Tone;
  title?: ReactNode;
  onClose?: () => void;
};
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, tone = 'info', title, onClose, children, ...rest },
  ref,
) {
  const dataTone = tone === 'error' ? 'error' : tone;
  return (
    <Glass
      ref={ref}
      role="alert"
      className={cx('sg-alert', className)}
      data-tone={dataTone}
      data-tint=""
      frosted
      {...rest}
    >
      <span className="sg-alert__icon" aria-hidden>
        {ALERT_ICONS[tone] ?? ALERT_ICONS.info}
      </span>
      <div>
        {title ? <p className="sg-alert__title">{title}</p> : null}
        {children}
      </div>
      {onClose ? (
        <Button variant="ghost" size="sm" aria-label="Close" onClick={onClose}>
          ×
        </Button>
      ) : null}
    </Glass>
  );
});

export type BannerProps = AlertProps;
export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { className, ...rest },
  ref,
) {
  return <Alert ref={ref} className={cx('sg-banner', className)} {...rest} />;
});

export type CalloutProps = HTMLAttributes<HTMLElement> & {
  title?: ReactNode;
  highlight?: boolean;
};
export const Callout = forwardRef<HTMLElement, CalloutProps>(function Callout(
  { className, title, highlight, children, ...rest },
  ref,
) {
  return (
    <Glass
      ref={ref}
      as="aside"
      className={cx('sg-callout', highlight && 'sg-callout--highlight', className)}
      frosted
      {...rest}
    >
      {title ? <p className="sg-callout__title">{title}</p> : null}
      {children}
    </Glass>
  );
});

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode };
export type AccordionProps = {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  className?: string;
};
export function Accordion({ items, type = 'single', className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(items[0] ? [items[0].id] : []);
  return (
    <Glass className={cx('sg-accordion', className)} frosted rim>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const panelId = `panel-${item.id}`;
        return (
          <div key={item.id} className="sg-accordion__item">
            <button
              type="button"
              className="sg-accordion__trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => {
                setOpen((prev) => {
                  if (type === 'multiple') {
                    return isOpen ? prev.filter((id) => id !== item.id) : [...prev, item.id];
                  }
                  return isOpen ? [] : [item.id];
                });
              }}
            >
              {item.title}
              <span className="sg-chevron" aria-hidden>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <div
              id={panelId}
              className={cx('sg-accordion__panel', isOpen && 'sg-accordion__panel--open')}
              data-open={isOpen || undefined}
              aria-hidden={!isOpen}
            >
              <div className="sg-accordion__panel-inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </Glass>
  );
}

export type TooltipProps = HTMLAttributes<HTMLSpanElement> & {
  content: ReactNode;
  children: ReactNode;
};
export function Tooltip({ content, children, className }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span tabIndex={0} aria-describedby={open ? id : undefined}>
        {children}
      </span>
      {open ? (
        <Glass
          id={id}
          role="tooltip"
          className={cx('sg-tooltip', className)}
          frosted
          rim
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
          }}
        >
          {content}
        </Glass>
      ) : null}
    </span>
  );
}

export type SnackbarProps = HTMLAttributes<HTMLDivElement> & {
  action?: ReactNode;
  open?: boolean;
};
export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(function Snackbar(
  { className, action, open = true, children, ...rest },
  ref,
) {
  if (!open) return null;
  return (
    <Glass ref={ref} className={cx('sg-snack', className)} role="status" frosted rim {...rest}>
      <span style={{ flex: 1 }}>{children}</span>
      {action}
    </Glass>
  );
});

export type ToastProps = HTMLAttributes<HTMLDivElement> & { open?: boolean };
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { className, open, children, ...rest },
  ref,
) {
  return (
    <Glass
      ref={ref}
      className={cx('sg-toast', open && 'sg-toast--open', className)}
      data-open={open || undefined}
      role="status"
      tint="kelly"
      {...rest}
    >
      {children}
    </Glass>
  );
});
