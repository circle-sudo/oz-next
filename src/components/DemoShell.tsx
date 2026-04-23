import type { ReactNode } from "react";

export type DemoShellProps = {
  badge: string;
  badgeClassName: string;
  title: string;
  definition: string;
  renderedLabel: string;
  renderedAt: string;
  children?: ReactNode;
};

export default function DemoShell({
  badge,
  badgeClassName,
  title,
  definition,
  renderedLabel,
  renderedAt,
  children,
}: DemoShellProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-100 bg-linear-to-r from-zinc-50 to-white px-6 py-5 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${badgeClassName}`}
            >
              {badge}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {definition}
          </p>
          <p className="mt-4 rounded-lg bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 sm:text-sm">
            <span className="font-sans font-medium text-zinc-500 dark:text-zinc-400">
              {renderedLabel}
            </span>{" "}
            {renderedAt}
          </p>
        </div>
        <div className="space-y-6 px-6 py-6">{children}</div>
      </div>
    </div>
  );
}