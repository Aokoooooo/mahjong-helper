import { Mentsu, mentsuTypeValue, mentsuType } from "../modal/mentsu";
import { Tile } from "../modal/tile";
import { sortTiles } from "./hand";
import { isJi, isSameType } from "./tile";

export const isMentsuValid = (tiles: Tile[], type: mentsuTypeValue) => {
  if (type === mentsuType.shuntsu) {
    if (tiles.length !== 3) {
      throw new Error("顺子必须由三张牌组成");
    }
    if (tiles.some(i => isJi(i))) {
      throw new Error("顺子中不能有字牌");
    }
    if (tiles.some(i => !isSameType(tiles[0], i))) {
      throw new Error("顺子必须由同种牌组成");
    }
    if (tiles[0].id + 1 !== tiles[1].id || tiles[1].id + 1 !== tiles[2].id) {
      throw new Error("顺子必须由三张连续的牌组成");
    }
  } else if (type === mentsuType.koutsu) {
    if (tiles.length !== 3) {
      throw new Error("刻子必须由三张牌组成");
    }
    if (tiles.some(i => i.id !== tiles[0].id)) {
      throw new Error("刻子必须由三张相同的牌组成");
    }
  } else if (
    type === mentsuType.minkan ||
    type === mentsuType.ankan ||
    type === mentsuType.kakan
  ) {
    if (tiles.length !== 4) {
      throw new Error("杠子必须由四张牌组成");
    }
    if (tiles.some(i => i.id !== tiles[0].id)) {
      throw new Error("杠子必须由四张相同的牌组成");
    }
  } else {
    throw new Error(`错误的面子类型:${type}`);
  }
};

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
