import { Suggest, Tile, CheckYakuReturenType } from "../../src";

describe("modal-suggest", () => {
  it("`new` work well", () => {
    const map = new Map<Tile, number>();
    map.set(Tile.create("z2"), 2);
    const sg1 = new Suggest(Tile.create("m3"), 13, map, 0, -1);
    expect(sg1.discard.acronym).toEqual("m3");
    expect(sg1.count).toEqual(13);
    expect(sg1.details).toBe(map);
    expect(sg1.oldShanten).toEqual(0);
    expect(sg1.newShanten).toEqual(-1);
    expect(sg1.yakuInfo).toBeUndefined();

    const yakuInfo: CheckYakuReturenType = {
      isYakuman: false,
      yakumanResult: { yakumanTime: 0, yakumanList: [] },
      yakuResult: { yakuHan: 1, yakuList: [] },
      fu: 100,
      point: { child: 100, parent: 200 }
    };

    const sg2 = new Suggest(Tile.create("p3"), 1, map, 4, 3, yakuInfo);
    expect(sg2.discard.acronym).toEqual("p3");
    expect(sg2.count).toEqual(1);
    expect(sg2.details).toBe(map);
    expect(sg2.oldShanten).toEqual(4);
    expect(sg2.newShanten).toEqual(3);
    expect(sg2.yakuInfo).toBe(yakuInfo);
  });
});
