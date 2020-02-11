import { Tile, tileEnum } from "../../src";

describe("modal-tile", () => {
  describe("`create` work well", () => {
    it("create by id", () => {
      expect(Tile.create(tileEnum.z6.id).acronym).toEqual("z6");
      const p0 = Tile.create(tileEnum.p0.id, true);
      expect(p0.id).toEqual(tileEnum.p0.id);
      expect(p0.isRedDora).toBeTruthy();
      expect(p0.name).toEqual("⑤");
      expect(p0.acronym).toEqual("p0");
    });
    it("create by acronym", () => {
      expect(Tile.create("s6").acronym).toEqual("s6");
      const m0 = Tile.create("m0");
      expect(m0.id).toEqual(tileEnum.m0.id);
      expect(m0.isRedDora).toBeTruthy();
      expect(m0.name).toEqual("五");
      expect(m0.acronym).toEqual("m0");
    });
    it("throw err when wrong id passed in", () => {
      expect(() => Tile.create(100)).toThrow("错误的id:100");
    });
  });

  it("`new` work well", () => {
    const tile = new Tile(tileEnum.m1.id, tileEnum.m1.name, "m1");
    expect(tile.acronym).toEqual("m1");
    expect(tile.id).toEqual(0);
    expect(tile.name).toEqual("一");
    expect(tile.isRedDora).toBeFalsy();

    const tile2 = new Tile(tileEnum.m0.id, tileEnum.m0.name, "m0", true);
    expect(tile2.acronym).toEqual("m0");
    expect(tile2.id).toEqual(4);
    expect(tile2.name).toEqual("五");
    expect(tile2.isRedDora).toBeTruthy();
  });

  it("`clone` work well", () => {
    const tile = Tile.create("m0");
    const tile2 = tile.clone();
    expect(tile).toEqual(tile2);
  });
});
