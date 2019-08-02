import { sortBy } from "lodash";
import { parse, toCode } from "../service/parse";
import { isTilesValid } from "../utils/hand";
import { Tile } from "./tile";

export class Hand {
  public static fromCode(code: string) {
    if (!code || code.trim() === "") {
      throw new Error("code should not be blank");
    }
    const { handTiles, fuluTiles } = parse(code);
    return new Hand(handTiles, fuluTiles);
  }

  public hand: Tile[];
  public fulu: Tile[];

  constructor(hand: Tile[], fulu: Tile[]) {
    isTilesValid(hand, fulu);
    this.hand = hand;
    this.fulu = fulu;
  }

  public toCode(): string {
    return toCode(this.hand, this.fulu);
  }

  public sortTiles() {
    this.hand = sortBy(this.hand, ["id"]);
    this.fulu = sortBy(this.fulu, ["id"]);
  }
}
