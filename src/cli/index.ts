import program from "commander";
import { analyse } from "../service/analyse";
import { encode } from "../service/encode";
import { parse } from "../service/parse";
import { printSuggests } from "../utils/suggest";

program.option("-a, --analyse <code>", "analyse code");

program.option(
  "-s, --suggest [options] <code>",
  "give suggest, enter -d to show details"
);

program.parse(process.argv);
if (program.analyse) {
  console.log(`向听数: ${analyse(encode(parse(program.analyse).handTiles))}`);
}
if (program.suggest) {
  const suggest = program.suggest;
  const arg = program.args[0];
  if (suggest === "-d") {
    printSuggests(arg, suggest);
  } else {
    printSuggests(suggest);
  }
}
