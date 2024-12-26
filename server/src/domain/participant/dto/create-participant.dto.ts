import { IsMongoId, isMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty({ message: "Digite um nome válido" })
  name: string;

  @IsMongoId()
  group: string;
}
