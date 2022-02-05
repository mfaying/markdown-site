export const CODE_IDENTIFIER = "code";

export const CODE_OUTPUT_PATH = "./src/codeDist";

export interface IASTPosition {
  column: number;
  line: number;
  offset: number;
}

export interface IASTChild {
  position: {
    start: IASTPosition;
    end: IASTPosition;
  };
  type: string;
  value: string;
}
