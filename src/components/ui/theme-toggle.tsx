"use client";

import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "System" },
  ];

  return (
    <div className="inline-flex items-center rounded-lg bg-neutral-200 p-1 dark:bg-neutral-800/50 dark:border dark:border-neutral-700">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-all cursor-pointer",
            {
              "bg-white text-neutral-900 shadow-sm dark:bg-primary-500 dark:text-black":
                theme === value,
              "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100":
                theme !== value,
            }
          )}
          aria-label={`Switch to ${label} theme`}
          title={`${label} mode`}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
