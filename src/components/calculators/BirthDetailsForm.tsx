"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TextInput, DateInput } from "@/components/ui/Input";
import type { BirthDetails } from "@/lib/astro-engine";

interface BirthDetailsFormProps {
  label?: string;
  value: Partial<BirthDetails>;
  onChange: (details: Partial<BirthDetails>) => void;
  showTime?: boolean;
  showLocation?: boolean;
  requireTime?: boolean;
  errors?: Record<string, string>;
  className?: string;
}

export function BirthDetailsForm({
  label,
  value,
  onChange,
  showTime = true,
  showLocation = false,
  requireTime = false,
  errors = {},
  className,
}: BirthDetailsFormProps) {
  return (
    <fieldset className={cn("flex flex-col gap-4", className)}>
      {label && (
        <legend
          className="text-base font-semibold mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {label}
        </legend>
      )}

      <DateInput
        label="Date of Birth"
        value={value.date || ""}
        onChange={(e) => onChange({ ...value, date: e.target.value })}
        error={errors.date}
        required
      />

      {showTime && (
        <TextInput
          label="Time of Birth"
          type="time"
          value={value.time || ""}
          onChange={(e) => onChange({ ...value, time: e.target.value })}
          error={errors.time}
          hint={requireTime ? "Required for accurate results" : "Optional — improves accuracy"}
          required={requireTime}
        />
      )}

      {showLocation && (
        <div className="grid grid-cols-2 gap-3">
          <TextInput
            label="Latitude"
            type="number"
            step="0.0001"
            placeholder="e.g. 40.7128"
            value={value.latitude?.toString() || ""}
            onChange={(e) => onChange({ ...value, latitude: parseFloat(e.target.value) || undefined })}
            hint="Decimal degrees"
          />
          <TextInput
            label="Longitude"
            type="number"
            step="0.0001"
            placeholder="e.g. -74.0060"
            value={value.longitude?.toString() || ""}
            onChange={(e) => onChange({ ...value, longitude: parseFloat(e.target.value) || undefined })}
            hint="Decimal degrees"
          />
        </div>
      )}

      {showTime && !requireTime && !value.time && (
        <div className="text-xs text-[var(--color-muted-fg)] bg-[var(--color-muted)] px-3 py-2 rounded-[var(--radius-md)]">
          <strong>Note:</strong> Without a birth time, Moon sign accuracy may be reduced and
          Ascendant cannot be calculated.
        </div>
      )}
    </fieldset>
  );
}
