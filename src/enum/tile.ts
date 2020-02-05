type TileEnumType = Record<
  string,
  { id: number; name: string; isRedDora?: boolean }
>;
/**
 * 牌型枚举
 */
export const tileEnum: TileEnumType = {
  m0: { id: 4, name: "五", isRedDora: true },
  m1: { id: 0, name: "一" },
  m2: { id: 1, name: "二" },
  m3: { id: 2, name: "三" },
  m4: { id: 3, name: "四" },
  m5: { id: 4, name: "五" },
  m6: { id: 5, name: "六" },
  m7: { id: 6, name: "七" },
  m8: { id: 7, name: "八" },
  m9: { id: 8, name: "九" },

  p0: { id: 13, name: "⑤", isRedDora: true },
  p1: { id: 9, name: "①" },
  p2: { id: 10, name: "②" },
  p3: { id: 11, name: "③" },
  p4: { id: 12, name: "④" },
  p5: { id: 13, name: "⑤" },
  p6: { id: 14, name: "⑥" },
  p7: { id: 15, name: "⑦" },
  p8: { id: 16, name: "⑧" },
  p9: { id: 17, name: "⑨" },

  s0: { id: 22, name: "5", isRedDora: true },
  s1: { id: 18, name: "1" },
  s2: { id: 19, name: "2" },
  s3: { id: 20, name: "3" },
  s4: { id: 21, name: "4" },
  s5: { id: 22, name: "5" },
  s6: { id: 23, name: "6" },
  s7: { id: 24, name: "7" },
  s8: { id: 25, name: "8" },
  s9: { id: 26, name: "9" },

  z1: { id: 27, name: "东" },
  z2: { id: 28, name: "南" },
  z3: { id: 29, name: "西" },
  z4: { id: 30, name: "北" },
  z5: { id: 31, name: "白" },
  z6: { id: 32, name: "发" },
  z7: { id: 33, name: "中" }
};

/**
 * 牌型缩写数组
 */
export const tileEnumKeys = Object.keys(tileEnum) as TileEnumKeyType[];
/**
 * 牌型值数组
 */
export const tileEnumValues = Object.values(tileEnum);

/**
 * 牌型缩写类型
 */
export type TileEnumKeyType = keyof typeof tileEnum;
/**
 * 牌型值类型
 */
export type TileEnumValueType = typeof tileEnum[TileEnumKeyType];
