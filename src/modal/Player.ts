import { isKaze } from "../utils/tile";
import { Hand } from "./hand";
import { Tile } from "./tile";

interface IPlayer {
  /**
   * 手牌+副露
   */
  hand: Hand;
  /**
   * 场风
   */
  roundWindTile: Tile | null;
  /**
   * 自风
   */
  selfWindTile: Tile | null;
  /**
   * 荣和/自摸的牌
   */
  winTile: Tile | null;
  /**
   * 是否为自摸
   */
  isTsumo: boolean;
  /**
   * 是否为亲家
   */
  isParent: boolean;
  /**
   * 是否为双立直
   */
  isDaburuRiichi: boolean;
  /**
   * 是否立直
   */
  isRiichi: boolean;
}

/**
 * 玩家对象
 */
export class Player {
  /**
   * 创建玩家对象
   * @param hand 手牌
   * @param config 配置项(比如风,自摸,立直等信息)
   */
  public static create(
    hand: Hand,
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
  ) {
    if (
      (config?.roundWindTile && !isKaze(config.roundWindTile)) ||
      (config?.selfWindTile && !isKaze(config.selfWindTile))
    ) {
      throw new Error(`自风牌和场风牌必须为风牌`);
    }

    return new Player({
      hand,
      roundWindTile: config?.roundWindTile ?? null,
      selfWindTile: config?.selfWindTile ?? null,
      winTile: config?.winTile ?? null,
      isTsumo: config?.isTsumo ?? false,
      isParent: config?.isParent ?? false,
      isDaburuRiichi: config?.isDaburuRiichi ?? false,
      isRiichi: config?.isRiichi ?? false
    });
  }
  /**
   * 手牌+副露
   */
  public hand: Hand;
  /**
   * 场风
   */
  public roundWindTile: Tile | null;
  /**
   * 自风
   */
  public selfWindTile: Tile | null;
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
