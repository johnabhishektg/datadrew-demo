import { LegalPage, legalMetadata } from "@/components/site/legal-page";

export const metadata = legalMetadata("subprocessors");

export default function Page() {
  return <LegalPage slug="subprocessors" />;
}
