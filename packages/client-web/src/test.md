# Button

按钮, 提供基础样式及基础状态.

## 代码

```code
import React from "react";
import { Button} from "zent";


const Test: React.FC = () => {
  return <div>Test113<Button type="primary">32131</Button></div>;
};

export default Test;
```

# Grid

功能和 Table 组件类似，Grid 是使用 table 标签实现的，而 Table 是使用 div + flex 布局实现的。

## 代码

```code
import React from "react";
import { Grid } from "zent";

const Test: React.FC = () => {
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

export default Test;
```
