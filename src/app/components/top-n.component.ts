import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EmojiTrackerService } from '../services/emoji-tracker.service';

@Component({
  selector: 'app-top-n',
  templateUrl: './top-n.component.html',
  styleUrls: ['./top-n.component.scss']
})
export class TopNComponent {
  emojiUpdatesNotifyObservable: Observable<any>;
  emojiDataObjects: Array<any> = [];

  constructor(private emojiTrackerService: EmojiTrackerService) {
    console.log('init');
    this.emojiUpdatesNotifyObservable = this.emojiTrackerService.emojiTopN();
    console.log(this.emojiUpdatesNotifyObservable);
    this.emojiUpdatesNotifyObservable.subscribe(data => {
      console.log(data);
      this.emojiDataObjects = data;
    });
  }
}
