import {
  forwardRef,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
} from 'react';
import { Glass } from './Glass.js';
import { Button } from './Button.js';
import { cx } from './cx.js';

export type TableColumn<T> = {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  sortable?: boolean;
};

export type TableProps<T> = TableHTMLAttributes<HTMLTableElement> & {
  columns: TableColumn<T>[];
  rows: T[];
  caption?: ReactNode;
  getRowKey?: (row: T, index: number) => string | number;
};

export function Table<T>({
  columns,
  rows,
  caption,
  getRowKey = (_row, i) => i,
  className,
  ...rest
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [asc, setAsc] = useState(true);
  const sorted = [...rows];
  if (sortKey) {
    const col = columns.find((c) => c.key === sortKey);
    if (col) {
      sorted.sort((a, b) => {
        const av = String(col.cell(a));
        const bv = String(col.cell(b));
        return asc ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
  }
  return (
    <Glass className={cx('sg-table-wrap', className)} frosted rim>
      <table className="sg-table" {...rest}>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (sortKey === col.key) setAsc((v) => !v);
                      else {
                        setSortKey(col.key);
                        setAsc(true);
                      }
                    }}
                  >
                    {col.header}
                    {sortKey === col.key ? (asc ? ' ↑' : ' ↓') : ''}
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={getRowKey(row, i)}>
              {columns.map((col) => (
                <td key={col.key}>{col.cell(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Glass>
  );
}

export type FileUploadProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode;
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
};
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(function FileUpload(
  { className, label = 'Drop files or browse', accept, multiple, onFiles, ...rest },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  return (
    <Glass
      ref={ref}
      className={cx('sg-upload', className)}
      frosted
      rim
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onFiles?.(Array.from(e.dataTransfer.files));
      }}
      {...rest}
    >
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(e) => onFiles?.(Array.from(e.target.files ?? []))}
      />
      <Button type="button" variant="ghost" size="sm" onClick={() => inputRef.current?.click()}>
        Browse
      </Button>
    </Glass>
  );
});
