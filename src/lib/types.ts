export type CardID = string;
export type CardData = {
  readonly cid: CardID;
  readonly value: number;
};

export type DeckState = CardData[];
export type HandState = {
  pid: string;
  name: string;
  cards: CardData[];
};
export type StackState = {
  sid: string;
  ascending: boolean;
  cards: CardData[];
};
export type BoardState = StackState[];
export type GameState = {
  deck: DeckState;
  hands: HandState[];
  board: BoardState;
}

export enum CardLocation {
  Board = 1,
  Hand,
  Deck,
}
export type CardState = {
  readonly data: CardData;
  readonly visible: boolean;
  readonly location: CardLocation;
  readonly position: number;
  readonly stack: number;
}
export type CardMap = Map<CardID, CardState>;
