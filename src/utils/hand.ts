import { Tile } from "../modal/tile";

export const isTilesValid = (handTiles: Tile[], fuluTiles: Tile[]) => {
  // 同种牌数量上限
  const checkMap = new Map<number, number>();
  for (const i of handTiles) {
    checkMap.set(i.id, (checkMap.get(i.id) || 0) + 1);
  }
  for (const i of fuluTiles) {
    checkMap.set(i.id, (checkMap.get(i.id) || 0) + 1);
  }
  for (const i of checkMap) {
    if (i[1] > 4) {
      throw new Error("同种牌最多可有五张");
    }
  }

  // 手牌总数
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
