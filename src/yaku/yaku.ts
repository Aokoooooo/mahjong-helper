import { Player } from "../modal/Player";
import { AbstractYaku, yakuTypes } from "./yakuData";

class Pinhu extends AbstractYaku {
  constructor() {
    super(yakuTypes.pinfu);
  }

  public test(player: Player) {
    // 门清限定
    if (player.hand.fuluTiles.length) {
      return false;
    }
    return true;
  }
}
