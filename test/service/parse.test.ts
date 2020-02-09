import {
  Mentsu,
  parse,
  sortTiles,
  Tile,
  TileEnumKeyType,
  toCode,
  mentsuType,
  Hand
} from "../../src";
import { sortMentsu } from "../../src/utils/hand";

export const getTileByCodeAndAcronym = (
  acronym: string,
  handCode: string,
  fuluAcronym: string,
  fuluCode: string = "",
  fuluType: number[] = []
) => {
  let handTiles: Tile[] = [];
  for (const i of handCode) {
    const key = `${acronym}${i}` as TileEnumKeyType;
    handTiles.push(Tile.create(key));
  }
  let fuluTiles: Mentsu[] = [];
  const fulus = fuluCode.split(" ");
  for (const i in fulus) {
    if (!fulus[i]) {
      continue;
    }
    const tempList: Tile[] = [];
    for (const j of fulus[i]) {
      const key = `${fuluAcronym}${j}` as TileEnumKeyType;
      tempList.push(Tile.create(key));
    }
    fuluTiles.push(Mentsu.create(fuluType[i], tempList));
  }
  handTiles = sortTiles(handTiles);
  fuluTiles = sortMentsu(fuluTiles);
  return { handTiles, fuluTiles };
};

describe("service-parse", () => {
  describe("parse", () => {
    test("input can't be null or empty", () => {
      expect(parse).toThrow("输入不可为空");
    });
    test("correct parse wan", () => {
      const result = getTileByCodeAndAcronym("m", "123456780", "m", "123 999", [
        0,
        1
      ]);
      expect(parse("123405678mf123m 999m")).toEqual(result);
    });
    test("correct parse suo", () => {
      const result = getTileByCodeAndAcronym("s", "123456780", "s", "888 999", [
        1,
        1
      ]);
      expect(parse("123405678sf888s 999s")).toEqual(result);
    });
    test("correct parse tong", () => {
      const result = getTileByCodeAndAcronym("p", "123456780", "p", "888 999", [
        1,
        1
      ]);
      expect(parse("123405678pf888p 999p")).toEqual(result);
    });
    test("correct parse zi", () => {
      const result = getTileByCodeAndAcronym("z", "12234566", "z", "111 7777", [
        1,
        3
      ]);
      expect(parse("12234566zf111z 7777z")).toEqual(result);
    });
    test("the input chars shouldn't include the invalid chars", () => {
      const incorrectCode = "rtyuio%^&*zswe";
      const incorrectCode2 = "12234566zff1117777z";
      expect(() => parse(incorrectCode)).toThrow("错误的输入: r");
      expect(() => parse(incorrectCode2)).toThrow("错误的输入: f");
    });
    test("unexpect tile type", () => {
      const incorrectCode = "111122223333444m0z";
      expect(() => parse(incorrectCode)).toThrow(`错误的牌型: z0`);
    });
    test("num of mentsu's tile should be correct", () => {
      expect(() => parse("f11s")).toThrow(`副露中的每一组牌必须为3或4张:11s`);
      expect(() => parse("f11110p")).toThrow(
        `副露中的每一组牌必须为3或4张:11110p`
      );
      expect(() => parse("f112p")).toThrow(
        `副露中的每一组牌必须为顺子,刻子,杠子:112p`
      );
      expect(() => parse("f1122p")).toThrow(
        `副露中的每一组牌必须为顺子,刻子,杠子:1122p`
      );
      expect(() => parse("f1234p")).toThrow(
        `副露中的每一组牌必须为顺子,刻子,杠子:1234p`
      );
      expect(() => parse("f110p")).toThrow(
        `副露中的每一组牌必须为顺子,刻子,杠子:110p`
      );
    });
    it("parse ankan work well", () => {
      expect(parse("f 1111M").fuluTiles[0].type).toEqual(mentsuType.ankan);
      expect(parse("f 1111P").fuluTiles[0].type).toEqual(mentsuType.ankan);
      expect(parse("f 1111S").fuluTiles[0].type).toEqual(mentsuType.ankan);
      expect(parse("f 1111Z").fuluTiles[0].type).toEqual(mentsuType.ankan);
    });
  });
  describe("toCode", () => {
    test("correct parse wan", () => {
      const { handTiles, fuluTiles } = getTileByCodeAndAcronym(
        "m",
        "123456780",
        "m",
        "888 999",
        [1, 1]
      );
      expect(toCode(handTiles, fuluTiles)).toEqual("123405678mf888m 999m");
    });
    test("correct parse suo", () => {
      const { handTiles, fuluTiles } = getTileByCodeAndAcronym(
        "s",
        "123456708",
        "s",
        "888 9999",
        [1, 3]
      );
      expect(toCode(handTiles, fuluTiles)).toEqual("123405678sf888s 9999s");
    });
    test("correct parse tong", () => {
      const { handTiles, fuluTiles } = getTileByCodeAndAcronym(
        "p",
        "120345678",
        "p",
        "123 999",
        [1, 1]
      );
      expect(toCode(handTiles, fuluTiles)).toEqual("123405678pf123p 999p");
    });
    test("correct parse zi", () => {
      const { handTiles, fuluTiles } = getTileByCodeAndAcronym(
        "z",
        "12234566",
        "z",
        "111 7777",
        [1, 3]
      );
      expect(toCode(handTiles, fuluTiles)).toEqual("12234566zf111z 7777z");
    });
    test("only hand", () => {
      const { handTiles } = getTileByCodeAndAcronym("z", "12234566", "m");
      expect(toCode(handTiles)).toEqual("12234566z");
    });
    it("correct parse ankan", () => {
      const code = "11mf2222M 2222P 2222S 2222Z";
      const hand = Hand.fromCode(code);
      expect(toCode(hand.handTiles, hand.fuluTiles)).toEqual(code);
    });
  });
});
