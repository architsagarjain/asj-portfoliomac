export function AppleLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.36 12.62c-.02-2.2 1.79-3.26 1.87-3.31-1.02-1.49-2.6-1.7-3.17-1.72-1.35-.14-2.63.79-3.31.79-.68 0-1.73-.77-2.85-.75-1.47.02-2.82.85-3.58 2.16-1.52 2.65-.39 6.57 1.1 8.72.73 1.05 1.6 2.23 2.74 2.19 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.47zM14.2 6.2c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.55 1.3-.56.64-1.05 1.68-.92 2.67.97.08 1.96-.49 2.57-1.21z" />
    </svg>
  );
}

export function FolderGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="folderTab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6ec2f7" />
          <stop offset="1" stopColor="#4fb0f2" />
        </linearGradient>
        <linearGradient id="folderBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#84cdfb" />
          <stop offset="1" stopColor="#5cb7f5" />
        </linearGradient>
      </defs>
      <path
        d="M5 14a7 7 0 0 1 7-7h29a7 7 0 0 1 5 2.1l6.6 6.7z"
        fill="url(#folderTab)"
      />
      <rect x="4" y="14" width="112" height="72" rx="9" fill="url(#folderBody)" />
      <rect x="6" y="15" width="108" height="4" rx="2" fill="#ffffff" opacity="0.3" />
    </svg>
  );
}

export function HardDriveGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hdShell" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#e6e8ea" />
          <stop offset="0.5" stopColor="#c6cacd" />
          <stop offset="1" stopColor="#a9aeb3" />
        </linearGradient>
        <linearGradient id="hdEdge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fa4aa" />
          <stop offset="1" stopColor="#7d8187" />
        </linearGradient>
      </defs>
      <rect x="10" y="12" width="100" height="62" rx="5" fill="url(#hdShell)" />
      <rect x="10" y="70" width="100" height="16" rx="4" fill="url(#hdEdge)" />
      <rect x="22" y="20" width="56" height="13" rx="2" fill="#f2f3f4" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={25 + i * 6} y={22} width="3" height="9" fill="#33373c" />
      ))}
      <circle cx="62" cy="52" r="19" fill="#ffffff" opacity="0.18" />
      <circle cx="62" cy="52" r="8" fill="#ffffff" opacity="0.3" />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x={68 + i * 7} y={72} width="4" height="12" fill="#2f3339" />
      ))}
      <rect x="20" y="72" width="7" height="12" fill="#2f3339" />
      <circle cx="18" cy="66" r="2" fill="#8d9298" />
      <circle cx="102" cy="66" r="2" fill="#8d9298" />
      <circle cx="102" cy="20" r="2" fill="#8d9298" />
    </svg>
  );
}
