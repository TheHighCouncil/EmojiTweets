/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

declare type EmojiData = {
  emoji: string;
  count: number;
};

declare type TweetData = {
  t1: string; // emoji
  t2: string; // tweet content
};

declare var EventSource: {
  new (url: string, eventSourceInitDict?: EventSourceInit): EventSource;
  prototype: EventSource;
};
