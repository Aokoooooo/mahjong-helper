import orderBy from "lodash/orderBy";
import { tileEnum, tileEnumKeys } from "../enum/tile";
import { Hand } from "../modal/hand";
import { Suggest } from "../modal/suggest";
import { Tile } from "../modal/tile";
import { isSuo, isWan, isZi } from "../utils/tile";
import { analyse } from "./analyse";
import { encode } from "./encode";

export const suggest = (hands: Hand): Suggest[] | null => {
  if (!hands || hands.hand.length <= 0) {
    throw new Error("输入不可为空");
  }
  const { hand, fulu } = hands;
  const code = encode(hand);
  const xiangTing = analyse(code);
  if (xiangTing < 0) {
    return null;
  }
  const suggests: Suggest[] = [];
  for (let i = 0; i < hand.length; i++) {
    suggestHelper(hand, i, xiangTing, suggests, fulu);
  }
  return sortSuggest(suggests);
};

export const sortSuggest = (suggests: Suggest[]) =>
  orderBy(suggests, ["count", s => sortDiscardFn(s.discard)], ["desc", "desc"]);

export const sortDiscardFn = (discard: Tile) => {
  if (isZi(discard)) {
    return 5;
  } else if (isSuo(discard)) {
    return Math.abs(discard.id - tileEnum.s5.id);
  } else if (isWan(discard)) {
    return Math.abs(discard.id - tileEnum.m5.id);
  } else {
    return Math.abs(discard.id - tileEnum.p5.id);
  }
};

const suggestHelper = (
  hand: Tile[],
  index: number,
  xiangTing: number,
  suggests: Suggest[],
  fulu: Tile[]
): void => {
  const tile = hand[index];
  // 跳过重复切牌
  if (suggests.some(i => i.discard.id === tile.id)) {
    return;
  }
  let tempXiangTing = xiangTing;
  const suggest = new Suggest(tile, 0, new Map(), xiangTing, xiangTing);

  tileEnumKeys.forEach(key => {
    const cursor = Tile.create(key);
    // 跳过重复进张
    if (cursor.id === tile.id) {
      return;
    }
    // 防止进张后单类牌数量大于4
    if (!isValidCandidate(hand, fulu, cursor)) {
      return;
    }
    hand[index] = Tile.create(key);
    const code = encode(hand);
    tempXiangTing = analyse(code);
    // 有效进张
    if (tempXiangTing < xiangTing) {
      countPotentialTiles(suggest, hand, cursor, fulu);
    }
    hand[index] = tile;
  });

  // 出这张牌能使向听数-1
  if (suggest.count > 0) {
    suggest.newXiangTing = xiangTing - 1;
    suggests.push(suggest);
  }
};

const countPotentialTiles = (
  suggest: Suggest,
  hand: Tile[],
  cursor: Tile,
  fulu: Tile[]
): void => {
  let count = 0;
  hand.forEach(i => {
    if (i.id === cursor.id) {
      count++;
    }
  });
  fulu.forEach(i => {
    if (i.id === cursor.id) {
      count++;
    }
  });

  count = 5 - count;
  suggest.details.set(cursor, count);
  suggest.count = suggest.count + count;
};

const isValidCandidate = (
  hand: Tile[],
  fulu: Tile[],
  testTile: Tile
): boolean => {
  let count = 0;
  hand.forEach(i => {
    if (i.id === testTile.id) {
      count++;
    }
  });
  fulu.forEach(i => {
    if (i.id === testTile.id) {
      count++;
    }
  });
  return count < 4;
};
