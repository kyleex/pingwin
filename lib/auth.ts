import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/lib/auth.config";

import { getUserById } from "@/data/user";
import email from "next-auth/providers/email";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    /**
     * Signs in a user and checks if the user exists and their email is verified.
     *
     * @param {Object} options - The options for signing in.
     * @param {Object} options.user - The user object containing the user's ID.
     * @returns {Promise<boolean>} A promise that resolves to `true` if the user exists and their email is verified, otherwise `false`.
     */
    async signIn({ user, account }) {
      // allow Oauth without email verification
      const existingUser = await getUserById(user?.id ?? "");

      // TODO: Add 2FA check here

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      session.user.customField = "Anything you want";

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
