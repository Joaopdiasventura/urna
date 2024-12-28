import { UserContext } from './../../../../shared/contexts/user.context';
import { UserService } from './../../../../shared/services/user.service';
import { Component, HostListener } from '@angular/core';
import { LoginUserDto } from '../../../../shared/dto/user/login-user.dto';
import { CreateUserDto } from '../../../../shared/dto/user/create-user.dto';
import { FormsModule } from '@angular/forms';
import { AccessInputComponent } from '../../../shared/inputs/access-input/access-input.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../shared/modals/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access',
  imports: [
    FormsModule,
    AccessInputComponent,
    LoadingComponent,
    ModalComponent,
  ],
  providers: [UserService],
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
})
export class AccessComponent {
  isInLogin: boolean = true;
  isLoading: boolean = true;

  loginUserDto: LoginUserDto = {
    email: '',
    password: '',
  };

  createUserDto: CreateUserDto = {
    email: '',
    name: '',
    password: '',
  };

  modalConfig = {
    isVisible: false,
    title: 'teste',
    children: 'teste',
    onClose: () => console.log('opa'),
  };

  constructor(
    private userService: UserService,
    private userContext: UserContext,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
  }

  changeMethod() {
    this.isInLogin = !this.isInLogin;
  }

  login() {
    if (this.loginUserDto.email.length == 0) {
      document.getElementById('login-email-input')?.focus();
      return;
    } else if (this.loginUserDto.password.length == 0) {
      document.getElementById('login-password-input')?.focus();
      return;
    }
    this.isLoading = true;
    this.userService.login(this.loginUserDto).subscribe({
      next: (result) => {
        this.modalConfig = {
          isVisible: true,
          title: 'LOGIN REALIZADO COM SUCESSO',
          children: result.message,
          onClose: () => {
            this.router.navigate(['../']);
          },
        };
        localStorage.setItem('token', result.token);
        this.userContext.updateUserData(result.user);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.modalConfig = {
          isVisible: true,
          title: 'ERRO AO REALIZAR O LOGIN',
          children:
            typeof error.error.message == 'string'
              ? error.error.message
              : error.error.message[0],
          onClose: () => {
            this.modalConfig = { ...this.modalConfig, isVisible: false };
          },
        };
        this.isLoading = false;
      },
    });
  }

  create() {
    if (this.createUserDto.email.length == 0) {
      document.getElementById('create-email-input')?.focus();
      return;
    } else if (this.createUserDto.name.length == 0) {
      document.getElementById('create-name-input')?.focus();
      return;
    } else if (this.createUserDto.password.length == 0) {
      document.getElementById('create-password-input')?.focus();
      return;
    }
    this.isLoading = true;
    this.userService.create(this.createUserDto).subscribe({
      next: (result) => {
        this.modalConfig = {
          isVisible: true,
          title: 'USUÁRIO CRIADO COM SUCESSO',
          children: result.message,
          onClose: () => {
            this.router.navigate(['../']);
          },
        };
        localStorage.setItem('token', result.token);
        this.userContext.updateUserData(result.user);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.modalConfig = {
          isVisible: true,
          title: 'ERRO AO CRIAR O USUÁRIO',
          children:
            typeof error.error.message == 'string'
              ? error.error.message
              : error.error.message[0],
          onClose: () => {
            this.modalConfig = { ...this.modalConfig, isVisible: false };
          },
        };
        this.isLoading = false;
      },
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'F11' || event.key == 'F4') event.preventDefault();
  }
}
