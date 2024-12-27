import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Participant } from "../../participant/entities/participant.entity";

@Schema({ versionKey: false })
export class Vote extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: "Participant" })
  participant: string | Participant;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
