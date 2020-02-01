import { parse, toCode } from "../service/parse";
import { isTilesValid, sortTiles } from "../utils/hand";
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
  public hand: Tile[];
  /**
   * 副露
   */
  public fulu: Tile[];

  constructor(hand: Tile[], fulu: Tile[]) {
    isTilesValid(hand, fulu);
    this.hand = hand;
    this.fulu = fulu;
  }

  /**
   * 输出为简码
   */
  public toCode(): string {
    return toCode(this.hand, this.fulu);
  }

  /**
   * 整理手牌
   */
  public sortTiles() {
    this.hand = sortTiles(this.hand);
    this.fulu = sortTiles(this.fulu);
  }
}
