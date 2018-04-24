import { Routes } from '@angular/router';

import { TweetStreamComponent } from './components/tweet-stream.component';

export const appRoutes: Routes = [
  { path: ':emojicode', component: TweetStreamComponent }
];
