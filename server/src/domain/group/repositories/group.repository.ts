import { Group } from "../entities/group.entity";
import { CreateGroupDto } from "../dto/create-group.dto";
import { UpdateGroupDto } from "./../dto/update-group.dto";

export interface GroupRepository {
  create(createGroupDto: CreateGroupDto): Promise<Group>;
  findById(id: string): Promise<Group>;
  findOneByGroup(group: string): Promise<Group>;
  findByUser(user: string, page: number): Promise<Group[]>;
  findByGroup(group: string, page: number): Promise<Group[]>;
  update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group>;
  delete(id: string): Promise<Group>;
}
