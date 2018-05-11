import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EmojiTrackerService } from '../services/emoji-tracker.service';

@Component({
  selector: 'app-tweet-stream',
  templateUrl: './tweet-stream.component.html',
  styleUrls: ['./tweet-stream.component.scss']
})
export class TweetStreamComponent implements OnInit, OnDestroy {
  emojiCode: string;
  tweetStreamData: Array<any> = [];
  emojiTweetStreamObservable: Observable<any>;
  emojiTweetStreamSubject: Subscription;
  routeSubject: Subscription;

  constructor(
    private route: ActivatedRoute,
    private emojiTrackerService: EmojiTrackerService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // if (this.routeSubject) {
    //   this.routeSubject.unsubscribe();
    // }
    this.routeSubject = this.route.queryParams.subscribe(params => {
      console.log(params);
      this.emojiCode = params['emoji'];
      this.tweetStreamData = [];
      this.ref.detectChanges(); // TODO check why this is necessary
      this.emojiTweetStreamObservable = this.emojiTrackerService.emojiTweetStream(
        this.emojiCode
      );

      if (this.emojiTweetStreamSubject) {
        this.emojiTweetStreamSubject.unsubscribe();
      }

      this.emojiTweetStreamSubject = this.emojiTweetStreamObservable.subscribe(
        data => {
          this.tweetStreamData.unshift(data);
          if (this.tweetStreamData.length > 20) {
            this.tweetStreamData.pop();
          }
          this.ref.detectChanges(); // TODO check why this is necessary
        }
      );
    });
  }

  ngOnDestroy() {
    if (this.emojiTweetStreamSubject) {
      this.emojiTweetStreamSubject.unsubscribe();
    }
    if (this.routeSubject) {
      this.routeSubject.unsubscribe();
    }
  }
}
