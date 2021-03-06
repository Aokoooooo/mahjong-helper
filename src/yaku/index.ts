import yakuTest from "./yaku";
import yakumanTest from "./yakuman";
import { yakuTypes, yakumanTypes } from "./yakuData";
import { Player } from "../modal/Player";
import { AgariDataInfo } from "../service/agari";
import { calculateFu } from "../service/fu";
import { calculatePoint } from "../service/point";
import { mentsuType } from "../modal/mentsu";

export { yakuTypes, yakumanTypes, yakuTest, yakumanTest };

export const checkYakumanHelper = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
  const isMenzenchin =
    player.hand.fuluTiles.filter(i => i.type !== mentsuType.ankan).length === 0;
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

export const checkYakuHelper = (
  player: Player,
  agariDataInfo: AgariDataInfo
) => {
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

export const checkYaku = (player: Player, agariDataInfo: AgariDataInfo) => {
  const yakumanResult = checkYakumanHelper(player, agariDataInfo);
  const yakuResult = checkYakuHelper(player, agariDataInfo);
  const fu = calculateFu(player, agariDataInfo);
  const point = calculatePoint(
    yakuResult.yakuHan,
    fu,
    yakumanResult.yakumanTime
  );
  return {
    isYakuman: !!yakumanResult.yakumanTime,
    yakumanResult,
    yakuResult,
    fu,
    point
  };
};
export type CheckYakuReturenType = ReturnType<typeof checkYaku>;

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
