import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  headline,
  subhead,
  align = "center",
  className,
}: {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "mx-auto max-w-2xl items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
        {headline}
      </h2>
      {subhead && (
        <p className="text-balance text-base text-muted-foreground md:text-lg">
          {subhead}
        </p>
      )}
    </div>
  );
}

export function Container({ className, children, id }: { className?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-5 md:px-8", className)}>
      {children}
    </section>
  );
}
