import { Player } from "../modal/player";
import { mentsuType } from "../modal/mentsu";
import { AgariDataInfo } from "../service/agari";
import { isZi } from "./tile";
import { Tile } from "../modal/tile";

export const getAnkan = (player: Player) => {
  return player.hand.fuluTiles
    .filter(i => i.type === mentsuType.ankan)
    .map(i => i.tiles[0]);
};

export const getAnkanNum = (player: Player) => {
  return getAnkan(player).length;
};

export const getMinkan = (player: Player) => {
  return player.hand.fuluTiles
    .filter(i => i.tiles.length === 4 && i.type !== mentsuType.ankan)
    .map(i => i.tiles[0]);
};

export const getMinkanNum = (player: Player) => {
  return getMinkan(player).length;
};

export const getAnkou = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (player.isTsumo) {
    return agariDataInfo.koutsuTiles;
  }
  if (player.winTile?.id === agariDataInfo.jantouTile.id) {
    return agariDataInfo.koutsuTiles;
  }
  if (isZi(player.winTile ?? Tile.create("m1"))) {
    return agariDataInfo.koutsuTiles.filter(i => i.id !== player.winTile?.id);
  }
  return agariDataInfo.shuntsuFirstTiles.some(
    i =>
      (player.winTile?.id ?? -1 >= i.id) &&
      (player.winTile?.id ?? -1 <= i.id + 2)
  )
    ? agariDataInfo.koutsuTiles
    : agariDataInfo.koutsuTiles.filter(i => i.id !== player.winTile?.id);
};

export const getAnkouNum = (player: Player, agariDataInfo: AgariDataInfo) => {
  return getAnkou(player, agariDataInfo).length;
};

export const getMinkou = (player: Player) => {
  return player.hand.fuluTiles.filter(i => i.type === mentsuType.koutsu);
};

export const getMinkouNum = (player: Player) => {
  return getMinkou(player).length;
};
