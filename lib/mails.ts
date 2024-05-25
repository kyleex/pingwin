import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmedLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Pingwins <no-reply@pingwins.xyz>",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmedLink}">here</a> to confirm your email.</p>`,
  });
};
