import { Module } from "@nestjs/common";
import { ParticipantService } from "./participant.service";
import { ParticipantController } from "./participant.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ParticipantSchema } from "./entities/participant.entity";
import { MongoParticipantRepository } from "./repositories/participant.mongo.repository";
import { GroupModule } from "../group/group.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Participant", schema: ParticipantSchema },
    ]),
    GroupModule,
  ],
  controllers: [ParticipantController],
  providers: [
    ParticipantService,
    { provide: "ParticipantRepository", useClass: MongoParticipantRepository },
  ],
})
export class ParticipantModule {}
