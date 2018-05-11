import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
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
        const i = this.emojiDataObjects.findIndex(
          (object: EmojiData) => object.emoji === data.emoji
        );
        if (i > -1) {
          if (this.emojiDataObjects[i].count !== data.count) {
            this.emojiDataObjects[i].updated = true;
            this.ref.detectChanges();
            setTimeout(() => {
              this.emojiDataObjects[i] = {...data, updated: false};
              this.emojiDataObjects = this.emojiDataObjects.sort(
                (a: EmojiData, b: EmojiData) => b.count - a.count
              );
              this.ref.detectChanges();
            }, 500);
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.emojiUpdatesNotifySubject) {
      this.emojiUpdatesNotifySubject.unsubscribe();
    }
  }
}
