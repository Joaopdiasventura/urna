import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Digite um email válido" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Digite um nome válido" })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "Digite uma senha válida" })
  password: string;
}
