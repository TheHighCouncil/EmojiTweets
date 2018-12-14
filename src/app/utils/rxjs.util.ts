import { Observable } from 'rxjs';

const callArrayCallbacks = (data, cbArray: Array<(data: any) => void>) => {
  if (cbArray) {
    for (const cb of cbArray) {
      cb(data);
    }
  }
};

export const fromEventSource = (url): Observable<any> => {
  const eventSource = new EventSource(url);
  const onMessageCbArray = [];
  const onErrorCbArray = [];

  eventSource.onmessage = event => callArrayCallbacks(event, onMessageCbArray);
  eventSource.onerror = error => callArrayCallbacks(event, onErrorCbArray);

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

// export const fromEventSource = url => {
//   return new Observable(observer => {
//     const eventSource = new EventSource(url);
//     eventSource.onmessage = event => {
//       observer.next(JSON.parse(event.data));
//     };
//     eventSource.onerror = error => {
//       observer.error(error);
//     };
//     return {
//       unsubscribe: () => {
//         eventSource.close();
//       }
//     };
//   });
// };

export const queueUp = maxLength => source => {
  const queue = [];
  return new Observable(observer =>
    source.subscribe(
      value => {
        try {
          queue.unshift(value);
          if (queue.length > maxLength) {
            queue.pop();
          }
          observer.next(queue);
        } catch (err) {
          observer.error(err);
        }
      },
      err => observer.error(err),
      () => observer.complete()
    )
  );
};
