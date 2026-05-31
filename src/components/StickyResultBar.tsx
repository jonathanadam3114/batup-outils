import { ArrowRight } from 'lucide-react';

interface StickyResultBarProps {
  /** Short tool-specific label, e.g. "Taux à facturer", "Prix HT". */
  label: string;
  /** Already-computed headline value to display (number or verdict string). */
  value: string;
  /** Signup URL already built by the calculator. */
  ctaHref: string;
  /** CTA button text. Defaults to "Essayer Batup". */
  ctaLabel?: string;
}

/**
 * Mobile-only sticky bar that pins the headline result + a signup CTA to the
 * bottom of the viewport. On mobile the 2-col calculator grid stacks, so the
 * sticky right panel scrolls off-screen while the user types — this keeps the
 * key number and the conversion CTA always visible.
 *
 * Reads already-computed values; holds no state of its own. Hidden on `lg`
 * and up, where the desktop `sticky top-20` panel takes over.
 */
export function StickyResultBar({
  label,
  value,
  ctaHref,
  ctaLabel = 'Essayer Batup',
}: StickyResultBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] uppercase tracking-wider text-gray-500">{label}</p>
          <p className="truncate text-lg font-bold leading-tight text-brand-500">{value}</p>
        </div>
        <a
          href={ctaHref}
          className="inline-flex flex-shrink-0 items-center justify-center gap-1 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
