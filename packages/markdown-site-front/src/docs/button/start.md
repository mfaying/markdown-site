/docs/button/start.md

# Button 组件

按钮, 提供基础样式及基础状态.

## 例子

```code
import React from "react";
import { Button} from "zent";


const Demo: React.FC = () => {
  return <div>Test14413445<Button type="primary">btn测试22311132131445</Button></div>;
};

export default Demo;
```

# Grid

功能和 Table 组件类似，Grid 是使用 `<table>` 标签实现的，而 Table 是使用 div + flex 布局实现的。

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
    BtnTest22
    <Grid columns={columns} datasets={datasets} />
  </div>;
};

export default Demo;
```
