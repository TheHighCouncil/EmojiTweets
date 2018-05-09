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
    this.route.params.subscribe(params => {
      this.emojiCode = params['emojicode'];
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
          this.emojiDataObjects[i] = data;
          this.emojiDataObjects = this.emojiDataObjects.sort(
            (a: EmojiData, b: EmojiData) => b.count - a.count
          );
          this.ref.detectChanges();
        }
      });
  }

  ngOnDestroy() {
    if (this.emojiUpdatesNotifySubject) {
      this.emojiUpdatesNotifySubject.unsubscribe();
    }
  }
}
