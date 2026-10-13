import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Glass } from './Glass.js';
import { Link } from './primitives.js';
import { cx } from './cx.js';

export type NavItem = { href: string; label: ReactNode; current?: boolean };

export type BreadcrumbsProps = {
  items: Array<{ href?: string; label: ReactNode; current?: boolean }>;
  className?: string;
};
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="sg-breadcrumbs">
        {items.map((item, i) => (
          <li key={i}>
            {item.current || !item.href ? (
              <span aria-current={item.current ? 'page' : undefined}>{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
            {i < items.length - 1 ? <span aria-hidden> / </span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export type PaginationProps = {
  page: number;
  pageCount: number;
  onChange?: (page: number) => void;
  className?: string;
};
export function Pagination({ page, pageCount, onChange, className }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <nav className={cx('sg-pagination', className)} aria-label="Pagination">
      <button
        type="button"
        className="sg-pagination__btn"
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className="sg-pagination__btn"
          aria-current={p === page ? 'page' : undefined}
          onClick={() => onChange?.(p)}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="sg-pagination__btn"
        disabled={page >= pageCount}
        onClick={() => onChange?.(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  brand?: ReactNode;
  brandHref?: string;
  nav?: NavItem[];
  actions?: ReactNode;
};
export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { className, brand, brandHref = '#', nav = [], actions, children, ...rest },
  ref,
) {
  return (
    <Glass ref={ref} as="header" className={cx('sg-header', className)} frosted rim {...rest}>
      {brand ? (
        <a className="sg-header__brand" href={brandHref}>
          {brand}
        </a>
      ) : null}
      {nav.length ? (
        <ul className="sg-header__nav">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} aria-current={item.current ? 'page' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      {actions}
      {children}
    </Glass>
  );
});

export type FooterProps = HTMLAttributes<HTMLElement> & {
  links?: NavItem[];
};
export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  { className, links = [], children, ...rest },
  ref,
) {
  return (
    <Glass ref={ref} as="footer" className={cx('sg-footer', className)} frosted rim {...rest}>
      <div>{children}</div>
      {links.length ? (
        <ul className="sg-nav">
          {links.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      ) : null}
    </Glass>
  );
});

export type SidebarProps = HTMLAttributes<HTMLElement> & {
  label?: ReactNode;
  items: NavItem[];
};
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { className, label, items, ...rest },
  ref,
) {
  return (
    <Glass ref={ref} as="nav" className={cx('sg-sidebar', className)} frosted rim {...rest}>
      {label ? <div className="sg-sidebar__label">{label}</div> : null}
      {items.map((item) => (
        <a key={item.href} href={item.href} aria-current={item.current ? 'page' : undefined}>
          {item.label}
        </a>
      ))}
    </Glass>
  );
});

export type NavProps = HTMLAttributes<HTMLElement> & {
  items: NavItem[];
  tertiary?: boolean;
};
export const Nav = forwardRef<HTMLElement, NavProps>(function Nav(
  { className, items, tertiary, ...rest },
  ref,
) {
  return (
    <nav ref={ref} className={className} aria-label={tertiary ? 'Tertiary' : 'Main'} {...rest}>
      <ul className="sg-nav">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} aria-current={item.current ? 'page' : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export type TocProps = {
  items: Array<{ href: string; label: ReactNode; current?: boolean }>;
  className?: string;
};
export function Toc({ items, className }: TocProps) {
  return (
    <nav className={className} aria-label="Table of contents">
      <ol className="sg-toc">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} aria-current={item.current || undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export type StepperProps = {
  steps: Array<{ label: ReactNode; state?: 'done' | 'current' | 'todo' }>;
  className?: string;
};
export function Stepper({ steps, className }: StepperProps) {
  return (
    <ol className={cx('sg-stepper', className)}>
      {steps.map((step, i) => (
        <li key={i} className="sg-stepper__step" data-state={step.state ?? 'todo'}>
          <span className="sg-stepper__index">{i + 1}</span>
          {step.label}
        </li>
      ))}
    </ol>
  );
}
