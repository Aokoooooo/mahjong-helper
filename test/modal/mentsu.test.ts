import {
  isKantsu,
  isKoutsu,
  isShuntsu,
  Mentsu,
  parse,
  Tile,
  TileEnumKeyType,
  mentsuType,
  mentsuTypeValue
} from "../../src";

function getMentsuByAcronym(
  acronym: string,
  tiles: string,
  type: mentsuTypeValue
): Mentsu;
function getMentsuByAcronym(acronym: string, tiles: string): Tile[];
function getMentsuByAcronym(
  acronym: string,
  tiles: string,
  type?: mentsuTypeValue
) {
  const list = tiles
    .split("")
    .reduce(
      (x, y) => [...x, Tile.create(`${acronym}${y}` as TileEnumKeyType)],
      [] as Tile[]
    );
  return typeof type === "number" ? Mentsu.create(type, list) : list;
}

describe("modal-mentsu", () => {
  test("sort tiles work well", () => {
    const m1 = getMentsuByAcronym("s", "654", mentsuType.shuntsu);
    const m2 = getMentsuByAcronym("z", "222", mentsuType.koutsu);
    const m3 = getMentsuByAcronym("m", "354", mentsuType.shuntsu);
    const m4 = getMentsuByAcronym("p", "505", mentsuType.koutsu);

    expect(m1.sortMentsu()).toEqual(44);
    expect(m2.sortMentsu()).toEqual(56);
    expect(m3.sortMentsu()).toEqual(6);
    expect(m4.sortMentsu()).toEqual(26);

    expect(m1.tiles).toEqual(parse("456s").handTiles);
    expect(m2.tiles).toEqual(parse("222z").handTiles);
    expect(m3.tiles).toEqual(parse("345m").handTiles);
    expect(m4.tiles).toEqual(parse("055p").handTiles);
  });

  test("type check utils work well", () => {
    const m1 = getMentsuByAcronym("s", "654");
    const m2 = getMentsuByAcronym("z", "222");
    const m3 = getMentsuByAcronym("m", "354");
    const m4 = getMentsuByAcronym("p", "5505");
    const m11 = getMentsuByAcronym("s", "654");
    const m22 = getMentsuByAcronym("z", "222");
    const m33 = getMentsuByAcronym("m", "354");
    const m44 = getMentsuByAcronym("p", "5505");

    expect(isKantsu(m4)).toBeTruthy();
    expect(isKantsu(m3)).toBeFalsy();
    expect(isKantsu(m2)).toBeFalsy();
    expect(isKantsu(m1)).toBeFalsy();

    expect(isKoutsu(m4)).toBeFalsy();
    expect(isKoutsu(m3)).toBeFalsy();
    expect(isKoutsu(m2)).toBeTruthy();
    expect(isKoutsu(m1)).toBeFalsy();

    expect(isShuntsu(m4)).toBeFalsy();
    expect(isShuntsu(m3)).toBeTruthy();
    expect(isShuntsu(m2)).toBeFalsy();
    expect(isShuntsu(m1)).toBeTruthy();

    expect(isKantsu(m44)).toBeTruthy();
    expect(isKantsu(m33)).toBeFalsy();
    expect(isKantsu(m22)).toBeFalsy();
    expect(isKantsu(m11)).toBeFalsy();

    expect(isKoutsu(m44)).toBeFalsy();
    expect(isKoutsu(m33)).toBeFalsy();
    expect(isKoutsu(m22)).toBeTruthy();
    expect(isKoutsu(m11)).toBeFalsy();

    expect(isShuntsu(m44)).toBeFalsy();
    expect(isShuntsu(m33)).toBeTruthy();
    expect(isShuntsu(m22)).toBeFalsy();
    expect(isShuntsu(m11)).toBeTruthy();
  });
});
