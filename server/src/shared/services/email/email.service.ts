import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job, Queue } from "bull";
import { SendEmailDto } from "./dto/send-email.dto";
import { createTransport, Transporter } from "nodemailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
@Processor("emails")
export class EmailService {
  private transporter: Transporter;

  constructor(
    @InjectQueue("emails") private readonly queue: Queue,
    private readonly configService: ConfigService,
  ) {
    this.transporter = createTransport({
      service: "Gmail",
      auth: {
        user: this.configService.get<string>("email.address"),
        pass: this.configService.get<string>("email.password"),
      },
    });
  }

  public async addToQueue(sendEmailDto: SendEmailDto) {
    await this.queue.add("send-email", sendEmailDto);
  }

  @Process("send-email")
  async sendEmail(job: Job<SendEmailDto>) {
    try {
      await this.transporter.sendMail({
        from: `"URNA" <${this.configService.get<string>("email.address")}>`,
        ...job.data,
      });
    } catch (error) {
      throw new Error(
        "Erro ao enviar o email, tente novamente mais tarde ou contate o suporte",
      );
    }
  }
}
