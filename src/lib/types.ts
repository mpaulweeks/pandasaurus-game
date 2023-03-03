export type CardID = string;

export type CardState = {
  cid: CardID;
  value: number;
};

export type DeckState = CardID[];
export type HandState = {
  pid: string;
  name: string;
  cards: CardID[];
};
export type BoardState = {
  bid: string;
  ascending: boolean;
  cards: CardID[];
};

export type GameState = {
  cards: Record<CardID, CardState>;
  deck: DeckState;
  hands: HandState[];
  board: BoardState[];
}
