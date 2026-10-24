// Solid print glyphs, drawn on one 20px grid so they sit with the heavy caps.
type IconProps = { className?: string };

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  "aria-hidden": true,
  focusable: false,
} as const;

export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2 8.5h11.2L8.9 4.2 11 2l8 8-8 8-2.1-2.2 4.3-4.3H2z" fill="currentColor" />
    </svg>
  );
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M18 8.5H6.8l4.3-4.3L9 2 1 10l8 8 2.1-2.2-4.3-4.3H18z" fill="currentColor" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8.5 1h3v11.2l4.3-4.3L18 10l-8 8-8-8 2.2-2.1 4.3 4.3z" fill="currentColor" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 2h13v13h-3V7.1L4.1 18 2 15.9 12.9 5H5z" fill="currentColor" />
    </svg>
  );
}

export function Play({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 2l14 8-14 8z" fill="currentColor" />
    </svg>
  );
}

export function Pause({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 2h5v16H3zM12 2h5v16h-5z" fill="currentColor" />
    </svg>
  );
}

export function Alert({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 1 19 18H1L10 1Z" fill="currentColor" />
      <path d="M8.9 7h2.2l-.3 5.6H9.2L8.9 7Zm0 7.2h2.2v2.1H8.9v-2.1Z" fill="var(--cream)" />
    </svg>
  );
}

export function Spinner({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 1a9 9 0 1 1-9 9h3a6 6 0 1 0 6-6z" fill="currentColor" />
    </svg>
  );
}
