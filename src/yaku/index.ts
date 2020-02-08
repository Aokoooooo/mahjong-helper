import yakuTest from "./yaku";
import yakumanTest from "./yakuman";
import { yakuTypes, yakumanTypes } from "./yakuData";
import { Player } from "../modal/Player";
import { AgariDataInfo } from "../service/agari";

export { yakuTypes, yakumanTypes };

export const checkYakuman = (player: Player, agariDataInfo: AgariDataInfo) => {
  const isMenzenchin = player.hand.fuluTiles.length === 0;
  let yakumanTime = 0;
  const yakumanList: typeof yakumanTypes[keyof typeof yakumanTypes][] = [];
  Reflect.ownKeys(yakumanTest).forEach(i => {
    const key = i as keyof typeof yakumanTest;
    if (yakumanTest[key](player, agariDataInfo)) {
      yakumanList.push(yakumanTypes[key]);
      yakumanTime += getYakumanTimeByIsMenzenchin(isMenzenchin, key);
    }
  });
  return { yakumanTime, yakumanList };
};

export const checkYaku = (player: Player, agariDataInfo: AgariDataInfo) => {
  const isMenzenchin = player.hand.fuluTiles.length === 0;
  let yakuHan = 0;
  const yakuList: typeof yakuTypes[keyof typeof yakuTypes][] = [];
  Reflect.ownKeys(yakuTest).forEach(i => {
    const key = i as keyof typeof yakuTest;
    if (yakuTest[key](player, agariDataInfo)) {
      yakuList.push(yakuTypes[key]);
      yakuHan += getYakuHanByIsMenzenchin(isMenzenchin, key);
    }
  });
  return { yakuHan, yakuList };
};

const getYakuHanByIsMenzenchin = (
  isMenzenchin: boolean,
  key: keyof typeof yakuTypes
) => {
  return isMenzenchin ? yakuTypes[key].base : yakuTypes[key].naki;
};
const getYakumanTimeByIsMenzenchin = (
  isMenzenchin: boolean,
  key: keyof typeof yakumanTypes
) => {
  return isMenzenchin ? yakumanTypes[key].base : yakumanTypes[key].naki;
};
