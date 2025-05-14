import nodemailer, { Transporter } from "nodemailer";
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_EMAIL,
  SMTP_PASSWORD,
  SMTP_FROM_NAME,
  SMTP_FROM_EMAIL,
  NODE_ENV,
  EMAIL_SENDER
} from "../../constants/env";
import { EmailOptions } from "../../interfaces/emailInterface";
import resend from "../../config/resend";

const getFromEmail = () =>
  NODE_ENV === "development" ? "onboarding@resend.dev" : EMAIL_SENDER;

const getToEmail = (to: string) =>
  NODE_ENV === "development" ? "delivered@resend.dev" : to;

export const sendEmail = async ({ to, subject, text, html }: EmailOptions) =>
  await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });

// const sendEmail = async(options: EmailOptions): Promise<void> =>{
//   const transport: Transporter = nodemailer.createTransport({
//     host: SMTP_HOST,
//     port: parseInt(SMTP_PORT, 10),
//     auth: {
//       user: SMTP_EMAIL,
//       pass: SMTP_PASSWORD
//     },
//   });

//   const message = {
//     from: NODE_ENV === "development"
//     ? `${SMTP_FROM_NAME} <testmail@mail.com>`
//     : `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
//     to: options.to,
//     subject: options.subject,
//     text: options.text,
//     html: options.html
//   };
  
//   await transport.sendMail(message);
// };

// export default sendEmail;