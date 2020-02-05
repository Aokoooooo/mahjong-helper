import { Tile } from "./tile";

/**
 * 手牌拆解分析结果
 */
export class HandAnalyse {
  /**
   * 雀头
   */
  public toitsuTile: Tile | null;
  /**
   * 刻子牌
   */
  public kotsuTiles: Tile[];
  /**
   * 顺子牌(顺子的第一张)
   */
  public shuntsuTiles: Tile[];

  constructor(
    toitsuTile: Tile | null,
    kotsuTiles: Tile[],
    shuntsuTiles: Tile[]
  ) {
    this.toitsuTile = toitsuTile;
    this.kotsuTiles = kotsuTiles;
    this.shuntsuTiles = shuntsuTiles;
  }
}
