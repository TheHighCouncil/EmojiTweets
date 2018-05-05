import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { observableEventSource } from 'observable-event-source';

import { environment } from '../../environments/environment';
import { fromEventSource } from '../utils/rxjs.util';

@Injectable()
export class EmojiTrackerService {
  constructor(private http: HttpClient) {}

  emojiUpdatesNotify() {
    const out = fromEventSource(
      'http://localhost:8881/interactive/queries/emojis/updates/notify'
    );
    return out;
    // return new Observable(observer => {
    //   const eventSource = new EventSource(
    //     'http://localhost:8881/interactive/queries/emojis/updates/notify'
    //   );
    //   eventSource.onmessage = event => {
    //     if (observer.closed) {
    //       console.log('closing', eventSource);
    //       eventSource.close();
    //     }
    //     observer.next(JSON.parse(event.data));
    //   };
    //   eventSource.onerror = error => {
    //     if (observer.closed) {
    //       console.log('closing', eventSource);
    //       eventSource.close();
    //     }
    //     observer.error(error);
    //   };
    // });
    // console.log(observableEventSource);
    // return observableEventSource({
    //   url: 'http://localhost:8881/interactive/queries/emojis/updates/notify',
    //   json: true
    // });
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
