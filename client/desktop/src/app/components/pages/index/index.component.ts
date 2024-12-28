import { Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { UserContext } from './../../../shared/contexts/user.context';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-index',
  imports: [LoadingComponent],
  providers: [UserService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  currentUser!: User;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private userContext: UserContext,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) return;
    this.userContext.currentUserData.subscribe((user) =>
      this.validateUser(user)
    );
  }

  validateUser(user: User | undefined) {
    if (!user) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/access']);
        return;
      }
      this.isLoading = true;
      this.userService.decodeToken(token).subscribe({
        next: (result) => (this.currentUser = result.user),
        error: () => this.router.navigate(['/access']),
        complete: () => (this.isLoading = false),
      });
      return;
    }
    this.currentUser = user;
  }

  logOut() {
    this.userContext.updateUserData(undefined);
    localStorage.removeItem('token');
    this.router.navigate(['/access']);
  }
}
