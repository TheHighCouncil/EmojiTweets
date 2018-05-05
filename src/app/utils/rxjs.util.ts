import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export const fromEventSource = url => {
  return new Observable(observer => {
    const eventSource = new EventSource(url);
    eventSource.onmessage = event => observer.next(JSON.parse(event.data));
    eventSource.onerror = error => observer.error(error);
    return {
      unsubscribe: () => {
        eventSource.close();
      }
    };
  });
};
