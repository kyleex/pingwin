"use server";
import * as z from "zod";

import { PrismaClient } from '@prisma/client';
import { auth } from "@/lib/auth";

import { addMatchSchema } from "@/schemas";

export const addMatch = async (values: z.infer<typeof addMatchSchema>) => {
    const prisma = new PrismaClient();
    const session = await auth();

    const userId = session?.user.id
    const userName = session?.user.name

    const validatedFields = addMatchSchema.safeParse(values);

    if (!userId) {
        return { error: "Not authorized" };
    }
    
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    
    const { opponentPlayerName, playerSets, opponentSets } = validatedFields.data;
    const playerName = userName;

    if (playerName === opponentPlayerName) {
        return { error: "You cannot play against yourself" };
    }

    const score  = playerSets + "-" + opponentSets;
    const winner = playerSets > opponentSets ? playerName : opponentPlayerName; // if playerSets > opponentSets, playerName is the winner, otherwise opponentPlayerName is the winner

    try {
        const match = await prisma.match.create({
            data: {
                player1: playerName,
                player2: opponentPlayerName,
                score: score,
                winner: winner,
                userId: userId
            }
        });
        
        return { success: "Match added successfully", match };
    } catch (error) {
        console.error("Failed to add match to database:", error);
        return { error: "Failed to add match to database" };
    }
};
