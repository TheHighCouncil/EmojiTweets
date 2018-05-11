import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const callArrayCallbacks = (data, cbArray: Array<(data: any) => void>) => {
  if (cbArray) {
    for (const cb of cbArray) {
      cb(data);
    }
  }
};

export const fromEventSource = url => {
  const eventSource = new EventSource(url);
  const onMessageCbArray = [];
  const onErrorCbArray = [];

  eventSource.onmessage = (event) => callArrayCallbacks(event, onMessageCbArray);
  eventSource.onerror = (error) => callArrayCallbacks(event, onErrorCbArray);

  return new Observable(observer => {
    onMessageCbArray.push(event => observer.next(JSON.parse(event.data)));
    onErrorCbArray.push(error => observer.error(error));
    return {
      unsubscribe: () => {
        eventSource.close();
      }
    };
  });
};
