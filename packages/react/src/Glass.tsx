import { forwardRef, type CSSProperties, type ElementType, type HTMLAttributes } from 'react';
import { cx } from './cx.js';

export type GlassProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  frosted?: boolean;
  refractive?: boolean;
  carved?: boolean;
  rim?: boolean;
  glow?: boolean;
  alive?: boolean;
  /** Pebble key → `--sg-color-{tint}-rgb` + `data-tint` */
  tint?: string;
};

export const Glass = forwardRef<HTMLElement, GlassProps>(function Glass(
  { as, className, frosted, refractive, carved, rim, glow, alive, tint, style, ...rest },
  ref,
) {
  const Tag = (as ?? 'div') as ElementType;
  const nextStyle = (
    tint
      ? ({
          ...style,
          ['--sg-glass-tint-rgb']: `var(--sg-color-${tint}-rgb)`,
        } as CSSProperties)
      : style
  ) as CSSProperties | undefined;

  return (
    <Tag
      ref={ref}
      className={cx('sg-glass', carved && 'sg-glass--carved', className)}
      data-frosted={frosted || undefined}
      data-refractive={refractive || undefined}
      data-rim={rim || undefined}
      data-glow={glow || undefined}
      data-alive={alive || undefined}
      data-tint={tint || undefined}
      style={nextStyle}
      {...rest}
    />
  );
});
