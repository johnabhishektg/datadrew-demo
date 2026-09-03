import { cn } from "@/lib/utils";

/* Brand marks used in orbits, beams and integration rows.
 * Monogram tiles (not licensed logos) — swap for official SVGs before launch. */

type MarkProps = { className?: string };

const tile = "flex items-center justify-center rounded-full border border-border bg-card font-semibold shadow-sm";

export function ShopifyMark({ className }: MarkProps) {
  return (
    <span className={cn(tile, "text-[#5E8E3E]", className)} aria-label="Shopify">
      <svg viewBox="0 0 24 24" className="size-[55%]" fill="currentColor">
        <path d="M15.3 3.2c-.2-.1-.5 0-.6.1l-.9.3C13.5 2.4 12.9 1.6 12 1.6h-.1C11.3.9 10.7.7 10.2.7 7.7.7 6.5 3.9 6.1 5.4l-1.9.6c-.6.2-.6.2-.7.8L2 19.8l11.6 2.2 6.3-1.4L17.5 4c0-.1-.1-.2-.2-.2l-2-.6zM12.9 3.9l-1.6.5c0-.7-.1-1.7-.4-2.3.9.2 1.6 1 2 1.8zM10.2 1.6c.2 0 .4 0 .6.2-.8.4-1.6 1.3-2 3.2l-1.4.4c.4-1.4 1.3-3.8 2.8-3.8zm.5 8.5s-.7-.4-1.6-.4c-1.3 0-1.4.8-1.4 1 0 1.2 3 1.6 3 4.3 0 2.1-1.3 3.5-3.1 3.5-2.2 0-3.3-1.3-3.3-1.3l.6-1.9s1.1.9 2.1.9c.6 0 .9-.5.9-.9 0-1.5-2.5-1.6-2.5-4.1 0-2.1 1.5-4.1 4.5-4.1 1.2 0 1.7.3 1.7.3l-.9 2.7z" />
      </svg>
    </span>
  );
}

export function MetaMark({ className }: MarkProps) {
  return (
    <span className={cn(tile, "text-[#0866FF]", className)} aria-label="Meta Ads">
      <svg viewBox="0 0 24 24" className="size-[58%]" fill="currentColor">
        <path d="M6.9 5C4.1 5 2 8.3 2 12.3 2 15.2 3.3 17 5.3 17c1.6 0 2.7-.9 4.3-3.7l1.3-2.3c.2.4.5.8.7 1.2l.9 1.5C13.9 16.1 15 17 16.8 17c2.1 0 3.2-1.7 3.2-4.4C20 8.5 17.9 5 15.2 5c-1.7 0-3 1.2-4.5 3.4L10 9.5C8.9 7.4 7.9 5 6.9 5zm8.4 2.1c1.4 0 2.8 2.5 2.8 5.6 0 1.5-.5 2.2-1.3 2.2-.8 0-1.4-.6-2.4-2.4l-1.2-2.1c1-1.7 1.5-3.3 2.1-3.3zm-8.4 0c.5 0 1.2 1.3 2.3 3.2l-1.1 1.9C7 14.1 6.4 14.9 5.5 14.9c-.9 0-1.5-.8-1.5-2.5 0-3 1.4-5.3 2.9-5.3z" />
      </svg>
    </span>
  );
}

export function GoogleMark({ className }: MarkProps) {
  return (
    <span className={cn(tile, className)} aria-label="Google Ads">
      <svg viewBox="0 0 24 24" className="size-[52%]">
        <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4c-.2 1.2-.9 2.3-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" />
        <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6C4.8 19.8 8.2 22 12 22z" />
        <path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1C2.4 8.8 2 10.4 2 12s.4 3.2 1.1 4.6L6.4 14z" />
        <path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9C17 2.9 14.7 2 12 2 8.2 2 4.8 4.2 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1z" />
      </svg>
    </span>
  );
}

export function SlackMark({ className }: MarkProps) {
  return (
    <span className={cn(tile, className)} aria-label="Slack">
      <svg viewBox="0 0 24 24" className="size-[50%]">
        <path fill="#E01E5A" d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 0 1 4 0v5a2 2 0 0 1-4 0v-5z" />
        <path fill="#36C5F0" d="M9 6a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 0 1 0 4H4a2 2 0 0 1 0-4h5z" />
        <path fill="#2EB67D" d="M18 9a2 2 0 1 1 2 2h-2V9zm-1 0a2 2 0 0 1-4 0V4a2 2 0 0 1 4 0v5z" />
        <path fill="#ECB22E" d="M15 18a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 0 1 0-4h5a2 2 0 0 1 0 4h-5z" />
      </svg>
    </span>
  );
}

function Monogram({ letter, color, label, className }: MarkProps & { letter: string; color: string; label: string }) {
  return (
    <span className={cn(tile, "text-sm", className)} style={{ color }} aria-label={label}>
      {letter}
    </span>
  );
}

export const KlaviyoMark = (p: MarkProps) => <Monogram letter="K" color="#111" label="Klaviyo" {...p} />;
export const GA4Mark = (p: MarkProps) => <Monogram letter="GA" color="#E37400" label="GA4" {...p} />;
export const ClaudeMark = (p: MarkProps) => <Monogram letter="C" color="#D97757" label="Claude" {...p} />;
export const ChatGPTMark = (p: MarkProps) => <Monogram letter="G" color="#10A37F" label="ChatGPT" {...p} />;
export const AmazonMark = (p: MarkProps) => <Monogram letter="a" color="#FF9900" label="Amazon" {...p} />;
export const UnicommerceMark = (p: MarkProps) => <Monogram letter="U" color="#E4572E" label="Unicommerce" {...p} />;

/* Datadrew brand mark — from /Users/johntg/Desktop/datadrew_logo.svg (Jul 2026).
 * Inlined so it can take currentColor and follow the theme. */
export function DatadrewMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 29 29" className={className} fill="currentColor" aria-hidden="true">
      <path d="M27.8818 0C28.0377 0 28.164 0.126346 28.1641 0.282227V25.4648C28.1638 26.9459 26.9635 28.1463 25.4824 28.1465H0.282227C0.126346 28.1464 0 28.0202 0 27.8643V25.1289C0.000113299 24.9731 0.126416 24.8467 0.282227 24.8467H24.4229C24.5788 24.8467 24.706 24.7204 24.7061 24.5645V0.282227C24.7061 0.126346 24.8324 0 24.9883 0H27.8818ZM13.7998 0C13.9557 0 14.082 0.126346 14.082 0.282227V3.21191C14.0819 3.36777 13.9557 3.49414 13.7998 3.49414H3.68848C3.53256 3.49414 3.40628 3.62046 3.40625 3.77637V20.6113C3.40625 20.7673 3.27898 20.8936 3.12305 20.8936H0.282227C0.126346 20.8935 0 20.7672 0 20.6113V1.69434C0 0.758712 0.758712 0 1.69434 0H13.7998ZM20.9287 0C21.0846 0 21.2118 0.126346 21.2119 0.282227V20.6113C21.2119 20.7673 21.0846 20.8936 20.9287 20.8936H7.37598C7.22023 20.8933 7.09375 20.7671 7.09375 20.6113V7.37598C7.09397 7.22036 7.22036 7.09397 7.37598 7.09375H17.3115C17.4675 7.09375 17.5938 6.96746 17.5938 6.81152V0.282227C17.5938 0.12644 17.7202 0.000153437 17.876 0H20.9287ZM10.6904 10.1475C10.5367 10.1475 10.4121 10.272 10.4121 10.4258V17.2588C10.4124 17.4242 10.5465 17.5585 10.7119 17.5586H17.4883C17.6536 17.5583 17.7878 17.4241 17.7881 17.2588V10.4473C17.788 10.2818 17.6537 10.1477 17.4883 10.1475H10.6904Z" />
    </svg>
  );
}

/* The brand lockup tile: white mark on a black ground, in every theme. */
export function DatadrewTile({ className, round = false }: MarkProps & { round?: boolean }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center bg-[#161616] text-white",
        round ? "rounded-full" : "rounded-md",
        className
      )}
      aria-label="Datadrew"
    >
      <DatadrewMark className="size-[56%]" />
    </span>
  );
}

/* Drew — the agent. Same black tile, round. */
export function DrewMark({ className }: MarkProps) {
  return <DatadrewTile round className={className} />;
}

export function Logo({ className }: MarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <DatadrewTile className="size-7" />
      <span className="text-base font-semibold tracking-tight">Datadrew</span>
    </span>
  );
}
