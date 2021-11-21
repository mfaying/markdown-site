const fs = require("fs");
const markdownParser = require("./parser");
const loaderUtils = require("loader-utils");
const path = require("path");

const extractCode = (ast, dir) => {
  let count = 0;
  Array.isArray(ast.children) &&
    ast.children.forEach((child, index) => {
      const { type, value } = child;
      if (type === "code") {
        fs.writeFileSync(`${dir}/Test${count}.tsx`, value);
        count++;
      }
    });
};

const getConvertedSource = (resourcePath) => {
  return fs
    .readFileSync(resourcePath)
    .toString()
    .replace(/```/g, "~~~")
    .replace(/`/g, "");
};

module.exports = function (source) {
  const options = loaderUtils.getOptions(this) || {},
    ast = markdownParser.parse(source);

  extractCode(ast, options.dir);

  const content = getConvertedSource(this.resourcePath);

  return `export default \`${content}\`;`;
};
