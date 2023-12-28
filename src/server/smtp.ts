import { env } from "@/env";
import nodemailer from "nodemailer";
import "server-only";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "devpintugtd@gmail.com",
    pass: env.GMAIL_APP_PASSWORD,
  },
});
