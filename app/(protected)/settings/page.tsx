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
import Header from "@/components/layout/header";
import FooterNavigation from "@/components/layout/footer-nav";

const SettingsPage = () => {
  const session = useSession();

  return (
    <>
      <header className="px-4 w-full">
        <Header />
      </header>

      <main className="flex flex-col grow overflow-auto gap-y-4 mt-3 mx-5">
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
            <h3 className="px-4 leading-5 text">Account</h3>
            <Button variant="ghost" className="">
              <Link
                href="/settings/profile"
                className="flex w-full justify-between"
              >
                <span className="inline-flex items-center">
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
                    class="lucide lucide-user-round"
                  >
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 0 0-16 0" />
                  </svg>
                  <p className="ml-2 leading-5">Profile</p>
                </span>
                <span>
                  <svg
                    className="grow-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="flex w-full justify-between color"
            >
              <span className="inline-flex items-center">
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
                  class="lucide lucide-key-round"
                >
                  <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
                <p className="ml-2 leading-5  ">Password</p>
              </span>
              <span>
                <svg
                  className="grow-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-left p-3 gap-y-4">
            <h3 className="px-4 leading-5">Contact</h3>
            <Button variant="ghost" className="">
              <Link
                href="/settings/profile"
                className="flex w-full justify-between"
              >
                <span className="inline-flex items-center">
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
                    class="lucide lucide-messages-square"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>{" "}
                  <p className="ml-2 leading-5">Profile</p>
                </span>
                <span>
                  <svg
                    className="grow-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="flex w-full justify-between color"
            >
              <span className="inline-flex items-center">
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
                  class="lucide lucide-key-round"
                >
                  <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
                <p className="ml-2 leading-5  ">Password</p>
              </span>
              <span>
                <svg
                  className="grow-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </Button>
          </CardContent>
        </Card>

        {/* {JSON.stringify(session?.user.name)} */}
        <LogoutButton>
          <Button variant="default" size="lg">
            Sign out
          </Button>
        </LogoutButton>
      </main>

      <footer className="fixed bottom-0 w-full  ">
        <FooterNavigation />
      </footer>
    </>
  );
};

export default SettingsPage;
