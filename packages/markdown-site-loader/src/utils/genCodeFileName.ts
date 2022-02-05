import { IASTPosition } from "markdown-site-shared";

const PATH_LIMIT = 20;

const genCodeFileName = (resourcePath: string, position: IASTPosition) => {
  const positionStr = `${position.line}${position.column}`;

  const pathList = resourcePath.split("");
  const len = pathList.length;
  const pathCharCodeStr = pathList
    .slice(len - PATH_LIMIT, len)
    .map((char) => char.charCodeAt(0))
    .join("");

  return positionStr + pathCharCodeStr;
};

export default genCodeFileName;
