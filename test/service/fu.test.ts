import {
  calculateFu,
  fuRoundUp10,
  Tile,
  Hand,
  getAgariDataInfo
} from "../../src";
import { Player } from "../../src/modal/player";

const calculateFuByCodeAndOtherInfo = (
  code: string,
  config?: Partial<
    Pick<
      Player,
      | "isDaburuRiichi"
      | "isParent"
      | "isRiichi"
      | "isTsumo"
      | "winTile"
      | "roundWindTile"
      | "selfWindTile"
    >
  >
) => {
  const hand = Hand.fromCode(code);
  const agariInfoes = getAgariDataInfo(hand);

  return (
    agariInfoes?.reduce(
      (x, y) =>
        Math.max(
          x,
          calculateFu(
            Player.create(
              hand,
              config?.roundWindTile ?? Tile.create("z1"),
              config?.selfWindTile ?? Tile.create("z1"),
              config
            ),
            y
          )
        ),
      0
    ) ?? 0
  );
};

describe("service-fu", () => {
  describe("fuRoundUp10", () => {
    it("fuRoundUp10 work well", () => {
      expect(fuRoundUp10(4)).toEqual(10);
      expect(fuRoundUp10(6)).toEqual(10);
      expect(fuRoundUp10(9.9991)).toEqual(10);
      expect(fuRoundUp10(111)).toEqual(120);
    });

    it("fu should greater than or equal 0", () => {
      expect(() => fuRoundUp10(-1)).toThrow("符必须大于0");
      expect(() => fuRoundUp10(0)).toThrow("符必须大于0");
      expect(() => fuRoundUp10(-0.1)).toThrow("符必须大于0");
      expect(() => fuRoundUp10(-1100)).toThrow("符必须大于0");
    });
  });

  describe("calculateFu", () => {
    it("chitoi", () => {
      expect(calculateFuByCodeAndOtherInfo("1133557799m1133z")).toEqual(25);
    });
    describe("no special tiles and no koutsu", () => {
      it("with naki", () => {
        expect(calculateFuByCodeAndOtherInfo("12345677m456sf 123p")).toEqual(
          30
        );
      });
      it("is tsumo and is pinfu", () => {
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            isTsumo: true,
            winTile: Tile.create("p6")
          })
        ).toEqual(20);
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            isTsumo: true,
            winTile: Tile.create("p4")
          })
        ).toEqual(20);
      });
      it("is tsumo but is not pinfu", () => {
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            isTsumo: true,
            winTile: Tile.create("m1")
          })
        ).toEqual(30);
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            isTsumo: true,
            winTile: Tile.create("m8")
          })
        ).toEqual(30);
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            isTsumo: true,
            winTile: Tile.create("s1")
          })
        ).toEqual(30);
      });
      it("is not tsumo but is pinfu", () => {
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            winTile: Tile.create("p4")
          })
        ).toEqual(30);
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            winTile: Tile.create("m6")
          })
        ).toEqual(30);
      });
      it("is not tsumo and is not pinfu", () => {
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            winTile: Tile.create("s1")
          })
        ).toEqual(40);
        expect(
          calculateFuByCodeAndOtherInfo("123456789m123p11s", {
            winTile: Tile.create("p3")
          })
        ).toEqual(40);
      });
    });
    // 下面的案例都得有点刻子或者特殊雀头
    it("other fu calculate correct", () => {
      // 暗刻-老头
      expect(calculateFuByCodeAndOtherInfo("111456789m11sf456p")).toEqual(30);
      // 明刻-老头
      expect(calculateFuByCodeAndOtherInfo("456789m456p11sf111m")).toEqual(30);
      // 明刻 暗刻-老头 雀头-三元 自摸
      expect(
        calculateFuByCodeAndOtherInfo("111m789m456p77zf222m", { isTsumo: true })
      ).toEqual(40);
      // 暗刻-老头 明刻-老头
      expect(calculateFuByCodeAndOtherInfo("456789m22s111zf 999p")).toEqual(40);
      // 雀头-三元
      expect(calculateFuByCodeAndOtherInfo("123456789m55zf456p")).toEqual(30);
      // 雀头-场风
      expect(
        calculateFuByCodeAndOtherInfo("123456789m22zf456p", {
          roundWindTile: Tile.create("z2")
        })
      ).toEqual(30);
      // 雀头-自风
      expect(
        calculateFuByCodeAndOtherInfo("123456789m22zf456p", {
          selfWindTile: Tile.create("z2")
        })
      ).toEqual(30);
      // 自摸暗刻
      expect(
        calculateFuByCodeAndOtherInfo("111456789m11sf 456p", { isTsumo: true })
      ).toEqual(30);
      // 暗杠
      expect(calculateFuByCodeAndOtherInfo("456789m22sf123m 4444P")).toEqual(
        40
      );
      // 明杠-三元
      expect(calculateFuByCodeAndOtherInfo("123456789m22sf 6666z")).toEqual(40);
      // 明杠
      expect(calculateFuByCodeAndOtherInfo("123456789m22sf 6666s")).toEqual(30);
      // 门清三暗刻
      expect(calculateFuByCodeAndOtherInfo("111222333m123p22s")).toEqual(50);
      // 明杠-风 自摸 欠张
      expect(
        calculateFuByCodeAndOtherInfo("123456m22sf3333z 111p", {
          isTsumo: true,
          winTile: Tile.create("m2")
        })
      ).toEqual(50);
      // 单骑 暗杠-老头 雀头-自风 自摸 明刻-老头
      expect(
        calculateFuByCodeAndOtherInfo("123456m22zf1111P 111m", {
          isTsumo: true,
          selfWindTile: Tile.create("z2"),
          winTile: Tile.create("z2")
        })
      ).toEqual(70);
      // 边张 自摸 门清 雀头-场风 暗刻-风
      expect(
        calculateFuByCodeAndOtherInfo("123456789m111p22z", {
          isTsumo: true,
          roundWindTile: Tile.create("z2"),
          winTile: Tile.create("m9")
        })
      ).toEqual(50);
      // 1番110 符
      expect(
        calculateFuByCodeAndOtherInfo("234m11777zf1111M 1111P", {
          // isTsumo:true,
          winTile: Tile.create("z7")
        })
      ).toEqual(110);
    });
  });
});
