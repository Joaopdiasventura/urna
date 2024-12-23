import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { ParseObjectIdPipe } from "../../shared/pipes/parse-object-id.pipe";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get("findByUser/:user/:page")
  findByUser(
    @Param("user", ParseObjectIdPipe) user: string,
    @Param("page", ParseIntPipe) page: number,
  ) {
    return this.groupService.findByUser(user, page < 0 ? 0 : page);
  }

  @Get("findByGroup/:group/:page")
  findByGroup(
    @Param("group", ParseObjectIdPipe) group: string,
    @Param("page", ParseIntPipe) page: number,
  ) {
    return this.groupService.findByGroup(group, page < 0 ? 0 : page);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.groupService.delete(id);
  }
}
