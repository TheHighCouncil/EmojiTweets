import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { fromEventSource } from '../utils/rxjs.util';

@Injectable()
export class EmojiTrackerService {
  observables: { [key: string]: Observable<any> } = {};

  constructor(private http: HttpClient) {}

  emojiUpdatesNotify(): Observable<EmojiData> {
    const url =
      'http://localhost:8881/interactive/queries/emojis/updates/notify';
    if (!this.observables[url]) {
      const observable = fromEventSource(url);
      return this.observables[url] = observable;
    } else {
      return this.observables[url];
    }
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
