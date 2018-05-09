import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { fromEventSource } from '../utils/rxjs.util';

@Injectable()
export class EmojiTrackerService {
  constructor(private http: HttpClient) {}

  emojiUpdatesNotify() {
    return fromEventSource(
      'http://localhost:8881/interactive/queries/emojis/updates/notify'
    );
  }

  emojiTopN() {
    return this.http.get(
      'http://localhost:8881/interactive/queries/emojis/stats/topN'
    );
  }

  emojiTweetStream(emojiCode) {
    return fromEventSource(
      `http://localhost:8881/interactive/queries/emojis/${emojiCode}/tweets`
    );
  }
}
