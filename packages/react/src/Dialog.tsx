import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from './cx.js';

export type DialogProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  /** Close when clicking the dimmed overlay (default true). */
  closeOnOverlay?: boolean;
};

function focusables(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { open, onClose, title, footer, closeOnOverlay = true, className, children, ...rest },
  ref,
) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel ? focusables(panel)[0] : null;
    (first ?? panel)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose?.();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const nodes = focusables(panel);
      if (!nodes.length) {
        e.preventDefault();
        return;
      }
      const i = nodes.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && (i <= 0 || i === -1)) {
        e.preventDefault();
        nodes.at(-1)?.focus();
      } else if (!e.shiftKey && (i === nodes.length - 1 || i === -1)) {
        e.preventDefault();
        nodes[0]?.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (typeof document === 'undefined' || !open) return null;

  const onOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlay) return;
    if (e.target === e.currentTarget) onClose?.();
  };

  const setRefs = (node: HTMLDivElement | null) => {
    panelRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  return createPortal(
    <div className="sg-overlay sg-overlay--open" data-open onClick={onOverlayClick}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cx('sg-dialog', 'sg-glass', className)}
        ref={setRefs}
        {...rest}
      >
        {title ? (
          <div className="sg-dialog__header">
            <h2 id={titleId} className="sg-dialog__title">
              {title}
            </h2>
          </div>
        ) : null}
        <div className="sg-dialog__body">{children}</div>
        {footer ? <div className="sg-dialog__footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
});
