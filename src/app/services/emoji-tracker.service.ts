import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class EmojiTrackerService {
  constructor(private http: HttpClient) {}

  emojiUpdatesNotify() {
    return new Observable(observer => {
      const eventSource = new EventSource(
        'http://localhost:8881/interactive/queries/emojis/updates/notify'
      );
      eventSource.onmessage = event => observer.next(JSON.parse(event.data));
      eventSource.onerror = error => observer.error(error);
    });
  }

  emojiTopN() {
    console.log(this.http);
    return this.http.get(
      'http://localhost:8881/interactive/queries/emojis/stats/topN'
    );
  }
}
