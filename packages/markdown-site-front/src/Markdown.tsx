import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import codeConfig from "./codeDist/index.json";
import { CODE_IDENTIFIER, IASTPosition } from "markdown-site-shared";

/**
 * 1. 动态引入路径不支持传变量，所以用模板字符串
 * 2. loader 路径匹配需要后缀，所以用 .md 结尾
 * */
const getMarkdown = (path) => {
  const pathWithoutSuffix = path.replace(/\.md$/, "");

  return new Promise<string>((resolve) => {
    import(`${pathWithoutSuffix}.md`).then((module) => resolve(module.default));
  });
};

const getCodeConf = (path: string, position: IASTPosition) => {
  const comparePath = path
    .split("/")
    .filter((item) => !/^\.+$/.test(item))
    .join("/");

  const conf = codeConfig.find((item) => {
    return (
      item.resourcePath.endsWith(comparePath) &&
      item.position.offset === position.offset
    );
  });

  return conf;
};

interface IMarkdownProps {
  path: string;
}

const Markdown: React.FC<IMarkdownProps> = ({ path }) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    path && getMarkdown(path).then((content) => setContent(content));
  }, []);

  if (!content) {
    return null;
  }

  return (
    <ReactMarkdown
      children={content}
      components={{
        code({ className, children, ...element }) {
          if (className === `language-${CODE_IDENTIFIER}`) {
            const position = element.node.position?.start as IASTPosition;

            const conf = getCodeConf(path, position);

            // TODO 这里的 codeDist 不能直接用变量替代
            const Code = React.lazy(
              () => import(`./codeDist/${conf?.codePath}`)
            );

            return (
              <>
                <React.Suspense fallback={<div>loading...</div>}>
                  <Code />
                </React.Suspense>
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={vscDarkPlus}
                  language="javascript"
                  PreTag="div"
                />
              </>
            );
          } else {
            return <code className={className}>{children}</code>;
          }
        },
      }}
    />
  );
};

export default Markdown;
