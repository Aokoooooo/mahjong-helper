import {
  calculateFu,
  fuRoundUp10,
  Tile,
  Hand,
  getAgariDataInfo,
  calculateAgariKey
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
  console.log(calculateAgariKey(hand));
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
        expect(calculateFuByCodeAndOtherInfo("12345677m45sf 123p")).toEqual(30);
      });
      it("is tsumo and is pinfu", () => {
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            isTsumo: true,
            winTile: Tile.create("p6")
          })
        ).toEqual(20);
      });
      it("is tsumo but is not pinfu", () => {
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            isTsumo: true,
            winTile: Tile.create("p5")
          })
        ).toEqual(30);
      });
      it("is not tsumo but is pinfu", () => {
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            winTile: Tile.create("p6")
          })
        ).toEqual(30);
      });
      it("is not tsumo and is not pinfu", () => {
        expect(
          calculateFuByCodeAndOtherInfo("123456789m456p11s", {
            winTile: Tile.create("p5")
          })
        ).toEqual(40);
        expect(
          calculateFuByCodeAndOtherInfo("123456789m123p11s", {
            winTile: Tile.create("p3")
          })
        ).toEqual(40);
        expect(
          calculateFuByCodeAndOtherInfo("123456789m123p11s", {
            winTile: Tile.create("p1")
          })
        ).toEqual(40);
      });
    });
    it("30 fu", () => {
      expect(calculateFuByCodeAndOtherInfo("111456789m456p11s")).toEqual(30);
      expect(calculateFuByCodeAndOtherInfo("123456789m456p11z")).toEqual(30);
    });
  });
});
