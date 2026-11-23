"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function TextInput({ label, error, hint, className, id, ...props }: TextInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-fg)]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-3 py-2.5 text-sm rounded-[var(--radius-lg)]",
          "bg-[var(--color-input-bg)] border border-[var(--color-input)]",
          "text-[var(--color-fg)] placeholder:text-[var(--neutral-500)]",
          "transition-colors",
          "focus:outline-none focus:border-[var(--color-focus-ring)] focus:ring-2 focus:ring-[var(--color-focus-ring)]/30",
          error && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/30",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className="text-xs text-[var(--color-error)]" role="alert">
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={`${inputId}-hint`} className="text-xs text-[var(--color-muted-fg)]">
          {hint}
        </span>
      )}
    </div>
  );
}

interface DateInputProps extends Omit<TextInputProps, "type"> {}

export function DateInput(props: DateInputProps) {
  return <TextInput type="date" {...props} />;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ label, error, options, placeholder, className, id, ...props }: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-[var(--color-fg)]">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "w-full px-3 py-2.5 text-sm rounded-[var(--radius-lg)]",
          "bg-[var(--color-input-bg)] border border-[var(--color-input)]",
          "text-[var(--color-fg)]",
          "transition-colors",
          "focus:outline-none focus:border-[var(--color-focus-ring)] focus:ring-2 focus:ring-[var(--color-focus-ring)]/30",
          error && "border-[var(--color-error)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-[var(--color-error)]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={checkboxId} className={cn("flex items-center gap-2.5 cursor-pointer", className)}>
      <input
        type="checkbox"
        id={checkboxId}
        className="w-4 h-4 rounded-[var(--radius-sm)] border-[var(--color-input)] text-[var(--cosmic-navy)] focus:ring-[var(--color-focus-ring)] accent-[var(--cosmic-navy)]"
        {...props}
      />
      <span className="text-sm text-[var(--color-fg)]">{label}</span>
    </label>
  );
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({ name, label, options, value, onChange, className }: RadioGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-1.5", className)}>
      {label && <legend className="text-sm font-medium text-[var(--color-fg)] mb-2">{label}</legend>}
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange?.(opt.value)}
              className="w-4 h-4 border-[var(--color-input)] text-[var(--cosmic-navy)] focus:ring-[var(--color-focus-ring)] accent-[var(--cosmic-navy)]"
            />
            <span className="text-sm text-[var(--color-fg)]">{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
