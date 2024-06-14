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
    <html lang="en" className="flex justify-center">
      <body className={`${roboto} font-sans w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-md flex justify-center flex-row`}>{children}</body>
    </html>
  );
}
