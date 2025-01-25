import { verifySessionCustom } from "@/shared/lib/session-custom";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Детальная страница",
  robots: { index: false, follow: false, noarchive: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await verifySessionCustom();
  if (!session) redirect("/login");
  return <>{children}</>;
}
