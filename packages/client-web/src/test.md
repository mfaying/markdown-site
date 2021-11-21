# Button1

按钮, 提供基础样式及基础状态.

## 例子

```code
import React from "react";
import { Button} from "zent";


const Demo: React.FC = () => {
  return <div>Test113<Button type="primary">测试32131</Button></div>;
};

export default Demo;
```

# Dialog

弹窗

```code
import React from "react";
import { Dialog, Button } from "zent";

const { openDialog } = Dialog;

const Demo: React.FC = () => {
  const open = () => {
    openDialog({
      title: "title",
      children: <div>Dialog</div>,
    });
  };

  return (
    <Button type="primary" onClick={open}>
      点击打开弹窗
    </Button>
  );
};

export default Demo;
```

## 例子

# Grid

功能和 Table 组件类似，Grid 是使用 table 标签实现的，而 Table 是使用 div + flex 布局实现的。

## 例子

```code
import React from "react";
import { Grid } from "zent";

const Demo: React.FC = () => {
  const columns = [{
    title: "姓名",
    name: "name"
  }]

  const datasets = [{
    name: "xxx",
    id: 1
  }];


  return <div>
    Test22
    <Grid columns={columns} datasets={datasets} />
  </div>;
};

export default Demo;
```
