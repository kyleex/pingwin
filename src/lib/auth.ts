import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

export const { auth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
});
