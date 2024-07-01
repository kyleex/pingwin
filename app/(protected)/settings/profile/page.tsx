"use client";

import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";

import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FooterNavigation from "@/components/layout/footer-nav";
import Header from "@/components/layout/header";

const SettingsPage = () => {
  const session = useSession();

  return (
    <>
      <main className="flex flex-col grow overflow-auto w-full md:max-w-md lg:max-w-md xl:max-w-md px-6">
        <span className="flex flex-row items-center my-5">
          <Link href="/settings" className="relative grow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <h1 className="flex grow">Settings</h1>
        </span>

        <div className="flex flex-col gap-y-4">
          <Card>
            <CardContent className="flex flex-row items-center p-3">
              <Avatar className="mr-2">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <span>
                <p className="font-semibold text-sm leading-6">
                  {session.data?.user.name}
                </p>
                <p className="font-light text-sm leading-5 text-slate-400 underline">
                  {session.data?.user.email}
                </p>
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-left p-3 gap-y-4">
              <h3 className="px-4 leading-5">Profile</h3>

              <span className="flex flex-col px-4 gap-1.5">
                <Label htmlFor="name" className="leading-5">
                  Name
                </Label>
                <Input
                  disabled
                  type="text"
                  id="name"
                  placeholder={session.data?.user.name}
                />
              </span>

              <span className="flex flex-col px-4 gap-1.5">
                <Label htmlFor="name" className="leading-5">
                  Email
                </Label>
                <Input
                  disabled
                  type="text"
                  id="name"
                  placeholder={session.data?.user.email}
                />
              </span>
            </CardContent>
          </Card>

          {/* {JSON.stringify(session?.user.name)} */}
          <LogoutButton>
            <Button variant="default" size="lg">
              Sign out
            </Button>
          </LogoutButton>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full">
        <FooterNavigation />
      </footer>
    </>
  );
};

export default SettingsPage;
