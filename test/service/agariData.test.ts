import { agariData } from "../../src";

describe("service-agariData", () => {
  it("agariData size correct", () => {
    expect(agariData.size).toEqual(9362);
  });
});
