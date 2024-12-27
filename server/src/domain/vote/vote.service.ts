import { Inject, Injectable } from "@nestjs/common";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { VoteRepository } from "./repositories/vote.repository";
import { VoteGateway } from "./vote.gateway";
import { ParticipantService } from "../participant/participant.service";
import { GroupService } from "../group/group.service";

@Injectable()
export class VoteService {
  constructor(
    @Inject("VoteRepository") private readonly voteRepository: VoteRepository,
    private readonly voteGateway: VoteGateway,
    private readonly participantService: ParticipantService,
    private readonly groupService: GroupService,
  ) {}

  public async create(createVoteDto: CreateVoteDto) {
    await this.findParticipant(createVoteDto.participant);
    const vote = await this.voteRepository.create(createVoteDto);
    this.voteGateway.voteCreated(vote);
    return { message: "Voto adicionado com sucesso" };
  }

  public async findResultByGroup(group: string) {
    await this.findGroup(group);
    return this.voteRepository.findResultByGroup(group);
  }

  private async findParticipant(participant: string) {
    return await this.participantService.findById(participant);
  }

  private async findGroup(group: string) {
    return await this.groupService.findById(group);
  }
}
