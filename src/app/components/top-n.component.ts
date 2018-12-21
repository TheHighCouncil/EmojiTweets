import { Component, OnInit } from '@angular/core';
import { Observable , Subscription, interval } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { EmojiTrackerService } from '../services/emoji-tracker.service';
import { map, delay, merge, concatMapTo, tap, distinctUntilChanged, sample } from 'rxjs/operators';

@Component({
  selector: 'app-top-n',
  templateUrl: './top-n.component.html',
  styleUrls: ['./top-n.component.scss']
})
export class TopNComponent implements OnInit {
  emojiUpdate$: Observable<any>;
  emojiTopN$: Observable<any>;
  currentTopN$: Observable<any>;

  constructor(
    private emojiTrackerService: EmojiTrackerService,
  ) {}

  ngOnInit() {
    const n = 25;
    this.emojiTopN$ = this.emojiTrackerService.emojiTopN();
    this.emojiUpdate$ = this.emojiTrackerService.emojiUpdatesNotify();
    const topN$ = this.emojiTopN$.pipe(
      concatMapTo(this.emojiUpdate$, (emojiMap, updateEmojiData) => {
        const emojiIndex = emojiMap.findIndex(val => val.emoji === updateEmojiData.emoji);
        if (emojiIndex > -1) {
          emojiMap[emojiIndex] = {
            ...updateEmojiData,
            update: emojiMap[emojiIndex].count === updateEmojiData.count
          };
        } else {
          emojiMap.push({
            ...updateEmojiData,
            update: false
          });
        }
        return emojiMap.slice(0, n);
      }),
      map((emojiMap: any[]) => emojiMap.sort(
        (a: EmojiData, b: EmojiData) => (
            (b.count + 1 / b.emoji.charCodeAt(1)) -
            (a.count + 1 / a.emoji.charCodeAt(1))
          ))),

    );
    this.currentTopN$ = topN$.pipe(
      merge(topN$.pipe(
        delay(500),
        map((emojiMap: any[]) => emojiMap.map(emojiData => ({...emojiData, update: false})))
      )),
      tap(val => { console.log(val); }),
      distinctUntilChanged(),
      sample(interval(1000)),
    );

  }
}
