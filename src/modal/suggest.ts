import { Tile } from "./tile";
import { CheckYakuReturenType } from "../yaku";

/**
 * 切牌建议对象
 */
export class Suggest {
  /**
   * 切牌
   */
  public discard: Tile;
  /**
   * 切牌后进张数
   */
  public count: number;
  /**
   * 切牌后进张详情
   */
  public details: Map<Tile, number>;
  /**
   * 切牌前向听数
   */
  public oldXiangTing: number;
  /**
   * 切牌后向听数
   */
  public newXiangTing: number;
  /**
   * 和牌分析结果
   */
  public yakuInfo?: CheckYakuReturenType;
  constructor(
    discard: Tile,
    count: number,
    details: Map<Tile, number>,
    oldXiangTing: number,
    newXiangTing: number,
    yakuInfo?: CheckYakuReturenType
  ) {
    this.discard = discard;
    this.count = count;
    this.details = details;
    this.oldXiangTing = oldXiangTing;
    this.newXiangTing = newXiangTing;
    this.yakuInfo = yakuInfo;
  }
}
