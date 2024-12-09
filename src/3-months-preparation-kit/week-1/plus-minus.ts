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

const DECIMAL_PLACES = 6;

const RATIO_TYPE = {
  POSITIVE: "POSITIVE",
  NEGATIVE: "NEGATIVE",
  ZERO: "ZERO",
} as const;
type RatioType = (typeof RATIO_TYPE)[keyof typeof RATIO_TYPE];

function determineCondition(value: number, ratioType: RatioType) {
  switch (ratioType) {
    case RATIO_TYPE.POSITIVE: {
      return value > 0;
    }
    case RATIO_TYPE.NEGATIVE: {
      return value < 0;
    }
    case RATIO_TYPE.ZERO: {
      return value === 0;
    }
  }
}

function calculateRatioOf(array: number[], ratioType: RatioType): number {
  return (
    array.reduce((previousValue, currentValue) => {
      if (determineCondition(currentValue, ratioType)) {
        return previousValue + 1;
      }
      return previousValue;
    }, 0) / array.length
  );
}

/*
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
function plusMinus(arr: number[]): void {
  // Write your code here
  console.log(
    calculateRatioOf(arr, RATIO_TYPE.POSITIVE).toFixed(DECIMAL_PLACES),
  );
  console.log(
    calculateRatioOf(arr, RATIO_TYPE.NEGATIVE).toFixed(DECIMAL_PLACES),
  );
  console.log(calculateRatioOf(arr, RATIO_TYPE.ZERO).toFixed(DECIMAL_PLACES));
}

function main() {
  const n: number = Number.parseInt(readLine().trim(), 10);

  const arr: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => Number.parseInt(arrTemp, 10));

  plusMinus(arr);
}
