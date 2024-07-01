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
    <html lang="fr" className={`w-full h-full flex justify-center font-sans ${roboto}`}>
      <body className="w-full h-full flex flex-col justify-center md:max-w-md lg:max-w-md xl:max-w-md overscroll-none">
        {children}
      </body>
    </html>
  );
}
