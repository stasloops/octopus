import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Заголовок",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // const session = await verifySessionCustom();
  // if (!session) redirect("/login");

  return <>{children}</>;
}
