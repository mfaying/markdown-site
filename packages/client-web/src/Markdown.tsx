import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import codeConfig from "./codeDist/codeConfig.json";

interface IPointPosition {
  column: number;
  line: number;
  offset: number;
}

const getPositionCompareValue = (position: IPointPosition) => {
  const { column, line, offset } = position;
  return `${line}-${column}-${offset}`;
};

interface IPosition {
  start: IPointPosition;
  end: IPointPosition;
}

const isPositionEqual = (position: IPosition, anotherPosition: IPosition) => {
  return (
    getPositionCompareValue(position.start) ===
      getPositionCompareValue(anotherPosition.start) &&
    getPositionCompareValue(position.end) ===
      getPositionCompareValue(anotherPosition.end)
  );
};

/**
 * 1. 动态引入路径不支持传变量，所以用模板字符串
 * 2. loader路径匹配需要后缀，所以用.md结尾
 * */
const getMarkdown = (pathWithoutSuffix) => {
  const mdReg = /\.md$/;
  const newPath = mdReg.test(pathWithoutSuffix)
    ? pathWithoutSuffix.replace(mdReg, "")
    : pathWithoutSuffix;

  return new Promise<string>((resolve) => {
    import(`${newPath}.md`).then((module) => resolve(module.default));
  });
};

interface IMarkdownProps {
  path: string;
}

const Markdown: React.FC<IMarkdownProps> = ({ path }) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    path &&
      getMarkdown(path).then((content) => {
        setContent(content);
      });
  }, []);

  if (!content) {
    return null;
  }

  return (
    <ReactMarkdown
      children={content}
      components={{
        code({ className, children, ...props }) {
          if (className === "language-code") {
            const position = props.node.position || ({} as any);

            // TODO 处理严格的路径判断
            const newPath = path
              .split("/")
              .filter((item) => !/^\.+$/.test(item))
              .join("/");
            const confList = codeConfig.filter((item) =>
              item.resourcePath.endsWith(newPath)
            );

            const conf = confList.find((item) => {
              return isPositionEqual(position, item.position);
            });

            const Test = React.lazy(
              () => import(`./codeDist/${conf?.codePath}`)
            );

            return (
              <>
                <React.Suspense fallback={<div>loading...</div>}>
                  <Test />
                </React.Suspense>
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={vscDarkPlus}
                  language="javascript"
                  PreTag="div"
                  {...props}
                />
              </>
            );
          } else {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        },
      }}
    />
  );
};

export default Markdown;
