"use client";

import React, { useMemo, useState } from "react";
import { cityLabel, searchCities, type City } from "@/data/cities";
import type { BirthDetails } from "@/lib/astro-engine";

interface CityPickerProps {
  value: Partial<BirthDetails>;
  onChange: (details: Partial<BirthDetails>) => void;
  error?: string;
  required?: boolean;
}

export function CityPicker({ value, onChange, error, required }: CityPickerProps) {
  const [query, setQuery] = useState(
    value.latitude != null && value.timeZone ? "" : "",
  );
  const [open, setOpen] = useState(false);
  const matches = useMemo(() => searchCities(query), [query]);
  const selected =
    value.latitude != null && value.longitude != null
      ? `${value.latitude.toFixed(2)}, ${value.longitude.toFixed(2)}${value.timeZone ? ` · ${value.timeZone}` : ""}`
      : "";

  const choose = (city: City) => {
    onChange({
      ...value,
      latitude: city.latitude,
      longitude: city.longitude,
      timeZone: city.timeZone,
    });
    setQuery(cityLabel(city));
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5 relative">
      <label htmlFor="birth-city" className="text-sm font-medium text-[var(--color-fg)]">
        Place of birth{required ? "" : ""}
      </label>
      <input
        id="birth-city"
        role="combobox"
        aria-expanded={open}
        aria-controls="birth-city-list"
        aria-autocomplete="list"
        value={query}
        placeholder="Search a city"
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full px-3 py-2.5 text-sm rounded-[var(--radius-md)] bg-[var(--color-input-bg)] border border-[var(--color-input)] text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-focus-ring)] focus:ring-2 focus:ring-[var(--color-focus-ring)]/30"
      />
      {open && (
        <ul
          id="birth-city-list"
          role="listbox"
          className="absolute z-20 top-full mt-1 w-full max-h-52 overflow-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)]"
        >
          {matches.map((city) => (
            <li key={`${city.name}-${city.country}`}>
              <button
                type="button"
                role="option"
                aria-selected={query === `${city.name}, ${city.country}`}
                className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-muted)]"
                onClick={() => choose(city)}
              >
                {cityLabel(city)}
              </button>
            </li>
          ))}
          {matches.length === 0 && (
            <li className="px-3 py-2 text-sm text-[var(--color-muted-fg)]">No matching city in the bundled list.</li>
          )}
        </ul>
      )}
      {selected && !open && (
        <span className="text-xs text-[var(--color-muted-fg)]">{selected}</span>
      )}
      {error && (
        <span className="text-xs text-[var(--color-error)]" role="alert">{error}</span>
      )}
    </div>
  );
}
