import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { FeaturesBento } from "@/components/site/features-bento";
import { CreativeIntelligence } from "@/components/site/creative-intelligence";
import { HowItWorks } from "@/components/site/how-it-works";
import { Integrations } from "@/components/site/integrations";
import { CustomerStories } from "@/components/site/customer-stories";
import { McpAgents } from "@/components/site/mcp-agents";
import { Pricing } from "@/components/site/pricing";
import { LogoWall } from "@/components/site/logo-wall";
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
        <LogoWall />
        <FeaturesBento />
        <CreativeIntelligence />
        <HowItWorks />
        <CustomerStories />
        <Integrations />
        <McpAgents />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
