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

function calculateSumFromArray(array: number[]) {
  return array.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  );
}

/*
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
function miniMaxSum(arr: number[]): void {
  // Write your code here
  arr.sort((a, b) => a - b);
  console.log(
    `${calculateSumFromArray(arr.slice(0, -1)).toString()} ${calculateSumFromArray(
      arr.slice(1),
    ).toString()}`,
  );
}

function main() {
  const arr: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => Number.parseInt(arrTemp, 10));

  miniMaxSum(arr);
}
