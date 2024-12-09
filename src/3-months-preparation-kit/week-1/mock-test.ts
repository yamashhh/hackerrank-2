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
 * Complete the 'findMedian' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
function findMedian(arr: number[]): number {
  // Write your code here
  const sorted = arr.sort((a, b) => a - b);
  const median = sorted.at(Math.trunc(sorted.length / 2));
  if (median === undefined) {
    throw new Error("Failed to find median.");
  }
  return median;
}

function main() {
  // @ts-expect-error original code from HackerRank
  // biome-ignore lint/complexity/useLiteralKeys: original code from HackerRank
  const ws: WriteStream = createWriteStream(process.env["OUTPUT_PATH"]);

  // @ts-expect-error original code from HackerRank
  const n: number = Number.parseInt(readLine().trim(), 10);

  const arr: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => Number.parseInt(arrTemp, 10));

  const result: number = findMedian(arr);

  ws.write(`${result}\n`);

  ws.end();
}
