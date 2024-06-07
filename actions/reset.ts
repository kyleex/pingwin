"use server"

import * as z from "zod";

import { resetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/lib/mails";
import { generateResetPasswordToken } from "@/lib/tokens";

export const resetPassword = async (values: z.infer<typeof resetSchema>) => {
    const validatedFields = resetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid email" };
    }
    
    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Email not found" };
    }

    const resetPasswordToken = await generateResetPasswordToken(email);
    await sendResetPasswordEmail(resetPasswordToken.email, resetPasswordToken.token);

    return { success: "Reset email sent" };

};
