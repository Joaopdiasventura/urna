import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { GroupModule } from "./group/group.module";
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [UserModule, GroupModule, ParticipantModule],
})
export class DomainModule {}
