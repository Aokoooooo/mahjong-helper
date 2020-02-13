import { Player } from "../modal/player";
import { mentsuType } from "../modal/mentsu";
import { AgariDataInfo } from "../service/agari";

/**
 * 获取暗杠
 * @param player
 */
export const getAnkan = (player: Player) => {
  return player.hand.fuluTiles
    .filter(i => i.type === mentsuType.ankan)
    .map(i => i.tiles[0]);
};

/**
 * 获取暗杠数
 * @param player
 */
export const getAnkanNum = (player: Player) => {
  return getAnkan(player).length;
};

/**
 * 获取明杠
 * @param player
 */
export const getMinkan = (player: Player) => {
  return player.hand.fuluTiles
    .filter(i => i.tiles.length === 4 && i.type !== mentsuType.ankan)
    .map(i => i.tiles[0]);
};

/**
 * 获取明杠数
 * @param player
 */
export const getMinkanNum = (player: Player) => {
  return getMinkan(player).length;
};

/**
 * 获取暗刻,和牌后使用
 * @param player
 * @param agariDataInfo
 */
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

/**
 * 获取暗刻的辅助函数,用于测试荣和的那张牌是否在顺子中
 * @param player
 * @param agariDataInfo
 */
const getAnkouHelper = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.shuntsuFirstTiles.some(
    i =>
      player.winTile &&
      player.winTile.id >= i.id &&
      player.winTile.id <= i.id + 2
  );
};

/**
 * 获取暗刻数量
 * @param player
 * @param agariDataInfo
 */
export const getAnkouNum = (player: Player, agariDataInfo: AgariDataInfo) => {
  return getAnkou(player, agariDataInfo).length;
};

/**
 * 获取明刻,和牌后使用(因为荣和的牌是暗刻中的一个的话,算明刻)
 * @param player
 * @param agariDataInfo
 */
export const getMinkou = (player: Player, agariDataInfo: AgariDataInfo) => {
  const ronKoutsu =
    !player.isTsumo &&
    player.winTile?.id !== agariDataInfo.jantouTile.id &&
    getAnkouHelper(player, agariDataInfo)
      ? []
      : agariDataInfo.koutsuTiles.filter(i => i.id === player.winTile?.id);
  return player.hand.fuluTiles
    .filter(i => i.type === mentsuType.koutsu)
    .map(i => i.tiles[0])
    .concat(ronKoutsu);
};

/**
 * 获取明刻数量,和牌后使用
 * @param player
 * @param agariDataInfo
 */
export const getMinkouNum = (player: Player, agariDataInfo: AgariDataInfo) => {
  return getMinkou(player, agariDataInfo).length;
};
