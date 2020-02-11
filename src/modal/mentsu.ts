import { sortTiles } from "../utils/hand";
import { Tile } from "./tile";

/**
 * 面子对象
 */
export class Mentsu {
  /**
   * 创建面子对象
   * @param type 面子的类型
   * @param tiles 面子所包含的牌
   * @param calledTile 吃碰杠的那张牌,暗杠没有
   * @param kakanTile 加杠的那张牌
   */
  public static create(
    type: mentsuTypeValue,
    tiles: Tile[],
    calledTile: Tile | null = null,
    kakanTile: Tile | null = null
  ) {
    return new Mentsu(type, tiles, calledTile, kakanTile);
  }

  /**
   * 面子的类型
   */
  public type: mentsuTypeValue;
  /**
   * 组成面子的牌
   */
  public tiles: Tile[];
  /**
   * 吃碰杠的牌
   */
  public readonly calledTile: Tile | null;
  /**
   * 加杠的牌
   */
  public readonly kakanTile: Tile | null;

  constructor(
    type: mentsuTypeValue,
    tiles: Tile[],
    calledTile: Tile | null,
    kakanTile: Tile | null
  ) {
    this.type = type;
    this.tiles = tiles;
    this.calledTile = calledTile;
    this.kakanTile = kakanTile;
  }

  /**
   * 整理面子内部的牌,返回值用于Hand对象整理面子对象之间的顺序
   */
  public sortMentsu() {
    this.tiles = sortTiles(this.tiles);
    return this.tiles[0].id + this.tiles[this.tiles.length - 1].id;
  }
}

/**
 * 面子的类型
 */
export const mentsuType = {
  shuntsu: 0, // 顺子
  koutsu: 1, // 明刻
  ankan: 2, // 暗杠
  minkan: 3, // 明杠
  kakan: 4 // 加杠
};

/**
 * 面子类型的Key
 */
export type mentsuTypeKey = keyof typeof mentsuType;
/**
 * 面子类型的值
 */
export type mentsuTypeValue = typeof mentsuType[mentsuTypeKey];
