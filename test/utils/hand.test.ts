import { Hand, parse, Mentsu, mentsuType } from "../../src";
import { getTileByCodeAndAcronym } from "../service/parse.test";
import { sortMentsu, convertTilesToNumberArray } from "../../src/utils/hand";

describe("util-hand", () => {
  describe("isTilesValid work well", () => {
    test("same kind of tile can't exceed 4", () => {
      const incorrectCode = "11111678m123456s";
      expect(() => Hand.fromCode(incorrectCode)).toThrow("同种牌最多可有四张");
    });
    test("the sum of tiles should be 14", () => {
      const incorrectCode = "111122223333444m";
      expect(() => Hand.fromCode(incorrectCode)).toThrow("错误的手牌数量");
      const incorrectCode2 = "1111222233334m";
      expect(() => Hand.fromCode(incorrectCode2)).toThrow("错误的手牌数量");
    });
  });

  test("sort tiles work well", () => {
    const r = getTileByCodeAndAcronym("m", "21453699897", "z", "7777", [3]);
    expect(r.handTiles).toEqual(parse("21453699897m").handTiles);
  });

  test("sort mentsu work well", () => {
    const m1 = Mentsu.create(mentsuType.shuntsu, parse("123s").handTiles);
    const m2 = Mentsu.create(mentsuType.koutsu, parse("444p").handTiles);
    const m3 = Mentsu.create(mentsuType.kakan, parse("7777z").handTiles);
    const m4 = Mentsu.create(mentsuType.koutsu, parse("999m").handTiles);

    const mList = [m1, m2, m3, m4];
    expect(sortMentsu(mList)).toEqual([m4, m2, m1, m3]);
  });
  test("convertTilesToNumberArray work well", () => {
    const helper = (indexes: number[]) => {
      const test = new Array<number>(34).fill(0);
      indexes.forEach(i => test[i]++);
      return test;
    };

    const list1 = convertTilesToNumberArray(parse("123456789m55z").handTiles);
    const test1 = helper([0, 1, 2, 3, 4, 5, 6, 7, 8, 31, 31]);
    expect(list1).toEqual(test1);

    const list2 = convertTilesToNumberArray(
      Hand.fromCode("456789p123s11zf123m")
    );
    const test2 = helper([12, 13, 14, 15, 16, 17, 18, 19, 20, 27, 27]);
    expect(list2).toEqual(test2);

    const list3 = convertTilesToNumberArray(
      Hand.fromCode("456789p123s11zf123m"),
      true
    );
    const test3 = helper([12, 13, 14, 15, 16, 17, 18, 19, 20, 27, 27, 0, 1, 2]);
    expect(list3).toEqual(test3);
  });
});
