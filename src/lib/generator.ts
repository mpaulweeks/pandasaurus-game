import { StackState, CardData, GameState, HandState } from "./types";

export function generateGameState(playerIDs: string[]): GameState {
  const board: StackState[] = [{
    sid: 'stack-1',
    ascending: true,
    cards: [{cid: 'c1a', value: 1, }],
  }, {
    sid: 'stack-2',
    ascending: true,
    cards: [{cid: 'c1b', value: 1, }],
  }, {
    sid: 'stack-3',
    ascending: false,
    cards: [{cid: 'c100a', value: 100, }],
  }, {
    sid: 'stack-4',
    ascending: false,
    cards: [{cid: 'c100b', value: 100, }],
  }];

  const deck: CardData[] = [];
  for (let i = 2; i <= 99; i++) {
    deck.push({
      cid: `card-${i}`,
      value: i,
    });
  }
  // todo shuffle deck

  const handsize = [8, 7, 6, 6, 6][playerIDs.length] ?? 6;
  const hands: HandState[] = playerIDs.map(pid => {
    const cards: CardData[] = [];
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
    board,
    deck,
    hands,
  };
}
