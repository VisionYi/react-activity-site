import { useId } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type FieldProps = {
  label: string;
  error?: string;
  className?: string;
  controlClassName: string;
};

type TextInputFieldProps = FieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>;
type TextAreaFieldProps = FieldProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>;

export function TextInputField({
  label,
  error,
  className,
  controlClassName,
  'aria-describedby': describedBy,
  ...inputProps
}: TextInputFieldProps) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;
  const descriptionIds = [describedBy, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={className}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        className={controlClassName}
        aria-invalid={error ? true : inputProps['aria-invalid']}
        aria-describedby={descriptionIds}
      />
      {error && (
        <p className="comment-form__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  error,
  className,
  controlClassName,
  'aria-describedby': describedBy,
  ...textareaProps
}: TextAreaFieldProps) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;
  const descriptionIds = [describedBy, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={className}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <textarea
        {...textareaProps}
        id={id}
        className={controlClassName}
        aria-invalid={error ? true : textareaProps['aria-invalid']}
        aria-describedby={descriptionIds}
      />
      {error && (
        <p className="comment-form__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
