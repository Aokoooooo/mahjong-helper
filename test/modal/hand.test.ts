import { Hand, Tile, TileEnumKeyType } from "../../src";

describe("modal-hand", () => {
  test("code should not be blank", () => {
    expect(Hand.fromCode).toThrow("输入不可为空");
    expect(() => Hand.fromCode("")).toThrow("输入不可为空");
  });
  test("formCode work well", () => {
    const code = "12345678999mf7777z";
    const hand = Hand.fromCode(code);
    const handTiles: Tile[] = [];
    for (const i of "12345678999") {
      const key = `m${i}` as TileEnumKeyType;
      handTiles.push(Tile.create(key));
    }
    const fuluTiles: Tile[] = [];
    for (const i of "7777") {
      const key = `z${i}` as TileEnumKeyType;
      fuluTiles.push(Tile.create(key));
    }
    expect(hand.fulu).toEqual(fuluTiles);
    expect(hand.hand).toEqual(handTiles);
  });
  test("toCode work well", () => {
    const code = "12345678999mf7777z";
    const hand = Hand.fromCode(code);
    expect(hand.toCode()).toEqual(code);
  });
  test("sort tiles work well", () => {
    const code = "12345678999mf7777z";
    const sortedHand = Hand.fromCode(code);

    const handTiles: Tile[] = [];
    for (const i of "21453699897") {
      const key = `m${i}` as TileEnumKeyType;
      handTiles.push(Tile.create(key));
    }
    const fuluTiles: Tile[] = [];
    for (const i of "7777") {
      const key = `z${i}` as TileEnumKeyType;
      fuluTiles.push(Tile.create(key));
    }
    const hand = new Hand(handTiles, fuluTiles);
    hand.sortTiles();
    expect(hand).toEqual(sortedHand);
  });
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
  test("the sum of fulu should be the multiple of 3(regard every gang as 3 tiles.)", () => {
    const incorrectCode = "11223344pf1111m11s";
    expect(() => Hand.fromCode(incorrectCode)).toThrow("错误的副露数量");
  });
});
