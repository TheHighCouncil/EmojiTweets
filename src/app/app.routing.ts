import { Routes } from '@angular/router';

import { WrapperComponent } from './components/wrapper.component';

export const appRoutes: Routes = [
  { path: 'dashboard', component: WrapperComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];
