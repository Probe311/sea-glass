import {
  forwardRef,
  useId,
  useState,
  type FormHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { Glass } from './Glass.js';
import { cx } from './cx.js';

type FieldShellProps = {
  label?: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  className?: string;
  children: ReactNode;
};

function FieldShell({ label, help, error, className, children }: FieldShellProps) {
  return (
    <div className={cx('sg-field', className)}>
      {label ? <label>{label}</label> : null}
      {children}
      {error ? <p className="sg-field__help sg-field__help--error">{error}</p> : null}
      {!error && help ? <p className="sg-field__help">{help}</p> : null}
    </div>
  );
}

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  multiline?: boolean;
  rows?: number;
};

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  function TextField({ label, help, error, multiline, className, id, rows = 4, ...rest }, ref) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <FieldShell label={label} help={help} error={error} className={className}>
        <Glass className="sg-glass" carved rim={false} style={{ padding: 0 }}>
          {multiline ? (
            <textarea
              ref={ref as never}
              id={fieldId}
              className="sg-field__input"
              rows={rows}
              aria-invalid={!!error || undefined}
              {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as never}
              id={fieldId}
              className="sg-field__input"
              aria-invalid={!!error || undefined}
              {...rest}
            />
          )}
        </Glass>
      </FieldShell>
    );
  },
);

export type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'multiline'>;
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField({ label, help, error, className, id, ...rest }, ref) {
    const [show, setShow] = useState(false);
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <FieldShell label={label} help={help} error={error} className={className}>
        <Glass className="sg-password sg-glass" carved style={{ padding: 0, position: 'relative' }}>
          <input
            ref={ref}
            id={fieldId}
            type={show ? 'text' : 'password'}
            className="sg-field__input"
            aria-invalid={!!error || undefined}
            {...rest}
          />
          <button type="button" className="sg-password__toggle" onClick={() => setShow((v) => !v)}>
            {show ? 'Hide' : 'Show'}
          </button>
        </Glass>
      </FieldShell>
    );
  },
);

export type SearchProps = InputHTMLAttributes<HTMLInputElement> & {
  onSubmitSearch?: (value: string) => void;
};
export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { className, onSubmitSearch, ...rest },
  ref,
) {
  return (
    <Glass
      as="form"
      className={cx('sg-search', className)}
      frosted
      rim
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget as HTMLFormElement);
        onSubmitSearch?.(String(fd.get('q') ?? ''));
      }}
    >
      <input ref={ref} name="q" type="search" className="sg-search__control" {...rest} />
    </Glass>
  );
});

export type SelectOption = { value: string; label: ReactNode; disabled?: boolean };
export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  label?: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, help, error, options, placeholder, className, id, ...rest },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell label={label} help={help} error={error} className={cx('sg-select', className)}>
      <Glass className="sg-glass" carved>
        <div className="sg-select__control">
          <select ref={ref} id={fieldId} aria-invalid={!!error || undefined} {...rest}>
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </Glass>
    </FieldShell>
  );
});

export type ComboboxProps = {
  label?: ReactNode;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  { label, options, value, defaultValue = '', onChange, placeholder, className },
  ref,
) {
  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const filtered = options.filter((o) =>
    String(o.label).toLowerCase().includes(current.toLowerCase()),
  );
  return (
    <div className={cx('sg-combobox', className)}>
      {label ? <label>{label}</label> : null}
      <Glass className="sg-glass" carved>
        <input
          ref={ref}
          className="sg-combobox__control"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          value={current}
          placeholder={placeholder}
          onChange={(e) => {
            setInner(e.target.value);
            onChange?.(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
        />
      </Glass>
      {open && filtered.length ? (
        <Glass as="ul" className="sg-combobox__list sg-glass" role="listbox" frosted rim>
          {filtered.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                className="sg-menu__item"
                role="option"
                aria-selected={current === o.value}
                disabled={o.disabled}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setInner(o.value);
                  onChange?.(o.value);
                  setOpen(false);
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </Glass>
      ) : null}
    </div>
  );
});

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  indeterminate?: boolean;
};
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, indeterminate, ...rest },
  ref,
) {
  return (
    <label className={cx('sg-check', className)}>
      <input
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          if (node) node.indeterminate = !!indeterminate;
        }}
        type="checkbox"
        {...rest}
      />
      <span className="sg-check__box sg-glass" aria-hidden />
      {label}
    </label>
  );
});

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode };
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, ...rest },
  ref,
) {
  return (
    <label className={cx('sg-check', 'sg-check--radio', className)}>
      <input ref={ref} type="radio" {...rest} />
      <span className="sg-check__box sg-glass" aria-hidden />
      {label}
    </label>
  );
});

export type SwitchProps = InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode };
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, ...rest },
  ref,
) {
  return (
    <label
      className={cx(className)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}
    >
      <span className="sg-switch">
        <input ref={ref} type="checkbox" role="switch" {...rest} />
        <span className="sg-switch__track sg-glass" aria-hidden>
          <span className="sg-switch__knob" />
        </span>
      </span>
      {label}
    </label>
  );
});

export type SegmentedProps = {
  options: Array<{ value: string; label: ReactNode }>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  className?: string;
};
export function Segmented({
  options,
  value,
  defaultValue,
  onChange,
  label,
  className,
}: SegmentedProps) {
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value ?? '');
  const current = value ?? inner;
  return (
    <Glass
      className={cx('sg-segmented', className)}
      role="radiogroup"
      aria-label={label}
      frosted
      rim
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className="sg-segmented__btn"
          role="radio"
          aria-checked={current === o.value}
          onClick={() => {
            setInner(o.value);
            onChange?.(o.value);
          }}
        >
          {o.label}
        </button>
      ))}
    </Glass>
  );
}

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  legend?: ReactNode;
};

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { className, legend, children, ...rest },
  ref,
) {
  return (
    <form ref={ref} className={cx('sg-form', className)} {...rest}>
      {legend ? (
        <fieldset className="sg-form__fieldset">
          <legend className="sg-form__legend">{legend}</legend>
          {children}
        </fieldset>
      ) : (
        children
      )}
    </form>
  );
});
