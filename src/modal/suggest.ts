import { Tile } from "./tile";

export class Suggest {
  public discard: Tile;
  public count: number;
  public details: Map<Tile, number>;
  public oldXiangTing: number;
  public newXiangTing: number;

  constructor(
    discard: Tile,
    count: number,
    details: Map<Tile, number>,
    oldXiangTing: number,
    newXiangTing: number
  ) {
    this.discard = discard;
    this.count = count;
    this.details = details;
    this.oldXiangTing = oldXiangTing;
    this.newXiangTing = newXiangTing;
  }
}
