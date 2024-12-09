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
 * Complete the 'divisibleSumPairs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER_ARRAY ar
 */

function divisibleSumPairs(n: number, k: number, ar: number[]): number {
  // Write your code here
  let total = 0;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (i < j && ((ar[i] ?? 0) + (ar[j] ?? 0)) % k === 0) {
        total++;
      }
    }
  }
  return total;
}

function main() {
  // @ts-expect-error original code from HackerRank
  // biome-ignore lint/complexity/useLiteralKeys: original code from HackerRank
  const ws: WriteStream = createWriteStream(process.env["OUTPUT_PATH"]);

  const firstMultipleInput: string[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ");

  // @ts-expect-error original code from HackerRank
  const n: number = Number.parseInt(firstMultipleInput[0], 10);

  // @ts-expect-error original code from HackerRank
  const k: number = Number.parseInt(firstMultipleInput[1], 10);

  const ar: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arTemp) => Number.parseInt(arTemp, 10));

  const result: number = divisibleSumPairs(n, k, ar);

  ws.write(`${result}\n`);

  ws.end();
}
