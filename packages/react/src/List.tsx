import {
  forwardRef,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from 'react';
import { cx } from './cx.js';

export type ListProps = HTMLAttributes<HTMLUListElement> & {
  /** Apply `.sg-glass` on the list surface (default true). */
  glass?: boolean;
};

export const List = forwardRef<HTMLUListElement, ListProps>(function List(
  { className, glass = true, ...rest },
  ref,
) {
  return (
    <ul ref={ref} className={cx('sg-list', glass && 'sg-glass', className)} role="list" {...rest} />
  );
});

export type ListItemProps = Omit<LiHTMLAttributes<HTMLLIElement>, 'onClick'> & {
  leading?: ReactNode;
  trailing?: ReactNode;
  meta?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  /** Render an inner `<button>` for clickable rows. */
  asButton?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { className, leading, trailing, meta, selected, disabled, asButton, children, onClick, ...rest },
  ref,
) {
  const body = (
    <>
      {leading ? <span className="sg-list__leading">{leading}</span> : null}
      <span className="sg-list__body">
        <span className="sg-list__label">{children}</span>
        {meta ? <span className="sg-list__meta">{meta}</span> : null}
      </span>
      {trailing ? <span className="sg-list__trailing">{trailing}</span> : null}
    </>
  );

  if (asButton || onClick) {
    return (
      <li ref={ref} className={className} role="none" {...rest}>
        <button
          type="button"
          className="sg-list__item"
          aria-current={selected || undefined}
          disabled={disabled}
          onClick={onClick}
        >
          {body}
        </button>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className={cx('sg-list__item', className)}
      aria-current={selected || undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {body}
    </li>
  );
});
