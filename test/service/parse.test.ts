import { parse, sortTiles, Tile, TileEnumKeyType, toCode } from "../../src";

const getTileByCodeAndAcronym = (
  acronym: string,
  handCode: string,
  fuluCode: string
) => {
  let handTiles: Tile[] = [];
  for (const i of handCode) {
    const key = `${acronym}${i}` as TileEnumKeyType;
    handTiles.push(Tile.create(key));
  }
  let fuluTiles: Tile[] = [];
  for (const i of fuluCode) {
    const key = `${acronym}${i}` as TileEnumKeyType;
    fuluTiles.push(Tile.create(key));
  }
  handTiles = sortTiles(handTiles);
  fuluTiles = sortTiles(fuluTiles);
  return { handTiles, fuluTiles };
};

describe("service-parse", () => {
  describe("parse", () => {
    test("input can't be null or empty", () => {
      expect(parse).toThrow("输入不可为空");
    });
    test("correct parse wan", () => {
      const result = getTileByCodeAndAcronym("m", "123456780", "8889990");
      expect(parse("123405678mf0888999m")).toEqual(result);
    });
    test("correct parse suo", () => {
      const result = getTileByCodeAndAcronym("s", "123456780", "8889990");
      expect(parse("123405678sf0888999s")).toEqual(result);
    });
    test("correct parse tong", () => {
      const result = getTileByCodeAndAcronym("p", "123456780", "8889990");
      expect(parse("123405678pf0888999p")).toEqual(result);
    });
    test("correct parse zi", () => {
      const result = getTileByCodeAndAcronym("z", "12234566", "1117777");
      expect(parse("12234566zf1117777z")).toEqual(result);
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
  });
  describe("toCode", () => {
    test("correct parse wan", () => {
      const handTiles: Tile[] = [];
      for (const i of "123456780") {
        const key = `m${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      const fuluTiles: Tile[] = [];
      for (const i of "8889990") {
        const key = `m${i}` as TileEnumKeyType;
        fuluTiles.push(Tile.create(key));
      }
      expect(toCode(handTiles, fuluTiles)).toEqual("123405678mf0888999m");
    });
    test("correct parse suo", () => {
      const handTiles: Tile[] = [];
      for (const i of "123456708") {
        const key = `s${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      const fuluTiles: Tile[] = [];
      for (const i of "8889099") {
        const key = `s${i}` as TileEnumKeyType;
        fuluTiles.push(Tile.create(key));
      }
      expect(toCode(handTiles, fuluTiles)).toEqual("123405678sf0888999s");
    });
    test("correct parse tong", () => {
      const handTiles: Tile[] = [];
      for (const i of "120345678") {
        const key = `p${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      const fuluTiles: Tile[] = [];
      for (const i of "8808999") {
        const key = `p${i}` as TileEnumKeyType;
        fuluTiles.push(Tile.create(key));
      }
      expect(toCode(handTiles, fuluTiles)).toEqual("123405678pf0888999p");
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
    test("only hand", () => {
      const handTiles: Tile[] = [];
      for (const i of "12234566") {
        const key = `z${i}` as TileEnumKeyType;
        handTiles.push(Tile.create(key));
      }
      expect(toCode(handTiles)).toEqual("12234566z");
    });
  });
});
