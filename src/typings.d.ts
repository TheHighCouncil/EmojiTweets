/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

declare type EmojiData = {
  emoji: string,
  count: number,
  updated?: boolean
};

declare var EventSource: {
  new(url: string, eventSourceInitDict?: EventSourceInit): EventSource,
  prototype: EventSource
};
