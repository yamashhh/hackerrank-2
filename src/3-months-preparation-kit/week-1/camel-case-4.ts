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

const OPERATION = {
  SPLIT: "S",
  COMBINE: "C",
} as const;

const TYPE = {
  METHOD: "M",
  CLASS: "C",
  VARIABLE: "V",
};

function matchAllCapitalized(words: string): string[] {
  return Array.from(words.matchAll(/[A-Z][a-z]+/g), (match) => match[0]);
}

function createSpaceDelimitedListOf(words: string[]): string {
  return words.map((word) => word.toLowerCase()).join(" ");
}

function splitCamelCase(word: string): string {
  const firstWord = word.match(/^[a-z]+/)?.[0];
  if (firstWord === undefined) {
    throw new Error("Failed to split camelCase word.");
  }
  return createSpaceDelimitedListOf(
    [firstWord].concat(matchAllCapitalized(word)),
  );
}

function split(type: string, value: string): string {
  switch (type) {
    case TYPE.METHOD: {
      const word = value.replace("()", "");
      return splitCamelCase(word);
    }
    case TYPE.CLASS: {
      return createSpaceDelimitedListOf(matchAllCapitalized(value));
    }
    case TYPE.VARIABLE: {
      return splitCamelCase(value);
    }
    default: {
      throw new Error("Unknown type at split function.");
    }
  }
}

function capitalizeFirstLetterOf(word: string): string {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

function combineToCamelCase(words: string[]): string {
  return words.reduce<string>((previousValue, currentValue, index) => {
    if (index === 0) {
      return previousValue + currentValue;
    }
    return previousValue + capitalizeFirstLetterOf(currentValue);
  }, "");
}

function combine(type: string, value: string): string {
  const words = value.split(" ").map((element) => element.toLowerCase());

  switch (type) {
    case TYPE.METHOD: {
      return `${combineToCamelCase(words)}()`;
    }
    case TYPE.CLASS: {
      return words.reduce<string>(
        (previousValue, currentValue) =>
          previousValue + capitalizeFirstLetterOf(currentValue),
        "",
      );
    }
    case TYPE.VARIABLE: {
      return combineToCamelCase(words);
    }
    default: {
      throw new Error("Unknown type at combine function.");
    }
  }
}

function main() {
  // Enter your code here
  for (const input of inputLines) {
    const [operation, type, value] = input.split(";");
    if (operation === undefined || type === undefined || value === undefined) {
      throw new Error("Failed to parse input.");
    }

    const sanitizedValue = value.replace(/\r/g, "");

    switch (operation) {
      case OPERATION.SPLIT: {
        console.log(split(type, sanitizedValue));
        continue;
      }
      case OPERATION.COMBINE: {
        console.log(combine(type, sanitizedValue));
        continue;
      }
      default: {
        throw new Error("Unknown operation.");
      }
    }
  }
}
