import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from './cx.js';

export type DividerProps = HTMLAttributes<HTMLHRElement> & {
  inset?: boolean;
};

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { className, inset, ...rest },
  ref,
) {
  return (
    <hr ref={ref} className={cx('sg-divider', inset && 'sg-divider--inset', className)} {...rest} />
  );
});
