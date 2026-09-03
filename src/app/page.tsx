import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Logos } from "@/components/site/logos";
import { FeaturesBento } from "@/components/site/features-bento";
import { CreativeIntelligence } from "@/components/site/creative-intelligence";
import { HowItWorks } from "@/components/site/how-it-works";
import { Guardrails } from "@/components/site/guardrails";
import { CustomerStories } from "@/components/site/customer-stories";
import { McpAgents } from "@/components/site/mcp-agents";
import { Pricing } from "@/components/site/pricing";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { FinalCta } from "@/components/site/final-cta";
import { Footer } from "@/components/site/footer";
import { HomeStructuredData } from "@/components/site/structured-data";

export default function Page() {
  return (
    <>
      <HomeStructuredData />
      <Navbar />
      <main>
        <Hero />
        <Logos />
        <FeaturesBento />
        <CreativeIntelligence />
        <HowItWorks />
        <Guardrails />
        <CustomerStories />
        <McpAgents />
        <Pricing />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
