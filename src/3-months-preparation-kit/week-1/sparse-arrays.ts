import { type WriteStream, createWriteStream } from "node:fs";
process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let inputLines: string[] = [];
let currentLine = 0;

process.stdin.on("data", (inputStdin: string): void => {
  inputString += inputStdin;
});

process.stdin.on("end", (): void => {
  inputLines = inputString.split("\n");
  inputString = "";

  main();
});

function readLine(): string {
  // @ts-expect-error original code from HackerRank
  return inputLines[currentLine++];
}

/*
 * Complete the 'matchingStrings' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY strings
 *  2. STRING_ARRAY queries
 */

function matchingStrings(strings: string[], queries: string[]): number[] {
  // Write your code here
  return queries.map((query) =>
    strings.reduce<number>((previousValue, currentValue) => {
      let local = previousValue;
      if (currentValue === query) {
        local += 1;
      }
      return local;
    }, 0),
  );
}

function main() {
  // @ts-expect-error original code from HackerRank
  // biome-ignore lint/complexity/useLiteralKeys: original code from HackerRank
  const ws: WriteStream = createWriteStream(process.env["OUTPUT_PATH"]);

  const stringsCount: number = Number.parseInt(readLine().trim(), 10);

  const strings: string[] = [];

  for (let i = 0; i < stringsCount; i++) {
    const stringsItem: string = readLine();
    strings.push(stringsItem);
  }

  const queriesCount: number = Number.parseInt(readLine().trim(), 10);

  const queries: string[] = [];

  for (let i = 0; i < queriesCount; i++) {
    const queriesItem: string = readLine();
    queries.push(queriesItem);
  }

  const res: number[] = matchingStrings(strings, queries);

  ws.write(`${res.join("\n")}\n`);

  ws.end();
}
