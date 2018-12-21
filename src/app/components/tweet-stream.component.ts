import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { map, mergeMap, tap, debounce, debounceTime } from 'rxjs/operators';

import { queueUp } from '../utils/rxjs.util';
import { EmojiTrackerService } from '../services/emoji-tracker.service';

@Component({
  selector: 'app-tweet-stream',
  templateUrl: './tweet-stream.component.html',
  styleUrls: ['./tweet-stream.component.scss']
})
export class TweetStreamComponent {
  emojiCode$: Observable<string>;
  emojiTweetStream$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private emojiTrackerService: EmojiTrackerService,
  ) {
    // TODO unsubscribe on routing and empty array
    this.emojiCode$ = this.route.queryParams.pipe(map(params => params['emoji']));
    this.emojiTweetStream$ = this.emojiCode$.pipe(mergeMap(emojiCode => this.emojiTrackerService.emojiTweetStream(
      emojiCode
    )), queueUp(20, this.emojiCode$));
  }
}
