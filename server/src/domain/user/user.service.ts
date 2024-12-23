import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "../../shared/modules/auth/auth.service";
import { User } from "./entities/user.entity";
import { UtilsService } from "./../../shared/utils/utils.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class UserService {
  constructor(
    @Inject("UserRepository") private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    await this.throwIfEmailExists(createUserDto.email);

    createUserDto.password = await this.authService.hashPassword(
      createUserDto.password,
    );

    const user = await this.userRepository.create(createUserDto);

    const token = await this.authService.generateToken(user.id);

    this.sendValidationEmail(
      user.email,
      await this.authService.generateToken(user.email),
    );

    const userObject: User = user.toObject();
    delete userObject.password;

    return { message: "Usuário criado com sucesso", user: userObject, token };
  }

  public async login(loginUserDto: LoginUserDto) {
    const user = await this.findByEmail(loginUserDto.email);

    await this.authService.comparePassword(
      loginUserDto.password,
      user.password,
    );

    const token = await this.authService.generateToken(user.id);

    const userObject: User = user.toObject();
    delete userObject.password;

    return { message: "Login realizado com sucesso", user: userObject, token };
  }

  public async decodeToken(token: string) {
    const id = await this.authService.decodeToken(token);
    const user = await this.findById(id);
    return { user };
  }

  public async validateEmail(token: string) {
    try {
      const email = await this.authService.decodeToken(token);

      const { isEmailValid, id } = await this.findByEmail(email);

      if (isEmailValid)
        return this.utilsService.createAlertResponse("O Email já foi validado");

      await this.update(id, { isEmailValid: true });
      return this.utilsService.createAlertResponse("Email validado");
    } catch (error) {
      return this.utilsService.createAlertResponse(
        "Conta não encontrada! Crie uma e tente novamente",
      );
    }
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const { email } = await this.findById(id);

    if (updateUserDto.email && updateUserDto.email != email) {
      await this.throwIfEmailExists(updateUserDto.email);
      updateUserDto.isEmailValid = false;
      const token = await this.authService.generateToken(updateUserDto.email);
      this.sendValidationEmail(updateUserDto.email, token);
    }

    if (updateUserDto.password)
      updateUserDto.password = await this.authService.hashPassword(
        updateUserDto.password,
      );

    await this.userRepository.update(id, updateUserDto);
    return { message: "Informações atualizadas com sucesso" };
  }

  public async delete(id: string) {
    await this.findById(id);
    await this.userRepository.delete(id);
    return { message: "Conta deletada com sucesso" };
  }

  public async findById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException("Usuário não encontrado");
    return user;
  }

  private async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException("Usuário não encontrado");
    return user;
  }

  private async throwIfEmailExists(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user)
      throw new BadRequestException("Esse email já está sendo utilizado");
  }

  private sendValidationEmail(email: string, token: string) {
    this.eventEmitter.emit("email.send", {
      to: email,
      subject: "VALIDAÇÃO DE CONTA NA URNA",
      html: this.utilsService.createValidationButton(token),
    });
  }
}
