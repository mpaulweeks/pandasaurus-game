import { CardData, GameState, StackState } from "./types"

function sortCards(arr: CardData[], ascending: boolean) {
  function compare(a: CardData, b: CardData) {
    if (a.value < b.value || a.value === b.value + 10) {
      return -1;
    }
    return 1;
  }
  const out = arr.concat();
  out.sort(compare);
  return ascending ? out : out.reverse();
}

function canPlay(stack: StackState, card: CardData) {
  const stackTop = stack.cards.slice(-1)[0];
  const sorted = sortCards([stackTop, card], stack.ascending);
  return sorted[0].cid === stackTop.cid;
}

export function executePlay(state: GameState, play: {
  sid: string;
  cid: string;
}): GameState {
  const out: GameState = JSON.parse(JSON.stringify(state));

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

  const sorted = sortCards(cards, stack.ascending);
  let out = state;
  for (const card of sorted) {
    out = executePlay(out, { sid: stack.sid, cid: card.cid, });
  }
  return out;
}
