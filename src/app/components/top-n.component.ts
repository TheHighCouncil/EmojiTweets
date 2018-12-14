import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { EmojiTrackerService } from '../services/emoji-tracker.service';

@Component({
  selector: 'app-top-n',
  templateUrl: './top-n.component.html',
  styleUrls: ['./top-n.component.scss']
})
export class TopNComponent implements OnInit, OnDestroy {
  emojiUpdatesNotifyObservable: Observable<any>;
  emojiUpdatesNotifySubject: Subscription;
  emojiCode: string;
  emojiDataObjects: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private emojiTrackerService: EmojiTrackerService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.emojiCode = params['emoji'];
    });
    this.emojiUpdatesNotifyObservable = this.emojiTrackerService.emojiTopN();
    this.emojiUpdatesNotifyObservable.subscribe(data => {
      this.emojiDataObjects = data;
    });
    this.emojiUpdatesNotifySubject = this.emojiTrackerService
      .emojiUpdatesNotify()
      .subscribe((data: EmojiData) => {
        // console.log(`\n---------------------------------------`);
        // console.log(
        //   `[Top-N] Update by emoji (${data.emoji}) Object-Count: ${
        //     this.emojiDataObjects.length
        //   }`
        // );
        const i = this.emojiDataObjects.findIndex(
          (object: EmojiData) => object.emoji === data.emoji
        );
        // console.log(`[Top-N] Object-Index: ${i}`);
        if (i > -1) {
          if (this.emojiDataObjects[i].count !== data.count) {
            // console.log(
            //   `[Top-N] Will Update, Old count: ${
            //     this.emojiDataObjects[i].count
            //   } / New count: ${data.count}`
            // );
            this.emojiDataObjects[i] = { ...data, updated: true };
            // console.log(
            //   `[Top-N] Updated index (${i}), count: ${
            //     this.emojiDataObjects[i].count
            //   }, emoji: ${this.emojiDataObjects[i].emoji}`
            // );
            this.ref.detectChanges();
            this.emojiDataObjects = this.emojiDataObjects.sort(
              (a: EmojiData, b: EmojiData) => {
                return (
                  (b.count + 1 / b.emoji.charCodeAt(1)) -
                  (a.count + 1 / a.emoji.charCodeAt(1))
                );
              }
            );
            // console.log(
            //   `[Top-N] Object-Count after sorting: ${
            //     this.emojiDataObjects.length
            //   }`
            // );
            // console.log(
            //   `[Top-N] Begin animation of ${this.emojiDataObjects[i].emoji}`
            // );
            setTimeout(() => {
              // console.log(
              //   `[Top-N] End animation of ${this.emojiDataObjects[i].emoji}`
              // );
              this.emojiDataObjects[i].updated = false;
              this.ref.detectChanges();
              // console.log(
              //   `[Top-N] Object-Count after animation: ${
              //     this.emojiDataObjects.length
              //   }`
              // );
              // console.log(`---------------------------------------\n`);
            }, 500);
          }
        } else {
          // console.log(`---------------------------------------\n`);
        }
      });
  }

  ngOnDestroy() {
    if (this.emojiUpdatesNotifySubject) {
      this.emojiUpdatesNotifySubject.unsubscribe();
    }
  }
}
