import { tileEnumKeys, TileEnumKeyType } from "../enum/tile";
import { Mentsu, mentsuType } from "../modal/mentsu";
import { Tile } from "../modal/tile";
import { sortMentsu, sortTiles } from "../utils/hand";
import { isKantsu, isKoutsu, isShuntsu } from "../utils/mentsu";
import {
  isSou,
  isPin,
  isValidTileTypeAcronym,
  isMan,
  tileTypeAcronym
} from "../utils/tile";

/**
 * 将简码转换为手牌数组和面子数组
 * @param code 简码
 */
export const parse = (code: string) => {
  if (!code || code.trim() === "") {
    throw new Error("输入不可为空");
  }
  code = code.trim();
  const seperatorIndex = code.indexOf("f");
  const handString =
    seperatorIndex === -1 ? code : code.substring(0, seperatorIndex);
  const fuluString =
    seperatorIndex === -1 ? "" : code.substring(seperatorIndex + 1);

  let handTiles: Tile[] = parseHelper(handString);
  let fuluTiles: Mentsu[] = parseMentsu(fuluString);

  handTiles = sortTiles(handTiles);
  fuluTiles = sortMentsu(fuluTiles);
  return { handTiles, fuluTiles };
};

/**
 * 将拆分后的副露简码转换为面子数组
 * @param fuluString 副露简码
 */
const parseMentsu = (fuluString: string) => {
  // 按照空格拆分
  const stringList = fuluString.trim().split(" ");
  const mentsuList: Mentsu[] = [];
  stringList
    // 过滤空string
    .filter(i => i)
    .forEach(i => {
      const isAnkan = tileTypeAcronym.some(
        j => i.indexOf(j.toUpperCase()) > -1
      );
      const tiles = parseHelper(i.toLowerCase());
      if (tiles.length !== 3 && tiles.length !== 4) {
        throw new Error(`副露中的每一组牌必须为3或4张:${i}`);
      }
      if (isKantsu(tiles)) {
        mentsuList.push(
          Mentsu.create(isAnkan ? mentsuType.ankan : mentsuType.minkan, tiles)
        );
      } else if (isKoutsu(tiles)) {
        mentsuList.push(Mentsu.create(mentsuType.koutsu, tiles));
      } else if (isShuntsu(tiles)) {
        mentsuList.push(Mentsu.create(mentsuType.shuntsu, tiles));
      } else {
        throw new Error(`副露中的每一组牌必须为顺子,刻子,杠子:${i}`);
      }
    });
  return mentsuList;
};

/**
 * 将简码转换为手牌数组的工具函数
 * @param code 简码
 */
const parseHelper = (code: string) => {
  const tiles: Tile[] = [];
  let temp: string[] = [];
  for (const i of code) {
    if (isValidTileTypeAcronym(i)) {
      for (const j of temp) {
        const key = `${i}${j}` as TileEnumKeyType;
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
 * 将手牌数组和面子数组转换为简码
 * @param handTiles 手牌数组
 * @param fuluTiles 面子数组
 */
export const toCode = (handTiles: Tile[], fuluTiles: Mentsu[] = []) => {
  handTiles = sortTiles(handTiles);
  fuluTiles = sortMentsu(fuluTiles);

  const handString = toCodeHelper(handTiles);
  const fuluString = convertMentsuToString(fuluTiles);
  return fuluString === "" ? handString : `${handString}f${fuluString}`;
};

/**
 * 将面子数组转换为简码的工具函数
 * @param fuluTiles 面子数组
 */
const convertMentsuToString = (fuluTiles: Mentsu[]) => {
  const stringList = fuluTiles.map(i =>
    toCodeHelper(i.tiles, i.type === mentsuType.ankan)
  );
  return stringList.length ? stringList.join(" ") : "";
};

/**
 * 将手牌数组转换为简码的工具函数
 * @param tiles 手牌数组
 */
const toCodeHelper = (tiles: Tile[], isAnkan?: boolean) => {
  const getAcronymSubstring = (tile: Tile) => {
    return tile.isRedDora ? "0" : tile.acronym.substring(1);
  };
  const getAcronymByMentsuType = (acronym: string, isAnkan?: boolean) => {
    return isAnkan ? acronym.toUpperCase() : acronym;
  };
  const man: string[] = [];
  const sou: string[] = [];
  const pin: string[] = [];
  const ji: string[] = [];
  tiles.forEach(i => {
    if (isMan(i)) {
      man.push(getAcronymSubstring(i));
    } else if (isSou(i)) {
      sou.push(getAcronymSubstring(i));
    } else if (isPin(i)) {
      pin.push(getAcronymSubstring(i));
    } else {
      ji.push(getAcronymSubstring(i));
    }
  });
  const manStr = `${man.join("")}${
    man.length ? getAcronymByMentsuType("m", isAnkan) : ""
  }`;
  const pinStr = `${pin.join("")}${
    pin.length ? getAcronymByMentsuType("p", isAnkan) : ""
  }`;
  const souStr = `${sou.join("")}${
    sou.length ? getAcronymByMentsuType("s", isAnkan) : ""
  }`;
  const jiStr = `${ji.join("")}${
    ji.length ? getAcronymByMentsuType("z", isAnkan) : ""
  }`;
  return `${manStr}${pinStr}${souStr}${jiStr}`;
};
