"use server";

import { transporter } from "@/server/smtp";

export async function sendEmail() {
  const mailOpts = {
    from: "devpintugtd@gmail.com",
    to: "gsw2209@gmail.com",
    subject: "Test mail gtd xxvi website using nodemailer",
    text: "This is a test email sent using nodemailer for gtd xxvi website",
  };
  let ret = "";
  transporter.sendMail(mailOpts, (error, info) => {
    if (error) {
      ret = "error";
      console.error({ error });
    } else {
      ret = "success";
      console.log("Email sent: ", info.response);
    }
  });
  return ret;
}
