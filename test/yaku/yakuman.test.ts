import { yakumanTest, Tile } from "../../src";
import { yakuTestHelper } from "./yaku.test";

describe("yaku-yakuman", () => {
  describe("kokushiMusou", () => {
    it("cant naki", () => {
      yakuTestHelper("12345678999mf111m", yakumanTest.kokushiMusou, false, {
        noAgariData: true
      });
    });
    it("composed by 13 different kinds of tile", () => {
      yakuTestHelper("123456789m12333s", yakumanTest.kokushiMusou, false, {
        noAgariData: true
      });
      yakuTestHelper("123456789m12345s", yakumanTest.kokushiMusou, false, {
        noAgariData: true
      });
    });
    it("every tile should be yaochu", () => {
      yakuTestHelper("19m19p18s8s1234567z", yakumanTest.kokushiMusou, false, {
        noAgariData: true
      });
    });
    it("win tile cant be jantou", () => {
      yakuTestHelper("19m19p199s1234567z", yakumanTest.kokushiMusou, false, {
        noAgariData: true
      });
      yakuTestHelper("19m19p199s1234567z", yakumanTest.kokushiMusou, false, {
        winTile: Tile.create("s9"),
        noAgariData: true
      });
      yakuTestHelper("19m19p199s1234567z", yakumanTest.kokushiMusou, true, {
        winTile: Tile.create("s1"),
        noAgariData: true
      });
    });
  });

  describe("kokushiMusouJuusanMenmachi", () => {
    it("cant naki", () => {
      yakuTestHelper(
        "12345678999mf111m",
        yakumanTest.kokushiMusouJuusanMenmachi,
        false,
        { noAgariData: true }
      );
    });
    it("composed by 13 different kinds of tile", () => {
      yakuTestHelper(
        "123456789m12333s",
        yakumanTest.kokushiMusouJuusanMenmachi,
        false,
        { noAgariData: true }
      );
      yakuTestHelper(
        "123456789m12345s",
        yakumanTest.kokushiMusouJuusanMenmachi,
        false,
        { noAgariData: true }
      );
    });
    it("every tile should be yaochu", () => {
      yakuTestHelper(
        "19m19p18s8s1234567z",
        yakumanTest.kokushiMusouJuusanMenmachi,
        false,
        { noAgariData: true }
      );
    });
    it("win tile should be jantou", () => {
      yakuTestHelper(
        "19m19p199s1234567z",
        yakumanTest.kokushiMusouJuusanMenmachi,
        true,
        { noAgariData: true }
      );
      yakuTestHelper(
        "19m19p199s1234567z",
        yakumanTest.kokushiMusouJuusanMenmachi,
        true,
        {
          winTile: Tile.create("s9"),
          noAgariData: true
        }
      );
      yakuTestHelper(
        "19m19p199s1234567z",
        yakumanTest.kokushiMusouJuusanMenmachi,
        false,
        {
          winTile: Tile.create("s1"),
          noAgariData: true
        }
      );
    });
  });

  describe("daisangen", () => {
    it("daisangen work well", () => {
      yakuTestHelper("12344m555666777z", yakumanTest.daisangen, true);
      yakuTestHelper("12344m555666zf777z", yakumanTest.daisangen, true);
      yakuTestHelper("12344m555p666777z", yakumanTest.daisangen, false);
      yakuTestHelper("12344m555p666zf777z", yakumanTest.daisangen, false);
    });
  });

  describe("suuankou", () => {
    it("ankou/ankan num should be 4", () => {
      yakuTestHelper("11122233345677m", yakumanTest.suuankou, false);
      yakuTestHelper("11122233377mf456m", yakumanTest.suuankou, false);
      yakuTestHelper("11122233377mf666m", yakumanTest.suuankou, false);
      yakuTestHelper("11122233344477m", yakumanTest.suuankou, false, {
        winTile: Tile.create("m1"),
        isTsumo: false
      });
      yakuTestHelper("11122233344477m", yakumanTest.suuankou, true);
      yakuTestHelper("11122233377mf4444M", yakumanTest.suuankou, true);
    });
    it("win tile cant be jantou", () => {
      yakuTestHelper("11122233344477m", yakumanTest.suuankou, false, {
        winTile: Tile.create("m7")
      });
    });
  });

  describe("suuankouTanki", () => {
    it("ankou/ankan num should be 4", () => {
      yakuTestHelper("11122233345677m", yakumanTest.suuankouTanki, false);
      yakuTestHelper("11122233377mf456m", yakumanTest.suuankouTanki, false);
      yakuTestHelper("11122233377mf666m", yakumanTest.suuankouTanki, false);
      yakuTestHelper("11122233344477m", yakumanTest.suuankouTanki, false, {
        winTile: Tile.create("m1"),
        isTsumo: false
      });
      yakuTestHelper("11122233344477m", yakumanTest.suuankouTanki, false);
      yakuTestHelper("11122233377mf4444M", yakumanTest.suuankouTanki, false);
    });
    it("win tile should be jantou", () => {
      yakuTestHelper("11122233344477m", yakumanTest.suuankouTanki, true, {
        winTile: Tile.create("m7")
      });
    });
  });

  describe("shousuushii", () => {
    it("jantou should be kaze", () => {
      yakuTestHelper("111222333z11122m", yakumanTest.shousuushii, false);
    });
    it("kaze koutsu/kantsu num should be 3", () => {
      yakuTestHelper("111222333z111m44z", yakumanTest.shousuushii, true);
      yakuTestHelper("111222z111m44zf333z", yakumanTest.shousuushii, true);
      yakuTestHelper("111333z111m44zf2222Z", yakumanTest.shousuushii, true);
      yakuTestHelper("111333z111m44zf2222p", yakumanTest.shousuushii, false);
      yakuTestHelper("666333z111m44zf2222Z", yakumanTest.shousuushii, false);
      yakuTestHelper("555333z111m44zf2222Z", yakumanTest.shousuushii, false);
    });
  });

  describe("daisuushii", () => {
    it("kaze koutsu/kantsu num should be 4", () => {
      yakuTestHelper("111222333z111m44z", yakumanTest.daisuushii, false);
      yakuTestHelper("111222z111m44zf333z", yakumanTest.daisuushii, false);
      yakuTestHelper("111333z111m44zf2222Z", yakumanTest.daisuushii, false);
      yakuTestHelper("333z111z444z66sf2222Z", yakumanTest.daisuushii, true);
      yakuTestHelper("333z111z444z66sf2222Z", yakumanTest.daisuushii, true);
    });
  });

  describe("tsuuiisou", () => {
    it("every tile should be ji", () => {
      yakuTestHelper("11223344556677z", yakumanTest.tsuuiisou, true);
      yakuTestHelper("11122233344zf555z", yakumanTest.tsuuiisou, true);
      yakuTestHelper("11122233344zf5555Z", yakumanTest.tsuuiisou, true);
      yakuTestHelper("111222333z44sf5555Z", yakumanTest.tsuuiisou, false);
      yakuTestHelper("11122233344zf5555m", yakumanTest.tsuuiisou, false);
    });
  });

  describe("ryuuiisou", () => {
    it("every tile should be 23468s6z", () => {
      yakuTestHelper("22334466888s666z", yakumanTest.ryuuiisou, true);
      yakuTestHelper("22334466s666zf8888S", yakumanTest.ryuuiisou, true);
      yakuTestHelper("22334466789s666z", yakumanTest.ryuuiisou, false);
      yakuTestHelper("22266888s666zf345s", yakumanTest.ryuuiisou, false);
      yakuTestHelper("22334488s666zf777s", yakumanTest.ryuuiisou, false);
    });
  });

  describe("chinroutou", () => {
    it("every tile should be routou", () => {
      yakuTestHelper("111999m11p111s111z", yakumanTest.chinroutou, false);
      yakuTestHelper("111999m11p111sf111z", yakumanTest.chinroutou, false);
      yakuTestHelper("111999m11z111sf111p", yakumanTest.chinroutou, false);
      yakuTestHelper("111999m11p111sf9999S", yakumanTest.chinroutou, true);
    });
  });

  describe("chuurenPoutou", () => {
    it("is chuurenPoutou", () => {
      yakuTestHelper("11123456789999m", yakumanTest.chuurenPoutou, true);
      yakuTestHelper("11123456788999m", yakumanTest.chuurenPoutou, false, {
        winTile: Tile.create("m8")
      });
      yakuTestHelper("11123456788999m", yakumanTest.chuurenPoutou, true, {
        winTile: Tile.create("m9")
      });
      yakuTestHelper("11123456788899m", yakumanTest.chuurenPoutou, false);
      yakuTestHelper("11123456788mf999m", yakumanTest.chuurenPoutou, false);
    });
  });

  describe("junseiChuurenPoutou", () => {
    it("is junseiChuurenPoutou", () => {
      yakuTestHelper("11123456789999m", yakumanTest.junseiChuurenPoutou, false);
      yakuTestHelper("11123456788999m", yakumanTest.junseiChuurenPoutou, true, {
        winTile: Tile.create("m8")
      });
      yakuTestHelper(
        "11123456788999m",
        yakumanTest.junseiChuurenPoutou,
        false,
        { winTile: Tile.create("m9") }
      );
      yakuTestHelper("11123456788899m", yakumanTest.junseiChuurenPoutou, false);
      yakuTestHelper(
        "11123456788mf999m",
        yakumanTest.junseiChuurenPoutou,
        false
      );
    });
  });

  describe("suukantsu", () => {
    it("kantsu num should be 4", () => {
      yakuTestHelper(
        "99mf1111m 2222M 3333s 4444P",
        yakumanTest.suukantsu,
        true
      );
      yakuTestHelper("22999mf1111m 3333s 4444P", yakumanTest.suukantsu, false);
      yakuTestHelper(
        "99mf111m 2222M 3333s 4444P",
        yakumanTest.suukantsu,
        false
      );
    });
  });
});
