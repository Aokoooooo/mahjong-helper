import { sortTiles } from "../utils/hand";
import { Tile } from "./tile";

export class Mentsu {
  public static create(
    type: mentsuTypeValue,
    tiles: Tile[],
    calledTile: Tile | null = null,
    kakanTile: Tile | null = null
  ) {
    return new Mentsu(type, tiles, calledTile, kakanTile);
  }

  public type: mentsuTypeValue;
  public tiles: Tile[];
  public readonly calledTile: Tile | null;
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

  public sortMentsu() {
    this.tiles = sortTiles(this.tiles);
    return this.tiles[0].id + this.tiles[this.tiles.length - 1].id;
  }
}

export const mentsuType = {
  shuntsu: 0,
  koutsu: 1,
  ankan: 2,
  minkan: 3,
  kakan: 4
};

export type mentsuTypeKey = keyof typeof mentsuType;
export type mentsuTypeValue = typeof mentsuType[mentsuTypeKey];
