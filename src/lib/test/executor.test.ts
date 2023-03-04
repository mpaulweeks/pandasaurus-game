import { CardData, GameState } from "../types";
import { executePlay, executePlays } from "../executor";

function makeCards(...nums: number[]): CardData[] {
  return nums.map(n => ({
    cid: 'test-' + n,
    value: n,
  }));
}

function testState(args: {
  board: number[];
  hand: number[];
  ascending?: boolean;
}): GameState {
  return {
    deck: [],
    board: [{
      sid: 'b1',
      ascending: args.ascending ?? true,
      cards: makeCards(...args.board),
    }],
    hands: [{
      pid: 'p1',
      name: 'name1',
      cards: makeCards(...args.hand),
    }],
  };
}

describe('executePlay', () => {
  test('ascending', () => {
    const sut = testState({
      board: [92],
      hand: [93, 94, 95],
      ascending: true,
    });
    const result = executePlays(sut, {
      sid: sut.board[0].sid,
      cards: sut.hands[0].cards.map(c => c.cid),
    });
    expect(result.hands[0].cards.length).toBe(0);
    expect(result.board[0].cards.pop()!.value).toBe(95);
  });

  test('descending', () => {
    const sut = testState({
      board: [92],
      hand: [91, 90, 89],
      ascending: false,
    });
    const result = executePlays(sut, {
      sid: sut.board[0].sid,
      cards: sut.hands[0].cards.map(c => c.cid),
    });
    expect(result.hands[0].cards.length).toBe(0);
    expect(result.board[0].cards.pop()!.value).toBe(89);
  });

  test('ascending with 10 skip', () => {
    const sut = testState({
      board: [92],
      hand: [82],
      ascending: true,
    });
    const result = executePlays(sut, {
      sid: sut.board[0].sid,
      cards: sut.hands[0].cards.map(c => c.cid),
    });
    expect(result.hands[0].cards.length).toBe(0);
    expect(result.board[0].cards.pop()!.value).toBe(82);
  });

  test('descending with 10 skip', () => {
    const sut = testState({
      board: [42],
      hand: [52],
      ascending: false,
    });
    const result = executePlays(sut, {
      sid: sut.board[0].sid,
      cards: sut.hands[0].cards.map(c => c.cid),
    });
    expect(result.hands[0].cards.length).toBe(0);
    expect(result.board[0].cards.pop()!.value).toBe(52);
  });
});
