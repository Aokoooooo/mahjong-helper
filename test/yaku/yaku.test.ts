import { Hand, Player, Tile, getAgariDataInfo, yakuTest } from "../../src";

export const yakuTestHelper = (
  code: string,
  // tslint:disable-next-line: ban-types
  cb: Function,
  isTrue: boolean,
  config?: {
    isTsumo?: boolean;
    selfWindTile?: Tile;
    roundWindTile?: Tile;
    winTile?: Tile;
    isRiichi?: boolean;
    isDaburuRiichi?: boolean;
    noAgariData?: boolean;
  }
) => {
  const hand = Hand.fromCode(code);
  const player = Player.create(hand, config);
  const agariData = getAgariDataInfo(hand);
  if (config?.noAgariData) {
    return cb(player);
  }
  const result = agariData?.some(i => cb(player, i)) ?? false;
  expect(result).toEqual(isTrue);
};

describe("yaku-yaku", () => {
  describe("pinfu", () => {
    it("cant naki", () => {
      yakuTestHelper("123456789m11sf111m", yakuTest.pinfu, false);
    });
    it("jantou cant be jihai", () => {
      yakuTestHelper("123456789m11z111m", yakuTest.pinfu, false);
    });
    it("should be ryanmen tattsu", () => {
      yakuTestHelper("123456789m11s111m", yakuTest.pinfu, true, {
        winTile: Tile.create("m4")
      });
      yakuTestHelper("123456789m11s111m", yakuTest.pinfu, true, {
        winTile: Tile.create("m6")
      });
      yakuTestHelper("123456789m11s111m", yakuTest.pinfu, false, {
        winTile: Tile.create("m3")
      });
      yakuTestHelper("123456789m11s111m", yakuTest.pinfu, false, {
        winTile: Tile.create("m5")
      });
    });
  });

  describe("riichi", () => {
    it("riichi work well", () => {
      yakuTestHelper("123456789m11z111m", yakuTest.riichi, true, {
        isRiichi: true
      });
      yakuTestHelper("123456789m11z111m", yakuTest.riichi, false);
    });
  });

  describe("menzenchinTsumohou", () => {
    it("menzenchinTsumohou work well", () => {
      yakuTestHelper("123456789m11z111m", yakuTest.menzenchinTsumohou, true, {
        isTsumo: true
      });
      yakuTestHelper("123456789m11zf111m", yakuTest.menzenchinTsumohou, false, {
        isTsumo: true
      });
      yakuTestHelper("123456789m11z111m", yakuTest.menzenchinTsumohou, false);
      yakuTestHelper("123456789m11zf111m", yakuTest.menzenchinTsumohou, false);
    });
  });

  describe("iipeikou", () => {
    it("iipeikou work well", () => {
      yakuTestHelper("112233789m11z111p", yakuTest.iipeikou, true);
      yakuTestHelper("123456789m11z111p", yakuTest.iipeikou, false);
      yakuTestHelper("112233789m11zf111p", yakuTest.iipeikou, false);
    });
  });

  describe("tanyao", () => {
    it("tanyao work well", () => {
      yakuTestHelper("123456777m11p222s", yakuTest.tanyao, false);
      yakuTestHelper("456m234567p456s11z", yakuTest.tanyao, false);
      yakuTestHelper("456m234567p45677s", yakuTest.tanyao, true);
    });
  });

  describe("yakuhai", () => {
    it("yakuhaiJikaze", () => {
      yakuTestHelper("123456789m11m111z", yakuTest.yakuhaiJikaze, true, {
        selfWindTile: Tile.create("z1")
      });
      yakuTestHelper("123456789m11mf111z", yakuTest.yakuhaiJikaze, true, {
        selfWindTile: Tile.create("z1")
      });
      yakuTestHelper("123456789m11z111m", yakuTest.yakuhaiJikaze, false, {
        selfWindTile: Tile.create("z1")
      });
      yakuTestHelper("123456789m11z111m", yakuTest.yakuhaiJikaze, false);
      yakuTestHelper("123456789m11zf111m", yakuTest.yakuhaiJikaze, false);
    });
    it("yakuhaiBakaze", () => {
      yakuTestHelper("123456789m11m111z", yakuTest.yakuhaiBakaze, true, {
        roundWindTile: Tile.create("z1")
      });
      yakuTestHelper("123456789m11mf111z", yakuTest.yakuhaiBakaze, true, {
        roundWindTile: Tile.create("z1")
      });
      yakuTestHelper("123456789m11z111m", yakuTest.yakuhaiBakaze, false, {
        roundWindTile: Tile.create("z1")
      });
      yakuTestHelper("123456789m11z111m", yakuTest.yakuhaiBakaze, false);
    });
    it("yakuhaiHaku", () => {
      yakuTestHelper("123456789m11m555z", yakuTest.yakuhaiHaku, true);
      yakuTestHelper("123456m11mf555z 789p", yakuTest.yakuhaiHaku, true);
      yakuTestHelper("123456789m11z111m", yakuTest.yakuhaiHaku, false);
    });
    it("yakuhaiHatsu", () => {
      yakuTestHelper("123456789m11m666z", yakuTest.yakuhaiHatsu, true);
      yakuTestHelper("123456789m11mf666z", yakuTest.yakuhaiHatsu, true);
      yakuTestHelper("123456789m11z111m", yakuTest.yakuhaiHatsu, false);
    });
    it("yakuhaiChun", () => {
      yakuTestHelper("123456789m11m777z", yakuTest.yakuhaiChun, true);
      yakuTestHelper("123456789m11mf777z", yakuTest.yakuhaiChun, true);
      yakuTestHelper("123456789m11z111m", yakuTest.yakuhaiChun, false);
    });
  });

  describe("chiitoitsu", () => {
    it("chiitoitsu work well", () => {
      yakuTestHelper("11223344557788m", yakuTest.chiitoitsu, true);
      yakuTestHelper("1133m5577p1199s55z", yakuTest.chiitoitsu, true);
      yakuTestHelper("11223344466677m", yakuTest.chiitoitsu, false);
      yakuTestHelper("112233m88pf123m 444s", yakuTest.chiitoitsu, false);
    });
  });

  describe("daburuRiichi", () => {
    it("daburuRiichi work well", () => {
      yakuTestHelper("123456789m11z111m", yakuTest.daburuRiichi, true, {
        isDaburuRiichi: true
      });
      yakuTestHelper("123456789m11z111m", yakuTest.daburuRiichi, false);
    });
  });

  describe("ikkitsuukan", () => {
    it("daburuRiichi work well", () => {
      yakuTestHelper("123456789m11z111m", yakuTest.ikkitsuukan, true);
      yakuTestHelper("123456789p11pf111m", yakuTest.ikkitsuukan, true);
      yakuTestHelper("11123456799sf111m", yakuTest.ikkitsuukan, false);
    });
  });

  describe("sanshokuDoujun", () => {
    it("sanshokuDoujun work well", () => {
      yakuTestHelper("123m123p123s11z111m", yakuTest.sanshokuDoujun, true);
      yakuTestHelper("999m123p123s11zf123m", yakuTest.sanshokuDoujun, true);
      yakuTestHelper("123999m123p11zf123s", yakuTest.sanshokuDoujun, true);
      yakuTestHelper("123999m123s11zf123p", yakuTest.sanshokuDoujun, true);
      yakuTestHelper("123m123p234s11z111m", yakuTest.sanshokuDoujun, false);
      yakuTestHelper("123m123p123p11z111m", yakuTest.sanshokuDoujun, false);
    });
  });

  describe("honchantaiyaochuu", () => {
    it("tiles cant all be jihai", () => {
      yakuTestHelper("11122233355zf666z", yakuTest.honchantaiyaochuu, false);
    });
    it("tiles cant all be routou", () => {
      yakuTestHelper("111999m111p11999s", yakuTest.honchantaiyaochuu, false);
    });
    it("cant be toitoihou", () => {
      yakuTestHelper("111999m111p999s11z", yakuTest.honchantaiyaochuu, false);
    });
    it("jantou should be yaochu tile", () => {
      yakuTestHelper("111999m111p22999s", yakuTest.honchantaiyaochuu, false);
    });
    it("honchantaiyaochuu work well", () => {
      yakuTestHelper("111999m111p11zf234m", yakuTest.honchantaiyaochuu, false);
      yakuTestHelper("111888m111p11999s", yakuTest.honchantaiyaochuu, false);
      yakuTestHelper("234999m111p11999s", yakuTest.honchantaiyaochuu, false);
      yakuTestHelper("678999m111p11999s", yakuTest.honchantaiyaochuu, false);
      yakuTestHelper("111999m111p11z789s", yakuTest.honchantaiyaochuu, true);
    });
  });

  describe("toitoihou", () => {
    it("toitoihou work well", () => {
      yakuTestHelper("123m11zf123m 456m 789m", yakuTest.toitoihou, false);
      yakuTestHelper("111m11zf123m 456m 789m", yakuTest.toitoihou, false);
      yakuTestHelper("111m11zf222m 456m 789m", yakuTest.toitoihou, false);
      yakuTestHelper("111m11zf222m 333m 789m", yakuTest.toitoihou, false);
      yakuTestHelper("111m11zf222m 333m 444m", yakuTest.toitoihou, true);
      yakuTestHelper("11zf111m 222m 333m 444m", yakuTest.toitoihou, true);
      yakuTestHelper("11z111222333444m", yakuTest.toitoihou, true);
    });
  });

  describe("sanshokuDoukou", () => {
    it("sanshokuDoukou work well", () => {
      yakuTestHelper("222m222p222s11z111m", yakuTest.sanshokuDoukou, true);
      yakuTestHelper("123m333p333s11zf333m", yakuTest.sanshokuDoukou, true);
      yakuTestHelper("222m333p333s11z111m", yakuTest.sanshokuDoukou, false);
    });
  });

  describe("sanankou", () => {
    it("sanankou work well", () => {
      yakuTestHelper("11122233344455m", yakuTest.sanankou, false);
      yakuTestHelper("11122233345655m", yakuTest.sanankou, false, {
        winTile: Tile.create("m1")
      });
      yakuTestHelper("11122233355mmf111p", yakuTest.sanankou, true);
      yakuTestHelper("11122233345655m", yakuTest.sanankou, true);
      yakuTestHelper("11122245655mf3333M", yakuTest.sanankou, true);
      yakuTestHelper("45655mf1111M 2222M 3333M", yakuTest.sanankou, true);
    });
  });

  describe("honroutou", () => {
    it("cant all be jihai", () => {
      yakuTestHelper("11122233344zf555z", yakuTest.honroutou, false);
    });
    it("cant call be routou", () => {
      yakuTestHelper("111999m111p11sf999s", yakuTest.honroutou, false);
    });
    it("honroutou work well", () => {
      yakuTestHelper("111999m111p11sf888s", yakuTest.honroutou, false);
      yakuTestHelper("111999m111z11sf999s", yakuTest.honroutou, true);
      yakuTestHelper("111999m111p11zf999s", yakuTest.honroutou, true);
    });
  });

  describe("shousangen", () => {
    it("jantou should be sangen", () => {
      yakuTestHelper("123456m555666z11p", yakuTest.shousangen, false);
    });
    it("shousangen work well", () => {
      yakuTestHelper("123456m55566677z", yakuTest.shousangen, true);
      yakuTestHelper("123456m55577zf666z", yakuTest.shousangen, true);
      yakuTestHelper("123456m55zf666z 777z", yakuTest.shousangen, true);
    });
  });

  describe("ryanpeikou", () => {
    it("ryanpeikou work well", () => {
      yakuTestHelper("112233m445566p77s", yakuTest.ryanpeikou, true);
      yakuTestHelper("112233m444555p77s", yakuTest.ryanpeikou, false);
      yakuTestHelper("112233445577m77s", yakuTest.ryanpeikou, false);
    });
  });

  describe("junchantaiyaochuu", () => {
    it("cant all be routou", () => {
      yakuTestHelper("111999m111999p11s", yakuTest.junchantaiyaochuu, false);
      yakuTestHelper("111999m111p11sf999s", yakuTest.junchantaiyaochuu, false);
    });
    it("cant contain ji", () => {
      yakuTestHelper("111999m111999p11z", yakuTest.junchantaiyaochuu, false);
      yakuTestHelper("111999m111p11sf111z", yakuTest.junchantaiyaochuu, false);
    });
    it("jantou should be routou", () => {
      yakuTestHelper("111999m111999p22s", yakuTest.junchantaiyaochuu, false);
    });
    it("junchantaiyaochuu work well", () => {
      yakuTestHelper("111999m111p11sf234m", yakuTest.junchantaiyaochuu, false);
      yakuTestHelper("111999m111p11888s", yakuTest.junchantaiyaochuu, false);
      yakuTestHelper("234999m111p11789s", yakuTest.junchantaiyaochuu, false);
      yakuTestHelper("111678m111p11789s", yakuTest.junchantaiyaochuu, false);
      yakuTestHelper("111789m111p11789s", yakuTest.junchantaiyaochuu, true);
    });
  });

  describe("honiisou", () => {
    it("should contain ji", () => {
      yakuTestHelper("12334545656711m", yakuTest.honiisou, false);
      yakuTestHelper("12334545677mf111m", yakuTest.honiisou, false);
    });
    it("honiisou work well", () => {
      yakuTestHelper("123345456m11p555z", yakuTest.honiisou, false);
      yakuTestHelper("12334511m567s666z", yakuTest.honiisou, false);
      yakuTestHelper("12334511p567s777z", yakuTest.honiisou, false);
      yakuTestHelper("123345p11zf567s 222m", yakuTest.honiisou, false);
      yakuTestHelper("123345456p11pf333z", yakuTest.honiisou, true);
    });
  });

  describe("chiniisou", () => {
    it("cant contain ji", () => {
      yakuTestHelper("123345456567m11z", yakuTest.chiniisou, false);
      yakuTestHelper("12334545677mf111z", yakuTest.chiniisou, false);
    });
    it("chiniisou work well", () => {
      yakuTestHelper("123345456m11p777m", yakuTest.chiniisou, false);
      yakuTestHelper("12334511m567s666m", yakuTest.chiniisou, false);
      yakuTestHelper("12334511p567s777m", yakuTest.chiniisou, false);
      yakuTestHelper("123345456p11pf567s", yakuTest.chiniisou, false);
      yakuTestHelper("123345456p11pf999p", yakuTest.chiniisou, true);
    });
  });
});
