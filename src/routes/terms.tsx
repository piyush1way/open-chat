import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/layout/InfoPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — StrangerConnect" },
      { name: "description", content: "Terms of use for StrangerConnect." },
      { property: "og:title", content: "Terms — StrangerConnect" },
      { property: "og:description", content: "Terms of use for StrangerConnect." },
    ],
  }),
  component: () => (
    <InfoPage title="Terms of Use">
      <p>Placeholder terms. You must be 18 or older to use StrangerConnect.</p>
      <p>Be respectful. Harassment, hate speech, spam and illegal content are not allowed.</p>
    </InfoPage>
  ),
});
