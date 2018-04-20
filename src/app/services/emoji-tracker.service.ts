import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class EmojiTrackerService {
  emojiUpdatesNotify() {
    return new Observable(observer => {
      const eventSource = new EventSource(
        'http://localhost:8881/interactive/queries/emojis/updates/notify'
      );
      eventSource.onmessage = event => observer.next(JSON.parse(event.data));
      eventSource.onerror = error => observer.error(error);
    });
  }
}
