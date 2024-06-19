import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import footerNavigation from "@/components/navigation/footer-nav";

export default async function protectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
