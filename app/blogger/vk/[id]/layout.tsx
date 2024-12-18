import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Детальная страница",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
