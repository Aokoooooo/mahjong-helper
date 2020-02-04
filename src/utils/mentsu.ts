import { Mentsu } from "../modal/mentsu";
import { Tile } from "../modal/tile";
import { sortTiles } from "./hand";

/**
 * 判断是否为杠子
 * @param mentsu 面子对象或者手牌数组
 */
export const isKantsu = (mentsu: Mentsu | Tile[]) => {
  const tiles: Tile[] = Array.isArray(mentsu) ? mentsu : mentsu.tiles;
  if (tiles.length !== 4) {
    return false;
  }
  const tag = tiles[0];
  return tiles.reduce((x, y) => x && y.id === tag.id, true);
};

/**
 * 判断是否为刻子
 * @param mentsu 面子对象或者手牌数组
 */
export const isKoutsu = (mentsu: Mentsu | Tile[]) => {
  const tiles: Tile[] = Array.isArray(mentsu) ? mentsu : mentsu.tiles;
  if (tiles.length !== 3) {
    return false;
  }
  const tag = tiles[0];
  return tiles.reduce((x, y) => x && y.id === tag.id, true);
};

/**
 * 判断是否为顺子
 * @param mentsu 面子对象或者手牌数组
 */
export const isShuntsu = (mentsu: Mentsu | Tile[]) => {
  const tiles: Tile[] = sortTiles(
    Array.isArray(mentsu) ? mentsu : mentsu.tiles
  );
  if (tiles.length !== 3) {
    return false;
  }
  return tiles[0].id + 1 === tiles[1].id && tiles[1].id + 1 === tiles[2].id;
};
