import { Module } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { VoteController } from "./vote.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VoteSchema } from "./entities/vote.entity";
import { ParticipantModule } from "../participant/participant.module";
import { MongoVoteRepository } from "./repositories/vote.mongo.repository";
import { VoteGateway } from "./vote.gateway";
import { GroupModule } from "../group/group.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Vote", schema: VoteSchema }]),
    ParticipantModule,
    GroupModule,
  ],
  controllers: [VoteController],
  providers: [
    VoteService,
    VoteGateway,
    { provide: "VoteRepository", useClass: MongoVoteRepository },
  ],
})
export class VoteModule {}
