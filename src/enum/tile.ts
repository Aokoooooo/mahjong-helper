/**
 * 牌型枚举
 */
export const tileEnum = {
  m0: { id: 4, name: "五", isRedDora: true },
  m1: { id: 0, name: "一", isRedDora: false },
  m2: { id: 1, name: "二", isRedDora: false },
  m3: { id: 2, name: "三", isRedDora: false },
  m4: { id: 3, name: "四", isRedDora: false },
  m5: { id: 4, name: "五", isRedDora: false },
  m6: { id: 5, name: "六", isRedDora: false },
  m7: { id: 6, name: "七", isRedDora: false },
  m8: { id: 7, name: "八", isRedDora: false },
  m9: { id: 8, name: "九", isRedDora: false },

  p0: { id: 13, name: "⑤", isRedDora: true },
  p1: { id: 9, name: "①", isRedDora: false },
  p2: { id: 10, name: "②", isRedDora: false },
  p3: { id: 11, name: "③", isRedDora: false },
  p4: { id: 12, name: "④", isRedDora: false },
  p5: { id: 13, name: "⑤", isRedDora: false },
  p6: { id: 14, name: "⑥", isRedDora: false },
  p7: { id: 15, name: "⑦", isRedDora: false },
  p8: { id: 16, name: "⑧", isRedDora: false },
  p9: { id: 17, name: "⑨", isRedDora: false },

  s0: { id: 22, name: "5", isRedDora: true },
  s1: { id: 18, name: "1", isRedDora: false },
  s2: { id: 19, name: "2", isRedDora: false },
  s3: { id: 20, name: "3", isRedDora: false },
  s4: { id: 21, name: "4", isRedDora: false },
  s5: { id: 22, name: "5", isRedDora: false },
  s6: { id: 23, name: "6", isRedDora: false },
  s7: { id: 24, name: "7", isRedDora: false },
  s8: { id: 25, name: "8", isRedDora: false },
  s9: { id: 26, name: "9", isRedDora: false },

  z1: { id: 27, name: "东", isRedDora: false },
  z2: { id: 28, name: "南", isRedDora: false },
  z3: { id: 29, name: "西", isRedDora: false },
  z4: { id: 30, name: "北", isRedDora: false },
  z5: { id: 31, name: "白", isRedDora: false },
  z6: { id: 32, name: "发", isRedDora: false },
  z7: { id: 33, name: "中", isRedDora: false }
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
