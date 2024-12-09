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
 * Complete the 'continueingRecords' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY scores as parameter.
 */
function continueingRecords(scores: number[]): [number, number] {
  // Write your code here
  const result: [number, number] = [0, 0];
  let lowestScore = 0;
  let highestScore = 0;

  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    if (score === undefined) {
      continue;
    }
    if (i === 0) {
      lowestScore = score;
      highestScore = score;
      continue;
    }
    if (score > highestScore) {
      highestScore = score;
      result[0] += 1;
      continue;
    }
    if (score < lowestScore) {
      lowestScore = score;
      result[1] += 1;
    }
  }

  return result;
}

function main() {
  // @ts-expect-error original code from HackerRank
  // biome-ignore lint/complexity/useLiteralKeys: original code from HackerRank
  const ws: WriteStream = createWriteStream(process.env["OUTPUT_PATH"]);

  const n: number = Number.parseInt(readLine().trim(), 10);

  const scores: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((scoresTemp) => Number.parseInt(scoresTemp, 10));

  const result: number[] = continueingRecords(scores);

  ws.write(`${result.join(" ")}\n`);

  ws.end();
}
