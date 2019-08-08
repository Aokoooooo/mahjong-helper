import { printSuggests } from "../../src/index";

describe("utils-suggest", () => {
  beforeAll(() => {
    console.log = jest.fn();
  });
  test("already ronghe", () => {
    printSuggests("234444m22p123s666z");
    expect(console.log).toHaveBeenCalledWith("荣和");
  });
  test("no suggests", () => {
    printSuggests("35zf333555z123456p");
    expect(console.log).toHaveBeenCalledWith("没牌了,随便打掉换牌吧");
  });
  test("summary suggests", () => {
    printSuggests("45sf123456m123456s");
    expect(console.log).toHaveBeenCalledWith("切:4 向听:0->-1 进张:2");
  });
  test("detail suggests", () => {
    printSuggests("45sf123456m123456s", true);
    expect(console.log).toHaveBeenCalledWith("切:5 向听:0->-1 进张:2; 4(2) ");
  });
});
