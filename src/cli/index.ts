import program from "commander";
import { analyse } from "../service/analyse";
import { encode } from "../service/encode";
import { parse } from "../service/parse";
import { printSuggests } from "../utils/suggest";

program.option("-a, --analyse <code>", "analyse code");

program
  .option("-s, --suggest [options] <code>", "give suggest")
  .option("-d, --showDetail", "print suggest detail");

program.parse(process.argv);
if (program.analyse) {
  console.log(`向听数: ${analyse(encode(parse(program.analyse).handTiles))}`);
}
if (program.suggest) {
  const suggest = program.suggest;
  const arg = program.args[0];
  const showDetail = !!program.showDetail;
  if (suggest === "-d") {
    printSuggests(arg, suggest);
  } else {
    printSuggests(suggest, showDetail);
  }
}
