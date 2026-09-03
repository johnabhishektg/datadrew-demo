import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { pillars, problem } from "@/content/site";
import { Container, SectionHeader } from "./section-header";
import { ContextOrbit, ExecutionBeam, FindingsFeed, MemoryChart } from "./bento-visuals";

const visuals = {
  context: { background: <ContextOrbit />, className: "md:col-span-2 md:row-span-2", area: "inset-x-0 top-0 h-[48%] md:h-[72%]" },
  judgment: { background: <FindingsFeed />, className: "md:col-span-1 md:row-span-2", area: "inset-x-0 top-0 h-[46%] md:h-[66%]" },
  execution: { background: <ExecutionBeam />, className: "md:col-span-2", area: "inset-x-0 top-0 h-[44%] md:h-[62%]" },
  brain: { background: <MemoryChart />, className: "md:col-span-1", area: "inset-x-0 top-0 h-[38%] md:h-[46%]" },
} as const;

export function FeaturesBento() {
  return (
    <Container id="product" className="py-16 md:py-24">
      <SectionHeader
        eyebrow="What Drew does every day"
        headline="Running paid ads well is a daily decision job. Drew runs it."
        subhead={problem.punchline}
      />
      <BentoGrid className="mt-12 auto-rows-[27rem] md:mt-16 md:auto-rows-[20rem] md:grid-cols-3">
        {pillars.map((p) => {
          const v = visuals[p.id as keyof typeof visuals];
          return (
            <BentoCard
              key={p.id}
              name={p.title}
              description={p.lead}
              href="/#how-it-works"
              cta="See how it works"
              className={v.className}
              background={
                <div className={`absolute ${v.area} [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]`}>
                  {v.background}
                </div>
              }
            />
          );
        })}
      </BentoGrid>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
        {pillars[2].honesty?.body}
      </p>
    </Container>
  );
}
