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
import { ParticipantService } from "./participant.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParseObjectIdPipe } from "../../shared/pipes/parse-object-id.pipe";

@Controller("participant")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get("findByGroup/:group/:page")
  findByGroup(
    @Param("group", ParseObjectIdPipe) group: string,
    @Param("page", ParseIntPipe) page: number,
  ) {
    return this.participantService.findByGroup(group, page < 0 ? 0 : page);
  }

  @Patch(":id")
  update(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(":id")
  delete(@Param("id", ParseObjectIdPipe) id: string) {
    return this.participantService.delete(id);
  }
}
