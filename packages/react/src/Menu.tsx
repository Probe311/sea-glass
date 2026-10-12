import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from './cx.js';

export type MenuProps = HTMLAttributes<HTMLUListElement> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Label for the trigger button. */
  label: ReactNode;
  triggerProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export const Menu = forwardRef<HTMLUListElement, MenuProps>(function Menu(
  {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    label,
    triggerProps,
    className,
    children,
    ...rest
  },
  ref,
) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = openProp ?? uncontrolled;
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setUncontrolled(next);
    onOpenChange?.(next);
  };
  const menuId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="sg-menu-wrap" ref={wrapRef}>
      <button
        type="button"
        className={cx('sg-button', 'sg-glass', triggerProps?.className)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        ref={triggerRef}
        {...triggerProps}
        onClick={(e) => {
          triggerProps?.onClick?.(e);
          setOpen(!open);
        }}
      >
        {label}
      </button>
      <ul
        ref={ref}
        id={menuId}
        role="menu"
        className={cx('sg-menu', 'sg-glass', open && 'sg-menu--open', className)}
        data-open={open || undefined}
        hidden={!open}
        {...rest}
      >
        {children}
      </ul>
    </div>
  );
});

export type MenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  inset?: boolean;
};

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { className, role = 'menuitem', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role={role}
      className={cx('sg-menu__item', className)}
      {...rest}
    />
  );
});
