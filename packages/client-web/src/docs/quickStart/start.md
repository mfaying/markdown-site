/docs/quickStart/start.md

# 快速上手

按钮, 提供基础样式及基础状态.

## 例子

```code
import React from "react";
import { Button} from "zent";


const Demo: React.FC = () => {
  return <div>Test14413445<Button type="primary">1054</Button></div>;
};

export default Demo;
```

# Dialog

弹窗

## 例子

```code
import React from "react";
import { Dialog, Button } from "zent";

const { openDialog } = Dialog;

const Demo: React.FC = () => {
  const open = () => {
    openDialog({
      title: "title1100",
      children: <div>Dialog</div>,
    });
  };

  return (
    <Button type="primary" onClick={open}>
      点击打开弹窗btn1100
    </Button>
  );
};

export default Demo;
```
