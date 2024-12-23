import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { GroupModule } from "./group/group.module";

@Module({
  imports: [UserModule, GroupModule],
})
export class DomainModule {}
