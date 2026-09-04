import { LegalPage, legalMetadata } from "@/components/site/legal-page";

export const metadata = legalMetadata("google-limited-use-disclosure");

export default function Page() {
  return <LegalPage slug="google-limited-use-disclosure" />;
}
