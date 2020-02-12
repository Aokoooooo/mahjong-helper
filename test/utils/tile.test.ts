import {
  isKaze,
  isSameType,
  isSangen,
  isJi,
  Tile,
  isYaochu,
  isRoutou,
  isMan,
  isPin,
  isSou
} from "../../src";

describe("utils-tile", () => {
  const m = Tile.create("m0");
  const p = Tile.create("p0");
  const s = Tile.create("s0");
  const z = Tile.create("z5");
  const kaze = Tile.create("z1");
  const sangen = Tile.create("z5");
  const yaochu = Tile.create("m1");
  const routou = Tile.create("p9");

  test("is man", () => {
    expect(isMan(m)).toBeTruthy();
    expect(isMan(p)).toBeFalsy();
    expect(isMan(s)).toBeFalsy();
    expect(isMan(z)).toBeFalsy();
    expect(isMan(kaze)).toBeFalsy();
    expect(isMan(sangen)).toBeFalsy();
    expect(isMan(yaochu)).toBeTruthy();
    expect(isMan(routou)).toBeFalsy();
  });
  test("is pin", () => {
    expect(isPin(m)).toBeFalsy();
    expect(isPin(p)).toBeTruthy();
    expect(isPin(s)).toBeFalsy();
    expect(isPin(z)).toBeFalsy();
    expect(isPin(kaze)).toBeFalsy();
    expect(isPin(sangen)).toBeFalsy();
    expect(isPin(yaochu)).toBeFalsy();
    expect(isPin(routou)).toBeTruthy();
  });
  test("is sou", () => {
    expect(isSou(m)).toBeFalsy();
    expect(isSou(p)).toBeFalsy();
    expect(isSou(s)).toBeTruthy();
    expect(isSou(z)).toBeFalsy();
    expect(isSou(kaze)).toBeFalsy();
    expect(isSou(sangen)).toBeFalsy();
    expect(isSou(yaochu)).toBeFalsy();
    expect(isSou(routou)).toBeFalsy();
  });
  test("is kaze", () => {
    expect(isKaze(m)).toBeFalsy();
    expect(isKaze(p)).toBeFalsy();
    expect(isKaze(s)).toBeFalsy();
    expect(isKaze(z)).toBeFalsy();
    expect(isKaze(kaze)).toBeTruthy();
    expect(isKaze(sangen)).toBeFalsy();
    expect(isKaze(yaochu)).toBeFalsy();
    expect(isKaze(routou)).toBeFalsy();
  });
  test("is sangen", () => {
    expect(isSangen(m)).toBeFalsy();
    expect(isSangen(p)).toBeFalsy();
    expect(isSangen(s)).toBeFalsy();
    expect(isSangen(z)).toBeTruthy();
    expect(isSangen(kaze)).toBeFalsy();
    expect(isSangen(sangen)).toBeTruthy();
    expect(isSangen(yaochu)).toBeFalsy();
    expect(isSangen(routou)).toBeFalsy();
  });
  test("is ji", () => {
    expect(isJi(m)).toBeFalsy();
    expect(isJi(p)).toBeFalsy();
    expect(isJi(s)).toBeFalsy();
    expect(isJi(z)).toBeTruthy();
    expect(isJi(kaze)).toBeTruthy();
    expect(isJi(sangen)).toBeTruthy();
    expect(isJi(yaochu)).toBeFalsy();
    expect(isJi(routou)).toBeFalsy();
  });
  test("is yaochu", () => {
    expect(isYaochu(m)).toBeFalsy();
    expect(isYaochu(p)).toBeFalsy();
    expect(isYaochu(s)).toBeFalsy();
    expect(isYaochu(z)).toBeTruthy();
    expect(isYaochu(kaze)).toBeTruthy();
    expect(isYaochu(sangen)).toBeTruthy();
    expect(isYaochu(yaochu)).toBeTruthy();
    expect(isYaochu(routou)).toBeTruthy();
  });
  test("is routou", () => {
    expect(isRoutou(m)).toBeFalsy();
    expect(isRoutou(p)).toBeFalsy();
    expect(isRoutou(s)).toBeFalsy();
    expect(isRoutou(z)).toBeFalsy();
    expect(isRoutou(kaze)).toBeFalsy();
    expect(isRoutou(sangen)).toBeFalsy();
    expect(isRoutou(yaochu)).toBeTruthy();
    expect(isRoutou(routou)).toBeTruthy();
  });
  test("is same type", () => {
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
