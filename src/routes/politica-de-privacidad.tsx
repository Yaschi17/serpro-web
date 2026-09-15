import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/landing/LegalPage";
import { privacyPolicy } from "@/content/legal";

export const Route = createFileRoute("/politica-de-privacidad")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Política de privacidad — SerPro Technology" },
      {
        name: "description",
        content: privacyPolicy.summary,
      },
    ],
  }),
});

function PrivacyPage() {
  return <LegalPage document={privacyPolicy} />;
}
