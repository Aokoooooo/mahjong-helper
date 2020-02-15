import { Hand, Player, Tile, getAgariDataInfo, yakuTest } from "../../src";

describe("yaku-yaku", () => {
  const helper = (
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
    }
  ) => {
    const hand = Hand.fromCode(code);
    const player = Player.create(hand, config);
    const agariData = getAgariDataInfo(hand);
    const result = agariData?.some(i => cb(player, i)) ?? false;
    expect(result).toEqual(isTrue);
  };

  describe("pinfu", () => {
    it("cant naki", () => {
      helper("123456789m11sf111m", yakuTest.pinfu, false);
    });
    it("jantou cant be jihai", () => {
      helper("123456789m11z111m", yakuTest.pinfu, false);
    });
    it("shoud be ryanmen tattsu", () => {
      helper("123456789m11s111m", yakuTest.pinfu, true, {
        winTile: Tile.create("m4")
      });
      helper("123456789m11s111m", yakuTest.pinfu, true, {
        winTile: Tile.create("m6")
      });
      helper("123456789m11s111m", yakuTest.pinfu, false, {
        winTile: Tile.create("m3")
      });
      helper("123456789m11s111m", yakuTest.pinfu, false, {
        winTile: Tile.create("m5")
      });
    });
  });

  describe("riichi", () => {
    it("riichi work well", () => {
      helper("123456789m11z111m", yakuTest.riichi, true, { isRiichi: true });
      helper("123456789m11z111m", yakuTest.riichi, false);
    });
  });

  describe("menzenchinTsumohou", () => {
    it("menzenchinTsumohou work well", () => {
      helper("123456789m11z111m", yakuTest.menzenchinTsumohou, true, {
        isTsumo: true
      });
      helper("123456789m11zf111m", yakuTest.menzenchinTsumohou, false, {
        isTsumo: true
      });
      helper("123456789m11z111m", yakuTest.menzenchinTsumohou, false);
      helper("123456789m11zf111m", yakuTest.menzenchinTsumohou, false);
    });
  });

  describe("iipeikou", () => {
    it("iipeikou work well", () => {
      helper("112233789m11z111p", yakuTest.iipeikou, true);
      helper("123456789m11z111p", yakuTest.iipeikou, false);
      helper("112233789m11zf111p", yakuTest.iipeikou, false);
    });
  });

  describe("tanyao", () => {
    it("tanyao work well", () => {
      helper("123456777m11p222s", yakuTest.tanyao, false);
      helper("456m234567p456s11z", yakuTest.tanyao, false);
      helper("456m234567p45677s", yakuTest.tanyao, true);
    });
  });

  describe("yakuhai", () => {
    it("yakuhaiJikaze", () => {
      helper("123456789m11m111z", yakuTest.yakuhaiJikaze, true, {
        selfWindTile: Tile.create("z1")
      });
      helper("123456789m11mf111z", yakuTest.yakuhaiJikaze, true, {
        selfWindTile: Tile.create("z1")
      });
      helper("123456789m11z111m", yakuTest.yakuhaiJikaze, false, {
        selfWindTile: Tile.create("z1")
      });
      helper("123456789m11z111m", yakuTest.yakuhaiJikaze, false);
      helper("123456789m11zf111m", yakuTest.yakuhaiJikaze, false);
    });
    it("yakuhaiBakaze", () => {
      helper("123456789m11m111z", yakuTest.yakuhaiBakaze, true, {
        roundWindTile: Tile.create("z1")
      });
      helper("123456789m11mf111z", yakuTest.yakuhaiBakaze, true, {
        roundWindTile: Tile.create("z1")
      });
      helper("123456789m11z111m", yakuTest.yakuhaiBakaze, false, {
        roundWindTile: Tile.create("z1")
      });
      helper("123456789m11z111m", yakuTest.yakuhaiBakaze, false);
    });
    it("yakuhaiHaku", () => {
      helper("123456789m11m555z", yakuTest.yakuhaiHaku, true);
      helper("123456m11mf555z 789p", yakuTest.yakuhaiHaku, true);
      helper("123456789m11z111m", yakuTest.yakuhaiHaku, false);
    });
    it("yakuhaiHatsu", () => {
      helper("123456789m11m666z", yakuTest.yakuhaiHatsu, true);
      helper("123456789m11mf666z", yakuTest.yakuhaiHatsu, true);
      helper("123456789m11z111m", yakuTest.yakuhaiHatsu, false);
    });
    it("yakuhaiChun", () => {
      helper("123456789m11m777z", yakuTest.yakuhaiChun, true);
      helper("123456789m11mf777z", yakuTest.yakuhaiChun, true);
      helper("123456789m11z111m", yakuTest.yakuhaiChun, false);
    });
  });

  describe("chiitoitsu", () => {
    it("chiitoitsu work well", () => {
      helper("11223344557788m", yakuTest.chiitoitsu, true);
      helper("1133m5577p1199s55z", yakuTest.chiitoitsu, true);
      helper("11223344466677m", yakuTest.chiitoitsu, false);
      helper("112233m88pf123m 444s", yakuTest.chiitoitsu, false);
    });
  });

  describe("daburuRiichi", () => {
    it("daburuRiichi work well", () => {
      helper("123456789m11z111m", yakuTest.daburuRiichi, true, {
        isDaburuRiichi: true
      });
      helper("123456789m11z111m", yakuTest.daburuRiichi, false);
    });
  });

  describe("ikkitsuukan", () => {
    it("daburuRiichi work well", () => {
      helper("123456789m11z111m", yakuTest.ikkitsuukan, true);
      helper("123456789p11pf111m", yakuTest.ikkitsuukan, true);
      helper("11123456799sf111m", yakuTest.ikkitsuukan, false);
    });
  });

  describe("sanshokuDoujun", () => {
    it("sanshokuDoujun work well", () => {
      helper("123m123p123s11z111m", yakuTest.sanshokuDoujun, true);
      helper("999m123p123s11zf123m", yakuTest.sanshokuDoujun, true);
      helper("123999m123p11zf123s", yakuTest.sanshokuDoujun, true);
      helper("123999m123s11zf123p", yakuTest.sanshokuDoujun, true);
      helper("123m123p234s11z111m", yakuTest.sanshokuDoujun, false);
      helper("123m123p123p11z111m", yakuTest.sanshokuDoujun, false);
    });
  });

  describe("honchantaiyaochuu", () => {
    it("tiles cant all be jihai", () => {
      helper("11122233355zf666z", yakuTest.honchantaiyaochuu, false);
    });
    it("tiles cant all be routou", () => {
      helper("111999m111p11999s", yakuTest.honchantaiyaochuu, false);
    });
    it("cant be toitoihou", () => {
      helper("111999m111p999s11z", yakuTest.honchantaiyaochuu, false);
    });
    it("jantou should be yaochu tile", () => {
      helper("111999m111p22999s", yakuTest.honchantaiyaochuu, false);
    });
    it("honchantaiyaochuu work well", () => {
      helper("111999m111p11zf234m", yakuTest.honchantaiyaochuu, false);
      helper("111888m111p11999s", yakuTest.honchantaiyaochuu, false);
      helper("234999m111p11999s", yakuTest.honchantaiyaochuu, false);
      helper("678999m111p11999s", yakuTest.honchantaiyaochuu, false);
      helper("111999m111p11z789s", yakuTest.honchantaiyaochuu, true);
    });
  });

  describe("toitoihou", () => {
    it("toitoihou work well", () => {
      helper("123m11zf123m 456m 789m", yakuTest.toitoihou, false);
      helper("111m11zf123m 456m 789m", yakuTest.toitoihou, false);
      helper("111m11zf222m 456m 789m", yakuTest.toitoihou, false);
      helper("111m11zf222m 333m 789m", yakuTest.toitoihou, false);
      helper("111m11zf222m 333m 444m", yakuTest.toitoihou, true);
      helper("11zf111m 222m 333m 444m", yakuTest.toitoihou, true);
      helper("11z111222333444m", yakuTest.toitoihou, true);
    });
  });

  describe("sanshokuDoukou", () => {
    it("sanshokuDoukou work well", () => {
      helper("222m222p222s11z111m", yakuTest.sanshokuDoukou, true);
      helper("123m333p333s11zf333m", yakuTest.sanshokuDoukou, true);
      helper("222m333p333s11z111m", yakuTest.sanshokuDoukou, false);
    });
  });

  describe("sanankou", () => {
    it("sanankou work well", () => {
      helper("11122233344455m", yakuTest.sanankou, false);
      helper("11122233345655m", yakuTest.sanankou, false, {
        winTile: Tile.create("m1")
      });
      helper("11122233355mmf111p", yakuTest.sanankou, true);
      helper("11122233345655m", yakuTest.sanankou, true);
    });
  });

  describe("honroutou", () => {
    it("cant all be jihai", () => {
      helper("11122233344zf555z", yakuTest.honroutou, false);
    });
    it("cant call be routou", () => {
      helper("111999m111p11sf999s", yakuTest.honroutou, false);
    });
    it("honroutou work well", () => {
      helper("111999m111p11sf888s", yakuTest.honroutou, false);
      helper("111999m111z11sf999s", yakuTest.honroutou, true);
      helper("111999m111p11zf999s", yakuTest.honroutou, true);
    });
  });

  describe("shousangen", () => {
    it("jantou should be sangen", () => {
      helper("123456m555666z11p", yakuTest.shousangen, false);
    });
    it("shousangen work well", () => {
      helper("123456m55566677z", yakuTest.shousangen, true);
      helper("123456m55577zf666z", yakuTest.shousangen, true);
      helper("123456m55zf666z 777z", yakuTest.shousangen, true);
    });
  });

  describe("ryanpeikou", () => {
    it("ryanpeikou work well", () => {
      helper("112233m445566p77s", yakuTest.ryanpeikou, true);
      helper("112233m444555p77s", yakuTest.ryanpeikou, false);
      helper("112233445577m77s", yakuTest.ryanpeikou, false);
    });
  });

  describe("junchantaiyaochuu", () => {
    it("cant all be routou", () => {
      helper("111999m111999p11s", yakuTest.junchantaiyaochuu, false);
      helper("111999m111p11sf999s", yakuTest.junchantaiyaochuu, false);
    });
    it("cant contain ji", () => {
      helper("111999m111999p11z", yakuTest.junchantaiyaochuu, false);
      helper("111999m111p11sf111z", yakuTest.junchantaiyaochuu, false);
    });
    it("jantou should be routou", () => {
      helper("111999m111999p22s", yakuTest.junchantaiyaochuu, false);
    });
    it("junchantaiyaochuu work well", () => {
      helper("111999m111p11sf234m", yakuTest.junchantaiyaochuu, false);
      helper("111999m111p11888s", yakuTest.junchantaiyaochuu, false);
      helper("234999m111p11789s", yakuTest.junchantaiyaochuu, false);
      helper("111678m111p11789s", yakuTest.junchantaiyaochuu, false);
      helper("111789m111p11789s", yakuTest.junchantaiyaochuu, true);
    });
  });

  describe("honiisou", () => {
    it("should contain ji", () => {
      helper("12334545656711m", yakuTest.honiisou, false);
      helper("12334545677mf111m", yakuTest.honiisou, false);
    });
    it("honiisou work well", () => {
      helper("123345456m11p555z", yakuTest.honiisou, false);
      helper("12334511m567s666z", yakuTest.honiisou, false);
      helper("12334511p567s777z", yakuTest.honiisou, false);
      helper("123345p11zf567s 222m", yakuTest.honiisou, false);
      helper("123345456p11pf333z", yakuTest.honiisou, true);
    });
  });

  describe("chiniisou", () => {
    it("cant contain ji", () => {
      helper("123345456567m11z", yakuTest.chiniisou, false);
      helper("12334545677mf111z", yakuTest.chiniisou, false);
    });
    it("chiniisou work well", () => {
      helper("123345456m11p777m", yakuTest.chiniisou, false);
      helper("12334511m567s666m", yakuTest.chiniisou, false);
      helper("12334511p567s777m", yakuTest.chiniisou, false);
      helper("123345456p11pf567s", yakuTest.chiniisou, false);
      helper("123345456p11pf999p", yakuTest.chiniisou, true);
    });
  });
});
