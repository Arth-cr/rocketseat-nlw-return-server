import nodemailer from "nodemailer"
import { MailAdapter, SendMailData } from "../mail-adapter"

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6a64610fd43902",
    pass: "ff6dce93cc5c8e",
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    const feedback = await transport.sendMail({
      from: "Equiper Feedget <oi@feedget.com>",
      to: "Arthur Ribeiro <arthur.carvalho@outlook.com.br>",
      subject,
      html: body,
    })
  }
}
