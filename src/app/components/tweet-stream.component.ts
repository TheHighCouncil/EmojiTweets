import { Component, OnInit } from '@angular/core';
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
export class TweetStreamComponent implements OnInit {
  emojiCode: string;
  tweetStreamData: Array<any> = [];
  emojiTweetStreamObservable: Observable<any>;
  emojiTweetStreamSubject: Subscription;

  constructor(
    private route: ActivatedRoute,
    private emojiTrackerService: EmojiTrackerService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const blub = this.route.params.subscribe(params => {
      this.emojiCode = params['emojicode'];
      this.tweetStreamData = [];
      console.log('NAVIGATE!!!', params);
      this.emojiTweetStreamObservable = this.emojiTrackerService.emojiTweetStream(
        this.emojiCode
      );

      if (this.emojiTweetStreamSubject) {
        this.emojiTweetStreamSubject.unsubscribe();
      }

      this.emojiTweetStreamSubject = this.emojiTweetStreamObservable.subscribe(
        data => {
          console.log(data);
          this.tweetStreamData.unshift(data);
          if (this.tweetStreamData.length > 20) {
            this.tweetStreamData.pop();
          }
          this.ref.detectChanges(); // TODO check why this is necessary
        }
      );
    });
  }
}
