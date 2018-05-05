import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { EmojiTrackerService } from '../services/emoji-tracker.service';

@Component({
  selector: 'app-top-n',
  templateUrl: './top-n.component.html',
  styleUrls: ['./top-n.component.scss']
})
export class TopNComponent {
  emojiCode: string;
  emojiUpdatesNotifyObservable: Observable<any>;
  emojiDataObjects: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private emojiTrackerService: EmojiTrackerService
  ) {
    this.route.params.subscribe(params => {
      this.emojiCode = params['emojicode'];
    });
    this.emojiUpdatesNotifyObservable = this.emojiTrackerService.emojiTopN();
    this.emojiUpdatesNotifyObservable.subscribe(data => {
      this.emojiDataObjects = data;
    });
  }
}
