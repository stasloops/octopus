import App from "../src/app-src";
import { fontFamily } from "@/shared/lib/theme/font";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Заголовок",
  description: "Болванка для сайта",
};

// Font files can be colocated inside of `app`

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={fontFamily.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
