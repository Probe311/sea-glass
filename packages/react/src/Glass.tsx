import {
  createElement,
  forwardRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { PEBBLE_RGB, type PebbleKey } from './tokens';

export type GlassOwnProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Frosted blur — only visible over `.scene` / `.over`. Default true. */
  frosted?: boolean;
  /** SVG refraction (Chromium). Default true. */
  refractive?: boolean;
  /** Pointer specular + hover/press scale. Default true. */
  alive?: boolean;
  /** Lit rim following pointer angle. Default true. */
  rim?: boolean;
  /** Soft under-glow matching tint. Default true. */
  glow?: boolean;
  tint?: PebbleKey | string;
  tintA?: number;
  glowColor?: PebbleKey | string;
  carved?: boolean;
};

/** Polymorphic host — allow button attrs when `as="button"`. */
export type GlassProps = GlassOwnProps &
  Omit<HTMLAttributes<HTMLElement>, keyof GlassOwnProps> & {
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    name?: string;
    value?: string | number | readonly string[];
  };

function on(v: boolean | undefined, fallback = true) {
  return v === undefined ? fallback : !!v;
}

function resolveRgb(key?: string) {
  if (!key) return undefined;
  return PEBBLE_RGB[key as PebbleKey] ?? key;
}

export const Glass = forwardRef<HTMLElement, GlassProps>(function Glass(props, ref) {
  const {
    as = 'div',
    children,
    className = '',
    style,
    frosted,
    refractive,
    alive,
    rim,
    glow,
    tint,
    tintA,
    glowColor,
    carved,
    ...rest
  } = props;

  const st: CSSProperties & Record<string, string | number | undefined> = { ...(style || {}) };
  const tintRgb = resolveRgb(tint);
  if (tintRgb) {
    st['--tint'] = tintRgb;
    st['--glow'] = resolveRgb(glowColor) || tintRgb;
    if (tintA !== undefined) st['--tint-a'] = tintA;
  } else if (glowColor) {
    st['--glow'] = resolveRgb(glowColor);
  }

  const cls = ['lg', carved ? 'carved' : '', className].filter(Boolean).join(' ');
  const data: Record<string, string | undefined> = {};
  if (on(frosted)) data['data-frosted'] = '';
  if (on(refractive)) data['data-refractive'] = '';
  if (on(alive)) data['data-alive'] = '';
  if (on(rim)) data['data-rim'] = '';
  if (tint) data['data-tint'] = '';
  if (on(glow)) data['data-glow'] = '';

  return createElement(as, { ...rest, ...data, className: cls, style: st, ref }, children);
});
