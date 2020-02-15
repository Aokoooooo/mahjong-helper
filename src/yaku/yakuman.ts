import { Player } from "../modal/Player";
import { AgariDataInfo } from "../service/agari";
import {
  isYaochu,
  isSangen,
  isKaze,
  isJi,
  isRoutou,
  isMan
} from "../utils/tile";
import { parse, toCode } from "../service/parse";
import { getAnkouNum, getAnkanNum, getMinkanNum } from "../utils/player";

const kokushiMusouHelper = (player: Player, isJuusanMen: boolean) => {
  if (player.hand.fuluTiles.length) {
    return false;
  }
  const set = new Set<number>(player.hand.handTiles.map(i => i.id));
  if (set.size !== 13) {
    return false;
  }
  if (player.hand.handTiles.some(i => !isYaochu(i))) {
    return false;
  }
  const checkNum = isJuusanMen ? 2 : 1;
  const tileNum = player.hand.handTiles.filter(i => i.id === player.winTile?.id)
    .length;
  if (!tileNum) {
    return checkNum === 1;
  }
  return tileNum === checkNum;
};

export const kokushiMusou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return kokushiMusouHelper(player, false);
};

export const kokushiMusouJuusanMenmachi = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
  return kokushiMusouHelper(player, true);
};

export const daisangen = (player: Player, agariDataInfo: AgariDataInfo) => {
  const fuluNum = player.hand.fuluTiles.reduce(
    (x, y) => x + (y.tiles.some(i => isSangen(i)) ? 1 : 0),
    0
  );
  const handNum = agariDataInfo.koutsuTiles.reduce(
    (x, y) => x + (isSangen(y) ? 1 : 0),
    0
  );
  return fuluNum + handNum === 3;
};

const suuankouHelper = (player: Player, agariDataInfo: AgariDataInfo) => {
  return getAnkouNum(player, agariDataInfo) + getAnkanNum(player) === 4;
};

export const suuankou = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (!suuankouHelper(player, agariDataInfo)) {
    return false;
  }
  if (!player.winTile) {
    return true;
  }

  return player.winTile.id !== agariDataInfo.jantouTile.id;
};

export const suuankouTanki = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (!suuankouHelper(player, agariDataInfo)) {
    return false;
  }
  return player.winTile?.id === agariDataInfo.jantouTile.id;
};

export const shousuushii = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (!isKaze(agariDataInfo.jantouTile)) {
    return false;
  }
  const fuluNum = player.hand.fuluTiles.reduce(
    (x, y) => x + (y.tiles.some(i => isKaze(i)) ? 1 : 0),
    0
  );
  const handNum = agariDataInfo.koutsuTiles.reduce(
    (x, y) => x + (isKaze(y) ? 1 : 0),
    0
  );
  return fuluNum + handNum === 3;
};

export const daisuushii = (player: Player, agariDataInfo: AgariDataInfo) => {
  const fuluNum = player.hand.fuluTiles.reduce(
    (x, y) => x + (y.tiles.some(i => isKaze(i)) ? 1 : 0),
    0
  );
  const handNum = agariDataInfo.koutsuTiles.reduce(
    (x, y) => x + (isKaze(y) ? 1 : 0),
    0
  );
  return fuluNum + handNum === 4;
};

export const tsuuiisou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return (
    player.hand.fuluTiles.every(i => i.tiles.some(i => isJi(i))) &&
    player.hand.handTiles.every(i => isJi(i))
  );
};

export const ryuuiisou = (player: Player, agariDataInfo: AgariDataInfo) => {
  const ryuuTileIdSet = new Set<number>(
    parse("23468s6z").handTiles.map(i => i.id)
  );

  return (
    player.hand.fuluTiles.every(i =>
      i.tiles.every(j => ryuuTileIdSet.has(j.id))
    ) && player.hand.handTiles.every(i => ryuuTileIdSet.has(i.id))
  );
};

export const chinroutou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return (
    player.hand.fuluTiles.every(i => i.tiles.some(j => isRoutou(j))) &&
    player.hand.handTiles.every(i => isRoutou(i))
  );
};

const chuurenPoutouHelper = (
  player: Player,
  agariDataInfo: AgariDataInfo,
  isjunsei: boolean
) => {
  if (!agariDataInfo.isChuurenPoutou) {
    return false;
  }
  if (!player.winTile) {
    return !isjunsei;
  }
  let isFirst = true;
  const manTiles = player.hand.handTiles
    .filter(i => isMan(i))
    .filter(i => {
      if (!isFirst) {
        return true;
      }
      if (i.id === player.winTile!.id) {
        isFirst = false;
        return false;
      }
      return true;
    });
  return isjunsei
    ? toCode(manTiles) === "1112345678999m"
    : toCode(manTiles) !== "1112345678999m";
};

export const chuurenPoutou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return chuurenPoutouHelper(player, agariDataInfo, false);
};

export const junseiChuurenPoutou = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
  return chuurenPoutouHelper(player, agariDataInfo, true);
};

export const suukantsu = (player: Player, agariDataInfo: AgariDataInfo) => {
  return getMinkanNum(player) + getAnkanNum(player) === 4;
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
