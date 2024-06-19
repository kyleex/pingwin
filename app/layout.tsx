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
    <html
      lang="fr"
      className={`size-full flex justify-center font-sans ${roboto}`}
    >
      <body className="w-full h-full sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md flex flex-col">
        {children}
      </body>
    </html>
  );
}
