import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppConfig } from "./config/app.config";
import { DatabaseConfig } from "./config/db.config";
import { MongooseModule } from "@nestjs/mongoose";
import { BullModule } from "@nestjs/bull";
import { DomainModule } from "./domain/domain.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { EmailModule } from "./shared/services/email/email.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [AppConfig, DatabaseConfig] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("mongo.uri"),
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: configService.get<string>("redis.uri"),
        defaultJobOptions: {
          removeOnFail: 100,
          attempts: 5,
        },
      }),
    }),
    EventEmitterModule.forRoot(),
    EmailModule,
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
