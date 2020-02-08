import { Player } from "../modal/Player";
import { AgariDataInfo } from "../service/agari";
import { tileEnumKeys } from "../enum/tile";
import {
  isYaojiu,
  isSanyuan,
  isFeng,
  isZi,
  isLaotou,
  isWan
} from "../utils/tile";
import { Tile } from "../modal/tile";
import { parse, toCode } from "../service/parse";

export const kokushiMusou = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (player.hand.fuluTiles.length) {
    return false;
  }
  const yaojiuTiles = tileEnumKeys
    .map(i => Tile.create(i))
    .filter(i => isYaojiu(i));
  if (!player.hand.handTiles.every(i => isYaojiu(i))) {
    return false;
  }
  if (!yaojiuTiles.every(i => player.hand.handTiles.some(j => j.id === i.id))) {
    return false;
  }
  return true;
};

export const kokushiMusouJuusanMenmachi = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
  if (!kokushiMusou(player, agariDataInfo)) {
    return false;
  }

  return (
    player.hand.handTiles.filter(i => i.id === player.winTile?.id).length === 2
  );
};

export const daisangen = (player: Player, agariDataInfo: AgariDataInfo) => {
  const fuluNum = player.hand.fuluTiles.reduce(
    (x, y) => x + (y.tiles.every(i => isSanyuan(i)) ? 1 : 0),
    0
  );
  const handNum = agariDataInfo.koutsuTiles.reduce(
    (x, y) => x + (isSanyuan(y) ? 1 : 0),
    0
  );
  return fuluNum + handNum === 3;
};

export const suuankou = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (agariDataInfo.koutsuTiles.length !== 4) {
    return false;
  }
  if (
    !player.isTsumo &&
    agariDataInfo.koutsuTiles.some(i => i.id === player.winTile?.id)
  ) {
    return false;
  }
  return true;
};

export const suuankouTanki = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (!suuankou(player, agariDataInfo)) {
    return false;
  }
  return player.winTile?.id === agariDataInfo.jantouTile.id;
};

export const shousuushii = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (!isFeng(agariDataInfo.jantouTile)) {
    return false;
  }
  const fuluNum = player.hand.fuluTiles.reduce(
    (x, y) => x + (y.tiles.some(i => isFeng(i)) ? 1 : 0),
    0
  );
  const handNum = agariDataInfo.koutsuTiles.reduce(
    (x, y) => x + (isFeng(y) ? 1 : 0),
    0
  );
  return fuluNum + handNum === 3;
};

export const daisuushii = (player: Player, agariDataInfo: AgariDataInfo) => {
  const fuluNum = player.hand.fuluTiles.reduce(
    (x, y) => x + (y.tiles.some(i => isFeng(i)) ? 1 : 0),
    0
  );
  const handNum = agariDataInfo.koutsuTiles.reduce(
    (x, y) => x + (isFeng(y) ? 1 : 0),
    0
  );
  return fuluNum + handNum === 4;
};

export const tsuuiisou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return (
    player.hand.fuluTiles.every(i => i.tiles.some(i => isZi(i))) &&
    player.hand.handTiles.every(i => isZi(i))
  );
};

export const ryuuiisou = (player: Player, agariDataInfo: AgariDataInfo) => {
  const ryuuTiles = parse("23468s6z").handTiles;
  return (
    player.hand.fuluTiles.every(i =>
      i.tiles.some(j => ryuuTiles.some(k => k.id === j.id))
    ) && player.hand.handTiles.every(i => ryuuTiles.some(j => j.id === i.id))
  );
};

export const chinroutou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return (
    player.hand.fuluTiles.every(i => i.tiles.some(j => isLaotou(j))) &&
    player.hand.handTiles.every(i => isLaotou(i))
  );
};

export const chuurenPoutou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.isChuurenPoutou;
};

export const junseiChuurenPoutou = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
  if (!chuurenPoutou(player, agariDataInfo)) {
    return false;
  }
  let isFirst = true;
  const manTiles = player.hand.handTiles
    .filter(i => isWan(i))
    .filter(i => {
      if (!isFirst) {
        return true;
      }
      if (i.id === player.winTile?.id) {
        isFirst = false;
        return false;
      }
      return true;
    });
  return toCode(manTiles) === "1112345678999m";
};

export const suukantsu = (player: Player, agariDataInfo: AgariDataInfo) => {
  return player.hand.fuluTiles.reduce(
    (x, y) => x + (y.tiles.length === 4 ? 1 : 0),
    0
  );
};

export default {
  kokushiMusou,
  kokushiMusouJuusanMenmachi,
  daisangen,
  suuankou,
  suuankouTanki,
  shousuushii,
  daisuushii,
  tsuuiisou,
  ryuuiisou,
  chinroutou,
  chuurenPoutou,
  junseiChuurenPoutou,
  suukantsu
};
