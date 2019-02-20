import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import {
  map,
  share,
  switchMap,
  distinctUntilChanged,
  filter,
  tap,
  shareReplay
} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { queueUp } from '../utils/rxjs.util';
import { EmojiTrackerService } from '../services/emoji-tracker.service';

@Component({
  selector: 'app-tweet-stream',
  templateUrl: './tweet-stream.component.html',
  styleUrls: ['./tweet-stream.component.scss'],
  animations: [
    trigger('incoming', [
      transition(':enter', [
        style({ transform: 'translateX(300%)', maxHeight: '0' }),
        animate(
          200,
          style({ transform: 'translateX(150%)', maxHeight: '30rem' })
        ),
        animate(400)
      ])
    ])
  ]
})
export class TweetStreamComponent {
  @Input() track = true;
  queueSize = environment.queueSize;
  emojiCode$: Observable<string>;
  emojiTweetStream$: Observable<TweetData[]>;

  constructor(
    private route: ActivatedRoute,
    private emojiTrackerService: EmojiTrackerService
  ) {
    this.emojiCode$ = this.route.queryParams.pipe(
      map(params => params['emoji']),
      distinctUntilChanged(),
      shareReplay()
    );
    this.emojiTweetStream$ = this.emojiCode$.pipe(
      switchMap(emojiCode => {
        return this.emojiTrackerService.emojiTweetStream(emojiCode);
      }),
      filter(() => this.track),
      queueUp(this.queueSize, this.emojiCode$),
      share()
    );
  }
}
