import Page from "@/src/pages-src/blogger/vk";
import { verifySessionCustom } from "@/src/shared/lib/session-custom";
import { redirect } from "next/navigation";

const PageServer = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await verifySessionCustom();
  if (!session) redirect("/login");

  const id = (await params).id;
  if (id === undefined) return;
  if (id === null) return;

  return <Page idBlogger={Number(id)} />;
};

export default PageServer;
