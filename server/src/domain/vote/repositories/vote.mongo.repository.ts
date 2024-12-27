import { InjectModel } from "@nestjs/mongoose";
import { CreateVoteDto } from "../dto/create-vote.dto";
import { Vote } from "../entities/vote.entity";
import { Result } from "../../../shared/interfaces/result";
import { VoteRepository } from "./vote.repository";
import { Model } from "mongoose";

export class MongoVoteRepository implements VoteRepository {
  constructor(@InjectModel("Vote") private readonly voteModel: Model<Vote>) {}

  public async create(createVoteDto: CreateVoteDto): Promise<Vote> {
    return await this.voteModel.create(createVoteDto);
  }

  public async findResultByGroup(group: string): Promise<Result[]> {
    return await this.voteModel.aggregate([
      {
        $addFields: {
          participant: { $toObjectId: "$participant" },
        },
      },
      {
        $lookup: {
          from: "participants",
          localField: "participant",
          foreignField: "_id",
          as: "participant",
        },
      },
      {
        $match: {
          "participant.group": group,
        },
      },
      {
        $project: {
          "participant._id": 1,
          "participant.name": 1,
        },
      },
      {
        $group: {
          _id: "$participant",
          votes: { $count: {} },
        },
      },
      {
        $project: {
          _id: 0,
          participant: "$_id",
          votes: 1,
        },
      },
    ]);
  }
}
