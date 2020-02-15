import { Player } from "../modal/player";
import { AgariDataInfo } from "../service/agari";
import {
  isJi,
  isYaochu,
  isMan,
  isPin,
  isSou,
  isRoutou,
  isSangen
} from "../utils/tile";
import { Tile } from "../modal/tile";
import { mentsuType } from "../modal/mentsu";
import { getAnkouNum, getAnkanNum, getMinkanNum } from "../utils/player";

// Ryanmen	両面
// Penchan	辺張
// Shanpon	双ポン
// Kanchan	嵌張
// Tanki	単騎
export const pinfu = (player: Player, agariDataInfo: AgariDataInfo) => {
  // 门清限定
  if (player.hand.fuluTiles.length) {
    return false;
  }
  if (isJi(agariDataInfo.jantouTile)) {
    return false;
  }
  return agariDataInfo.shuntsuFirstTiles.some(
    i =>
      isValidPinfuShuntsuFirstTile(i) &&
      player.winTile &&
      (i.id === player.winTile.id || i.id + 2 === player.winTile.id)
  );
};

export const isValidPinfuShuntsuFirstTile = (tile: Tile) => {
  return tile.id % 9 > 0 && tile.id % 9 < 6;
};

export const riichi = (player: Player, agariDataInfo: AgariDataInfo) => {
  return player.isRiichi;
};

export const menzenchinTsumohou = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
  return player.isTsumo && player.hand.fuluTiles.length === 0;
};

export const iipeikou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.isIipeikou;
};

export const tanyao = (player: Player, agariDataInfo: AgariDataInfo) => {
  return (
    player.hand.handTiles.every(i => !isYaochu(i)) &&
    player.hand.fuluTiles.every(i => i.tiles.every(j => !isYaochu(j)))
  );
};

const yakuhaiHelper = (
  player: Player,
  agariDataInfo: AgariDataInfo,
  targetTile: Tile | null
) => {
  return (
    agariDataInfo.koutsuTiles.some(i => i.id === targetTile?.id) ||
    player.hand.fuluTiles.some(i =>
      i.type === mentsuType.shuntsu ? false : i.tiles[0].id === targetTile?.id
    )
  );
};

export const yakuhaiJikaze = (player: Player, agariDataInfo: AgariDataInfo) => {
  return yakuhaiHelper(player, agariDataInfo, player.selfWindTile);
};

export const yakuhaiBakaze = (player: Player, agariDataInfo: AgariDataInfo) => {
  return yakuhaiHelper(player, agariDataInfo, player.roundWindTile);
};

export const yakuhaiHaku = (player: Player, agariDataInfo: AgariDataInfo) => {
  return yakuhaiHelper(player, agariDataInfo, Tile.create("z5"));
};

export const yakuhaiHatsu = (player: Player, agariDataInfo: AgariDataInfo) => {
  return yakuhaiHelper(player, agariDataInfo, Tile.create("z6"));
};

export const yakuhaiChun = (player: Player, agariDataInfo: AgariDataInfo) => {
  return yakuhaiHelper(player, agariDataInfo, Tile.create("z7"));
};

export const chiitoitsu = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.isChiitoi;
};

export const daburuRiichi = (player: Player, agariDataInfo: AgariDataInfo) => {
  return player.isDaburuRiichi;
};

export const ikkitsuukan = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.isIkkitsuukan;
};

export const sanshokuDoujun = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
  const manTiles: Tile[] = [];
  const pinTiles: Tile[] = [];
  const souTiles: Tile[] = [];

  player.hand.fuluTiles
    .filter(i => i.type === mentsuType.shuntsu)
    .map(i => i.tiles[0])
    .concat(agariDataInfo.shuntsuFirstTiles)
    .forEach((i: Tile) => {
      if (isMan(i)) {
        manTiles.push(i);
      }
      if (isPin(i)) {
        pinTiles.push(i);
      }
      if (isSou(i)) {
        souTiles.push(i);
      }
    });

  for (const man of manTiles) {
    for (const pin of pinTiles) {
      for (const sou of souTiles) {
        if (man.id + 9 === pin.id && pin.id + 9 === sou.id) {
          return true;
        }
      }
    }
  }
  return false;
};

export const honchantaiyaochuu = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
  if (
    player.hand.fuluTiles.every(i => i.tiles.every(j => isJi(j))) &&
    player.hand.handTiles.every(i => isJi(i))
  ) {
    return false;
  }
  if (
    player.hand.fuluTiles.every(i => i.tiles.every(j => isRoutou(j))) &&
    player.hand.handTiles.every(i => isRoutou(i))
  ) {
    return false;
  }
  if (toitoihou(player, agariDataInfo)) {
    return false;
  }
  if (!isYaochu(agariDataInfo.jantouTile)) {
    return false;
  }
  if (
    player.hand.fuluTiles.every(i => i.tiles.some(j => isYaochu(j))) &&
    agariDataInfo.koutsuTiles.every(i => isYaochu(i)) &&
    agariDataInfo.shuntsuFirstTiles.every(i => isYaochu(i) || i.id % 9 === 6)
  ) {
    return true;
  }
  return false;
};

export const toitoihou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return (
    agariDataInfo.koutsuTiles.length +
      player.hand.fuluTiles.reduce(
        (x, y) => x + (y.type === mentsuType.shuntsu ? 0 : 1),
        0
      ) ===
    4
  );
};

export const sanshokuDoukou = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
  const manTiles: Tile[] = [];
  const pinTiles: Tile[] = [];
  const souTiles: Tile[] = [];

  player.hand.fuluTiles
    .filter(i => i.type !== mentsuType.shuntsu)
    .map(i => i.tiles[0])
    .concat(agariDataInfo.koutsuTiles)
    .forEach((i: Tile) => {
      if (isMan(i)) {
        manTiles.push(i);
      }
      if (isPin(i)) {
        pinTiles.push(i);
      }
      if (isSou(i)) {
        souTiles.push(i);
      }
    });
  for (const man of manTiles) {
    for (const pin of pinTiles) {
      for (const sou of souTiles) {
        if (man.id + 9 === pin.id && pin.id + 9 === sou.id) {
          return true;
        }
      }
    }
  }
  return false;
};

export const sanankou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return getAnkouNum(player, agariDataInfo) === 3;
};

export const sankantsu = (player: Player, agariDataInfo: AgariDataInfo) => {
  return getAnkanNum(player) + getMinkanNum(player) === 3;
};

export const honroutou = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (
    player.hand.fuluTiles.every(i => i.tiles.every(j => isJi(j))) &&
    player.hand.handTiles.every(i => isJi(i))
  ) {
    return false;
  }
  if (
    player.hand.fuluTiles.every(i => i.tiles.every(j => isRoutou(j))) &&
    player.hand.handTiles.every(i => isRoutou(i))
  ) {
    return false;
  }
  return (
    player.hand.fuluTiles.every(i =>
      i.tiles.every(j => isRoutou(j) || isJi(j))
    ) && player.hand.handTiles.every(i => isRoutou(i) || isJi(i))
  );
};

export const shousangen = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (!isSangen(agariDataInfo.jantouTile)) {
    return false;
  }
  const fuluSangenKoutsuNum = player.hand.fuluTiles.filter(
    i => i.type === mentsuType.koutsu && isSangen(i.tiles[0])
  ).length;
  const handSangenKoutsuNum = agariDataInfo.koutsuTiles.filter(i => isSangen(i))
    .length;
  return fuluSangenKoutsuNum + handSangenKoutsuNum === 2;
};

export const ryanpeikou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.isRyanpeikou;
};

export const junchantaiyaochuu = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
  if (
    player.hand.handTiles.every(i => isRoutou(i)) &&
    player.hand.fuluTiles.every(
      i => i.type !== mentsuType.shuntsu && isRoutou(i.tiles[0])
    )
  ) {
    return false;
  }
  if (
    player.hand.handTiles.some(i => isJi(i)) ||
    player.hand.fuluTiles.some(i => isJi(i.tiles[0]))
  ) {
    return false;
  }
  if (!isRoutou(agariDataInfo.jantouTile)) {
    return false;
  }

  if (
    player.hand.fuluTiles.every(i => i.tiles.some(j => isRoutou(j))) &&
    agariDataInfo.koutsuTiles.every(i => isRoutou(i)) &&
    agariDataInfo.shuntsuFirstTiles.every(i => isRoutou(i) || i.id % 9 === 6)
  ) {
    return true;
  }
  return false;
};

const iisouHelper = (player: Player, agariDataInfo: AgariDataInfo) => {
  let hasMan = false;
  let hasPin = false;
  let hasSou = false;
  const checker = (tile: Tile) => {
    if (isMan(tile)) {
      hasMan = true;
    } else if (isPin(tile)) {
      hasPin = true;
    } else if (isSou(tile)) {
      hasSou = true;
    }
  };
  player.hand.fuluTiles.forEach(i => i.tiles.forEach(j => checker(j)));
  player.hand.handTiles.forEach(i => checker(i));
  return (hasMan ? 1 : 0) + (hasPin ? 1 : 0) + (hasSou ? 1 : 0) === 1;
};

export const honiisou = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (
    player.hand.fuluTiles.every(i => i.tiles.some(j => !isJi(j))) &&
    player.hand.handTiles.every(i => !isJi(i))
  ) {
    return false;
  }
  return iisouHelper(player, agariDataInfo);
};

export const chiniisou = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (
    player.hand.fuluTiles.some(i => i.tiles.some(j => isJi(j))) ||
    player.hand.handTiles.some(i => isJi(i))
  ) {
    return false;
  }
  return iisouHelper(player, agariDataInfo);
};

export default {
  pinfu,
  riichi,
  menzenchinTsumohou,
  iipeikou,
  tanyao,
  yakuhaiJikaze,
  yakuhaiBakaze,
  yakuhaiHaku,
  yakuhaiHatsu,
  yakuhaiChun,

  chiitoitsu,
  daburuRiichi,
  ikkitsuukan,
  sanshokuDoujun,
  honchantaiyaochuu,
  toitoihou,
  sanshokuDoukou,
  sanankou,
  sankantsu,
  honroutou,
  shousangen,

  ryanpeikou,
  junchantaiyaochuu,
  honiisou,

  chiniisou
};
