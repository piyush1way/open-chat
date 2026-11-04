import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/layout/InfoPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — StrangerConnect" },
      { name: "description", content: "How StrangerConnect handles your privacy." },
      { property: "og:title", content: "Privacy — StrangerConnect" },
      { property: "og:description", content: "How StrangerConnect handles your privacy." },
    ],
  }),
  component: () => (
    <InfoPage title="Privacy & Safety">
      <p>Placeholder policy. StrangerConnect requires no account and does not ask for your name.</p>
      <p>Never share personal information like your address, phone number or passwords with strangers.</p>
    </InfoPage>
  ),
});
