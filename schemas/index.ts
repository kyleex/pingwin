import * as z from "zod";

export const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const addMatchSchema = z.object({
  opponentPlayerName: z.string().min(1, {
    message: "Opponents player name is required",
  }),
  playerSets: z.number().min(1).max(4, {
    message: "Player sets is required",
  }),
  opponentSets: z.number().min(1).max(4, {
    message: "Opponent sets is required",
  }),
});

