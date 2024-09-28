import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  sendEmail: defineAction({
    input: z.object({
      name: z.string().min(2),
      email: z.string().email(),
      number: z.string().min(5),
      message: z.string(),
    }),
    handler: async (input) => {
      const parsedText = `
        name: ${input.name}
        email: ${input.email}
        number: ${input.number}
        message: ${input.message}
      `;

      const email = await resend.emails.send({
        from: "noreply@updates.josuerhea.me",
        // to: ["littlejosuerhea@gmail.com"],
        to: ["jjplumbing.gas@gmail.com"],
        subject: "JJ Plumbing Client",
        text: parsedText,
        headers: {
          "X-Entity-Ref-ID": crypto.randomUUID(),
        },
      });

      return email;
    },
  }),
};
