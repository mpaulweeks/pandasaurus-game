import { CardData, CardState } from "./types";

// todo this sort has problems with more than 2 elements
/*
  these are both valid sorts:
    16 < 24 < 26
    24 < 26 < 16
  rip transitive property
*/
function compareCardData(a: CardData, b: CardData, check10?: boolean) {
  if (check10) {
    if (a.value === b.value + 10) { return -1; }
    if (a.value + 10 === b.value) { return 1; }
  }
  return a.value < b.value ? -1 : 1;
}

export function sortCardData(arr: CardData[], opt: {
  ascending: boolean;
  check10?: boolean;
}): CardData[] {
  const out = arr.concat();
  out.sort((a,b) => compareCardData(a, b, opt.check10));
  return opt.ascending ? out : out.reverse();
}

export function sortCardState(arr: CardState[], opt: {
  ascending: boolean;
  check10?: boolean;
}): CardState[] {
  const out = arr.concat();
  out.sort((a, b) => compareCardData(a.data, b.data, opt.check10));
  return opt.ascending ? out : out.reverse();
}

export function shuffle<T>(arr: T[]): T[] {
  const out = arr.concat();
  out.sort(() => Math.random() < 0.5 ? -1 : 1);
  return out;
}
