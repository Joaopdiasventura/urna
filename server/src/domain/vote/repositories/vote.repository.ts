import { Vote } from "../entities/vote.entity";
import { Result } from "../../../shared/interfaces/result";
import { CreateVoteDto } from "./../dto/create-vote.dto";

export interface VoteRepository {
  create(createVoteDto: CreateVoteDto): Promise<Vote>;
  findResultByGroup(group: string): Promise<Result[]>;
}
