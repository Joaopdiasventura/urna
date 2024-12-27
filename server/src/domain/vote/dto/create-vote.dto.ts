import { IsMongoId } from "class-validator";

export class CreateVoteDto {
  @IsMongoId({ message: "Participante não encontrado" })
  participant: string;
}
