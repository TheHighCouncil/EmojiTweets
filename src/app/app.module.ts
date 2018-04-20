import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';

import { AppComponent } from './app.component';
import { LiveCountComponent } from './components/live-count.component';
import { EmojiTrackerService } from './services/emoji-tracker.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, LiveCountComponent],
  imports: [BrowserModule, NgbModule.forRoot()],
  providers: [EmojiTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
