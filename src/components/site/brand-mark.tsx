import Image from "next/image";
import { cn } from "@/lib/utils";

/* Small square logo tile used wherever a product name appears in the
 * comparison pages (headers, table heads, tiles, footer). The name stays as
 * text next to the mark for accessibility and search — the logo identifies,
 * it does not replace. */

export const DATADREW_MARK = "/brand/datadrew-mark.svg";

const sizes = {
  sm: "size-5 rounded-[5px]",
  md: "size-6 rounded-md",
  lg: "size-9 rounded-lg",
} as const;

export function BrandMark({
  logo,
  name,
  size = "md",
  className,
}: {
  logo: string;
  name: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const px = size === "lg" ? 36 : size === "md" ? 24 : 20;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden border border-border/60 bg-white align-middle",
        sizes[size],
        className
      )}
    >
      <Image src={logo} alt={`${name} logo`} width={px} height={px} className="size-full object-cover" />
    </span>
  );
}

/* Mark + name inline, e.g. "[logo] Triple Whale". */
export function BrandLabel({
  logo,
  name,
  size = "md",
  className,
  textClassName,
}: {
  logo: string;
  name: string;
  size?: keyof typeof sizes;
  className?: string;
  textClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BrandMark logo={logo} name={name} size={size} />
      <span className={textClassName}>{name}</span>
    </span>
  );
}
