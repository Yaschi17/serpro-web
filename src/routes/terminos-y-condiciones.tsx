import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/landing/LegalPage";
import { termsAndConditions } from "@/content/legal";

export const Route = createFileRoute("/terminos-y-condiciones")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Términos y condiciones — SerPro Technology" },
      {
        name: "description",
        content: termsAndConditions.summary,
      },
    ],
  }),
});

function TermsPage() {
  return <LegalPage document={termsAndConditions} />;
}
