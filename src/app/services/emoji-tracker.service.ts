import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, empty, Subject } from 'rxjs';
import { share, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { fromEventSource } from '../utils/rxjs.util';

const type: 'real' | 'fake' = 'real';

@Injectable()
export class EmojiTrackerService {
  hasConnectionError$: Subject<boolean>;
  emojiUpdatesNotify$: Observable<EmojiData>;
  emojiTopN$: Observable<EmojiData[]>;

  constructor(private http: HttpClient) {
    this.hasConnectionError$ = new Subject();
    this.hasConnectionError$.next(false);
    this.emojiUpdatesNotify$ = fromEventSource<EmojiData>(
      `http://localhost:8881/interactive/queries/emojis/updates/notify/${type}`
    ).pipe(
      catchError(this.handleError),
      share()
    );
    this.emojiTopN$ = this.http
      .get<EmojiData[]>(
        `http://localhost:8881/interactive/queries/emojis/stats/topN/${
          environment.topNSize
        }/${type}`
      )
      .pipe(
        catchError(this.handleError),
        share()
      );
  }

  emojiUpdatesNotify(): Observable<EmojiData> {
    return this.emojiUpdatesNotify$;
  }

  emojiTopN(): Observable<EmojiData[]> {
    return this.emojiTopN$;
  }

  emojiTweetStream(emojiCode: string): Observable<TweetData> {
    return fromEventSource<TweetData>(
      `http://localhost:8881/interactive/queries/emojis/${emojiCode}/tweets/${type}`
    ).pipe(catchError(this.handleError));
  }

  handleError = (error, observable) => {
    this.hasConnectionError$.next(true);
    return empty();
  }

  errorStream() {
    return this.hasConnectionError$;
  }
}
