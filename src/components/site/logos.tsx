import { Marquee } from "@/components/ui/marquee";
import { trustBar } from "@/content/site";

export function Logos() {
  return (
    <section aria-label="Customers" className="py-10 md:py-14">
      <p className="text-center text-sm font-medium text-muted-foreground">
        Trusted by fast-growing Shopify brands
      </p>
      <div className="relative mx-auto mt-6 max-w-5xl">
        <Marquee pauseOnHover className="[--duration:30s] [--gap:3.5rem]">
          {trustBar.brands.map((b) => (
            <span
              key={b}
              className="text-xl font-semibold tracking-tight text-foreground/50 transition-colors hover:text-foreground"
            >
              {b}
            </span>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
      </div>
      <dl className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-6 px-5 md:grid-cols-4">
        {trustBar.stats.map((s) => (
          <div key={s.label} className="text-center">
            <dt className="order-last mt-1 text-xs text-muted-foreground">{s.label}</dt>
            <dd className="text-2xl font-semibold tracking-tight tabular md:text-3xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
