import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Glass } from './Glass.js';
import { Button } from './Button.js';
import { cx } from './cx.js';

export type QuoteProps = HTMLAttributes<HTMLQuoteElement> & {
  cite?: ReactNode;
  source?: string;
};
export const Quote = forwardRef<HTMLQuoteElement, QuoteProps>(function Quote(
  { className, cite, source, children, ...rest },
  ref,
) {
  return (
    <Glass
      ref={ref}
      as="blockquote"
      className={cx('sg-quote', className)}
      cite={source}
      frosted
      rim
      {...rest}
    >
      {children}
      {cite ? <footer className="sg-quote__cite">- {cite}</footer> : null}
    </Glass>
  );
});

export type MediaProps = HTMLAttributes<HTMLElement> & {
  src: string;
  alt?: string;
  caption?: ReactNode;
  ratio?: string;
};
export const Media = forwardRef<HTMLElement, MediaProps>(function Media(
  { className, src, alt = '', caption, ratio = '16/9', ...rest },
  ref,
) {
  return (
    <Glass ref={ref} as="figure" className={cx('sg-media', className)} frosted rim {...rest}>
      <div className="sg-media__frame" style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt} />
      </div>
      {caption ? <figcaption className="sg-media__caption">{caption}</figcaption> : null}
    </Glass>
  );
});

export type HeroProps = HTMLAttributes<HTMLElement> & {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
};
export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  { className, title, subtitle, actions, media, children, ...rest },
  ref,
) {
  return (
    <Glass ref={ref} as="section" className={cx('sg-hero', className)} frosted rim {...rest}>
      <div className="sg-hero__copy">
        <h1 className="sg-hero__title">{title}</h1>
        {subtitle ? <p className="sg-hero__subtitle">{subtitle}</p> : null}
        {actions}
        {children}
      </div>
      {media}
    </Glass>
  );
});

export type ShareProps = {
  url?: string;
  title?: string;
  className?: string;
};
export function Share({ url, title, className }: ShareProps) {
  const href = url ?? (typeof window !== 'undefined' ? window.location.href : '');
  const text = title ?? '';
  return (
    <div className={cx('sg-share', className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          void navigator.clipboard?.writeText(href);
        }}
      >
        Copy link
      </Button>
      <a
        className="sg-button sg-button--ghost sg-button--sm sg-glass"
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(href)}&text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noreferrer"
      >
        Share
      </a>
    </div>
  );
}
