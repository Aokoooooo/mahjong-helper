import { Player } from "../modal/player";
import { AgariDataInfo } from "./agari";
import { getAnkan, getMinkan, getAnkou, getMinkou } from "../utils/player";
import { isYaojiu, isSanyuan } from "../utils/tile";

export const calculateFu = (player: Player, agariDataInfo: AgariDataInfo) => {
  // 七对子
  if (agariDataInfo.isChiitoi) {
    return 25;
  }
  let fu = 20;

  getAnkan(player).forEach(i => (fu += isYaojiu(i) ? 32 : 16));
  getMinkan(player).forEach(i => (fu += isYaojiu(i) ? 16 : 8));
  getAnkou(player, agariDataInfo).forEach(i => (fu += isYaojiu(i) ? 8 : 4));
  getMinkou(player).forEach(i => (fu += isYaojiu(i) ? 4 : 2));

  if (isSanyuan(agariDataInfo.jantouTile)) {
    fu += 2;
  }
  if (agariDataInfo.jantouTile.id === player.roundWindTile.id) {
    fu += 2;
  }
  if (agariDataInfo.jantouTile.id === player.selfWindTile.id) {
    fu += 2;
  }

  // 算了半天一点符不加, 这个时候有些特殊情况需要处理一下
  if (fu === 20) {
    if (player.hand.fuluTiles.length) {
      // 鸣牌的话是不会超过30符的(比如鸣牌平和1番30符1000点)
      return 30;
    }
    const isPinfu = agariDataInfo.shuntsuFirstTiles.some(
      i =>
        (i.id % 9 < 6 && i.id === player.winTile?.id) ||
        (i.id % 9 > 0 && i.id + 2 === player.winTile?.id)
    );

    if (player.isTsumo) {
      if (isPinfu) {
        // 门清自摸平和20符(平和的2符换取番数+1)
        return 20;
      }
      // 坎张,边张,单骑自摸30符
      return 30;
    } else {
      if (isPinfu) {
        // 门清平和荣和30符
        return 30;
      }
      // 坎张,边张,单骑荣和40符
      return 40;
    }
  }

  // 自摸加符
  if (player.isTsumo) {
    fu += 2;
    // 门清加符
    if (!player.hand.fuluTiles.length) {
      fu += 10;
    }
  }

  // 单骑加符
  if (player.winTile?.id === agariDataInfo.jantouTile.id) {
    fu += 2;
  } else {
    for (const i of agariDataInfo.shuntsuFirstTiles) {
      // 坎张加符
      if (i.id + 1 === player.winTile?.id) {
        fu += 2;
        break;
      }
      if (
        (i.id % 9 === 0 && i.id + 2 === player.winTile?.id) ||
        (i.id % 9 === 6 && i.id === player.winTile?.id)
      ) {
        // 边张加符
        fu += 2;
        break;
      }
    }
  }

  return fuRoundUp10(fu);
};

/**
 * 符数向上取整,最小单位为10
 * @param fu 符
 */
export const fuRoundUp10 = (fu: number) => {
  return (Math.floor((fu - 1) / 10) + 1) * 10;
};
