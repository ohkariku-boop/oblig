export function ObligIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="oblig-shield-grad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#56f8ea" />
          <stop offset="45%" stopColor="#2dc8bc" />
          <stop offset="75%" stopColor="#2c6663" />
          <stop offset="100%" stopColor="#0f2638" />
        </linearGradient>
      </defs>

      {/* Background: genuinely swaps between light and dark mode, unlike a flattened PNG */}
      <rect x="0" y="0" width="100" height="100" rx="18" fill="#eef2f5" className="dark:hidden" />
      <rect x="0" y="0" width="100" height="100" rx="18" fill="#0c1b2e" className="hidden dark:block" />

      {/* Shield + checkmark mark */}
      <path
        d="M50 14 L78 26 V50 C78 68 66 82 50 88 C34 82 22 68 22 50 V26 Z"
        fill="none"
        stroke="url(#oblig-shield-grad)"
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <path
        d="M34 52 L46 64 L68 38"
        fill="none"
        stroke="url(#oblig-shield-grad)"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
