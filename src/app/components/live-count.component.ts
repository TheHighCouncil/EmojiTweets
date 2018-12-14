import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { map, mergeMap, sample, toArray, dematerialize, tap, delay } from 'rxjs/operators';
import { Observable ,  Subscription, of, interval} from 'rxjs';

import { queueUp } from '../utils/rxjs.util';
import { EmojiTrackerService } from '../services/emoji-tracker.service';

@Component({
  selector: 'app-live-count',
  templateUrl: './live-count.component.html',
  styleUrls: ['./live-count.component.scss']
})
export class LiveCountComponent {
  @Input() track = true;
  public emojiUpdateQueue$: Observable<any>;

  constructor(
    private emojiTrackerService: EmojiTrackerService,
  ) {
    this.emojiUpdateQueue$ = emojiTrackerService
      .emojiUpdatesNotify()
      .pipe(queueUp(20), sample(interval(500)));
  }
}
