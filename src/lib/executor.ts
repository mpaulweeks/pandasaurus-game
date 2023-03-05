import { getMaxHandSize } from "./helper";
import { CardData, GameState, StackState } from "./types"
import { sortCardData } from "./util";

function canPlay(stack: StackState, card: CardData) {
  const stackTop = stack.cards.slice(-1)[0];
  const sorted = sortCardData([stackTop, card], {
    ascending: stack.ascending,
    check10: true,
  });
  return sorted[0].cid === stackTop.cid;
}

function deepCopy<T>(x: T): T {
  return JSON.parse(JSON.stringify(x));
}

export function executePlay(state: GameState, play: {
  sid: string;
  cid: string;
}): GameState {
  const out: GameState = deepCopy(state);

  // execute
  let card: CardData | undefined;
  out.hands.forEach(hand => {
    hand.cards.forEach(c => {
      if (c.cid === play.cid) {
        card = c;
      }
    });
    hand.cards = hand.cards.filter(c => c.cid !== play.cid)
  });

  // if no card found?
  if (card === undefined) {
    throw new Error('playing a card not in any hands: ' + play.cid);
  }

  out.board.forEach(stack => {
    if (card && stack.sid === play.sid) {
      if (canPlay(stack, card)) {
        stack.cards.push(card);
      } else {
        throw new Error('playing a card higher than the stack: ' + play.cid);
      }
    }
  });

  return out;
}

export function executePlays(state: GameState, play: {
  sid: string;
  cards: string[];
}): GameState {
  const stack = state.board.filter(stack => stack.sid === play.sid)[0];
  const cards = state.hands.map(hand => hand.cards.filter(c => play.cards.includes(c.cid))).flat();

  if (!stack) {
    throw new Error('stack not found: ' + play.sid);
  }
  if (cards.length !== play.cards.length) {
    throw new Error('invalid batch plays');
  }

  const sorted = sortCardData(cards, {
    ascending: stack.ascending,
    check10: true,
  });
  let out = state;
  for (const card of sorted) {
    out = executePlay(out, { sid: stack.sid, cid: card.cid, });
  }
  return out;
}

export function executeEndTurn(state: GameState, pid: string): GameState {
  const out: GameState = deepCopy(state);
  const hand = out.hands.filter(h => h.pid === pid)[0];
  if (!hand) {
    throw new Error('hand not found: ' + pid);
  }

  const handSize = getMaxHandSize(out.hands.length);
  while (hand.cards.length < handSize && out.deck.length > 0) {
    hand.cards.push(out.deck.pop()!);
  }

  return out;
}
