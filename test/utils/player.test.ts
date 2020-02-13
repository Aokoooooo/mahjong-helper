import {
  Tile,
  Hand,
  Player,
  getAgariDataInfo,
  getAnkan,
  parse,
  getAnkanNum,
  getMinkan,
  getMinkanNum,
  getAnkou,
  getAnkouNum,
  getMinkou,
  getMinkouNum,
  sortTiles
} from "../../src";

describe("util-player", () => {
  const helper = (
    code: string,
    // tslint:disable-next-line: ban-types
    cb: Function,
    config?: { winTile?: Tile; isTsumo: boolean }
  ) => {
    const hand = Hand.fromCode(code);
    const player = Player.create(hand, config);
    const agariDataInfo = getAgariDataInfo(hand);
    if (agariDataInfo?.length !== 1) {
      throw new Error(`换一个:${code}`);
    }
    const r = cb(player, agariDataInfo[0]);
    return typeof r === "number" ? r : sortTiles(r);
  };

  it("getAnkan and getAnkanNum work well", () => {
    expect(helper("11mf 1111P 1111S 2222M 4444Z", getAnkan)).toEqual(
      parse("2m1p1s4z").handTiles
    );
    expect(helper("11mf 1111P 1111S 2222M 4444Z", getAnkanNum)).toEqual(4);

    expect(helper("11333mf 4444M 2222P 3333Z", getAnkan)).toEqual(
      parse("4m2p3z").handTiles
    );
    expect(helper("11333mf 4444M 2222P 3333Z", getAnkanNum)).toEqual(3);

    expect(helper("11456789mf8888S 7777Z", getAnkan)).toEqual(
      parse("8s7z").handTiles
    );
    expect(helper("11456789mf8888S 7777Z", getAnkanNum)).toEqual(2);

    expect(helper("11123456789mf5555Z", getAnkan)).toEqual(
      parse("5z").handTiles
    );
    expect(helper("11123456789mf5555Z", getAnkanNum)).toEqual(1);

    expect(helper("11123456789789m", getAnkan)).toEqual([]);
    expect(helper("11123456789789m", getAnkanNum)).toEqual(0);
  });

  it("getMinkan and getMinkanNum work well", () => {
    expect(helper("11mf 1111p 1111s 2222m 4444z", getMinkan)).toEqual(
      parse("2m1p1s4z").handTiles
    );
    expect(helper("11mf 1111p 1111s 2222m 4444z", getMinkanNum)).toEqual(4);

    expect(helper("11333mf 4444m 2222p 3333z", getMinkan)).toEqual(
      parse("4m2p3z").handTiles
    );
    expect(helper("11333mf 4444m 2222p 3333z", getMinkanNum)).toEqual(3);

    expect(helper("11456789mf8888s 7777z", getMinkan)).toEqual(
      parse("8s7z").handTiles
    );
    expect(helper("11456789mf8888s 7777z", getMinkanNum)).toEqual(2);

    expect(helper("11123456789mf5555z", getMinkan)).toEqual(
      parse("5z").handTiles
    );
    expect(helper("11123456789mf5555z", getMinkanNum)).toEqual(1);

    expect(helper("11123456789789m", getMinkan)).toEqual([]);
    expect(helper("11123456789789m", getMinkanNum)).toEqual(0);
  });

  it("getAnkou and getAnkouNum work well", () => {
    expect(helper("111222p33344455m", getAnkou)).toEqual(
      parse("12p34m").handTiles
    );
    expect(helper("111222p33344455m", getAnkouNum)).toEqual(4);

    expect(helper("111222m33355pf444m", getAnkou)).toEqual(
      parse("12m3p").handTiles
    );
    expect(helper("111222m33355pf444m", getAnkouNum)).toEqual(3);

    expect(
      helper("111222m33355pf444m", getAnkou, {
        isTsumo: false,
        winTile: Tile.create("m1")
      })
    ).toEqual(parse("2m3p").handTiles);
    expect(
      helper("111222m33355pf444m", getAnkouNum, {
        isTsumo: false,
        winTile: Tile.create("m1")
      })
    ).toEqual(2);

    expect(
      helper("123m234555p55sf444m", getAnkou, {
        isTsumo: false,
        winTile: Tile.create("p5")
      })
    ).toEqual([]);
    expect(
      helper("123m234555p55sf444m", getAnkouNum, {
        isTsumo: false,
        winTile: Tile.create("p5")
      })
    ).toEqual(0);

    expect(
      helper("456666m234p55sf444m", getAnkou, {
        isTsumo: false,
        winTile: Tile.create("m6")
      })
    ).toEqual(parse("6m").handTiles);
    expect(
      helper("456666m234p55sf444m", getAnkouNum, {
        isTsumo: false,
        winTile: Tile.create("m6")
      })
    ).toEqual(1);

    expect(
      helper("123m223344p55sf444m", getAnkou, {
        isTsumo: true
      })
    ).toEqual([]);
    expect(
      helper("123m223344p55sf444m", getAnkouNum, {
        isTsumo: true
      })
    ).toEqual(0);
  });

  it("getMinkou and getMinkouNum work well", () => {
    expect(helper("111222p33344455m", getMinkou)).toEqual([]);
    expect(helper("111222p33344455m", getMinkouNum)).toEqual(0);

    expect(helper("111222m33355pf444m", getMinkou)).toEqual(
      parse("4m").handTiles
    );
    expect(helper("111222m33355pf444m", getMinkouNum)).toEqual(1);

    expect(
      helper("111222m33355pf444m", getMinkou, {
        isTsumo: false,
        winTile: Tile.create("m1")
      })
    ).toEqual(parse("14m").handTiles);
    expect(
      helper("111222m33355pf444m", getMinkouNum, {
        isTsumo: false,
        winTile: Tile.create("m1")
      })
    ).toEqual(2);

    expect(
      helper("123m222345p55sf444m", getMinkou, {
        isTsumo: true
      })
    ).toEqual(parse("4m").handTiles);
    expect(
      helper("123m222345p55sf444m", getMinkouNum, {
        isTsumo: true
      })
    ).toEqual(1);

    expect(
      helper("123m223344p55sf444m", getMinkou, {
        isTsumo: false,
        winTile: Tile.create("m3")
      })
    ).toEqual([Tile.create("m4")]);
    expect(
      helper("123m223344p55sf444m", getMinkouNum, {
        isTsumo: false,
        winTile: Tile.create("m3")
      })
    ).toEqual(1);
  });
});
