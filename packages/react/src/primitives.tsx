import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { Glass } from './Glass.js';
import { cx } from './cx.js';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & { glass?: boolean };
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, glass = true, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('sg-badge', glass && 'sg-glass', className)}
      data-frosted={glass || undefined}
      data-rim={glass || undefined}
      {...rest}
    />
  );
});

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  onRemove?: () => void;
  glass?: boolean;
};
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { className, onRemove, glass = true, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('sg-tag', glass && 'sg-glass', className)}
      data-frosted={glass || undefined}
      data-rim={glass || undefined}
      {...rest}
    >
      {children}
      {onRemove ? (
        <button type="button" className="sg-tag__remove" aria-label="Remove" onClick={onRemove}>
          ×
        </button>
      ) : null}
    </span>
  );
});

export type ChipProps = HTMLAttributes<HTMLButtonElement> & {
  pressed?: boolean;
  glass?: boolean;
  tint?: string;
};
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { className, pressed, glass = true, tint, style, ...rest },
  ref,
) {
  const pebble = pressed ? (tint ?? 'seafoam') : tint;
  const nextStyle = (
    pebble
      ? ({
          ...style,
          ['--sg-glass-tint-rgb']: `var(--sg-color-${pebble}-rgb)`,
        } as CSSProperties)
      : style
  ) as CSSProperties | undefined;
  return (
    <button
      ref={ref}
      type="button"
      className={cx('sg-chip', glass && 'sg-glass', className)}
      data-frosted={glass || undefined}
      data-rim={glass || undefined}
      aria-pressed={pressed}
      data-tint={pebble}
      style={nextStyle}
      {...rest}
    />
  );
});

export type CardProps = HTMLAttributes<HTMLElement> & {
  tint?: string;
  as?: 'div' | 'article' | 'section';
};
export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { className, tint, as = 'div', ...rest },
  ref,
) {
  return (
    <Glass
      ref={ref}
      as={as}
      className={cx('sg-card', className)}
      tint={tint}
      rim
      frosted
      {...rest}
    />
  );
});

export type TileProps = HTMLAttributes<HTMLAnchorElement> & {
  href: string;
  title: ReactNode;
  tint?: string;
};
export const Tile = forwardRef<HTMLAnchorElement, TileProps>(function Tile(
  { className, href, title, tint, children, ...rest },
  ref,
) {
  return (
    <Glass
      ref={ref as never}
      as="a"
      href={href}
      className={cx('sg-tile', className)}
      tint={tint}
      rim
      frosted
      {...rest}
    >
      <h3 className="sg-tile__title">{title}</h3>
      {children}
    </Glass>
  );
});

export type LinkProps = HTMLAttributes<HTMLAnchorElement> & { href: string };
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, ...rest },
  ref,
) {
  return <a ref={ref} className={cx('sg-link', className)} {...rest} />;
});

export type SkipLinkProps = LinkProps;
export const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(function SkipLink(
  { className, children = 'Skip to content', ...rest },
  ref,
) {
  return (
    <a ref={ref} className={cx('sg-skip', 'sg-glass', className)} {...rest}>
      {children}
    </a>
  );
});
