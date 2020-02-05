import { Player } from "../modal/Player";

export const yakuTypes = {
  pinfu: { name: "平和", base: 1, naki: 0 },
  riichi: { name: "立直", base: 1, naki: 0 },
  ippatsu: { name: "一发", base: 1, naki: 0 },
  menzenchinTsumohou: { name: "门前清自摸和", base: 1, naki: 0 },
  iipeikou: { name: "一杯口", base: 1, naki: 0 },
  tanyao: { name: "断幺", base: 1, naki: 1 },
  yakuhai: { name: "役牌", base: 1, naki: 1 },
  haiteiRaoyue: { name: "海底捞月", base: 1, naki: 1 },
  houteiRaoyui: { name: "河底捞鱼", base: 1, naki: 1 },
  chankan: { name: "抢杠", base: 1, naki: 1 },
  rinshanKaihou: { name: "岭上开花", base: 1, naki: 1 },

  chiitoitsu: { name: "七对子", base: 2, naki: 0 },
  daburuRiichi: { name: "W立直", base: 2, naki: 0 },
  ikkitsuukan: { name: "一气贯通", base: 2, naki: 1 },
  sanshokuDoujun: { name: "三色同顺", base: 2, naki: 1 },
  honchantaiyaochuu: { name: "混全带幺九", base: 2, naki: 1 },
  toitoihou: { name: "对对和", base: 2, naki: 2 },
  sanshokuDoukou: { name: "三色同刻", base: 2, naki: 2 },
  sanankou: { name: "三暗刻", base: 2, naki: 2 },
  sankantsu: { name: "三杠子", base: 2, naki: 2 },
  honroutou: { name: "混老头", base: 2, naki: 2 },
  shousangen: { name: "小三元", base: 2, naki: 2 },

  ryanpeikou: { name: "两杯口", base: 3, naki: 0 },
  junchantaiyaochuu: { name: "纯全带幺九", base: 3, naki: 2 },
  honiisou: { name: "混一色", base: 3, naki: 2 },

  chiniisou: { name: "清一色", base: 6, naki: 5 }
};

export const yakumanTypes = {
  kazoeYakuman: { name: "累计役满", base: 1, naki: 1 },
  kokushiMusou: { name: "国士无双", base: 1, naki: 0 },
  kokushiMusouJuusanMenmachi: { name: "国士无双十三面", base: 2, naki: 0 },
  daisangen: { name: "大三元", base: 1, naki: 1 },
  suuankou: { name: "四暗刻", base: 1, naki: 0 },
  suuankouTanki: { name: "四暗刻单骑", base: 2, naki: 0 },
  shousuushii: { name: "小四喜", base: 1, naki: 1 },
  daisuushii: { name: "大四喜", base: 2, naki: 2 },
  Tsuuiisou: { name: "字一色", base: 1, naki: 1 },
  ryuuiisou: { name: "绿一色", base: 1, naki: 1 },
  chinroutou: { name: "清老头", base: 1, naki: 1 },
  chuurenPoutou: { name: "九宝莲灯", base: 1, naki: 0 },
  junseiChuurenPoutou: { name: "纯正九宝莲灯", base: 2, naki: 0 },
  suukantsu: { name: "四杠子", base: 1, naki: 1 },
  tenhou: { name: "天和", base: 1, naki: 0 },
  chiihou: { name: "地和", base: 1, naki: 0 }
};

export abstract class AbstractYaku {
  public readonly type: typeof yakuTypes[keyof typeof yakuTypes];

  constructor(type: typeof yakuTypes[keyof typeof yakuTypes]) {
    this.type = type;
  }

  public allowNaki() {
    return !this.type.naki;
  }

  public abstract test(player: Player): boolean;
}
