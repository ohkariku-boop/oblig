/**
 * Oblig mark — geometric “O” with a vertical spine.
 * Reads as obligation / column of control; solid brand colours, no AI gradients.
 */
export function ObligIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Oblig"
    >
      {/* Light mode tile */}
      <rect
        x="0"
        y="0"
        width="40"
        height="40"
        rx="9"
        className="fill-[#0c1b2e] dark:fill-[#f3f7f9]"
      />
      {/* Outer ring — the O */}
      <circle
        cx="20"
        cy="20"
        r="11.5"
        fill="none"
        strokeWidth="3.25"
        className="stroke-[#f3f7f9] dark:stroke-[#0c1b2e]"
      />
      {/* Vertical spine — governance / obligation column */}
      <rect
        x="18.35"
        y="11"
        width="3.3"
        height="18"
        rx="1.2"
        className="fill-[#3b82f6] dark:fill-[#2563eb]"
      />
    </svg>
  );
}
