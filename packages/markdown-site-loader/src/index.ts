import fse from "fs-extra";
import { IASTChild, IASTPosition, CODE_IDENTIFIER } from "markdown-site-shared";
import markdownParser from "./utils/parser";
import loaderUtils from "loader-utils";
import genCodeFileName from "./utils/genCodeFileName";

interface ICodeConfigItem {
  position: IASTPosition;
  resourcePath: string;
  codePath: string;
}

const codeConfig: ICodeConfigItem[] = [];

const writeCodeConfig = (codeOutputPath: string, config: string) => {
  const path = `${codeOutputPath}/index.json`;

  fse.writeFileSync(path, config);
};

const writeCodeFile = (
  codeOutputPath: string,
  codeFileName: string,
  value: string
) => {
  const path = `${codeOutputPath}/${codeFileName}.tsx`;

  fse.writeFileSync(path, value);
};

const extractCode = (
  ast: {
    children: IASTChild[];
  },
  codeOutputPath: string,
  resourcePath: string
) => {
  fse.mkdirsSync(codeOutputPath);

  ast.children.forEach((child: IASTChild) => {
    const { type, value } = child;

    if (type === CODE_IDENTIFIER) {
      const position = child.position.start;
      const codeFileName = genCodeFileName(resourcePath, position);

      writeCodeFile(codeOutputPath, codeFileName, value);

      codeConfig.push({
        position,
        resourcePath,
        codePath: `${codeFileName}.tsx`,
      });
    }
  });

  writeCodeConfig(codeOutputPath, JSON.stringify(codeConfig));
};

module.exports = function (source: string) {
  const options = loaderUtils.getOptions(this),
    { resourcePath } = this as any,
    ast = markdownParser.parse(source);

  extractCode(ast, options.codeOutputPath, resourcePath);

  return `export default ${JSON.stringify(source)};`;
};
