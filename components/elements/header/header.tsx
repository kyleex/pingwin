"use client";

import { indieFlower } from "@/lib/fonts";
import { Separator } from "@/components/ui/separator";

export const Header = () => {
  return (
    <div className="flex h-60px flex-col w-full" style={{ margin: "10px 0px" }}>
      <div
        className="flex justify-between items-center px-10 w-full mx-10 my-0"
      >
        <div>
          <h1 className={`${indieFlower} text-4xl`}>Welcome to Pingwin</h1>
          <h5 className={`${indieFlower} text-lg`}>Get ready to smash!</h5>
        </div>
        <img
          src="/logo-pingwins.svg"
          alt="Pingwins logo"
          className="self-end"
          style={{ maxWidth: "5rem" }}
        />
      </div>
      <Separator orientation="horizontal" />
    </div>
  );
};
