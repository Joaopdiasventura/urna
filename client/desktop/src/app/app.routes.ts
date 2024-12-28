import { Routes } from '@angular/router';
import { IndexComponent } from './components/pages/index/index.component';
import { AccessComponent } from './components/pages/user/access/access.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'access', component: AccessComponent },
];
