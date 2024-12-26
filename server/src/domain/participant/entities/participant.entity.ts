import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Group } from "../../group/entities/group.entity";

@Schema({ versionKey: false })
export class Participant extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: "Group" })
  group: string | Group;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant)