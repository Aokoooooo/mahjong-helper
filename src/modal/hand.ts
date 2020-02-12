import { parse, toCode } from "../service/parse";
import { isTilesValid, sortMentsu, sortTiles } from "../utils/hand";
import { Mentsu } from "./mentsu";
import { Tile } from "./tile";

/**
 * 手牌对象,包含手牌和副露
 */
export class Hand {
  /**
   * 通过简码创建手牌对象
   * @param code 简码
   */
  public static fromCode(code: string) {
    const { handTiles, fuluTiles } = parse(code);
    return new Hand(handTiles, fuluTiles);
  }

  /**
   * 手牌
   */
  public handTiles: Tile[];
  /**
   * 副露
   */
  public fuluTiles: Mentsu[];

  constructor(hand: Tile[], fulu: Mentsu[]) {
    isTilesValid(hand, fulu);
    this.handTiles = hand;
    this.fuluTiles = fulu;
  }

  /**
   * 输出为简码
   */
  public toCode(): string {
    return toCode(this.handTiles, this.fuluTiles);
  }

  /**
   * 整理手牌
   */
  public sortHand() {
    this.handTiles = sortTiles(this.handTiles);
    this.fuluTiles = sortMentsu(this.fuluTiles);
  }
}
