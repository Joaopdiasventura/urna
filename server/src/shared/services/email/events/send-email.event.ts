import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EmailService } from "../email.service";
import { SendEmailDto } from "../dto/send-email.dto";

@Injectable()
export class SendEmailEvent {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent("email.send")
  sendEmail(sendEmailDto: SendEmailDto) {
    this.emailService.addToQueue(sendEmailDto);
  }
}
