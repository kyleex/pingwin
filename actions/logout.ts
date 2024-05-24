"use server";

import { AuthError } from "next-auth";

import { signOut } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const logout = async () => {
  try {
    await signOut({ redirectTo: DEFAULT_LOGIN_REDIRECT });

    return { success: "Logged out" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
