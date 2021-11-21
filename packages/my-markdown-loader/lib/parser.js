const unified = require("unified");
const remarkParser = require("remark-parse");

module.exports = unified().use(remarkParser).freeze();
