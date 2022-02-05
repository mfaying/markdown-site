var PATH_LIMIT = 20;
var genCodeFileName = function (resourcePath, position) {
    var positionStr = "" + position.line + position.column;
    var pathList = resourcePath.split("");
    var len = pathList.length;
    var pathCharCodeStr = pathList
        .slice(len - PATH_LIMIT, len)
        .map(function (char) { return char.charCodeAt(0); })
        .join("");
    return positionStr + pathCharCodeStr;
};
export default genCodeFileName;
//# sourceMappingURL=genCodeFileName.js.map