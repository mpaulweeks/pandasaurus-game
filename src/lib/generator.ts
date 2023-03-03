import { BoardState, CardID, CardState, DeckState, GameState, HandState } from "./types";

export function generateGameState(playerIDs: string[]): GameState {
  const allCards: CardState[] = [{
    cid: 'c1a',
    value: 1,
  }, {
    cid: 'c1b',
    value: 1,
  }, {
    cid: 'c100a',
    value: 100,
  }, {
    cid: 'c100b',
    value: 100,
  }];
  for (let i = 2; i <= 99; i++) {
    allCards.push({
      cid: `c${i}`,
      value: i,
    });
  }

  const board: BoardState[] = [{
    bid: 'b1',
    ascending: true,
    cards: ['c1a'],
  }, {
    bid: 'b2',
    ascending: true,
    cards: ['c1b'],
  }, {
    bid: 'b3',
    ascending: false,
    cards: ['c100a'],
  }, {
    bid: 'b4',
    ascending: false,
    cards: ['c100b'],
  }];

  const boardCards = new Set(board.map(b => b.cards).flat());
  const deck: DeckState = allCards
    .filter(c => !boardCards.has(c.cid))
    .map(c => c.cid);
  // todo shuffle deck

  const handsize = [8, 7, 6, 6, 6][playerIDs.length] ?? 6;
  const hands: HandState[] = playerIDs.map(pid => {
    const cards: CardID[] = [];
    for (let i = 0; i < handsize; i++) {
      cards.push(deck.pop()!);
    }
    return {
      pid,
      name: pid, // todo
      cards,
    }
  });

  return {
    cards: allCards.reduce((obj, c) => {
      obj[c.cid] = c;
      return obj;
    }, {} as Record<CardID, CardState>),
    board,
    deck,
    hands,
  };
}
