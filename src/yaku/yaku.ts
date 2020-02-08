import { Player } from "../modal/player";
import { AgariDataInfo } from "../service/agari";
import {
  isZi,
  isYaojiu,
  isWan,
  isTong,
  isSuo,
  isLaotou,
  isSanyuan
} from "../utils/tile";
import { tileEnum } from "../enum/tile";
import { Tile } from "../modal/tile";
import { mentsuType } from "../modal/mentsu";

export const pinhu = (player: Player, agariDataInfo: AgariDataInfo) => {
  // 门清限定
  if (player.hand.fuluTiles.length) {
    return false;
  }
  if (isZi(agariDataInfo.jantouTile)) {
    return false;
  }
  return agariDataInfo.shuntsuFirstTiles.some(
    i =>
      (i.id % 9 < 6 && i.id === player.winTile?.id) ||
      (i.id % 9 > 0 && i.id + 2 === player.winTile?.id)
  );
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
    player.hand.handTiles.every(i => !isYaojiu(i)) &&
    player.hand.fuluTiles.every(i => i.tiles.every(j => !isYaojiu(j)))
  );
};

export const yakuhaiJikaze = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.koutsuTiles.some(i => i.id === player.selfWindTile.id);
};

export const yakuhaiBakaze = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.koutsuTiles.some(i => i.id === player.roundWindTile.id);
};

export const yakuhaiHaku = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.koutsuTiles.some(i => i.id === tileEnum.z5.id);
};

export const yakuhaiHatsu = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.koutsuTiles.some(i => i.id === tileEnum.z6.id);
};

export const yakuhaiChun = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.koutsuTiles.some(i => i.id === tileEnum.z7.id);
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
      if (isWan(i)) {
        manTiles.push(i);
      } else if (isTong(i)) {
        pinTiles.push(i);
      } else if (isSuo(i)) {
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
    player.hand.fuluTiles.every(i => i.tiles.every(j => isZi(j))) &&
    player.hand.handTiles.every(i => isZi(i))
  ) {
    return false;
  }
  if (
    player.hand.fuluTiles.every(i => i.tiles.every(j => isLaotou(j))) &&
    player.hand.handTiles.every(i => isLaotou(i))
  ) {
    return false;
  }
  if (toitoihou(player, agariDataInfo)) {
    return false;
  }
  if (!isYaojiu(agariDataInfo.jantouTile)) {
    return false;
  }
  if (
    player.hand.fuluTiles.every(i => i.tiles.some(j => isYaojiu(j))) &&
    agariDataInfo.koutsuTiles.every(i => isYaojiu(i)) &&
    agariDataInfo.shuntsuFirstTiles.every(i => isYaojiu(i) || i.id % 9 === 6)
  ) {
    return true;
  }
  return false;
};

export const toitoihou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return (
    agariDataInfo.koutsuTiles.length +
      player.hand.fuluTiles.reduce(
        (x, y) => (x + y.type === mentsuType.shuntsu ? 0 : 1),
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
      if (isWan(i)) {
        manTiles.push(i);
      } else if (isTong(i)) {
        pinTiles.push(i);
      } else if (isSuo(i)) {
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
  const fuluAnkanNum = player.hand.fuluTiles.filter(
    i => i.type === mentsuType.ankan
  ).length;
  const handkoutsuNum = agariDataInfo.koutsuTiles.some(
    i => i.id === player.winTile?.id
  )
    ? agariDataInfo.koutsuTiles.length - 1
    : agariDataInfo.koutsuTiles.length;
  return fuluAnkanNum + handkoutsuNum === 3;
};

export const sankantsu = (player: Player, agariDataInfo: AgariDataInfo) => {
  return player.hand.fuluTiles.filter(i => i.tiles.length === 4).length === 3;
};

export const honroutou = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (
    player.hand.fuluTiles.every(i => i.tiles.every(j => isZi(j))) &&
    player.hand.handTiles.every(i => isZi(i))
  ) {
    return false;
  }
  if (
    player.hand.fuluTiles.every(i => i.tiles.every(j => isLaotou(j))) &&
    player.hand.handTiles.every(i => isLaotou(i))
  ) {
    return false;
  }
  return (
    player.hand.fuluTiles.every(i =>
      i.tiles.every(j => isLaotou(j) || isZi(j))
    ) && player.hand.handTiles.every(i => isLaotou(i) || isZi(i))
  );
};

export const shousangen = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (!isSanyuan(agariDataInfo.jantouTile)) {
    return false;
  }
  const fuluSanyuanKoutsuNum = player.hand.fuluTiles
    .filter(i => i.type !== mentsuType.shuntsu)
    .filter(i => isSanyuan(i.tiles[0])).length;
  const handSanyuanKoutsuNum = agariDataInfo.koutsuTiles.filter(i =>
    isSanyuan(i)
  ).length;
  return fuluSanyuanKoutsuNum + handSanyuanKoutsuNum === 2;
};

export const ryanpeikou = (player: Player, agariDataInfo: AgariDataInfo) => {
  return agariDataInfo.isRyanpeikou;
};

export const junchantaiyaochuu = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
  if (
    player.hand.handTiles.every(i => isLaotou(i)) &&
    player.hand.fuluTiles.every(
      i => i.type !== mentsuType.shuntsu && isLaotou(i.tiles[0])
    )
  ) {
    return false;
  }
  if (
    player.hand.handTiles.some(i => isZi(i)) ||
    player.hand.fuluTiles.some(
      i => i.type !== mentsuType.shuntsu && isZi(i.tiles[0])
    )
  ) {
    return false;
  }
  if (!isLaotou(agariDataInfo.jantouTile)) {
    return false;
  }

  if (
    player.hand.fuluTiles.every(i => i.tiles.some(j => isLaotou(j))) &&
    agariDataInfo.koutsuTiles.every(i => isYaojiu(i)) &&
    agariDataInfo.shuntsuFirstTiles.every(i => isYaojiu(i) || i.id % 9 === 6)
  ) {
    return true;
  }
  return false;
};

export const honiisou = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (
    player.hand.fuluTiles.every(i => i.tiles.every(j => !isZi(j))) &&
    player.hand.handTiles.every(i => !isZi(i))
  ) {
    return false;
  }
  let hasMan = false;
  let hasPin = false;
  let hasSou = false;
  const checker = (tile: Tile) => {
    if (isWan(tile)) {
      hasMan = true;
    } else if (isTong(tile)) {
      hasPin = true;
    } else if (isSuo(tile)) {
      hasSou = true;
    }
  };
  player.hand.fuluTiles.forEach(i => i.tiles.forEach(j => checker(j)));
  player.hand.handTiles.forEach(i => checker(i));
  return (hasMan ? 1 : 0) + (hasPin ? 1 : 0) + (hasSou ? 1 : 0) === 1;
};

export const chiniisou = (player: Player, agariDataInfo: AgariDataInfo) => {
  if (
    player.hand.fuluTiles.some(i => i.tiles.some(j => isZi(j))) &&
    player.hand.handTiles.some(i => isZi(i))
  ) {
    return false;
  }
  let hasMan = false;
  let hasPin = false;
  let hasSou = false;
  const checker = (tile: Tile) => {
    if (isWan(tile)) {
      hasMan = true;
    } else if (isTong(tile)) {
      hasPin = true;
    } else if (isSuo(tile)) {
      hasSou = true;
    }
  };
  player.hand.fuluTiles.forEach(i => i.tiles.forEach(j => checker(j)));
  player.hand.handTiles.forEach(i => checker(i));
  return (hasMan ? 1 : 0) + (hasPin ? 1 : 0) + (hasSou ? 1 : 0) === 1;
};
