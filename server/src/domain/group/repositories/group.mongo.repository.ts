import { InjectModel } from "@nestjs/mongoose";
import { CreateGroupDto } from "../dto/create-group.dto";
import { UpdateGroupDto } from "../dto/update-group.dto";
import { Group } from "../entities/group.entity";
import { GroupRepository } from "./group.repository";
import { Model } from "mongoose";

export class MongoGroupRepository implements GroupRepository {
  constructor(
    @InjectModel("Group") private readonly groupModel: Model<Group>,
  ) {}

  public async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return await this.groupModel.create(createGroupDto);
  }

  public async findById(id: string): Promise<Group> {
    return await this.groupModel.findById(id).exec();
  }

  public async findOneByGroup(group: string): Promise<Group> {
    return await this.groupModel.findOne({ group }).exec();
  }

  public async findByUser(user: string, page: number): Promise<Group[]> {
    return await this.groupModel
      .find({ user, group: { $exists: false } })
      .skip(10 * page)
      .limit(10)
      .exec();
  }

  public async findByGroup(group: string, page: number): Promise<Group[]> {
    return await this.groupModel
      .find({ group })
      .skip(10 * page)
      .limit(10)
      .populate({ path: "group", select: "name" })
      .exec();
  }

  public async update(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    return await this.groupModel.findByIdAndUpdate(id, updateGroupDto).exec();
  }

  public async delete(id: string): Promise<Group> {
    return await this.groupModel.findByIdAndDelete(id).exec();
  }
}
