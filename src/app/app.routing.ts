import { Routes } from '@angular/router';

import { WrapperComponent } from './components/wrapper.component';

export const appRoutes: Routes = [
  { path: ':emojicode', component: WrapperComponent },
  { path: '', component: WrapperComponent }
];
