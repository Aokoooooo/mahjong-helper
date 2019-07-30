import { TileEnumKeyType } from "../../src/enum/tile";
import { Tile } from "../../src/modal/tile";
import { parse, toCode } from "../../src/service/parse";

describe("service-parse", () => {
  describe("parse", () => {
    test("input can't be null or empty", () => {
      expect(parse).toThrow("输入不可为空");
    });
    test("correct parse wan", () => {
      const handTiles: Tile[] = [];
      for (const i of "12345678") {
        const key = `m${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      const fuluTiles: Tile[] = [];
      for (const i of "888999") {
        const key = `m${i}` as TileEnumKeyType;
        fuluTiles.push(Tile.create(key));
      }
      const result = { handTiles, fuluTiles };
      expect(parse("12345678mf888999m")).toEqual(result);
    });
    test("correct parse suo", () => {
      const handTiles: Tile[] = [];
      for (const i of "12345678") {
        const key = `s${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      const fuluTiles: Tile[] = [];
      for (const i of "888999") {
        const key = `s${i}` as TileEnumKeyType;
        fuluTiles.push(Tile.create(key));
      }
      const result = { handTiles, fuluTiles };
      expect(parse("12345678sf888999s")).toEqual(result);
    });
    test("correct parse tong", () => {
      const handTiles: Tile[] = [];
      for (const i of "12345678") {
        const key = `p${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      const fuluTiles: Tile[] = [];
      for (const i of "888999") {
        const key = `p${i}` as TileEnumKeyType;
        fuluTiles.push(Tile.create(key));
      }
      const result = { handTiles, fuluTiles };
      expect(parse("12345678pf888999p")).toEqual(result);
    });
    test("correct parse zi", () => {
      const handTiles: Tile[] = [];
      for (const i of "12234566") {
        const key = `z${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      const fuluTiles: Tile[] = [];
      for (const i of "1117777") {
        const key = `z${i}` as TileEnumKeyType;
        fuluTiles.push(Tile.create(key));
      }
      const result = { handTiles, fuluTiles };
      expect(parse("12234566zf1117777z")).toEqual(result);
    });
    test("same kind of tile can't exceed 4", () => {
      const incorrectCode = "11111678m123456s";
      expect(() => parse(incorrectCode)).toThrow("同种牌最多可有五张");
    });
    test("the sum of tiles should be 14", () => {
      const incorrectCode = "111122223333444m";
      expect(() => parse(incorrectCode)).toThrow("错误的手牌数量");
      const incorrectCode2 = "1111222233334m";
      expect(() => parse(incorrectCode2)).toThrow("错误的手牌数量");
    });
    test("the sum of fulu should be the multiple of 3(regard every gang as 3 tiles.)", () => {
      const incorrectCode = "11223344pf1111m11s";
      expect(() => parse(incorrectCode)).toThrow("错误的副露数量");
    });
    test("the input chars shouldn't include the invalid chars", () => {
      const incorrectCode = "rtyuio%^&*zswe";
      expect(() => parse(incorrectCode)).toThrow("错误的输入: r");
    });
    test("unexpect tile type", () => {
      const incorrectCode = "1111222233334440m";
      expect(() => parse(incorrectCode)).toThrow(`错误的牌型: m0`);
    });
  });
  describe("toCode", () => {
    test("correct parse wan", () => {
      const handTiles: Tile[] = [];
      for (const i of "12345678") {
        const key = `m${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      const fuluTiles: Tile[] = [];
      for (const i of "888999") {
        const key = `m${i}` as TileEnumKeyType;
        fuluTiles.push(Tile.create(key));
      }
      expect(toCode(handTiles, fuluTiles)).toEqual("12345678mf888999m");
    });
    test("correct parse suo", () => {
      const handTiles: Tile[] = [];
      for (const i of "12345678") {
        const key = `s${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      const fuluTiles: Tile[] = [];
      for (const i of "888999") {
        const key = `s${i}` as TileEnumKeyType;
        fuluTiles.push(Tile.create(key));
      }
      expect(toCode(handTiles, fuluTiles)).toEqual("12345678sf888999s");
    });
    test("correct parse tong", () => {
      const handTiles: Tile[] = [];
      for (const i of "12345678") {
        const key = `p${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      const fuluTiles: Tile[] = [];
      for (const i of "888999") {
        const key = `p${i}` as TileEnumKeyType;
        fuluTiles.push(Tile.create(key));
      }
      expect(toCode(handTiles, fuluTiles)).toEqual("12345678pf888999p");
    });
    test("correct parse zi", () => {
      const handTiles: Tile[] = [];
      for (const i of "12234566") {
        const key = `z${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      const fuluTiles: Tile[] = [];
      for (const i of "1117777") {
        const key = `z${i}` as TileEnumKeyType;
        fuluTiles.push(Tile.create(key));
      }
      expect(toCode(handTiles, fuluTiles)).toEqual("12234566zf1117777z");
    });
  });
});
