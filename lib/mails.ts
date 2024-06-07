import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  await resend.emails.send({
    from: "Pingwins <no-reply@pingwins.xyz>",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmedLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Pingwins <no-reply@pingwins.xyz>",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmedLink}">here</a> to confirm your email.</p>`,
  });
};
