import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../user/entities/user.entity";

@Schema({ versionKey: false })
export class Group extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  user: string | User;

  @Prop({ required: false, type: Types.ObjectId, ref: "Group" })
  group?: string | Group;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
