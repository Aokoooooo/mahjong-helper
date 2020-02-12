import {
  isMentsuValid,
  Tile,
  TileEnumKeyType,
  mentsuType,
  Mentsu,
  isKantsu,
  isKoutsu,
  isShuntsu
} from "../../src";

describe("util-mentsu", () => {
  const helper = (acronymList: TileEnumKeyType[]) => {
    return acronymList.map(i => Tile.create(i));
  };

  describe("isMentsuValid work well", () => {
    describe("shuntsu", () => {
      it("length should be 3", () => {
        expect(() => isMentsuValid(helper([]), mentsuType.shuntsu)).toThrow(
          "顺子必须由三张牌组成"
        );
        expect(() => isMentsuValid(helper(["m1"]), mentsuType.shuntsu)).toThrow(
          "顺子必须由三张牌组成"
        );
        expect(() =>
          isMentsuValid(helper(["m1", "m2", "m3", "m4"]), mentsuType.shuntsu)
        ).toThrow("顺子必须由三张牌组成");
      });
      it("cant contain jihai", () => {
        expect(() =>
          isMentsuValid(helper(["m1", "m2", "z1"]), mentsuType.shuntsu)
        ).toThrow("顺子中不能有字牌");
      });
      it("all three tiles should be the same type", () => {
        expect(() =>
          isMentsuValid(helper(["m1", "m2", "p3"]), mentsuType.shuntsu)
        ).toThrow("顺子必须由同种牌组成");
      });
      it("tiles should be sequential", () => {
        expect(() =>
          isMentsuValid(helper(["m1", "m2", "m4"]), mentsuType.shuntsu)
        ).toThrow("顺子必须由三张连续的牌组成");
      });
      it("work well", () => {
        expect(() =>
          isMentsuValid(helper(["m1", "m2", "m3"]), mentsuType.shuntsu)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["p2", "p3", "p4"]), mentsuType.shuntsu)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["s3", "s4", "s5"]), mentsuType.shuntsu)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["m4", "m5", "m6"]), mentsuType.shuntsu)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["p5", "p6", "p7"]), mentsuType.shuntsu)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["s6", "s7", "s8"]), mentsuType.shuntsu)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["m7", "m8", "m9"]), mentsuType.shuntsu)
        ).not.toThrow();
      });
    });

    describe("koutsu", () => {
      it("length should be 3", () => {
        expect(() => isMentsuValid(helper([]), mentsuType.koutsu)).toThrow(
          "刻子必须由三张牌组成"
        );
        expect(() => isMentsuValid(helper(["m1"]), mentsuType.koutsu)).toThrow(
          "刻子必须由三张牌组成"
        );
        expect(() =>
          isMentsuValid(helper(["m1", "m1", "m1", "m1"]), mentsuType.koutsu)
        ).toThrow("刻子必须由三张牌组成");
      });
      it("all three tiles should be the same type", () => {
        expect(() =>
          isMentsuValid(helper(["m1", "m2", "p3"]), mentsuType.koutsu)
        ).toThrow("刻子必须由三张相同的牌组成");
        expect(() =>
          isMentsuValid(helper(["m1", "s2", "p3"]), mentsuType.koutsu)
        ).toThrow("刻子必须由三张相同的牌组成");
        expect(() =>
          isMentsuValid(helper(["m1", "m1", "m2"]), mentsuType.koutsu)
        ).toThrow("刻子必须由三张相同的牌组成");
      });
      it("work well", () => {
        expect(() =>
          isMentsuValid(helper(["m4", "m4", "m4"]), mentsuType.koutsu)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["p0", "p0", "p0"]), mentsuType.koutsu)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["s2", "s2", "s2"]), mentsuType.koutsu)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["z7", "z7", "z7"]), mentsuType.koutsu)
        ).not.toThrow();
      });
    });

    describe("kantsu", () => {
      it("length should be 4", () => {
        expect(() => isMentsuValid(helper([]), mentsuType.minkan)).toThrow(
          "杠子必须由四张牌组成"
        );
        expect(() => isMentsuValid(helper(["m1"]), mentsuType.ankan)).toThrow(
          "杠子必须由四张牌组成"
        );
        expect(() =>
          isMentsuValid(helper(["m1", "m1", "m1"]), mentsuType.kakan)
        ).toThrow("杠子必须由四张牌组成");
        expect(() =>
          isMentsuValid(
            helper(["m1", "m1", "m1", "m1", "m1"]),
            mentsuType.kakan
          )
        ).toThrow("杠子必须由四张牌组成");
      });
      it("all four tiles should be the same type", () => {
        expect(() =>
          isMentsuValid(helper(["m1", "m2", "p3", "z1"]), mentsuType.minkan)
        ).toThrow("杠子必须由四张相同的牌组成");
        expect(() =>
          isMentsuValid(helper(["m1", "m1", "m1", "p1"]), mentsuType.ankan)
        ).toThrow("杠子必须由四张相同的牌组成");
        expect(() =>
          isMentsuValid(helper(["m1", "m1", "m1", "s1"]), mentsuType.kakan)
        ).toThrow("杠子必须由四张相同的牌组成");
      });
      it("work well", () => {
        expect(() =>
          isMentsuValid(helper(["m4", "m4", "m4", "m4"]), mentsuType.minkan)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["p0", "p0", "p0", "p0"]), mentsuType.ankan)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["s2", "s2", "s2", "s2"]), mentsuType.kakan)
        ).not.toThrow();
        expect(() =>
          isMentsuValid(helper(["z7", "z7", "z7", "z7"]), mentsuType.ankan)
        ).not.toThrow();
      });
    });

    it("mentsu type should be in 0 - 4", () => {
      expect(() => isMentsuValid(helper(["m1", "m2", "p3", "z1"]), -1)).toThrow(
        "错误的面子类型:-1"
      );
      expect(() => isMentsuValid(helper(["m1", "m1", "m1", "p1"]), 5)).toThrow(
        "错误的面子类型:5"
      );
      expect(() =>
        isMentsuValid(helper(["m1", "m1", "m1", "s1"]), 100)
      ).toThrow("错误的面子类型:100");
    });
  });

  describe("isKantsu work well", () => {
    it("is kantsu", () => {
      expect(isKantsu(helper(["m1", "m1", "m1", "m1"]))).toBeTruthy();
      expect(isKantsu(helper(["p3", "p3", "p3", "p3"]))).toBeTruthy();
      expect(
        isKantsu(
          Mentsu.create(mentsuType.kakan, helper(["s5", "s5", "s5", "s5"]))
        )
      ).toBeTruthy();
      expect(
        isKantsu(
          Mentsu.create(mentsuType.ankan, helper(["z7", "z7", "z7", "z7"]))
        )
      ).toBeTruthy();
    });
    it("is not kantsu", () => {
      expect(isKantsu(helper(["m1", "m1", "m1"]))).toBeFalsy();
      expect(isKantsu(helper(["p3", "p3", "p3", "p3", "p3"]))).toBeFalsy();
      expect(
        isKantsu(Mentsu.create(mentsuType.koutsu, helper(["s5", "s5", "s5"])))
      ).toBeFalsy();
      expect(
        isKantsu(Mentsu.create(mentsuType.shuntsu, helper(["m1", "m2", "m3"])))
      ).toBeFalsy();
    });
  });

  describe("isKoutsu work well", () => {
    it("is koutsu", () => {
      expect(isKoutsu(helper(["m1", "m1", "m1"]))).toBeTruthy();
      expect(isKoutsu(helper(["p3", "p3", "p3"]))).toBeTruthy();
      expect(
        isKoutsu(Mentsu.create(mentsuType.koutsu, helper(["s5", "s5", "s5"])))
      ).toBeTruthy();
      expect(
        isKoutsu(Mentsu.create(mentsuType.koutsu, helper(["z7", "z7", "z7"])))
      ).toBeTruthy();
    });

    it("is not koutsu", () => {
      expect(isKoutsu(helper(["m1", "m1"]))).toBeFalsy();
      expect(isKoutsu(helper(["p3", "p3", "p3", "p3"]))).toBeFalsy();
      expect(
        isKoutsu(
          Mentsu.create(mentsuType.minkan, helper(["s5", "s5", "s5", "s5"]))
        )
      ).toBeFalsy();
      expect(
        isKoutsu(Mentsu.create(mentsuType.shuntsu, helper(["m1", "m2", "m3"])))
      ).toBeFalsy();
    });
  });

  describe("isShuntsu work well", () => {
    it("is shuntsu", () => {
      expect(isShuntsu(helper(["m1", "m2", "m3"]))).toBeTruthy();
      expect(isShuntsu(helper(["p3", "p4", "p5"]))).toBeTruthy();
      expect(
        isShuntsu(Mentsu.create(mentsuType.shuntsu, helper(["s5", "s6", "s7"])))
      ).toBeTruthy();
    });

    it("is not koutsu", () => {
      expect(isShuntsu(helper(["m1", "m1"]))).toBeFalsy();
      expect(isShuntsu(helper(["p3", "p3", "p3", "p3"]))).toBeFalsy();
      expect(
        isShuntsu(
          Mentsu.create(mentsuType.minkan, helper(["s5", "s5", "s5", "s5"]))
        )
      ).toBeFalsy();
      expect(
        isShuntsu(Mentsu.create(mentsuType.koutsu, helper(["m1", "m1", "m1"])))
      ).toBeFalsy();
    });
  });
});
