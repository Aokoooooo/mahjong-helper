import { Player } from "../modal/player";
import { mentsuType, Mentsu } from "../modal/mentsu";
import { AgariDataInfo } from "../service/agari";

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
  return getAnkouHelper(player, agariDataInfo)
    ? agariDataInfo.koutsuTiles
    : agariDataInfo.koutsuTiles.filter(i => i.id !== player.winTile?.id);
};

const getAnkouHelper = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.shuntsuFirstTiles.some(
    i =>
      (player.winTile?.id ?? -1 >= i.id) &&
      (player.winTile?.id ?? -1 <= i.id + 2)
  );
};

export const getAnkouNum = (player: Player, agariDataInfo: AgariDataInfo) => {
  return getAnkou(player, agariDataInfo).length;
};

export const getMinkou = (player: Player, agariDataInfo: AgariDataInfo) => {
  const ronKoutsu = getAnkouHelper(player, agariDataInfo)
    ? []
    : agariDataInfo.koutsuTiles.filter(i => i.id === player.winTile?.id);
  return player.hand.fuluTiles
    .filter(i => i.type === mentsuType.koutsu)
    .concat(
      ronKoutsu.map(i => Mentsu.create(mentsuType.minkan, new Array(3).fill(i)))
    );
};

export const getMinkouNum = (player: Player, agariDataInfo: AgariDataInfo) => {
  return getMinkou(player, agariDataInfo).length;
};
