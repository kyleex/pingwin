import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import React from "react";
  
export default async function protectedLayout ({
    children,
}: { 
    children: React.ReactNode
}) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <div className="flex justify-center">
                {" "}
                {children}{" "}
            </div>
        </SessionProvider>
      );
}
  