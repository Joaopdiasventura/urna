import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { LoginUserDto } from '../dto/user/login-user.dto';

@Injectable()
export class UserService {
  readonly api = environment.apiUrl + '/user';

  private http = inject(HttpClient);

  create(createUserDto: CreateUserDto) {
    return this.http.post<{
      message: string;
      user: User;
      token: string;
    }>(this.api, createUserDto);
  }

  login(loginUserDto: LoginUserDto) {
    return this.http.post<{
      message: string;
      user: User;
      token: string;
    }>(this.api + '/login', loginUserDto);
  }

  decodeToken(token: string) {
    return this.http.get<{ user: User }>(this.api + '/decodeToken/' + token);
  }
}
