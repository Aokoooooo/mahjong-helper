import orderBy from "lodash/orderBy";
import { tileEnum, tileEnumKeys } from "../enum/tile";
import { Mentsu } from "../modal/mentsu";
import { Suggest } from "../modal/suggest";
import { Tile } from "../modal/tile";
import { isSuo, isWan, isZi } from "../utils/tile";
import { encode } from "./encode";
import { calculateShanten } from "./shanten";
import { checkYaku } from "../yaku";
import { Player } from "../modal/player";
import { getAgariDataInfo, AgariDataInfo } from "./agari";

/**
 * 根据当前玩家对象,给出切牌建议,返回null说明已经荣和
 * @param player 玩家对象
 */
export const suggest = (
  player: Player
): Suggest[] | ReturnType<typeof checkYaku> => {
  if (!player || player.hand.handTiles.length <= 0) {
    throw new Error("输入不可为空");
  }

  const code = encode(player.hand.handTiles);
  const shanten = calculateShanten(code);

  if (shanten < 0) {
    return getYakuInfoHelper(player);
  }

  const suggests: Suggest[] = [];
  for (let i = 0; i < player.hand.handTiles.length; i++) {
    suggestHelper(player, i, shanten, suggests);
  }

  return sortSuggest(suggests);
};

const getYakuInfoHelper = (player: Player) => {
  const agariDataInfo = getAgariDataInfo(player.hand) as AgariDataInfo[];
  return agariDataInfo.reduce((x, y) => {
    const yakuInfo = checkYaku(player, y);
    return yakuInfo.point.child > (x?.point?.child ?? 0) ? yakuInfo : x;
    // tslint:disable-next-line: no-object-literal-type-assertion
  }, {} as ReturnType<typeof checkYaku>);
};

/**
 * 计算出牌建议的工具函数
 * @param player 玩家对象
 * @param index 切牌对象的数组索引
 * @param shanten 当前向听数
 * @param suggests 建议数组
 */
const suggestHelper = (
  player: Player,
  index: number,
  shanten: number,
  suggests: Suggest[]
): void => {
  const hand = player.hand.handTiles;
  const fulu = player.hand.fuluTiles;
  const tile = hand[index];
  // 跳过重复切牌
  if (suggests.some(i => i.discard.id === tile.id)) {
    return;
  }
  let tempXiangTing = shanten;
  const suggest = new Suggest(tile, 0, new Map(), shanten, shanten);

  tileEnumKeys
    // 跳过重复的红dora牌
    .filter(i => !tileEnum[i].isRedDora)
    .forEach(key => {
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
      tempXiangTing = calculateShanten(code);
      // 有效进张
      if (tempXiangTing < shanten) {
        countPotentialTiles(suggest, hand, cursor, fulu);
        if (tempXiangTing < 0) {
          suggest.yakuInfo = getYakuInfoHelper(player);
        }
      }
      hand[index] = tile;
    });

  // 出这张牌能使向听数-1
  if (suggest.count > 0) {
    suggest.newXiangTing = shanten - 1;
    suggests.push(suggest);
  }
};

/**
 * 计算潜在进张数
 * @param suggest 出牌建议对象
 * @param hand 手牌数组
 * @param cursor 目标牌型
 * @param fulu 副露数组
 */
const countPotentialTiles = (
  suggest: Suggest,
  hand: Tile[],
  cursor: Tile,
  fulu: Mentsu[]
): void => {
  let count = 0;
  hand.forEach(i => {
    if (i.id === cursor.id) {
      count++;
    }
  });
  fulu.forEach(i => {
    i.tiles.forEach(j => {
      if (j.id === cursor.id) {
        count++;
      }
    });
  });

  // 因为当前手牌中已经放入一张目标牌型,所以总数要加一
  count = 5 - count;
  suggest.details.set(cursor, count);
  suggest.count = suggest.count + count;
};

/**
 * 判断是否为合法进张,即当前总数 < 4
 * @param hand 手牌数组
 * @param fulu 副露数组
 * @param testTile 目标进张牌型
 */
const isValidCandidate = (
  hand: Tile[],
  fulu: Mentsu[],
  testTile: Tile
): boolean => {
  let count = 0;
  hand.forEach(i => {
    if (i.id === testTile.id) {
      count++;
    }
  });
  fulu.forEach(i => {
    i.tiles.forEach(j => {
      if (j.id === testTile.id) {
        count++;
      }
    });
  });
  return count < 4;
};

/**
 * 将出牌数组牌型,返回排序后的新数组.
 * 排序方法为从进张多到少,切牌从字到万筒索,从外到内.
 * @param suggests 出牌建议数组
 */
export const sortSuggest = (suggests: Suggest[]) =>
  orderBy(suggests, ["count", s => sortDiscardFn(s.discard)], ["desc", "desc"]);

/**
 * 针对切牌对象的出牌建议排序判断函数
 * @param discard 切牌对象
 */
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
