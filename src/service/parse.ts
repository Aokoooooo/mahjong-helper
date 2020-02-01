import { tileEnumKeys, TileEnumKeyType } from "../enum/tile";
import { Tile } from "../modal/tile";
import { sortTiles } from "../utils/hand";
import { isSuo, isTong, isValidTileTypeAcronym, isWan } from "../utils/tile";

/**
 * 将简码转换为手牌数组和副露数组
 * @param code 简码
 */
export const parse = (code: string) => {
  if (!code || code.trim() === "") {
    throw new Error("输入不可为空");
  }
  code = code.trim().toLowerCase();
  const seperatorIndex = code.indexOf("f");
  const handString =
    seperatorIndex === -1 ? code : code.substring(0, seperatorIndex);
  const fuluString =
    seperatorIndex === -1 ? "" : code.substring(seperatorIndex + 1);

  let handTiles: Tile[] = parseHelper(handString);
  let fuluTiles: Tile[] = parseHelper(fuluString);

  handTiles = sortTiles(handTiles);
  fuluTiles = sortTiles(fuluTiles);
  return { handTiles, fuluTiles };
};

/**
 * 将简码转换为手牌数组的工具函数
 * @param code 简码
 */
const parseHelper = (code: string) => {
  let type = "?";
  const tiles: Tile[] = [];
  let temp: string[] = [];
  for (const i of code) {
    if (isValidTileTypeAcronym(i)) {
      type = i;
      for (const j of temp) {
        const key = `${type}${j}` as TileEnumKeyType;
        if (!tileEnumKeys.includes(key)) {
          throw new Error(`错误的牌型: ${key}`);
        }
        tiles.push(Tile.create(key));
      }
      temp = [];
    } else if (Number.isInteger(Number(i))) {
      temp.push(i);
    } else {
      throw new Error(`错误的输入: ${i}`);
    }
  }
  return tiles;
};

/**
 * 将手牌数组和副露数组转换为简码
 * @param handTiles 手牌数组
 * @param fuluTiles 副露数组
 */
export const toCode = (handTiles: Tile[], fuluTiles: Tile[] = []) => {
  handTiles = sortTiles(handTiles);
  fuluTiles = sortTiles(fuluTiles);

  const handString = toCodeHelper(handTiles);
  const fuluString = toCodeHelper(fuluTiles);
  return fuluString === "" ? handString : `${handString}f${fuluString}`;
};

/**
 * 将手牌数组和副露数组转换为简码的工具函数
 * @param tiles 手牌数组
 */
const toCodeHelper = (tiles: Tile[]) => {
  const wan: string[] = [];
  const suo: string[] = [];
  const tong: string[] = [];
  const zi: string[] = [];
  tiles.forEach(i => {
    if (isWan(i)) {
      wan.push(i.acronym.substring(1));
    } else if (isSuo(i)) {
      suo.push(i.acronym.substring(1));
    } else if (isTong(i)) {
      tong.push(i.acronym.substring(1));
    } else {
      zi.push(i.acronym.substring(1));
    }
  });
  const wanStr = `${wan.join("")}${wan.length ? "m" : ""}`;
  const tongStr = `${tong.join("")}${tong.length ? "p" : ""}`;
  const suoStr = `${suo.join("")}${suo.length ? "s" : ""}`;
  const ziStr = `${zi.join("")}${zi.length ? "z" : ""}`;
  return `${wanStr}${tongStr}${suoStr}${ziStr}`;
};
