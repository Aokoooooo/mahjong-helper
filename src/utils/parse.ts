import { sortBy } from "lodash";
import { tileEnumKeys, TileEnumKeyType } from "../enum/tile";
import { Tile } from "../modal/tile";
import { isSuo, isTong, isValidTileTypeAcronym, isWan, isZi } from "./tile";

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

  let handTiles: Tile[] = convertCodeStringToTileList(handString);
  let fuluTiles: Tile[] = convertCodeStringToTileList(fuluString);

  handTiles = sortBy(handTiles, ["id"]);
  fuluTiles = sortBy(fuluTiles, ["id"]);

  isTilesValid(handTiles, fuluTiles);
  return { handTiles, fuluTiles };
};

const convertCodeStringToTileList = (code: string) => {
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

export const toCode = (handTiles: Tile[], fuluTiles: Tile[]) => {
  handTiles = sortBy(handTiles, ["id"]);
  fuluTiles = sortBy(fuluTiles, ["id"]);

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
    let result = "";
    result += wan.reduce((x, y) => x + y, "");
    result += wan.length > 0 ? "m" : "";
    result += suo.reduce((x, y) => x + y, "");
    result += suo.length > 0 ? "s" : "";
    result += tong.reduce((x, y) => x + y, "");
    result += tong.length > 0 ? "p" : "";
    result += zi.reduce((x, y) => x + y, "");
    result += zi.length > 0 ? "z" : "";
    return result;
  };

  const handString = toCodeHelper(handTiles);
  const fuluString = toCodeHelper(fuluTiles);
  return `${handString}f${fuluString}`;
};
