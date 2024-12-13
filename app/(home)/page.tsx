import Page from "@/src/pages-src/home";
import { verifySessionCustom } from "@/src/shared/lib/session-custom";
import { redirect } from "next/navigation";

const PageServer = async ({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) => {
  const session = await verifySessionCustom();
  if (!session) redirect("/login");

  const search = (await searchParams).search;

  return <Page search={search} />;
};

export default PageServer;
