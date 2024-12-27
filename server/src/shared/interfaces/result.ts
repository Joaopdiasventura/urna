import { Participant } from "../../domain/participant/entities/participant.entity";

export interface Result {
  participant: Participant;
  votes: number;
}
