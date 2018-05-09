/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

declare type EmojiData = {
  emoji: string;
  count: number;
};

declare var EventSource: any;
