const fs = require("fs");
const markdownParser = require("./parser");
const loaderUtils = require("loader-utils");
const path = require("path");

const mkdir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const CODE_CONFIG_FILE_NAME = "codeConfig";

const codeConfig = [];

const writeCodeConfig = (dir, config) => {
  const path = `${dir}/${CODE_CONFIG_FILE_NAME}.json`;

  fs.writeFileSync(path, JSON.stringify(config));
};

const extractCode = (ast, dir, resourcePath) => {
  mkdir(dir);

  Array.isArray(ast.children) &&
    ast.children.forEach((child, index, ...rest) => {
      const { type, value } = child;
      if (type === "code") {
        const codeFilename = new Date().getTime();

        const path = `${dir}/${codeFilename}.tsx`;

        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }

        fs.writeFile(path, "", function (err) {
          if (err) {
            return;
          }

          fs.writeFileSync(path, value);
        });

        codeConfig.push({
          index,
          position: child?.position || {},
          resourcePath,
          codePath: `${codeFilename}.tsx`,
        });

        writeCodeConfig(dir, codeConfig);
        index++;
      }
    });
};

module.exports = function (source) {
  const options = loaderUtils.getOptions(this) || {},
    { resourcePath } = this,
    ast = markdownParser.parse(source);

  extractCode(ast, options.dir, resourcePath);
  return `export default ${JSON.stringify(source)};`;
};
