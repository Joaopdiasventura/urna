import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantRepository } from "./repositories/participant.repository";
import { GroupService } from "./../group/group.service";

@Injectable()
export class ParticipantService {
  constructor(
    @Inject("ParticipantRepository")
    private readonly participantRepository: ParticipantRepository,
    private readonly groupService: GroupService,
  ) {}

  public async create(createParticipantDto: CreateParticipantDto) {
    await this.throwIfGroupHasASubGRoup(createParticipantDto.group);
    await this.participantRepository.create(createParticipantDto);
    return { message: "Participante adicionado com sucesso" };
  }

  public async findByGroup(group: string, page: number) {
    await this.findGroup(group);
    return await this.participantRepository.findByGroup(group, page);
  }

  public async findById(id: string) {
    const participant = await this.participantRepository.findById(id);
    if (!participant)
      throw new NotFoundException("Participante não encontrado");
    return participant;
  }

  public async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    const { group } = await this.findById(id);

    if (updateParticipantDto.group && group != updateParticipantDto.group)
      await this.throwIfGroupHasASubGRoup(updateParticipantDto.group);

    await this.participantRepository.update(id, updateParticipantDto);

    return { message: "Participante alterado com sucesso" };
  }

  public async delete(id: string) {
    await this.findById(id);
    await this.participantRepository.delete(id);
    return { message: "Participante deletado com sucesso" };
  }

  private async findGroup(group: string) {
    return await this.groupService.findById(group);
  }

  private async throwIfGroupHasASubGRoup(groupId: string) {
    const group = await this.groupService.findOneByGroup(groupId);

    if (group) {
      throw new BadRequestException(
        "Não é possível adicionar participantes a um grupo que contém sub-grupos",
      );
    }
  }
}
