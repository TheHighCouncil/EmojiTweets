import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { LiveCountComponent } from './components/live-count.component';
import { EmojiBubbleComponent } from './components/emoji-bubble.component';
import { TopNComponent } from './components/top-n.component';
import { EmojiTrackerService } from './services/emoji-tracker.service';
import { TweetStreamComponent } from './components/tweet-stream.component';
import { WrapperComponent } from './components/wrapper.component';
import { SortEmojiPipe } from './pipes/sort-emoji.pipe';
import { SliceCollectionPipe } from './pipes/slice-collection.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LiveCountComponent,
    EmojiBubbleComponent,
    TopNComponent,
    TweetStreamComponent,
    WrapperComponent,
    SortEmojiPipe,
    SliceCollectionPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [EmojiTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
