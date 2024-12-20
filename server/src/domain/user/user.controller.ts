import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Get,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ParseObjectIdPipe } from "../../shared/pipes/parse-object-id.pipe";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @HttpCode(200)
  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get("decodeToken/:token")
  decodeToken(@Param("token") token: string) {
    return this.userService.decodeToken(token);
  }

  @Get("validateEmail/:token")
  validateEmail(@Param("token") token: string) {
    return this.userService.validateEmail(token);
  }

  @Patch(":id")
  update(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  delete(@Param("id", ParseObjectIdPipe) id: string) {
    return this.userService.delete(id);
  }
}
