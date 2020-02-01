import orderBy from "lodash/orderBy";
import { Tile } from "../modal/tile";

/**
 * 判断整个手牌是否合法
 * @param handTiles 手牌数组
 * @param fuluTiles 副露数组
 */
export const isTilesValid = (handTiles: Tile[], fuluTiles: Tile[]) => {
  handTiles = sortTiles(handTiles);
  fuluTiles = sortTiles(fuluTiles);

  // 检测同种牌数量上限
  const checkMap = new Map<number, number>();
  for (const i of handTiles.concat(fuluTiles)) {
    const oldNum = checkMap.get(i.id) || 0;
    if (oldNum >= 4) {
      throw new Error("同种牌最多可有四张");
    }
    checkMap.set(i.id, oldNum + 1);
  }

  // 检测手牌总数
  let gangNum = 0;
  let count = 0;
  for (let i = 0; i < fuluTiles.length - 1; i++) {
    if (fuluTiles[i].id === fuluTiles[i + 1].id) {
      count++;
      if (count === 3) {
        gangNum++;
        count = 0;
      }
    } else {
      count = 0;
    }
  }
  if ((fuluTiles.length - gangNum) % 3 !== 0) {
    throw new Error("错误的副露数量");
  }
  if (fuluTiles.length - gangNum + handTiles.length !== 14) {
    throw new Error("错误的手牌数量");
  }
};

/**
 * 按照id从小到大(万筒索东南西北白发中)将牌排序,返回排序后的新数组
 * @param tiles 牌的数组
 */
export const sortTiles = (tiles: Tile[]): Tile[] => {
  return orderBy(tiles, ["id"]);
};
