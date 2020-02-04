interface IYakuTypeItem {
  [key: string]: {
    name: string;
    han: {
      base: number;
      naki: number;
    };
  };
}
export const yakuTypes: IYakuTypeItem = {
  pinfu: { name: "平和", han: { base: 1, naki: 0 } },
  riichi: { name: "立直", han: { base: 1, naki: 0 } },
  ippatsu: { name: "一发", han: { base: 1, naki: 0 } },
  menzenchinTsumohou: { name: "门前清自摸和", han: { base: 1, naki: 0 } },
  iipeikou: { name: "一杯口", han: { base: 1, naki: 0 } },
  tanyao: { name: "断幺", han: { base: 1, naki: 1 } },
  yakuhai: { name: "役牌", han: { base: 1, naki: 1 } },
  haiteiRaoyue: { name: "海底捞月", han: { base: 1, naki: 1 } },
  houteiRaoyui: { name: "河底捞鱼", han: { base: 1, naki: 1 } },
  Chankan: { name: "抢杠", han: { base: 1, naki: 1 } },
  rinshanKaihou: { name: "岭上开花", han: { base: 1, naki: 1 } },

  chiitoitsu: { name: "七对子", han: { base: 2, naki: 0 } },
  daburuRiichi: { name: "W立直", han: { base: 2, naki: 0 } },
  ikkitsuukan: { name: "一气贯通", han: { base: 2, naki: 1 } },
  sanshokuDoujun: { name: "三色同顺", han: { base: 2, naki: 1 } },
  honchantaiyaochuu: { name: "混全带幺九", han: { base: 2, naki: 1 } },
  toitoihou: { name: "对对和", han: { base: 2, naki: 2 } },
  sanshokuDoukou: { name: "三色同刻", han: { base: 2, naki: 2 } },
  sanankou: { name: "三暗刻", han: { base: 2, naki: 2 } },
  sankantsu: { name: "三杠子", han: { base: 2, naki: 2 } },
  honroutou: { name: "混老头", han: { base: 2, naki: 2 } },
  shousangen: { name: "小三元", han: { base: 2, naki: 2 } },

  ryanpeikou: { name: "两杯口", han: { base: 3, naki: 0 } },
  junchantaiyaochuu: { name: "纯全带幺九", han: { base: 3, naki: 2 } },
  honiisou: { name: "混一色", han: { base: 3, naki: 2 } },

  chiniisou: { name: "清一色", han: { base: 6, naki: 5 } }
};
