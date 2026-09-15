import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/landing/LegalPage";
import { cookiePolicy } from "@/content/legal";

export const Route = createFileRoute("/aviso-de-cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Aviso de cookies — SerPro Technology" },
      {
        name: "description",
        content: cookiePolicy.summary,
      },
    ],
  }),
});

function CookiesPage() {
  return <LegalPage document={cookiePolicy} />;
}
