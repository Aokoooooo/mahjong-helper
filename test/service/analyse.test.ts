import { analyse } from "../../src/service/analyse";
import { encode } from "../../src/service/encode";
import { parse } from "../../src/service/parse";

describe("service-analyse", () => {
  test("input params can't be null", () => {
    expect(analyse).toThrow("输入不可为空");
  });
  test("length of input code should be a even number", () => {
    expect(() => analyse("1")).toThrow("输入值长度必须为偶数,(1)");
    expect(() => analyse("111")).toThrow("输入值长度必须为偶数,(111)");
    expect(() => analyse("13578")).toThrow("输入值长度必须为偶数,(13578)");
  });
  test("error input is not allowed", () => {
    expect(() => analyse("19")).toThrow("错误的入参 19,入参的每一位应为0-4");
    expect(() => analyse("1a")).toThrow("错误的入参 1a,入参的每一位应为0-4");
    expect(() => analyse("1^")).toThrow("错误的入参 1^,入参的每一位应为0-4");
  });
  test("sum of tiles should be 3n+2", () => {
    expect(() => analyse("13")).toThrow("手牌数量必须为3n+2,(13)");
    expect(() => analyse("33")).toThrow("手牌数量必须为3n+2,(33)");
    expect(() => analyse("33131313")).toThrow("手牌数量必须为3n+2,(33131313)");
    expect(() => analyse("33232323")).toThrow("手牌数量必须为3n+2,(33232323)");
    expect(() => analyse("333323231313")).toThrow(
      "手牌数量必须为3n+2,(333323231313)"
    );
  });
  test("analyse work well", () => {
    const codes: ICodes = {
      "-1": ["234444m22p123s666z", "11s", "12344s", "11155m"],
      "0": ["45s", "12p", "35z"],
      "1": ["36s116z", "22346z", "44m58s6z"],
      "2": ["444m147p14s", "123s467z15p"],
      "3": ["147m147p11s", "1223456z1p", "111m17p147s114z", "347m147p145s11z"],
      "4": [
        "147m147p14s",
        "1234567z1p",
        "127m147p147s11z",
        "347m147p147s11z",
        "146m147p147s11z"
      ],
      "5": [
        "147m147p147s11z",
        "258m228p12345z",
        "458m258p12345z",
        "248m258p12345z",
        "128m258p12345z",
        "1238m258p2234567z"
      ],
      "6": ["147m147p147s14z", "258m258p12345z", "1238m258p1234567z"],
      "7": ["117m147p147s12345z", "145m147p147s12345z", "146m147p147s12345z"],
      "8": ["147m147p147s12345z", "1234567z259m259p6s"]
    };
    // xiangTing = 2(requiredMianZi - mianZiNum) - subMianZiNum - hasPair;
    Object.keys(codes).forEach(xiangTing => {
      codes[xiangTing].forEach(i => {
        expect(analyse(encode(parse(i).handTiles))).toEqual(Number(xiangTing));
      });
    });
  });
});

interface ICodes {
  [key: string]: string[];
}
