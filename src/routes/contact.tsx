import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/layout/InfoPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — StrangerConnect" },
      { name: "description", content: "Get in touch with the StrangerConnect team." },
      { property: "og:title", content: "Contact — StrangerConnect" },
      { property: "og:description", content: "Get in touch with the StrangerConnect team." },
    ],
  }),
  component: () => (
    <InfoPage title="Contact">
      <p>Questions or safety concerns? Email us at hello@strangerconnect.example (placeholder).</p>
    </InfoPage>
  ),
});
