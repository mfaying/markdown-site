import unified from "unified";
import remarkParse from "remark-parse";

export default unified().use(remarkParse).freeze();
