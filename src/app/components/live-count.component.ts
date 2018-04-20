import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EmojiTrackerService } from '../services/emoji-tracker.service';

@Component({
  selector: 'app-live-count',
  templateUrl: './live-count.component.html',
  styleUrls: ['./live-count.component.scss']
})
export class LiveCountComponent implements OnInit {
  emojiCounts: Array<any> = [];
  count = 2;
  emojiUpdatesNotifyObservable: Observable<any>;

  constructor(
    private emojiTrackerService: EmojiTrackerService,
    private ref: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.emojiUpdatesNotifyObservable = this.emojiTrackerService.emojiUpdatesNotify();
    this.emojiUpdatesNotifyObservable.subscribe(data => {
      this.emojiCounts.push(data);
      if (this.emojiCounts.length > 20) {
        this.emojiCounts.shift();
      }
      this.ref.detectChanges(); // TODO check why this is necessary
    });
  }
}
