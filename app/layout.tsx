import type { Metadata } from "next";

import "./globals.css";
import { roboto } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Pingwin",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto} font-sans mx-10`}>{children}</body>
    </html>
  );
}
