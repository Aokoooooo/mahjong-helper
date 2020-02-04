import orderBy from "lodash/orderBy";
import { Mentsu } from "../modal/mentsu";
import { Tile } from "../modal/tile";

/**
 * 判断整个手牌是否合法
 * @param handTiles 手牌数组
 * @param fuluTiles 副露数组
 */
export const isTilesValid = (handTiles: Tile[], fuluTiles: Mentsu[]) => {
  handTiles = sortTiles(handTiles);
  fuluTiles = sortMentsu(fuluTiles);

  const convertedFuluTiles = fuluTiles.reduce(
    (x, y) => x.concat(y.tiles),
    [] as Tile[]
  );

  // 检测同种牌数量上限
  const checkMap = new Map<number, number>();
  for (const i of convertedFuluTiles.concat(handTiles)) {
    const oldNum = checkMap.get(i.id) || 0;
    if (oldNum >= 4) {
      throw new Error("同种牌最多可有四张");
    }
    checkMap.set(i.id, oldNum + 1);
  }

  // 检测手牌总数
  let gangNum = 0;
  let count = 0;
  for (let i = 0; i < convertedFuluTiles.length - 1; i++) {
    if (convertedFuluTiles[i].id === convertedFuluTiles[i + 1].id) {
      count++;
      if (count === 3) {
        gangNum++;
        count = 0;
      }
    } else {
      count = 0;
    }
  }
  if ((convertedFuluTiles.length - gangNum) % 3 !== 0) {
    throw new Error("错误的副露数量");
  }
  if (convertedFuluTiles.length - gangNum + handTiles.length !== 14) {
    throw new Error("错误的手牌数量");
  }
};

/**
 * 按照id从小到大(万筒索东南西北白发中)将牌排序,返回排序后的新数组
 * @param tiles 手牌数组
 */
export const sortTiles = (tiles: Tile[]): Tile[] => {
  return orderBy(tiles, ["id", t => (t.isRedDora ? 0 : 1)]);
};

/**
 * 将副露中的面子数组排序
 * @param mentsus 副露的面子数组
 */
export const sortMentsu = (mentsus: Mentsu[]) => {
  return orderBy(mentsus, m => m.sortMentsu);
};
