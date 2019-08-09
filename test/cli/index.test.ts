import exec from "child_process";
import path from "path";

describe("cli", () => {
  beforeAll(() => {
    return new Promise(resolve => {
      exec.exec(`yarn tsc`, { cwd: "." }, (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        });
      });
    });
  });

  test("test -a ", async () => {
    const { stdout } = await cli(["-a", "45sf123456m123456s"]);
    expect(stdout).toEqual("向听数: 0\n");
  });

  test("test -s", async () => {
    const result1 = await cli(["-s", "234444m22p123s666z"]);
    expect(result1.stdout).toEqual("荣和\n");
    const result2 = await cli(["-s", "35zf333555z123456p"]);
    expect(result2.stdout).toEqual("没牌了,随便打掉换牌吧\n");
    const result3 = await cli(["-s", "12pf111p123456789m"]);
    expect(result3.stdout).toEqual("切:① 向听:0->-1 进张:3\n");
  });
  test("test -sd", async () => {
    const { stdout } = await cli(["-sd", "12pf111p123456789m"]);
    expect(stdout).toEqual("切:① 向听:0->-1 进张:3; ②(3) \n");
  });
  test("test -s -d", async () => {
    const { stdout } = await cli(["-s", "-d", "12pf111p123456789m"]);
    expect(stdout).toEqual("切:① 向听:0->-1 进张:3; ②(3) \n");
  });
});

function cli(args: string[], cwd: string = ".") {
  return new Promise<IResult>(resolve => {
    exec.exec(
      `node ${path.resolve("./dist/cli/index.js")} ${args.join(" ")}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        });
      }
    );
  });
}

interface IResult {
  code: number;
  error: exec.ExecException | null;
  stdout: string;
  stderr: string;
}
