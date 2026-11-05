export function Arrow({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.2 9.8 9.8 2.2M4 2.2h5.8V8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Sun({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M8 .8v2M8 13.2v2M.8 8h2M13.2 8h2M2.9 2.9l1.4 1.4M11.7 11.7l1.4 1.4M13.1 2.9l-1.4 1.4M4.3 11.7l-1.4 1.4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function Moon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13.4 9.6A5.8 5.8 0 0 1 6.4 2.6a5.8 5.8 0 1 0 7 7Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

export function Menu({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function Close({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 108 108"
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="ar-peak" x1="28" y1="34" x2="82" y2="106" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3FA2FF" />
          <stop offset="0.52" stopColor="#0F86F5" />
          <stop offset="1" stopColor="#0B6AD1" />
        </linearGradient>
      </defs>
      <rect width="108" height="108" rx="24" fill="#fff" />
      <g transform="translate(-9.8 -12) scale(1.1)">
        <path d="M22 104 L58 36 L94 104 Z" fill="url(#ar-peak)" />
        <path d="M58 36 L94 104 L58 104 Z" fill="#0B5DBD" fillOpacity="0.25" />
        <path d="M58 36 L71 64 L58 56 L45 64 Z" fill="#fff" />
        <path d="M57.6 18.2 L57.6 34.8" stroke="#F5B942" strokeWidth="4.4" strokeLinecap="round" />
        <path d="M59.8 16 L79 22.5 L59.8 29 Z" fill="#FFC800" />
      </g>
    </svg>
  );
}
