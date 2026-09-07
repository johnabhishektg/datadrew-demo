import { faq } from "@/content/site";
import { FaqList } from "./faq-list";
import { Container, SectionHeader } from "./section-header";

export function Faq() {
  return (
    <Container id="faq" className="py-16 md:py-24">
      <SectionHeader
        eyebrow="FAQ"
        headline="Frequently asked questions"
        subhead="Straight answers to the awkward ones. Anything else — support@datadrew.io."
      />
      <FaqList items={faq} className="mt-10 md:mt-14" />
    </Container>
  );
}
