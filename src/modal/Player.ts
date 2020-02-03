import { isFeng } from "../utils/tile";
import { Hand } from "./hand";
import { Tile } from "./tile";

interface IPlayer {
  hand: Hand;
  roundWindTile: Tile;
  selfWindTile: Tile;
  winTile: Tile | null;
  isTsumo: boolean;
  isParent: boolean;
  isDaburuRiichi: boolean;
  isRiichi: boolean;
}

export class Player {
  public static create(
    hand: Hand,
    roundWindTile: Tile = Tile.create("z1"),
    selfWindTile: Tile = Tile.create("z1")
  ) {
    if (!isFeng(roundWindTile) || isFeng(selfWindTile)) {
      throw new Error(`自风牌和场风牌必须为风牌`);
    }

    return new Player({
      hand,
      roundWindTile,
      selfWindTile,
      winTile: null,
      isTsumo: false,
      isParent: false,
      isDaburuRiichi: false,
      isRiichi: false
    });
  }
  /**
   * 手牌+副露
   */
  public hand: Hand;
  /**
   * 场风
   */
  public roundWindTile: Tile;
  /**
   * 自风
   */
  public selfWindTile: Tile;
  /**
   * 荣和/自摸的牌
   */
  public winTile: Tile | null;
  /**
   * 是否为自摸
   */
  public isTsumo: boolean;
  /**
   * 是否为亲家
   */
  public isParent: boolean;
  /**
   * 是否为双立直
   */
  public isDaburuRiichi: boolean;
  /**
   * 是否立直
   */
  public isRiichi: boolean;

  constructor(props: IPlayer) {
    const {
      hand,
      isTsumo,
      winTile,
      roundWindTile,
      selfWindTile,
      isParent,
      isDaburuRiichi,
      isRiichi
    } = props;

    this.hand = hand;
    this.isTsumo = isTsumo;
    this.winTile = winTile;
    this.roundWindTile = roundWindTile;
    this.selfWindTile = selfWindTile;
    this.isParent = isParent;
    this.isDaburuRiichi = isDaburuRiichi;
    this.isRiichi = isRiichi;
  }
}
