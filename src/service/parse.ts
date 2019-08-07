import { tileEnumKeys, TileEnumKeyType } from "../enum/tile";
import { Tile } from "../modal/tile";
import { isSuo, isTong, isValidTileTypeAcronym, isWan } from "../utils/tile";
import { sortTiles } from "../utils/hand";

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

  handTiles = sortTiles(handTiles);
  fuluTiles = sortTiles(fuluTiles);
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

export const toCode = (handTiles: Tile[], fuluTiles: Tile[] = []) => {
  handTiles = sortTiles(handTiles);
  fuluTiles = sortTiles(fuluTiles);

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
  return fuluString === "" ? handString : `${handString}f${fuluString}`;
};
