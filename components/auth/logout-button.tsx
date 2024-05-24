"use client";

import { useState, useTransition } from "react"; // Importing useTransition from react for transitions.
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";

interface LogoutButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  disabled?: "{isPending}";
}

export const LogoutButton = ({
  children,
  mode = "redirect",
  asChild = false,
}: LogoutButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // Initializing a transition.

  const onClick = () => {
    startTransition(() => {
      logout();
    });
  };

  // if (mode === "modal") {
  //   return <span>TODO: Implement modal login</span>;
  // }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
