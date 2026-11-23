"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ items, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

  return (
    <div className={className}>
      <div className="flex border-b border-[var(--color-border-subtle)]" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors relative cursor-pointer",
              activeTab === item.id
                ? "text-[var(--champagne-gold)]"
                : "text-[var(--color-muted-fg)] hover:text-[var(--color-fg)]"
            )}
          >
            {item.label}
            {activeTab === item.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--champagne-gold)]" />
            )}
          </button>
        ))}
      </div>
      <div className="pt-4" role="tabpanel">
        {items.find((item) => item.id === activeTab)?.content}
      </div>
    </div>
  );
}
