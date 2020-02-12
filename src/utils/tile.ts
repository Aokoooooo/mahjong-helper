import { tileEnum } from "../enum/tile";
import { Tile } from "../modal/tile";

/**
 * 是否为索
 * @param tile
 */
export const isSou = (tile: Tile) => {
  return tile.id >= tileEnum.s1.id && tile.id <= tileEnum.s9.id;
};

/**
 * 是否为饼
 * @param tile
 */
export const isPin = (tile: Tile) => {
  return tile.id >= tileEnum.p1.id && tile.id <= tileEnum.p9.id;
};

/**
 * 是否为万
 * @param tile
 */
export const isMan = (tile: Tile) => {
  return tile.id >= tileEnum.m1.id && tile.id <= tileEnum.m9.id;
};

/**
 * 是否为风
 * @param tile
 */
export const isKaze = (tile: Tile) => {
  return tile.id >= tileEnum.z1.id && tile.id <= tileEnum.z4.id;
};

/**
 * 是否为三元
 * @param tile
 */
export const isSangen = (tile: Tile) => {
  return tile.id >= tileEnum.z5.id && tile.id <= tileEnum.z7.id;
};

/**
 * 是否为字
 * @param tile
 */
export const isJi = (tile: Tile) => {
  return isKaze(tile) || isSangen(tile);
};

/**
 * 是否为老头牌
 * @param tile
 */
export const isRoutou = (tile: Tile) => {
  return !isJi(tile) && (tile.id % 9 === 0 || tile.id % 9 === 8);
};

/**
 * 是否为幺九牌
 * @param tile
 */
export const isYaochu = (tile: Tile) => {
  return isJi(tile) || isRoutou(tile);
};

/**
 * 是否为同种类型
 * @param tile1
 * @param tile2
 */
export const isSameType = (tile1: Tile, tile2: Tile) => {
  return tile1.acronym.substr(0, 1) === tile2.acronym.substr(0, 1);
};

/**
 * 牌的缩写数组
 */
export const tileTypeAcronym = ["m", "p", "s", "z"];
/**
 * 判断是否为合法的缩写字母
 * @param acronym 缩写字母
 */
export const isValidTileTypeAcronym = (acronym: string) => {
  return tileTypeAcronym.includes(acronym);
};
