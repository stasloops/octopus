import Page from "@/src/pages-src/blogger/vk";
import { httpServerGetBlogger } from "@/src/shared/api/blogger/http-get-blogger";
import { verifySessionCustom } from "@/src/shared/lib/session-custom";
import { sleep } from "@/src/shared/lib/sleep";
import { redirect } from "next/navigation";

const PageServer = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await verifySessionCustom();
  if (!session) redirect("/login");

  const id = (await params).id;
  if (id === undefined) return;
  if (id === null) return;

  const res = await httpServerGetBlogger({ id__in: id });
  if (!res) return;
  if (res.data.length <= 0) return;

  await sleep(2000);

  return <Page blogger={res.data[0]} />;
};

export default PageServer;
