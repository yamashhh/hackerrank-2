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
 * Complete the 'lonelyinteger' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */
function lonelyinteger(a: number[]): number {
  // Write your code here
  const map: Map<number, number[]> = new Map();
  for (const value of a) {
    const integers = map.get(value);
    if (integers === undefined) {
      map.set(value, [value]);
    } else {
      integers.push(value);
    }
  }
  const lonelyInteger = Array.from(map.values())
    .find((integers) => integers.length === 1)
    ?.at(0);
  if (lonelyInteger === undefined) {
    throw new Error("No lonely integer found");
  }
  return lonelyInteger;
}

function main() {
  // @ts-expect-error original code from HackerRank
  // biome-ignore lint/complexity/useLiteralKeys: original code from HackerRank
  const ws: WriteStream = createWriteStream(process.env["OUTPUT_PATH"]);

  // @ts-expect-error original code from HackerRank
  const n: number = Number.parseInt(readLine().trim(), 10);

  const a: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((aTemp) => Number.parseInt(aTemp, 10));

  const result: number = lonelyinteger(a);

  ws.write(`${result}\n`);

  ws.end();
}
