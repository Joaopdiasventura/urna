import { Participant } from "../entities/participant.entity";
import { CreateParticipantDto } from "./../dto/create-participant.dto";
import { UpdateParticipantDto } from "./../dto/update-participant.dto";

export interface ParticipantRepository {
  create(createParticipantDto: CreateParticipantDto): Promise<Participant>;
  findById(id: string): Promise<Participant>;
  findByGroup(group: string, page: number): Promise<Participant[]>;
  update(
    id: string,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant>;
  delete(id: string): Promise<Participant>;
}
