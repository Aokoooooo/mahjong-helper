import { Tile, Hand, Player, getAgariDataInfo } from "../../src";

describe("yaku-index", () => {
  const helper = (
    code: string,
    // tslint:disable-next-line: ban-types
    cb: Function,
    result: any,
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
    const agariDataInfo = getAgariDataInfo(hand);

    Array.isArray(agariDataInfo);
  };
  it("test", () => {
    expect(true).toBeTruthy();
  });
  //   describe("checkYakumanHelper",()=>{

  //   });
  //   describe("checkYakuHelper",()=>{

  //   });
  //   describe("checkYaku",()=>{

  // });
});
