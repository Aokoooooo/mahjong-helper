import {
  isKaze,
  isSameType,
  isSangen,
  isJi,
  Tile,
  TileEnumKeyType
} from "../../src";

describe("utils-tile", () => {
  test("is kaze", () => {
    const tiles: Tile[] = [];
    for (const i of "1234") {
      const key = `z${i}` as TileEnumKeyType;
      tiles.push(Tile.create(key));
    }
    const result = tiles.reduce((x, y) => x && isKaze(y), true);
    expect(result).toEqual(true);
  });
  test("is sangen", () => {
    const tiles: Tile[] = [];
    for (const i of "567") {
      const key = `z${i}` as TileEnumKeyType;
      tiles.push(Tile.create(key));
    }
    const result = tiles.reduce((x, y) => x && isSangen(y), true);
    expect(result).toEqual(true);
  });
  test("is Xi", () => {
    const tiles: Tile[] = [];
    for (const i of "1234567") {
      const key = `z${i}` as TileEnumKeyType;
      tiles.push(Tile.create(key));
    }
    const result = tiles.reduce((x, y) => x && isJi(y), true);
    expect(result).toEqual(true);
  });
  test("is same type", () => {
    const m = Tile.create("m1");
    const p = Tile.create("p1");
    const s = Tile.create("s1");
    const z = Tile.create("z1");

    const m2 = Tile.create("m2");
    const p2 = Tile.create("p2");
    const s2 = Tile.create("s2");
    const z2 = Tile.create("z2");

    expect(isSameType(m, m2)).toEqual(true);
    expect(isSameType(p, p2)).toEqual(true);
    expect(isSameType(s, s2)).toEqual(true);
    expect(isSameType(z, z2)).toEqual(true);

    expect(isSameType(m, p2)).toEqual(false);
    expect(isSameType(p, s2)).toEqual(false);
    expect(isSameType(s, z2)).toEqual(false);
    expect(isSameType(z, m2)).toEqual(false);
  });
});
