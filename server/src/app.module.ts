import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppConfig } from "./config/app.config";
import { DatabaseConfig } from "./config/db.config";
import { MongooseModule } from "@nestjs/mongoose";
import { DomainModule } from "./domain/domain.module";

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
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
