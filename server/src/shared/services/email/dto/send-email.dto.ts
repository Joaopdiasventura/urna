import { Attachment } from "nodemailer/lib/mailer";

export class SendEmailDto {
  to: string;
  subject: string;
  html: string;
  attachments?: Attachment[];
}
