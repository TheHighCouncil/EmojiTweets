import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { LiveCountComponent } from './components/live-count.component';
import { EmojiBubbleComponent } from './components/emoji-bubble.component';
import { TopNComponent } from './components/top-n.component';
import { EmojiTrackerService } from './services/emoji-tracker.service';
import { TweetStreamComponent } from './components/tweet-stream.component';

@NgModule({
  declarations: [
    AppComponent,
    LiveCountComponent,
    EmojiBubbleComponent,
    TopNComponent,
    TweetStreamComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [EmojiTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
