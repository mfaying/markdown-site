import React from "react";
import ReactDom from "react-dom";
import ReactMarkdown from "react-markdown";
import test from "./test.md";
import "zent/css/index.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

let count = -1;

ReactDom.render(
  <ReactMarkdown
    children={test}
    components={{
      code({ className, children, ...props }) {
        if (className === "language-code") {
          count++;
          const Test = React.lazy(() => import(`./components/Test${count}`));

          return (
            <>
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={vscDarkPlus}
                language="javascript"
                PreTag="div"
                {...props}
              />
              <React.Suspense fallback={<div>loading...</div>}>
                <Test />
              </React.Suspense>
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
  />,
  document.getElementById("app")
);
