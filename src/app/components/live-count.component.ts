import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EmojiTrackerService } from '../services/emoji-tracker.service';

@Component({
  selector: 'app-live-count',
  templateUrl: './live-count.component.html',
  styleUrls: ['./live-count.component.scss']
})
export class LiveCountComponent implements OnInit, OnDestroy {
  @Input() track = true;
  emojiCounts: Array<any> = [];
  emojiUpdatesNotifyObservable: Observable<any>;
  emojiUpdatesNotifySubject: Subscription;

  constructor(
    private emojiTrackerService: EmojiTrackerService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.emojiUpdatesNotifySubject = this.emojiTrackerService
      .emojiUpdatesNotify()
      .subscribe(data => {
        if (this.track) {
          this.emojiCounts.unshift(data);
          if (this.emojiCounts.length > 20) {
            this.emojiCounts.pop();
          }
          this.ref.detectChanges(); // TODO check why this is necessary
        }
      });
  }

  ngOnDestroy() {
    if (this.emojiUpdatesNotifySubject) {
      this.emojiUpdatesNotifySubject.unsubscribe();
    }
  }
}
