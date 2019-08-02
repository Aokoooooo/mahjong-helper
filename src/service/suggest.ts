import { orderBy } from "lodash";
import { tileEnum, tileEnumKeys } from "../enum/tile";
import { Hand } from "../modal/hand";
import { Suggest } from "../modal/suggest";
import { Tile } from "../modal/tile";
import { isSuo, isTong, isWan, isZi } from "../utils/tile";
import { analyse } from "./analyse";
import { encode } from "./encode";

export const suggest = (hands: Hand) => {
  if (hands === null || hands.hand.length <= 0) {
    throw new Error("入参不可为空");
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
  return orderBy(
    suggests,
    [
      "count",
      s => {
        const x = s.discard;
        if (isZi(x)) {
          return 5;
        } else if (isSuo(x)) {
          return Math.abs(x.id - tileEnum.s5.id);
        } else if (isWan(x)) {
          return Math.abs(x.id - tileEnum.m5.id);
        } else if (isTong(x)) {
          return Math.abs(x.id - tileEnum.p5.id);
        }
      }
    ],
    ["desc", "desc"]
  );
};

const suggestHelper = (
  hand: Tile[],
  index: number,
  xiangTing: number,
  suggests: Suggest[],
  fulu: Tile[]
) => {
  const tile = hand[index];
  // 不重复计算相同的牌
  if (suggests.some(i => i.discard.id === tile.id)) {
    return;
  }
  let tempXiangTing = xiangTing;
  const suggest = new Suggest(tile, 0, new Map(), xiangTing, xiangTing);

  tileEnumKeys.forEach(key => {
    const cursor = tileEnum[key];
    // 跳过重复进张
    if (cursor.id === tile.id) {
      return;
    }
    const testTile = Tile.create(key);
    // 防止进张后单类牌数量大于4
    if (!isValidCandidate(hand, testTile)) {
      return;
    }
    hand[index] = Tile.create(key);
    const code = encode(hand);
    tempXiangTing = analyse(code);
    // 有效进张
    if (tempXiangTing < xiangTing) {
      expectTileCounter(suggest, hand, testTile, fulu);
    }
    hand[index] = tile;
  });

  // 出这张牌能使向听数-1
  if (suggest.count > 0) {
    suggest.newXiangTing = xiangTing - 1;
    suggests.push(suggest);
  }
};

const expectTileCounter = (
  suggest: Suggest,
  hand: Tile[],
  testTile: Tile,
  fulu: Tile[]
) => {
  let count = 0;
  // 不重复计算
  if (suggest.details.has(testTile)) {
    return;
  }
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

  count = 5 - count;
  if (count < 1) {
    return;
  }
  suggest.details.set(testTile, count);
  suggest.count = suggest.count + count;
};

const isValidCandidate = (hand: Tile[], testTile: Tile) => {
  let count = 0;
  hand.forEach(i => {
    if (i.id === testTile.id) {
      count++;
    }
  });
  return count !== 4;
};
