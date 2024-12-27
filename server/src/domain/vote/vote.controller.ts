import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { ParseObjectIdPipe } from "../../shared/pipes/parse-object-id.pipe";

@Controller("vote")
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.voteService.create(createVoteDto);
  }

  @Get("findResultByGroup/:group")
  findResultByGroup(@Param("group", ParseObjectIdPipe) group: string) {
    return this.voteService.findResultByGroup(group);
  }
}
