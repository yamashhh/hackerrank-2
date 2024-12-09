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
 * Complete the 'gradingStudents' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY grades as parameter.
 */
// function gradingStudents(grades: number[]): number[] {
//   // Write your code here
// }

function main() {
  // @ts-expect-error original code from HackerRank
  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  const ws: WriteStream = createWriteStream(process.env["OUTPUT_PATH"]);

  const gradesCount: number = Number.parseInt(readLine().trim(), 10);

  const grades: number[] = [];

  for (let i = 0; i < gradesCount; i++) {
    const gradesItem: number = Number.parseInt(readLine().trim(), 10);

    grades.push(gradesItem);
  }

  // const result: number[] = gradingStudents(grades);

  // ws.write(`${result.join("\n")}\n`);

  ws.end();
}
