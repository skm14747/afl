"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TextInput, DateInput } from "@/components/ui/Input";
import { Select } from "@/components/ui/Input";

interface BirthDateInputProps {
  label?: string;
  showTime?: boolean;
  showLocation?: boolean;
  className?: string;
}

export function BirthDateInput({
  label = "Birth Details",
  showTime = true,
  showLocation = false,
  className,
}: BirthDateInputProps) {
  return (
    <fieldset className={cn("flex flex-col gap-4", className)}>
      {label && (
        <legend
          className="text-base font-semibold mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {label}
        </legend>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <DateInput label="Date of Birth" />
        {showTime && (
          <TextInput label="Time of Birth" type="time" hint="Optional but improves accuracy" />
        )}
      </div>
      {showLocation && (
        <TextInput label="Place of Birth" placeholder="City, Country" />
      )}
    </fieldset>
  );
}
