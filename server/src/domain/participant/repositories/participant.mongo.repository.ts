import { InjectModel } from "@nestjs/mongoose";
import { CreateParticipantDto } from "../dto/create-participant.dto";
import { UpdateParticipantDto } from "../dto/update-participant.dto";
import { Participant } from "../entities/participant.entity";
import { ParticipantRepository } from "./participant.repository";
import { Model } from "mongoose";

export class MongoParticipantRepository implements ParticipantRepository {
  constructor(
    @InjectModel("Participant")
    private readonly participantModel: Model<Participant>,
  ) {}

  public async create(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    return await this.participantModel.create(createParticipantDto);
  }

  public async findById(id: string): Promise<Participant> {
    return await this.participantModel.findById(id).exec();
  }

  public async findByGroup(
    group: string,
    page: number,
  ): Promise<Participant[]> {
    return await this.participantModel
      .find({ group })
      .skip(page * 10)
      .limit(10)
      .exec();
  }

  public async update(
    id: string,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    return await this.participantModel
      .findByIdAndUpdate(id, updateParticipantDto)
      .exec();
  }

  public async delete(id: string): Promise<Participant> {
    return await this.participantModel.findByIdAndDelete(id).exec();
  }
}
