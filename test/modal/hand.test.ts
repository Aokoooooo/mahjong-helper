import { TileEnumKeyType } from "../../src/enum/tile";
import { Hand } from "../../src/modal/hand";
import { Tile } from "../../src/modal/tile";

describe("modal-hand", () => {
  test("code should not be blank", () => {
    expect(Hand.fromCode).toThrow("code should not be blank");
    expect(() => Hand.fromCode("")).toThrow("code should not be blank");
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
  test("constructor work well", () => {
    const tiles: Tile[] = [];
    const fulus: Tile[] = [Tile.create("z6")];
    const hand = new Hand(tiles, fulus);
    expect(hand.hand).toEqual([]);
    expect(hand.fulu).toEqual([Tile.create("z6")]);
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
});
