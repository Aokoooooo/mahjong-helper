import { Player, Hand, Tile } from "../../src";
describe("modal-player", () => {
  it("self wind should be kaze", () => {
    const helper = (
      selfWindTile: Tile | null = null,
      roundWindTile: Tile | null = null
    ) => {
      return Player.create(Hand.fromCode("11122233344455m"), {
        selfWindTile,
        roundWindTile
      });
    };

    expect(() => helper(Tile.create("z1"))).not.toThrowError();
    expect(() => helper(Tile.create("z2"))).not.toThrowError();
    expect(() => helper(Tile.create("z3"))).not.toThrowError();
    expect(() => helper(Tile.create("z4"))).not.toThrowError();
    expect(() => helper(null, Tile.create("z1"))).not.toThrowError();
    expect(() => helper(null, Tile.create("z2"))).not.toThrowError();
    expect(() => helper(null, Tile.create("z3"))).not.toThrowError();
    expect(() => helper(null, Tile.create("z4"))).not.toThrowError();
    expect(() =>
      helper(Tile.create("z1"), Tile.create("z4"))
    ).not.toThrowError();

    expect(() => helper(Tile.create("m1"))).toThrowError(
      "自风牌和场风牌必须为风牌"
    );
    expect(() => helper(Tile.create("p1"))).toThrowError(
      "自风牌和场风牌必须为风牌"
    );
    expect(() => helper(Tile.create("s1"))).toThrowError(
      "自风牌和场风牌必须为风牌"
    );
    expect(() => helper(Tile.create("z5"))).toThrowError(
      "自风牌和场风牌必须为风牌"
    );
    expect(() => helper(null, Tile.create("m1"))).toThrowError(
      "自风牌和场风牌必须为风牌"
    );
    expect(() => helper(null, Tile.create("p1"))).toThrowError(
      "自风牌和场风牌必须为风牌"
    );
    expect(() => helper(null, Tile.create("s1"))).toThrowError(
      "自风牌和场风牌必须为风牌"
    );
    expect(() => helper(null, Tile.create("z6"))).toThrowError(
      "自风牌和场风牌必须为风牌"
    );
    expect(() => helper(Tile.create("z1"), Tile.create("z6"))).toThrowError(
      "自风牌和场风牌必须为风牌"
    );
    expect(() => helper(Tile.create("s5"), Tile.create("z2"))).toThrowError(
      "自风牌和场风牌必须为风牌"
    );
  });
  it("player work well", () => {
    const player = Player.create(Hand.fromCode("11122233344455m"), {
      roundWindTile: Tile.create("z1"),
      selfWindTile: Tile.create("z2"),
      winTile: Tile.create("m4"),
      isTsumo: true,
      isParent: true,
      isDaburuRiichi: true,
      isRiichi: true
    });
    expect(player.hand.toCode()).toEqual("11122233344455m");
    expect(player.roundWindTile?.acronym).toEqual("z1");
    expect(player.selfWindTile?.acronym).toEqual("z2");
    expect(player.winTile?.acronym).toEqual("m4");
    expect(player.isTsumo).toEqual(true);
    expect(player.isParent).toEqual(true);
    expect(player.isDaburuRiichi).toEqual(true);
    expect(player.isRiichi).toEqual(true);

    const player2 = Player.create(Hand.fromCode("44455566677788p"));
    expect(player2.hand.toCode()).toEqual("44455566677788p");
    expect(player2.roundWindTile).toEqual(null);
    expect(player2.selfWindTile).toEqual(null);
    expect(player2.winTile).toEqual(null);
    expect(player2.isTsumo).toEqual(false);
    expect(player2.isParent).toEqual(false);
    expect(player2.isDaburuRiichi).toEqual(false);
    expect(player2.isRiichi).toEqual(false);
  });
});
