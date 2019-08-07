import { isFeng, isSanyuan, isZi, Tile, TileEnumKeyType } from "../../src";

describe("utils-tile", () => {
  test("is Feng", () => {
    const tiles: Tile[] = [];
    for (const i of "1234") {
      const key = `z${i}` as TileEnumKeyType;
      tiles.push(Tile.create(key));
    }
    const result = tiles.reduce((x, y) => x && isFeng(y), true);
    expect(result).toEqual(true);
  });
  test("is Sanyuan", () => {
    const tiles: Tile[] = [];
    for (const i of "567") {
      const key = `z${i}` as TileEnumKeyType;
      tiles.push(Tile.create(key));
    }
    const result = tiles.reduce((x, y) => x && isSanyuan(y), true);
    expect(result).toEqual(true);
  });
  test("is Xi", () => {
    const tiles: Tile[] = [];
    for (const i of "1234567") {
      const key = `z${i}` as TileEnumKeyType;
      tiles.push(Tile.create(key));
    }
    const result = tiles.reduce((x, y) => x && isZi(y), true);
    expect(result).toEqual(true);
  });
});
