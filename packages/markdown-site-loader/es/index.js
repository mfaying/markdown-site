import fse from "fs-extra";
import { CODE_IDENTIFIER } from "markdown-site-shared";
import markdownParser from "./utils/parser";
import loaderUtils from "loader-utils";
import genCodeFileName from "./utils/genCodeFileName";
var codeConfig = [];
var writeCodeConfig = function (codeOutputPath, config) {
    var path = codeOutputPath + "/index.json";
    fse.writeFileSync(path, config);
};
var writeCodeFile = function (codeOutputPath, codeFileName, value) {
    var path = codeOutputPath + "/" + codeFileName + ".tsx";
    fse.writeFileSync(path, value);
};
var extractCode = function (ast, codeOutputPath, resourcePath) {
    fse.mkdirsSync(codeOutputPath);
    ast.children.forEach(function (child) {
        var type = child.type, value = child.value;
        if (type === CODE_IDENTIFIER) {
            var position = child.position.start;
            var codeFileName = genCodeFileName(resourcePath, position);
            writeCodeFile(codeOutputPath, codeFileName, value);
            codeConfig.push({
                position: position,
                resourcePath: resourcePath,
                codePath: codeFileName + ".tsx",
            });
        }
    });
    writeCodeConfig(codeOutputPath, JSON.stringify(codeConfig));
};
module.exports = function (source) {
    var options = loaderUtils.getOptions(this), resourcePath = this.resourcePath, ast = markdownParser.parse(source);
    extractCode(ast, options.codeOutputPath, resourcePath);
    return "export default " + JSON.stringify(source) + ";";
};
//# sourceMappingURL=index.js.map