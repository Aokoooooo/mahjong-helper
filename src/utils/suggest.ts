import isEmpty from "lodash/isEmpty";
import { Hand } from "../modal/hand";
import { Suggest } from "../modal/suggest";
import { suggest } from "../service/suggest";

export const printSuggests = (
  code: string,
  showDetails: boolean = false
): void => {
  const suggests = suggest(Hand.fromCode(code));
  if (typeof suggests === "string") {
    console.log(suggests);
  } else if (isEmpty(suggests)) {
    console.log("没牌了,随便打掉换牌吧");
  } else {
    suggests.forEach(i => {
      printSuggestsHelper(i, showDetails);
    });
  }
};

const printSuggestsHelper = (suggest: Suggest, showDetails: boolean) => {
  const summary = `切:${suggest.discard.name} 向听:${suggest.oldXiangTing}->${suggest.newXiangTing} 进张:${suggest.count}`;
  if (showDetails) {
    let details = "";
    suggest.details.forEach((v, k) => {
      details += `${k.name}(${v}) `;
    });
    console.log(`${summary}; ${details}`);
  } else {
    console.log(summary);
  }
};
