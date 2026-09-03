import { Marquee } from "@/components/ui/marquee";
import { testimonials } from "@/content/site";
import { Container, SectionHeader } from "./section-header";

function Card({ quote, name, company }: (typeof testimonials)[number]) {
  return (
    <figure className="w-80 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <blockquote className="text-sm leading-relaxed">“{quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
          {name.slice(0, 1)}
        </span>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{company}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader
          eyebrow="From the operators"
          headline="Trusted by teams who run on the numbers"
        />
      </Container>
      <div className="relative mt-12 md:mt-16">
        <Marquee pauseOnHover className="[--duration:40s]">
          {testimonials.map((t) => (
            <Card key={t.quote} {...t} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:46s]">
          {[...testimonials].reverse().map((t) => (
            <Card key={t.quote} {...t} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background" />
      </div>
    </section>
  );
}
