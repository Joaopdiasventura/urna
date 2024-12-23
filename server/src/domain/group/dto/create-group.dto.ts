import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGroupDto {
  @IsNotEmpty({ message: "Digite um nome válido" })
  @IsString({ message: "Digite um nome válido" })
  name: string;

  @IsMongoId()
  user: string;

  @IsOptional()
  @IsMongoId()
  group?: string;
}
