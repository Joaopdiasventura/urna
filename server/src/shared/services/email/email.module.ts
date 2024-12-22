import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { BullModule } from "@nestjs/bull";
import { SendEmailEvent } from "./events/send-email.event";

@Module({
  imports: [BullModule.registerQueue({ name: "emails" })],
  providers: [EmailService, SendEmailEvent],
})
export class EmailModule {}
