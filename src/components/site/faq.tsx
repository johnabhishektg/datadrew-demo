import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/content/site";
import { Container, SectionHeader } from "./section-header";

export function Faq() {
  return (
    <Container id="faq" className="py-16 md:py-24">
      <SectionHeader
        eyebrow="FAQ"
        headline="Frequently asked questions"
        subhead="Straight answers to the awkward ones. Anything else — support@datadrew.io."
      />
      <Accordion type="single" collapsible className="mx-auto mt-10 max-w-3xl md:mt-14">
        {faq.map((item, i) => (
          <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
}
