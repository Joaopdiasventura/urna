import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @IsEmail({}, { message: "Digite um email válido" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Digite uma senha válida" })
  password: string;
}
