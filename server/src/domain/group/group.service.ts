import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { GroupRepository } from "./repositories/group.repository";
import { UserService } from "../user/user.service";

@Injectable()
export class GroupService {
  constructor(
    @Inject("GroupRepository")
    private readonly groupRepository: GroupRepository,
    private readonly userService: UserService,
  ) {}

  public async create(createGroupDto: CreateGroupDto) {
    await this.findUser(createGroupDto.user);
    if (createGroupDto.group) await this.findById(createGroupDto.group);
    await this.groupRepository.create(createGroupDto);

    return { message: "Grupo criado com sucesso" };
  }

  public async findById(id: string) {
    const group = await this.groupRepository.findById(id);
    if (!group) throw new NotFoundException("Grupo não encontrado");
    return group;
  }

  public async findOneByGroup(group: string) {
    return await this.groupRepository.findOneByGroup(group);
  }

  public async findByUser(user: string, page: number) {
    await this.findUser(user);
    return await this.groupRepository.findByUser(user, page);
  }

  public async findByGroup(group: string, page: number) {
    await this.findById(group);
    return await this.groupRepository.findByGroup(group, page);
  }

  public async update(id: string, updateGroupDto: UpdateGroupDto) {
    const { user, group } = await this.findById(id);

    if (updateGroupDto.group == id)
      throw new BadRequestException("Um grupo não pode pertencer a ele mesmo");

    if (updateGroupDto.group && group != updateGroupDto.group)
      await this.findById(updateGroupDto.group);

    if (updateGroupDto.user && user != updateGroupDto.user)
      throw new UnauthorizedException(
        "Apenas o criador do grupo pode editar ele",
      );

    await this.groupRepository.update(id, updateGroupDto);

    return { message: "Grupo alterado com sucesso" };
  }

  public async delete(id: string) {
    await this.findById(id);
    await this.groupRepository.delete(id);
    return { message: "Grupo deletado com sucesso" };
  }

  private async findUser(user: string) {
    await this.userService.findById(user);
  }
}
